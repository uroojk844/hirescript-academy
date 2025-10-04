---
title: Session Cookie Management
description: Learn how to manage user sessions and cookies in Express.js for state persistence, authentication, and personalized experiences in web applications.
navigation:
  order: 16
---

# Session Cookie Management

Welcome to the Session Cookie Management lesson! In this tutorial, you’ll learn how to implement session management using cookies in Express.js. Sessions allow you to maintain state across multiple requests, enabling features like user authentication and shopping carts.

In this tutorial, you’ll learn:

- What sessions and cookies are
- Setting up express-session middleware
- Creating and managing sessions
- Working with cookies for session storage
- Implementing login/logout functionality
- Building a session-based authentication system

## What are Sessions and Cookies?

**Cookies** are small pieces of data stored in the browser and sent with every request to the server. They can store user preferences, authentication tokens, etc.

**Sessions** are server-side storage mechanisms that use cookies to identify users. A session ID is stored in a cookie, and session data is kept on the server (or in a store like Redis for scalability).

**Key Concepts**:
- Sessions maintain state in stateless HTTP
- Cookies can be secure (HTTPS), HttpOnly (no JS access), and signed
- Common use: User authentication, tracking

## Setting Up express-session

`express-session` is middleware for managing sessions in Express.

**Installation**:
```bash
npm install express-session
```

**Basic Setup**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'your-secret-key',  // Used to sign the session ID cookie
  resave: false,  // Don't save session if unmodified
  saveUninitialized: false,  // Don't create session until something stored
  cookie: { 
    maxAge: 1000 * 60 * 60,  // 1 hour
    secure: false,  // Set to true in production with HTTPS
    httpOnly: true  // Prevents client-side JS access
  }
}));

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;
  res.send(`Views: ${req.session.views}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URL**: `http://localhost:3000/` (refresh multiple times)
**Expected Output**: `Views: 1`, then `Views: 2`, etc.

**Explanation**:
- `secret`: Signs the session ID cookie to prevent tampering.
- `req.session`: Object to store session data.
- The session ID is stored in a cookie named `connect.sid` by default.

## Managing Sessions

### Storing and Accessing Session Data

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.post('/set', express.json(), (req, res) => {
  req.session.user = req.body.user;
  res.send('Session set');
});

app.get('/get', (req, res) => {
  res.json({ user: req.session.user || 'No user set' });
});

app.get('/destroy', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Error destroying session');
    res.send('Session destroyed');
  });
});

app.listen(3000);
```

::

**Test Sequence**:
1. POST `/set` with `{"user": "Alice"}` → `Session set`
2. GET `/get` → `{ "user": "Alice" }`
3. GET `/destroy` → `Session destroyed`
4. GET `/get` → `{ "user": "No user set" }`

### Cookie Options
Customize cookies for security:

- `secure: true`: Send only over HTTPS
- `sameSite: 'strict'`: Prevent CSRF
- `domain`: Set domain for cookie

## Implementing Login/Logout

Let’s create a simple authentication system using sessions.

::Editor
#title
routes/auth.js

#default

```javascript
const express = require('express');
const router = express.Router();

// Simulated users
const users = {
  alice: { username: 'alice', password: 'password123' }
};

router.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    req.session.user = { username };
    return res.json({ message: 'Logged in' });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
});

router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user: req.session.user });
});

module.exports = router;
```

::

**Update app.js**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test Sequence**:
1. POST `/auth/login` with `{"username": "alice", "password": "password123"}` → `{ "message": "Logged in" }`
2. GET `/auth/profile` → `{ "user": { "username": "alice" } }`
3. GET `/auth/logout` → `{ "message": "Logged out" }`
4. GET `/auth/profile` → `{ "error": "Not authenticated" }`

## Building a Session-Based Authentication System

Let’s build a blog app with session authentication, requiring login to create posts.

**Step 1: User Model (for MongoDB)**

::Editor
#title
models/user.js

#default

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }  // In production, hash passwords
});

module.exports = mongoose.model('User', userSchema);
```

::

**Step 2: Auth Routes with Sessions**

::Editor
#title
routes/auth.js

#default

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });  // Hash in production
    await user.save();
    req.session.user = { id: user._id, username };
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.password === password) {  // Compare hashes in production
      req.session.user = { id: user._id, username };
      return res.redirect('/posts');
    }
    res.status(401).render('login', { error: 'Invalid credentials' });
  } catch (err) {
    next(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/posts');
  });
});

module.exports = router;
```

::

**Step 3: Protected Post Routes**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
};

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('posts', { posts, user: req.session.user });
  } catch (err) {
    next(err);
  }
});

router.get('/new', isAuthenticated, (req, res) => {
  res.render('new-post');
});

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const post = new Post({
      ...req.body,
      author: req.session.user.username
    });
    await post.save();
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Step 4: Main App**

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/blog');

// Session setup
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }  // 1 day
}));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));

// Error handling
app.use((err, req, res, next) => {
  res.status(500).render('error', { error: err });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Step 5: EJS Templates (Update to Show User Status)**

Update `posts.ejs` to show login/logout links based on session:

```html
<% if (user) { %>
  <p>Welcome, <%= user.username %>! <a href="/auth/logout">Logout</a></p>
<% } else { %>
  <a href="/auth/login">Login</a> | <a href="/auth/register">Register</a>
<% } %>
```

Add `register.ejs` and `login.ejs` forms similar to `new-post.ejs`.

**Test Flow**:
1. Visit `/posts` → See login/register links
2. Register or login → Session set, see welcome message
3. Create post → Only if logged in
4. Logout → Session destroyed

**Note**: In production, hash passwords (use bcrypt) and use secure cookies.

## Best Practices

### 1. **Use Secure Secrets**
Store session secret in environment variables.

### 2. **Enable Secure Cookies**
Set `secure: true` with HTTPS.

### 3. **Limit Session Data**
Store minimal data in sessions (e.g., user ID, not full profile).

### 4. **Handle Session Expiration**
Set appropriate `maxAge` and handle expired sessions.

### 5. **Use External Stores for Scale**
For production, use Redis or MongoDB session stores.

```javascript
const MongoStore = require('connect-mongo');
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/sessions' })
}));
```

## Common Patterns

### Flash Messages
Use sessions for one-time messages (e.g., success alerts).

```javascript
req.session.flash = 'Success!';
```

### Cart Management
Store shopping cart in session:

```javascript
if (!req.session.cart) req.session.cart = [];
req.session.cart.push(item);
```

## What's Next?

You’ve mastered session and cookie management in Express.js! In the next tutorial, we’ll cover **JWT Authentication**, where you’ll learn token-based authentication for stateless, secure APIs.

### Key Takeaways:
- Sessions use cookies to maintain state across requests
- Use `express-session` for easy session management
- Store session data on server; cookie holds ID
- Implement authentication with session-based login/logout
- Secure cookies with HttpOnly, secure, and sameSite
- Use middleware to protect routes
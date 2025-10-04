---
title: JWT Authentication
description: Learn how to implement JSON Web Token (JWT) authentication in Express.js to secure APIs, manage user sessions, and enable stateless authentication.
navigation:
  order: 17
---

# JWT Authentication

Welcome to the JWT Authentication lesson! In this tutorial, you’ll learn how to implement JSON Web Token (JWT) authentication in your Express.js application. JWTs provide a stateless, secure way to authenticate users and protect API endpoints, making them ideal for modern APIs and single-page applications.

In this tutorial, you’ll learn:

- What JWTs are and how they work
- Setting up JWT authentication with `jsonwebtoken`
- Creating login and protected routes
- Validating and verifying JWTs
- Handling token expiration and refresh
- Building a secure blog API with JWT authentication

## What is JWT?

**JSON Web Token (JWT)** is a compact, self-contained token for securely transmitting information between parties as a JSON object. It’s commonly used for authentication and authorization.

**JWT Structure**:
- **Header**: Metadata (e.g., signing algorithm)
- **Payload**: Data (e.g., user ID, roles)
- **Signature**: Verifies integrity
- Format: `header.payload.signature`

**How it Works**:
1. User logs in; server issues a signed JWT.
2. Client includes JWT in request headers (`Authorization: Bearer <token>`).
3. Server verifies JWT to grant access.

## Setting Up JWT

**Installation**:
```bash
npm install jsonwebtoken bcryptjs
```

**Basic JWT Example**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = 'your-secret-key'; // Store in env variables in production

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }
  // Create JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Protected data', user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test Sequence**:
1. POST `/login` with `{"username": "alice"}` → `{ "token": "eyJ..." }`
2. GET `/protected` with header `Authorization: Bearer eyJ...` → `{ "message": "Protected data", "user": { "username": "alice", ... } }`
3. GET `/protected` without token → `{ "error": "Token required" }`

**Notes**:
- Use `bcryptjs` for password hashing in production.
- Store `SECRET_KEY` in environment variables.

## Building a Secure Blog API with JWT

Let’s create a blog API with JWT authentication, integrating MongoDB and Mongoose.

**Step 1: User Model**

::Editor
#title
models/user.js

#default

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Hashed in production
});

module.exports = mongoose.model('User', userSchema);
```

::

**Step 2: Post Model**

::Editor
#title
models/post.js

#default

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
```

::

**Step 3: Authentication Routes**

::Editor
#title
routes/auth.js

#default

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const SECRET_KEY = 'secret-key'; // Use env variable in production

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Step 4: Protected Post Routes**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/post');

const SECRET_KEY = 'secret-key';

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    const err = new Error('Authentication required');
    err.status = 401;
    return next(err);
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.userId
    });
    await post.save();
    res.status(201).json({ message: 'Post created', post });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Step 5: Main App**

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.name,
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test Flow**:
1. POST `/auth/register` with `{"username": "alice", "password": "pass123"}` → `{ "message": "User registered" }`
2. POST `/auth/login` with same credentials → `{ "token": "eyJ..." }`
3. POST `/posts` with header `Authorization: Bearer eyJ...` and body `{"title": "My Post", "content": "Hello"}` → `{ "message": "Post created", "post": {...} }`
4. GET `/posts` → List all posts
5. GET `/posts/:id` → Get specific post

**Note**: Install dependencies: `npm install express mongoose jsonwebtoken bcryptjs`.

## Handling Token Expiration and Refresh

To handle expired tokens, implement a refresh token system.

::Editor
#title
routes/auth.js

#default

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const SECRET_KEY = 'secret-key';
const REFRESH_SECRET = 'refresh-secret';

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, { expiresIn: '7d' });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      const err = new Error('Refresh token required');
      err.status = 401;
      throw err;
    }
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      const err = new Error('User not found');
      err.status = 401;
      throw err;
    }
    const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Test Refresh**:
1. POST `/auth/login` → Get `accessToken` and `refreshToken`
2. After 15 minutes, `accessToken` expires
3. POST `/auth/refresh` with `{"refreshToken": "..."}` → Get new `accessToken`

## Adding a Frontend (Optional)

For a complete app, add EJS templates for login/register and protect routes with JWT in the frontend. For simplicity, focus on API testing with Postman.

## Best Practices

### 1. **Secure Secret Keys**
Store `SECRET_KEY` and `REFRESH_SECRET` in environment variables (use `dotenv`).

### 2. **Short-Lived Access Tokens**
Use short expiration (e.g., 15m) for access tokens and refresh tokens for longer sessions.

### 3. **Secure Transmission**
Use HTTPS to protect tokens in transit.

### 4. **Validate Tokens**
Always verify tokens before granting access.

### 5. **Store Refresh Tokens Securely**
Store refresh tokens in a database or secure storage, not just in memory.

## Common Patterns

### Role-Based Access
Add roles to JWT payload:

```javascript
jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY);
```

### Middleware for Specific Routes
Apply JWT only to specific routes:

```javascript
router.use('/admin', authenticate, adminRoutes);
```

## What's Next?

You’ve mastered JWT authentication in Express.js! In the next tutorial, we’ll cover **File Upload Multer**, where you’ll learn how to handle file uploads securely in your Express applications.

### Key Takeaways:
- JWTs provide stateless authentication via signed tokens
- Use `jsonwebtoken` for creating/verifying tokens
- Protect routes with middleware to verify JWTs
- Implement refresh tokens for long-lived sessions
- Secure passwords with `bcryptjs`
- Handle errors with appropriate status codes
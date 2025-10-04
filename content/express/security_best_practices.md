---
title: Security Best Practices
description: Learn how to secure your Express.js applications by implementing best practices to protect against common vulnerabilities like XSS, CSRF, and injection attacks.
navigation:
  order: 19
---

# Security Best Practices

Welcome to the Security Best Practices lesson! In this tutorial, you’ll learn how to secure your Express.js applications against common web vulnerabilities. By following these practices, you can protect your application from attacks like Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and injection attacks, ensuring a safe user experience.

In this tutorial, you’ll learn:

- Common web vulnerabilities and how to mitigate them
- Setting up security middleware (e.g., `helmet`, `express-rate-limit`)
- Securing sessions and cookies
- Validating and sanitizing input
- Implementing CSRF protection
- Building a secure blog API with best practices

## Common Web Vulnerabilities

- **XSS (Cross-Site Scripting)**: Malicious scripts executed in users’ browsers.
- **CSRF (Cross-Site Request Forgery)**: Unauthorized actions via authenticated users.
- **SQL/NoSQL Injection**: Malicious queries to manipulate databases.
- **Insecure Dependencies**: Vulnerable packages in your application.
- **Unsecured APIs**: Exposed endpoints without authentication.
- **Sensitive Data Exposure**: Unencrypted data or secrets in code.

## Setting Up Security Middleware

### Helmet
`helmet` sets secure HTTP headers to prevent common attacks.

**Installation**:
```bash
npm install helmet
```

**Usage**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet()); // Sets secure headers

app.get('/', (req, res) => {
  res.send('Secure Express App');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Headers Set by Helmet**:
- `X-Content-Type-Options: nosniff` (prevents MIME-type sniffing)
- `X-Frame-Options: DENY` (prevents clickjacking)
- `Content-Security-Policy` (mitigates XSS)
- And more...

### Rate Limiting
`express-rate-limit` prevents brute-force attacks and DDoS.

**Installation**:
```bash
npm install express-rate-limit
```

**Usage**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per window
  message: 'Too many requests, please try again later.'
});

app.use(limiter);

app.get('/', (req, res) => {
  res.send('Rate-limited endpoint');
});

app.listen(3000);
```

::

**Test**: Send >100 requests in 15 minutes → `{ "error": "Too many requests, please try again later." }`

## Securing Sessions and Cookies

From the Session Cookie Management lesson, ensure:

- **Secure Cookies**: Set `secure: true` for HTTPS, `httpOnly: true` to block JS access, `sameSite: 'strict'` to prevent CSRF.
- **Signed Cookies**: Use a strong secret for `express-session`.
- **Session Store**: Use `connect-mongo` or Redis for production.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

app.use(session({
  secret: 'your-secret-key', // Store in env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/blog' }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.get('/', (req, res) => {
  res.send('Secure session');
});

app.listen(3000);
```

::

**Note**: Install `connect-mongo`: `npm install connect-mongo`.

## Validating and Sanitizing Input

From the Input Validation Sanitization lesson, use `express-validator` to prevent injection attacks.

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/', [
  body('title').trim().escape().isLength({ min: 3 }).withMessage('Title too short'),
  body('content').trim().escape().isLength({ min: 10 }).withMessage('Content too short')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: 'Post created', data: req.body });
});

module.exports = router;
```

::

## Implementing CSRF Protection

Use `csurf` to protect against CSRF attacks in form submissions.

**Installation**:
```bash
npm install csurf
```

**Usage**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(csrf());

app.get('/form', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="data">
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  res.send('Form submitted');
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  res.status(500).json({ error: err.message });
});

app.listen(3000);
```

::

**Test**:
- Submit form with valid CSRF token → Success
- Submit without token → `{ "error": "Invalid CSRF token" }`

## Building a Secure Blog API

Let’s combine these practices in a blog API with MongoDB.

**Step 1: Post Model**

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

**Step 2: Secure Routes**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/post');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    const err = new Error('Authentication required');
    err.status = 401;
    return next(err);
  }
  try {
    req.user = jwt.verify(token, 'secret-key');
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

router.post('/', authenticate, [
  body('title').trim().escape().isLength({ min: 3 }).withMessage('Title too short'),
  body('content').trim().escape().isLength({ min: 10 }).withMessage('Content too short')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Step 3: Main App**

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Session setup
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/blog' }),
  cookie: { secure: false, httpOnly: true, sameSite: 'strict' }
}));

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/posts', require('./routes/posts'));

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

**Notes**:
- Install dependencies: `npm install express mongoose helmet express-rate-limit express-session connect-mongo express-validator jsonwebtoken`.
- Use HTTPS and environment variables in production.

## Additional Security Practices

### 1. **Use HTTPS**
Redirect HTTP to HTTPS using `express-force-ssl` or server configuration.

### 2. **Dependency Management**
Audit packages with `npm audit` and update regularly.

### 3. **Secure Headers**
Customize `helmet` for specific needs (e.g., CSP for scripts).

### 4. **Environment Variables**
Use `dotenv` for secrets:

```javascript
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);
```

### 5. **CORS**
Use `cors` middleware for controlled API access:

```javascript
const cors = require('cors');
app.use(cors({ origin: 'https://your-frontend.com' }));
```

## Best Practices

- **Validate All Input**: Always sanitize and validate user input.
- **Limit Requests**: Use rate limiting for sensitive endpoints.
- **Secure Cookies**: Use secure, HttpOnly, and SameSite cookies.
- **Log Errors**: Log security incidents for monitoring (use `winston`).
- **Keep Dependencies Updated**: Monitor for vulnerabilities.

## What's Next?

You’ve mastered security best practices in Express.js! In the next tutorial, we’ll cover **Deployment and Production**, where you’ll learn how to deploy your Express application to a production environment.

### Key Takeaways:
- Use `helmet` for secure HTTP headers
- Implement rate limiting to prevent abuse
- Secure sessions with proper cookie settings
- Validate and sanitize all input
- Protect against CSRF with tokens
- Combine practices for a robust, secure API
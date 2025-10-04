---
title: Authentication and Authorization
description: Learn how to secure an Express.js API with JSON Web Tokens (JWT) for authentication and role-based authorization.
navigation:
  order: 17
---

# Authentication and Authorization

Welcome to the Authentication and Authorization lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to secure an **Express.js** API by implementing **authentication** (verifying user identity) and **authorization** (controlling access based on roles or permissions). You’ll use **JSON Web Tokens (JWT)** for authentication and implement role-based access control, building on concepts from **Database Integration** and **REST API Development**.

In this tutorial, you’ll learn:

- Understanding authentication and authorization
- Implementing JWT-based authentication
- Hashing passwords with bcrypt
- Creating role-based authorization
- Securing API endpoints with middleware
- Best practices for secure APIs

## What are Authentication and Authorization?

- **Authentication**: Verifying who a user is (e.g., checking username/password or tokens).
- **Authorization**: Determining what a user can do (e.g., admin vs. regular user access).
- **JSON Web Tokens (JWT)**: A compact, URL-safe token format for securely transmitting information, commonly used for authentication.
- **bcrypt**: A library for securely hashing passwords.

**Key Workflow**:
1. User registers with credentials (e.g., email, password).
2. User logs in to receive a JWT.
3. JWT is sent in requests to access protected routes.
4. Authorization checks ensure the user has the right permissions.

## Setting Up the Project

### Initialize the Project
If starting fresh:

```bash
mkdir my-secure-api
cd my-secure-api
npm init -y
```

### Install Dependencies
Install Express, Mongoose, dotenv, bcrypt, and jsonwebtoken:

```bash
npm install express mongoose dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon
```

**Update package.json**:

::Editor
#title
package.json

#default

```json
{
  "name": "my-secure-api",
  "version": "1.0.0",
  "description": "A secure Express.js API with JWT authentication",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.21.0",
    "mongoose": "^8.7.0",
    "dotenv": "^16.4.5",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

**Project Structure**:

```
my-secure-api/
├── node_modules/
├── models/
│   └── user.js
├── routes/
│   └── auth.js
├── middleware/
│   └── auth.js
├── .env
├── .gitignore
├── package.json
├── index.js
```

**Environment Variables**:

::Editor
#title
.env

#default

```
MONGODB_URI=mongodb://localhost:27017/my-secure-api
JWT_SECRET=your-secret-key
```

::

**Note**: Replace `JWT_SECRET` with a secure, random string in production.

## Setting Up MongoDB and User Model

Define a Mongoose schema for users with roles.

::Editor
#title
models/user.js

#default

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

::

## Authentication Middleware

Create middleware to verify JWTs and check roles.

::Editor
#title
middleware/auth.js

#default

```javascript
const jwt = require('jsonwebtoken');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

module.exports = {
  AuthError,
  authenticate: (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new AuthError('Authentication token required');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
  restrictTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    };
  }
};
```

::

## Authentication Routes

Implement routes for user registration, login, and protected resources.

::Editor
#title
routes/auth.js

#default

```javascript
const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { authenticate, restrictTo, AuthError } = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      throw new AuthError('Email and password are required');
    }
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AuthError('Email and password are required');
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new AuthError('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Protected route (all authenticated users)
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin-only route
router.get('/admin', authenticate, restrictTo('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
```

::

## Main Application

Set up the Express server with MongoDB and routes.

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const { AuthError } = require('./middleware/auth');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', authRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err instanceof AuthError) {
    res.status(401).json({ error: err.message });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Run**:
```bash
npm start
```

**Test Endpoints**:
- **POST** `http://localhost:3000/api/auth/register`:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"password123","role":"user"}' http://localhost:3000/api/auth/register
  ```
  **Response**: `{"message":"User registered"}`
- **POST** `http://localhost:3000/api/auth/login`:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"password123"}' http://localhost:3000/api/auth/login
  ```
  **Response**: `{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}`
- **GET** `http://localhost:3000/api/auth/profile` (with token):
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/api/auth/profile
  ```
  **Response**: `{"_id":"...","email":"alice@example.com","role":"user","createdAt":"...","updatedAt":"..."}`
- **GET** `http://localhost:3000/api/auth/admin` (with admin token):
  ```bash
  curl -H "Authorization: Bearer <admin-token>" http://localhost:3000/api/auth/admin
  ```
  **Response**: `{"message":"Welcome, Admin!"}`

## Real-World Mini-Project: Secure User API

Extend the API with a protected resource endpoint.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const User = require('../models/user');
const { authenticate, restrictTo } = require('../middleware/auth');
const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, restrictTo('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user (self or admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

::

**Update index.js**:

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const { AuthError } = require('./middleware/auth');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err instanceof AuthError) {
    res.status(401).json({ error: err.message });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test Admin Endpoint**:
- **GET** `http://localhost:3000/api/users` (with admin token):
  ```bash
  curl -H "Authorization: Bearer <admin-token>" http://localhost:3000/api/users
  ```
  **Response**: List of users (excluding passwords).

## Best Practices

### Security
- Use strong, unique `JWT_SECRET` in production.
- Store passwords securely with bcrypt.
- Validate all input data.

### Authentication
- Use JWTs for stateless authentication.
- Set token expiration (e.g., `expiresIn: '1h'`).
- Include user roles or permissions in JWT payload.

### Authorization
- Implement role-based access control.
- Restrict sensitive routes to authorized users.

### Error Handling
- Handle specific errors (e.g., duplicate email, invalid token).
- Use centralized error middleware.

## Common Patterns

### Refresh Tokens
Implement refresh tokens for long-lived sessions:
```javascript
const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
  expiresIn: '7d'
});
```

### Async Handler
Simplify async routes:
```javascript
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

## What's Next?

You’ve mastered authentication and authorization in Express.js! In the next tutorial, **Testing Node.js Applications**, you’ll learn how to write unit and integration tests for your API using tools like Jest and Supertest.

### Key Takeaways:
- Implement JWT-based authentication with Express.js
- Hash passwords securely with bcrypt
- Use role-based authorization to control access
- Secure API endpoints with middleware
- Handle authentication and authorization errors
- Follow best practices for secure APIs

## Practice Exercise
1. Create a registration endpoint with password hashing.
2. Implement a login endpoint that issues a JWT.
3. Add a protected endpoint accessible only to admins.
4. Create middleware to restrict access based on roles.
5. Test the API with `curl` or Postman.
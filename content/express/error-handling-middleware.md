---
title: Error Handling Middleware
description: Learn how to implement error handling middleware in Express.js to manage errors gracefully, provide meaningful responses, and improve application reliability.
navigation:
  order: 12
---

# Error Handling Middleware

Welcome to the Error Handling Middleware lesson! In this tutorial, you’ll learn how to handle errors in your Express.js applications using middleware to catch, process, and respond to errors effectively. Proper error handling ensures your application remains robust and provides clear feedback to users.

In this tutorial, you’ll learn:

- What error handling middleware is and how it works
- Creating custom error handling middleware
- Handling synchronous and asynchronous errors
- Returning meaningful error responses
- Logging errors for debugging
- Building a robust error-handling system

## What is Error Handling Middleware?

Error handling middleware in Express is a special type of middleware with four parameters (`err`, `req`, `res`, `next`) used to catch and process errors. It’s executed when an error is thrown or passed to `next(err)` in your application.

**Key Points**:
- Defined with `app.use((err, req, res, next) => {})`
- Placed after all other middleware and routes
- Can centralize error handling logic

## Basic Error Handling Middleware

Let’s create a simple error handling middleware to catch all errors.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

// Sample route that throws an error
app.get('/error', (req, res, next) => {
  throw new Error('Something went wrong!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error for debugging
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URL**: `http://localhost:3000/error`
**Expected Output**:
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong!"
}
```

**Explanation**:
- The `/error` route throws an error, which Express passes to the error handling middleware.
- The middleware logs the error stack and sends a JSON response with a 500 status.

## Handling Synchronous and Asynchronous Errors

### Synchronous Errors
Synchronous errors are automatically caught by Express when thrown.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.get('/user/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    const err = new Error('Invalid user ID');
    err.status = 400; // Custom status code
    throw err;
  }
  res.json({ id, name: `User ${id}` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status || 500
  });
});

app.listen(3000);
```

::

**Test URLs**:
- `http://localhost:3000/user/123` → `{ "id": 123, "name": "User 123" }`
- `http://localhost:3000/user/abc` → `{ "error": "Invalid user ID", "status": 400 }`

### Asynchronous Errors
For asynchronous code (e.g., with Promises), pass errors to `next(err)`.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.get('/data', async (req, res, next) => {
  try {
    // Simulate async operation
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Failed to fetch data')), 1000);
    });
    res.json(data);
  } catch (err) {
    next(err); // Pass error to middleware
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(3000);
```

::

**Test URL**: `http://localhost:3000/data`
**Expected Output**:
```json
{
  "error": "Internal Server Error",
  "message": "Failed to fetch data"
}
```

## Custom Error Classes

Create custom error classes for specific error types to make handling more structured.

::Editor
#title
errors.js

#default

```javascript
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

module.exports = { NotFoundError, ValidationError };
```

::

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const { NotFoundError, ValidationError } = require('./errors');
const app = express();

app.get('/user/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new ValidationError('Invalid user ID format');
  }
  if (id > 100) {
    throw new NotFoundError(`User with ID ${id} not found`);
  }
  res.json({ id, name: `User ${id}` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  res.status(err.status || 500).json({
    error: err.name,
    message: err.message
  });
});

app.listen(3000);
```

::

**Test URLs**:
- `http://localhost:3000/user/abc` → `{ "error": "ValidationError", "message": "Invalid user ID format" }`
- `http://localhost:3000/user/999` → `{ "error": "NotFoundError", "message": "User with ID 999 not found" }`

## Logging Errors

Use a logging library like `winston` for better error tracking.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const winston = require('winston');
const app = express();

// Configure logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

app.get('/test', (req, res, next) => {
  throw new Error('Test error');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(3000);
```

::

**Expected Output** (in `error.log`):
```json
{"level":"error","message":"Error: Test error","stack":"Error: Test error\n    at ...","timestamp":"2025-10-01T13:27:00.000Z"}
```

**Note**: Install `winston` with `npm install winston`.

## Building a Robust Error-Handling System

Let’s create a blog API with error handling for posts, using a router and custom errors, with an EJS frontend for user-friendly error display.

**Step 1: Define Custom Errors**

::Editor
#title
errors.js

#default

```javascript
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

module.exports = { NotFoundError, ValidationError };
```

::

**Step 2: Create Post Routes**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const { NotFoundError, ValidationError } = require('../errors');
const router = express.Router();

// Sample data
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' }
];

router.get('/', (req, res) => {
  res.render('posts', { posts });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new ValidationError('Invalid post ID');
  }
  const post = posts.find(p => p.id === id);
  if (!post) {
    throw new NotFoundError(`Post with ID ${id} not found`);
  }
  res.render('post', { post });
});

module.exports = router;
```

::

**Step 3: Main App with Error Handling**

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const winston = require('winston');

app.set('view engine', 'ejs');

// Configure logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

// Mount routes
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).render('error', {
    error: {
      name: err.name,
      message: err.message,
      status: err.status || 500
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Step 4: Create EJS Templates**

::Editor
#title
views/posts.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Posts</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 20px; }
    .post-list { display: flex; flex-direction: column; gap: 15px; }
    .post-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .post-card a { color: #3b82f6; text-decoration: none; font-weight: 600; }
    .post-card a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Blog Posts</h1>
  <div class="post-list">
    <% posts.forEach(post => { %>
      <div class="post-card">
        <a href="/posts/<%= post.id %>"><%= post.title %></a>
        <p><%= post.content.substring(0, 50) %>...</p>
      </div>
    <% }); %>
  </div>
</body>
</html>
```

::

::Editor
#title
views/post.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= post.title %></title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 20px; }
    .post-content { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    a { color: #3b82f6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1><%= post.title %></h1>
  <div class="post-content">
    <p><%= post.content %></p>
    <a href="/posts">Back to Posts</a>
  </div>
</body>
</html>
```

::

::Editor
#title
views/error.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error <%= error.status %></title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    .error-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #ef4444; margin-bottom: 20px; }
    p { color: #6b7280; margin-bottom: 20px; }
    a { color: #3b82f6; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="error-container">
    <h1>Error <%= error.status %>: <%= error.name %></h1>
    <p><%= error.message %></p>
    <a href="/posts">Back to Posts</a>
  </div>
</body>
</html>
```

::

**Test URLs**:
- `http://localhost:3000/posts` → Lists all posts
- `http://localhost:3000/posts/1` → Shows post details
- `http://localhost:3000/posts/999` → Renders error page: `Error 404: NotFoundError`
- `http://localhost:3000/posts/abc` → Renders error page: `Error 400: ValidationError`

**Note**: Install dependencies with `npm install express ejs winston`.

## Best Practices

### 1. **Centralize Error Handling**
Use a single error handling middleware at the end of your middleware stack to catch all errors.

### 2. **Use Custom Error Classes**
Define specific error types (e.g., `NotFoundError`) for consistent handling and status codes.

### 3. **Log Errors**
Log errors with a library like `winston` for debugging and monitoring.

### 4. **Provide User-Friendly Responses**
Return meaningful error messages and appropriate status codes (e.g., 400 for bad input, 404 for not found).

### 5. **Handle Async Errors**
Use `try/catch` with `next(err)` for asynchronous operations.

## Common Patterns

### Multiple Error Handlers
Use specific handlers for different error types:

```javascript
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).render('error', { error: err });
  }
  next(err); // Pass other errors to the next handler
});

app.use((err, req, res, next) => {
  res.status(500).render('error', { error: { status: 500, name: 'ServerError', message: err.message } });
});
```

### Error Recovery
Attempt to recover from certain errors:

```javascript
app.use((err, req, res, next) => {
  if (err.code === 'ECONNREFUSED') {
    // Retry logic or fallback
    return res.status(503).send('Service temporarily unavailable');
  }
  next(err);
});
```

## What's Next?

You’ve mastered error handling middleware in Express.js! In the next tutorial, we’ll cover **MongoDB with Mongoose**, where you’ll learn how to integrate MongoDB into your Express applications for persistent data storage.

### Key Takeaways:
- Error handling middleware uses four parameters (`err, req, res, next`)
- Catch synchronous errors automatically and async errors with `next(err)`
- Use custom error classes for structured error handling
- Log errors for debugging and monitoring
- Provide user-friendly error responses with appropriate status codes
- Centralize error handling for maintainability
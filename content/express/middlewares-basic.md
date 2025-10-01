---
title: Middleware Basics
description: Learn the fundamentals of middleware in Express.js, including how to create, use, and organize middleware to process requests and add functionality to your applications.
navigation:
  order: 6
---

# Middleware Basics

Welcome to the Middleware Basics lesson in our Express.js tutorial series! In this tutorial, you’ll learn about middleware in Express.js, a powerful feature that allows you to process requests, add functionality, and modify responses before they reach route handlers or are sent to the client. Middleware is essential for tasks like logging, authentication, and input validation.

In this tutorial, you’ll learn:

- What middleware is and how it works
- Creating and using middleware functions
- Applying middleware at different levels (application, router, route)
- Building custom middleware for logging and authentication
- Handling errors with middleware
- Organizing middleware for scalable applications

## What is Middleware?

**Middleware** in Express.js is a function that executes during the request-response cycle, with access to the request (`req`), response (`res`), and `next` function. Middleware can modify `req` and `res`, perform tasks, or pass control to the next middleware or route handler.

**Key Characteristics**:
- Executes in the order it’s defined
- Can terminate the request-response cycle (e.g., send a response)
- Calls `next()` to pass control to the next middleware or route
- Used for tasks like logging, authentication, parsing, and error handling

**Middleware Types**:
- **Application-level**: Applied to all routes
- **Router-level**: Applied to specific routers
- **Route-level**: Applied to specific routes
- **Error-handling**: Handles errors
- **Built-in**: Provided by Express (e.g., `express.json()`)
- **Third-party**: External packages (e.g., `morgan` for logging)

## Creating and Using Middleware

### Basic Middleware Example

Let’s create a simple Express server with middleware to log request details.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to log requests
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to the next middleware or route
};

// Apply middleware to all routes
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Run the Server**:
```bash
node app.js
```

**Test URL**: `http://localhost:3000/`
**Console Output** (example):
```
GET / - 2025-10-01T13:59:00.123Z
```

**Browser Output**: `Welcome to the Express server!`

**Explanation**:
- `requestLogger`: A custom middleware function that logs the request method, URL, and timestamp.
- `app.use()`: Applies the middleware to all incoming requests.
- `next()`: Passes control to the next middleware or route handler.

### Built-in Middleware
Express provides built-in middleware like `express.json()` and `express.urlencoded()`.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

app.post('/submit', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Received: ${name || 'No name provided'}` });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test with Postman**:
- Method: POST
- URL: `http://localhost:3000/submit`
- Body (JSON): `{"name": "Alice"}`
- Response: `{ "message": "Received: Alice" }`

**curl Example**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:3000/submit
```

## Applying Middleware at Different Levels

### Application-Level Middleware
Applied to all routes using `app.use()`.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  req.customProperty = 'Set by app-level middleware';
  next();
});

app.get('/', (req, res) => {
  res.send(`Root route: ${req.customProperty}`);
});

app.get('/about', (req, res) => {
  res.send(`About route: ${req.customProperty}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- `http://localhost:3000/` → `Root route: Set by app-level middleware`
- `http://localhost:3000/about` → `About route: Set by app-level middleware`

### Router-Level Middleware
Applied to a specific router using `express.Router`.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
  console.log('User route accessed');
  next();
});

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }]);
});

module.exports = router;
```

::

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use('/users', require('./routes/users'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URL**: `http://localhost:3000/users`
**Console Output**: `User route accessed`
**Response**: `[{ "id": 1, "name": "Alice" }]`

### Route-Level Middleware
Applied to specific routes.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

const restrictAccess = (req, res, next) => {
  if (req.query.token === 'secret') {
    next();
  } else {
    res.status(403).send('Forbidden: Invalid token');
  }
};

app.get('/protected', restrictAccess, (req, res) => {
  res.send('Welcome to the protected route!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- `http://localhost:3000/protected?token=secret` → `Welcome to the protected route!`
- `http://localhost:3000/protected` → `Forbidden: Invalid token`

## Building Custom Middleware

### Authentication Middleware
Create middleware to simulate authentication.

::Editor
#title
routes/api.js

#default

```javascript
const express = require('express');
const router = express.Router();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer mytoken') {
    req.user = { id: 1, name: 'Alice' };
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

router.get('/data', authenticate, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

module.exports = router;
```

::

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test with Postman**:
- GET `http://localhost:3000/api/data`
- Header: `Authorization: Bearer mytoken`
- Response: `{ "message": "Protected data", "user": { "id": 1, "name": "Alice" } }`
- Without header: `{ "error": "Unauthorized" }`

## Handling Errors with Middleware

Create error-handling middleware to catch and handle errors.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Custom middleware that may throw an error
app.get('/error', (req, res, next) => {
  const err = new Error('Something went wrong');
  err.status = 500;
  next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URL**: `http://localhost:3000/error`
**Response**: `{ "error": "Something went wrong" }`

## Organizing Middleware

For scalability, organize middleware in separate files.

::Editor
#title
middleware/logger.js

#default

```javascript
module.exports = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};
```

::

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const port = 3000;

app.use(logger);
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Project Structure**:
```
my-express-app/
├── middleware/
│   └── logger.js
├── routes/
│   └── api.js
├── app.js
├── package.json
```

## Best Practices

### Middleware Usage
- Place middleware like `express.json()` early in the stack.
- Use `next()` to pass control; avoid sending responses without calling `next()` unless terminating the cycle.
- Apply middleware selectively to specific routes or routers when possible.

### Error Handling
- Use dedicated error-handling middleware at the end of the stack.
- Include status codes in errors for better client feedback.

### Organization
- Store reusable middleware in a `middleware/` directory.
- Keep middleware functions focused on single responsibilities (e.g., logging, authentication).

## Common Patterns

### Conditional Middleware
Apply middleware based on conditions:

```javascript
app.use((req, res, next) => {
  if (req.method === 'GET') {
    console.log('GET request detected');
  }
  next();
});
```

### Chained Middleware
Use multiple middleware for a route:

```javascript
app.get('/secure', [middleware1, middleware2], (req, res) => {
  res.send('Secured route');
});
```

## What's Next?

You’ve mastered middleware basics in Express.js! In the next tutorial, we’ll cover **Template Engines**, where you’ll learn how to use template engines like EJS to render dynamic HTML content in your Express applications.

### Key Takeaways:
- Middleware processes requests and responses in the request-response cycle
- Create custom middleware with `req`, `res`, and `next`
- Apply middleware at application, router, or route levels
- Use error-handling middleware for consistent error responses
- Organize middleware in separate files for scalability
- Follow best practices for modular and maintainable code
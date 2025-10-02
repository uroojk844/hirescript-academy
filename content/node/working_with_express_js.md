---
title: Working with Express.js
description: Learn how to build web applications and APIs using Express.js, including routing, middleware, and error handling.
navigation:
  order: 14
---

# Working with Express.js

Welcome to the Working with Express.js lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to use **Express.js**, a fast and minimalist web framework for Node.js, to build web applications and APIs. You’ll explore routing, middleware, request handling, and error management, building on concepts from previous lessons like HTTP servers and error handling.

In this tutorial, you’ll learn:

- Setting up an Express.js application
- Creating routes for handling HTTP requests
- Using middleware for request processing
- Serving static files and JSON responses
- Implementing error-handling middleware
- Best practices for Express.js development

## What is Express.js?

**Express.js** is a lightweight Node.js framework that simplifies building web servers and APIs. It provides robust routing, middleware support, and utilities for handling HTTP requests and responses, making it a popular choice for web development.

**Key Features**:
- Simplified routing for HTTP methods (GET, POST, etc.)
- Middleware for processing requests
- Support for static file serving
- Integration with template engines and databases
- Extensible for building complex applications

## Setting Up the Project

### Initialize the Project
If you’re starting fresh, create a new project:

```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

### Install Express.js
Install Express as a dependency:

```bash
npm install express
```

**Update package.json**:

::Editor
#title
package.json

#default

```json
{
  "name": "my-express-app",
  "version": "1.0.0",
  "description": "A sample Express.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.21.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

**Project Structure**:

```
my-express-app/
├── node_modules/
├── public/
│   └── index.html
├── routes/
│   └── api.js
├── .gitignore
├── package.json
├── index.js
```

## Creating a Basic Express Server

Create a simple Express server.

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Express.js!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Run**:
```bash
npm start
```

**Expected Output** (console):
```
Server running on http://localhost:3000
```

**Test URL**: `http://localhost:3000/`

**Response**: `Welcome to Express.js!`

**Explanation**:
- `express()`: Creates an Express application.
- `app.get()`: Defines a route for GET requests.
- `app.listen()`: Starts the server on the specified port.

## Handling Routes

Define routes for different HTTP methods and paths.

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.post('/submit', (req, res) => {
  res.json({ message: 'Data submitted successfully' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URLs**:
- `http://localhost:3000/` → `Home Page`
- `http://localhost:3000/about` → `About Page`
- POST `http://localhost:3000/submit` (use `curl`):
  ```bash
  curl -X POST http://localhost:3000/submit
  ```
  **Response**: `{"message":"Data submitted successfully"}`

## Using Middleware

Middleware functions process requests before they reach route handlers.

### Built-in Middleware
Serve static files using `express.static`.

::Editor
#title
public/index.html

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome</title>
</head>
<body>
  <h1>Welcome to Express.js</h1>
</body>
</html>
```

::

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.json({ message: 'API response' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URL**: `http://localhost:3000/index.html` → Renders the HTML page.

### Custom Middleware
Log requests with a custom middleware.

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URL**: `http://localhost:3000/`

**Console Output** (example):
```
GET / - 2025-10-02T12:00:00.123Z
```

## Parsing Request Bodies

Use `express.json()` to parse JSON request bodies.

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.status(201).json({ message: `User ${name} created` });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test with curl**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:3000/api/users
```

**Response**:
```
{"message":"User Alice created"}
```

## Error-Handling Middleware

Handle errors centrally with middleware.

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/error', (req, res, next) => {
  const err = new Error('Something went wrong');
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URL**: `http://localhost:3000/error`

**Response**:
```
{"error":"Internal Server Error"}
```

**Console Output**:
```
Error: Something went wrong
```

## Real-World Mini-Project: REST API

Create a modular REST API with Express.

::Editor
#title
routes/api.js

#default

```javascript
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

router.post('/users', (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error('Name is required');
    res.status(201).json({ id: Math.random().toString(36).substring(2, 10), name });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URLs**:
- `http://localhost:3000/api/users` (GET) → `[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]`
- POST `http://localhost:3000/api/users` with `{"name":"Charlie"}`:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Charlie"}' http://localhost:3000/api/users
  ```
  **Response**: `{"id":"abcd1234","name":"Charlie"}`

## Best Practices

### Routing
- Organize routes in separate modules (e.g., `routes/api.js`).
- Use `express.Router` for modular routing.

### Middleware
- Use built-in middleware (`express.json`, `express.static`) for common tasks.
- Write custom middleware for logging, authentication, etc.

### Error Handling
- Use error-handling middleware for centralized error management.
- Return meaningful status codes and messages.

### Structure
- Keep static files in a `public/` directory.
- Organize routes and utilities in separate folders.

## Common Patterns

### Route Parameters
Handle dynamic routes:
```javascript
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});
```

### Async Middleware
Use `async` in middleware:
```javascript
app.get('/data', async (req, res, next) => {
  try {
    const data = await someAsyncOperation();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

## What's Next?

You’ve mastered building web applications with Express.js! In the next tutorial, **REST API Development**, you’ll learn how to design and implement full-featured RESTful APIs using Express.js.

### Key Takeaways:
- Use Express.js for simplified HTTP server development
- Create routes for different HTTP methods
- Implement middleware for request processing
- Serve static files and JSON responses
- Handle errors with middleware
- Follow best practices for modular Express apps

## Practice Exercise
1. Create an Express app with routes for `/home` and `/api/data`.
2. Add middleware to log request timestamps.
3. Serve a static HTML file from a `public/` directory.
4. Implement a POST endpoint to validate and store data.
5. Add error-handling middleware to catch invalid requests.
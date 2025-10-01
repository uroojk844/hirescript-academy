---
title: Routing Fundamentals
description: Learn the fundamentals of routing in Express.js, including how to define routes, handle HTTP methods, use route parameters, and organize routes for scalable applications.
navigation:
  order: 4
---

# Routing Fundamentals

Welcome to the Routing Fundamentals lesson in our Express.js tutorial series! In this tutorial, you’ll learn how to define and manage routes in Express.js to handle HTTP requests effectively. Routing is a core concept in Express, allowing you to map URLs and HTTP methods to specific handler functions, enabling dynamic and organized web applications.

In this tutorial, you’ll learn:

- What routing is in Express.js
- Defining basic routes for different HTTP methods
- Using route parameters and query strings
- Organizing routes with `express.Router`
- Handling route-specific errors
- Building a simple API with routes

## What is Routing in Express.js?

**Routing** in Express.js refers to how an application responds to client requests based on the URL path and HTTP method (e.g., GET, POST, PUT, DELETE). Each route maps a specific URL pattern and method to a handler function that processes the request and sends a response.

**Key Concepts**:
- **Route Path**: The URL pattern (e.g., `/users`, `/api/posts/:id`).
- **HTTP Method**: The type of request (GET, POST, etc.).
- **Handler Function**: A function that processes the request and sends a response, receiving `req` and `res` objects.

## Defining Basic Routes

Let’s create a simple Express server with routes for different HTTP methods.

### Basic Route Setup

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET route
app.get('/api', (req, res) => {
  res.send('Welcome to the API!');
});

// POST route
app.post('/api', (req, res) => {
  res.json({ message: 'Data received', data: req.body });
});

// PUT route
app.put('/api', (req, res) => {
  res.json({ message: 'Data updated', data: req.body });
});

// DELETE route
app.delete('/api', (req, res) => {
  res.json({ message: 'Data deleted' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- GET `http://localhost:3000/api` → `Welcome to the API!`
- POST `http://localhost:3000/api` with `{"name": "Alice"}` (use Postman) → `{ "message": "Data received", "data": { "name": "Alice" } }`
- PUT `http://localhost:3000/api` with `{"name": "Bob"}` → `{ "message": "Data updated", "data": { "name": "Bob" } }`
- DELETE `http://localhost:3000/api` → `{ "message": "Data deleted" }`

**curl Example for POST**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:3000/api
```

**Note**: Install Express: `npm install express`.

## Using Route Parameters and Query Strings

### Route Parameters
Route parameters allow dynamic URLs by capturing values from the URL path.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ID: ${userId}` });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URL**: `http://localhost:3000/users/123` → `{ "message": "User ID: 123" }`

**Explanation**:
- `:id` is a route parameter, accessible via `req.params.id`.
- You can use multiple parameters, e.g., `/users/:id/posts/:postId`.

### Query Strings
Query strings provide additional data via the URL (e.g., `?key=value`).

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/search', (req, res) => {
  const query = req.query.q || 'No query provided';
  res.json({ message: `Search query: ${query}` });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- `http://localhost:3000/search?q=Express` → `{ "message": "Search query: Express" }`
- `http://localhost:3000/search` → `{ "message": "Search query: No query provided" }`

## Organizing Routes with `express.Router`

For larger applications, organize routes into modular files using `express.Router`.

### Step 1: Create a Router File

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const router = express.Router();

// Sample data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST new user
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
```

::

### Step 2: Integrate Router in Main App

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Mount the users router
app.use('/api/users', require('./routes/users'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Project Structure**:
```
my-express-app/
├── routes/
│   └── users.js
├── app.js
├── package.json
```

**Test URLs**:
- GET `http://localhost:3000/api/users` → `[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]`
- GET `http://localhost:3000/api/users/1` → `{ id: 1, name: 'Alice' }`
- POST `http://localhost:3000/api/users` with `{"name": "Charlie"}` → `{ id: 3, name: 'Charlie' }`

## Handling Route-Specific Errors

Add error handling to routes for robustness.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

router.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const err = new Error('Invalid ID format');
      err.status = 400;
      throw err;
    }
    const user = users.find(u => u.id === id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Update app.js for Error Handling**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/users', require('./routes/users'));

// Error handling middleware
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

**Test URLs**:
- GET `http://localhost:3000/api/users/1` → `{ id: 1, name: 'Alice' }`
- GET `http://localhost:3000/api/users/999` → `{ error: 'User not found' }`
- GET `http://localhost:3000/api/users/abc` → `{ error: 'Invalid ID format' }`

## Building a Simple API with Routes

Let’s create a small blog API to demonstrate routing.

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();

const posts = [
  { id: 1, title: 'First Post', content: 'Hello, world!' },
  { id: 2, title: 'Second Post', content: 'Express is awesome!' }
];

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
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

router.post('/', (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      const err = new Error('Title and content are required');
      err.status = 400;
      throw err;
    }
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
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
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

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

**Test URLs**:
- GET `http://localhost:3000/api/posts` → List of posts
- GET `http://localhost:3000/api/posts/1` → `{ id: 1, title: 'First Post', content: 'Hello, world!' }`
- POST `http://localhost:3000/api/posts` with `{"title": "New Post", "content": "This is a new post!"}` → `{ id: 3, title: 'New Post', content: 'This is a new post!' }`

## Best Practices

### Routing
- Use specific HTTP methods for actions (GET for retrieving, POST for creating, etc.).
- Keep routes modular with `express.Router` for scalability.
- Use meaningful URL patterns (e.g., `/api/users`, `/api/posts/:id`).

### Error Handling
- Validate route parameters and request bodies.
- Use error-handling middleware for consistent error responses.

### Organization
- Group related routes in separate files (e.g., `routes/users.js`).
- Use consistent naming conventions for routes (e.g., plural for collections: `/users`).

## Common Patterns

### Route Chaining
Handle multiple methods for the same path:

```javascript
router.route('/resource')
  .get((req, res) => res.json({ message: 'Get resource' }))
  .post((req, res) => res.json({ message: 'Create resource' }));
```

### Wildcard Routes
Match patterns with wildcards:

```javascript
app.get('/files/*', (req, res) => {
  res.send(`Accessing file: ${req.path}`);
});
```

## What's Next?

You’ve successfully installed Express.js and set up your first server! In the next tutorial, we’ll cover **Request and Response Objects**, where you’ll learn how to handle client requests and send dynamic responses using the `req` and `res` objects.

### Key Takeaways:
- Routes map URLs and HTTP methods to handler functions
- Use `req.params` for dynamic URL segments and `req.query` for query strings
- Organize routes with `express.Router` for modularity
- Handle errors in routes with try-catch and middleware
- Build APIs with consistent, RESTful routes
- Follow best practices for clean and scalable routing
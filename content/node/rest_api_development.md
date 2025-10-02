---
title: REST API Development
description: Learn how to design and implement RESTful APIs using Express.js, including CRUD operations, routing, and data validation.
navigation:
  order: 15
---

# REST API Development

Welcome to the REST API Development lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to design and implement **RESTful APIs** using Express.js. You’ll build a complete API with CRUD (Create, Read, Update, Delete) operations, handle data validation, and ensure robust error handling. This lesson builds on concepts from **Working with Express.js** and **Error Handling Strategies**.

In this tutorial, you’ll learn:

- Understanding REST principles and HTTP methods
- Designing RESTful endpoints
- Implementing CRUD operations with Express.js
- Validating request data
- Organizing routes and middleware
- Best practices for REST API development

## What is a REST API?

**REST** (Representational State Transfer) is an architectural style for designing networked applications. A RESTful API uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources, identified by URLs.

**Key REST Principles**:
- **Stateless**: Each request contains all necessary information.
- **Client-Server**: Separates client and server responsibilities.
- **Uniform Interface**: Standard HTTP methods and status codes.
- **Resource-Based**: Resources (e.g., users, posts) are accessed via URLs.

**Common HTTP Methods**:
- **GET**: Retrieve a resource.
- **POST**: Create a resource.
- **PUT**: Update a resource.
- **DELETE**: Remove a resource.

## Setting Up the Project

### Initialize the Project
If starting fresh:

```bash
mkdir my-rest-api
cd my-rest-api
npm init -y
```

### Install Dependencies
Install Express and other dependencies:

```bash
npm install express
npm install --save-dev nodemon
```

**Update package.json**:

::Editor
#title
package.json

#default

```json
{
  "name": "my-rest-api",
  "version": "1.0.0",
  "description": "A RESTful API with Express.js",
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
my-rest-api/
├── node_modules/
├── data/
│   └── users.json
├── routes/
│   └── users.js
├── middleware/
│   └── validate.js
├── .gitignore
├── package.json
├── index.js
```

## Designing RESTful Endpoints

For a user management API, design endpoints like:

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/api/users`      | Retrieve all users             |
| GET    | `/api/users/:id`  | Retrieve a user by ID          |
| POST   | `/api/users`      | Create a new user              |
| PUT    | `/api/users/:id`  | Update a user by ID            |
| DELETE | `/api/users/:id`  | Delete a user by ID            |

## Implementing CRUD Operations

### Mock Data Store
Use a JSON file as a simple data store.

::Editor
#title
data/users.json

#default

```json
[
  { "id": "1", "name": "Alice", "email": "alice@example.com" },
  { "id": "2", "name": "Bob", "email": "bob@example.com" }
]
```

::

### Validation Middleware
Create middleware to validate request data.

::Editor
#title
middleware/validate.js

#default

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

module.exports = {
  ValidationError,
  validateUser: (req, res, next) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        throw new ValidationError('Name and email are required');
      }
      if (!email.includes('@')) {
        throw new ValidationError('Invalid email format');
      }
      next();
    } catch (err) {
      next(err);
    }
  }
};
```

::

### User Routes
Implement CRUD operations in a router.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { validateUser, ValidationError } = require('../middleware/validate');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/users.json');

// Helper to read users
async function readUsers() {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
}

// Helper to write users
async function writeUsers(users) {
  await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
}

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      throw new ValidationError('User not found');
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST new user
router.post('/', validateUser, async (req, res, next) => {
  try {
    const users = await readUsers();
    const newUser = {
      id: String(users.length + 1),
      name: req.body.name,
      email: req.body.email
    };
    users.push(newUser);
    await writeUsers(users);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// PUT update user
router.put('/:id', validateUser, async (req, res, next) => {
  try {
    const users = await readUsers();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      throw new ValidationError('User not found');
    }
    users[index] = { ...users[index], ...req.body, id: req.params.id };
    await writeUsers(users);
    res.json(users[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE user
router.delete('/:id', async (req, res, next) => {
  try {
    const users = await readUsers();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      throw new ValidationError('User not found');
    }
    const deletedUser = users.splice(index, 1)[0];
    await writeUsers(users);
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

### Main Application
Set up the Express server with error handling.

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const userRoutes = require('./routes/users');
const { ValidationError } = require('./middleware/validate');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err instanceof ValidationError) {
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
- **GET** `http://localhost:3000/api/users` → List all users
- **GET** `http://localhost:3000/api/users/1` → Get user with ID 1
- **POST** `http://localhost:3000/api/users`:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Charlie","email":"charlie@example.com"}' http://localhost:3000/api/users
  ```
  **Response**: `{"id":"3","name":"Charlie","email":"charlie@example.com"}`
- **PUT** `http://localhost:3000/api/users/1`:
  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"name":"Alice Updated","email":"alice.updated@example.com"}' http://localhost:3000/api/users/1
  ```
- **DELETE** `http://localhost:3000/api/users/1`:
  ```bash
  curl -X DELETE http://localhost:3000/api/users/1
  ```

## Real-World Mini-Project: Extended User API

Extend the API with query parameters and additional validation.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { validateUser, ValidationError } = require('../middleware/validate');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/users.json');

async function readUsers() {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
}

router.get('/', async (req, res, next) => {
  try {
    const users = await readUsers();
    const { name } = req.query;
    if (name) {
      const filtered = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
      return res.json(filtered);
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === req.params.id);
    if (!user) throw new ValidationError('User not found');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const users = await readUsers();
    const newUser = {
      id: String(users.length + 1),
      name: req.body.name,
      email: req.body.email
    };
    users.push(newUser);
    await writeUsers(users);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateUser, async (req, res, next) => {
  try {
    const users = await readUsers();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) throw new ValidationError('User not found');
    users[index] = { ...users[index], ...req.body, id: req.params.id };
    await writeUsers(users);
    res.json(users[index]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const users = await readUsers();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) throw new ValidationError('User not found');
    const deletedUser = users.splice(index, 1)[0];
    await writeUsers(users);
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Test Query Parameter**:
- `http://localhost:3000/api/users?name=alice` → Returns users with “Alice” in their name.

## Best Practices

### REST Design
- Use meaningful resource-based URLs (e.g., `/api/users`).
- Follow HTTP method conventions (GET for read, POST for create, etc.).
- Return appropriate status codes (200, 201, 400, 404, 500).

### Validation
- Validate all incoming data with middleware.
- Use custom error classes for specific validation errors.

### Error Handling
- Use centralized error-handling middleware.
- Provide clear error messages for users.

### Modularity
- Organize routes in separate modules.
- Keep data access logic separate from routes.

## Common Patterns

### Pagination
Add pagination to list endpoints:
```javascript
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await readUsers();
  const start = (page - 1) * limit;
  res.json(users.slice(start, start + Number(limit)));
});
```

### Async Middleware
Handle async route handlers:
```javascript
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

## What's Next?

You’ve mastered REST API development with Express.js! In the next tutorial, **Database Integration**, you’ll learn how to connect your Express.js application to databases like MongoDB or PostgreSQL.

### Key Takeaways:
- Design RESTful APIs with clear endpoints and HTTP methods
- Implement CRUD operations with Express.js
- Validate request data with middleware
- Handle errors consistently
- Organize routes and data access modularly
- Follow REST best practices for scalable APIs

## Practice Exercise
1. Create a REST API for managing tasks with CRUD endpoints.
2. Add validation middleware for task data.
3. Implement query parameters for filtering tasks.
4. Add error-handling middleware for all routes.
5. Test the API with `curl` or Postman.
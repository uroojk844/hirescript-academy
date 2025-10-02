---
title: Database Integration
description: Learn how to connect an Express.js application to databases like MongoDB, perform CRUD operations, and manage data persistence.
navigation:
  order: 16
---

# Database Integration

Welcome to the Database Integration lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to connect an **Express.js** application to a database, specifically MongoDB, to perform **CRUD** (Create, Read, Update, Delete) operations and manage data persistence. You’ll also get an overview of using PostgreSQL as an alternative. This lesson builds on concepts from **REST API Development** and **Working with Express.js**.

In this tutorial, you’ll learn:

- Setting up MongoDB with Mongoose for Node.js
- Connecting an Express.js app to a database
- Performing CRUD operations with a database
- Handling database errors
- Alternative: Using PostgreSQL with `pg`
- Best practices for database integration

## Why Database Integration?

Databases enable persistent storage for applications, allowing you to save and retrieve data like user profiles, posts, or settings. **MongoDB** is a NoSQL database ideal for flexible, JSON-like data, while **PostgreSQL** is a relational database for structured data. We’ll focus on MongoDB with Mongoose for simplicity, with notes on PostgreSQL.

**Key Tools**:
- **MongoDB**: NoSQL database storing data as JSON-like documents.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **PostgreSQL**: Relational database with SQL support (optional).

## Setting Up the Project

### Initialize the Project
If starting fresh:

```bash
mkdir my-express-api
cd my-express-api
npm init -y
```

### Install Dependencies
Install Express, Mongoose, and dotenv (for environment variables):

```bash
npm install express mongoose dotenv
npm install --save-dev nodemon
```

**Update package.json**:

::Editor
#title
package.json

#default

```json
{
  "name": "my-express-api",
  "version": "1.0.0",
  "description": "A RESTful API with Express.js and MongoDB",
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
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

**Project Structure**:

```
my-express-api/
├── node_modules/
├── models/
│   └── user.js
├── routes/
│   └── users.js
├── .env
├── .gitignore
├── package.json
├── index.js
```

## Setting Up MongoDB

1. **Install MongoDB**: Follow instructions at [mongodb.com](https://www.mongodb.com/docs/manual/installation/) or use a cloud service like MongoDB Atlas.
2. **Create .env** for MongoDB connection:

::Editor
#title
.env

#default

```
MONGODB_URI=mongodb://localhost:27017/my-express-api
```

::

**Note**: Replace `MONGODB_URI` with your MongoDB Atlas URI or local connection string.

## Connecting to MongoDB

Define a Mongoose schema and connect to the database.

::Editor
#title
models/user.js

#default

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

::

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Run**:
```bash
npm start
```

**Output**:
```
Connected to MongoDB
Server running on http://localhost:3000
```

**Explanation**:
- `mongoose.connect()`: Establishes a connection to MongoDB.
- `dotenv`: Loads environment variables from `.env`.
- `userSchema`: Defines the structure for user documents.

## Implementing CRUD Operations

Create routes for a RESTful user API.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Validation middleware
function validateUser(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
}

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new user
router.post('/', validateUser, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// PUT update user
router.put('/:id', validateUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
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
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/users', userRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test Endpoints**:
- **GET** `http://localhost:3000/api/users` → List all users
- **GET** `http://localhost:3000/api/users/:id` → Get user by ID
- **POST** `http://localhost:3000/api/users`:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com"}' http://localhost:3000/api/users
  ```
  **Response**: `{"_id":"...","name":"Alice","email":"alice@example.com","createdAt":"...","updatedAt":"..."}`
- **PUT** `http://localhost:3000/api/users/:id`:
  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"name":"Alice Updated","email":"alice.updated@example.com"}' http://localhost:3000/api/users/:id
  ```
- **DELETE** `http://localhost:3000/api/users/:id`:
  ```bash
  curl -X DELETE http://localhost:3000/api/users/:id
  ```

## Alternative: PostgreSQL with `pg`

For relational databases, use PostgreSQL with the `pg` package.

**Install**:
```bash
npm install pg
```

**Connect to PostgreSQL**:

::Editor
#title
index.js

#default

```javascript
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('PostgreSQL connection error:', err.message));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Environment Variable**:
::Editor
#title
.env

#default

```
POSTGRES_URI=postgres://user:password@localhost:5432/my-express-api
```

::

**Note**: Create a PostgreSQL database and update the connection string.

## Real-World Mini-Project: User API with MongoDB

Extend the API with query parameters and pagination.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const User = require('../models/user');
const router = express.Router();

function validateUser(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
}

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const query = name ? { name: new RegExp(name, 'i') } : {};
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', validateUser, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

router.put('/:id', validateUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

::

**Test Query Parameter**:
- `http://localhost:3000/api/users?page=1&limit=5&name=alice` → Returns users with “alice” in their name, paginated.

## Best Practices

### Database Setup
- Use environment variables for connection strings.
- Validate schemas with Mongoose or SQL constraints.

### Error Handling
- Handle specific database errors (e.g., duplicate keys).
- Use centralized error middleware.

### Performance
- Use pagination for large datasets.
- Index frequently queried fields in MongoDB.

### Modularity
- Separate models, routes, and middleware.
- Keep database logic in models or services.

## Common Patterns

### Async Handler
Simplify async route handlers:
```javascript
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

### Connection Retry
Retry database connections:
```javascript
async function connectWithRetry() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error('Retrying connection...');
    setTimeout(connectWithRetry, 5000);
  }
}
```

## What's Next?

You’ve mastered database integration with Express.js! In the next tutorial, **Authentication and Authorization**, you’ll learn how to secure your API with user authentication and role-based authorization.

### Key Takeaways:
- Connect Express.js to MongoDB using Mongoose
- Implement CRUD operations with a database
- Validate data and handle database errors
- Use pagination and query parameters
- Consider PostgreSQL for relational data
- Follow best practices for scalable database integration

## Practice Exercise
1. Create a MongoDB model for tasks with fields like title and status.
2. Build a REST API for task CRUD operations.
3. Add pagination and filtering to the task list endpoint.
4. Implement error handling for duplicate entries.
5. Test the API with `curl` or Postman.
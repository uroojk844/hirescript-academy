---
title: Testing Node.js Applications
description: Learn how to write unit and integration tests for Node.js applications using Jest and Supertest, focusing on Express.js APIs.
navigation:
  order: 18
---

# Testing Node.js Applications

Welcome to the Testing Node.js Applications lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to write **unit tests** and **integration tests** for your Node.js applications using **Jest** (a testing framework) and **Supertest** (for testing HTTP endpoints). You’ll test the secure Express.js API from the **Authentication and Authorization** lesson, covering routes, middleware, and database interactions. Testing ensures your application is reliable and maintainable.

In this tutorial, you’ll learn:

- Understanding unit and integration testing
- Setting up Jest and Supertest
- Writing unit tests for utility functions
- Writing integration tests for Express.js routes
- Testing authentication and authorization
- Best practices for testing Node.js applications

## What is Testing?

- **Unit Testing**: Tests individual functions or modules in isolation (e.g., a password hashing function).
- **Integration Testing**: Tests how components work together (e.g., API endpoints with database calls).
- **Jest**: A popular testing framework for JavaScript, supporting assertions, mocks, and test runners.
- **Supertest**: A library for testing HTTP servers, ideal for Express.js APIs.

**Key Goals**:
- Verify code behavior
- Catch bugs early
- Ensure reliability after changes

## Setting Up the Project

Use the project structure from the **Authentication and Authorization** lesson:

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

### Install Testing Dependencies
Install Jest and Supertest:

```bash
npm install --save-dev jest supertest mongodb-memory-server
```

**mongodb-memory-server** provides an in-memory MongoDB instance for testing.

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
    "dev": "nodemon index.js",
    "test": "jest --detectOpenHandles"
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
    "nodemon": "^3.1.4",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "mongodb-memory-server": "^10.0.0"
  }
}
```

::

**Project Structure (Updated)**:

```
my-secure-api/
├── node_modules/
├── models/
│   └── user.js
├── routes/
│   └── auth.js
├── middleware/
│   └── auth.js
├── tests/
│   ├── unit/
│   │   └── auth.test.js
│   └── integration/
│       └── auth.test.js
├── .env
├── .gitignore
├── package.json
├── index.js
```

## Unit Testing with Jest

Test a utility function for generating JWTs.

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
  },
  generateToken: (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
  }
};
```

::

::Editor
#title
tests/unit/auth.test.js

#default

```javascript
const jwt = require('jsonwebtoken');
const { generateToken, AuthError } = require('../../middleware/auth');

describe('Auth Utilities', () => {
  it('should generate a valid JWT', () => {
    const user = { _id: '123', role: 'user' };
    process.env.JWT_SECRET = 'test-secret';
    const token = generateToken(user);
    const decoded = jwt.verify(token, 'test-secret');
    expect(decoded.id).toBe('123');
    expect(decoded.role).toBe('user');
  });
});
```

::

**Run Tests**:
```bash
npm test
```

**Output**:
```
 PASS  tests/unit/auth.test.js
  Auth Utilities
    ✓ should generate a valid JWT (5ms)
```

## Integration Testing with Supertest

Test the authentication routes with an in-memory MongoDB instance.

::Editor
#title
tests/integration/auth.test.js

#default

```javascript
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authRoutes = require('../../routes/auth');
const User = require('../../models/user');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);

  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered');
  });

  it('should fail to register with missing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ password: 'password123' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Email and password are required');
  });

  it('should login and return a token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should access protected route with valid token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    const token = loginRes.body.token;
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });

  it('should deny access to admin route for non-admin', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    const token = loginRes.body.token;
    const res = await request(app)
      .get('/api/auth/admin')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Access denied');
  });
});
```

::

**Run Tests**:
```bash
npm test
```

**Output** (example):
```
 PASS  tests/integration/auth.test.js
  Auth API
    ✓ should register a new user (50ms)
    ✓ should fail to register with missing email (20ms)
    ✓ should login and return a token (45ms)
    ✓ should access protected route with valid token (60ms)
    ✓ should deny access to admin route for non-admin (55ms)
```

**Explanation**:
- `beforeAll`: Sets up the in-memory MongoDB and Express app.
- `afterAll`: Cleans up the database connection.
- `beforeEach`: Clears the database between tests.
- `request(app)`: Uses Supertest to send HTTP requests to the app.

## Real-World Mini-Project: Testing User Routes

Add tests for the user routes from the previous lesson.

::Editor
#title
tests/integration/users.test.js

#default

```javascript
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userRoutes = require('../../routes/users');
const authRoutes = require('../../routes/auth');
const User = require('../../models/user');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);

  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API', () => {
  let token, adminToken, userId;

  beforeEach(async () => {
    await User.deleteMany({});

    // Register and login as admin
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'admin@example.com', password: 'password123', role: 'admin' });
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' });
    adminToken = adminRes.body.token;

    // Register and login as user
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@example.com', password: 'password123', role: 'user' });
    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password123' });
    token = userRes.body.token;
    userId = (await User.findOne({ email: 'user@example.com' }))._id;
  });

  it('should get all users as admin', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should deny access to get all users for non-admin', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Access denied');
  });

  it('should update own user data', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'updated@example.com', name: 'Updated User' });
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('updated@example.com');
  });
});
```

::

**Run Tests**:
```bash
npm test
```

**Output** (example):
```
 PASS  tests/integration/users.test.js
  User API
    ✓ should get all users as admin (60ms)
    ✓ should deny access to get all users for non-admin (25ms)
    ✓ should update own user data (50ms)
```

## Best Practices

### Testing Setup
- Use `mongodb-memory-server` for isolated database tests.
- Clear data between tests with `beforeEach`.
- Mock external dependencies for unit tests.

### Test Structure
- Organize tests into unit and integration folders.
- Use `describe` blocks to group related tests.
- Write clear, specific test names (e.g., `should register a new user`).

### Coverage
- Test both success and failure cases.
- Test edge cases (e.g., missing data, invalid tokens).
- Aim for high test coverage but prioritize critical paths.

### Error Handling
- Test error responses (e.g., 401, 403, 500).
- Mock errors for database failures or invalid inputs.

## Common Patterns

### Mocking Dependencies
Mock a function with Jest:
```javascript
jest.mock('jsonwebtoken');
jwt.verify.mockReturnValue({ id: '123', role: 'user' });
```

### Async Handler for Tests
Wrap async routes:
```javascript
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

## What's Next?

You’ve mastered testing Node.js applications with Jest and Supertest! In the next tutorial, **Deploying Node.js Applications**, you’ll learn how to deploy your Express.js API to platforms like Heroku or Vercel.

### Key Takeaways:
- Write unit tests for individual functions with Jest
- Write integration tests for API endpoints with Supertest
- Use in-memory databases for testing
- Test authentication and authorization flows
- Organize tests for clarity and maintainability
- Follow best practices for reliable tests

## Practice Exercise
1. Write a unit test for a password hashing function.
2. Create integration tests for a new POST endpoint.
3. Test an endpoint with invalid JWTs.
4. Add tests for query parameters in the user list endpoint.
5. Run tests and ensure 100% coverage for critical routes.
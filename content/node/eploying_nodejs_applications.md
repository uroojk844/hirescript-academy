---
title: Deploying Node.js Applications
description: Learn how to deploy an Express.js application to Vercel, including configuration, environment variables, and deployment best practices.
navigation:
  order: 19
---

# Deploying Node.js Applications

Welcome to the Deploying Node.js Applications lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to deploy an **Express.js** application to a cloud platform, specifically **Vercel**, which is ideal for Node.js APIs. You’ll use the secure API from the **Authentication and Authorization** lesson, configure it for deployment, and manage environment variables. You’ll also get notes on deploying to other platforms like Heroku. This lesson builds on concepts from **Testing Node.js Applications** and **REST API Development**.

In this tutorial, you’ll learn:

- Preparing an Express.js app for deployment
- Deploying to Vercel using the CLI
- Configuring environment variables
- Setting up MongoDB Atlas for cloud database storage
- Monitoring and scaling deployments
- Best practices for deploying Node.js applications

## Why Deploy to the Cloud?

Deploying to a cloud platform allows your application to be accessible online, scalable, and maintainable. **Vercel** is a popular choice for Node.js applications due to its simplicity, automatic scaling, and support for serverless APIs. Alternatives like Heroku or AWS are also viable.

**Key Deployment Steps**:
1. Prepare the app (dependencies, scripts, configuration).
2. Set up a cloud database (e.g., MongoDB Atlas).
3. Deploy using a platform’s CLI or Git integration.
4. Configure environment variables and monitor.

## Setting Up the Project

Use the project from the **Authentication and Authorization** lesson:

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
├── .env
├── .gitignore
├── package.json
├── index.js
```

### Update package.json
Ensure the start script and dependencies are set.

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

### Update index.js for Production
Set the port dynamically for compatibility with Vercel.

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

::

## Setting Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. **Create a Cluster**: Set up a free-tier cluster and get the connection URI.
3. **Update .env**:

::Editor
#title
.env

#default

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/my-secure-api?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
```

::

**Note**: Replace `<username>` and `<password>` with your Atlas credentials and ensure `JWT_SECRET` is secure.

## Preparing for Vercel Deployment

### Install Vercel CLI
Install the Vercel CLI globally:

```bash
npm install -g vercel
```

### Configure Vercel
Create a `vercel.json` file to configure the deployment.

::Editor
#title
vercel.json

#default

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

::

**Explanation**:
- `builds`: Specifies that `index.js` is a Node.js application.
- `routes`: Routes all requests to `index.js`.

### Update .gitignore
Ensure sensitive files are ignored:

::Editor
#title
.gitignore

#default

```
node_modules/
.env
```

::

## Deploying to Vercel

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Deploy with Vercel CLI**:
   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy: `y`
   - Scope: Your Vercel account
   - Link to existing project: `n`
   - Directory: `.`
   - Production: `y` (or `n` for preview)

3. **Set Environment Variables**:
   After deployment, add environment variables in Vercel:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   ```
   Enter the values from your `.env` file.

4. **Access the Deployed API**:
   Vercel provides a URL (e.g., `https://my-secure-api.vercel.app`). Test endpoints:
   - `https://my-secure-api.vercel.app/api/auth/register`
   - `https://my-secure-api.vercel.app/api/auth/login`

**Example Test**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"password123","role":"user"}' https://my-secure-api.vercel.app/api/auth/register
```

**Response**: `{"message":"User registered"}`

## Alternative: Deploying to Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a Heroku App**:
   ```bash
   heroku create my-secure-api
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI=<your-mongodb-uri>
   heroku config:set JWT_SECRET=your-secret-key
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

6. **Open the App**:
   ```bash
   heroku open
   ```

## Monitoring and Scaling

- **Vercel**:
  - Use the Vercel dashboard to monitor logs and performance.
  - Vercel automatically scales serverless functions.
- **Heroku**:
  - Check logs with `heroku logs --tail`.
  - Scale dynos with `heroku ps:scale web=1`.

## Real-World Mini-Project: Deployed User API

Ensure the API from the **Authentication and Authorization** lesson is deployment-ready.

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

// Protected route
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

**Test Deployed Endpoints**:
- **POST** `https://my-secure-api.vercel.app/api/auth/register`
- **GET** `https://my-secure-api.vercel.app/api/auth/profile` (with Bearer token)

## Best Practices

### Deployment
- Use environment variables for sensitive data.
- Test locally before deploying.
- Use version control (Git) for deployments.

### Security
- Never commit `.env` to Git.
- Use secure MongoDB Atlas credentials.
- Enable HTTPS (automatic on Vercel/Heroku).

### Monitoring
- Log errors to a service like Sentry or Vercel logs.
- Monitor database performance on MongoDB Atlas.

### Scalability
- Optimize database queries with indexes.
- Use Vercel’s serverless scaling or Heroku dynos for traffic.

## Common Patterns

### Health Check Endpoint
Add a health check route:
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
```

### Retry Database Connection
Handle connection failures:
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

You’ve mastered deploying Node.js applications! In the next tutorial, **Building Scalable Node.js Apps**, you’ll learn how to optimize and scale your application for high traffic using techniques like clustering and load balancing.

### Key Takeaways:
- Prepare Express.js apps for cloud deployment
- Deploy to Vercel using the CLI
- Configure MongoDB Atlas for persistent storage
- Manage environment variables securely
- Monitor and scale deployments
- Follow best practices for reliable deployments

## Practice Exercise
1. Deploy the API from the previous lesson to Vercel.
2. Set up MongoDB Atlas and update the connection string.
3. Add a health check endpoint and test it.
4. Configure environment variables on Vercel.
5. Test all endpoints on the deployed API with `curl`.
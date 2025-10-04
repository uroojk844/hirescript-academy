---
title: Introduction to Express.js
description: Learn the basics of Express.js, set up your first Express server, and understand how to handle HTTP requests and responses.
navigation:
  order: 1
---

# Introduction to Express.js

Welcome to the first lesson in our Express.js tutorial series! In this tutorial, you’ll learn the fundamentals of Express.js, a fast and minimalist web framework for Node.js, and set up your first Express server. This lesson is designed for beginners and will guide you through creating a simple server that responds to HTTP requests.

In this tutorial, you’ll learn:

- What Express.js is and its key features
- Setting up an Express.js project
- Creating your first Express server
- Handling basic HTTP routes
- Testing your server with a browser or Postman

## What is Express.js?

**Express.js** is a lightweight and flexible Node.js web application framework that simplifies building web applications and APIs. It provides a robust set of tools for handling HTTP requests, routing, middleware, and more, making it ideal for creating both simple and complex applications.

**Key Features**:
- Simplified routing for HTTP methods (GET, POST, etc.)
- Middleware support for request processing
- Integration with template engines and databases
- Perfect for building RESTful APIs and web applications

## Setting Up Your Express.js Project

### Prerequisites
- Node.js and npm installed (download from [nodejs.org](https://nodejs.org))
- A code editor (e.g., VS Code)
- Basic understanding of JavaScript and Node.js

### Step 1: Initialize a Node.js Project
Create a new directory and initialize a Node.js project:

```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

This creates a `package.json` file with default settings.

### Step 2: Install Express
Install Express.js as a dependency:

```bash
npm install express
```

### Step 3: Create Your First Express Server
Create a file named `app.js` and set up a basic Express server.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World! Your first Express server is running!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Explanation**:
- `require('express')`: Imports the Express framework.
- `express()`: Creates an Express application instance.
- `app.get('/')`: Defines a route for GET requests to the root URL (`/`).
- `res.send()`: Sends a text response to the client.
- `app.listen(port)`: Starts the server on port 3000.

### Step 4: Run the Server
Run the server using Node.js:

```bash
node app.js
```

**Expected Output** (in console):
```
Server running on http://localhost:3000
```

**Test URL**: Open a browser or Postman and visit `http://localhost:3000`
**Expected Response**: `Hello, World! Your first Express server is running!`

## Handling Basic HTTP Routes

Let’s expand the server to handle multiple routes and HTTP methods.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to your Express.js server!');
});

// About route
app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

// POST request example
app.post('/submit', (req, res) => {
  res.send('Data submitted successfully!');
});

// 404 for undefined routes
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- `http://localhost:3000/` → `Welcome to your Express.js server!`
- `http://localhost:3000/about` → `This is the About page.`
- POST `http://localhost:3000/submit` (use Postman) → `Data submitted successfully!`
- `http://localhost:3000/unknown` → `404: Page not found`

**Testing POST with curl**:
```bash
curl -X POST http://localhost:3000/submit
```

**Note**: POST requests require a tool like Postman or curl, as browsers typically only send GET requests.

## Adding a Simple JSON API

Let’s create a basic API endpoint to return JSON data, demonstrating the response object’s capabilities.

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

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to your Express.js server!');
});

// JSON API endpoint
app.get('/api/greeting', (req, res) => {
  res.json({
    message: 'Hello from the API!',
    timestamp: new Date().toISOString()
  });
});

// POST API endpoint
app.post('/api/message', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  res.status(201).json({ message: `Received: ${message}` });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- `http://localhost:3000/` → `Welcome to your Express.js server!`
- `http://localhost:3000/api/greeting` → `{ "message": "Hello from the API!", "timestamp": "2025-10-01T..." }`
- POST `http://localhost:3000/api/message` with `{"message": "Hi!"}` (in Postman) → `{ "message": "Received: Hi!" }`

**curl Example for POST**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"message":"Hi!"}' http://localhost:3000/api/message
```

**Explanation**:
- `express.json()`: Middleware to parse JSON request bodies.
- `res.json()`: Sends a JSON response.
- `res.status()`: Sets the HTTP status code (e.g., 201 for created resources).

## Best Practices

### Server Setup
- Use a consistent port (e.g., 3000) or environment variables for flexibility.
- Include a 404 handler for undefined routes.

### Request Handling
- Use middleware like `express.json()` for APIs expecting JSON data.
- Validate request data to prevent errors (covered in later lessons).

### Response Handling
- Use appropriate HTTP status codes (e.g., 200 for success, 404 for not found).
- Prefer `res.json()` for API endpoints to ensure consistent JSON responses.

### Testing
- Test routes with a browser for GET requests and Postman or curl for other methods.
- Verify responses match expected formats.

## Common Patterns

### Health Check Endpoint
Add a simple health check for monitoring:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
```

### Dynamic Responses
Use query parameters for customization:

```javascript
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}!`);
});
```

### Explanation of Express Advantages:
- `app.use(express.json())`: Automatic JSON body parsing
- `res.json()`: Automatic JSON serialization and headers
- `res.status()`: Chainable status code setting
- Clean routing methods: `app.get()`, `app.post()`, etc.
- Built-in error handling for invalid JSON

## When to Use Express.js

Express.js is ideal for:

- **RESTful APIs**: Perfect for building backend APIs
- **Web Applications**: Server-side rendered web apps
- **Microservices**: Lightweight services architecture
- **Real-time Applications**: Chat apps, notifications (with Socket.io)
- **Single Page Applications**: Backend for React, Vue, or Angular
- **Prototyping**: Quick MVPs and proof of concepts

Express might not be the best choice if:
- You need a full-featured framework with opinions (consider NestJS or AdonisJS)
- You're building serverless functions (might be overkill)
- You need GraphQL-first approach (consider Apollo Server)

## What's Next?

You've learned the fundamentals of Express.js and why it's the go-to framework for Node.js web development! In the next tutorial, we'll cover **Installation and Setup**, where you'll learn how to install Express.js, set up your development environment, and understand the project structure.
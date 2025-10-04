---
title: Your First Server
description: Learn how to build your first Express.js server, handle basic HTTP requests, and use request and response objects to create dynamic responses.
navigation:
  order: 3
---

# Your First Server

Welcome to the Your First Server lesson! In this tutorial, you’ll build your first Express.js server and learn how to handle HTTP requests using the request (`req`) and response (`res`) objects. This lesson combines the basics of setting up an Express server with an introduction to processing client requests and sending responses, laying the foundation for dynamic web applications.

In this tutorial, you’ll learn:

- Setting up a basic Express.js server
- Understanding the request (`req`) and response (`res`) objects
- Handling routes with different HTTP methods
- Accessing request data (query parameters, body)
- Sending various types of responses (text, JSON)
- Testing your server with a browser or Postman

## What is an Express.js Server?

An **Express.js server** is a Node.js application that uses the Express framework to listen for HTTP requests and send responses. Express simplifies server creation by providing a clean API for routing, middleware, and request/response handling.

**Key Concepts**:
- **Request (`req`)**: Contains data about the client’s HTTP request (e.g., URL, query parameters, body).
- **Response (`res`)**: Used to send data back to the client (e.g., HTML, JSON, status codes).
- **Routes**: Define how the server responds to specific URLs and HTTP methods.

## Setting Up Your First Express.js Server

### Prerequisites
- Node.js and npm installed ([nodejs.org](https://nodejs.org))
- A code editor (e.g., VS Code)
- Basic knowledge of JavaScript and Node.js

### Step 1: Initialize a Node.js Project
Create a new directory and initialize a Node.js project:

```bash
mkdir my-first-express-server
cd my-first-express-server
npm init -y
```

This creates a `package.json` file.

### Step 2: Install Express
Install Express.js:

```bash
npm install express
```

### Step 3: Create Your First Server
Create a file named `app.js` to set up a basic Express server.

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
- `require('express')`: Imports Express.
- `express()`: Creates an Express application.
- `app.get('/')`: Defines a route for GET requests to the root URL (`/`).
- `res.send()`: Sends a text response to the client.
- `app.listen(port)`: Starts the server on port 3000.

### Step 4: Run the Server
Run the server:

```bash
node app.js
```

**Expected Output** (in console):
```
Server running on http://localhost:3000
```

**Test URL**: Visit `http://localhost:3000` in a browser
**Expected Response**: `Hello, World! Your first Express server is running!`

## Handling Requests and Responses

Let’s expand the server to handle different routes and use the `req` and `res` objects to process client data and send dynamic responses.

### Adding Routes with Request Data

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to your Express server!');
});

// Route with query parameters
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}!`);
});

// Route with URL parameters
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// POST route with body data
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }
  res.json({ message: 'Data received', data: { name, email } });
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
- `http://localhost:3000/` → `Welcome to your Express server!`
- `http://localhost:3000/greet?name=Alice` → `Hello, Alice!`
- `http://localhost:3000/greet` → `Hello, Guest!`
- `http://localhost:3000/user/123` → `User ID: 123`
- `http://localhost:3000/unknown` → `404: Page not found`

**Test POST with Postman**:
- Method: POST
- URL: `http://localhost:3000/submit`
- Body (JSON): `{"name": "Alice", "email": "alice@example.com"}`
- Response: `{ "message": "Data received", "data": { "name": "Alice", "email": "alice@example.com" } }`

**curl Example for POST**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com"}' http://localhost:3000/submit
```

**Explanation**:
- `req.query`: Accesses query parameters (e.g., `name` in `?name=Alice`).
- `req.params`: Accesses URL parameters (e.g., `id` in `/user/:id`).
- `req.body`: Accesses POST request body (requires `express.json()` or `express.urlencoded()` middleware).
- `res.json()`: Sends a JSON response.
- `res.status()`: Sets HTTP status code (e.g., 400 for bad request).

## Adding a Simple Frontend with EJS

Let’s add a basic EJS frontend to demonstrate rendering dynamic content using the response object.

### Step 1: Install EJS
```bash
npm install ejs
```

### Step 2: Update the Server

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Sample data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Render user list
app.get('/users', (req, res) => {
  res.render('users', { users });
});

// Form submission
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  users.push({ id: users.length + 1, name });
  res.redirect('/users');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

### Step 3: Create EJS Template

::Editor
#title
views/users.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Users</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 20px; }
    .user-list { display: flex; flex-direction: column; gap: 15px; }
    .user-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    form { margin-top: 20px; }
    input { padding: 10px; border: 2px solid #e5e7eb; border-radius: 4px; }
    button { background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #2563eb; }
  </style>
</head>
<body>
  <h1>User List</h1>
  <div class="user-list">
    <% users.forEach(user => { %>
      <div class="user-card">
        <p>Name: <%= user.name %></p>
        <p>ID: <%= user.id %></p>
      </div>
    <% }); %>
  </div>
  <form action="/users" method="POST">
    <input type="text" name="name" placeholder="Enter name" required>
    <button type="submit">Add User</button>
  </form>
</body>
</html>
```

::

**Test URLs**:
- `http://localhost:3000/users` → Displays a list of users and a form to add new users.
- Submit form with name “Charlie” → Redirects to `/users` with Charlie added to the list.

## Best Practices

### Server Setup
- Use a specific port (e.g., 3000) or environment variable (`process.env.PORT`).
- Include middleware for parsing request bodies when needed.

### Request Handling
- Access `req.query`, `req.params`, and `req.body` safely, checking for undefined values.
- Use middleware like `express.json()` or `express.urlencoded()` for POST requests.

### Response Handling
- Use `res.send()` for simple responses, `res.json()` for APIs.
- Set appropriate HTTP status codes (e.g., 200, 201, 400, 404).
- Use `res.redirect()` for navigation after form submissions.

### Error Handling
- Handle invalid routes with a 404 response.
- Validate input to prevent errors (covered in later lessons).

## Common Patterns

### Dynamic Responses
Use query parameters for customization:

```javascript
app.get('/search', (req, res) => {
  const query = req.query.q || 'nothing';
  res.send(`Search for: ${query}`);
});
```

### JSON API
Return structured JSON:

```javascript
app.get('/api/info', (req, res) => {
  res.json({ app: 'Express Server', version: '1.0' });
});
```

## What's Next?

You’ve built your first Express.js server and learned the basics of handling requests and responses! In the next tutorial, we’ll cover **Routing**, where you’ll learn how to organize and manage routes effectively in your Express applications.

### Key Takeaways:
- Express.js simplifies server creation and request handling
- Set up a server with `app.listen()` and handle routes with `app.get()`, `app.post()`, etc.
- Use `req` to access query parameters, URL parameters, and body data
- Use `res` to send text, JSON, or redirects
- Test your server with a browser, Postman, or curl
- Follow best practices for clean and maintainable code
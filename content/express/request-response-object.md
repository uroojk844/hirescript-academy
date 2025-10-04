---
title: Request and Response Objects
description: Learn how to work with Express.js request and response objects to handle HTTP requests, access client data, and send responses effectively.
navigation:
  order: 5
---

# Request and Response Objects

Welcome to the Request and Response Objects lesson! In this tutorial, you’ll learn how to use the Express.js `req` (request) and `res` (response) objects to handle incoming HTTP requests and send appropriate responses. These objects are fundamental to building dynamic web applications with Express.

In this tutorial, you’ll learn:

- What the request (`req`) and response (`res`) objects are
- Accessing request data (parameters, query strings, headers, body)
- Sending responses (JSON, HTML, status codes)
- Practical examples with a simple API
- Best practices for handling requests and responses

## What are Request and Response Objects?

In Express.js, every route handler receives two primary objects:

- **Request (`req`)**: Contains information about the incoming HTTP request, such as URL parameters, query strings, headers, and body data.
- **Response (`res`)**: Used to send a response back to the client, such as JSON data, HTML, or HTTP status codes.

These objects are provided by Express and are essential for processing client requests and crafting responses.

## Exploring the Request Object

The `req` object provides access to various parts of the HTTP request.

### Common Properties
- `req.params`: URL parameters (e.g., `/users/:id`)
- `req.query`: Query string parameters (e.g., `?name=John`)
- `req.body`: Request body (e.g., JSON or form data)
- `req.headers`: HTTP headers
- `req.method`: HTTP method (GET, POST, etc.)
- `req.url`: The request URL
- `req.path`: The URL path

**Example**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  const { id } = req.params; // e.g., "123" from /user/123
  const { name } = req.query; // e.g., "John" from ?name=John
  res.send(`User ID: ${id}, Name: ${name || 'Unknown'}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URLs**:
- `http://localhost:3000/user/123` → `User ID: 123, Name: Unknown`
- `http://localhost:3000/user/123?name=John` → `User ID: 123, Name: John`

### Parsing Request Body
To access `req.body`, use middleware like `express.json()` or `express.urlencoded()`.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`Received: Name=${name}, Email=${email}`);
});

app.listen(3000);
```

::

**Test with Postman**:
- Method: POST
- URL: `http://localhost:3000/submit`
- Body (JSON): `{"name": "Alice", "email": "alice@example.com"}`
- Response: `Received: Name=Alice, Email=alice@example.com`

## Exploring the Response Object

The `res` object is used to send responses to the client.

### Common Methods
- `res.send(data)`: Send data (string, JSON, etc.)
- `res.json(data)`: Send JSON data
- `res.status(code)`: Set HTTP status code
- `res.redirect(url)`: Redirect to another URL
- `res.render(view, locals)`: Render a view template
- `res.set(header, value)`: Set response headers

**Example**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.get('/api/user', (req, res) => {
  res.status(200).json({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  });
});

app.get('/not-found', (req, res) => {
  res.status(404).send('Resource not found');
});

app.get('/redirect', (req, res) => {
  res.redirect('/api/user');
});

app.listen(3000);
```

::

**Test URLs**:
- `http://localhost:3000/api/user` → `{ "id": 1, "name": "Alice", "email": "alice@example.com" }`
- `http://localhost:3000/not-found` → `Resource not found`
- `http://localhost:3000/redirect` → Redirects to `/api/user`

## Practical Example: Building a Simple API

Let’s create a small API to manage a list of users, demonstrating `req` and `res` usage.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test with Postman**:
1. GET `/api/users` → `[{ id: 1, name: 'Alice', ... }, { id: 2, name: 'Bob', ... }]`
2. GET `/api/users/1` → `{ id: 1, name: 'Alice', email: 'alice@example.com' }`
3. POST `/api/users` with `{"name": "Charlie", "email": "charlie@example.com"}` → `{ id: 3, name: 'Charlie', email: 'charlie@example.com' }`

## Adding a Frontend with EJS

Let’s add a simple frontend to display users.

**Step 1: Set Up EJS**

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

app.get('/users', (req, res) => {
  res.render('users', { users });
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Step 2: Create EJS Template**

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
  </style>
</head>
<body>
  <h1>Users</h1>
  <div class="user-list">
    <% users.forEach(user => { %>
      <div class="user-card">
        <h3><%= user.name %></h3>
        <p>Email: <%= user.email %></p>
      </div>
    <% }); %>
  </div>
</body>
</html>
```

::

**Test URL**: `http://localhost:3000/users` → Displays a list of users in a styled HTML page.

**Note**: Install EJS: `npm install ejs`.

## Best Practices

### Request Handling
- **Validate Input**: Check `req.body`, `req.params`, and `req.query` for valid data.
- **Use Middleware**: Parse JSON/form data early with `express.json()` or `express.urlencoded()`.
- **Handle Errors**: Return appropriate status codes (e.g., 400 for bad input, 404 for not found).

### Response Handling
- **Use Correct Status Codes**: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), etc.
- **Consistent Response Format**: Use JSON for APIs (e.g., `{ data: ..., error: ... }`).
- **Set Headers**: Use `res.set()` for custom headers when needed.

### Performance
- Avoid sending large responses unnecessarily.
- Use pagination for large datasets (covered later).

## Common Patterns

### Conditional Responses
Serve different formats based on request:

```javascript
app.get('/data', (req, res) => {
  const data = { id: 1, name: 'Alice' };
  if (req.headers['accept'] === 'application/json') {
    res.json(data);
  } else {
    res.render('data', { data });
  }
});
```

### Custom Headers
Set response headers:

```javascript
res.set('X-Custom-Header', 'value').json({ message: 'Success' });
```

## What's Next?

You’ve mastered routing fundamentals in Express.js! In the next tutorial, we’ll cover **Serving Static Files**, where you’ll learn how to use static files.

### Key Takeaways:
- `req` provides access to request data (params, query, body, headers)
- `res` sends responses (JSON, HTML, redirects, status codes)
- Use middleware to parse `req.body`
- Return appropriate status codes and consistent responses
- Combine with EJS for dynamic frontends
- Follow best practices for validation and error handling
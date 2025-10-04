---
title: HTTP Server Basics
description: Learn how to create and enhance HTTP servers using the Node.js http module, handle requests, and manage responses for web applications.
navigation:
  order: 7
---

# HTTP Server Basics

Welcome to the HTTP Server Basics lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to create and manage HTTP servers using the Node.js `http` module. You’ll build a simple web server, handle different types of requests, and return various response types, laying the foundation for building web applications and APIs. This lesson builds on previous concepts like modules and file system operations.

In this tutorial, you’ll learn:

- Creating a basic HTTP server with the `http` module
- Handling HTTP requests and responses
- Parsing URLs and query parameters
- Supporting different HTTP methods (GET, POST)
- Serving static files and JSON responses
- Best practices for building HTTP servers

## What is the HTTP Module?

The `http` module is a built-in Node.js module that allows you to create HTTP servers and clients. It provides low-level functionality for handling HTTP requests and responses, making it the foundation for frameworks like Express.js.

**Key Features**:
- Create servers to listen for HTTP requests
- Handle request methods (GET, POST, etc.)
- Set response headers and status codes
- Parse URLs and query parameters
- Stream data for efficient handling

**Importing http**:
```javascript
const http = require('http');
```

## Setting Up the Project

Ensure your project is set up (from previous lessons):

```
my-node-project/
├── node_modules/
├── utils/
├── .env
├── .gitignore
├── package.json
├── index.js
```

**Update package.json**:

::Editor
#title
package.json

#default

```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

## Creating a Basic HTTP Server

Create a simple HTTP server that responds to all requests.

::Editor
#title
index.js

#default

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World! Welcome to Node.js HTTP Server!\n');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Run**:
```bash
node index.js
```

**Expected Output** (console):
```
Server running on http://localhost:3000
```

**Test URL**: Open a browser or use `curl` to visit `http://localhost:3000`
**Response**: `Hello, World! Welcome to Node.js HTTP Server!`

**curl Example**:
```bash
curl http://localhost:3000
```

**Explanation**:
- `http.createServer()`: Creates a server with a request handler function.
- `req`: The request object (contains URL, method, headers, etc.).
- `res`: The response object (used to set status, headers, and body).
- `server.listen()`: Binds the server to a port.

## Handling Different Routes

Handle specific routes based on the request URL.

::Editor
#title
index.js

#default

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to the Home Page!\n');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('About Us Page\n');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URLs**:
- `http://localhost:3000/` → `Welcome to the Home Page!`
- `http://localhost:3000/about` → `About Us Page`
- `http://localhost:3000/unknown` → `404: Not Found`

## Parsing URLs and Query Parameters

Use the `url` module to parse URLs and extract query parameters.

::Editor
#title
index.js

#default

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/greet' && req.method === 'GET') {
    const name = query.name || 'Guest';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: `Hello, ${name}!` }));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URLs**:
- `http://localhost:3000/greet?name=Alice` → `{"message":"Hello, Alice!"}`
- `http://localhost:3000/greet` → `{"message":"Hello, Guest!"}`

**curl Example**:
```bash
curl http://localhost:3000/greet?name=Alice
```

**Explanation**:
- `url.parse(req.url, true)`: Parses the URL and extracts the `pathname` and `query` object.
- `query.name`: Accesses query parameters (e.g., `name=Alice`).

## Handling POST Requests

Handle POST requests by collecting request body data.

::Editor
#title
index.js

#default

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: JSON.parse(body) }));
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test with curl**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:3000/submit
```

**Response**:
```
{"received":{"name":"Alice"}}
```

**Explanation**:
- `req.on('data')`: Collects chunks of request body data.
- `req.on('end')`: Processes the complete body.
- `JSON.parse()`: Converts the body to a JavaScript object.

## Serving Static Files

Combine `http` with `fs` and `path` to serve static files.

::Editor
#title
index.js

#default

```javascript
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  if (req.url === '/static' && req.method === 'GET') {
    try {
      const filePath = path.join(__dirname, 'public', 'index.html');
      const content = await fs.readFile(filePath, 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500: Server Error\n');
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Create public/index.html**:

::Editor
#title
public/index.html

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Static Page</title>
</head>
<body>
  <h1>Welcome to Node.js</h1>
</body>
</html>
```

::

**Test URL**: `http://localhost:3000/static` → Renders the HTML page.

## Real-World Mini-Project: Simple API Server

Create a modular API server.

::Editor
#title
utils/api.js

#default

```javascript
const url = require('url');

module.exports = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/api/users' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]));
  } else if (pathname === '/api/greet' && req.method === 'GET') {
    const name = query.name || 'Guest';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: `Hello, ${name}!` }));
  } else if (pathname === '/api/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ received: data }));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};
```

::

::Editor
#title
index.js

#default

```javascript
const http = require('http');
const api = require('./utils/api');

const server = http.createServer(api);

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URLs**:
- `http://localhost:3000/api/users` → `[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]`
- `http://localhost:3000/api/greet?name=Alice` → `{"message":"Hello, Alice!"}`
- POST `http://localhost:3000/api/submit` with `{"name":"Alice"}` → `{"received":{"name":"Alice"}}`

**curl Example**:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:3000/api/submit
```

## Best Practices

### Request Handling
- Check `req.method` and `req.url` for routing.
- Use the `url` module for reliable URL parsing.
- Validate POST request bodies.

### Response Handling
- Set appropriate `Content-Type` headers (e.g., `application/json`).
- Use correct status codes (200, 201, 404, etc.).
- Handle errors gracefully.

### Modularity
- Move request handling logic to modules.
- Organize static files in a `public/` directory.

### Testing
- Test with `curl`, Postman, or browsers.
- Verify responses for different routes and methods.

## Common Patterns

### Serving JSON
Return JSON for APIs:

```javascript
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify(data));
```

### Simple Router
Basic routing logic:

```javascript
const routes = {
  '/': (req, res) => res.end('Home'),
  '/about': (req, res) => res.end('About')
};
server.createServer((req, res) => {
  const handler = routes[req.url] || (() => res.end('404'));
  handler(req, res);
});
```

## What's Next?

You’ve mastered HTTP server basics with the `http` module! In the next tutorial, **Events and EventEmitter**, you’ll learn how to use Node.js’s event-driven architecture to handle asynchronous events.

### Key Takeaways:
- Create HTTP servers with the `http` module
- Handle GET, POST, and other requests
- Parse URLs and query parameters with the `url` module
- Serve static files and JSON responses
- Organize server logic in modules
- Follow best practices for robust servers

## Practice Exercise
1. Create a server with routes for `/home`, `/api/data`, and a 404 handler.
2. Add a POST endpoint to echo the request body.
3. Serve a static HTML file from a `public/` directory.
4. Parse query parameters for a `/search` endpoint.
5. Test all endpoints with `curl` or Postman.
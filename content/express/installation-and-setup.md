---
title: Installation and Setup
description: Learn how to install Express.js, set up a Node.js project, and configure your environment to start building web applications with Express.
navigation:
  order: 2
---

# Installation and Setup

Welcome to the Installation and Setup lesson in our Express.js tutorial series! In this tutorial, you’ll learn how to set up a Node.js project, install Express.js, and configure your development environment to start building web applications. This lesson is designed for beginners and will ensure you have everything needed to create Express.js applications.

In this tutorial, you’ll learn:

- Prerequisites for using Express.js
- Initializing a Node.js project
- Installing Express.js and dependencies
- Setting up a basic Express server
- Configuring development tools (e.g., nodemon)
- Testing your setup

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org). Node.js includes npm (Node Package Manager) for managing dependencies.
- **Code Editor**: Use a code editor like Visual Studio Code (VS Code) for editing files.
- **Terminal**: A command-line interface (e.g., Command Prompt, Terminal, or VS Code’s integrated terminal).
- **Basic JavaScript Knowledge**: Familiarity with JavaScript and Node.js basics is helpful.

To verify Node.js and npm installation, run:

```bash
node -v
npm -v
```

**Expected Output** (example):
```
node -v
v20.17.0
npm -v
10.8.3
```

If these commands fail, install Node.js from the official website.

## Initializing a Node.js Project

### Step 1: Create a Project Directory
Create a new directory for your Express.js project:

```bash
mkdir my-express-app
cd my-express-app
```

### Step 2: Initialize the Project
Initialize a Node.js project to create a `package.json` file, which manages dependencies and scripts:

```bash
npm init -y
```

This creates a `package.json` file with default settings:

::Editor
#title
package.json

#default

```json
{
  "name": "my-express-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

::

### Step 3: Install Express.js
Install Express.js as a dependency:

```bash
npm install express
```

This adds Express to your project and updates `package.json`:

::Editor
#title
package.json

#default

```json
{
  "name": "my-express-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.0"
  }
}
```

::

## Setting Up a Basic Express Server

Create a file named `app.js` to set up your first Express server.

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
  res.send('Hello, World! Your Express.js server is up and running!');
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

### Run the Server
Run the server using Node.js:

```bash
node app.js
```

**Expected Output** (in console):
```
Server running on http://localhost:3000
```

**Test URL**: Open a browser or Postman and visit `http://localhost:3000`
**Expected Response**: `Hello, World! Your Express.js server is up and running!`

## Configuring Development Tools

To streamline development, install `nodemon` to automatically restart the server when code changes.

### Install nodemon
Install `nodemon` as a development dependency:

```bash
npm install --save-dev nodemon
```

Update `package.json` to include a start script:

::Editor
#title
package.json

#default

```json
{
  "name": "my-express-app",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

### Run with nodemon
Start the server in development mode:

```bash
npm run dev
```

**Expected Behavior**: The server restarts automatically when you modify `app.js`.

## Testing Your Setup

Let’s add a few routes to test the setup and ensure everything works.

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

// Test route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// JSON response
app.get('/api/info', (req, res) => {
  res.json({
    app: 'My Express App',
    version: '1.0.0',
    environment: 'development'
  });
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
- `http://localhost:3000/test` → `Test route is working!`
- `http://localhost:3000/api/info` → `{ "app": "My Express App", "version": "1.0.0", "environment": "development" }`
- `http://localhost:3000/unknown` → `404: Page not found`

**Testing with curl**:
```bash
curl http://localhost:3000/api/info
```

**Expected Output**:
```json
{"app":"My Express App","version":"1.0.0","environment":"development"}
```

## Project Structure

Your project directory should look like this:

```
my-express-app/
├── node_modules/
├── package.json
├── package-lock.json
├── app.js
```

## Best Practices

### Project Setup
- Always initialize a project with `npm init` to manage dependencies.
- Keep `node_modules` and `package-lock.json` out of version control (add to `.gitignore`).

### Dependency Management
- Install Express as a dependency (`npm install express`).
- Use `--save-dev` for development tools like `nodemon`.

### Server Configuration
- Use a consistent port (e.g., 3000) or environment variables (covered in later lessons).
- Include a 404 handler for undefined routes.

### Testing
- Test routes with a browser for GET requests and Postman or curl for other methods.
- Verify server logs to ensure the server starts correctly.

## Common Patterns

### Health Check Endpoint
Add a health check for monitoring:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
```

### Environment Variables
Prepare for production by using environment variables:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server running with environment variables!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

## What's Next?

You’ve successfully installed Express.js and set up your first server! In the next tutorial, we’ll cover **Request and Response Objects**, where you’ll learn how to handle client requests and send dynamic responses using the `req` and `res` objects.

### Key Takeaways:
- Initialize a Node.js project with `npm init`
- Install Express.js with `npm install express`
- Create a basic server with `app.listen()`
- Add routes to handle HTTP requests
- Use `nodemon` for easier development
- Test your server with a browser, Postman, or curl
---
title: Your First Program
description: Learn how to write and run your first Node.js program, create a basic HTTP server, and explore command-line arguments and basic scripting.
navigation:
  order: 3
---

# Your First Program

Welcome to the Your First Program lesson in our Node.js tutorial series! In this tutorial, you’ll write and run your first Node.js program, including a simple script and a basic HTTP server. You’ll also learn how to handle command-line arguments and explore foundational Node.js concepts. This lesson builds on the setup from previous lessons and prepares you for more advanced Node.js development.

In this tutorial, you’ll learn:

- Writing and running a basic Node.js script
- Creating a simple HTTP server with the `http` module
- Handling command-line arguments with `process.argv`
- Using the Node.js REPL for experimentation
- Best practices for writing Node.js programs

## Writing Your First Node.js Script

### Step 1: Create a Script
Create a file named `hello.js` in your project directory (`my-node-project` from the previous lesson).

::Editor
#title
hello.js

#default

```javascript
console.log('Hello, World! This is my first Node.js program!');
```

::

### Step 2: Run the Script
Run the script using Node.js:

```bash
node hello.js
```

**Expected Output**:
```
Hello, World! This is my first Node.js program!
```

**Explanation**:
- `console.log()`: Outputs text to the terminal.
- `node hello.js`: Executes the script in the Node.js runtime.

## Creating a Basic HTTP Server

Let’s create a simple HTTP server using Node.js’s built-in `http` module.

::Editor
#title
server.js

#default

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from your first Node.js server!\n');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Run the Server**:
```bash
node server.js
```

**Expected Output** (console):
```
Server running on http://localhost:3000
```

**Test URL**: Open a browser or use `curl` to visit `http://localhost:3000`
**Response**: `Hello from your first Node.js server!`

**curl Example**:
```bash
curl http://localhost:3000
```

**Explanation**:
- `require('http')`: Imports the `http` module.
- `http.createServer()`: Creates an HTTP server with a request handler.
- `req`: Represents the incoming request.
- `res`: Represents the response.
- `res.setHeader()`: Sets HTTP headers.
- `res.end()`: Sends the response and closes the connection.
- `server.listen()`: Starts the server on the specified port.

## Handling Command-Line Arguments

Node.js provides `process.argv` to access command-line arguments.

### Example: Greeting Script

::Editor
#title
greet.js

#default

```javascript
const name = process.argv[2] || 'World';
console.log(`Hello, ${name}!`);
```

::

**Run**:
```bash
node greet.js Alice
```

**Expected Output**:
```
Hello, Alice!
```

**Without Argument**:
```bash
node greet.js
```

**Output**:
```
Hello, World!
```

**Explanation**:
- `process.argv`: An array containing command-line arguments.
- `process.argv[0]`: Path to Node.js executable.
- `process.argv[1]`: Path to the script.
- `process.argv[2]`: First user-provided argument (e.g., `Alice`).

## Enhancing the HTTP Server

Let’s improve the server to handle different routes and return JSON.

::Editor
#title
server.js

#default

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to the Node.js server!\n');
  } else if (req.url === '/api' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello from the API!', time: new Date().toISOString() }));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: Not Found\n');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- `http://localhost:3000/` → `Welcome to the Node.js server!`
- `http://localhost:3000/api` → `{"message":"Hello from the API!","time":"2025-10-02T..."}`
- `http://localhost:3000/unknown` → `404: Not Found`

**curl Example**:
```bash
curl http://localhost:3000/api
```

## Using the Node.js REPL

The Node.js REPL (Read-Eval-Print Loop) is great for testing code interactively.

**Start REPL**:
```bash
node
```

**Example Commands**:
```javascript
> const name = 'Node.js';
> console.log(`Hello, ${name}!`);
Hello, Node.js!
undefined
> 5 * 3
15
> .exit
```

**Use Cases**:
- Test JavaScript logic
- Explore Node.js built-in modules
- Debug small snippets

## Project Structure

Your project directory should look like this:

```
my-node-project/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── hello.js
├── greet.js
├── server.js
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
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "greet": "node greet.js"
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

**Run**:
- `npm start` → Starts the HTTP server.
- `npm run greet Alice` → Runs the greeting script.

## Best Practices

### Coding
- Use clear, descriptive file names (e.g., `server.js`, `greet.js`).
- Handle different HTTP methods and paths in servers.
- Use `process.argv` for simple CLI inputs.

### Error Handling
- Add basic error checks (e.g., invalid routes).
- Use try-catch for complex logic (covered later).

### Testing
- Test scripts with `node filename.js`.
- Use `curl` or browsers for HTTP servers.
- Experiment in the REPL for quick tests.

## Common Patterns

### Dynamic Server Response
Handle query parameters:

::Editor
#title
server.js

#default

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: `Hello, ${query.name || 'Guest'}!` }));
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test**: `curl http://localhost:3000?name=Alice` → `{"message":"Hello, Alice!"}`

### CLI Tool
Create a reusable CLI script:

::Editor
#title
cli.js

#default

```javascript
#!/usr/bin/env node

const args = process.argv.slice(2);
console.log(`Arguments received: ${args.join(', ') || 'None'}`);
```

::

**Run**: `node cli.js one two` → `Arguments received: one, two`

## What's Next?

You’ve written and run your first Node.js program! In the next tutorial, **Modules and Exports**, you’ll learn how to organize code using Node.js modules and the `module.exports` system for modularity.

### Key Takeaways:
- Write and run scripts with `node filename.js`
- Create HTTP servers with the `http` module
- Use `process.argv` for command-line arguments
- Experiment with the REPL for quick testing
- Organize projects with clear file names and scripts
- Follow best practices for clean code

## Practice Exercise
1. Create a script `math.js` that takes two numbers as arguments and outputs their sum.
2. Modify `server.js` to handle POST requests (hint: collect request data).
3. Test your server with `curl` for different routes.
4. Use the REPL to test string concatenation with a variable.
5. Add a `start` script to `package.json` and run it with `npm start`.
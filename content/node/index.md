---
title: Introduction to Node.js
description: Learn the basics of Node.js, understand its architecture, and set up your environment to run your first Node.js program.
navigation:
  order: 1
---

# Introduction to Node.js

Welcome to the first lesson in our Node.js tutorial series! In this tutorial, you’ll learn the fundamentals of Node.js, a powerful JavaScript runtime that allows you to build server-side applications. This lesson is designed for beginners and will introduce you to Node.js, its key features, and how to get started with a simple program.

In this tutorial, you’ll learn:

- What Node.js is and why it’s used
- Understanding Node.js architecture (event-driven, non-blocking I/O)
- Setting up Node.js on your system
- Running your first Node.js program
- Exploring the Node.js REPL

## What is Node.js?

**Node.js** is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser, primarily for server-side development. Built on Chrome’s V8 JavaScript engine, Node.js enables developers to use JavaScript for backend applications, such as web servers, APIs, and command-line tools.

**Key Features**:
- **Asynchronous and Non-blocking**: Handles multiple operations concurrently using an event-driven model.
- **Single-threaded**: Uses a single thread with an event loop for efficient resource usage.
- **Fast Execution**: Powered by the V8 engine for high performance.
- **Extensive Ecosystem**: Leverages npm (Node Package Manager) for thousands of libraries.
- **Versatile**: Used for web servers, real-time apps, microservices, and more.

**Use Cases**:
- Building RESTful APIs
- Real-time applications (e.g., chat apps)
- Command-line tools
- Server-side rendering for web apps

## Setting Up Node.js

### Prerequisites
- A computer with Windows, macOS, or Linux
- A code editor (e.g., VS Code)
- Basic understanding of JavaScript

### Step 1: Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org). The LTS (Long-Term Support) version is recommended for stability.

- **Windows/macOS**: Run the installer and follow the prompts.
- **Linux**: Use a package manager or download the binary.

Verify installation:

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

If these commands fail, reinstall Node.js.

### Step 2: Create a Working Directory
Create a directory for your Node.js projects:

```bash
mkdir my-node-app
cd my-node-app
```

## Running Your First Node.js Program

### Step 1: Create a JavaScript File
Create a file named `hello.js`:

::Editor
#title
hello.js

#default

```javascript
console.log('Hello, World! Welcome to Node.js!');
```

::

### Step 2: Run the Program
Execute the file using Node.js:

```bash
node hello.js
```

**Expected Output**:
```
Hello, World! Welcome to Node.js!
```

**Explanation**:
- `console.log()`: Outputs text to the console.
- `node hello.js`: Runs the JavaScript file in the Node.js runtime.

### Step 3: Create a Simple Server
Let’s create a basic HTTP server using Node.js’s built-in `http` module.

::Editor
#title
server.js

#default

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js Server!\n');
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
**Response**: `Hello, Node.js Server!`

**curl Example**:
```bash
curl http://localhost:3000
```

**Explanation**:
- `http.createServer()`: Creates an HTTP server.
- `req`: Represents the incoming request.
- `res`: Represents the response to send back.
- `server.listen()`: Starts the server on port 3000.

## Exploring the Node.js REPL

The Node.js **REPL** (Read-Eval-Print Loop) is an interactive shell for testing JavaScript code.

Start the REPL:
```bash
node
```

**Example Commands**:
```javascript
> console.log('Hello from REPL!');
Hello from REPL!
undefined
> 2 + 3
5
> .exit
```

**Use Cases**:
- Test small code snippets
- Explore Node.js APIs
- Debug JavaScript logic

## Best Practices

### Environment Setup
- Use the LTS version of Node.js for stability.
- Keep Node.js and npm updated (`npm install -g npm`).

### Coding
- Use descriptive file names (e.g., `server.js` instead of `app.js` for clarity).
- Handle errors in server code (covered in later lessons).

### Testing
- Test scripts with `node filename.js`.
- Use `curl` or a browser for HTTP servers.
- Experiment in the REPL for quick prototyping.

## Common Patterns

### Basic Console Application
Create a script to process input:

::Editor
#title
greet.js

#default

```javascript
const name = process.argv[2] || 'Guest';
console.log(`Hello, ${name}!`);
```

::

**Run**:
```bash
node greet.js Alice
```

**Output**: `Hello, Alice!`

### Simple Server Response
Return JSON from the server:

::Editor
#title
server.js

#default

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Welcome to Node.js!' }));
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test**: `curl http://localhost:3000` → `{"message":"Welcome to Node.js!"}`

## What's Next?

You’ve set up Node.js and run your first program! In the next tutorial, we’ll cover **Installation and Setup**, where you’ll learn how to initialize a Node.js project and manage dependencies with npm.

### Key Takeaways:
- Node.js is a JavaScript runtime for server-side development
- Install Node.js from nodejs.org and verify with `node -v`
- Run scripts with `node filename.js`
- Create HTTP servers with the `http` module
- Use the REPL for interactive coding
- Follow best practices for a clean setup
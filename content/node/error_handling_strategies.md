---
title: Error Handling Strategies
description: Learn how to implement robust error handling in Node.js applications using try-catch, error events, custom errors, and middleware.
navigation:
  order: 13
---

# Error Handling Strategies

Welcome to the Error Handling Strategies lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to implement robust error handling in Node.js applications to ensure they are reliable, maintainable, and user-friendly. You’ll explore techniques like try-catch blocks, error events, custom error classes, and error-handling middleware, building on concepts from previous lessons like async/await and HTTP servers.

In this tutorial, you’ll learn:

- Handling errors in synchronous and asynchronous code
- Using try-catch with `async/await`
- Managing errors with `EventEmitter`
- Creating custom error classes
- Implementing error-handling middleware in HTTP servers
- Best practices for error handling in Node.js

## Why Error Handling Matters

Errors are inevitable in applications, especially when dealing with asynchronous operations, file systems, or network requests. Proper error handling ensures:
- Applications don’t crash unexpectedly
- Users receive meaningful error messages
- Developers can debug issues efficiently
- Systems remain stable under failure conditions

**Common Error Types**:
- **Synchronous Errors**: Thrown in regular JavaScript code (e.g., `TypeError`).
- **Asynchronous Errors**: Occur in callbacks, Promises, or events (e.g., file not found).
- **Operational Errors**: Expected errors (e.g., invalid user input).
- **Programmer Errors**: Bugs in code (e.g., undefined variables).

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
  "description": "A sample Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

## Handling Synchronous Errors

Use try-catch for synchronous code.

::Editor
#title
index.js

#default

```javascript
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (err) {
  console.error('Error:', err.message);
}
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Error: Division by zero
```

**Explanation**:
- `throw new Error()`: Creates and throws an error.
- `try/catch`: Captures and handles synchronous errors.

## Handling Asynchronous Errors with Callbacks

Handle errors in callback-based functions.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs');

fs.readFile('nonexistent.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err.message);
    return;
  }
  console.log('File content:', data);
});
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Error reading file: ENOENT: no such file or directory, open 'nonexistent.txt'
```

**Explanation**:
- Callbacks typically pass `err` as the first argument.
- Check `err` before processing results.

## Handling Asynchronous Errors with Promises

Use try-catch with `async/await` or `.catch()` with Promises.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('nonexistent.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err.message);
  }
}

readFile();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Error reading file: ENOENT: no such file or directory, open 'nonexistent.txt'
```

**Alternative with .catch()**:

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

fs.readFile('nonexistent.txt', 'utf8')
  .then((data) => console.log('File content:', data))
  .catch((err) => console.error('Error reading file:', err.message));
```

::

## Handling Errors with EventEmitter

Handle errors emitted by `EventEmitter` instances.

::Editor
#title
index.js

#default

```javascript
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('error', (err) => {
  console.error('EventEmitter Error:', err.message);
});

myEmitter.emit('error', new Error('Something went wrong'));
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
EventEmitter Error: Something went wrong
```

**Note**: Unhandled `error` events crash the application, so always define an `error` listener.

## Creating Custom Error Classes

Define custom errors for specific scenarios.

::Editor
#title
utils/errors.js

#default

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

module.exports = { ValidationError, DatabaseError };
```

::

::Editor
#title
index.js

#default

```javascript
const { ValidationError, DatabaseError } = require('./utils/errors');

function processInput(input) {
  if (!input) throw new ValidationError('Input is required');
  if (input === 'db-error') throw new DatabaseError('Database connection failed');
  return `Processed: ${input}`;
}

try {
  console.log(processInput(''));
} catch (err) {
  if (err instanceof ValidationError) {
    console.error('Validation Error:', err.message);
  } else if (err instanceof DatabaseError) {
    console.error('Database Error:', err.message);
  } else {
    console.error('Unexpected Error:', err.message);
  }
}
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Validation Error: Input is required
```

## Error-Handling Middleware in HTTP Servers

Implement middleware for centralized error handling in HTTP servers.

::Editor
#title
utils/server.js

#default

```javascript
const http = require('http');
const { ValidationError } = require('./errors');

function errorHandler(err, req, res) {
  console.error('Server Error:', err.message);
  if (err instanceof ValidationError) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
  } else {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

module.exports = function createServer() {
  return http.createServer((req, res) => {
    try {
      if (req.url === '/api' && req.method === 'GET') {
        throw new ValidationError('Invalid API request');
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404: Not Found');
      }
    } catch (err) {
      errorHandler(err, req, res);
    }
  });
};
```

::

::Editor
#title
index.js

#default

```javascript
const createServer = require('./utils/server');

const server = createServer();

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URL**: `http://localhost:3000/api`

**Response**:
```
{"error":"Invalid API request"}
```

**Console Output**:
```
Server running on http://localhost:3000
Server Error: Invalid API request
```

## Real-World Mini-Project: File Processing with Error Handling

Create a module to process files with robust error handling.

::Editor
#title
utils/fileProcessor.js

#default

```javascript
const fs = require('fs').promises;
const path = require('path');

class FileNotFoundError extends Error {
  constructor(filePath) {
    super(`File not found: ${filePath}`);
    this.name = 'FileNotFoundError';
  }
}

class FileProcessingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FileProcessingError';
  }
}

module.exports = {
  FileNotFoundError,
  FileProcessingError,
  processFile: async function(inputPath, outputPath) {
    try {
      const resolvedPath = path.resolve(inputPath);
      await fs.access(resolvedPath).catch(() => {
        throw new FileNotFoundError(inputPath);
      });
      const data = await fs.readFile(resolvedPath, 'utf8');
      if (!data.trim()) {
        throw new FileProcessingError('File is empty');
      }
      const transformed = data.toUpperCase();
      await fs.writeFile(outputPath, transformed);
      return 'File processed successfully';
    } catch (err) {
      throw err instanceof FileNotFoundError || err instanceof FileProcessingError
        ? err
        : new FileProcessingError(`Failed to process file: ${err.message}`);
    }
  }
};
```

::

::Editor
#title
index.js

#default

```javascript
const { processFile, FileNotFoundError, FileProcessingError } = require('./utils/fileProcessor');

async function main() {
  try {
    console.log(await processFile('nonexistent.txt', 'output.txt'));
  } catch (err) {
    if (err instanceof FileNotFoundError) {
      console.error('File Error:', err.message);
    } else if (err instanceof FileProcessingError) {
      console.error('Processing Error:', err.message);
    } else {
      console.error('Unexpected Error:', err.message);
    }
  }
}

main();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File Error: File not found: nonexistent.txt
```

## Best Practices

### Error Types
- Distinguish between operational and programmer errors.
- Use custom error classes for specific scenarios.

### Error Handling
- Always use try-catch with `async/await`.
- Handle `error` events for `EventEmitter`.
- Validate inputs to prevent errors early.

### Middleware
- Centralize error handling in HTTP servers with middleware.
- Return meaningful status codes and messages.

### Logging
- Log errors with context (e.g., timestamp, request details).
- Avoid exposing sensitive information in user-facing messages.

## Common Patterns

### Centralized Error Handler
Handle all errors in one function:
```javascript
function handleError(err) {
  if (err instanceof CustomError) {
    // Handle specific error
  } else {
    // Handle generic error
  }
}
```

### Retry Logic
Retry failed operations:
```javascript
async function retry(fn, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
```

## What's Next?

You’ve mastered error handling strategies in Node.js! In the next tutorial, **Working with Express.js**, you’ll learn how to build web applications using the Express.js framework, a powerful tool for creating APIs and servers.

### Key Takeaways:
- Handle synchronous errors with try-catch
- Manage asynchronous errors in callbacks and Promises
- Use `EventEmitter` for error events
- Create custom error classes for specific cases
- Implement error-handling middleware for HTTP servers
- Follow best practices for robust error handling

## Practice Exercise
1. Create a custom error class for invalid input validation.
2. Write an `async` function that reads a file and handles specific errors.
3. Build an HTTP server with error-handling middleware.
4. Implement retry logic for a file read operation.
5. Log errors with timestamps and details to a file.
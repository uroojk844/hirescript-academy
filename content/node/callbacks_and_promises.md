---
title: Callbacks and Promises
description: Learn how to handle asynchronous operations in Node.js using callbacks and Promises, and understand their differences and use cases.
navigation:
  order: 11
---

# Callbacks and Promises

Welcome to the Callbacks and Promises lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to manage asynchronous operations in Node.js using **callbacks** and **Promises**. Asynchronous programming is a core feature of Node.js, enabling non-blocking operations for tasks like file I/O, network requests, and timers. This lesson will help you understand how to use callbacks and Promises effectively and transition between them.

In this tutorial, you’ll learn:

- Understanding asynchronous programming in Node.js
- Using callbacks for asynchronous operations
- Working with Promises for cleaner asynchronous code
- Converting callbacks to Promises
- Error handling with callbacks and Promises
- Best practices for asynchronous programming

## What are Callbacks and Promises?

- **Callbacks**: Functions passed as arguments to other functions, executed when an asynchronous operation completes. Common in Node.js APIs like `fs.readFile`.
- **Promises**: Objects representing the eventual completion (or failure) of an asynchronous operation, providing a cleaner way to handle asynchronous code with `.then()` and `.catch()`.

**Key Concepts**:
- **Asynchronous**: Operations that don’t block the main thread (e.g., reading files, HTTP requests).
- **Callback Hell**: Nested callbacks that make code hard to read.
- **Promise Chaining**: Sequential Promise operations using `.then()`.

**Importing Modules** (for examples):
```javascript
const fs = require('fs');
const fsPromises = require('fs').promises;
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

## Using Callbacks

Callbacks are the traditional way to handle asynchronous operations in Node.js.

### Example: Reading a File with Callbacks

::Editor
#title
index.js

#default

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err.message);
    return;
  }
  console.log('File content:', data);
});
```

::

**Create example.txt**:
::Editor
#title
example.txt

#default

```
Hello, Node.js!
```

::

**Run**:
```bash
node index.js
```

**Expected Output**:
```
File content: Hello, Node.js!
```

**Explanation**:
- `fs.readFile()`: Takes a callback with `err` (error) and `data` (result) parameters.
- The callback is executed when the file read operation completes.

### Callback Hell Example
Nested callbacks can become unwieldy:

::Editor
#title
index.js

#default

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading example.txt:', err.message);
    return;
  }
  fs.writeFile('output.txt', data.toUpperCase(), (err) => {
    if (err) {
      console.error('Error writing output.txt:', err.message);
      return;
    }
    fs.readFile('output.txt', 'utf8', (err, newData) => {
      if (err) {
        console.error('Error reading output.txt:', err.message);
        return;
      }
      console.log('Final content:', newData);
    });
  });
});
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Final content: HELLO, NODE.JS!
```

**Problem**: Nested callbacks create “callback hell,” making code hard to read and maintain.

## Using Promises

Promises provide a cleaner way to handle asynchronous operations.

### Example: Reading a File with Promises

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
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
File content: Hello, Node.js!
```

**Explanation**:
- `fs.promises.readFile`: Returns a Promise.
- `async/await`: Simplifies Promise handling.
- `try/catch`: Handles errors cleanly.

### Promise Chaining
Chain multiple asynchronous operations:

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

fs.readFile('example.txt', 'utf8')
  .then((data) => {
    console.log('File content:', data);
    return fs.writeFile('output.txt', data.toUpperCase());
  })
  .then(() => fs.readFile('output.txt', 'utf8'))
  .then((newData) => {
    console.log('Final content:', newData);
  })
  .catch((err) => {
    console.error('Error:', err.message);
  });
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File content: Hello, Node.js!
Final content: HELLO, NODE.JS!
```

**Explanation**:
- `.then()`: Handles resolved Promises.
- `.catch()`: Handles errors for the entire chain.
- Each `.then()` can return a Promise for chaining.

## Converting Callbacks to Promises

Use `util.promisify` to convert callback-based functions to Promise-based ones.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function main() {
  try {
    const data = await readFile('example.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error:', err.message);
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
File content: Hello, Node.js!
```

## Creating Custom Promises

Create your own Promises for custom asynchronous tasks.

::Editor
#title
index.js

#default

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Delayed for ${ms}ms`), ms);
  });
}

async function main() {
  try {
    const result = await delay(1000);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
```

::

**Run**:
```bash
node index.js
```

**Output** (after 1 second):
```
Delayed for 1000ms
```

## Real-World Mini-Project: File Processor Module

Create a module to process files using Promises.

::Editor
#title
utils/fileProcessor.js

#default

```javascript
const fs = require('fs').promises;

module.exports = {
  processFile: async function(inputPath, outputPath) {
    try {
      const data = await fs.readFile(inputPath, 'utf8');
      const transformed = data.toUpperCase();
      await fs.writeFile(outputPath, transformed);
      return 'File processed successfully';
    } catch (err) {
      throw new Error(`Failed to process file: ${err.message}`);
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
const fileProcessor = require('./utils/fileProcessor');

async function main() {
  try {
    console.log(await fileProcessor.processFile('example.txt', 'output.txt'));
    const content = await fs.readFile('output.txt', 'utf8');
    console.log('Output content:', content);
  } catch (err) {
    console.error('Error:', err.message);
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
File processed successfully
Output content: HELLO, NODE.JS!
```

## Best Practices

### Callbacks
- Use callbacks for simple, one-off tasks.
- Avoid deep nesting to prevent callback hell.
- Always handle errors in callbacks.

### Promises
- Use Promises for cleaner asynchronous code.
- Chain operations with `.then()` or use `async/await`.
- Centralize error handling with `.catch()` or try-catch.

### General
- Prefer `fs.promises` over callback-based `fs` methods.
- Use `util.promisify` for legacy APIs.
- Validate inputs to avoid unhandled rejections.

## Common Patterns

### Sequential Operations
Use `async/await` for sequential tasks:
```javascript
async function processFiles() {
  await fs.writeFile('file1.txt', 'Data 1');
  await fs.writeFile('file2.txt', 'Data 2');
}
```

### Parallel Promises
Run Promises concurrently:
```javascript
const [data1, data2] = await Promise.all([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8')
]);
```

## What's Next?

You’ve mastered callbacks and Promises for asynchronous programming! In the next tutorial, **Async/Await Patterns**, you’ll dive deeper into using `async/await` for advanced asynchronous workflows.

### Key Takeaways:
- Callbacks handle asynchronous operations but can lead to callback hell
- Promises provide a cleaner way with `.then()` and `.catch()`
- Use `async/await` for readable Promise-based code
- Convert callbacks to Promises with `util.promisify`
- Handle errors consistently in callbacks and Promises
- Follow best practices for maintainable async code

## Practice Exercise
1. Write a callback-based function to read two files sequentially.
2. Convert the function to use Promises with `util.promisify`.
3. Use `async/await` to read and combine contents of two files.
4. Create a custom Promise that resolves after a random delay.
5. Handle errors for a non-existent file read operation.
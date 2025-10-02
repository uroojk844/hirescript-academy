---
title: Async/Await Patterns
description: Learn advanced async/await patterns in Node.js to manage asynchronous operations, including sequential, parallel, and error handling patterns.
navigation:
  order: 12
---

# Async/Await Patterns

Welcome to the Async/Await Patterns lesson in our Node.js tutorial series! In this tutorial, you’ll dive deeper into using `async/await` to manage asynchronous operations in Node.js. Building on the **Callbacks and Promises** lesson, you’ll learn advanced patterns for handling sequential, parallel, and complex asynchronous workflows, along with robust error handling. These patterns are essential for writing clean and efficient Node.js applications.

In this tutorial, you’ll learn:

- Using `async/await` for sequential and parallel operations
- Handling multiple Promises with `Promise.all` and `Promise.race`
- Managing errors in `async/await` workflows
- Combining `async/await` with other Node.js modules
- Creating reusable async utility functions
- Best practices for `async/await` programming

## What is Async/Await?

`async/await` is a syntactic sugar built on top of Promises, making asynchronous code look and behave like synchronous code. It’s widely used in Node.js for its readability and simplicity.

**Key Concepts**:
- **async**: Declares a function that returns a Promise.
- **await**: Pauses execution until a Promise resolves, used inside `async` functions.
- **Error Handling**: Use try-catch blocks to handle Promise rejections.

**Importing Modules** (for examples):
```javascript
const fs = require('fs').promises;
const path = require('path');
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

## Sequential Async/Await

Execute asynchronous operations one after another.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function processFilesSequentially() {
  try {
    const file1 = await fs.readFile('file1.txt', 'utf8');
    console.log('File 1:', file1);
    const file2 = await fs.readFile('file2.txt', 'utf8');
    console.log('File 2:', file2);
    await fs.writeFile('output.txt', file1 + '\n' + file2);
    console.log('Files combined successfully');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

processFilesSequentially();
```

::

**Create Files**:
::Editor
#title
file1.txt

#default

```
Content of file 1
```

::
::Editor
#title
file2.txt

#default

```
Content of file 2
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File 1: Content of file 1
File 2: Content of file 2
Files combined successfully
```

**Result**: Creates `output.txt` with:
```
Content of file 1
Content of file 2
```

**Explanation**:
- `await` ensures each operation completes before the next begins.
- Operations are sequential, ideal for dependent tasks.

## Parallel Async/Await with Promise.all

Run multiple asynchronous operations concurrently using `Promise.all`.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function processFilesParallel() {
  try {
    const [file1, file2] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8')
    ]);
    console.log('File 1:', file1);
    console.log('File 2:', file2);
    await fs.writeFile('output.txt', file1 + '\n' + file2);
    console.log('Files combined successfully');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

processFilesParallel();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File 1: Content of file 1
File 2: Content of file 2
Files combined successfully
```

**Explanation**:
- `Promise.all`: Takes an array of Promises and resolves when all complete.
- Parallel execution is faster for independent tasks.
- Errors in any Promise reject the entire `Promise.all`.

## Using Promise.race

Resolve or reject as soon as one Promise completes.

::Editor
#title
index.js

#default

```javascript
async function raceExample() {
  try {
    const result = await Promise.race([
      new Promise((resolve) => setTimeout(() => resolve('Task 1 done'), 1000)),
      new Promise((resolve) => setTimeout(() => resolve('Task 2 done'), 500)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Task 3 failed')), 700))
    ]);
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

raceExample();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Result: Task 2 done
```

**Explanation**:
- `Promise.race`: Resolves or rejects with the first Promise to settle.
- Useful for timeouts or selecting the fastest response.

## Combining with HTTP Server

Use `async/await` in an HTTP server.

::Editor
#title
index.js

#default

```javascript
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/files' && req.method === 'GET') {
      const filePath = path.join(__dirname, 'file1.txt');
      const data = await fs.readFile(filePath, 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    } else {
      res.statusCode = 404;
      res.end('404: Not Found');
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URL**: `http://localhost:3000/files`

**Response**: `Content of file 1`

## Real-World Mini-Project: File Batch Processor

Create a module for batch processing files with `async/await`.

::Editor
#title
utils/batchProcessor.js

#default

```javascript
const fs = require('fs').promises;
const path = require('path');

module.exports = {
  processFiles: async function(inputDir, outputFile) {
    try {
      const files = await fs.readdir(inputDir);
      const contents = await Promise.all(
        files.map(file => fs.readFile(path.join(inputDir, file), 'utf8'))
      );
      const combined = contents.join('\n');
      await fs.writeFile(outputFile, combined);
      return `Processed ${files.length} files into ${outputFile}`;
    } catch (err) {
      throw new Error(`Batch processing failed: ${err.message}`);
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
const batchProcessor = require('./utils/batchProcessor');
const path = require('path');

async function main() {
  try {
    const inputDir = path.join(__dirname, 'input');
    const outputFile = path.join(__dirname, 'combined.txt');
    console.log(await batchProcessor.processFiles(inputDir, outputFile));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
```

::

**Create Input Files**:
::Editor
#title
input/file1.txt

#default

```
Data from file 1
```

::
::Editor
#title
input/file2.txt

#default

```
Data from file 2
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Processed 2 files into /path/to/my-node-project/combined.txt
```

**Result**: Creates `combined.txt` with:
```
Data from file 1
Data from file 2
```

## Best Practices

### Async/Await Usage
- Use `async/await` for readable asynchronous code.
- Avoid mixing `async/await` with `.then()` unless necessary.
- Use `Promise.all` for parallel operations.

### Error Handling
- Always wrap `await` in try-catch blocks.
- Handle specific errors when possible (e.g., `ENOENT` for missing files).

### Modularity
- Encapsulate async logic in reusable functions or modules.
- Keep async functions focused on single tasks.

### Performance
- Use `Promise.all` for independent tasks to improve performance.
- Avoid unnecessary `await` in loops; use `map` with `Promise.all`.

## Common Patterns

### Timeout Wrapper
Add a timeout to async operations:
```javascript
async function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), ms)
  );
  return Promise.race([promise, timeout]);
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

You’ve mastered `async/await` patterns for asynchronous programming! In the next tutorial, **Error Handling Strategies**, you’ll learn how to implement robust error handling in Node.js applications.

### Key Takeaways:
- Use `async/await` for readable asynchronous code
- Execute tasks sequentially or in parallel with `Promise.all`
- Use `Promise.race` for first-to-complete scenarios
- Integrate `async/await` with HTTP servers and file operations
- Create reusable async modules
- Follow best practices for performance and error handling

## Practice Exercise
1. Write an `async` function to read three files sequentially.
2. Modify it to read the files in parallel using `Promise.all`.
3. Create a function that uses `Promise.race` to timeout a file read after 2 seconds.
4. Build an HTTP server that serves combined file contents using `async/await`.
5. Implement retry logic for a file read operation that may fail.
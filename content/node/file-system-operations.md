---
title: File System Operations
description: Learn how to use the Node.js File System (fs) module to read, write, update, and delete files, and manage directories in your applications.
navigation:
  order: 5
---

# File System Operations

Welcome to the File System Operations lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to use the Node.js `fs` (File System) module to perform common file operations such as reading, writing, updating, and deleting files, as well as managing directories. This lesson builds on the modularity concepts from the previous lesson and is essential for applications that interact with the file system, such as data processing or file management tools.

In this tutorial, you’ll learn:

- Understanding the `fs` module
- Reading files synchronously and asynchronously
- Writing and appending to files
- Deleting files and directories
- Managing directories (create, read, delete)
- Best practices for file system operations

## What is the File System Module?

The `fs` module is a built-in Node.js module that provides functions to interact with the file system. It supports both **synchronous** (blocking) and **asynchronous** (non-blocking) methods for operations like reading, writing, and deleting files or directories.

**Key Features**:
- Read and write files in various formats (text, binary, etc.)
- Create, delete, and manage directories
- Handle file metadata (e.g., size, permissions)
- Asynchronous methods use callbacks or Promises for non-blocking operations

**Importing fs**:
```javascript
const fs = require('fs');
// For Promise-based methods
const fsPromises = require('fs').promises;
```

## Setting Up the Project

### Project Structure
Ensure your project is set up (from previous lessons):

```
my-node-project/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── index.js
```

**Install nodemon** (optional, for development):
```bash
npm install --save-dev nodemon
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

## Reading Files

### Synchronous Reading
Use `fs.readFileSync` for simple, blocking file reading.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs');

try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('File content:', data);
} catch (err) {
  console.error('Error reading file:', err.message);
}
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

**Note**: `readFileSync` blocks execution, so use it for small files or initialization.

### Asynchronous Reading (Callback)
Use `fs.readFile` for non-blocking reading.

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

**Run**:
```bash
node index.js
```

**Output**:
```
File content: Hello, Node.js!
```

### Asynchronous Reading (Promises)
Use `fs.promises` for Promise-based operations.

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

## Writing Files

### Synchronous Writing
Use `fs.writeFileSync` to write files.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs');

try {
  fs.writeFileSync('output.txt', 'This is written by Node.js!');
  console.log('File written successfully');
} catch (err) {
  console.error('Error writing file:', err.message);
}
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File written successfully
```

**Result**: Creates `output.txt` with the content `This is written by Node.js!`.

### Asynchronous Writing (Promises)
Use `fs.promises.writeFile`.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function writeFile() {
  try {
    await fs.writeFile('output.txt', 'This is written asynchronously!');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err.message);
  }
}

writeFile();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File written successfully
```

## Appending to Files

Use `fs.appendFile` or `fs.promises.appendFile` to add content to a file.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function appendFile() {
  try {
    await fs.appendFile('output.txt', '\nAppended text!');
    console.log('File appended successfully');
  } catch (err) {
    console.error('Error appending file:', err.message);
  }
}

appendFile();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File appended successfully
```

**Result**: `output.txt` now contains:
```
This is written asynchronously!
Appended text!
```

## Deleting Files

Use `fs.unlink` or `fs.promises.unlink` to delete a file.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function deleteFile() {
  try {
    await fs.unlink('output.txt');
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Error deleting file:', err.message);
  }
}

deleteFile();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File deleted successfully
```

**Note**: If the file doesn’t exist, an error is thrown (handle with try-catch).

## Managing Directories

### Creating a Directory
Use `fs.mkdir` or `fs.promises.mkdir`.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function createDir() {
  try {
    await fs.mkdir('my_folder');
    console.log('Directory created successfully');
  } catch (err) {
    console.error('Error creating directory:', err.message);
  }
}

createDir();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Directory created successfully
```

### Reading Directory Contents
Use `fs.readdir` or `fs.promises.readdir`.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function readDir() {
  try {
    const files = await fs.readdir('.');
    console.log('Directory contents:', files);
  } catch (err) {
    console.error('Error reading directory:', err.message);
  }
}

readDir();
```

::

**Run**:
```bash
node index.js
```

**Output** (example):
```
Directory contents: ['example.txt', 'index.js', 'my_folder', 'package.json']
```

### Deleting a Directory
Use `fs.rmdir` or `fs.promises.rmdir` (for empty directories).

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function deleteDir() {
  try {
    await fs.rmdir('my_folder');
    console.log('Directory deleted successfully');
  } catch (err) {
    console.error('Error deleting directory:', err.message);
  }
}

deleteDir();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Directory deleted successfully
```

**Note**: For non-empty directories, use `fs.rm` with `{ recursive: true }` (Node.js 14+).

## Real-World Mini-Project: File Manager Module

Create a reusable `fs` module.

::Editor
#title
utils/fileManager.js

#default

```javascript
const fs = require('fs').promises;

module.exports = {
  read: async function(path) {
    try {
      return await fs.readFile(path, 'utf8');
    } catch (err) {
      throw new Error(`Failed to read file: ${err.message}`);
    }
  },
  write: async function(path, content) {
    try {
      await fs.writeFile(path, content);
      return 'File written successfully';
    } catch (err) {
      throw new Error(`Failed to write file: ${err.message}`);
    }
  },
  append: async function(path, content) {
    try {
      await fs.appendFile(path, content);
      return 'File appended successfully';
    } catch (err) {
      throw new Error(`Failed to append file: ${err.message}`);
    }
  },
  delete: async function(path) {
    try {
      await fs.unlink(path);
      return 'File deleted successfully';
    } catch (err) {
      throw new Error(`Failed to delete file: ${err.message}`);
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
const fileManager = require('./utils/fileManager');

async function main() {
  try {
    await fileManager.write('test.txt', 'Hello, File Manager!\n');
    console.log(await fileManager.read('test.txt'));
    await fileManager.append('test.txt', 'Additional content\n');
    console.log(await fileManager.read('test.txt'));
    console.log(await fileManager.delete('test.txt'));
  } catch (err) {
    console.error(err.message);
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
Hello, File Manager!
Hello, File Manager!
Additional content
File deleted successfully
```

## Best Practices

### Asynchronous vs Synchronous
- Prefer asynchronous methods (`fs.promises`) for non-blocking operations.
- Use synchronous methods (`fs.readFileSync`) only for initialization or small scripts.

### Error Handling
- Always use try-catch for file operations.
- Check for file existence before reading/deleting (use `fs.access`).

### File Paths
- Use `path` module for cross-platform compatibility (covered in next lesson).
- Avoid hardcoding paths; use relative paths or environment variables.

### Security
- Validate file paths to prevent directory traversal attacks.
- Handle permissions errors gracefully.

## Common Patterns

### Checking File Existence
::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function checkFile(path) {
  try {
    await fs.access(path);
    console.log('File exists');
  } catch {
    console.log('File does not exist');
  }
}

checkFile('example.txt');
```

::

### Batch File Operations
::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;

async function processFiles() {
  try {
    await fs.writeFile('data.txt', 'Initial data\n');
    await fs.appendFile('data.txt', 'More data\n');
    const content = await fs.readFile('data.txt', 'utf8');
    console.log(content);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

processFiles();
```

::

## What's Next?

You’ve mastered file system operations with the `fs` module! In the next tutorial, **Path and OS**, you’ll learn how to use the `path` and `os` modules to handle file paths and system information in a cross-platform way.

### Key Takeaways:
- Use the `fs` module for file and directory operations
- Prefer asynchronous methods (`fs.promises`) for performance
- Handle errors with try-catch for robustness
- Create reusable file modules for modularity
- Organize file operations in a clean project structure
- Follow best practices for asynchronous, secure file handling

## Practice Exercise
1. Create a module `fileUtils.js` with functions to copy a file and list directory contents.
2. Write a script that reads a file, converts its content to uppercase, and writes to a new file.
3. Create a directory, add multiple files, and list its contents.
4. Delete all files in a directory and then delete the directory.
5. Test error handling by attempting to read a non-existent file.
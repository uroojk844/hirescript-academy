---
title: Path and OS
description: Learn how to use the Node.js path and os modules to handle file paths and retrieve system information in a cross-platform manner.
navigation:
  order: 6
---

# Path and OS

Welcome to the Path and OS lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to use the Node.js `path` module to manage file paths and directories in a cross-platform way, and the `os` module to retrieve system information such as CPU details, memory, and platform specifics. These modules are essential for building applications that work consistently across different operating systems (Windows, macOS, Linux).

In this tutorial, you’ll learn:

- Using the `path` module for cross-platform file path handling
- Common `path` module methods (e.g., `join`, `resolve`, `basename`)
- Using the `os` module to access system information
- Combining `path` and `os` with the `fs` module for file operations
- Best practices for cross-platform development
- Building a utility module for path and system operations

## What are the Path and OS Modules?

- **Path Module**: A built-in Node.js module that provides utilities for working with file and directory paths. It ensures paths are formatted correctly for the operating system (e.g., `/` on Linux/macOS, `\` on Windows).
- **OS Module**: A built-in module that provides information about the operating system, such as platform, CPU details, memory usage, and user information.

**Importing Modules**:
```javascript
const path = require('path');
const os = require('os');
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

**Update package.json** (for reference):

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

## Using the Path Module

The `path` module helps handle file paths consistently across platforms.

### Common Path Methods

::Editor
#title
index.js

#default

```javascript
const path = require('path');

// Join paths
const filePath = path.join('folder', 'subfolder', 'file.txt');
console.log('Joined Path:', filePath);

// Resolve absolute path
const absolutePath = path.resolve('folder', 'file.txt');
console.log('Absolute Path:', absolutePath);

// Get file name
const fileName = path.basename('folder/subfolder/file.txt');
console.log('File Name:', fileName);

// Get directory name
const dirName = path.dirname('folder/subfolder/file.txt');
console.log('Directory Name:', dirName);

// Get file extension
const extName = path.extname('file.txt');
console.log('Extension:', extName);
```

::

**Run**:
```bash
node index.js
```

**Expected Output** (example, varies by OS):
```
Joined Path: folder/subfolder/file.txt
Absolute Path: /path/to/my-node-project/folder/file.txt
File Name: file.txt
Directory Name: folder/subfolder
Extension: .txt
```

**Explanation**:
- `path.join()`: Combines path segments using the OS-specific separator.
- `path.resolve()`: Returns an absolute path from the current working directory.
- `path.basename()`: Extracts the file name from a path.
- `path.dirname()`: Extracts the directory path.
- `path.extname()`: Gets the file extension.

### Path with File System
Combine `path` with `fs` for robust file operations.

::Editor
#title
index.js

#default

```javascript
const fs = require('fs').promises;
const path = require('path');

async function fileOperations() {
  try {
    const filePath = path.join(__dirname, 'data', 'example.txt');
    await fs.writeFile(filePath, 'Hello, Node.js with Path!');
    const content = await fs.readFile(filePath, 'utf8');
    console.log('File Content:', content);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

fileOperations();
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
File Content: Hello, Node.js with Path!
```

**Result**: Creates `data/example.txt` in the project directory.

**Explanation**:
- `__dirname`: Global variable for the current directory path.
- `path.join(__dirname, ...)`: Ensures cross-platform path compatibility.

## Using the OS Module

The `os` module provides system-related information.

::Editor
#title
index.js

#default

```javascript
const os = require('os');

console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPUs:', os.cpus().length);
console.log('Total Memory (GB):', (os.totalmem() / 1024 ** 3).toFixed(2));
console.log('Free Memory (GB):', (os.freemem() / 1024 ** 3).toFixed(2));
console.log('Home Directory:', os.homedir());
console.log('Hostname:', os.hostname());
```

::

**Run**:
```bash
node index.js
```

**Output** (example, varies by system):
```
Platform: linux
Architecture: x64
CPUs: 4
Total Memory (GB): 7.80
Free Memory (GB): 3.25
Home Directory: /home/user
Hostname: my-machine
```

**Explanation**:
- `os.platform()`: Returns the OS (e.g., `linux`, `win32`, `darwin`).
- `os.arch()`: Returns CPU architecture (e.g., `x64`).
- `os.cpus()`: Returns an array of CPU core details.
- `os.totalmem()` and `os.freemem()`: Memory in bytes.
- `os.homedir()`: User’s home directory.
- `os.hostname()`: Machine’s hostname.

## Real-World Mini-Project: System Info and File Utility

Create a module to combine `path`, `os`, and `fs` for a system info and file management utility.

::Editor
#title
utils/systemUtils.js

#default

```javascript
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

module.exports = {
  getSystemInfo: function() {
    return {
      platform: os.platform(),
      architecture: os.arch(),
      cpuCount: os.cpus().length,
      totalMemoryGB: (os.totalmem() / 1024 ** 3).toFixed(2),
      freeMemoryGB: (os.freemem() / 1024 ** 3).toFixed(2)
    };
  },
  saveSystemInfo: async function(outputDir, fileName) {
    try {
      const dirPath = path.join(__dirname, '..', outputDir);
      await fs.mkdir(dirPath, { recursive: true });
      const filePath = path.join(dirPath, fileName);
      const info = this.getSystemInfo();
      await fs.writeFile(filePath, JSON.stringify(info, null, 2));
      return `System info saved to ${filePath}`;
    } catch (err) {
      throw new Error(`Failed to save system info: ${err.message}`);
    }
  },
  readFileWithPath: async function(dir, fileName) {
    try {
      const filePath = path.join(__dirname, '..', dir, fileName);
      const content = await fs.readFile(filePath, 'utf8');
      return content;
    } catch (err) {
      throw new Error(`Failed to read file: ${err.message}`);
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
const systemUtils = require('./utils/systemUtils');

async function main() {
  try {
    // Get system info
    console.log('System Info:', systemUtils.getSystemInfo());

    // Save system info to file
    console.log(await systemUtils.saveSystemInfo('output', 'system-info.json'));

    // Read saved file
    const content = await systemUtils.readFileWithPath('output', 'system-info.json');
    console.log('Saved File Content:', content);
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

**Output** (example):
```
System Info: { platform: 'linux', architecture: 'x64', cpuCount: 4, totalMemoryGB: '7.80', freeMemoryGB: '3.25' }
System info saved to /path/to/my-node-project/output/system-info.json
Saved File Content: {
  "platform": "linux",
  "architecture": "x64",
  "cpuCount": 4,
  "totalMemoryGB": "7.80",
  "freeMemoryGB": "3.25"
}
```

**Result**: Creates `output/system-info.json` with system information.

## Best Practices

### Path Handling
- Use `path.join()` or `path.resolve()` for all file paths.
- Avoid hardcoding separators (`/` or `\`).
- Use `__dirname` or `__filename` for relative paths.

### OS Module
- Use `os` methods to adapt behavior based on system properties.
- Avoid assumptions about system configuration (e.g., memory, paths).

### Error Handling
- Wrap file operations in try-catch.
- Validate paths before operations.

### Modularity
- Encapsulate `path` and `os` logic in reusable modules.
- Combine with `fs` for robust file handling.

## Common Patterns

### Dynamic File Paths
Create platform-independent paths:

```javascript
const path = require('path');
const filePath = path.join(os.homedir(), 'myapp', 'config.json');
```

### System-Aware Logic
Adjust behavior based on OS:

```javascript
const os = require('os');
const path = require('path');
const configPath = os.platform() === 'win32' ? path.join('C:', 'config') : path.join('/etc', 'config');
```

## What's Next?

You’ve mastered the `path` and `os` modules for cross-platform development! In the next tutorial, **HTTP Server Basics**, you’ll learn how to build and enhance HTTP servers using the Node.js `http` module.

### Key Takeaways:
- Use `path` for cross-platform file path handling
- Use `os` to access system information (platform, memory, CPUs)
- Combine `path`, `os`, and `fs` for robust file operations
- Create reusable utility modules for modularity
- Follow best practices for platform-independent code
- Test path and system operations thoroughly

## Practice Exercise
1. Create a module `pathUtils.js` with functions to join paths and resolve absolute paths.
2. Write a script that logs system memory and CPU count using `os`.
3. Save system info to a JSON file in a platform-independent directory.
4. Read and parse the saved JSON file using `path` and `fs`.
5. Test your script on different paths and handle errors.
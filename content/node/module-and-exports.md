---
title: Modules and Exports
description: Learn how to use the Node.js module system to organize code, create reusable modules, and manage dependencies using module.exports and require.
navigation:
  order: 4
---

# Modules and Exports

Welcome to the Modules and Exports lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to use the Node.js module system to organize your code into reusable, modular components. You’ll explore the CommonJS module system, use `module.exports` to export functionality, and `require` to import it elsewhere. This lesson is key to writing clean, maintainable, and scalable Node.js applications.

In this tutorial, you’ll learn:

- Understanding the Node.js module system (CommonJS)
- Creating and exporting modules with `module.exports`
- Importing modules with `require`
- Organizing code into multiple files
- Using built-in and third-party modules
- Best practices for modular code

## What is the Node.js Module System?

Node.js uses the **CommonJS** module system to organize code into reusable units called modules. A module is a JavaScript file that encapsulates related functionality, which can be exported and imported into other files.

**Key Concepts**:
- **Module**: A single JavaScript file with specific functionality.
- **module.exports**: Defines what a module exposes to other files.
- **require**: Imports a module’s exported content.
- **Built-in Modules**: Provided by Node.js (e.g., `fs`, `http`).
- **Third-party Modules**: Installed via npm (e.g., `lodash`).
- **File-based Modules**: Custom modules you create.

Each module has its own scope, preventing variable conflicts, and is cached after the first `require`.

## Creating and Exporting a Module

### Basic Module
Create a file `math.js` to define a module with utility functions.

::Editor
#title
math.js

#default

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};
```

::

**Explanation**:
- `module.exports`: An object that defines what the module exposes.
- Functions `add` and `subtract` are exported as properties of the exported object.

### Using the Module
Create `index.js` to use the `math` module.

::Editor
#title
index.js

#default

```javascript
const math = require('./math');

console.log(math.add(5, 3)); // 8
console.log(math.subtract(5, 3)); // 2
```

::

**Run**:
```bash
node index.js
```

**Expected Output**:
```
8
2
```

**Explanation**:
- `require('./math')`: Imports the `math.js` module (relative path, `.js` optional).
- `math.add` and `math.subtract`: Access the exported functions.

## Exporting Different Types

### Exporting Multiple Items
You can export multiple items (functions, variables, objects).

::Editor
#title
utils.js

#default

```javascript
const PI = 3.14159;

function square(num) {
  return num * num;
}

class Calculator {
  constructor() {
    this.name = 'Basic Calculator';
  }
}

module.exports = {
  PI,
  square,
  Calculator
};
```

::

::Editor
#title
index.js

#default

```javascript
const utils = require('./utils');

console.log(`PI: ${utils.PI}`); // PI: 3.14159
console.log(`Square of 4: ${utils.square(4)}`); // Square of 4: 16
const calc = new utils.Calculator();
console.log(calc.name); // Basic Calculator
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
PI: 3.14159
Square of 4: 16
Basic Calculator
```

### Exporting a Single Item
Export a single function or object directly.

::Editor
#title
greet.js

#default

```javascript
module.exports = function(name) {
  return `Hello, ${name || 'World'}!`;
};
```

::

::Editor
#title
index.js

#default

```javascript
const greet = require('./greet');

console.log(greet('Alice')); // Hello, Alice!
console.log(greet()); // Hello, World!
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Hello, Alice!
Hello, World!
```

## Using Built-in Modules

Node.js provides built-in modules like `fs` (file system) and `http`.

::Editor
#title
file.js

#default

```javascript
const fs = require('fs');

module.exports = {
  readFile: function(path) {
    return fs.readFileSync(path, 'utf8');
  },
  writeFile: function(path, content) {
    fs.writeFileSync(path, content);
  }
};
```

::

::Editor
#title
index.js

#default

```javascript
const file = require('./file');

file.writeFile('example.txt', 'Hello, Node.js!');
const content = file.readFile('example.txt');
console.log(content); // Hello, Node.js!
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Hello, Node.js!
```

**Note**: Creates `example.txt` in the project directory.

## Using Third-party Modules

Install a third-party module like `lodash` for utility functions.

**Install**:
```bash
npm install lodash
```

::Editor
#title
stringUtils.js

#default

```javascript
const _ = require('lodash');

module.exports = {
  capitalize: function(str) {
    return _.capitalize(str);
  },
  kebabCase: function(str) {
    return _.kebabCase(str);
  }
};
```

::

::Editor
#title
index.js

#default

```javascript
const stringUtils = require('./stringUtils');

console.log(stringUtils.capitalize('hello world')); // Hello World
console.log(stringUtils.kebabCase('Hello World')); // hello-world
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Hello World
hello-world
```

## Organizing Modules

### Project Structure
Organize your project for scalability:

```
my-node-project/
├── node_modules/
├── utils/
│   ├── math.js
│   ├── greet.js
│   └── stringUtils.js
├── .env
├── .gitignore
├── package.json
├── index.js
```

**Update index.js**:

::Editor
#title
index.js

#default

```javascript
const math = require('./utils/math');
const greet = require('./utils/greet');
const stringUtils = require('./utils/stringUtils');

console.log(math.add(10, 5)); // 15
console.log(greet('Bob')); // Hello, Bob!
console.log(stringUtils.capitalize('node js')); // Node Js
```

::

**Run**:
```bash
node index.js
```

### Using index.js for a Module Directory
Create `utils/index.js` to simplify imports:

::Editor
#title
utils/index.js

#default

```javascript
module.exports = {
  math: require('./math'),
  greet: require('./greet'),
  stringUtils: require('./stringUtils')
};
```

::

**Update index.js**:

::Editor
#title
index.js

#default

```javascript
const { math, greet, stringUtils } = require('./utils');

console.log(math.add(10, 5)); // 15
console.log(greet('Bob')); // Hello, Bob!
console.log(stringUtils.capitalize('node js')); // Node Js
```

::

**Run**:
```bash
node index.js
```

## Best Practices

### Module Design
- Keep modules focused on a single responsibility.
- Use descriptive names for modules and exports.
- Export only what’s needed to avoid exposing unnecessary functionality.

### File Organization
- Group related modules in directories (e.g., `utils/`).
- Use `index.js` for directory-level exports.
- Add `node_modules/` and `.env` to `.gitignore`.

### Dependency Management
- Install third-party modules with `npm install`.
- Document dependencies in `package.json`.

### Error Handling
- Validate inputs in module functions.
- Use try-catch for operations like file I/O (covered in later lessons).

## Common Patterns

### Named Exports
Export multiple named items:

```javascript
module.exports.add = (a, b) => a + b;
module.exports.subtract = (a, b) => a - b;
```

**Usage**:
```javascript
const { add, subtract } = require('./math');
```

### Default Export Alternative
Simulate ES Modules default export:

::Editor
#title
config.js

#default

```javascript
module.exports = {
  default: {
    port: 3000,
    host: 'localhost'
  }
};
```

::

**Usage**:
```javascript
const config = require('./config').default;
```

## What's Next?

You’ve mastered the Node.js module system! In the next tutorial, **File System Operations**, you’ll learn how to use the `fs` module to read, write, and manage files in your Node.js applications.

### Key Takeaways:
- Node.js uses CommonJS for modularity
- Export functionality with `module.exports`
- Import modules with `require`
- Organize code in separate files and directories
- Use built-in (e.g., `fs`) and third-party (e.g., `lodash`) modules
- Follow best practices for clean, reusable code

## Practice Exercise
1. Create a module `calculator.js` with functions for multiplication and division.
2. Export the functions and use them in `index.js`.
3. Install a third-party module (e.g., `uuid`) and create a module to generate unique IDs.
4. Organize modules in a `utils/` directory with an `index.js` file.
5. Write a script that combines your modules to perform a calculation and log a unique ID.
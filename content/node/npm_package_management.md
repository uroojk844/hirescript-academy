---
title: NPM Package Management
description: Learn how to use npm to manage dependencies, create and publish Node.js packages, and configure scripts for efficient development workflows.
navigation:
  order: 10
---

# NPM Package Management

Welcome to the NPM Package Management lesson in our Node.js tutorial series! In this tutorial, you’ll learn how to use **npm** (Node Package Manager) to manage dependencies, create your own Node.js packages, and publish them to the npm registry. You’ll also explore how to configure scripts and best practices for managing packages in Node.js projects. This lesson builds on previous topics like modules and file system operations.

In this tutorial, you’ll learn:

- Understanding npm and its role in Node.js
- Installing and managing dependencies
- Creating and publishing an npm package
- Configuring npm scripts for automation
- Using `.npmrc` for configuration
- Best practices for package management

## What is npm?

**npm** (Node Package Manager) is the default package manager for Node.js, used to install, manage, and share JavaScript libraries and tools. It provides access to a vast registry of packages and allows developers to create and publish their own packages.

**Key Features**:
- Install dependencies with `npm install`
- Manage project dependencies in `package.json`
- Run scripts for tasks like starting or testing
- Publish reusable modules to the npm registry
- Configure settings with `.npmrc`

**Getting Started**:
Verify npm is installed:
```bash
npm --version
```

**Expected Output** (example):
```
10.8.3
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

## Managing Dependencies

### Installing Dependencies
Install a package as a dependency (production):

```bash
npm install lodash
```

Install a package as a development dependency:

```bash
npm install --save-dev uuid
```

**Updated package.json**:

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
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^3.1.4",
    "uuid": "^10.0.0"
  }
}
```

::

**Using Dependencies**:

::Editor
#title
index.js

#default

```javascript
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

console.log(_.capitalize('hello world')); // Hello World
console.log('Unique ID:', uuidv4()); // e.g., 123e4567-e89b-12d3-a456-426614174000
```

::

**Run**:
```bash
node index.js
```

**Output**:
```
Hello World
Unique ID: 123e4567-e89b-12d3-a456-426614174000
```

### Updating and Removing Dependencies
Update dependencies:
```bash
npm update
```

Remove a dependency:
```bash
npm uninstall lodash
```

## Creating an npm Package

### Step 1: Initialize a New Package
Create a new directory for your package:

```bash
mkdir my-npm-package
cd my-npm-package
npm init
```

**Fill in prompts** (example):

::Editor
#title
package.json

#default

```json
{
  "name": "my-npm-package",
  "version": "1.0.0",
  "description": "A simple Node.js utility package",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["utility", "node"],
  "author": "Your Name",
  "license": "MIT"
}
```

::

### Step 2: Create the Package Code
Create a utility module.

::Editor
#title
index.js

#default

```javascript
const _ = require('lodash');

module.exports = {
  capitalize: (str) => _.capitalize(str),
  generateId: () => Math.random().toString(36).substring(2, 10)
};
```

::

**Install lodash**:
```bash
npm install lodash
```

### Step 3: Test Locally
Link the package for local testing:

```bash
npm link
```

In another project, link and use it:
```bash
cd ../my-node-project
npm link my-npm-package
```

::Editor
#title
index.js

#default

```javascript
const utils = require('my-npm-package');

console.log(utils.capitalize('test string')); // Test String
console.log('Generated ID:', utils.generateId()); // e.g., abcd1234
```

::

**Run**:
```bash
node index.js
```

### Step 4: Publish to npm
1. **Log in to npm**:
   ```bash
   npm login
   ```
   Enter your npm credentials (create an account at [npmjs.com](https://www.npmjs.com) if needed).

2. **Publish**:
   ```bash
   cd my-npm-package
   npm publish
   ```

**Note**: Ensure the package name is unique (or use a scoped name, e.g., `@yourusername/my-npm-package`). For practice, skip publishing or use `npm publish --dry-run`.

## Configuring npm Scripts

Add custom scripts to automate tasks.

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
    "dev": "nodemon index.js",
    "build": "echo Building project...",
    "lint": "eslint .",
    "test": "jest"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^3.1.4",
    "uuid": "^10.0.0",
    "eslint": "^8.57.0",
    "jest": "^29.7.0"
  }
}
```

::

**Install dev tools**:
```bash
npm install --save-dev eslint jest
```

**Run scripts**:
- `npm start`: Runs the main script.
- `npm run dev`: Runs with nodemon.
- `npm run lint`: Runs ESLint (requires configuration).
- `npm test`: Runs Jest (requires test setup).

## Using .npmrc for Configuration

Create a `.npmrc` file for project-specific settings:

::Editor
#title
.npmrc

#default

```
registry=https://registry.npmjs.org/
save-exact=true
```

::

**Explanation**:
- `registry`: Specifies the npm registry.
- `save-exact`: Saves exact version numbers in `package.json`.

**Global npm config**:
```bash
npm config set init-author-name "Your Name"
npm config set init-license "MIT"
```

## Real-World Mini-Project: Utility Package

Create a package with a CLI tool.

::Editor
#title
my-npm-package/package.json

#default

```json
{
  "name": "my-npm-package",
  "version": "1.0.0",
  "description": "A simple Node.js utility package",
  "main": "index.js",
  "bin": {
    "my-util": "./cli.js"
  },
  "scripts": {
    "test": "jest"
  },
  "keywords": ["utility", "node"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

::

::Editor
#title
my-npm-package/cli.js

#default

```javascript
#!/usr/bin/env node

const { capitalize } = require('./index');
const args = process.argv.slice(2);

console.log(capitalize(args[0] || 'hello world'));
```

::

**Test Locally**:
```bash
cd my-npm-package
npm link
my-util test
```

**Output**:
```
Test
```

## Best Practices

### Dependency Management
- Use `--save-dev` for development tools.
- Pin versions with `save-exact` or `~`/`^` for flexibility.
- Run `npm audit` to check for vulnerabilities.

### Package Creation
- Use descriptive names and keywords.
- Include a `README.md` with usage examples.
- Specify a `main` file and `bin` for CLI tools.

### Scripts
- Define common tasks (`start`, `test`, `lint`) in `package.json`.
- Use `nodemon` for development workflows.

### Publishing
- Test locally with `npm link` before publishing.
- Increment versions (`npm version patch/minor/major`) before republishing.

## Common Patterns

### Scoped Packages
Use scoped names for private packages:
```json
{
  "name": "@yourusername/my-package"
}
```

### Pre/Post Scripts
Automate tasks before/after scripts:
```json
{
  "scripts": {
    "prestart": "npm run lint",
    "start": "node index.js"
  }
}
```

## What's Next?

You’ve mastered npm package management! In the next tutorial, **Callbacks and Promises**, you’ll learn how to handle asynchronous operations using callbacks and Promises in Node.js.

### Key Takeaways:
- Use npm to install and manage dependencies
- Create and publish packages with `npm init` and `npm publish`
- Configure scripts in `package.json` for automation
- Use `.npmrc` for custom settings
- Test packages locally with `npm link`
- Follow best practices for dependency and package management

## Practice Exercise
1. Initialize a new package with `npm init`.
2. Add `lodash` and `uuid` as dependencies.
3. Create a module with utility functions and a CLI tool.
4. Add scripts for starting, testing, and linting.
5. Test your package
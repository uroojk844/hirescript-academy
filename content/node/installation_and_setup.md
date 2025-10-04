---
title: Installation and Setup
description: Learn how to install Node.js, configure your development environment, initialize projects, and manage dependencies with npm for Node.js development.
navigation:
  order: 2
---

# Installation and Setup

Welcome to the Installation and Setup lesson in our Node.js tutorial series! In this tutorial, you'll learn how to properly install Node.js, set up your development environment, and initialize Node.js projects with npm. This lesson covers everything you need to get started with Node.js development, including package management and essential tools.

In this tutorial, you'll learn:

- Installing Node.js on different operating systems
- Verifying installation and using npm
- Initializing Node.js projects with package.json
- Installing and managing dependencies
- Setting up development tools (nodemon, dotenv)
- Creating a basic project structure

## Installing Node.js

### Windows
1. Download the LTS version from [nodejs.org](https://nodejs.org).
2. Run the installer (.msi file) and follow the setup wizard.
3. Accept the license agreement and choose the installation directory.
4. Ensure "Add to PATH" is checked.
5. Restart your terminal/Command Prompt.

### macOS
1. Download the LTS version from [nodejs.org](https://nodejs.org).
2. Run the installer (.pkg file) and follow the instructions.
3. Alternatively, use Homebrew: `brew install node`.
4. Restart your terminal.

### Linux (Ubuntu/Debian)
1. Update package lists: `sudo apt update`.
2. Install Node.js and npm: `sudo apt install nodejs npm`.
3. For the latest version, use NodeSource repository:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Restart your terminal.

### Verification
After installation, verify Node.js and npm:

```bash
node --version
npm --version
```

**Expected Output** (example):
```
v20.17.0
10.8.3
```

If versions are displayed, installation is successful.

## Initializing Node.js Projects

### Creating a Project Directory
Create a directory for your project:

```bash
mkdir my-node-project
cd my-node-project
```

### Initializing with npm
Initialize a new Node.js project:

```bash
npm init
```

This prompts for project details. For quick setup, use:

```bash
npm init -y
```

**Generated package.json**:

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
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

::

**Explanation**:
- `name`: Project name (used for npm packages).
- `version`: Project version (SemVer format).
- `main`: Entry point file (e.g., `index.js`).
- `scripts`: Custom commands (e.g., `npm start`).
- `dependencies` and `devDependencies`: Packages (added later).

## Managing Dependencies with npm

### Installing Dependencies
Install packages as dependencies (for production):

```bash
npm install lodash
```

For development tools:

```bash
npm install --save-dev nodemon
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
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

::

**Explanation**:
- `dependencies`: Required for production.
- `devDependencies`: Required for development (not bundled in production).
- `node_modules/`: Directory for installed packages (add to `.gitignore`).

### Using Installed Packages
Create `index.js`:

::Editor
#title
index.js

#default

```javascript
const _ = require('lodash');

console.log('Hello, Node.js!');
console.log(_.capitalize('hello world'));
```

::

**Run**:
```bash
node index.js
```

**Expected Output**:
```
Hello, Node.js!
Hello World
```

### npm Scripts
Update `package.json` scripts:

::Editor
#title
package.json

#default

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

::

**Run Scripts**:
- `npm start` → Runs `node index.js`.
- `npm run dev` → Runs `nodemon index.js` (auto-restarts on file changes).

## Setting Up Development Tools

### nodemon for Auto-Restart
`nodemon` watches files and restarts the server automatically.

**Install** (if not already):
```bash
npm install --save-dev nodemon
```

**Usage**:
```bash
npm run dev
```

**Expected Behavior**: Server restarts when `index.js` changes.

### dotenv for Environment Variables
Manage configuration with environment variables.

**Install**:
```bash
npm install dotenv
```

**Create .env**:

::Editor
#title
.env

#default

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
API_KEY=your-api-key
```

::

**Update index.js**:

::Editor
#title
index.js

#default

```javascript
require('dotenv').config();
const _ = require('lodash');

const port = process.env.PORT || 3000;
console.log(`Server will run on port ${port}`);
console.log(_.capitalize('hello world'));
```

::

**Run**:
```bash
npm start
```

**Expected Output**:
```
Server will run on port 3000
Hello World
```

**Note**: Add `.env` to `.gitignore` to avoid committing secrets.

### Project Structure
Organize your project:

```
my-node-project/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── index.js
└── README.md
```

**Create .gitignore**:

::Editor
#title
.gitignore

#default

```
node_modules/
.env
*.log
```

::

## Real-World Mini-Project: Simple CLI Tool

Create a command-line tool using Node.js and npm.

### Step 1: Update package.json
Add a CLI script:

::Editor
#title
package.json

#default

```json
{
  "bin": {
    "greet": "cli.js"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "greet": "node cli.js"
  }
}
```

::

### Step 2: Create CLI Tool

::Editor
#title
cli.js

#default

```javascript
#!/usr/bin/env node

const args = process.argv.slice(2);
const name = args[0] || 'World';

console.log(`Hello, ${name}! This is a Node.js CLI tool.`);
```

::

**Make Executable** (Linux/macOS):
```bash
chmod +x cli.js
```

### Step 3: Link Globally (Optional)
```bash
npm link
```

**Test**:
```bash
greet Alice
```

**Expected Output**:
```
Hello, Alice! This is a Node.js CLI tool.
```

**npm Script Test**:
```bash
npm run greet Alice
```

## Best Practices

### Installation
- Use LTS Node.js for stability.
- Install globally only for tools (`npm install -g`).

### Project Management
- Always use `npm init` for new projects.
- Use `npm install --save-dev` for dev tools.
- Update dependencies: `npm update`.

### Environment
- Use `.env` for secrets; never commit them.
- Set `NODE_ENV=production` for production builds.

### Tools
- Use `nodemon` for development.
- Add scripts to `package.json` for common tasks.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Node.js Installation | Download from nodejs.org; verify with `node -v` and `npm -v` |
| Project Initialization | Use `npm init -y` to create `package.json` |
| Dependencies | `npm install package` for production, `--save-dev` for development |
| Environment Variables | Use `dotenv` and `.env` files for configuration |
| Scripts | Define in `package.json` for `npm run script` |
| Project Structure | Organize with `node_modules/`, `.env`, `.gitignore` |

## What's Next?

You've successfully set up Node.js and your development environment! In the next lesson, **Your First Program**, you'll learn how to write and run your first Node.js application, including creating HTTP servers and handling requests.

## Practice Exercise
1. Install Node.js on your system and verify with `node -v`.
2. Create a new project directory and run `npm init -y`.
3. Install `lodash` and `nodemon` as dependencies.
4. Create an `index.js` file that uses lodash to capitalize a string.
5. Add a `start` script to `package.json` and run `npm start`.
6. Create a `.env` file with a `PORT` variable and load it with dotenv.
7. Test your setup by changing the port and running the script.
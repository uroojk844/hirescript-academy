---
title: Serving Static Files
description: Learn how to serve static files like CSS, JavaScript, and images in Express.js, configure static file directories, and integrate them with dynamic routes.
navigation:
  order: 6
---

# Serving Static Files

Welcome to the Serving Static Files lesson in our Express.js tutorial series! In this tutorial, you’ll learn how to serve static files such as CSS, JavaScript, images, and other assets in an Express.js application. Serving static files is essential for building web applications with client-side styling and functionality.

In this tutorial, you’ll learn:

- What static files are and why they’re important
- Using `express.static` middleware to serve files
- Configuring static file directories
- Integrating static files with dynamic routes and templates
- Best practices for organizing and securing static assets
- Building a simple web page with static assets

## What are Static Files?

**Static files** are files that are served directly to the client without modification, such as CSS stylesheets, JavaScript files, images, and HTML files. In Express.js, the `express.static` middleware is used to serve these files from a specified directory, making them accessible via HTTP requests.

**Common Use Cases**:
- Serving CSS for styling web pages
- Serving JavaScript for client-side interactivity
- Serving images, fonts, or other assets
- Hosting static HTML files

## Setting Up Static File Serving

### Prerequisites
- Node.js and npm installed
- Express.js installed (`npm install express`)
- A code editor and basic understanding of Express routes

### Step 1: Create a Project
If you haven’t already, set up a Node.js project:

```bash
mkdir express-static-files
cd express-static-files
npm init -y
npm install express
```

### Step 2: Create a Static Files Directory
Create a directory named `public` to store static files:

```
express-static-files/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── logo.png
├── app.js
├── package.json
```

**Example Static Files**:

::Editor
#title
public/css/styles.css

#default

```css
body {
  font-family: Arial, sans-serif;
  margin: 40px;
  background-color: #f9fafb;
}
h1 {
  color: #1f2937;
}
img {
  max-width: 200px;
}
```

::

::Editor
#title
public/js/script.js

#default

```javascript
document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded!');
  document.querySelector('h1').addEventListener('click', () => {
    alert('Welcome to Express!');
  });
});
```

::

**Note**: Add an image file (`logo.png`) to `public/images/`. For testing, you can use any image or create a placeholder.

### Step 3: Serve Static Files
Use `express.static` to serve files from the `public` directory.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Static Files Demo</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <h1>Welcome to Express Static Files</h1>
      <img src="/images/logo.png" alt="Logo">
      <script src="/js/script.js"></script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Explanation**:
- `express.static(path.join(__dirname, 'public'))`: Serves files from the `public` directory.
- Files in `public` are accessible at their relative paths (e.g., `/css/styles.css`).
- `path.join(__dirname, 'public')` ensures cross-platform compatibility for file paths.

**Run the Server**:
```bash
node app.js
```

**Test URLs**:
- `http://localhost:3000/` → Renders an HTML page with styled text and an image
- `http://localhost:3000/css/styles.css` → Serves the CSS file
- `http://localhost:3000/js/script.js` → Serves the JavaScript file
- `http://localhost:3000/images/logo.png` → Serves the image

**Expected Behavior**: The page displays a styled heading, an image, and logs “JavaScript loaded!” in the browser console. Clicking the heading triggers an alert.

## Integrating with EJS Templates

Let’s use EJS to render a dynamic page with static assets.

### Step 1: Install EJS
```bash
npm install ejs
```

### Step 2: Create an EJS Template

::Editor
#title
views/index.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1><%= title %></h1>
  <p>Welcome to our Express app!</p>
  <img src="/images/logo.png" alt="Logo">
  <script src="/js/script.js"></script>
</body>
</html>
```

::

### Step 3: Update the Server

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Express Static Files' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Project Structure**:
```
express-static-files/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── logo.png
├── views/
│   └── index.ejs
├── app.js
├── package.json
```

**Test URL**: `http://localhost:3000/` → Renders the EJS template with CSS, JavaScript, and the image.

## Multiple Static Directories

Serve files from multiple directories (e.g., `public` and `assets`).

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/css/styles.css">
      <link rel="stylesheet" href="/assets/extra.css">
    </head>
    <body>
      <h1>Multiple Static Directories</h1>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Note**: Create an `assets` directory with `extra.css` for testing.

## Securing Static Files

Restrict access to certain static files using middleware.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const restrictAccess = (req, res, next) => {
  if (req.query.token === 'secret') {
    next();
  } else {
    res.status(403).send('Forbidden: Invalid token');
  }
};

app.use('/protected', restrictAccess, express.static(path.join(__dirname, 'protected')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <h1>Static Files</h1>
      <p>Protected file: <a href="/protected/secret.txt?token=secret">Secret</a></p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

::

**Test URLs**:
- `http://localhost:3000/protected/secret.txt?token=secret` → Serves `secret.txt` (create in `protected` directory)
- `http://localhost:3000/protected/secret.txt` → `Forbidden: Invalid token`

## Best Practices

### File Organization
- Store static files in a `public` or `static` directory.
- Use subdirectories (e.g., `public/css`, `public/js`) for organization.

### Performance
- Enable caching with `maxAge` option:

```javascript
app.use(express.static('public', { maxAge: '1d' }));
```

- Compress static files (covered in later lessons).

### Security
- Avoid serving sensitive files from public directories.
- Use middleware to restrict access to specific files.
- Validate file paths to prevent directory traversal attacks.

### Integration
- Combine static files with template engines like EJS for dynamic pages.
- Serve API responses and static files from the same server.

## Common Patterns

### Custom Static Path
Serve files with a custom URL prefix:

```javascript
app.use('/static', express.static('public'));
```

**Access**: `/static/css/styles.css` instead of `/css/styles.css`.

### Fallback for Single-Page Applications
Serve an `index.html` for all unmatched routes:

```javascript
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

## What's Next?

You’ve mastered routing fundamentals in Express.js! In the next tutorial, we’ll cover **Middleware**, where you’ll learn how to use middleware to process requests, add functionality, and enhance your Express applications.

### Key Takeaways:
- Use `express.static` to serve static files from a directory
- Organize files in a `public` directory with subfolders for CSS, JS, and images
- Integrate static files with EJS templates for dynamic pages
- Secure sensitive files with middleware
- Follow best practices for organization, performance, and security
- Test static file serving with browsers or curl
---
title: Introduction to JavaScript
description: Learn basics of JavaScript for web interactivity.
navigation:
  order: 1
---

# Introduction to JavaScript

Welcome to the first JavaScript tutorial! **JavaScript** adds interactivity to webpages, working with HTML and CSS. This tutorial introduces JavaScript basics.

In this tutorial, you’ll learn:
- JavaScript’s role in web development
- Adding JavaScript to HTML
- Writing your first script

## What is JavaScript?

JavaScript is a programming language that enables dynamic content, like updating text or handling clicks, in webpages.

## Adding JavaScript

Include JavaScript via:
- **Internal**: `<script>` in HTML.
- **External**: `<script src="file.js">`. 

Example with internal JavaScript:

::Editor
#title
index.html

#default
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>First JavaScript</title>
    <style>
      button { padding: 10px; background: #007bff; color: white; }
    </style>
  </head>
  <body>
    <h1>Hello, JavaScript!</h1>
    <p id="demo">Click the button.</p>
    <button onclick="document.getElementById('demo').innerText = 'Hello!'">Click Me</button>
    <script>
      console.log('JavaScript loaded!');
    </script>
  </body>
</html>
```
::

## External JavaScript

Create `script.js`:

::Editor
#title
script.js

#default
```javascript
console.log('External JavaScript loaded!');
```
::

Link it:

::Editor
#title
index.html

#default
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>External JavaScript</title>
    <script src="script.js"></script>
  </head>
  <body>
    <h1>External Script</h1>
  </body>
</html>
```
::

## Best Practices
- Use external scripts for organization.
- Place `<script>` at `<body>` end or use `defer`.
- Check console for errors.

## What’s Next?

You’ve learned JavaScript basics! Next, explore **Variables and Data Types**.
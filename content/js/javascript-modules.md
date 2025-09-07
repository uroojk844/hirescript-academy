---
title: JavaScript Modules
description: Organize code with JavaScript modules.
navigation:
  order: 15
---

# JavaScript Modules

In this fifteenth tutorial, you’ll learn about **ES modules** to organize JavaScript code, a key feature in frameworks like Nuxt.

In this tutorial, you’ll learn:
- Using `import` and `export`
- Modularizing code
- Modules in HTML

## Exporting and Importing

Export functions or variables:

::Editor
#title
utils.js

#default
```javascript
export function greet(name) {
  return `Hello, ${name}!`;
}
```
::

Import in HTML:

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
    <title>Modules</title>
    <script type="module" src="script.js"></script>
  </head>
  <body>
    <h1>Module Example</h1>
    <p id="output"></p>
  </body>
</html>
```
::

::Editor
#title
script.js

#default
```javascript
import { greet } from './utils.js';
document.getElementById('output').innerText = greet('Bob');
```
::

## Best Practices
- Use `type="module"` in `<script>`.
- Keep modules focused.
- Test module imports.

## What’s Next?

You’ve learned modules! Next, explore **JavaScript Best Practices**.
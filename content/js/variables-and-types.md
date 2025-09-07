---
title: Variables and Data Types
description: Store data with JavaScript variables.
navigation:
  order: 2
---

# Variables and Data Types

In this second tutorial, you’ll learn about **variables** and **data types** in JavaScript to store and manage data.

In this tutorial, you’ll learn:
- Declaring variables (`let`, `const`, `var`)
- Common data types (strings, numbers, booleans)
- Displaying variables in HTML

## Declaring Variables

Use:
- `let`: Reassignable, block-scoped.
- `const`: Fixed, block-scoped.
- `var`: Older, avoid due to scoping issues.

Example:

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
    <title>Variables</title>
    <style>
      p { font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>Variable Example</h1>
    <p id="output"></p>
    <script>
      let name = 'Alice';
      const age = 25;
      document.getElementById('output').innerText = `${name} is ${age}`;
    </script>
  </body>
</html>
```
::

## Data Types

Common types:
- **String**: `'Hello'`.
- **Number**: `42`, `3.14`.
- **Boolean**: `true`, `false`.

Example:

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
    <title>Data Types</title>
  </head>
  <body>
    <h1>Data Types</h1>
    <p id="output"></p>
    <script>
      let text = 'Hello';
      let num = 10;
      let isActive = true;
      document.getElementById('output').innerText = `${text}, ${num}, ${isActive}`;
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `const` for constants.
- Use `let` for variables that change.
- Avoid `var` for modern code.

## What’s Next?

You’ve learned variables! Next, explore **Operators and Expressions**.
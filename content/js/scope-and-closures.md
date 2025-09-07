---
title: Scope and Closures
description: Understand JavaScript scope and closures.
navigation:
  order: 13
---

# Scope and Closures

In this thirteenth tutorial, you’ll learn about **scope** and **closures** to manage variable access in JavaScript.

In this tutorial, you’ll learn:
- Global and local scope
- Creating closures
- Practical closure use

## Scope

Variables have:
- **Global scope**: Accessible everywhere.
- **Local scope**: Limited to functions/blocks.

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
    <title>Scope</title>
  </head>
  <body>
    <h1>Scope Example</h1>
    <p id="output"></p>
    <script>
      let globalVar = 'I am global';
      function showScope() {
        let localVar = 'I am local';
        return `${globalVar}, ${localVar}`;
      }
      document.getElementById('output').innerText = showScope();
    </script>
  </body>
</html>
```
::

## Closures

A closure retains access to outer variables:

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
    <title>Closures</title>
  </head>
  <body>
    <h1>Counter</h1>
    <p id="output"></p>
    <script>
      function makeCounter() {
        let count = 0;
        return function() {
          return count++;
        };
      }
      let counter = makeCounter();
      document.getElementById('output').innerText = counter();
    </script>
  </body>
</html>
```
::

## Best Practices
- Minimize global variables.
- Use closures for data privacy.
- Avoid complex nested scopes.

## What’s Next?

You’ve learned scope and closures! Next, explore **Asynchronous JavaScript**.
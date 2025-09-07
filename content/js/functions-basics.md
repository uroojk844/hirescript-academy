---
title: Functions Basics
description: Create reusable code with functions.
navigation:
  order: 6
---

# Functions Basics

In this sixth tutorial, you’ll learn about **functions**, reusable code blocks in JavaScript for specific tasks.

In this tutorial, you’ll learn:
- Defining and calling functions
- Parameters and return statements
- Function expressions

## Defining Functions

Use `function` to create functions:

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
    <title>Functions</title>
    <style>
      p { color: green; }
    </style>
  </head>
  <body>
    <h1>Greet User</h1>
    <p id="output"></p>
    <script>
      function greet(name) {
        return `Hello, ${name}!`;
      }
      document.getElementById('output').innerText = greet('Alice');
    </script>
  </body>
</html>
```
::

## Function Expressions

Store functions in variables:

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
    <title>Function Expression</title>
  </head>
  <body>
    <h1>Calculate</h1>
    <p id="output"></p>
    <script>
      const add = function(a, b) {
        return a + b;
      };
      document.getElementById('output').innerText = `Sum: ${add(2, 3)}`;
    </script>
  </body>
</html>
```
::

## Best Practices
- Use descriptive function names.
- Keep functions focused.
- Always return values explicitly.

## What’s Next?

You’ve learned functions! Next, explore **Working with Strings**.
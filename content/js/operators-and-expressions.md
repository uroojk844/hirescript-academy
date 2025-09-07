---
title: Operators and Expressions
description: Perform calculations with JavaScript operators.
navigation:
  order: 3
---

# Operators and Expressions

In this third tutorial, you’ll learn about **operators** and **expressions** to perform calculations and comparisons in JavaScript.

In this tutorial, you’ll learn:
- Arithmetic operators (`+`, `-`, etc.)
- Comparison operators (`===`, `>`, etc.)
- Logical operators (`&&`, `||`)

## Arithmetic Operators

Examples: `+`, `-`, `*`, `/`, `%`.

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
    <title>Arithmetic</title>
    <style>
      p { color: navy; }
    </style>
  </head>
  <body>
    <h1>Calculate</h1>
    <p id="output"></p>
    <script>
      let a = 10;
      let b = 5;
      let sum = a + b;
      document.getElementById('output').innerText = `Sum: ${sum}`;
    </script>
  </body>
</html>
```
::

## Comparison and Logical Operators

- Comparison: `===`, `!==`, `>`, `<`.
- Logical: `&&`, `||`, `!`.

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
    <title>Comparisons</title>
  </head>
  <body>
    <h1>Check Age</h1>
    <p id="output"></p>
    <script>
      let age = 18;
      let isAdult = age >= 18 && age < 100;
      document.getElementById('output').innerText = `Adult: ${isAdult}`;
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `===` for strict equality.
- Keep expressions simple.
- Test logic for accuracy.

## What’s Next?

You’ve learned operators! Next, explore **Conditional Statements**.
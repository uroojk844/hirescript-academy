---
title: Conditional Statements
description: Make decisions with JavaScript conditionals.
navigation:
  order: 4
---

# Conditional Statements

In this fourth tutorial, you’ll learn about **conditional statements** to make decisions in JavaScript using `if`, `else`, and `switch`.

In this tutorial, you’ll learn:
- Using `if`, `else if`, `else`
- The `switch` statement
- Conditional logic in HTML

## If Statements

Use `if` to check conditions:

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
    <title>If Statements</title>
    <style>
      p { font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>Check Age</h1>
    <p id="output"></p>
    <script>
      let age = 20;
      let message = '';
      if (age >= 18) {
        message = 'Adult';
      } else {
        message = 'Minor';
      }
      document.getElementById('output').innerText = message;
    </script>
  </body>
</html>
```
::

## Switch Statements

Use `switch` for multiple conditions:

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
    <title>Switch</title>
  </head>
  <body>
    <h1>Day of Week</h1>
    <p id="output"></p>
    <script>
      let day = 1;
      let message = '';
      switch (day) {
        case 1:
          message = 'Monday';
          break;
        default:
          message = 'Other day';
      }
      document.getElementById('output').innerText = message;
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `if` for simple conditions.
- Use `switch` for multiple fixed values.
- Avoid nested conditionals.

## What’s Next?

You’ve learned conditionals! Next, explore **Loops and Iteration**.
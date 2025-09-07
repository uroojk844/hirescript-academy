---
title: Loops and Iteration
description: Repeat tasks with JavaScript loops.
navigation:
  order: 5
---

# Loops and Iteration

In this fifth tutorial, you’ll learn about **loops** to repeat tasks in JavaScript using `for`, `while`, and `do-while`.

In this tutorial, you’ll learn:
- Using `for` loops
- Using `while` and `do-while` loops
- Looping in HTML

## For Loops

Repeat code a set number of times:

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
    <title>For Loop</title>
    <style>
      li { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Number List</h1>
    <ul id="output"></ul>
    <script>
      let list = '';
      for (let i = 1; i <= 5; i++) {
        list += `<li>Item ${i}</li>`;
      }
      document.getElementById('output').innerHTML = list;
    </script>
  </body>
</html>
```
::

## While Loops

Repeat while a condition is true:

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
    <title>While Loop</title>
  </head>
  <body>
    <h1>Countdown</h1>
    <p id="output"></p>
    <script>
      let count = 5;
      let message = '';
      while (count > 0) {
        message += count + ' ';
        count--;
      }
      document.getElementById('output').innerText = message;
    </script>
  </body>
</html>
```
::

## Best Practices
- Avoid infinite loops.
- Use `for` for known iterations.
- Keep loop logic simple.

## What’s Next?

You’ve learned loops! Next, explore **Functions Basics**.
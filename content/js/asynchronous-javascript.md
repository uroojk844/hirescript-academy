---
title: Asynchronous JavaScript
description: Handle asynchronous tasks with JavaScript.
navigation:
  order: 14
---

# Asynchronous JavaScript

In this fourteenth tutorial, you’ll learn about **asynchronous JavaScript** to handle tasks like timers and API calls, common in frameworks.

In this tutorial, you’ll learn:
- Using `setTimeout` and `setInterval`
- Introduction to promises
- Using `async/await`

## Timers

`setTimeout` delays execution:

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
    <title>Timers</title>
  </head>
  <body>
    <h1>Delayed Message</h1>
    <p id="output"></p>
    <script>
      setTimeout(() => {
        document.getElementById('output').innerText = 'Delayed!';
      }, 2000);
    </script>
  </body>
</html>
```
::

## Promises and Async/Await

Promises handle async results:

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
    <title>Promises</title>
    <style>
      p { color: purple; }
    </style>
  </head>
  <body>
    <h1>Fetch Data</h1>
    <p id="output"></p>
    <script>
      let promise = new Promise((resolve) => {
        setTimeout(() => resolve('Data loaded!'), 1000);
      });
      async function loadData() {
        let result = await promise;
        document.getElementById('output').innerText = result;
      }
      loadData();
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `async/await` for readability.
- Handle promise errors.
- Avoid blocking main thread.

## What’s Next?

You’ve learned async JavaScript! Next, explore **JavaScript Modules**.
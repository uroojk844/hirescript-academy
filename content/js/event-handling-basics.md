---
title: Event Handling Basics
description: Add interactivity with JavaScript events.
navigation:
  order: 11
---

# Event Handling Basics

In this eleventh tutorial, you’ll learn about **event handling** to make webpages interactive using event listeners.

In this tutorial, you’ll learn:
- Adding event listeners
- Common events (`click`, `input`)
- Event handling in HTML

## Event Listeners

Use `addEventListener` for events:

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
    <title>Events</title>
    <style>
      button { padding: 10px; background: #28a745; color: white; }
    </style>
  </head>
  <body>
    <h1>Click Button</h1>
    <button id="btn">Click Me</button>
    <p id="output"></p>
    <script>
      document.getElementById('btn').addEventListener('click', () => {
        document.getElementById('output').innerText = 'Button clicked!';
      });
    </script>
  </body>
</html>
```
::

## Input Events

Handle user input:

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
    <title>Input Event</title>
  </head>
  <body>
    <h1>Type Something</h1>
    <input type="text" id="input">
    <p id="output"></p>
    <script>
      document.getElementById('input').addEventListener('input', (e) => {
        document.getElementById('output').innerText = e.target.value;
      });
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `addEventListener` over inline events.
- Remove unused listeners.
- Ensure events are accessible.

## What’s Next?

You’ve learned event handling! Next, explore **Objects and Methods**.
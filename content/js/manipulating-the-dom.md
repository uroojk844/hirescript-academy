---
title: Manipulating the DOM
description: Update HTML with JavaScript DOM methods.
navigation:
  order: 10
---

# Manipulating the DOM

In this tenth tutorial, you’ll learn to **manipulate the DOM** (Document Object Model) to dynamically update HTML elements.

In this tutorial, you’ll learn:
- Selecting elements with `querySelector`
- Modifying content and styles
- Creating new elements

## Selecting Elements

Use `querySelector` or `getElementById`:

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
    <title>DOM Selection</title>
  </head>
  <body>
    <h1>Update Text</h1>
    <p class="text">Original</p>
    <script>
      document.querySelector('.text').innerText = 'Updated!';
    </script>
  </body>
</html>
```
::

## Modifying and Creating Elements

Change styles or add elements:

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
    <title>DOM Modification</title>
    <style>
      .new { color: blue; }
    </style>
  </head>
  <body>
    <h1>Add Element</h1>
    <div id="container"></div>
    <script>
      let div = document.createElement('div');
      div.className = 'new';
      div.innerText = 'New Element';
      document.getElementById('container').appendChild(div);
    </script>
  </body>
</html>
```
::

## Best Practices
- Cache selectors for performance.
- Use specific selectors.
- Test DOM changes thoroughly.

## What’s Next?

You’ve learned DOM manipulation! Next, explore **Event Handling Basics**.
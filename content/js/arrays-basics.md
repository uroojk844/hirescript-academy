---
title: Arrays and Basic Methods
description: Work with lists using JavaScript arrays.
navigation:
  order: 8
---

# Arrays and Basic Methods

In this eighth tutorial, you’ll learn about **arrays**, which store lists of data in JavaScript, and basic methods to manipulate them.

In this tutorial, you’ll learn:
- Creating and accessing arrays
- Basic array methods (`push`, `pop`)
- Displaying arrays in HTML

## Creating Arrays

Arrays are lists, e.g., `['item1', 'item2']`.

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
    <title>Arrays</title>
    <style>
      li { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Fruit List</h1>
    <ul id="output"></ul>
    <script>
      let fruits = ['Apple', 'Banana', 'Orange'];
      let list = '';
      for (let fruit of fruits) {
        list += `<li>${fruit}</li>`;
      }
      document.getElementById('output').innerHTML = list;
    </script>
  </body>
</html>
```
::

## Array Methods

Common methods:
- `push`: Adds to end.
- `pop`: Removes from end.
- `length`: Gets array length.

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
    <title>Array Methods</title>
  </head>
  <body>
    <h1>Modify Array</h1>
    <p id="output"></p>
    <script>
      let items = ['Pen', 'Book'];
      items.push('Pencil');
      document.getElementById('output').innerText = items.join(', ');
    </script>
  </body>
</html>
```
::

## Best Practices
- Use arrays for ordered data.
- Check array bounds.
- Use `join` for display.

## What’s Next?

You’ve learned arrays! Next, explore **Modern Array Methods**.
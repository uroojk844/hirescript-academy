---
title: Working with Strings
description: Manipulate text with JavaScript strings.
navigation:
  order: 7
---

# Working with Strings

In this seventh tutorial, you’ll learn about **strings** in JavaScript, including methods to manipulate text.

In this tutorial, you’ll learn:
- String concatenation
- Common string methods
- Using strings in HTML

## String Concatenation

Combine strings using `+` or template literals:

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
    <title>Strings</title>
  </head>
  <body>
    <h1>String Example</h1>
    <p id="output"></p>
    <script>
      let first = 'Hello';
      let last = 'World';
      document.getElementById('output').innerText = `${first}, ${last}!`;
    </script>
  </body>
</html>
```
::

## String Methods

Common methods:
- `toUpperCase()`: Converts to uppercase.
- `slice()`: Extracts a substring.
- `length`: Gets string length.

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
    <title>String Methods</title>
    <style>
      p { font-family: Arial, sans-serif; }
    </style>
  </head>
  <body>
    <h1>Text Manipulation</h1>
    <p id="output"></p>
    <script>
      let text = 'JavaScript';
      let result = text.toUpperCase() + ' has ' + text.length + ' letters';
      document.getElementById('output').innerText = result;
    </script>
  </body>
</html>
```
::

## Best Practices
- Use template literals for readability.
- Check string inputs for validity.
- Avoid excessive concatenation.

## What’s Next?

You’ve learned strings! Next, explore **Arrays and Basic Methods**.
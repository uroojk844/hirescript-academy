---
title: Objects and Methods
description: Organize data with JavaScript objects.
navigation:
  order: 12
---

# Objects and Methods

In this twelfth tutorial, you’ll learn about **objects** to organize data and methods to add functionality.

In this tutorial, you’ll learn:
- Creating objects
- Adding properties and methods
- Using objects in HTML

## Creating Objects

Objects store key-value pairs:

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
    <title>Objects</title>
  </head>
  <body>
    <h1>User Profile</h1>
    <p id="output"></p>
    <script>
      let user = {
        name: 'Bob',
        age: 30
      };
      document.getElementById('output').innerText = `${user.name}, ${user.age}`;
    </script>
  </body>
</html>
```
::

## Object Methods

Add functions to objects:

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
    <title>Object Methods</title>
    <style>
      p { font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>User Info</h1>
    <p id="output"></p>
    <script>
      let user = {
        name: 'Alice',
        greet: function() {
          return `Hi, I'm ${this.name}`;
        }
      };
      document.getElementById('output').innerText = user.greet();
    </script>
  </body>
</html>
```
::

## Best Practices
- Use descriptive property names.
- Keep methods focused.
- Access properties safely.

## What’s Next?

You’ve learned objects! Next, explore **Scope and Closures**.
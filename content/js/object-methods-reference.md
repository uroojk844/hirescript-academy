---
title: Object Methods Reference
description: Comprehensive guide to JavaScript object methods.
navigation:
  order: 19
---

# Object Methods Reference

In this tutorial, you’ll explore **JavaScript object methods** for managing structured data, essential for state management in frameworks like Nuxt or Vue. Each method includes a detailed description, syntax, and practical examples with HTML and CSS integration.

In this tutorial, you’ll learn:
- Accessing object properties (`keys`, `values`, etc.)
- Modifying and copying objects
- Protecting objects from changes
- Framework-relevant object handling

## 1. `Object.keys`, `Object.values`, `Object.entries`
- **Description**: `keys` returns an array of property names; `values` returns property values; `entries` returns key-value pairs.
- **Usage**: Iterate or display object data, e.g., in Vue components.
- **Syntax**: `Object.keys(obj)`; `Object.values(obj)`; `Object.entries(obj)`

Example: Display object properties.

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
    <title>Object Keys, Values, Entries</title>
    <style>
      ul { list-style: none; }
      li { padding: 5px; }
    </style>
  </head>
  <body>
    <h1>User Profile</h1>
    <ul id="output"></ul>
    <script>
      let user = { name: 'Alice', age: 25, role: 'Developer' };
      let entries = Object.entries(user);
      document.getElementById('output').innerHTML = entries.map(([key, value]) => `<li>${key}: ${value}</li>`).join('');
    </script>
  </body>
</html>
```
::

## 2. `Object.assign`
- **Description**: Copies properties from one or more source objects to a target object.
- **Usage**: Merge objects or create shallow copies, e.g., updating state.
- **Syntax**: `Object.assign(target, source1, ...)`

Example: Merge user data.

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
    <title>Object Assign</title>
    <style>
      p { font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>Update Profile</h1>
    <p id="output"></p>
    <script>
      let user = { name: 'Bob' };
      let updates = { age: 30, role: 'Designer' };
      let updatedUser = Object.assign({}, user, updates);
      document.getElementById('output').innerText = JSON.stringify(updatedUser);
    </script>
  </body>
</html>
```
::

## 3. `Object.create`
- **Description**: Creates a new object with the specified prototype.
- **Usage**: Implement inheritance or create objects with specific prototypes.
- **Syntax**: `Object.create(prototype)`

Example: Create a user object.

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
    <title>Object Create</title>
  </head>
  <body>
    <h1>User Object</h1>
    <p id="output"></p>
    <script>
      let userProto = { greet: function() { return `Hi, ${this.name}`; } };
      let user = Object.create(userProto, { name: { value: 'Alice' } });
      document.getElementById('output').innerText = user.greet();
    </script>
  </body>
</html>
```
::

## 4. `Object.freeze` and `Object.seal`
- **Description**: `freeze` prevents any changes to an object; `seal` prevents adding/removing properties but allows modifying existing ones.
- **Usage**: Protect data in state management.
- **Syntax**: `Object.freeze(obj)`; `Object.seal(obj)`

Example: Protect an object.

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
    <title>Freeze and Seal</title>
  </head>
  <body>
    <h1>Protected Object</h1>
    <p id="output"></p>
    <script>
      let user = { name: 'Bob', age: 30 };
      Object.freeze(user);
      try {
        user.age = 31;
        document.getElementById('output').innerText = 'Change succeeded';
      } catch {
        document.getElementById('output').innerText = 'Object is frozen';
      }
    </script>
  </body>
</html>
```
::

## 5. `Object.hasOwnProperty`
- **Description**: Checks if an object has a specific property as its own (not inherited).
- **Usage**: Validate object properties before access.
- **Syntax**: `obj.hasOwnProperty(prop)`

Example: Check properties.

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
    <title>HasOwnProperty</title>
    <style>
      p { color: green; }
    </style>
  </head>
  <body>
    <h1>Property Check</h1>
    <p id="output"></p>
    <script>
      let user = { name: 'Alice' };
      let hasName = user.hasOwnProperty('name');
      let hasAge = user.hasOwnProperty('age');
      document.getElementById('output').innerText = `Has name: ${hasName}, Has age: ${hasAge}`;
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `Object.keys`/`values`/`entries` for iteration in Vue components.
- Use `Object.assign` for shallow copies, not deep.
- Freeze/seal objects for immutable state.
- Check properties with `hasOwnProperty` to avoid prototype issues.

## What’s Next?

You’ve mastered object methods! Review previous tutorials or explore frameworks like Nuxt for advanced projects.
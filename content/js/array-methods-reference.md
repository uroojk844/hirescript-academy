---
title: Array Methods Reference
description: Comprehensive guide to JavaScript array methods.
navigation:
  order: 17
---

# Array Methods Reference

In this tutorial, you’ll explore **JavaScript array methods** used to manipulate lists of data, essential for real-world web development, such as rendering lists or filtering data in Nuxt or Vue. Each method includes a detailed description, syntax, and practical examples integrating HTML and CSS.

In this tutorial, you’ll learn:
- Adding/removing elements (`push`, `pop`, etc.)
- Transforming data (`map`, `filter`, `reduce`)
- Iterating and searching arrays
- Framework-relevant use cases

## 1. `push` and `pop`
- **Description**: `push` adds elements to the array’s end; `pop` removes the last element and returns it.
- **Usage**: Manage dynamic lists, e.g., adding/removing tasks in a todo app.
- **Syntax**: `array.push(item1, ...)`; `array.pop()`

Example: Add/remove tasks in a list.

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
    <title>Push and Pop</title>
    <style>
      .container { display: flex; flex-direction: column; gap: 10px; }
      button { padding: 10px; background: #007bff; color: white; }
      li { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Todo List</h1>
    <div class="container">
      <ul id="todos"></ul>
      <button id="add">Add Task</button>
      <button id="remove">Remove Task</button>
    </div>
    <script>
      let todos = ['Learn JS'];
      const ul = document.getElementById('todos');
      function renderTodos() {
        ul.innerHTML = todos.map(todo => `<li>${todo}</li>`).join('');
      }
      document.getElementById('add').addEventListener('click', () => {
        todos.push(`Task ${todos.length + 1}`);
        renderTodos();
      });
      document.getElementById('remove').addEventListener('click', () => {
        todos.pop();
        renderTodos();
      });
      renderTodos();
    </script>
  </body>
</html>
```
::

## 2. `shift` and `unshift`
- **Description**: `shift` removes the first element; `unshift` adds elements to the start.
- **Usage**: Handle queue-like structures, e.g., notifications in a Nuxt app.
- **Syntax**: `array.shift()`; `array.unshift(item1, ...)`

Example: Manage notifications.

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
    <title>Shift and Unshift</title>
    <style>
      .notification { background: lightblue; padding: 10px; margin: 5px; }
      button { padding: 10px; background: #28a745; color: white; }
    </style>
  </head>
  <body>
    <h1>Notifications</h1>
    <div id="notifications"></div>
    <button id="add">Add Notification</button>
    <script>
      let notifications = ['Welcome!'];
      const div = document.getElementById('notifications');
      function renderNotifications() {
        div.innerHTML = notifications.map(n => `<div class="notification">${n}</div>`).join('');
      }
      document.getElementById('add').addEventListener('click', () => {
        notifications.unshift('New Alert!');
        renderNotifications();
      });
      renderNotifications();
    </script>
  </body>
</html>
```
::

## 3. `map`
- **Description**: Creates a new array by applying a function to each element.
- **Usage**: Transform data for rendering, e.g., generating Vue components from an array.
- **Syntax**: `array.map(callback(element, index, array))`

Example: Display doubled numbers.

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
    <title>Map Method</title>
    <style>
      ul { list-style: none; }
      li { padding: 5px; }
    </style>
  </head>
  <body>
    <h1>Doubled Numbers</h1>
    <ul id="output"></ul>
    <script>
      let numbers = [1, 2, 3, 4];
      let doubled = numbers.map(num => num * 2);
      document.getElementById('output').innerHTML = doubled.map(num => `<li>${num}</li>`).join('');
    </script>
  </body>
</html>
```
::

## 4. `filter`
- **Description**: Creates a new array with elements that pass a test.
- **Usage**: Filter data, e.g., showing completed tasks in a Nuxt app.
- **Syntax**: `array.filter(callback(element, index, array))`

Example: Filter even numbers.

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
    <title>Filter Method</title>
    <style>
      ul { list-style: none; }
      li { color: navy; }
    </style>
  </head>
  <body>
    <h1>Even Numbers</h1>
    <ul id="output"></ul>
    <script>
      let numbers = [1, 2, 3, 4, 5];
      let evens = numbers.filter(num => num % 2 === 0);
      document.getElementById('output').innerHTML = evens.map(num => `<li>${num}</li>`).join('');
    </script>
  </body>
</html>
```
::

## 5. `reduce`
- **Description**: Reduces an array to a single value using a callback.
- **Usage**: Aggregate data, e.g., summing prices in an e-commerce app.
- **Syntax**: `array.reduce(callback(accumulator, element, index, array), initialValue)`

Example: Calculate total.

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
    <title>Reduce Method</title>
    <style>
      p { font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>Cart Total</h1>
    <p id="output"></p>
    <script>
      let prices = [10, 20, 30];
      let total = prices.reduce((sum, price) => sum + price, 0);
      document.getElementById('output').innerText = `Total: $${total}`;
    </script>
  </body>
</html>
```
::

## 6. `forEach`
- **Description**: Executes a function for each element, without returning a new array.
- **Usage**: Perform actions, e.g., updating DOM elements in a loop.
- **Syntax**: `array.forEach(callback(element, index, array))`

Example: Display items.

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
    <title>ForEach Method</title>
    <style>
      ul { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Fruit List</h1>
    <ul id="output"></ul>
    <script>
      let fruits = ['Apple', 'Banana', 'Orange'];
      let list = '';
      fruits.forEach(fruit => {
        list += `<li>${fruit}</li>`;
      });
      document.getElementById('output').innerHTML = list;
    </script>
  </body>
</html>
```
::

## 7. `slice` and `splice`
- **Description**: `slice` extracts a portion without modifying the array; `splice` adds/removes elements, modifying the array.
- **Usage**: Extract or edit lists, e.g., pagination or list updates.
- **Syntax**: `array.slice(start, end)`; `array.splice(start, deleteCount, item1, ...)`

Example: Modify and extract arrays.

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
    <title>Slice and Splice</title>
  </head>
  <body>
    <h1>Array Modification</h1>
    <p id="output"></p>
    <script>
      let items = ['Pen', 'Book', 'Pencil'];
      let sliced = items.slice(0, 2);
      items.splice(1, 1, 'Notebook');
      document.getElementById('output').innerText = `Sliced: ${sliced}, Modified: ${items}`;
    </script>
  </body>
</html>
```
::

## 8. `join`, `includes`, `find`
- **Description**:
  - `join`: Combines elements into a string with a separator.
  - `includes`: Checks if an array contains a value.
  - `find`: Returns the first element matching a condition.
- **Usage**: Format output, search, or find specific items.
- **Syntax**: `array.join(separator)`; `array.includes(value)`; `array.find(callback)`

Example: Search and format.

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
    <title>Join, Includes, Find</title>
    <style>
      p { font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>Array Operations</h1>
    <p id="output"></p>
    <script>
      let items = ['Apple', 'Banana', 'Orange'];
      let joined = items.join(', ');
      let hasBanana = items.includes('Banana');
      let found = items.find(item => item.startsWith('B'));
      document.getElementById('output').innerText = `Joined: ${joined}, Has Banana: ${hasBanana}, Found: ${found}`;
    </script>
  </body>
</html>
```
::

## 9. `concat`, `sort`, `reverse`
- **Description**:
  - `concat`: Merges arrays.
  - `sort`: Sorts elements (optionally with a callback).
  - `reverse`: Reverses the array order.
- **Usage**: Combine lists, sort data for display.
- **Syntax**: `array.concat(array2, ...)`; `array.sort(compareFunction)`; `array.reverse()`

Example: Sort and merge.

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
    <title>Concat, Sort, Reverse</title>
    <style>
      ul { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Sorted Items</h1>
    <ul id="output"></ul>
    <script>
      let items1 = ['Apple', 'Banana'];
      let items2 = ['Orange', 'Mango'];
      let combined = items1.concat(items2).sort().reverse();
      document.getElementById('output').innerHTML = combined.map(item => `<li>${item}</li>`).join('');
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `map`, `filter`, `reduce` for functional programming in frameworks.
- Avoid mutating arrays with `splice` unless necessary.
- Test edge cases (empty arrays, invalid inputs).
- Cache results for performance in loops.

## What’s Next?

You’ve mastered array methods! Next, explore **String Methods Reference** for text manipulation techniques.
---
title: Modern Array Methods
description: Transform data with filter, map, reduce.
navigation:
  order: 9
---

# Modern Array Methods

In this ninth tutorial, you’ll learn **modern array methods** (`filter`, `map`, `reduce`) used in real-world projects and frameworks like Vue or React.

In this tutorial, you’ll learn:
- Filtering arrays with `filter`
- Transforming arrays with `map`
- Aggregating data with `reduce`

## Filter Method

`filter` creates a new array with elements passing a test:

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
    <title>Filter</title>
    <style>
      li { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Filter Numbers</h1>
    <ul id="output"></ul>
    <script>
      let numbers = [1, 2, 3, 4, 5];
      let evens = numbers.filter(num => num % 2 === 0);
      let list = '';
      evens.forEach(num => list += `<li>${num}</li>`);
      document.getElementById('output').innerHTML = list;
    </script>
  </body>
</html>
```
::

## Map Method

`map` transforms each element:

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
    <title>Map</title>
    <style>
      li { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Double Numbers</h1>
    <ul id="output"></ul>
    <script>
      let numbers = [1, 2, 3];
      let doubled = numbers.map(num => num * 2);
      let list = '';
      doubled.forEach(num => list += `<li>${num}</li>`);
      document.getElementById('output').innerHTML = list;
    </script>
  </body>
</html>
```
::

## Reduce Method

`reduce` aggregates array values:

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
    <title>Reduce</title>
  </head>
  <body>
    <h1>Sum Numbers</h1>
    <p id="output"></p>
    <script>
      let numbers = [1, 2, 3, 4];
      let sum = numbers.reduce((acc, num) => acc + num, 0);
      document.getElementById('output').innerText = `Sum: ${sum}`;
    </script>
  </body>
</html>
```
::

## Best Practices
- Use arrow functions for concise code.
- Chain methods for efficiency.
- Test methods with real data.

## What’s Next?

You’ve learned modern array methods! Next, explore **Manipulating the DOM**.
---
title: HTML Lists and Tables
description: Learn to organize content using ordered, unordered lists, and tables in HTML.
navigation:
  order: 3
---

# HTML Lists and Tables

In this third tutorial, you'll learn how to structure and organize content using **lists** and **tables** in HTML. Lists are great for presenting items in a sequence, while tables help display data in a grid format.

In this tutorial, you’ll learn:

- How to create unordered and ordered lists
- How to build tables with rows and columns
- Key attributes for lists and tables

## Creating Lists in HTML

HTML supports two main types of lists:

- **Unordered Lists** (`<ul>`): Display items with bullets.
- **Ordered Lists** (`<ol>`): Display items with numbers or letters.

Each list item is defined using the `<li>` tag.

### Unordered List Example

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
    <title>Unordered List</title>
  </head>
  <body>
    <h1>My Favorite Fruits</h1>
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>
  </body>
</html>
```

::

### Ordered List Example

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
    <title>Ordered List</title>
  </head>
  <body>
    <h1>Steps to Make Tea</h1>
    <ol>
      <li>Boil water</li>
      <li>Add tea leaves</li>
      <li>Pour into cup</li>
    </ol>
  </body>
</html>
```

::

### List Attributes

- `<ol type="A">`: Changes numbering to letters (e.g., A, B, C).
- `<ol start="5">`: Starts numbering from a specific value.
- `<ul>` and `<ol>` can be nested for sublists.

Example of a nested list:

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
    <title>Nested List</title>
  </head>
  <body>
    <h1>Grocery List</h1>
    <ul>
      <li>
        Fruits
        <ul>
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </li>
      <li>
        Vegetables
        <ul>
          <li>Carrot</li>
          <li>Broccoli</li>
        </ul>
      </li>
    </ul>
  </body>
</html>
```

::

## Creating Tables in HTML

The `<table>` tag creates a table, with `<tr>` for rows, `<th>` for headers, and `<td>` for data cells.

Here’s a simple table:

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
    <title>Basic Table</title>
  </head>
  <body>
    <h1>Class Schedule</h1>
    <table>
      <tr>
        <th>Day</th>
        <th>Subject</th>
      </tr>
      <tr>
        <td>Monday</td>
        <td>Math</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>Science</td>
      </tr>
    </table>
  </body>
</html>
```

::

### Key Table Elements and Attributes

- `<th>`: Defines header cells (bold and centered by default).
- `<tr>`: Defines a row.
- `<td>`: Defines a data cell.
- `border="1"`: Adds a border to the table (for visibility; styling is often done with CSS).
- `rowspan` and `colspan`: Merge cells across rows or columns.

Example with merged cells:

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
    <title>Advanced Table</title>
  </head>
  <body>
    <h1>Weekly Plan</h1>
    <table border="1">
      <tr>
        <th>Day</th>
        <th>Activity</th>
        <th>Time</th>
      </tr>
      <tr>
        <td rowspan="2">Wednesday</td>
        <td>Math</td>
        <td>9:00 AM</td>
      </tr>
      <tr>
        <td>Science</td>
        <td>11:00 AM</td>
      </tr>
    </table>
  </body>
</html>
```

::

## Best Practices

- Use `<ul>` for non-sequential items and `<ol>` for sequential items.
- Ensure tables are accessible by including `<th>` for headers and considering screen readers.
- Avoid using tables for layout (use CSS instead).

## What’s Next?

You’ve learned how to create lists and tables in HTML! In the next tutorial, we’ll explore **HTML Forms and Input Elements** to collect user input.

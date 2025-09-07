---
title: HTML Data Attributes and Events
description: Learn to use data attributes and event handlers in HTML.
navigation:
  order: 9
---

# HTML Data Attributes and Events

In this ninth tutorial, you'll learn about **data attributes** and **event handlers** in HTML. Data attributes (`data-*`) allow you to store custom data, while event attributes like `onclick` enable basic interactivity without external JavaScript.

In this tutorial, you’ll learn:
- How to use `data-*` attributes for custom data
- How to add event handlers like `onclick`
- Practical examples of interactivity

## Using Data Attributes

The `data-*` attributes store custom information on HTML elements, which can be accessed by JavaScript or CSS. The `*` is a custom name you define.

Example with `data-*` attributes:

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
    <title>Data Attributes</title>
  </head>
  <body>
    <h1>Product List</h1>
    <div data-product-id="101" data-type="electronics">Laptop</div>
    <div data-product-id="102" data-type="clothing">Shirt</div>
  </body>
</html>
```
::

### Explanation
- `data-product-id="101"`: Stores a custom product ID.
- `data-type="electronics"`: Stores the product category.
- These attributes can be accessed via JavaScript (e.g., `element.dataset.productId`).

## Adding Event Handlers

Event attributes like `onclick`, `onchange`, or `onmouseover` trigger JavaScript code when an event occurs. They’re useful for simple interactivity.

Example with `onclick`:

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
    <title>Event Handlers</title>
  </head>
  <body>
    <h1>Interactive Button</h1>
    <button onclick="alert('Button clicked!')">Click Me</button>
  </body>
</html>
```
::

### Common Event Attributes
- `onclick`: Triggers on a mouse click.
- `onchange`: Triggers when an input value changes.
- `onmouseover`: Triggers when the mouse hovers over an element.
- `onsubmit`: Triggers when a form is submitted.

Example combining data attributes and events:

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
    <title>Data and Events</title>
  </head>
  <body>
    <h1>Product Details</h1>
    <button data-item="Laptop" onclick="alert('You selected: ' + this.dataset.item)">Show Laptop</button>
    <button data-item="Phone" onclick="alert('You selected: ' + this.dataset.item)">Show Phone</button>
  </body>
</html>
```
::

## Best Practices
- Use meaningful names for `data-*` attributes (e.g., `data-product-id`).
- Keep event handler code simple; use external JavaScript for complex logic.
- Ensure event-driven elements are accessible (e.g., buttons should be focusable).

## What’s Next?

You’ve learned about data attributes and event handlers! In the next tutorial, we’ll explore **HTML Advanced Forms**, covering `<fieldset>`, `<legend>`, and form validation.
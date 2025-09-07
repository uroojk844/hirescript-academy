---
title: CSS Transitions and Animations
description: Add dynamic effects with CSS transitions.
navigation:
  order: 10
---

# CSS Transitions and Animations

In this tenth tutorial, you’ll learn about **CSS transitions** and **animations** to add dynamic effects to HTML elements, enhancing user interaction.

In this tutorial, you’ll learn:
- Creating transitions for smooth changes
- Using `@keyframes` for animations
- Controlling animation properties

## CSS Transitions

The `transition` property creates smooth changes for properties like `color` or `width`.

Example with transition:

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
    <title>Transitions</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background: blue;
        transition: background 0.5s;
      }
      .box:hover {
        background: red;
      }
    </style>
  </head>
  <body>
    <h1>Hover Transition</h1>
    <div class="box"></div>
  </body>
</html>
```
::

## CSS Animations

The `@keyframes` rule defines animation sequences, used with the `animation` property.

Example with animation:

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
    <title>Animations</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background: green;
        animation: slide 2s infinite;
      }
      @keyframes slide {
        0% { transform: translateX(0); }
        50% { transform: translateX(100px); }
        100% { transform: translateX(0); }
      }
    </style>
  </head>
  <body>
    <h1>Sliding Box</h1>
    <div class="box"></div>
  </body>
</html>
```
::

## Best Practices
- Use transitions for simple effects.
- Keep animations subtle for usability.
- Test performance on low-end devices.

## What’s Next?

You’ve learned transitions and animations! Next, we’ll explore **CSS Pseudo-Classes and Elements** for advanced styling.
---
title: Animations and Transitions
description: Learn how to create smooth animations and transitions using Tailwind CSS utilities.
navigation:
  order: 16
---

# Animations and Transitions

Welcome to animations and transitions in Tailwind CSS! Animations bring life to your web interfaces, creating engaging user experiences through smooth visual feedback. Tailwind provides a comprehensive set of utilities for creating everything from simple hover effects to complex keyframe animations.

In this tutorial, you'll learn:

- The difference between transitions and animations in CSS
- Tailwind's built-in animation utilities
- How to create smooth hover and focus effects
- Basic transform utilities for movement and scaling

## Understanding Transitions vs Animations

**Transitions** are smooth changes between two states, triggered by user interactions like hover or focus. **Animations** are more complex, using keyframes to define multiple states and can run automatically or on trigger.

- **Transitions**: Simple A-to-B state changes (hover effects, color changes)
- **Animations**: Complex sequences with multiple keyframes (loading spinners, bouncing elements)

## Basic Transition Example

Let's start with a simple button that changes color smoothly on hover:

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
    <title>Basic Transitions</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100">
    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600">
      Hover me!
    </button>
    
    <div class="mt-8">
      <div class="w-16 h-16 bg-red-400 rounded-lg transition-transform duration-500 hover:scale-110 hover:rotate-12">
      </div>
      <p class="text-sm text-gray-600 mt-2">Hover the square above</p>
    </div>
  </body>
</html>
```

::

### Key Classes Explained

- `transition-colors`: Animates color changes
- `duration-300`: Animation lasts 300ms
- `hover:bg-blue-600`: Background color on hover
- `transition-transform`: Animates transform properties
- `hover:scale-110`: Scale to 110% on hover
- `hover:rotate-12`: Rotate 12 degrees on hover

## Built-in Tailwind Animations

Tailwind comes with several pre-built animations that you can use immediately:

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
    <title>Built-in Animations</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100 space-y-8">
    <!-- Spin Animation -->
    <div class="flex items-center space-x-4">
      <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span>animate-spin (loading spinner)</span>
    </div>
    
    <!-- Ping Animation -->
    <div class="flex items-center space-x-4">
      <div class="relative">
        <div class="w-4 h-4 bg-green-400 rounded-full"></div>
        <div class="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
      </div>
      <span>animate-ping (notification dot)</span>
    </div>
    
    <!-- Pulse Animation -->
    <div class="flex items-center space-x-4">
      <div class="w-12 h-12 bg-purple-400 rounded-lg animate-pulse"></div>
      <span>animate-pulse (loading placeholder)</span>
    </div>
    
    <!-- Bounce Animation -->
    <div class="flex items-center space-x-4">
      <div class="w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
      <span>animate-bounce (attention grabber)</span>
    </div>
  </body>
</html>
```

::

### Built-in Animation Classes

- `animate-spin`: Continuous rotation (perfect for loading spinners)
- `animate-ping`: Expanding ping effect (great for notifications)
- `animate-pulse`: Subtle pulsing opacity (loading placeholders)
- `animate-bounce`: Bouncing up and down (call-to-action buttons)

## Combining Multiple Effects

You can combine transitions with transforms for more sophisticated effects:

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
    <title>Combined Effects</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="grid grid-cols-2 gap-8">
      <!-- Card with multiple hover effects -->
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer">
        <h3 class="text-lg font-semibold text-gray-800">Hover Card</h3>
        <p class="text-gray-600">Multiple effects combined</p>
      </div>
      
      <!-- Button with complex animation -->
      <button class="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-4 rounded-lg transition-all duration-300 hover:from-pink-600 hover:to-violet-600 hover:scale-105 hover:shadow-lg transform active:scale-95">
        Interactive Button
      </button>
    </div>
  </body>
</html>
```

::

This example combines:
- `transition-all`: Animates all properties
- `hover:-translate-y-2`: Move up on hover
- `hover:scale-105`: Slightly enlarge
- `hover:shadow-2xl`: Increase shadow
- `active:scale-95`: Shrink when clicked

## What's Next?

You've learned the basics of animations and transitions in Tailwind! In the next tutorial, we'll dive deeper into **Transition Properties and Duration**, exploring timing functions, delays, and fine-tuning your animations.
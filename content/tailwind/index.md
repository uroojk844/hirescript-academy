---
title: Introduction to Tailwind CSS
description: Learn what Tailwind CSS is and why it's revolutionizing web development.
navigation:
  order: 1
---

# Introduction to Tailwind CSS

Welcome to your first lesson in Tailwind CSS! Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup. Unlike traditional CSS frameworks, Tailwind doesn't impose design decisions on you – instead, it gives you the building blocks to create any design you can imagine.

In this tutorial, you'll learn:

- What Tailwind CSS is and its core philosophy
- How it differs from traditional CSS frameworks
- The benefits of utility-first approach
- When to use Tailwind CSS in your projects

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, and `rotate-90` that can be composed to build any design, directly in your markup. Think of it as having thousands of tiny, single-purpose CSS classes at your disposal.

Instead of writing custom CSS like this:

```css
.btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}
```

You can achieve the same result with Tailwind utilities:

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
    <title>Tailwind Button Example</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <button class="bg-blue-500 text-white px-4 py-2 rounded-md font-medium">
      Click me
    </button>
  </body>
</html>
```

::

## How Tailwind Differs from Traditional Frameworks

Traditional CSS frameworks like Bootstrap or Foundation provide pre-built components (cards, navbars, buttons) with predefined styles. While convenient, they often lead to websites that look similar and require overriding styles to achieve custom designs.

**Traditional Framework Approach:**
```html
<button class="btn btn-primary">Primary Button</button>
```

**Tailwind Approach:**
```html
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Primary Button
</button>
```

### Key Differences:

- **Flexibility**: Tailwind provides utilities, not components – you build exactly what you need
- **File Size**: Only the utilities you use are included in the final CSS
- **Customization**: No need to override existing styles – you compose your own
- **Consistency**: Utilities follow a systematic design scale

## Benefits of the Utility-First Approach

### 1. **Faster Development**
Once you learn the utility classes, building interfaces becomes incredibly fast. No context switching between HTML and CSS files.

### 2. **Maintainable Code**
Changes are made directly in the markup, making it easy to see what styles apply to each element.

### 3. **Smaller CSS Bundles**
Tailwind automatically removes unused styles in production, resulting in tiny CSS files.

### 4. **Consistent Design System**
Built-in spacing scale, color palette, and sizing system ensure visual consistency.

Let's see a practical example:

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
    <title>Tailwind Card Example</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-2">Product Card</h2>
        <p class="text-gray-600 mb-4">
          This card is built entirely with Tailwind utility classes.
        </p>
        <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation of Classes Used:
- `bg-gray-100`: Light gray background
- `max-w-md`: Maximum width constraint
- `mx-auto`: Center horizontally
- `rounded-xl`: Extra large border radius
- `shadow-md`: Medium shadow
- `text-xl`: Extra large text size
- `font-bold`: Bold font weight
- `hover:bg-indigo-600`: Darker background on hover
- `transition-colors`: Smooth color transitions

## When to Use Tailwind CSS

Tailwind CSS is ideal for:

- **Custom Designs**: When you need unique, branded interfaces
- **Rapid Prototyping**: Quick mockups and proof of concepts
- **Component-Based Architecture**: React, Vue, Angular applications
- **Design Systems**: Building consistent, scalable design languages
- **Performance-Critical Applications**: Small CSS bundles matter

Tailwind might not be the best choice if:
- You prefer writing traditional CSS
- You need a quick solution with pre-built components
- Your team is unfamiliar with utility-first concepts

## What's Next?

You've learned the fundamentals of Tailwind CSS and its utility-first philosophy! In the next tutorial, we'll cover **Installation and Setup**, where you'll learn different ways to add Tailwind CSS to your projects and configure it for optimal development.
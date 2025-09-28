---
title: Component Patterns and Reusability
description: Learn to create reusable component patterns with Tailwind CSS.
navigation:
  order: 15
---

# Component Patterns and Reusability

In this tutorial, you'll learn how to create reusable component patterns with Tailwind CSS. While Tailwind is utility-first, building real applications requires strategies for managing repetitive styles and creating consistent, maintainable components.

In this tutorial, you'll learn:
- Extracting component patterns effectively
- Using `@apply` directive for custom classes
- Creating reusable button and card components
- Organizing component styles in your project
- When to extract vs. when to use utilities directly

## Understanding Component Extraction

When you find yourself repeating the same utility combinations across multiple elements, it's time to consider creating a reusable pattern. However, don't extract too early—premature abstraction can make your code harder to maintain.

**Extract when:**
- You use the same combination 3+ times
- The pattern represents a distinct UI element (button, card, badge)
- Changes to the pattern should update all instances

**Don't extract when:**
- It's only used once or twice
- Each instance has significant variations
- The utilities are simple and self-explanatory

## Creating Button Components

Buttons are a perfect candidate for extraction since they're used frequently and need consistency:

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
    <title>Button Components</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/tailwindcss">
      .btn {
        @apply px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4;
      }
      
      .btn-primary {
        @apply bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300;
      }
      
      .btn-secondary {
        @apply bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300;
      }
      
      .btn-success {
        @apply bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-300;
      }
      
      .btn-danger {
        @apply bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-300;
      }
      
      .btn-outline {
        @apply bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-300;
      }
      
      .btn-sm {
        @apply px-4 py-2 text-sm;
      }
      
      .btn-lg {
        @apply px-8 py-4 text-lg;
      }
    </style>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-4xl mx-auto space-y-6">
      <h1 class="text-3xl font-bold mb-6">Button Component Patterns</h1>
      
      <section>
        <h2 class="text-xl font-semibold mb-4">Basic Buttons</h2>
        <div class="flex flex-wrap gap-4">
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-secondary">Secondary Button</button>
          <button class="btn btn-success">Success Button</button>
          <button class="btn btn-danger">Danger Button</button>
          <button class="btn btn-outline">Outline Button</button>
        </div>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold mb-4">Button Sizes</h2>
        <div class="flex flex-wrap items-center gap-4">
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary">Default</button>
          <button class="btn btn-primary btn-lg">Large</button>
        </div>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold mb-4">Combined Patterns</h2>
        <div class="flex flex-wrap gap-4">
          <button class="btn btn-success btn-sm">Save Changes</button>
          <button class="btn btn-danger btn-lg">Delete Account</button>
          <button class="btn btn-outline btn-sm">Cancel</button>
        </div>
      </section>
    </div>
  </body>
</html>
```
::

### Explanation
- `@apply`: Directive that extracts Tailwind utilities into custom classes
- `.btn`: Base button styles shared by all variants
- `.btn-primary`, `.btn-secondary`: Color variants that extend the base
- `.btn-sm`, `.btn-lg`: Size modifiers that can be combined with any variant

## Creating Card Components

Cards are another common pattern that benefits from extraction:

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
    <title>Card Components</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/tailwindcss">
      .card {
        @apply bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl;
      }
      
      .card-header {
        @apply px-6 py-4 border-b border-gray-200 bg-gray-50;
      }
      
      .card-body {
        @apply px-6 py-4;
      }
      
      .card-footer {
        @apply px-6 py-4 border-t border-gray-200 bg-gray-50;
      }
      
      .card-title {
        @apply text-xl font-bold text-gray-800;
      }
      
      .card-text {
        @apply text-gray-600 leading-relaxed;
      }
      
      .card-highlight {
        @apply border-l-4 border-blue-500;
      }
      
      .card-dark {
        @apply bg-gray-800 text-white;
      }
      
      .card-dark .card-header,
      .card-dark .card-footer {
        @apply bg-gray-700 border-gray-600;
      }
      
      .card-dark .card-title {
        @apply text-white;
      }
      
      .card-dark .card-text {
        @apply text-gray-300;
      }
    </style>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Card Component Patterns</h1>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Basic Card</h3>
          </div>
          <div class="card-body">
            <p class="card-text">
              This is a simple card component with header, body, and footer sections.
            </p>
          </div>
          <div class="card-footer">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Action
            </button>
          </div>
        </div>
        
        <div class="card card-highlight">
          <div class="card-body">
            <h3 class="card-title mb-3">Highlighted Card</h3>
            <p class="card-text">
              This card uses the highlight modifier to add a colored left border.
            </p>
          </div>
        </div>
        
        <div class="card card-dark">
          <div class="card-header">
            <h3 class="card-title">Dark Card</h3>
          </div>
          <div class="card-body">
            <p class="card-text">
              This card demonstrates the dark theme variant with appropriate color adjustments.
            </p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-3">Simple Card</h3>
            <p class="card-text mb-4">
              Not all cards need headers and footers. This one only has a body section.
            </p>
            <div class="flex gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Tag 1</span>
              <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Tag 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```
::

### Key Concepts
- Modular structure: header, body, footer can be used independently
- Modifier classes: `card-highlight`, `card-dark` extend the base `card`
- Nested selectors: `.card-dark .card-title` for theme-specific overrides
- Composable: Mix and match sections as needed

## Creating Badge and Tag Components

Smaller UI elements also benefit from consistent patterns:

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
    <title>Badge Components</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/tailwindcss">
      .badge {
        @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
      }
      
      .badge-primary {
        @apply bg-blue-100 text-blue-800;
      }
      
      .badge-success {
        @apply bg-green-100 text-green-800;
      }
      
      .badge-warning {
        @apply bg-yellow-100 text-yellow-800;
      }
      
      .badge-danger {
        @apply bg-red-100 text-red-800;
      }
      
      .badge-outlined {
        @apply bg-transparent border-2;
      }
      
      .badge-outlined.badge-primary {
        @apply border-blue-500 text-blue-500;
      }
      
      .badge-dot::before {
        content: '';
        @apply w-2 h-2 rounded-full mr-2;
      }
      
      .badge-dot.badge-primary::before {
        @apply bg-blue-500;
      }
      
      .badge-dot.badge-success::before {
        @apply bg-green-500;
      }
      
      .badge-dot.badge-danger::before {
        @apply bg-red-500;
      }
    </style>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-4xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold mb-6">Badge Component Patterns</h1>
      
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Basic Badges</h2>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-primary">Primary</span>
          <span class="badge badge-success">Success</span>
          <span class="badge badge-warning">Warning</span>
          <span class="badge badge-danger">Danger</span>
        </div>
      </section>
      
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Outlined Badges</h2>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-outlined badge-primary">Outlined</span>
          <span class="badge badge-outlined badge-primary">New</span>
          <span class="badge badge-outlined badge-primary">Featured</span>
        </div>
      </section>
      
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Badges with Dots</h2>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-dot badge-primary">Online</span>
          <span class="badge badge-dot badge-success">Active</span>
          <span class="badge badge-dot badge-danger">Offline</span>
        </div>
      </section>
      
      <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Usage in Context</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 class="font-semibold">Project Alpha</h3>
              <p class="text-sm text-gray-600">Web application development</p>
            </div>
            <span class="badge badge-success">Active</span>
          </div>
          
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 class="font-semibold">Project Beta</h3>
              <p class="text-sm text-gray-600">Mobile app redesign</p>
            </div>
            <span class="badge badge-warning">In Progress</span>
          </div>
          
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 class="font-semibold">Project Gamma</h3>
              <p class="text-sm text-gray-600">API integration</p>
            </div>
            <span class="badge badge-dot badge-danger">Blocked</span>
          </div>
        </div>
      </section>
    </div>
  </body>
</html>
```
::

### Advanced Techniques
- `::before` pseudo-elements for decorative dots
- Multiple modifier classes combined: `badge badge-outlined badge-primary`
- Contextual usage examples showing real-world applications

## Creating Form Input Components

Consistent form styling improves user experience:

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
    <title>Form Components</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/tailwindcss">
      .form-group {
        @apply mb-4;
      }
      
      .form-label {
        @apply block text-sm font-medium text-gray-700 mb-2;
      }
      
      .form-input {
        @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition;
      }
      
      .form-input-error {
        @apply border-red-500 focus:ring-red-500 focus:border-red-500;
      }
      
      .form-input-success {
        @apply border-green-500 focus:ring-green-500 focus:border-green-500;
      }
      
      .form-error {
        @apply text-sm text-red-600 mt-1;
      }
      
      .form-help {
        @apply text-sm text-gray-500 mt-1;
      }
      
      .form-select {
        @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition bg-white;
      }
      
      .form-textarea {
        @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition resize-y;
      }
    </style>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold mb-6">Form Component Patterns</h1>
      
      <form class="space-y-6">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" placeholder="Enter your name" />
          <p class="form-help">Please enter your full legal name</p>
        </div>
        
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input form-input-error" value="invalid-email" />
          <p class="form-error">Please enter a valid email address</p>
        </div>
        
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input form-input-success" value="john_doe" />
          <p class="form-help text-green-600">✓ Username is available</p>
        </div>
        
        <div class="form-group">
          <label class="form-label">Country</label>
          <select class="form-select">
            <option>Select a country</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Bio</label>
          <textarea class="form-textarea" rows="4" placeholder="Tell us about yourself"></textarea>
          <p class="form-help">Maximum 500 characters</p>
        </div>
        
        <div class="flex gap-4">
          <button type="submit" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold">
            Submit
          </button>
          <button type="button" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </body>
</html>
```
::

### Form Pattern Benefits
- Consistent spacing with `.form-group`
- Clear visual states: default, error, success
- Helpful text with `.form-help` and `.form-error`
- All inputs share base styles but can be modified

## Best Practices

- **Start with utilities**: Don't extract components until you see repetition
- **Keep components focused**: Each component class should have a single purpose
- **Use modifier classes**: Create variants like `-primary`, `-lg` instead of new components
- **Maintain flexibility**: Components should still accept additional utility classes
- **Document patterns**: Keep a style guide showing all component variations
- **Avoid over-abstraction**: Not everything needs to be a component
- **Use semantic names**: `.btn-primary` is better than `.btn-blue`
- **Test combinations**: Ensure modifiers work together (e.g., `.btn .btn-primary .btn-sm`)

## When to Use Utilities vs Components

**Use utilities directly when:**
- Building one-off layouts
- The pattern is unique to that page
- You need maximum flexibility
- The combination is simple (1-3 classes)

**Extract components when:**
- The pattern appears 3+ times
- It represents a distinct UI element
- Consistency across instances is critical
- The utility combination is complex (5+ classes)

## What's Next?

You've learned how to create reusable component patterns in Tailwind CSS! In the next tutorial, we'll explore **Animations and Transitions**, covering how to add smooth animations and interactive effects to your components.
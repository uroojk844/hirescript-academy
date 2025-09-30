---
title: Forms and Input Styling
description: Learn to style beautiful, accessible forms and input elements using Tailwind CSS utilities.
navigation:
  order: 17
---

# Forms and Input Styling

Creating beautiful, accessible forms is essential for any web application. Tailwind CSS provides comprehensive utilities for styling form elements, from basic inputs to complex form layouts. In this tutorial, you'll learn how to build professional-looking forms that work great across all devices.

In this tutorial, you'll learn:

- Basic input styling and variants
- Form layout and spacing techniques
- Input states (focus, disabled, error)
- Checkbox, radio, and select styling
- Form validation styling patterns

## Basic Input Styling

Let's start with fundamental input styling using Tailwind's form utilities:

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
    <title>Basic Input Styling</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Basic Inputs</h2>
      
      <!-- Standard input -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Standard Input
        </label>
        <input 
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
        >
      </div>
      
      <!-- Rounded input -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Rounded Input
        </label>
        <input 
          type="email" 
          class="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="your.email@example.com"
        >
      </div>
      
      <!-- Large input -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Large Input
        </label>
        <input 
          type="text" 
          class="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Large input field"
        >
      </div>
      
      <!-- Minimal input -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Minimal Input
        </label>
        <input 
          type="text" 
          class="w-full px-0 py-2 text-lg bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Underline only"
        >
      </div>
    </div>
  </body>
</html>
```

::

### Key Input Classes Explained

- `focus:outline-none`: Removes default browser outline
- `focus:ring-2 focus:ring-blue-500`: Adds colored focus ring
- `focus:border-blue-500`: Changes border color on focus
- `shadow-sm`: Subtle shadow for depth
- `rounded-md/lg/full`: Different border radius options

## Input States and Variations

Handle different input states like disabled, readonly, and error states:

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
    <title>Input States</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Input States</h2>
      
      <!-- Normal state -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Normal State
        </label>
        <input 
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Normal input"
        >
      </div>
      
      <!-- Disabled state -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-400 mb-2">
          Disabled State
        </label>
        <input 
          type="text" 
          disabled
          class="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-400 cursor-not-allowed"
          placeholder="Disabled input"
          value="Cannot edit this"
        >
      </div>
      
      <!-- Error state -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-red-700 mb-2">
          Error State
        </label>
        <input 
          type="email" 
          class="w-full px-3 py-2 border-2 border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-red-50"
          placeholder="invalid-email"
          value="invalid-email"
        >
        <p class="mt-1 text-sm text-red-600">Please enter a valid email address</p>
      </div>
      
      <!-- Success state -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-green-700 mb-2">
          Success State
        </label>
        <input 
          type="email" 
          class="w-full px-3 py-2 border-2 border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
          placeholder="user@example.com"
          value="user@example.com"
        >
        <p class="mt-1 text-sm text-green-600">✓ Valid email address</p>
      </div>
      
      <!-- Readonly state -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Readonly State
        </label>
        <input 
          type="text" 
          readonly
          class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700"
          value="Read-only content"
        >
      </div>
    </div>
  </body>
</html>
```

::

### State-Specific Styling

- **Disabled**: `bg-gray-100 text-gray-400 cursor-not-allowed`
- **Error**: `border-red-300 bg-red-50 focus:ring-red-500`
- **Success**: `border-green-300 bg-green-50 focus:ring-green-500`
- **Readonly**: `bg-gray-50` with standard border

## Checkboxes and Radio Buttons

Style custom checkboxes and radio buttons that look great:

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
    <title>Checkboxes and Radio Buttons</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Checkboxes & Radio Buttons</h2>
      
      <!-- Checkboxes -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Preferences</h3>
        <div class="space-y-3">
          <label class="flex items-center">
            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <span class="ml-2 text-sm text-gray-700">Email notifications</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <span class="ml-2 text-sm text-gray-700">SMS notifications</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <span class="ml-2 text-sm text-gray-700">Push notifications</span>
          </label>
        </div>
      </div>
      
      <!-- Radio buttons -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Plan Selection</h3>
        <div class="space-y-3">
          <label class="flex items-center">
            <input type="radio" name="plan" value="free" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
            <span class="ml-2 text-sm text-gray-700">Free Plan</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="plan" value="pro" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
            <span class="ml-2 text-sm text-gray-700">Pro Plan ($9/month)</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="plan" value="enterprise" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
            <span class="ml-2 text-sm text-gray-700">Enterprise Plan ($29/month)</span>
          </label>
        </div>
      </div>
      
      <!-- Custom styled checkboxes -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">Custom Styling</h3>
        <div class="space-y-3">
          <label class="flex items-center cursor-pointer">
            <div class="relative">
              <input type="checkbox" class="sr-only">
              <div class="w-6 h-6 bg-gray-200 rounded border-2 border-gray-300 transition-colors peer-checked:bg-blue-500 peer-checked:border-blue-500"></div>
              <svg class="w-4 h-4 text-white absolute top-0.5 left-0.5 hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="ml-3 text-sm text-gray-700">Custom checkbox style</span>
          </label>
        </div>
      </div>
    </div>
  </body>
</html>
```

::

### Checkbox and Radio Styling

- `w-4 h-4`: Standard size for form controls
- `text-blue-600`: Color when checked
- `focus:ring-2 focus:ring-blue-500`: Focus ring styling
- `sr-only`: Screen reader only (for custom implementations)

## Select Dropdowns and Textareas

Style select elements and textareas consistently:

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
    <title>Select and Textarea</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Select & Textarea</h2>
      
      <!-- Select dropdown -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Select a country</option>
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>Germany</option>
        </select>
      </div>
      
      <!-- Multiple select -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Skills (Multiple)
        </label>
        <select multiple class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24">
          <option>JavaScript</option>
          <option>Python</option>
          <option>React</option>
          <option>Node.js</option>
          <option>Tailwind CSS</option>
        </select>
        <p class="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
      </div>
      
      <!-- Textarea -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea 
          rows="4" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Enter your message here..."
        ></textarea>
      </div>
      
      <!-- Auto-resizing textarea -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Auto-resize Message
        </label>
        <textarea 
          rows="2" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y min-h-[80px]"
          placeholder="This textarea can be resized vertically..."
        ></textarea>
      </div>
      
      <!-- File input -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Upload File
        </label>
        <input 
          type="file" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        >
      </div>
    </div>
  </body>
</html>
```

::

### Select and Textarea Features

- `resize-none`: Prevents textarea resizing
- `resize-y`: Allows vertical resizing only
- `min-h-[80px]`: Sets minimum height
- `file:` prefix: Styles the file input button
- `multiple`: Allows multiple selection in select

## Complete Form Example

Here's a comprehensive form combining all the techniques:

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
    <title>Complete Form</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 bg-gray-100">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">User Registration</h2>
      
      <form class="space-y-6">
        <!-- Name fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input 
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input 
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Doe"
            >
          </div>
        </div>
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input 
            type="email" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          >
        </div>
        
        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <input 
            type="password" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          >
          <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
        </div>
        
        <!-- Role selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Select your role</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Manager</option>
            <option>Other</option>
          </select>
        </div>
        
        <!-- Bio -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea 
            rows="3" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>
        
        <!-- Checkboxes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Preferences
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
              <span class="ml-2 text-sm text-gray-700">Subscribe to newsletter</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
              <span class="ml-2 text-sm text-gray-700">Agree to terms and conditions</span>
            </label>
          </div>
        </div>
        
        <!-- Submit button -->
        <div class="pt-4">
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  </body>
</html>
```

::

## Form Best Practices

**Accessibility:**
- Always use `<label>` elements with form inputs
- Add `required` attribute for mandatory fields
- Use `placeholder` text appropriately (not as label replacement)
- Provide clear error messages

**Visual Hierarchy:**
- Group related fields using consistent spacing
- Use `grid` for side-by-side fields
- Mark required fields with asterisks (*)
- Maintain consistent focus states across all inputs

**User Experience:**
- Use appropriate input types (`email`, `password`, `tel`)
- Provide helpful hint text below inputs
- Use consistent button styling and states
- Consider mobile-first responsive design

## What's Next?

You've learned comprehensive form styling techniques in Tailwind CSS! In the next tutorial, we'll explore **Custom Configuration**, learning how to extend Tailwind's default theme and create your own utility classes.
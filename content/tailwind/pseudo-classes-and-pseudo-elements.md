---
title: Pseudo classes and elements
description: Learn how to use pseudo-classes and pseudo-elements in Tailwind CSS for advanced styling.
navigation:
  order: 13
---

# Pseudo-classes and Pseudo-elements

Pseudo-classes and pseudo-elements allow you to style elements based on their state or to style specific parts of an element. Tailwind CSS provides utility classes for the most commonly used pseudo-classes and pseudo-elements, enabling you to create sophisticated interactions and visual effects without writing custom CSS.

In this tutorial, you'll learn:
- How to use pseudo-class modifiers for element states
- Working with pseudo-elements like ::before and ::after
- Form-specific pseudo-classes
- Advanced pseudo-class combinations

## Common Pseudo-classes

### Hover, Focus, and Active States

The most commonly used pseudo-classes for interactive elements:

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
    <title>Basic Pseudo-classes</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 space-y-6">
    <h1 class="text-2xl font-bold mb-6">Basic Pseudo-classes</h1>
    
    <!-- Hover effects -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
      Hover me
    </button>
    
    <!-- Focus effects -->
    <input 
      type="text" 
      placeholder="Focus me" 
      class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded"
    >
    
    <!-- Active effects -->
    <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
      Click and hold
    </button>
    
    <!-- Disabled state -->
    <button disabled class="bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed disabled:opacity-50">
      Disabled button
    </button>
  </body>
</html>
```
::

### First, Last, and Nth-child Pseudo-classes

Target specific elements in a list or group:

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
    <title>Child Pseudo-classes</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <h1 class="text-2xl font-bold mb-6">Child Pseudo-classes</h1>
    
    <div class="space-y-4">
      <!-- First and last child -->
      <ul class="bg-gray-100 rounded-lg p-4">
        <li class="first:text-green-600 first:font-bold last:text-red-600 last:font-bold py-2 border-b border-gray-200 last:border-b-0">
          First item (green and bold)
        </li>
        <li class="first:text-green-600 first:font-bold last:text-red-600 last:font-bold py-2 border-b border-gray-200 last:border-b-0">
          Second item
        </li>
        <li class="first:text-green-600 first:font-bold last:text-red-600 last:font-bold py-2 border-b border-gray-200 last:border-b-0">
          Third item
        </li>
        <li class="first:text-green-600 first:font-bold last:text-red-600 last:font-bold py-2 border-b border-gray-200 last:border-b-0">
          Last item (red and bold)
        </li>
      </ul>
      
      <!-- Even and odd children -->
      <div class="grid grid-cols-1 gap-2">
        <div class="even:bg-blue-100 odd:bg-green-100 p-4 rounded">Row 1 (odd - green)</div>
        <div class="even:bg-blue-100 odd:bg-green-100 p-4 rounded">Row 2 (even - blue)</div>
        <div class="even:bg-blue-100 odd:bg-green-100 p-4 rounded">Row 3 (odd - green)</div>
        <div class="even:bg-blue-100 odd:bg-green-100 p-4 rounded">Row 4 (even - blue)</div>
      </div>
    </div>
  </body>
</html>
```
::

### Form-specific Pseudo-classes

Special pseudo-classes for form elements:

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
    <title>Form Pseudo-classes</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <h1 class="text-2xl font-bold mb-6">Form Pseudo-classes</h1>
    
    <form class="space-y-6 max-w-md">
      <!-- Required field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Name (required)
        </label>
        <input 
          type="text" 
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:border-red-500 invalid:ring-red-500"
        >
        <p class="text-sm text-gray-500 mt-1">Leave empty to see invalid state</p>
      </div>
      
      <!-- Valid/Invalid states -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input 
          type="email" 
          placeholder="user@example.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 valid:border-green-500 invalid:border-red-500"
        >
      </div>
      
      <!-- Checkbox states -->
      <div class="flex items-center space-x-3">
        <input 
          type="checkbox" 
          id="terms" 
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:bg-blue-500"
        >
        <label for="terms" class="text-sm text-gray-700">
          I agree to the terms (checkbox changes color when checked)
        </label>
      </div>
      
      <!-- Indeterminate state -->
      <div class="flex items-center space-x-3">
        <input 
          type="checkbox" 
          id="indeterminate" 
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 indeterminate:bg-gray-300"
        >
        <label for="indeterminate" class="text-sm text-gray-700">
          Indeterminate checkbox
        </label>
        <button 
          type="button" 
          onclick="document.getElementById('indeterminate').indeterminate = true"
          class="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          Make Indeterminate
        </button>
      </div>
      
      <!-- Placeholder shown -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea 
          placeholder="Enter your message..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-shown:border-gray-200"
          rows="3"
        ></textarea>
      </div>
    </form>
  </body>
</html>
```
::

## Pseudo-elements

### Before and After Elements

Use ::before and ::after pseudo-elements for decorative content:

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
    <title>Pseudo-elements</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <h1 class="text-2xl font-bold mb-6">Pseudo-elements</h1>
    
    <div class="space-y-8">
      <!-- Quote with before/after -->
      <blockquote class="relative bg-gray-50 p-6 rounded-lg before:content-['"'] before:text-4xl before:text-gray-400 before:absolute before:top-2 before:left-4 after:content-['"'] after:text-4xl after:text-gray-400 after:absolute after:bottom-2 after:right-4">
        <p class="text-lg italic text-gray-700 px-8">
          The only way to do great work is to love what you do.
        </p>
        <footer class="text-right text-gray-500 mt-4 px-8">— Steve Jobs</footer>
      </blockquote>
      
      <!-- Decorative elements -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-blue-500 before:rounded pl-6">
          Section with decorative line
        </h2>
        
        <h3 class="text-lg font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-green-500 pb-2">
          Heading with underline decoration
        </h3>
      </div>
      
      <!-- Button with icon using pseudo-elements -->
      <button class="relative bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 pr-12 rounded-lg transition-colors before:content-['→'] before:absolute before:right-4 before:top-1/2 before:-translate-y-1/2 before:text-lg">
        Continue
      </button>
      
      <!-- Card with corner decoration -->
      <div class="relative bg-white p-6 rounded-lg shadow-md border before:content-[''] before:absolute before:top-0 before:right-0 before:w-0 before:h-0 before:border-l-[20px] before:border-l-transparent before:border-b-[20px] before:border-b-red-500 before:rounded-tr-lg">
        <h3 class="text-lg font-semibold mb-2">Featured Card</h3>
        <p class="text-gray-600">This card has a decorative corner element created with pseudo-elements.</p>
      </div>
    </div>
  </body>
</html>
```
::

### First-letter and First-line

Style the first letter or first line of text:

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
    <title>First-letter and First-line</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <h1 class="text-2xl font-bold mb-6">First-letter and First-line</h1>
    
    <div class="max-w-2xl space-y-8">
      <!-- First letter styling -->
      <article class="prose">
        <p class="first-letter:text-6xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </article>
      
      <!-- First line styling -->
      <article class="prose">
        <h2 class="text-xl font-semibold mb-4">Article with First Line Emphasis</h2>
        <p class="first-line:font-semibold first-line:text-gray-900 text-gray-700 leading-relaxed">
          This paragraph demonstrates first-line pseudo-element styling. The first line of this paragraph will appear bold and in a darker color, while the rest of the text maintains normal styling. This technique is commonly used in magazine and newspaper layouts to create visual hierarchy and draw attention to the opening of an article or paragraph.
        </p>
      </article>
      
      <!-- Combined styling -->
      <article class="prose">
        <h2 class="text-xl font-semibold mb-4">Combined First Letter and Line</h2>
        <p class="first-letter:text-4xl first-letter:font-bold first-letter:text-red-600 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-line:font-medium first-line:text-gray-900 text-gray-700 leading-relaxed">
          When you combine first-letter and first-line pseudo-elements, you can create sophisticated typographic effects. The large initial capital letter creates a drop cap effect, while the first line emphasis helps establish the reading rhythm. This combination is particularly effective for long-form content like articles, blog posts, or book chapters.
        </p>
      </article>
    </div>
  </body>
</html>
```
::

## Advanced Pseudo-class Combinations

### Group Hover Effects

Create complex interactions using group hover:

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
    <title>Group Hover Effects</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <h1 class="text-2xl font-bold mb-6">Group Hover Effects</h1>
    
    <div class="space-y-6">
      <!-- Card with group hover -->
      <div class="group bg-white p-6 rounded-lg shadow-md border cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-500 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
              <span class="text-white font-bold">A</span>
            </div>
          </div>
          <div class="flex-grow">
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Article Title
            </h3>
            <p class="text-gray-600 mt-1">
              This is a description that appears below the title.
            </p>
            <span class="inline-block mt-3 text-blue-500 group-hover:text-blue-700 font-medium transition-colors">
              Read more →
            </span>
          </div>
        </div>
        <div class="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
        </div>
      </div>
      
      <!-- Navigation with group hover -->
      <nav class="bg-gray-800 rounded-lg p-4">
        <ul class="flex space-x-1">
          <li class="group">
            <a href="#" class="flex items-center px-4 py-2 text-gray-300 group-hover:text-white group-hover:bg-gray-700 rounded-md transition-all">
              <span class="w-5 h-5 mr-2 bg-gray-500 group-hover:bg-white rounded-full transition-colors"></span>
              Home
            </a>
          </li>
          <li class="group">
            <a href="#" class="flex items-center px-4 py-2 text-gray-300 group-hover:text-white group-hover:bg-gray-700 rounded-md transition-all">
              <span class="w-5 h-5 mr-2 bg-gray-500 group-hover:bg-white rounded-full transition-colors"></span>
              About
            </a>
          </li>
          <li class="group">
            <a href="#" class="flex items-center px-4 py-2 text-gray-300 group-hover:text-white group-hover:bg-gray-700 rounded-md transition-all">
              <span class="w-5 h-5 mr-2 bg-gray-500 group-hover:bg-white rounded-full transition-colors"></span>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </body>
</html>
```
::

### Peer Interactions

Use peer modifiers for sibling element interactions:

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
    <title>Peer Interactions</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <h1 class="text-2xl font-bold mb-6">Peer Interactions</h1>
    
    <div class="max-w-md space-y-8">
      <!-- Floating label input -->
      <div class="relative">
        <input 
          type="text" 
          id="floating-input" 
          class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent"
          placeholder="Enter your name"
        >
        <label 
          for="floating-input" 
          class="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 text-xs bg-white px-1"
        >
          Your Name
        </label>
      </div>
      
      <!-- Toggle switch with peer -->
      <div class="flex items-center space-x-3">
        <input 
          type="checkbox" 
          id="toggle" 
          class="peer sr-only"
        >
        <label 
          for="toggle" 
          class="relative flex cursor-pointer items-center"
        >
          <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-blue-300"></div>
        </label>
        <span class="text-sm text-gray-700 peer-checked:text-blue-600 transition-colors">
          Enable notifications
        </span>
      </div>
      
      <!-- Radio buttons with peer styling -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-gray-900">Choose your plan:</h3>
        
        <div class="space-y-2">
          <div>
            <input 
              type="radio" 
              id="basic" 
              name="plan" 
              class="peer sr-only" 
              value="basic"
            >
            <label 
              for="basic" 
              class="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:bg-gray-50 transition-all"
            >
              <div>
                <div class="font-medium text-gray-900">Basic Plan</div>
                <div class="text-sm text-gray-500">Perfect for getting started</div>
              </div>
              <div class="text-lg font-bold text-gray-900 peer-checked:text-blue-600">$9</div>
            </label>
          </div>
          
          <div>
            <input 
              type="radio" 
              id="pro" 
              name="plan" 
              class="peer sr-only" 
              value="pro"
            >
            <label 
              for="pro" 
              class="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:bg-gray-50 transition-all"
            >
              <div>
                <div class="font-medium text-gray-900">Pro Plan</div>
                <div class="text-sm text-gray-500">For growing businesses</div>
              </div>
              <div class="text-lg font-bold text-gray-900 peer-checked:text-blue-600">$29</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```
::

## Custom Content with Arbitrary Values

### Dynamic Content in Pseudo-elements

Use arbitrary values for dynamic content:

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
    <title>Custom Pseudo-element Content</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8">
    <h1 class="text-2xl font-bold mb-6">Custom Pseudo-element Content</h1>
    
    <div class="space-y-6">
      <!-- Custom icons using content -->
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <span class="before:content-['✓'] before:text-green-500 before:mr-2 before:font-bold">
            Completed task
          </span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="before:content-['⚠'] before:text-yellow-500 before:mr-2 before:font-bold">
            Warning message
          </span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="before:content-['✗'] before:text-red-500 before:mr-2 before:font-bold">
            Error occurred
          </span>
        </div>
      </div>
      
      <!-- Counter using CSS counters simulation -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold mb-4">Numbered List with Custom Styling:</h3>
        <div class="space-y-2">
          <div class="flex items-start space-x-3">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center before:content-['1']"></span>
            <p class="text-gray-700">First step in the process</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center before:content-['2']"></span>
            <p class="text-gray-700">Second step in the process</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center before:content-['3']"></span>
            <p class="text-gray-700">Final step in the process</p>
          </div>
        </div>
      </div>
      
      <!-- Tooltip using pseudo-elements -->
      <div class="pt-8">
        <div class="inline-block">
          <button class="relative bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors group">
            Hover for tooltip
            <span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black">
              This is a tooltip message
            </span>
          </button>
        </div>
      </div>
    </div>
  </body>
</html>
```
::

## Best Practices

### Performance Considerations

- Use pseudo-classes and pseudo-elements judiciously to avoid overly complex selectors
- Prefer semantic HTML elements when possible over pseudo-element styling
- Keep pseudo-element content simple and decorative

### Accessibility

- Ensure pseudo-element content doesn't convey essential information
- Use proper ARIA labels when pseudo-elements are used for icons
- Test with screen readers to ensure pseudo-element content doesn't interfere

### Maintainability

- Document complex pseudo-class combinations
- Consider extracting repeated pseudo-element patterns into components
- Use consistent naming conventions for group and peer interactions

## What's Next?

You've learned how to use pseudo-classes and pseudo-elements to create sophisticated interactions and visual effects! In the next tutorial, we'll explore **Dark Mode Implementation**, covering how to create seamless light and dark theme experiences.
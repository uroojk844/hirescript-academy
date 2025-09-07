---
title: Accordion Menu
description: Build collapsible content panels.
navigation:
  order: 4
---

# Accordion Menu

In this tutorial, you’ll learn to create an **accordion menu** for collapsible content sections, ideal for FAQs or menus. Using plain HTML, CSS, and JavaScript, you’ll build an accordion with smooth expand/collapse behavior, styled with flexbox and CSS variables.

In this tutorial, you’ll learn:
- Structuring an accordion with HTML
- Styling with CSS transitions and variables
- Adding expand/collapse with JavaScript
- Ensuring accessibility
- Best practices for accordions

## Accordion Structure with HTML

Use `<div>` elements for accordion panels:

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
    <title>Basic Accordion</title>
    <style>
      :root {
        --panel-bg: #f8f9fa;
        --header-bg: #007bff;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .accordion {
        max-width: 600px;
        margin: 20px;
      }
      .panel {
        background: var(--panel-bg);
        margin-bottom: 10px;
      }
      .panel-header {
        background: var(--header-bg);
        color: var(--text-color);
        padding: 15px;
        cursor: pointer;
      }
      .panel-content {
        padding: 15px;
        display: none;
      }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Accordion Menu</h1>
      <div class="accordion">
        <div class="panel">
          <div class="panel-header" onclick="togglePanel(this)">Section 1</div>
          <div class="panel-content">Content for section 1.</div>
        </div>
        <div class="panel">
          <div class="panel-header" onclick="togglePanel(this)">Section 2</div>
          <div class="panel-content">Content for section 2.</div>
        </div>
      </div>
    </main>
    <script>
      function togglePanel(header) {
        const content = header.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }
    </script>
  </body>
</html>
```
::

## Accordion with Smooth Transitions

Add CSS transitions for smooth expand/collapse:

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
    <title>Smooth Accordion</title>
    <style>
      :root {
        --panel-bg: #f8f9fa;
        --header-bg: #007bff;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .accordion {
        max-width: 600px;
        margin: 20px;
      }
      .panel {
        background: var(--panel-bg);
        margin-bottom: 10px;
      }
      .panel-header {
        background: var(--header-bg);
        color: var(--text-color);
        padding: 15px;
        cursor: pointer;
      }
      .panel-content {
        max-height: 0;
        overflow: hidden;
        padding: 0 15px;
        transition: max-height 0.3s ease, padding 0.3s ease;
      }
      .panel-content.active {
        max-height: 200px; /* Adjust based on content */
        padding: 15px;
      }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Smooth Accordion</h1>
      <div class="accordion">
        <div class="panel">
          <div class="panel-header" onclick="togglePanel(this)">Section 1</div>
          <div class="panel-content">Content for section 1.</div>
        </div>
        <div class="panel">
          <div class="panel-header" onclick="togglePanel(this)">Section 2</div>
          <div class="panel-content">Content for section 2.</div>
        </div>
      </div>
    </main>
    <script>
      function togglePanel(header) {
        const content = header.nextElementSibling;
        content.classList.toggle('active');
      }
    </script>
  </body>
</html>
```
::

## Accessible Accordion with ARIA

Add ARIA for accessibility and keyboard support:

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
    <title>Accessible Accordion</title>
    <style>
      :root {
        --panel-bg: #f8f9fa;
        --header-bg: #007bff;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .accordion {
        max-width: 600px;
        margin: 20px;
      }
      .panel {
        background: var(--panel-bg);
        margin-bottom: 10px;
      }
      .panel-header {
        background: var(--header-bg);
        color: var(--text-color);
        padding: 15px;
        cursor: pointer;
      }
      .panel-header:focus { outline: 2px solid #66b0ff; }
      .panel-content {
        max-height: 0;
        overflow: hidden;
        padding: 0 15px;
        transition: max-height 0.3s ease, padding 0.3s ease;
      }
      .panel-content.active {
        max-height: 200px;
        padding: 15px;
      }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Accessible Accordion</h1>
      <div class="accordion">
        <div class="panel">
          <button class="panel-header" aria-expanded="false" aria-controls="panel1" onclick="togglePanel(this)">Section 1</button>
          <div class="panel-content" id="panel1">Content for section 1.</div>
        </div>
        <div class="panel">
          <button class="panel-header" aria-expanded="false" aria-controls="panel2" onclick="togglePanel(this)">Section 2</button>
          <div class="panel-content" id="panel2">Content for section 2.</div>
        </div>
      </div>
    </main>
    <script>
      function togglePanel(header) {
        const content = header.nextElementSibling;
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('active');
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement.classList.contains('panel-header')) {
          togglePanel(document.activeElement);
        }
      });
    </script>
  </body>
</html>
```
::

## Best Practices
- Use CSS variables for consistent styling (e.g., `--header-bg`).
- Apply `transition` for smooth expand/collapse animations.
- Ensure single-panel or multi-panel functionality based on use case.
- Add ARIA attributes (`aria-expanded`, `aria-controls`) for accessibility.
- Test edge cases: no JavaScript, large content, screen readers.
- Optimize performance by limiting transitions to necessary properties.

## What’s Next?

You’ve built an accordion menu! Explore the next component, **Image Carousel**, to create dynamic slideshows.
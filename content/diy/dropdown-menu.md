---
title: Dropdown Menu
description: Build interactive dropdown navigation.
navigation:
  order: 6
---

# Dropdown Menu

In this tutorial, you’ll learn to create a **dropdown menu** for navigation or options, triggered by click or hover. Using plain HTML, CSS, and JavaScript, you’ll build a responsive dropdown styled with flexbox and CSS variables, ensuring accessibility.

In this tutorial, you’ll learn:
- Structuring a dropdown with HTML
- Styling with CSS flexbox and variables
- Adding click-based dropdown with JavaScript
- Ensuring responsiveness and accessibility
- Best practices for dropdowns

## Dropdown Structure with HTML

Use `<ul>` and `<li>` for the menu:

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
    <title>Basic Dropdown</title>
    <style>
      :root {
        --menu-bg: #007bff;
        --text-color: #ffffff;
        --dropdown-bg: #0056b3;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .nav {
        background: var(--menu-bg);
        padding: 15px;
      }
      .nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .dropdown {
        position: relative;
      }
      .dropdown-content {
        display: none;
        position: absolute;
        background: var(--dropdown-bg);
        min-width: 150px;
        top: 100%;
        left: 0;
      }
      .dropdown:hover .dropdown-content {
        display: block;
      }
      .nav a {
        color: var(--text-color);
        text-decoration: none;
        padding: 10px;
        display: block;
      }
      .nav a:hover {
        background: #004085;
      }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <nav class="nav">
      <ul>
        <li><a href="#home">Home</a></li>
        <li class="dropdown">
          <a href="#menu">Menu</a>
          <div class="dropdown-content">
            <a href="#item1">Item 1</a>
            <a href="#item2">Item 2</a>
          </div>
        </li>
      </ul>
    </nav>
    <main class="main">
      <h1>Dropdown Menu</h1>
      <p>Hover over Menu to see dropdown.</p>
    </main>
  </body>
</html>
```
::

## Click-Based Dropdown with JavaScript

Add click-based toggle for better mobile support:

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
    <title>Click Dropdown</title>
    <style>
      :root {
        --menu-bg: #007bff;
        --text-color: #ffffff;
        --dropdown-bg: #0056b3;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .nav {
        background: var(--menu-bg);
        padding: 15px;
      }
      .nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .dropdown {
        position: relative;
      }
      .dropdown-content {
        display: none;
        position: absolute;
        background: var(--dropdown-bg);
        min-width: 150px;
        top: 100%;
        left: 0;
      }
      .dropdown-content.active {
        display: block;
      }
      .nav a {
        color: var(--text-color);
        text-decoration: none;
        padding: 10px;
        display: block;
      }
      .nav a:hover {
        background: #004085;
      }
      .dropdown-toggle {
        cursor: pointer;
      }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <nav class="nav">
      <ul>
        <li><a href="#home">Home</a></li>
        <li class="dropdown">
          <a class="dropdown-toggle" onclick="toggleDropdown(this)">Menu</a>
          <div class="dropdown-content">
            <a href="#item1">Item 1</a>
            <a href="#item2">Item 2</a>
          </div>
        </li>
      </ul>
    </nav>
    <main class="main">
      <h1>Click Dropdown</h1>
      <p>Click Menu to toggle dropdown.</p>
    </main>
    <script>
      function toggleDropdown(toggle) {
        const content = toggle.nextElementSibling;
        content.classList.toggle('active');
      }
    </script>
  </body>
</html>
```
::

## Accessible and Responsive Dropdown

Add ARIA and responsive design:

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
    <title>Accessible Dropdown</title>
    <style>
      :root {
        --menu-bg: #007bff;
        --text-color: #ffffff;
        --dropdown-bg: #0056b3;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .nav {
        background: var(--menu-bg);
        padding: 15px;
      }
      .nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .dropdown {
        position: relative;
      }
      .dropdown-content {
        display: none;
        position: absolute;
        background: var(--dropdown-bg);
        min-width: 150px;
        top: 100%;
        left: 0;
      }
      .dropdown-content.active {
        display: block;
      }
      .nav a {
        color: var(--text-color);
        text-decoration: none;
        padding: 10px;
        display: block;
      }
      .nav a:focus { outline: 2px solid #66b0ff; }
      .dropdown-toggle {
        cursor: pointer;
      }
      @media (max-width: 768px) {
        .nav ul {
          flex-direction: column;
        }
        .dropdown-content {
          position: static;
        }
      }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <nav class="nav" aria-label="Main navigation">
      <ul>
        <li><a href="#home">Home</a></li>
        <li class="dropdown">
          <button class="dropdown-toggle" aria-expanded="false" aria-controls="dropdown-menu" onclick="toggleDropdown(this)">Menu</button>
          <div class="dropdown-content" id="dropdown-menu">
            <a href="#item1" tabindex="0">Item 1</a>
            <a href="#item2" tabindex="0">Item 2</a>
          </div>
        </li>
      </ul>
    </nav>
    <main class="main">
      <h1>Accessible Dropdown</h1>
      <p>Click Menu to toggle dropdown.</p>
    </main>
    <script>
      function toggleDropdown(toggle) {
        const content = toggle.nextElementSibling;
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        content.classList.toggle('active');
        toggle.setAttribute('aria-expanded', !isExpanded);
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.dropdown-content.active').forEach(content => {
            content.classList.remove('active');
            content.previousElementSibling.setAttribute('aria-expanded', 'false');
          });
        }
      });
    </script>
  </body>
</html>
```
::

## Best Practices
- Use CSS variables for consistent theming (e.g., `--dropdown-bg`).
- Prefer click-based dropdowns for mobile compatibility.
- Ensure accessibility with `aria-expanded` and `tabindex`.
- Test edge cases: no JavaScript, small screens, nested menus.
- Optimize performance by limiting DOM changes.
- Use media queries for responsive layouts.

## What’s Next?

You’ve built a dropdown menu! Review previous components or apply these skills to your next project.
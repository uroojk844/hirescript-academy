---
title: Responsive Sidebar
description: Build a collapsible sidebar navigation.
navigation:
  order: 1
---

# Responsive Sidebar

In this tutorial, you’ll learn to create a **responsive sidebar** for navigation, commonly used in dashboards or web apps. Using plain HTML, CSS, and JavaScript, you’ll build a collapsible sidebar that adapts to mobile devices, styled with CSS variables and enhanced with JavaScript interactivity.

In this tutorial, you’ll learn:
- Structuring a sidebar with HTML
- Styling with CSS flexbox and variables
- Adding toggle functionality with JavaScript
- Making the sidebar responsive
- Ensuring accessibility and best practices

## Sidebar Structure with HTML

Use `<nav>` and `<div>` to create the sidebar and main content:

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
    <title>Basic Sidebar</title>
    <style>
      :root {
        --sidebar-bg: #343a40;
        --text-color: #ffffff;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container { display: flex; min-height: 100vh; }
      .sidebar {
        background: var(--sidebar-bg);
        color: var(--text-color);
        width: 250px;
        padding: 20px;
      }
      .main { flex: 1; background: var(--main-bg); padding: 20px; }
      .sidebar ul { list-style: none; padding: 0; }
      .sidebar li { margin: 10px 0; }
      .sidebar a { color: var(--text-color); text-decoration: none; }
      .sidebar a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="container">
      <nav class="sidebar">
        <h2>Menu</h2>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
      </nav>
      <main class="main">
        <h1>Welcome</h1>
        <p>This is the main content area.</p>
      </main>
    </div>
  </body>
</html>
```
::

## Collapsible Sidebar with JavaScript

Add a toggle button to collapse/expand the sidebar:

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
    <title>Collapsible Sidebar</title>
    <style>
      :root {
        --sidebar-bg: #343a40;
        --text-color: #ffffff;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container { display: flex; min-height: 100vh; }
      .sidebar {
        background: var(--sidebar-bg);
        color: var(--text-color);
        width: 250px;
        padding: 20px;
        transition: width 0.3s ease;
      }
      .sidebar.collapsed { width: 80px; }
      .sidebar.collapsed ul { display: none; }
      .main { flex: 1; background: var(--main-bg); padding: 20px; }
      .sidebar ul { list-style: none; padding: 0; }
      .sidebar li { margin: 10px 0; }
      .sidebar a { color: var(--text-color); text-decoration: none; }
      .toggle-btn {
        background: var(--text-color);
        color: var(--sidebar-bg);
        padding: 10px;
        border: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav class="sidebar" id="sidebar">
        <button class="toggle-btn" onclick="toggleSidebar()">Toggle</button>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
      </nav>
      <main class="main">
        <h1>Collapsible Sidebar</h1>
        <p>Click the toggle button to collapse/expand.</p>
      </main>
    </div>
    <script>
      function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
      }
    </script>
  </body>
</html>
```
::

## Responsive Sidebar Design

Make the sidebar mobile-friendly with media queries:

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
    <title>Responsive Sidebar</title>
    <style>
      :root {
        --sidebar-bg: #343a40;
        --text-color: #ffffff;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container { display: flex; min-height: 100vh; }
      .sidebar {
        background: var(--sidebar-bg);
        color: var(--text-color);
        width: 250px;
        padding: 20px;
        transition: transform 0.3s ease;
      }
      .sidebar ul { list-style: none; padding: 0; }
      .sidebar li { margin: 10px 0; }
      .sidebar a { color: var(--text-color); text-decoration: none; }
      .sidebar a:hover { text-decoration: underline; }
      .main { flex: 1; background: var(--main-bg); padding: 20px; }
      .toggle-btn {
        background: var(--text-color);
        color: var(--sidebar-bg);
        padding: 10px;
        border: none;
        cursor: pointer;
        width: 100%;
      }
      @media (max-width: 768px) {
        .sidebar {
          transform: translateX(-100%);
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 1000;
        }
        .sidebar.active {
          transform: translateX(0);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav class="sidebar" id="sidebar">
        <button class="toggle-btn" onclick="toggleSidebar()">Menu</button>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
      </nav>
      <main class="main">
        <button onclick="toggleSidebar()">Open Sidebar</button>
        <h1>Responsive Sidebar</h1>
        <p>Resize window or click to test.</p>
      </main>
    </div>
    <script>
      function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('active');
      }
    </script>
  </body>
</html>
```
::

## Accessibility Considerations

Ensure the sidebar is accessible with keyboard navigation and ARIA:

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
    <title>Accessible Sidebar</title>
    <style>
      :root {
        --sidebar-bg: #343a40;
        --text-color: #ffffff;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container { display: flex; min-height: 100vh; }
      .sidebar {
        background: var(--sidebar-bg);
        color: var(--text-color);
        width: 250px;
        padding: 20px;
        transition: width 0.3s ease;
      }
      .sidebar.collapsed { width: 80px; }
      .sidebar.collapsed ul { display: none; }
      .main { flex: 1; background: var(--main-bg); padding: 20px; }
      .sidebar ul { list-style: none; padding: 0; }
      .sidebar li { margin: 10px 0; }
      .sidebar a { color: var(--text-color); text-decoration: none; }
      .sidebar a:focus { outline: 2px solid #66b0ff; }
      .toggle-btn {
        background: var(--text-color);
        color: var(--sidebar-bg);
        padding: 10px;
        border: none;
        cursor: pointer;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <nav class="sidebar" id="sidebar" aria-label="Main navigation">
        <button class="toggle-btn" onclick="toggleSidebar()" aria-expanded="true" aria-controls="sidebar-menu">Toggle Menu</button>
        <ul id="sidebar-menu">
          <li><a href="#home" tabindex="0">Home</a></li>
          <li><a href="#about" tabindex="0">About</a></li>
          <li><a href="#services" tabindex="0">Services</a></li>
        </ul>
      </nav>
      <main class="main">
        <h1>Accessible Sidebar</h1>
        <p>Use keyboard or click to toggle.</p>
      </main>
    </div>
    <script>
      function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const button = document.querySelector('.toggle-btn');
        const isExpanded = !sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed');
        button.setAttribute('aria-expanded', !isExpanded);
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleSidebar();
      });
    </script>
  </body>
</html>
```
::

## Best Practices
- Use CSS variables for consistent theming (e.g., `--sidebar-bg`).
- Ensure smooth transitions with `transition` property.
- Make sidebars responsive with media queries.
- Add ARIA attributes (`aria-label`, `aria-expanded`) for accessibility.
- Test keyboard navigation and screen reader support.
- Handle edge cases: empty menus, small screens.
- Optimize performance by minimizing JavaScript DOM updates.

## What’s Next?

You’ve built a responsive sidebar! Explore the next component, **Sticky Navbar**, to enhance your navigation skills.
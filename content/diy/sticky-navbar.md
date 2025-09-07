---
title: Sticky Navbar
description: Create a fixed navigation bar.
navigation:
  order: 2
---

# Sticky Navbar

In this tutorial, you’ll learn to create a **sticky navbar** that remains fixed at the top of the page while scrolling, a common feature for web navigation. Using plain HTML, CSS, and JavaScript, you’ll build a responsive navbar with active link highlighting, styled with CSS variables and enhanced with interactivity.

In this tutorial, you’ll learn:
- Structuring a navbar with HTML
- Styling with CSS position and flexbox
- Adding active link functionality with JavaScript
- Making the navbar responsive
- Ensuring accessibility and best practices

## Navbar Structure with HTML

Use `<nav>` and `<ul>` to create a navigation bar:

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
    <title>Basic Navbar</title>
    <style>
      :root {
        --nav-bg: #007bff;
        --nav-text: #ffffff;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .navbar {
        background: var(--nav-bg);
        color: var(--nav-text);
        padding: 15px;
      }
      .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .navbar a {
        color: var(--nav-text);
        text-decoration: none;
        font-size: 16px;
      }
      .navbar a:hover {
        text-decoration: underline;
      }
      .main {
        background: var(--main-bg);
        padding: 20px;
        min-height: 100vh;
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
      </ul>
    </nav>
    <main class="main">
      <h1>Welcome</h1>
      <p>Scroll to see the navbar.</p>
    </main>
  </body>
</html>
```
::

## Sticky Navbar with CSS

Use `position: sticky` to keep the navbar fixed:

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
    <title>Sticky Navbar</title>
    <style>
      :root {
        --nav-bg: #007bff;
        --nav-text: #ffffff;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .navbar {
        background: var(--nav-bg);
        color: var(--nav-text);
        padding: 15px;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .navbar a {
        color: var(--nav-text);
        text-decoration: none;
        font-size: 16px;
      }
      .navbar a:hover {
        text-decoration: underline;
      }
      .main {
        background: var(--main-bg);
        padding: 20px;
        min-height: 150vh;
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
      </ul>
    </nav>
    <main class="main">
      <h1>Sticky Navbar</h1>
      <p>Scroll down to test the sticky effect.</p>
    </main>
  </body>
</html>
```
::

## Active Link Highlighting with JavaScript

Highlight the active link based on user clicks:

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
    <title>Active Link Navbar</title>
    <style>
      :root {
        --nav-bg: #007bff;
        --nav-text: #ffffff;
        --active-bg: #0056b3;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .navbar {
        background: var(--nav-bg);
        color: var(--nav-text);
        padding: 15px;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .navbar a {
        color: var(--nav-text);
        text-decoration: none;
        font-size: 16px;
        padding: 8px 12px;
      }
      .navbar a.active {
        background: var(--active-bg);
        border-radius: 4px;
      }
      .navbar a:hover {
        text-decoration: underline;
      }
      .main {
        background: var(--main-bg);
        padding: 20px;
        min-height: 150vh;
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <ul>
        <li><a href="#home" class="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
      </ul>
    </nav>
    <main class="main">
      <h1>Active Link Navbar</h1>
      <p>Click links to highlight them.</p>
    </main>
    <script>
      const links = document.querySelectorAll('.navbar a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    </script>
  </body>
</html>
```
::

## Responsive Navbar Design

Make the navbar mobile-friendly with a hamburger menu:

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
    <title>Responsive Navbar</title>
    <style>
      :root {
        --nav-bg: #007bff;
        --nav-text: #ffffff;
        --active-bg: #0056b3;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .navbar {
        background: var(--nav-bg);
        color: var(--nav-text);
        padding: 15px;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .navbar a {
        color: var(--nav-text);
        text-decoration: none;
        font-size: 16px;
        padding: 8px 12px;
      }
      .navbar a.active {
        background: var(--active-bg);
        border-radius: 4px;
      }
      .main {
        background: var(--main-bg);
        padding: 20px;
        min-height: 150vh;
      }
      .hamburger {
        display: none;
        background: none;
        border: none;
        color: var(--nav-text);
        font-size: 20px;
        cursor: pointer;
      }
      @media (max-width: 768px) {
        .navbar ul {
          display: none;
          flex-direction: column;
          background: var(--nav-bg);
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
        }
        .navbar ul.active {
          display: flex;
        }
        .hamburger {
          display: block;
        }
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <button class="hamburger" onclick="toggleMenu()">☰</button>
      <ul id="nav-menu">
        <li><a href="#home" class="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
      </ul>
    </nav>
    <main class="main">
      <h1>Responsive Navbar</h1>
      <p>Resize window or click hamburger to test.</p>
    </main>
    <script>
      function toggleMenu() {
        document.getElementById('nav-menu').classList.toggle('active');
      }
      const links = document.querySelectorAll('.navbar a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          toggleMenu(); // Close menu on mobile after click
        });
      });
    </script>
  </body>
</html>
```
::

## Accessibility Considerations

Ensure the navbar is accessible with keyboard navigation and ARIA:

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
    <title>Accessible Navbar</title>
    <style>
      :root {
        --nav-bg: #007bff;
        --nav-text: #ffffff;
        --active-bg: #0056b3;
        --main-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .navbar {
        background: var(--nav-bg);
        color: var(--nav-text);
        padding: 15px;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
      }
      .navbar a {
        color: var(--nav-text);
        text-decoration: none;
        font-size: 16px;
        padding: 8px 12px;
      }
      .navbar a.active {
        background: var(--active-bg);
        border-radius: 4px;
      }
      .navbar a:focus {
        outline: 2px solid #66b0ff;
      }
      .main {
        background: var(--main-bg);
        padding: 20px;
        min-height: 150vh;
      }
      .hamburger {
        display: none;
        background: none;
        border: none;
        color: var(--nav-text);
        font-size: 20px;
        cursor: pointer;
      }
      @media (max-width: 768px) {
        .navbar ul {
          display: none;
          flex-direction: column;
          background: var(--nav-bg);
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
        }
        .navbar ul.active {
          display: flex;
        }
        .hamburger {
          display: block;
        }
      }
    </style>
  </head>
  <body>
    <nav class="navbar" aria-label="Main navigation">
      <button class="hamburger" onclick="toggleMenu()" aria-expanded="false" aria-controls="nav-menu">☰</button>
      <ul id="nav-menu">
        <li><a href="#home" class="active" tabindex="0">Home</a></li>
        <li><a href="#about" tabindex="0">About</a></li>
        <li><a href="#services" tabindex="0">Services</a></li>
      </ul>
    </nav>
    <main class="main">
      <h1>Accessible Navbar</h1>
      <p>Use keyboard or hamburger to navigate.</p>
    </main>
    <script>
      function toggleMenu() {
        const menu = document.getElementById('nav-menu');
        const button = document.querySelector('.hamburger');
        const isExpanded = menu.classList.contains('active');
        menu.classList.toggle('active');
        button.setAttribute('aria-expanded', !isExpanded);
      }
      const links = document.querySelectorAll('.navbar a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          toggleMenu(); // Close menu on mobile
        });
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu();
      });
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `position: sticky` for smooth fixed behavior.
- Leverage CSS variables for consistent theming (e.g., `--nav-bg`).
- Ensure responsive design with media queries and hamburger menus.
- Add ARIA attributes (`aria-label`, `aria-expanded`) for accessibility.
- Test keyboard navigation and screen reader compatibility.
- Handle edge cases: small screens, no JavaScript, long menus.
- Optimize performance by minimizing DOM updates.

## What’s Next?

You’ve built a sticky navbar! Explore the next component, **Modal Dialog Box**, to create interactive popups.
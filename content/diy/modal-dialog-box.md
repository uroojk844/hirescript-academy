---
title: Modal Dialog Box
description: Create interactive popup modals.
navigation:
  order: 3
---

# Modal Dialog Box

In this tutorial, you’ll learn to create a **modal dialog box** (popup) for alerts, forms, or content, a common UI component for interactive web apps. Using plain HTML, CSS, and JavaScript, you’ll build a modal with open/close functionality, styled with flexbox and CSS variables, and ensure accessibility.

In this tutorial, you’ll learn:
- Structuring a modal with HTML
- Styling with CSS flexbox and variables
- Adding open/close functionality with JavaScript
- Ensuring accessibility with ARIA
- Best practices for modals

## Modal Structure with HTML

Create a modal with a container and overlay:

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
    <title>Basic Modal</title>
    <style>
      :root {
        --modal-bg: #ffffff;
        --overlay-bg: rgba(0, 0, 0, 0.5);
        --text-color: #333333;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--overlay-bg);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background: var(--modal-bg);
        color: var(--text-color);
        padding: 20px;
        border-radius: 5px;
        max-width: 400px;
        width: 90%;
      }
      button {
        background: #007bff;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      button:hover { background: #0056b3; }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Modal Example</h1>
      <button onclick="openModal()">Open Modal</button>
    </main>
    <div class="modal" id="modal">
      <div class="modal-content">
        <h2>Modal Title</h2>
        <p>This is a simple modal.</p>
        <button onclick="closeModal()">Close</button>
      </div>
    </div>
    <script>
      function openModal() {
        document.getElementById('modal').style.display = 'flex';
      }
      function closeModal() {
        document.getElementById('modal').style.display = 'none';
      }
    </script>
  </body>
</html>
```
::

## Modal with Form and Validation

Add a form with validation inside the modal:

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
    <title>Modal with Form</title>
    <style>
      :root {
        --modal-bg: #ffffff;
        --overlay-bg: rgba(0, 0, 0, 0.5);
        --text-color: #333333;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--overlay-bg);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background: var(--modal-bg);
        color: var(--text-color);
        padding: 20px;
        border-radius: 5px;
        max-width: 400px;
        width: 90%;
      }
      .form-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
      input { padding: 10px; font-size: 16px; border: 1px solid #ccc; }
      input:invalid { border-color: red; }
      input:valid { border-color: green; }
      .error { color: red; font-size: 14px; }
      button {
        background: #007bff;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      button:hover { background: #0056b3; }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Modal with Form</h1>
      <button onclick="openModal()">Open Modal</button>
    </main>
    <div class="modal" id="modal">
      <div class="modal-content">
        <h2>Login</h2>
        <form id="form">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" required placeholder="Enter email">
            <span id="email-error" class="error"></span>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onclick="closeModal()">Close</button>
        </form>
      </div>
    </div>
    <script>
      function openModal() {
        document.getElementById('modal').style.display = 'flex';
      }
      function closeModal() {
        document.getElementById('modal').style.display = 'none';
      }
      document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        document.getElementById('email-error').innerText = email.includes('@') ? 'Submitted!' : 'Invalid email';
      });
    </script>
  </body>
</html>
```
::

## Accessible Modal with ARIA

Ensure accessibility with ARIA and keyboard support:

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
    <title>Accessible Modal</title>
    <style>
      :root {
        --modal-bg: #ffffff;
        --overlay-bg: rgba(0, 0, 0, 0.5);
        --text-color: #333333;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--overlay-bg);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background: var(--modal-bg);
        color: var(--text-color);
        padding: 20px;
        border-radius: 5px;
        max-width: 400px;
        width: 90%;
      }
      button {
        background: #007bff;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      button:focus { outline: 2px solid #66b0ff; }
      button:hover { background: #0056b3; }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Accessible Modal</h1>
      <button onclick="openModal()" id="open-btn">Open Modal</button>
    </main>
    <div class="modal" id="modal" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
      <div class="modal-content">
        <h2 id="modal-title">Modal Title</h2>
        <p>This is an accessible modal.</p>
        <button onclick="closeModal()" id="close-btn">Close</button>
      </div>
    </div>
    <script>
      const modal = document.getElementById('modal');
      const openBtn = document.getElementById('open-btn');
      const closeBtn = document.getElementById('close-btn');
      function openModal() {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
      }
      function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        openBtn.focus();
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
      });
    </script>
  </body>
</html>
```
::

## Best Practices
- Use CSS variables for consistent theming (e.g., `--modal-bg`).
- Center modals with `flex` for responsive layouts.
- Ensure accessibility with `role="dialog"`, `aria-labelledby`, and keyboard support.
- Close modals on overlay click or Escape key.
- Test edge cases: no JavaScript, small screens, screen readers.
- Keep modals lightweight to avoid performance issues.

## What’s Next?

You’ve built a modal dialog box! Explore the next component, **Accordion Menu**, to create collapsible content.
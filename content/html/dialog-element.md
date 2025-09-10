---
title: HTML Dialog Element
description: Create accessible modal dialogs.
navigation:
  order: 15
---

# HTML Dialog Element

In this tutorial, you’ll learn to use the **HTML `<dialog>` element** to create accessible modal dialogs for pop-ups, alerts, or forms. Using plain HTML, CSS, and JavaScript, you’ll build dynamic, styled dialogs with CSS variables, gradients, and interactivity, enhancing user interactions in modern web designs.

In this tutorial, you’ll learn:
- Setting up a `<dialog>` element
- Styling dialogs with CSS
- Controlling dialogs with JavaScript
- Ensuring accessibility
- Best practices for dialogs

## Basic Dialog Setup

Create a simple modal dialog:

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
    <title>Basic Dialog</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --dialog-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
      }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      dialog {
        background: var(--dialog-bg);
        border: none;
        border-radius: 5px;
        padding: 20px;
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Dialog Example</h1>
      <button onclick="document.getElementById('myDialog').showModal()">Open Dialog</button>
      <dialog id="myDialog">
        <h2>Modal Dialog</h2>
        <p>This is a simple dialog.</p>
        <button onclick="document.getElementById('myDialog').close()">Close</button>
      </dialog>
    </div>
  </body>
</html>
```
::

- **Explanation**: The `<dialog>` element is opened with `showModal()` and closed with `close()`. The `::backdrop` pseudo-element styles the overlay. Integrates with `css-gradients.md` and `flexbox-layout.md`.

## Styled Dialog with Form

Style a dialog with a form for interactivity:

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
    <title>Styled Dialog</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --dialog-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
      }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      dialog {
        background: var(--dialog-bg);
        border: none;
        border-radius: 5px;
        padding: 20px;
        width: 300px;
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.7);
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Styled Dialog</h1>
      <button onclick="document.getElementById('myDialog').showModal()">Open Form</button>
      <dialog id="myDialog">
        <h2>Login Form</h2>
        <form>
          <input type="text" placeholder="Username" aria-label="Username">
          <input type="password" placeholder="Password" aria-label="Password">
          <button type="submit" onclick="document.getElementById('myDialog').close()">Submit</button>
          <button type="button" onclick="document.getElementById('myDialog').close()">Cancel</button>
        </form>
      </dialog>
    </div>
  </body>
</html>
```
::

- **Explanation**: Combines `<dialog>` with a form, styled with flexbox and `:hover` from `pseudo-classes-reference.md`, and uses `aria-label` for accessibility.

## Dynamic Dialog with JavaScript

Dynamically control dialog content:

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
    <title>Dynamic Dialog</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --dialog-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
      }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      dialog {
        background: var(--dialog-bg);
        border: none;
        border-radius: 5px;
        padding: 20px;
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.7);
      }
      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Dynamic Dialog</h1>
      <button onclick="showDialog('Welcome!')">Show Welcome</button>
      <button onclick="showDialog('Alert!')">Show Alert</button>
      <dialog id="myDialog">
        <h2 id="dialogTitle"></h2>
        <p id="dialogContent"></p>
        <button onclick="document.getElementById('myDialog').close()">Close</button>
      </dialog>
    </div>
    <script>
      function showDialog(title) {
        const dialog = document.getElementById('myDialog');
        document.getElementById('dialogTitle').textContent = title;
        document.getElementById('dialogContent').textContent = `This is a dynamic ${title.toLowerCase()} message.`;
        dialog.showModal();
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript dynamically updates dialog content, using `forEach`-like logic from `array-methods-reference.md`. Avoids overlap with `modal-dialog-box.md` by focusing on native `<dialog>`.

## Accessibility Considerations

Ensure dialogs are accessible:

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
    <title>Accessible Dialog</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --dialog-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
      }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      dialog {
        background: var(--dialog-bg);
        border: none;
        border-radius: 5px;
        padding: 20px;
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.7);
      }
      button:focus {
        outline: 2px solid #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Accessible Dialog</h1>
      <button onclick="document.getElementById('myDialog').showModal()" aria-label="Open dialog">Open Dialog</button>
      <dialog id="myDialog" aria-labelledby="dialogTitle">
        <h2 id="dialogTitle">Accessible Modal</h2>
        <p>This dialog is keyboard-accessible.</p>
        <button onclick="document.getElementById('myDialog').close()" autofocus>Close</button>
      </dialog>
    </div>
  </body>
</html>
```
::

- **Explanation**: Uses `aria-labelledby` and `autofocus` for accessibility, with `:focus` from `pseudo-classes-reference.md`.

## Best Practices
- Use `showModal()` for modal dialogs, `show()` for non-modal.
- Style `::backdrop` for visual clarity.
- Ensure keyboard navigation with `autofocus` and `tabindex`.
- Test accessibility with screen readers (e.g., NVDA, VoiceOver).
- Handle edge cases: no JavaScript, mobile devices, dialog stacking.
- Use CSS variables for theming (e.g., `--dialog-bg`).
- Avoid overlap with custom modals in `modal-dialog-box.md` by using native `<dialog>`.

## What’s Next?

You’ve mastered the `<dialog>` element! Apply it to `modal-dialog-box.md` or explore `<fieldset>` for form grouping.
---
title: HTML Fieldset Element
description: Group form inputs effectively.
navigation:
  order: 16
---

# HTML Fieldset Element

In this tutorial, you’ll learn to use the **HTML `<fieldset>` element** to group related form inputs, improving form structure and accessibility. Using plain HTML, CSS, and JavaScript, you’ll create styled, interactive fieldsets with CSS variables, gradients, and dynamic behavior.

In this tutorial, you’ll learn:
- Setting up `<fieldset>` with `<legend>`
- Styling fieldsets with CSS
- Adding interactivity with JavaScript
- Ensuring accessibility
- Best practices for fieldsets

## Basic Fieldset Setup

Group form inputs with `<fieldset>` and `<legend>`:

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
    <title>Basic Fieldset</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --fieldset-bg: #f8f9fa;
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
      fieldset {
        background: var(--fieldset-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
      legend {
        background: var(--primary-color);
        color: var(--text-color);
        padding: 5px 10px;
        border-radius: 3px;
      }
      input {
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Fieldset Example</h1>
      <form>
        <fieldset>
          <legend>User Info</legend>
          <input type="text" placeholder="Name" aria-label="Name">
          <input type="email" placeholder="Email" aria-label="Email">
        </fieldset>
      </form>
    </div>
  </body>
</html>
```
::

- **Explanation**: `<fieldset>` groups inputs, with `<legend>` providing a title. Uses gradients (`css-gradients.md`) and flexbox (`flexbox-layout.md`).

## Styled Fieldset with Radio Buttons

Style a fieldset with radio buttons:

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
    <title>Styled Fieldset</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --fieldset-bg: #f8f9fa;
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
      fieldset {
        background: var(--fieldset-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
      legend {
        background: var(--primary-color);
        color: var(--text-color);
        padding: 5px 10px;
        border-radius: 3px;
      }
      input[type="radio"] {
        margin: 5px;
      }
      input[type="radio"]:checked + label {
        color: #ff6b6b;
        font-weight: bold;
      }
      label {
        margin-left: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Styled Fieldset</h1>
      <form>
        <fieldset>
          <legend>Preferences</legend>
          <input type="radio" id="option1" name="choice" checked>
          <label for="option1">Option 1</label><br>
          <input type="radio" id="option2" name="choice">
          <label for="option2">Option 2</label>
        </fieldset>
      </form>
    </div>
  </body>
</html>
```
::

- **Explanation**: Uses `:checked` from `pseudo-classes-reference.md` to style selected radio buttons, integrating with `advanced-form-validation.md`.

## Dynamic Fieldset with JavaScript

Dynamically enable/disable fieldsets:

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
    <title>Dynamic Fieldset</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --fieldset-bg: #f8f9fa;
        --disabled-bg: #e9ecef;
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
      fieldset {
        background: var(--fieldset-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
      fieldset:disabled {
        background: var(--disabled-bg);
        opacity: 0.7;
      }
      legend {
        background: var(--primary-color);
        color: var(--text-color);
        padding: 5px 10px;
        border-radius: 3px;
      }
      input {
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Dynamic Fieldset</h1>
      <button onclick="toggleFieldset()">Toggle Fieldset</button>
      <form>
        <fieldset id="myFieldset">
          <legend>User Info</legend>
          <input type="text" placeholder="Name" aria-label="Name">
          <input type="email" placeholder="Email" aria-label="Email">
        </fieldset>
      </form>
    </div>
    <script>
      function toggleFieldset() {
        const fieldset = document.getElementById('myFieldset');
        fieldset.disabled = !fieldset.disabled;
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript toggles the `disabled` attribute, with `:disabled` styling from `pseudo-classes-reference.md`.

## Accessibility Considerations

Ensure fieldsets are accessible:

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
    <title>Accessible Fieldset</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --fieldset-bg: #f8f9fa;
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
      fieldset {
        background: var(--fieldset-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
      legend {
        background: var(--primary-color);
        color: var(--text-color);
        padding: 5px 10px;
        border-radius: 3px;
      }
      input {
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      input:focus {
        outline: 2px solid #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Accessible Fieldset</h1>
      <form>
        <fieldset>
          <legend id="legend">User Info</legend>
          <input type="text" placeholder="Name" aria-labelledby="legend">
          <input type="email" placeholder="Email" aria-labelledby="legend">
        </fieldset>
      </form>
    </div>
  </body>
</html>
```
::

- **Explanation**: Uses `aria-labelledby` to associate inputs with `<legend>`, with `:focus` from `pseudo-classes-reference.md`.

## Best Practices
- Use `<legend>` for clear group titles.
- Style `<fieldset>` to visually distinguish groups.
- Ensure accessibility with `aria-labelledby` and keyboard navigation.
- Test with screen readers (e.g., NVDA, VoiceOver).
- Handle edge cases: disabled fieldsets, nested fieldsets, no CSS.
- Use CSS variables for theming (e.g., `--fieldset-bg`).
- Integrate with `advanced-form-validation.md` for form validation.

## What’s Next?

You’ve mastered `<fieldset>`! Apply it to forms in `advanced-form-validation.md` or explore the `popover` attribute for tooltips.
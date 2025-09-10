---
title: HTML Text Formatting
description: Style text with formatting tags.
navigation:
  order: 18
---

# HTML Text Formatting

In this tutorial, you’ll learn to use **HTML text formatting tags** like `<u>`, `<i>`, `<b>`, `<strong>`, `<em>`, `<sup>`, `<sub>`, `<mark>`, `<small>`, `<del>`, and `<ins>` to style and emphasize text. Using plain HTML, CSS, and JavaScript, you’ll create visually appealing, interactive text layouts with CSS variables, gradients, and dynamic behavior, ideal for modern web designs.

In this tutorial, you’ll learn:
- Understanding text formatting tags
- Styling tags with CSS
- Adding interactivity with JavaScript
- Ensuring accessibility
- Best practices for text formatting

## Basic Text Formatting Tags

Use HTML tags to format text:

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
    <title>Basic Text Formatting</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --bg-color: #f8f9fa;
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
      p {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Text Formatting Tags</h1>
      <p>
        This is <u>underlined</u>, <i>italic</i>, <b>bold</b>, <strong>strongly emphasized</strong>,
        <em>emphasized</em>, <sup>superscript</sup>, <sub>subscript</sub>, <mark>highlighted</mark>,
        <small>smaller text</small>, <del>deleted</del>, and <ins>inserted</ins> text.
      </p>
    </div>
  </body>
</html>
```
::

- **Explanation**: Tags like `<u>`, `<i>`, `<b>` are presentational, while `<strong>`, `<em>` are semantic. Uses flexbox (`flexbox-layout`) and gradients (`css-gradients`).

## Styled Formatting Tags

Enhance tags with CSS for visual appeal:

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
    <title>Styled Text Formatting</title>
    <style>
      :root {
        --primary-color: #007bff;
        --highlight-color: #ff6b6b;
        --text-color: #ffffff;
        --bg-color: #f8f9fa;
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
      p {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
      u { text-decoration-color: var(--highlight-color); }
      i { color: #28a745; font-style: italic; }
      b, strong { color: var(--primary-color); font-weight: bold; }
      em { color: #28a745; font-style: italic; }
      sup, sub { color: #6c757d; }
      mark { background: var(--highlight-color); color: var(--text-color); }
      small { font-size: 0.8em; color: #6c757d; }
      del { color: #dc3545; }
      ins { text-decoration-color: var(--primary-color); }
      mark:hover { background: #e04b4b; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Styled Formatting Tags</h1>
      <p>
        This is <u>underlined</u>, <i>italic</i>, <b>bold</b>, <strong>strongly emphasized</strong>,
        <em>emphasized</em>, <sup>superscript</sup>, <sub>subscript</sub>, <mark>highlighted</mark>,
        <small>smaller text</small>, <del>deleted</del>, and <ins>inserted</ins> text.
      </p>
    </div>
  </body>
</html>
```
::

- **Explanation**: Customizes each tag’s appearance with CSS variables and `:hover` from `pseudo-classes-reference` for interactive effects.

## Dynamic Text Formatting with JavaScript

Dynamically apply formatting:

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
    <title>Dynamic Text Formatting</title>
    <style>
      :root {
        --primary-color: #007bff;
        --highlight-color: #ff6b6b;
        --text-color: #ffffff;
        --bg-color: #f8f9fa;
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
      p {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
      .highlight { background: var(--highlight-color); color: var(--text-color); }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:hover { background: #0056b3; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Dynamic Text Formatting</h1>
      <button onclick="toggleHighlight()">Toggle Highlight</button>
      <p>
        <span id="text1">This is sample text</span> that can be
        <span id="text2">dynamically formatted</span> with JavaScript.
      </p>
    </div>
    <script>
      function toggleHighlight() {
        const spans = document.querySelectorAll('p span');
        spans.forEach(span => {
          span.classList.toggle('highlight');
        });
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript toggles a `highlight` class (similar to `<mark>`), using `forEach` from `array-methods-reference` for dynamic styling.

## Accessibility Considerations

Ensure formatted text is accessible:

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
    <title>Accessible Text Formatting</title>
    <style>
      :root {
        --primary-color: #007bff;
        --highlight-color: #ff6b6b;
        --text-color: #ffffff;
        --bg-color: #f8f9fa;
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
      p {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
      strong, em { color: var(--primary-color); }
      mark { background: var(--highlight-color); color: var(--text-color); }
      strong:focus, em:focus, mark:focus { outline: 2px solid #ff6b6b; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Accessible Text Formatting</h1>
      <p>
        This is <strong role="strong" tabindex="0">strongly emphasized</strong>,
        <em role="emphasis" tabindex="0">emphasized</em>, and
        <mark role="mark" tabindex="0">highlighted</mark> text.
      </p>
    </div>
  </body>
</html>
```
::

- **Explanation**: Adds `role` attributes and `tabindex="0"` for screen reader and keyboard support, with `:focus` from `pseudo-classes-reference`.

## Best Practices
- Use semantic tags (`<strong>`, `<em>`) over presentational tags (`<b>`, `<i>`) for accessibility.
- Style tags with CSS for consistency, using variables (`css-variables-theming`).
- Ensure sufficient color contrast for `<mark>`, `<del>`, etc.
- Test with screen readers (e.g., NVDA, VoiceOver) to verify semantic tags.
- Handle edge cases: no CSS, small screens, text scaling.
- Use JavaScript sparingly to enhance, not replace, native formatting.
- Avoid overusing formatting tags to maintain readability.

## What’s Next?

You’ve mastered text formatting tags! Apply them to `responsive-sidebar` for styled labels or explore `<dialog>` in `dialog-element` for modals.
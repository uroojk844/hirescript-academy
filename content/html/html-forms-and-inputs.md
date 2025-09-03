---
title: HTML Forms and Inputs
description: Learn to create interactive forms to collect user input in HTML.
navigation:
  order: 4
---

# HTML Forms and Input Elements

In this fourth tutorial, you'll learn how to create **forms** in HTML to collect user input, such as text, selections, and button clicks. Forms are essential for interactive websites, enabling features like sign-ups, searches, and surveys.

In this tutorial, you’ll learn:
- How to create forms using the `<form>` tag
- Common input elements like text fields and buttons
- Key attributes for form accessibility and functionality

## Creating a Form with `<form>`

The `<form>` tag is used to create a form that collects user input. It typically contains input elements like text fields, checkboxes, and buttons. The `action` attribute specifies where the form data is sent, and the `method` attribute defines how it’s sent (usually `GET` or `POST`).

Here’s a simple form example:

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
    <title>Basic Form</title>
  </head>
  <body>
    <h1>Contact Us</h1>
    <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```
::

### Explanation
- `<form action="/submit" method="POST">`: Defines the form, with data sent to `/submit` using the POST method.
- `<label>`: Associates a label with an input for accessibility (linked via the `for` attribute matching the input’s `id`).
- `<input type="text">`: Creates a text input field.
- `<input type="submit">`: Creates a submit button.

## Common Input Elements

The `<input>` tag is versatile, with its behavior determined by the `type` attribute. Here are some common types:
- `text`: Single-line text input
- `email`: Input for email addresses
- `password`: Masked input for passwords
- `checkbox`: Checkable box for multiple selections
- `radio`: Single-selection option
- `submit`: Button to submit the form

Example with multiple input types:

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
    <title>Advanced Form</title>
  </head>
  <body>
    <h1>Sign Up</h1>
    <form action="/signup" method="POST">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <br />
      <label>Preferences:</label>
      <input type="checkbox" id="news" name="news" />
      <label for="news">Subscribe to newsletter</label>
      <br />
      <input type="submit" value="Sign Up" />
    </form>
  </body>
</html>
```
::

### Key Attributes
- `id` and `name`: Identify the input for scripting and form submission.
- `required`: Ensures the field must be filled before submission.
- `placeholder`: Displays hint text in the input field.
- `value`: Sets the default value or button text.

## Adding Select Menus and Textareas

- `<select>` and `<option>`: Create dropdown menus.
- `<textarea>`: Allows multi-line text input.

Example with a dropdown and textarea:

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
    <title>Form with Dropdown</title>
  </head>
  <body>
    <h1>Feedback Form</h1>
    <form action="/feedback" method="POST">
      <label for="topic">Topic:</label>
      <select id="topic" name="topic">
        <option value="general">General</option>
        <option value="support">Support</option>
        <option value="billing">Billing</option>
      </select>
      <br />
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="4" cols="50"></textarea>
      <br />
      <input type="submit" value="Send Feedback" />
    </form>
  </body>
</html>
```
::

## Best Practices
- Always use `<label>` with `for` attributes to improve accessibility.
- Add the `required` attribute for essential fields.
- Use `placeholder` to guide users on expected input.
- Test forms to ensure they are user-friendly and accessible.

## What’s Next?

You’ve learned how to create forms and input elements in HTML! In the next tutorial, we’ll cover **Semantic HTML and Accessibility**, exploring tags like `<header>`, `<main>`, and `<article>` to improve structure and accessibility.
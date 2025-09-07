---
title: HTML Advanced Forms
description: Explore advanced form elements and validation in HTML.
navigation:
  order: 10
---

# HTML Advanced Forms

In this tenth tutorial, you'll learn advanced form features in HTML, including grouping inputs with `<fieldset>` and `<legend>`, and using validation attributes to enhance user experience.

In this tutorial, you’ll learn:
- How to use `<fieldset>` and `<legend>` for form organization
- Advanced input attributes for validation
- Creating accessible, user-friendly forms

## Using `<fieldset>` and `<legend>`

The `<fieldset>` tag groups related form elements, and `<legend>` provides a caption for the group, improving accessibility and structure.

Example with `<fieldset>` and `<legend>`:

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
    <title>Fieldset Example</title>
  </head>
  <body>
    <h1>Registration Form</h1>
    <form action="/submit" method="POST">
      <fieldset>
        <legend>Personal Information</legend>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
      </fieldset>
      <input type="submit" value="Register" />
    </form>
  </body>
</html>
```
::

## Form Validation Attributes

HTML5 provides attributes to validate user input without JavaScript:
- `required`: Ensures the field isn’t empty.
- `minlength` and `maxlength`: Set character limits for text inputs.
- `pattern`: Specifies a regular expression for input format.
- `min` and `max`: Set numeric ranges for number inputs.

Example with validation:

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
    <title>Form Validation</title>
  </head>
  <body>
    <h1>Secure Form</h1>
    <form action="/submit" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required minlength="3" maxlength="15" />
      <label for="age">Age:</label>
      <input type="number" id="age" name="age" min="18" max="100" />
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```
::

## Advanced Form Example

Combine `<fieldset>`, `<legend>`, and validation for a robust form:

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
    <h1>Survey Form</h1>
    <form action="/survey" method="POST">
      <fieldset>
        <legend>User Details</legend>
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required />
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" />
      </fieldset>
      <fieldset>
        <legend>Feedback</legend>
        <label for="rating">Rating:</label>
        <select id="rating" name="rating" required>
          <option value="">Select</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
        </select>
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```
::

## Best Practices
- Use `<fieldset>` and `<legend>` to group related inputs for clarity.
- Apply validation attributes to guide users and prevent errors.
- Ensure forms are accessible with proper `<label>` and `aria-*` attributes.

## What’s Next?

You’ve learned advanced form techniques! In the next tutorial, we’ll explore **HTML Embedded Content**, covering `<embed>` and `<object>` for additional media types.
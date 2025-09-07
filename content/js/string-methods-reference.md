---
title: String Methods Reference
description: Comprehensive guide to JavaScript string methods.
navigation:
  order: 18
---

# String Methods Reference

In this tutorial, you’ll explore **JavaScript string methods** for processing and manipulating text, crucial for tasks like form validation and content display in web apps like Nuxt. Each method includes a detailed description, syntax, and practical examples with HTML and CSS integration.

In this tutorial, you’ll learn:
- Formatting text (`toUpperCase`, `trim`, etc.)
- Searching and extracting strings
- Replacing text dynamically
- Framework-relevant text handling

## 1. `toUpperCase` and `toLowerCase`
- **Description**: Convert a string to uppercase or lowercase.
- **Usage**: Standardize text for display or validation, e.g., in form inputs.
- **Syntax**: `string.toUpperCase()`; `string.toLowerCase()`

Example: Format user input.

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
    <title>Case Conversion</title>
    <style>
      input { padding: 10px; width: 200px; }
      p { color: navy; }
    </style>
  </head>
  <body>
    <h1>Format Input</h1>
    <input id="input" type="text" placeholder="Type here">
    <p id="output"></p>
    <script>
      document.getElementById('input').addEventListener('input', (e) => {
        let text = e.target.value;
        document.getElementById('output').innerText = text.toUpperCase();
      });
    </script>
  </body>
</html>
```
::

## 2. `slice`, `substring`, `substr`
- **Description**: Extract parts of a string. `slice` and `substring` are similar; `substr` is older and less common.
- **Usage**: Extract usernames, truncate text for previews.
- **Syntax**: `string.slice(start, end)`; `string.substring(start, end)`; `string.substr(start, length)`

Example: Extract a substring.

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
    <title>String Extraction</title>
    <style>
      p { font-size: 16px; }
    </style>
  </head>
  <body>
    <h1>Extract Text</h1>
    <p id="output"></p>
    <script>
      let text = 'Hello, JavaScript!';
      let extracted = text.slice(7, 16);
      document.getElementById('output').innerText = `Extracted: ${extracted}`;
    </script>
  </body>
</html>
```
::

## 3. `replace` and `replaceAll`
- **Description**: `replace` replaces the first occurrence; `replaceAll` replaces all occurrences of a substring.
- **Usage**: Update text, e.g., in search-and-replace features or content editing.
- **Syntax**: `string.replace(search, replacement)`; `string.replaceAll(search, replacement)`

Example: Replace text.

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
    <title>Replace Text</title>
    <style>
      p { color: purple; }
    </style>
  </head>
  <body>
    <h1>Update Text</h1>
    <p id="output"></p>
    <script>
      let text = 'I love JS! JS is great!';
      let updated = text.replaceAll('JS', 'JavaScript');
      document.getElementById('output').innerText = updated;
    </script>
  </body>
</html>
```
::

## 4. `trim`
- **Description**: Removes leading and trailing whitespace.
- **Usage**: Clean form inputs, e.g., removing extra spaces in usernames.
- **Syntax**: `string.trim()`

Example: Clean input.

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
    <title>Trim Method</title>
    <style>
      input { padding: 10px; }
    </style>
  </head>
  <body>
    <h1>Clean Input</h1>
    <input id="input" type="text" placeholder="Type with spaces">
    <p id="output"></p>
    <script>
      document.getElementById('input').addEventListener('input', (e) => {
        let text = e.target.value;
        document.getElementById('output').innerText = `Cleaned: ${text.trim()}`;
      });
    </script>
  </body>
</html>
```
::

## 5. `includes`, `startsWith`, `endsWith`
- **Description**: `includes` checks for a substring; `startsWith` and `endsWith` check the string’s start/end.
- **Usage**: Validate or search text, e.g., checking file extensions.
- **Syntax**: `string.includes(substring)`; `string.startsWith(substring)`; `string.endsWith(substring)`

Example: Search text.

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
    <title>Search Text</title>
  </head>
  <body>
    <h1>Text Checks</h1>
    <p id="output"></p>
    <script>
      let text = 'Hello, World!';
      let hasWorld = text.includes('World');
      let startsHello = text.startsWith('Hello');
      document.getElementById('output').innerText = `Has World: ${hasWorld}, Starts with Hello: ${startsHello}`;
    </script>
  </body>
</html>
```
::

## 6. `split`, `charAt`, `indexOf`, `lastIndexOf`
- **Description**:
  - `split`: Splits a string into an array.
  - `charAt`: Returns a character at an index.
  - `indexOf`, `lastIndexOf`: Find the first/last occurrence of a substring.
- **Usage**: Parse text, find positions in strings.
- **Syntax**: `string.split(separator)`; `string.charAt(index)`; `string.indexOf(substring)`

Example: Parse and search.

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
    <title>Parse Text</title>
    <style>
      ul { list-style: none; }
    </style>
  </head>
  <body>
    <h1>Text Parsing</h1>
    <ul id="output"></ul>
    <script>
      let text = 'Apple,Banana,Orange';
      let fruits = text.split(',');
      let firstChar = text.charAt(0);
      let bananaIndex = text.indexOf('Banana');
      document.getElementById('output').innerHTML = fruits.map(f => `<li>${f}, First: ${firstChar}, Banana at: ${bananaIndex}</li>`).join('');
    </script>
  </body>
</html>
```
::

## Best Practices
- Use `trim` for form input validation.
- Prefer `replaceAll` for global replacements.
- Check for empty strings before processing.
- Use template literals for string formatting.

## What’s Next?

You’ve mastered string methods! Next, explore **Object Methods Reference** for managing structured data.
---
title: HTML Introduction
description: Learn the basic blocks of web development.
navigation:
  order: 1
---

# Introduction to HTML

Welcome to the first lesson in our HTML tutorials! HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. It forms the backbone of every webpage, defining elements like headings, paragraphs, images, and links.

In this tutorial, you’ll learn:

- What HTML is and its role in web development
- The basic structure of an HTML document
- Common HTML elements like headings and paragraphs

## What is HTML?

HTML is a markup language that tells web browsers how to display content. It uses **tags** to define elements, such as headings, paragraphs, and links. Each tag is enclosed in angle brackets (`<` and `>`), and most tags come in pairs: an opening tag and a closing tag.

For example:

- `<h1>` defines a top-level heading.
- `<p>` defines a paragraph.

## Basic Structure of an HTML Document

Every HTML document follows a standard structure. Let’s look at a simple example:

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
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is my first paragraph in HTML.</p>
  </body>
</html>
```

::

### Explanation of the Code

- `<!DOCTYPE html>`: Declares the document as HTML5.
- `<html lang="en">`: The root element, specifying the language as English.
- `<head>`: Contains metadata, like character encoding (`<meta charset="UTF-8">`), viewport settings for responsive design, and the page title.
- `<body>`: Contains the visible content, such as headings (`<h1>`) and paragraphs (`<p>`).

## Common HTML Elements

Here are some basic HTML elements you’ll use frequently:

- **Headings**: `<h1>` to `<h6>` define headings of different levels, with `<h1>` being the most important.
- **Paragraphs**: `<p>` defines a block of text.
- **Line Breaks**: `<br>` inserts a line break within text.
- **Comments**: `<!-- This is a comment -->` adds notes that are not displayed in the browser.

Try this example with multiple headings and paragraphs:

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
    <title>Headings and Paragraphs</title>
  </head>
  <body>
    <h1>Main Heading</h1>
    <h2>Subheading</h2>
    <p>
      This is a paragraph with a <br />
      line break.
    </p>
    <!-- This is a comment -->
  </body>
</html>
```

::

## What’s Next?

You’ve learned the basics of HTML! In the next tutorial, we’ll explore how to add links and images to your webpage using the `<a>` and `<img>` tags.

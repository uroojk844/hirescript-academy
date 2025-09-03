---
title: Adding Links and Images
description: In this second tutorial, you'll learn how to enhance your webpages by adding hyperlinks and images.
navigation:
  order: 2
---

# Adding Links and Images in HTML

In this second tutorial, you'll learn how to enhance your webpages by adding **hyperlinks** and **images**. These elements make your site interactive and visually engaging. We'll explore the `<a>` tag for links and the `<img>` tag for images, including their key attributes.

In this tutorial, you’ll learn:
- How to create hyperlinks using the `<a>` tag
- How to add images using the `<img>` tag
- Key attributes like `href`, `src`, `alt`, and `title`

## Creating Hyperlinks with the `<a>` Tag

The `<a>` (anchor) tag creates a hyperlink, allowing users to navigate to another webpage or a specific part of the current page. The most important attribute is `href`, which specifies the destination URL.

Here’s a simple example of a link:

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
    <title>Links Example</title>
  </head>
  <body>
    <h1>Explore the Web</h1>
    <p>Visit <a href="https://www.example.com">Example Website</a> for more information.</p>
  </body>
</html>
```
::

### Key Attributes for `<a>`
- `href`: The URL or path the link points to (e.g., `https://www.example.com` or `/about.html` for a local file).
- `title`: Provides a tooltip when hovering over the link.
- `target`: Specifies where the link opens (e.g., `target="_blank"` opens the link in a new tab).

Example with additional attributes:

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
    <title>Advanced Links</title>
  </head>
  <body>
    <h1>Link with Attributes</h1>
    <p>Learn more at <a href="https://www.example.com" title="Visit Example" target="_blank">Example Website</a>.</p>
  </body>
</html>
```
::

## Adding Images with the `<img>` Tag

The `<img>` tag embeds images in your webpage. Unlike most HTML tags, `<img>` is a **self-closing tag**, meaning it doesn’t need a closing tag. The key attributes are `src` (source of the image) and `alt` (alternative text for accessibility).

Here’s an example:

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
    <title>Images Example</title>
  </head>
  <body>
    <h1>My Image Gallery</h1>
    <img src="https://via.placeholder.com/150" alt="A placeholder image" />
  </body>
</html>
```
::

### Key Attributes for `<img>`
- `src`: The URL or file path to the image (e.g., `images/photo.jpg` or a web URL).
- `alt`: Describes the image for screen readers and when the image fails to load.
- `width` and `height`: Set the image dimensions in pixels (optional but recommended for performance).
- `title`: Adds a tooltip when hovering over the image.

Example with more attributes:

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
    <title>Advanced Images</title>
  </head>
  <body>
    <h1>Image with Attributes</h1>
    <img src="https://via.placeholder.com/200" alt="A sample image" width="200" height="200" title="Sample Image" />
  </body>
</html>
```
::

## Combining Links and Images

You can combine `<a>` and `<img>` to create clickable images. For example:

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
    <title>Clickable Image</title>
  </head>
  <body>
    <h1>Clickable Image Link</h1>
    <a href="https://www.example.com">
      <img src="https://via.placeholder.com/150" alt="Link to Example" />
    </a>
  </body>
</html>
```
::

## Best Practices
- Always include the `alt` attribute for images to improve accessibility.
- Use relative paths (e.g., `images/photo.jpg`) for local files and absolute URLs (e.g., `https://example.com/photo.jpg`) for external resources.
- Test links to ensure they point to valid destinations.

## What’s Next?

You’ve learned how to add links and images to your HTML pages! In the next tutorial, we’ll cover **HTML Lists and Tables**, introducing the `<ul>`, `<ol>`, and `<table>` tags to organize content.
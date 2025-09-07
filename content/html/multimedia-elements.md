---
title: HTML Multimedia Elements
description: Learn to embed audio, video, and iframes in HTML.
navigation:
  order: 8
---

# HTML Multimedia Elements

In this eighth tutorial, you'll learn how to embed **multimedia content** in HTML using the `<audio>`, `<video>`, and `<iframe>` tags. These elements allow you to add rich media like sounds, videos, and external content (e.g., YouTube videos) to your webpages.

In this tutorial, you’ll learn:
- How to embed audio with `<audio>`
- How to embed video with `<video>`
- How to embed external content with `<iframe>`

## Embedding Audio with `<audio>`

The `<audio>` tag embeds audio files (e.g., MP3) in your webpage. It supports attributes like `controls` to display a player interface and `src` to specify the audio file.

Here’s a simple example:

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
    <title>Audio Example</title>
  </head>
  <body>
    <h1>Play Audio</h1>
    <audio controls>
      <source src="sample.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </body>
</html>
```
::

### Key Attributes for `<audio>`
- `controls`: Adds play/pause controls.
- `src`: Specifies the audio file path or URL.
- `loop`: Repeats the audio automatically.
- `autoplay`: Plays the audio on page load (use sparingly for accessibility).

## Embedding Video with `<video>`

The `<video>` tag embeds video files (e.g., MP4). Like `<audio>`, it supports `controls`, `src`, and other attributes, plus `width` and `height` for sizing.

Example with a video:

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
    <title>Video Example</title>
  </head>
  <body>
    <h1>Watch Video</h1>
    <video controls width="400">
      <source src="sample.mp4" type="video/mp4" />
      Your browser does not support the video element.
    </video>
  </body>
</html>
```
::

### Key Attributes for `<video>`
- `controls`: Adds video player controls.
- `src`: Specifies the video file path or URL.
- `poster`: Sets an image to display before playback.
- `loop` and `autoplay`: Control playback behavior.

## Embedding External Content with `<iframe>`

The `<iframe>` tag embeds external content, such as YouTube videos or maps, within your page. It uses the `src` attribute to load the external resource.

Example with a YouTube video:

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
    <title>Iframe Example</title>
  </head>
  <body>
    <h1>Embedded Video</h1>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" frameborder="0" allowfullscreen></iframe>
  </body>
</html>
```
::

### Key Attributes for `<iframe>`
- `src`: URL of the embedded content.
- `width` and `height`: Set the frame’s dimensions.
- `title`: Describes the iframe for accessibility.
- `frameborder="0"`: Removes the border (optional).
- `allowfullscreen`: Enables full-screen mode for videos.

## Best Practices
- Always include fallback text (e.g., “Your browser does not support...”) for `<audio>` and `<video>`.
- Use the `<source>` tag inside `<audio>` and `<video>` to support multiple file formats.
- Add `title` attributes to `<iframe>` for accessibility.
- Avoid `autoplay` unless necessary, as it can disrupt users.

## What’s Next?

You’ve learned how to embed multimedia in HTML! In the next tutorial, we’ll explore **HTML Data Attributes and Events**, covering `data-*` attributes and basic event handling like `onclick`.
---
title: JavaScript Navigator API
description: Access browser and device info.
navigation:
  order: 21
---

# JavaScript Navigator API

In this tutorial, you’ll learn to use the **JavaScript Navigator API** to access browser and device information, such as user agent, connectivity status, clipboard, and geolocation. Using plain HTML, CSS, and JavaScript, you’ll build dynamic, interactive interfaces with CSS variables, gradients, and PUBG-inspired visual effects, enhancing user experiences.

In this tutorial, you’ll learn:
- Accessing Navigator properties
- Detecting online/offline status
- Managing clipboard interactions
- Using geolocation (if permitted)
- Ensuring accessibility and permissions
- Best practices for Navigator API

## Accessing Navigator Properties

Retrieve basic browser and device info:

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
    <title>Navigator Properties</title>
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
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
      #info {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Navigator Properties</h1>
      <button onclick="displayInfo()">Show Browser Info</button>
      <div id="info"></div>
    </div>
    <script>
      function displayInfo() {
        const info = document.getElementById('info');
        info.innerHTML = `
          <p>User Agent: ${navigator.userAgent}</p>
          <p>Language: ${navigator.language}</p>
          <p>Platform: ${navigator.platform}</p>
          <p>Cookies Enabled: ${navigator.cookieEnabled}</p>
        `;
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: The `navigator` object provides properties like `userAgent`, `language`, `platform`, and `cookieEnabled`. Uses flexbox from the Flexbox Layout tutorial, gradients from the CSS Gradients tutorial, and `:hover` from the Pseudo-Classes Reference tutorial.

## Handling Connectivity Status

Detect online/offline status dynamically:

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
    <title>Connectivity Status</title>
    <style>
      :root {
        --primary-color: #007bff;
        --offline-color: #dc3545;
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
      #status {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
      #status.offline {
        background: var(--offline-color);
        color: var(--text-color);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Connectivity Status</h1>
      <div id="status">Checking...</div>
    </div>
    <script>
      const statusDiv = document.getElementById('status');
      function updateStatus() {
        statusDiv.textContent = navigator.onLine ? 'Online' : 'Offline';
        statusDiv.classList.toggle('offline', !navigator.onLine);
      }
      updateStatus();
      window.addEventListener('online', updateStatus);
      window.addEventListener('offline', updateStatus);
    </script>
  </body>
</html>
```
::

- **Explanation**: Uses `navigator.onLine` and `online`/`offline` events to update connectivity status, integrating with `addEventListener` patterns from the Array Methods Reference tutorial.

## Clipboard Interaction

Read from and write to the clipboard:

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
    <title>Clipboard Interaction</title>
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
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
      textarea, #output {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
        border: 1px solid #ccc;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Clipboard Interaction</h1>
      <textarea id="input" placeholder="Enter text to copy"></textarea>
      <button onclick="copyText()">Copy to Clipboard</button>
      <button onclick="pasteText()">Paste from Clipboard</button>
      <div id="output">Pasted text will appear here.</div>
    </div>
    <script>
      async function copyText() {
        const text = document.getElementById('input').value;
        try {
          await navigator.clipboard.writeText(text);
          alert('Text copied!');
        } catch (err) {
          console.error('Copy failed:', err);
        }
      }
      async function pasteText() {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById('output').textContent = text;
        } catch (err) {
          console.error('Paste failed:', err);
        }
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: Uses `navigator.clipboard` for async copy/paste, with error handling. Aligns with async patterns from the Fetch and APIs tutorial.

## Geolocation (with Permissions)

Access user location with permission:

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
    <title>Geolocation</title>
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
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
      #location {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Geolocation</h1>
      <button onclick="getLocation()">Get Location</button>
      <div id="location">Location will appear here.</div>
    </div>
    <script>
      async function getLocation() {
        const locationDiv = document.getElementById('location');
        try {
          const permission = await navigator.permissions.query({ name: 'geolocation' });
          if (permission.state === 'denied') {
            locationDiv.textContent = 'Geolocation permission denied.';
            return;
          }
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              locationDiv.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            },
            (error) => {
              locationDiv.textContent = `Error: ${error.message}`;
            }
          );
        } catch (err) {
          locationDiv.textContent = 'Geolocation not supported.';
        }
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: Uses `navigator.geolocation` and `navigator.permissions` for location access, with error handling. Integrates with async patterns from the Fetch and APIs tutorial.

## Accessibility Considerations

Ensure Navigator API features are accessible:

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
    <title>Accessible Navigator API</title>
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
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:focus {
        outline: 2px solid #ff6b6b;
      }
      #info {
        background: var(--bg-color);
        padding: 15px;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Accessible Navigator API</h1>
      <button onclick="displayInfo()" aria-label="Show browser information">Show Info</button>
      <div id="info" role="region" aria-live="polite"></div>
    </div>
    <script>
      function displayInfo() {
        const info = document.getElementById('info');
        info.innerHTML = `
          <p>User Agent: ${navigator.userAgent}</p>
          <p>Language: ${navigator.language}</p>
          <p>Platform: ${navigator.platform}</p>
          <p>Cookies Enabled: ${navigator.cookieEnabled}</p>
        `;
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: Adds `aria-label` and `aria-live="polite"` for screen reader support, with `:focus` from the Pseudo-Classes Reference tutorial.

## Best Practices
- Check feature support (e.g., `navigator.clipboard`, `navigator.geolocation`) before use.
- Handle permissions gracefully with `navigator.permissions`.
- Use async/await for clipboard and geolocation to manage errors.
- Ensure accessibility with ARIA attributes and keyboard support.
- Test edge cases: no JavaScript, denied permissions, non-secure contexts (e.g., clipboard requires HTTPS).
- Use CSS variables for theming (e.g., `--primary-color`).
- Optimize performance by avoiding frequent Navigator API calls.
- Browser compatibility: `navigator.clipboard` (Chrome 66+, Firefox 63+, Safari 13.1+), `navigator.geolocation` (widely supported), `navigator.permissions` (Chrome 43+, Firefox 46+, Safari 16+).

## What’s Next?

You’ve mastered the JavaScript Navigator API! Apply it to the Responsive Sidebar tutorial for device-aware features or explore the Fetch and APIs tutorial for more API interactions.
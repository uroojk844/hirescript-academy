---
title: Fetch and APIs
description: Fetch data with JavaScript APIs.
navigation:
  order: 20
---

# Fetch and APIs

In this tutorial, you’ll learn how to use the **Fetch API** to retrieve data from web servers, a key skill for dynamic web apps like those built with Nuxt. You’ll fetch data, process it with array methods, and display it using HTML and CSS.

In this tutorial, you’ll learn:
- What APIs are and why they matter
- Using `fetch` for GET requests
- Handling JSON responses
- Error handling with `try/catch`

## What is an API?

An **API** (Application Programming Interface) lets your app communicate with servers to fetch or send data, like user profiles or posts.

## Using Fetch

The `fetch` function makes HTTP requests. Use it to get data:

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
    <title>Fetch API</title>
    <style>
      ul { list-style: none; }
      li { padding: 10px; background: lightgray; margin: 5px; }
    </style>
  </head>
  <body>
    <h1>User List</h1>
    <ul id="users">Loading...</ul>
    <script>
      async function fetchUsers() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const users = await response.json();
          const ul = document.getElementById('users');
          ul.innerHTML = users.map(user => `<li>${user.name}</li>`).join('');
        } catch (error) {
          console.error('Error:', error);
        }
      }
      fetchUsers();
    </script>
  </body>
</html>
```
::

## Handling Errors

Use `try/catch` to manage fetch errors:

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
    <title>Fetch with Error</title>
    <style>
      p { color: red; }
    </style>
  </head>
  <body>
    <h1>Fetch Data</h1>
    <p id="output">Loading...</p>
    <script>
      async function fetchData() {
        try {
          const response = await fetch('https://invalid-url');
          const data = await response.json();
          document.getElementById('output').innerText = 'Success!';
        } catch (error) {
          document.getElementById('output').innerText = 'Failed to fetch data';
        }
      }
      fetchData();
    </script>
  </body>
</html>
```
::

## Best Practices
- Always handle errors with `try/catch`.
- Use `async/await` for readable fetch code.
- Validate API responses before processing.
- Cache results for performance in Nuxt apps.

## What’s Next?

You’ve learned to fetch API data! Review previous tutorials or explore CSS animations for dynamic styling.
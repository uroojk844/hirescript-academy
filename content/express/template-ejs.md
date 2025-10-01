---
title: Template Engines (EJS)
description: Learn how to use EJS templating engine to create dynamic HTML pages in Express.js
navigation:
  order: 8
---

# Template Engines (EJS)

Welcome to the Template Engines lesson! In this tutorial, you'll learn how to use EJS (Embedded JavaScript) to create dynamic HTML pages in your Express.js applications. Template engines allow you to inject data into your HTML, use loops, conditionals, and create reusable layouts.

In this tutorial, you'll learn:

- What template engines are and why we need them
- How to set up EJS in Express.js
- EJS syntax and tags
- Passing data from routes to views
- Working with partials for reusable components
- Using layouts for consistent page structure

## What is a Template Engine?

A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values and transforms the template into an HTML file sent to the client.

**Without Template Engine (Static HTML):**
```html
<h1>Welcome, User!</h1>
```

**With Template Engine (Dynamic HTML):**
```html
<h1>Welcome, <%= username %>!</h1>
```

EJS (Embedded JavaScript) is one of the most popular template engines for Express.js. It's simple, flexible, and uses plain JavaScript inside your templates.

## Setting Up EJS

First, install EJS in your project:

```bash
npm install ejs
```

Then configure Express to use EJS:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory (optional - 'views' is default)
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Project Structure:**
```
project/
├── app.js
├── views/
│   └── index.ejs
└── package.json
```

## EJS Syntax and Tags

EJS uses special tags to embed JavaScript in your HTML:

### Core EJS Tags:

- `<%= %>` - **Output Value** (escaped): Displays the value and escapes HTML
- `<%- %>` - **Output Value** (unescaped): Displays raw HTML
- `<% %>` - **Scriptlet**: JavaScript code (no output)
- `<%# %>` - **Comment**: Not executed or displayed
- `<%- include('partial') %>` - **Include**: Embeds another template

### Basic Example:

::Editor
#title
views/index.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to <%= title %></h1>
    <p>Current time: <%= new Date().toLocaleTimeString() %></p>
    
    <%# This is a comment - won't be rendered %>
    
    <% if (user) { %>
      <p>Hello, <%= user.name %>!</p>
    <% } else { %>
      <p>Please log in.</p>
    <% } %>
  </div>
</body>
</html>
```

::

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'EJS Example',
    user: { name: 'John Doe' }
  });
});

app.listen(3000);
```

::

## Passing Data to Views

You can pass any JavaScript data type to your views:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Mouse', price: 29, inStock: true },
    { id: 3, name: 'Keyboard', price: 79, inStock: false }
  ];

  res.render('products', {
    pageTitle: 'Our Products',
    products: products,
    discount: 10
  });
});

app.listen(3000);
```

::

::Editor
#title
views/products.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= pageTitle %></title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f0f0f0; }
    .container { max-width: 900px; margin: 0 auto; }
    .product { background: white; padding: 20px; margin: 10px 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .badge { padding: 5px 10px; border-radius: 4px; font-size: 12px; }
    .in-stock { background: #10b981; color: white; }
    .out-stock { background: #ef4444; color: white; }
    .price { font-size: 24px; font-weight: bold; color: #3b82f6; }
  </style>
</head>
<body>
  <div class="container">
    <h1><%= pageTitle %></h1>
    <p>Special Discount: <%= discount %>% off!</p>

    <% if (products.length === 0) { %>
      <p>No products available.</p>
    <% } else { %>
      <% products.forEach(function(product) { %>
        <div class="product">
          <div>
            <h3><%= product.name %></h3>
            <span class="badge <%= product.inStock ? 'in-stock' : 'out-stock' %>">
              <%= product.inStock ? 'In Stock' : 'Out of Stock' %>
            </span>
          </div>
          <div class="price">$<%= product.price %></div>
        </div>
      <% }); %>
    <% } %>

    <p>Total Products: <%= products.length %></p>
  </div>
</body>
</html>
```

::

### Explanation of EJS Features Used:
- `<%= pageTitle %>`: Outputs the page title variable
- `<% if (products.length === 0) { %>`: Conditional logic
- `<% products.forEach() %>`: Loop through array
- `<%= product.inStock ? 'In Stock' : 'Out of Stock' %>`: Ternary operator
- `<%= products.length %>`: Display array length

## Working with Partials

Partials are reusable template fragments that can be included in multiple pages. They help keep your code DRY (Don't Repeat Yourself).

**Project Structure with Partials:**
```
views/
├── partials/
│   ├── header.ejs
│   ├── footer.ejs
│   └── navigation.ejs
├── index.ejs
└── about.ejs
```

::Editor
#title
views/partials/header.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= pageTitle %></title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; }
    header { background: #1e40af; color: white; padding: 20px; }
    nav { background: #3b82f6; padding: 10px; }
    nav a { color: white; text-decoration: none; margin: 0 15px; }
    nav a:hover { text-decoration: underline; }
    main { padding: 20px; min-height: 400px; }
  </style>
</head>
<body>
  <header>
    <h1><%= siteName || 'My Website' %></h1>
  </header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
  <main>
```

::

::Editor
#title
views/partials/footer.ejs

#default

```html
  </main>
  <footer style="background: #1f2937; color: white; text-align: center; padding: 20px; margin-top: 40px;">
    <p>&copy; <%= new Date().getFullYear() %> <%= siteName || 'My Website' %>. All rights reserved.</p>
  </footer>
</body>
</html>
```

::

::Editor
#title
views/home.ejs

#default

```html
<%- include('partials/header') %>

<h2>Welcome to Our Homepage</h2>
<p>This page uses reusable header and footer partials!</p>

<div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>Why Use Partials?</h3>
  <ul style="margin-left: 20px; margin-top: 10px;">
    <li>Code reusability across multiple pages</li>
    <li>Easier maintenance - update once, change everywhere</li>
    <li>Consistent design and structure</li>
    <li>Better organization of code</li>
  </ul>
</div>

<%- include('partials/footer') %>
```

::

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
    siteName: 'Express EJS Demo'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Us',
    siteName: 'Express EJS Demo'
  });
});

app.listen(3000);
```

::

## Advanced EJS Features

### Passing Data to Partials:

::Editor
#title
views/partials/user-card.ejs

#default

```html
<div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px;">
  <h3><%= user.name %></h3>
  <p>Email: <%= user.email %></p>
  <p>Role: <%= user.role %></p>
</div>
```

::

::Editor
#title
views/users.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Users</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f9fafb; }
    .container { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>User Directory</h1>
    
    <% users.forEach(function(user) { %>
      <%- include('partials/user-card', { user: user }) %>
    <% }); %>
  </div>
</body>
</html>
```

::

### Escaping vs Unescaping HTML:

::Editor
#title
app.js

#default

```javascript
app.get('/demo', (req, res) => {
  res.render('demo', {
    escapedContent: '<script>alert("XSS")</script>',
    trustedHTML: '<strong>This is bold text</strong>'
  });
});
```

::

::Editor
#title
views/demo.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Escaping Demo</title>
</head>
<body>
  <h2>Escaped Output (Safe):</h2>
  <p><%= escapedContent %></p>
  <!-- Displays: &lt;script&gt;alert("XSS")&lt;/script&gt; -->

  <h2>Unescaped Output (Use with caution):</h2>
  <p><%- trustedHTML %></p>
  <!-- Displays: <strong>This is bold text</strong> -->
</body>
</html>
```

::

**Security Note:** Always use `<%= %>` for user-generated content to prevent XSS attacks. Only use `<%- %>` for trusted HTML that you control.

## Common Use Cases

### 1. User Dashboard:

::Editor
#title
app.js

#default

```javascript
app.get('/dashboard', (req, res) => {
  const user = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    memberSince: '2024',
    notifications: [
      { message: 'New comment on your post', time: '2 hours ago' },
      { message: 'You have a new follower', time: '5 hours ago' }
    ]
  };

  res.render('dashboard', { user: user, pageTitle: 'Dashboard' });
});
```

::

### 2. Blog Post with Comments:

::Editor
#title
views/blog-post.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= post.title %></title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .post { background: white; padding: 30px; margin-bottom: 30px; }
    .comment { background: #f3f4f6; padding: 15px; margin: 10px 0; border-left: 4px solid #3b82f6; }
    .meta { color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <article class="post">
    <h1><%= post.title %></h1>
    <p class="meta">By <%= post.author %> on <%= post.date %></p>
    <div><%- post.content %></div>
  </article>

  <section>
    <h2>Comments (<%= post.comments.length %>)</h2>
    
    <% if (post.comments.length === 0) { %>
      <p>No comments yet. Be the first to comment!</p>
    <% } else { %>
      <% post.comments.forEach(function(comment) { %>
        <div class="comment">
          <strong><%= comment.author %></strong>
          <p><%= comment.text %></p>
          <span class="meta"><%= comment.date %></span>
        </div>
      <% }); %>
    <% } %>
  </section>
</body>
</html>
```

::

## Best Practices

### 1. **Organize Your Views**
```
views/
├── layouts/
│   └── main.ejs
├── partials/
│   ├── header.ejs
│   ├── footer.ejs
│   └── navigation.ejs
├── pages/
│   ├── home.ejs
│   ├── about.ejs
│   └── contact.ejs
└── components/
    ├── card.ejs
    └── button.ejs
```

### 2. **Always Pass Required Data**
```javascript
// Good - all data provided
res.render('profile', { 
  user: user, 
  pageTitle: 'Profile',
  notifications: [] 
});

// Bad - missing data can cause errors
res.render('profile', { user: user });
```

### 3. **Use Descriptive Variable Names**
```html
<!-- Good -->
<%= userProfile.firstName %>

<!-- Bad -->
<%= u.fn %>
```

### 4. **Keep Logic Simple**
Move complex logic to your route handlers:
```javascript
// Good - logic in route
app.get('/products', (req, res) => {
  const products = getProducts();
  const discountedProducts = products.map(p => ({
    ...p,
    finalPrice: p.price * 0.9
  }));
  res.render('products', { products: discountedProducts });
});

// Bad - complex logic in template
// <%= product.price - (product.price * 0.10) %>
```

## Common Errors and Solutions

### Error: "Cannot find module 'ejs'"
**Solution:** Run `npm install ejs`

### Error: "Failed to lookup view"
**Solution:** Check your views directory path
```javascript
app.set('views', path.join(__dirname, 'views'));
```

### Error: "xyz is not defined"
**Solution:** Make sure all variables are passed to the template
```javascript
res.render('page', { xyz: 'value' });
```

## What's Next?

You've mastered EJS template engine basics! In the next tutorial, we'll cover **Handling Form Data**, where you'll learn how to process user input from HTML forms, validate data, and send responses back to users.

### Key Takeaways:
- EJS lets you create dynamic HTML with embedded JavaScript
- Use `<%= %>` for safe output and `<%- %>` for HTML
- Partials promote code reusability
- Always pass all required data to your views
- Keep templates simple and move logic to routes
---
title: Handling Form Data
description: Learn how to process user input from HTML forms in Express.js applications
navigation:
  order: 9
---

# Handling Form Data

Welcome to the Form Data Handling lesson! In this tutorial, you'll learn how to process user input from HTML forms in Express.js. Forms are the primary way users interact with web applications, and handling them properly is essential for building functional web apps.

In this tutorial, you'll learn:

- How to create HTML forms and submit data
- Processing GET and POST form submissions
- Using body-parser middleware
- Handling different input types (text, checkboxes, radio buttons)
- Redirecting after form submission
- Displaying form data back to users

## Understanding Form Submission

HTML forms can submit data using two HTTP methods:

- **GET**: Data appears in the URL (visible, bookmarkable)
- **POST**: Data sent in request body (hidden, more secure)

**GET Example:** `http://example.com/search?query=express&category=tutorials`  
**POST Example:** Data hidden in request body

### When to Use Each:

- **GET**: Search forms, filters, non-sensitive data
- **POST**: Login forms, user registration, sensitive data, file uploads

## Setting Up Body Parser

Express needs middleware to parse form data from POST requests.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (for API requests)
app.use(express.json());

// Set EJS as template engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Important Configuration:**
- `extended: true` - Allows parsing of nested objects
- `extended: false` - Simple key-value pairs only

## Handling GET Form Submissions

GET requests send data as URL query parameters. Perfect for search forms and filters.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Display the search form
app.get('/search', (req, res) => {
  res.render('search', { results: null, query: '' });
});

// Handle search form submission
app.get('/search/results', (req, res) => {
  const searchQuery = req.query.q;
  const category = req.query.category || 'all';
  
  // Simulate search results
  const results = [
    { title: 'Express.js Tutorial', category: 'tutorial' },
    { title: 'Node.js Guide', category: 'guide' },
    { title: 'JavaScript Basics', category: 'tutorial' }
  ].filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesQuery && matchesCategory;
  });
  
  res.render('search', { results: results, query: searchQuery });
});

app.listen(3000);
```

::

::Editor
#title
views/search.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Search</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f5f5f5; }
    .search-box { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    input[type="text"] { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 4px; font-size: 16px; }
    select { padding: 12px; border: 2px solid #ddd; border-radius: 4px; margin-left: 10px; }
    button { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 10px; }
    button:hover { background: #2563eb; }
    .result { background: white; padding: 15px; margin: 10px 0; border-radius: 4px; border-left: 4px solid #3b82f6; }
    .no-results { color: #6b7280; text-align: center; padding: 20px; }
  </style>
</head>
<body>
  <div class="search-box">
    <h1>Search</h1>
    
    <form action="/search/results" method="GET">
      <input type="text" name="q" placeholder="Search..." value="<%= query %>" required>
      
      <select name="category">
        <option value="all">All Categories</option>
        <option value="tutorial">Tutorials</option>
        <option value="guide">Guides</option>
      </select>
      
      <button type="submit">Search</button>
    </form>

    <% if (results !== null) { %>
      <h2>Search Results (<%= results.length %>)</h2>
      
      <% if (results.length === 0) { %>
        <p class="no-results">No results found for "<%= query %>"</p>
      <% } else { %>
        <% results.forEach(function(result) { %>
          <div class="result">
            <h3><%= result.title %></h3>
            <span style="color: #6b7280; font-size: 14px;">Category: <%= result.category %></span>
          </div>
        <% }); %>
      <% } %>
    <% } %>
  </div>
</body>
</html>
```

::

### Key Points:
- Form uses `method="GET"` and `action="/search/results"`
- Data accessible via `req.query.fieldName`
- Query parameters appear in URL: `/search/results?q=express&category=tutorial`
- User can bookmark or share the URL

## Handling POST Form Submissions

POST requests send data in the request body, making them ideal for sensitive information and data modifications.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Display the registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle form submission
app.post('/register', (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    country: req.body.country,
    newsletter: req.body.newsletter === 'on',
    interests: req.body.interests || []
  };
  
  // In real app: save to database
  console.log('User registered:', userData);
  
  res.render('success', { user: userData });
});

app.listen(3000);
```

::

::Editor
#title
views/register.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Registration</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    .form-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #1f2937; margin-bottom: 20px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 5px; font-weight: 600; color: #374151; }
    input[type="text"], input[type="email"], input[type="number"], select, textarea { width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 4px; font-size: 14px; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: #3b82f6; }
    .checkbox-group, .radio-group { margin-top: 10px; }
    .checkbox-group label, .radio-group label { display: inline; font-weight: normal; margin-left: 5px; }
    input[type="checkbox"], input[type="radio"] { width: auto; margin-right: 5px; }
    button { background: #3b82f6; color: white; padding: 12px 30px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: 600; width: 100%; }
    button:hover { background: #2563eb; }
    .form-hint { font-size: 12px; color: #6b7280; margin-top: 5px; }
  </style>
</head>
<body>
  <div class="form-container">
    <h1>Create Account</h1>
    
    <form action="/register" method="POST">
      <!-- Text Input -->
      <div class="form-group">
        <label for="username">Username *</label>
        <input type="text" id="username" name="username" required>
        <div class="form-hint">Choose a unique username</div>
      </div>

      <!-- Email Input -->
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
      </div>

      <!-- Number Input -->
      <div class="form-group">
        <label for="age">Age</label>
        <input type="number" id="age" name="age" min="13" max="120">
      </div>

      <!-- Radio Buttons -->
      <div class="form-group">
        <label>Gender</label>
        <div class="radio-group">
          <input type="radio" id="male" name="gender" value="male">
          <label for="male">Male</label>
          
          <input type="radio" id="female" name="gender" value="female">
          <label for="female">Female</label>
          
          <input type="radio" id="other" name="gender" value="other">
          <label for="other">Other</label>
        </div>
      </div>

      <!-- Select Dropdown -->
      <div class="form-group">
        <label for="country">Country</label>
        <select id="country" name="country">
          <option value="">Select Country</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="canada">Canada</option>
          <option value="india">India</option>
          <option value="australia">Australia</option>
        </select>
      </div>

      <!-- Checkboxes -->
      <div class="form-group">
        <label>Interests</label>
        <div class="checkbox-group">
          <div>
            <input type="checkbox" id="coding" name="interests" value="coding">
            <label for="coding">Coding</label>
          </div>
          <div>
            <input type="checkbox" id="design" name="interests" value="design">
            <label for="design">Design</label>
          </div>
          <div>
            <input type="checkbox" id="marketing" name="interests" value="marketing">
            <label for="marketing">Marketing</label>
          </div>
        </div>
      </div>

      <!-- Single Checkbox -->
      <div class="form-group">
        <div class="checkbox-group">
          <input type="checkbox" id="newsletter" name="newsletter">
          <label for="newsletter">Subscribe to newsletter</label>
        </div>
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</body>
</html>
```

::

::Editor
#title
views/success.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Success</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    .success-box { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    .checkmark { color: #10b981; font-size: 64px; }
    h1 { color: #1f2937; margin: 20px 0; }
    .user-data { text-align: left; background: #f3f4f6; padding: 20px; border-radius: 4px; margin: 20px 0; }
    .data-row { margin: 10px 0; }
    .data-label { font-weight: 600; color: #374151; }
    .data-value { color: #6b7280; }
    a { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
    a:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="success-box">
    <div class="checkmark">✓</div>
    <h1>Registration Successful!</h1>
    <p>Welcome aboard, <%= user.username %>!</p>

    <div class="user-data">
      <h3>Your Information:</h3>
      
      <div class="data-row">
        <span class="data-label">Username:</span>
        <span class="data-value"><%= user.username %></span>
      </div>
      
      <div class="data-row">
        <span class="data-label">Email:</span>
        <span class="data-value"><%= user.email %></span>
      </div>
      
      <% if (user.age) { %>
        <div class="data-row">
          <span class="data-label">Age:</span>
          <span class="data-value"><%= user.age %></span>
        </div>
      <% } %>
      
      <% if (user.gender) { %>
        <div class="data-row">
          <span class="data-label">Gender:</span>
          <span class="data-value"><%= user.gender %></span>
        </div>
      <% } %>
      
      <% if (user.country) { %>
        <div class="data-row">
          <span class="data-label">Country:</span>
          <span class="data-value"><%= user.country %></span>
        </div>
      <% } %>
      
      <% if (user.interests && user.interests.length > 0) { %>
        <div class="data-row">
          <span class="data-label">Interests:</span>
          <span class="data-value"><%= user.interests.join(', ') %></span>
        </div>
      <% } %>
      
      <div class="data-row">
        <span class="data-label">Newsletter:</span>
        <span class="data-value"><%= user.newsletter ? 'Subscribed' : 'Not subscribed' %></span>
      </div>
    </div>

    <a href="/register">Register Another User</a>
  </div>
</body>
</html>
```

::

### Accessing Form Data:

```javascript
// Text inputs, email, number
req.body.fieldName

// Radio buttons (single value)
req.body.gender // Returns: "male", "female", or "other"

// Select dropdown
req.body.country // Returns selected option value

// Single checkbox
req.body.newsletter // Returns: "on" if checked, undefined if not

// Multiple checkboxes (same name)
req.body.interests // Returns: array of values or single value
```

## Form Data Types Explained

### Text Inputs:
```html
<input type="text" name="username">
<!-- Access: req.body.username -->
```

### Email Inputs:
```html
<input type="email" name="email">
<!-- Access: req.body.email -->
<!-- Browser validates email format -->
```

### Number Inputs:
```html
<input type="number" name="age" min="13" max="120">
<!-- Access: req.body.age (string, needs parseInt if needed as number) -->
```

### Radio Buttons:
```html
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">
<!-- Access: req.body.gender -->
<!-- Returns: "male" or "female" (single value) -->
```

### Checkboxes (Single):
```html
<input type="checkbox" name="newsletter">
<!-- Access: req.body.newsletter -->
<!-- Returns: "on" if checked, undefined if not -->
```

### Checkboxes (Multiple):
```html
<input type="checkbox" name="interests" value="coding">
<input type="checkbox" name="interests" value="design">
<!-- Access: req.body.interests -->
<!-- Returns: array ["coding", "design"] or single value "coding" -->
```

### Select Dropdown:
```html
<select name="country">
  <option value="usa">United States</option>
  <option value="uk">United Kingdom</option>
</select>
<!-- Access: req.body.country -->
<!-- Returns: "usa" or "uk" -->
```

## Redirect After Form Submission

It's a best practice to redirect after successful POST to prevent duplicate submissions.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Store submissions temporarily (use database in production)
let submissions = [];

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const message = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    date: new Date()
  };
  
  submissions.push(message);
  
  // Redirect to thank you page
  res.redirect('/thank-you');
});

app.get('/thank-you', (req, res) => {
  res.render('thank-you');
});

app.get('/submissions', (req, res) => {
  res.render('submissions', { submissions: submissions });
});

app.listen(3000);
```

::

### Why Redirect?

- **Prevents duplicate submissions** when user refreshes
- **Better user experience** with clean URL
- **Follows PRG pattern** (Post-Redirect-Get)

## Handling Form Validation

Basic server-side validation example:

::Editor
#title
app.js

#default

```javascript
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const errors = [];

  // Validation
  if (!username || username.length < 3) {
    errors.push('Username must be at least 3 characters');
  }

  if (!email || !email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  // If errors, show form again with errors
  if (errors.length > 0) {
    return res.render('register', { 
      errors: errors,
      formData: req.body 
    });
  }

  // Process valid data
  res.redirect('/success');
});
```

::

## Best Practices

### 1. **Always Use POST for Sensitive Data**
```javascript
// Good - Login uses POST
app.post('/login', (req, res) => { ... });

// Bad - Password in URL
app.get('/login', (req, res) => { ... });
```

### 2. **Validate on Both Client and Server**
```html
<!-- Client validation -->
<input type="email" required minlength="3">
```
```javascript
// Server validation (MUST HAVE)
if (!email || !email.includes('@')) {
  return res.status(400).send('Invalid email');
}
```

### 3. **Sanitize User Input**
```javascript
const username = req.body.username.trim();
const cleanEmail = req.body.email.toLowerCase().trim();
```

### 4. **Use Proper HTTP Status Codes**
```javascript
// Success
res.status(200).send('OK');

// Bad Request
res.status(400).send('Invalid data');

// Redirect
res.redirect(302, '/success');
```

### 5. **Handle Missing Data Gracefully**
```javascript
const interests = req.body.interests || [];
const newsletter = req.body.newsletter === 'on';
```

## Common Errors and Solutions

### Error: "Cannot read property 'fieldName' of undefined"
**Cause:** Missing body parser middleware  
**Solution:**
```javascript
app.use(express.urlencoded({ extended: true }));
```

### Error: Form data is undefined
**Cause:** Wrong content type or form method  
**Solution:** Ensure form has `method="POST"` and proper middleware

### Error: Checkbox always undefined
**Cause:** Unchecked checkboxes don't send data  
**Solution:**
```javascript
const newsletter = req.body.newsletter === 'on';
```

### Error: Multiple checkboxes return string instead of array
**Cause:** Only one checkbox selected  
**Solution:**
```javascript
const interests = Array.isArray(req.body.interests) 
  ? req.body.interests 
  : [req.body.interests].filter(Boolean);
```

## What's Next?

You've mastered form data handling in Express.js! In the next tutorial, we'll cover **URL Query Parameters**, where you'll learn how to work with URL parameters for filtering, pagination, and building dynamic routes.

### Key Takeaways:
- Use GET for searches and filters, POST for data modifications
- Always use `express.urlencoded()` middleware for form data
- Access form data via `req.body.fieldName`
- Redirect after POST to prevent duplicate submissions
- Validate both client-side and server-side
- Handle checkboxes and arrays carefully
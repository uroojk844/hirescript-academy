---
title: Input Validation Sanitization
description: Learn how to validate and sanitize user input in Express.js to prevent security vulnerabilities, ensure data integrity, and improve application robustness.
navigation:
  order: 15
---

# Input Validation Sanitization

Welcome to the Input Validation and Sanitization lesson! In this tutorial, you’ll learn how to validate and sanitize user input in your Express.js applications to prevent common security issues like SQL injection, XSS, and invalid data processing. We’ll use libraries like `express-validator` to make this process efficient.

In this tutorial, you’ll learn:

- What input validation and sanitization are
- Why they are crucial for security and data integrity
- Setting up `express-validator` for validation
- Validating and sanitizing request data (body, query, params)
- Handling validation errors
- Building a secure blog post creation API with validation

## What are Input Validation and Sanitization?

**Validation** checks if input meets specific criteria (e.g., email format, required fields, length).

**Sanitization** cleans input to remove or escape harmful characters (e.g., stripping HTML tags to prevent XSS).

**Importance**:
- Prevents security vulnerabilities (e.g., injection attacks)
- Ensures data consistency (e.g., valid dates, numbers)
- Improves user experience with clear error messages
- Protects against malformed or malicious input

## Setting Up express-validator

`express-validator` is a popular middleware for validation and sanitization in Express.

**Installation**:
```bash
npm install express-validator
```

**Basic Usage**:
Import and use validation chains in routes.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

app.post('/user', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('age').isInt({ min: 18 }).withMessage('Age must be at least 18')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: 'User created', data: req.body });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test Request** (POST `/user`):
```json
{
  "username": "ab",
  "email": "invalid",
  "age": 17
}
```

**Expected Response**:
```json
{
  "errors": [
    { "msg": "Username must be at least 3 characters", "param": "username" },
    { "msg": "Invalid email", "param": "email" },
    { "msg": "Age must be at least 18", "param": "age" }
  ]
}
```

## Validation and Sanitization Techniques

### Common Validators
- `isLength({ min, max })`: Check string length
- `isEmail()`: Validate email format
- `isInt({ min, max })`: Validate integer range
- `isDate()`: Validate date format
- `isIn(['option1', 'option2'])`: Check against allowed values

### Sanitizers
- `trim()`: Remove leading/trailing whitespace
- `escape()`: Escape HTML characters
- `normalizeEmail()`: Normalize email format
- `toInt()`: Convert to integer
- `stripLow()`: Remove control characters

**Example with Sanitization**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

app.post('/comment', [
  body('text')
    .trim()  // Sanitize: trim whitespace
    .escape()  // Sanitize: escape HTML
    .isLength({ min: 1, max: 500 }).withMessage('Comment must be between 1 and 500 characters')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: 'Comment added', text: req.body.text });
});

app.listen(3000);
```

::

**Test Request** (POST `/comment`):
```json
{
  "text": " <script>alert('XSS')</script> "
}
```

**Expected Response** (after sanitization):
```json
{
  "message": "Comment added",
  "text": "&lt;script&gt;alert('XSS')&lt;/script&gt;"
}
```

## Validating Different Request Parts

### Body Validation (POST/PUT)
As shown above, use `body()`.

### Query Parameters
Use `query()` for URL queries.

::Editor
#title
app.js

#default

```javascript
const { query, validationResult } = require('express-validator');

app.get('/search', [
  query('term').trim().isLength({ min: 3 }).withMessage('Search term too short'),
  query('page').toInt().isInt({ min: 1 }).withMessage('Invalid page number')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ term: req.query.term, page: req.query.page });
});
```

::

### Route Parameters
Use `param()` for URL params.

::Editor
#title
app.js

#default

```javascript
const { param, validationResult } = require('express-validator');

app.get('/user/:id', [
  param('id').isMongoId().withMessage('Invalid MongoDB ID')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ id: req.params.id });
});
```

::

## Custom Validators and Sanitizers

Create custom logic for specific needs.

::Editor
#title
app.js

#default

```javascript
const { body, validationResult } = require('express-validator');

app.post('/register', [
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .custom((value) => {
      if (!/\d/.test(value)) {
        throw new Error('Password must contain at least one number');
      }
      return true;
    }),
  body('username').customSanitizer((value) => value.toLowerCase())
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: 'Registered', data: req.body });
});
```

::

## Building a Secure Blog Post API with Validation

Let’s enhance the blog post API from the previous lesson with validation and sanitization.

**Step 1: Update Post Model (Optional for Extra Validation)**

::Editor
#title
models/post.js

#default

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title must not exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: String,
    trim: true,
    default: 'Anonymous'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
```

::

**Step 2: Add Validation to Routes**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const Post = require('../models/post');

// POST a new post with validation
router.post('/', [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('content')
    .trim()
    .escape()  // Sanitize against XSS
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('author')
    .trim()
    .escape()
    .optional({ checkFalsy: true })  // Optional field
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ message: 'Post created', post });
  } catch (err) {
    next(err);
  }
});

// PUT update a post with validation
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid post ID'),
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters')
    .optional(),
  body('content')
    .trim()
    .escape()
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
    .optional(),
  body('author')
    .trim()
    .escape()
    .optional()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.json({ message: 'Post updated', post });
  } catch (err) {
    next(err);
  }
});

// Other routes (GET, DELETE) can be added similarly

module.exports = router;
```

::

**Step 3: Mount in app.js**

The app.js from previous lessons can remain the same, as the validation is integrated into the routes.

**Test Request** (POST `/api/posts`):
```json
{
  "title": "Hi",
  "content": "<script>alert('XSS')</script>"
}
```

**Expected Response**:
```json
{
  "errors": [
    { "msg": "Title must be between 3 and 100 characters", "param": "title" },
    { "msg": "Content must be at least 10 characters", "param": "content" }
  ]
}
```

If valid, the content will be sanitized: `&lt;script&gt;alert('XSS')&lt;/script&gt;`.

## Best Practices

### 1. **Validate Early**
Validate input as soon as it enters the application (in middleware or routes).

### 2. **Sanitize Always**
Always sanitize user input before storing or displaying it.

### 3. **Use Custom Messages**
Provide clear, user-friendly error messages.

### 4. **Handle Optional Fields**
Use `.optional()` for non-required fields to avoid unnecessary errors.

### 5. **Combine with Other Security Measures**
Use validation alongside helmet, rate-limiting, and secure headers.

## Common Patterns

### Bail on First Error
Use `.bail()` to stop validation chain on first error:

```javascript
body('email').isEmail().bail().normalizeEmail()
```

### Array Validation
Validate arrays:

```javascript
body('tags.*').trim().escape().isLength({ min: 1 })
```

## What's Next?

You’ve mastered input validation and sanitization in Express.js! In the next tutorial, we’ll cover **Session Cookie Management**, where you’ll learn how to manage user sessions and cookies for authentication and state persistence.

### Key Takeaways:
- Validation checks input criteria; sanitization cleans harmful data
- Use `express-validator` for easy validation chains
- Validate body, query, and params with specific functions
- Handle errors with `validationResult` and custom messages
- Always sanitize to prevent XSS and other attacks
- Integrate validation into APIs for secure data handling
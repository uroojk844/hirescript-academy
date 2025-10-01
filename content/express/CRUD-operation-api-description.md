---
title: CRUD Operations API
description: Learn how to build a RESTful API with Express.js to perform Create, Read, Update, and Delete (CRUD) operations, using MongoDB and Mongoose for data management.
navigation:
  order: 14
---

# CRUD Operations API

Welcome to the CRUD Operations API lesson! In this tutorial, you’ll learn how to build a RESTful API using Express.js to perform Create, Read, Update, and Delete (CRUD) operations on resources. We’ll use MongoDB with Mongoose for data persistence and create a fully functional API for managing blog posts.

In this tutorial, you’ll learn:

- What a RESTful API is and its principles
- Setting up routes for CRUD operations
- Handling HTTP methods (GET, POST, PUT, DELETE)
- Implementing a complete blog post API
- Testing the API with tools like Postman
- Handling errors and validation

## What is a RESTful API?

A **RESTful API** (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods to perform operations on resources (e.g., blog posts) identified by URLs.

**REST Principles**:
- **Resources**: Represented by URLs (e.g., `/posts`, `/posts/:id`)
- **HTTP Methods**:
  - `GET`: Retrieve resources
  - `POST`: Create resources
  - `PUT`/`PATCH`: Update resources
  - `DELETE`: Delete resources
- **Stateless**: Each request contains all necessary information
- **JSON**: Common format for data exchange

**Example Endpoints**:
- `GET /posts` → List all posts
- `GET /posts/:id` → Get a specific post
- `POST /posts` → Create a new post
- `PUT /posts/:id` → Update a post
- `DELETE /posts/:id` → Delete a post

## Setting Up the Project

### Prerequisites
- MongoDB installed locally or use MongoDB Atlas
- Install dependencies: `npm install express mongoose`

### Project Structure
```
project/
├── models/
│   └── post.js
├── routes/
│   └── posts.js
├── app.js
└── package.json
```

## Defining the Post Model

Define a Mongoose schema for blog posts.

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
    minlength: [3, 'Title must be at least 3 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: String,
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

## Building the CRUD API

Create a router to handle all CRUD operations for posts.

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET a single post by ID
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST a new post
router.post('/', async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ message: 'Post created', post });
  } catch (err) {
    next(err);
  }
});

// PUT update a post by ID
router.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content, author: req.body.author },
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

// DELETE a post by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

## Setting Up the Main Application

Connect to MongoDB and mount the routes with error handling.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Mount routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.name,
    message: err.message,
    status: err.status || 500
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Notes**:
- Install dependencies: `npm install express mongoose`.
- Replace `'mongodb://localhost:27017/blog'` with your MongoDB connection string.

## Testing the API

Use a tool like **Postman** or **curl** to test the API endpoints.

### 1. Create a Post (POST)
**Request**:
```
POST http://localhost:3000/api/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is a blog post about Express.js",
  "author": "Alice"
}
```

**Expected Response**:
```json
{
  "message": "Post created",
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Post",
    "content": "This is a blog post about Express.js",
    "author": "Alice",
    "createdAt": "2025-10-01T..."
  }
}
```

### 2. Get All Posts (GET)
**Request**:
```
GET http://localhost:3000/api/posts
```

**Expected Response**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Post",
    "content": "This is a blog post about Express.js",
    "author": "Alice",
    "createdAt": "2025-10-01T..."
  }
]
```

### 3. Get a Single Post (GET)
**Request**:
```
GET http://localhost:3000/api/posts/507f1f77bcf86cd799439011
```

**Expected Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My First Post",
  "content": "This is a blog post about Express.js",
  "author": "Alice",
  "createdAt": "2025-10-01T..."
}
```

### 4. Update a Post (PUT)
**Request**:
```
PUT http://localhost:3000/api/posts/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "title": "Updated Post",
  "content": "Updated content about Express.js",
  "author": "Bob"
}
```

**Expected Response**:
```json
{
  "message": "Post updated",
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Post",
    "content": "Updated content about Express.js",
    "author": "Bob",
    "createdAt": "2025-10-01T..."
  }
}
```

### 5. Delete a Post (DELETE)
**Request**:
```
DELETE http://localhost:3000/api/posts/507f1f77bcf86cd799439011
```

**Expected Response**:
```json
{
  "message": "Post deleted"
}
```

## Building a Complete Blog API with Frontend

Let’s extend the API with an EJS frontend for a user-friendly interface.

**Step 1: Update Routes with Frontend Rendering**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET all posts (API)
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (req.headers['accept'] === 'application/json') {
      res.json(posts);
    } else {
      res.render('posts', { posts });
    }
  } catch (err) {
    next(err);
  }
});

// GET form to create a post
router.get('/new', (req, res) => {
  res.render('new-post');
});

// POST a new post
router.post('/', async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    if (req.headers['accept'] === 'application/json') {
      res.status(201).json({ message: 'Post created', post });
    } else {
      res.redirect('/api/posts');
    }
  } catch (err) {
    next(err);
  }
});

// GET a single post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    if (req.headers['accept'] === 'application/json') {
      res.json(post);
    } else {
      res.render('post', { post });
    }
  } catch (err) {
    next(err);
  }
});

// PUT update a post
router.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content, author: req.body.author },
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

// DELETE a post
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Step 2: Create EJS Templates**

::Editor
#title
views/posts.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Posts</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 20px; }
    .post-list { display: flex; flex-direction: column; gap: 15px; }
    .post-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .post-card a { color: #3b82f6; text-decoration: none; font-weight: 600; }
    .post-card a:hover { text-decoration: underline; }
    .new-post-btn { display: inline-block; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 4px; margin-bottom: 20px; }
    .new-post-btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <h1>Blog Posts</h1>
  <a href="/api/posts/new" class="new-post-btn">New Post</a>
  <div class="post-list">
    <% posts.forEach(post => { %>
      <div class="post-card">
        <a href="/api/posts/<%= post._id %>"><%= post.title %></a>
        <p><%= post.content.substring(0, 50) %>...</p>
        <p>By <%= post.author %> on <%= post.createdAt.toDateString() %></p>
      </div>
    <% }); %>
  </div>
</body>
</html>
```

::

::Editor
#title
views/new-post.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Post</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 20px; }
    form { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: 600; }
    input, textarea { width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 4px; font-size: 14px; }
    textarea { resize: vertical; }
    button { background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #2563eb; }
    a { color: #3b82f6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Create New Post</h1>
  <form action="/api/posts" method="POST">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" required>
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea id="content" name="content" rows="5" required></textarea>
    </div>
    <div class="form-group">
      <label for="author">Author</label>
      <input type="text" id="author" name="author">
    </div>
    <button type="submit">Create Post</button>
    <a href="/api/posts">Back to Posts</a>
  </form>
</body>
</html>
```

::

::Editor
#title
views/post.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= post.title %></title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 20px; }
    .post-content { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    p { color: #6b7280; margin-bottom: 10px; }
    a { color: #3b82f6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1><%= post.title %></h1>
  <div class="post-content">
    <p><%= post.content %></p>
    <p>By <%= post.author %> on <%= post.createdAt.toDateString() %></p>
    <a href="/api/posts">Back to Posts</a>
  </div>
</body>
</html>
```

::

::Editor
#title
views/error.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error <%= error.status %></title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    .error-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #ef4444; margin-bottom: 20px; }
    p { color: #6b7280; margin-bottom: 20px; }
    a { color: #3b82f6; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="error-container">
    <h1>Error <%= error.status %>: <%= error.name %></h1>
    <p><%= error.message %></p>
    <a href="/api/posts">Back to Posts</a>
  </div>
</body>
</html>
```

::

**Test URLs**:
- `http://localhost:3000/api/posts` → Lists all posts (frontend or JSON)
- `http://localhost:3000/api/posts/new` → Shows form to create a post
- `http://localhost:3000/api/posts/507f1f77bcf86cd799439011` → Shows post details
- `http://localhost:3000/api/posts/999` → Renders error: `Error 404: Post not found`

**Note**: Use Postman for `POST`, `PUT`, and `DELETE` requests, setting `Content-Type: application/json` for JSON responses.

## Handling Errors and Validation

Mongoose validates data based on the schema (e.g., `required`, `minlength`). The error handling middleware catches validation errors.

**Example Error Response** (if title is too short):
```json
{
  "error": "ValidationError",
  "message": "Post validation failed: title: Title must be at least 3 characters",
  "status": 400
}
```

## Best Practices

### 1. **Follow REST Conventions**
Use standard HTTP methods and URL patterns for resources.

### 2. **Validate Input**
Use Mongoose schema validation and check for invalid IDs.

### 3. **Use Appropriate Status Codes**
- `200`: Success (GET, PUT)
- `201`: Resource created (POST)
- `400`: Bad request (validation errors)
- `404`: Resource not found
- `500`: Server error

### 4. **Secure Data**
Sanitize input to prevent injection attacks (Mongoose handles most MongoDB injection concerns).

### 5. **Version Your API**
Use `/api/v1/posts` for future-proofing.

```javascript
app.use('/api/v1/posts', postsRouter);
```

## Common Patterns

### Filtering and Sorting
Add query parameters for filtering:

```javascript
router.get('/', async (req, res, next) => {
  try {
    const query = {};
    if (req.query.author) query.author = req.query.author;
    const sort = req.query.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
    const posts = await Post.find(query).sort(sort);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});
```

**Test URL**: `http://localhost:3000/api/posts?author=Alice&sort=oldest`

### Pagination
Implement pagination with query parameters:

```javascript
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Post.countDocuments();
    res.json({ posts, page, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
});
```

## What's Next?

You’ve mastered building a RESTful CRUD API with Express.js! In the next tutorial, we’ll cover **Input Validation Sanitization**, where you’ll learn how to validate and sanitize user input to ensure security and data integrity.

### Key Takeaways:
- RESTful APIs use HTTP methods to manage resources
- Implement CRUD operations with `GET`, `POST`, `PUT`, `DELETE`
- Use Mongoose for data persistence and validation
- Handle errors with middleware and appropriate status codes
- Combine API with a frontend for user interaction
- Test APIs with tools like Postman
---
title: MongoDB with Mongoose
description: Learn how to integrate MongoDB with Express.js using Mongoose to manage data persistence, define schemas, and perform database operations in your applications.
navigation:
  order: 13
---

# MongoDB with Mongoose

Welcome to the MongoDB with Mongoose lesson! In this tutorial, you’ll learn how to connect your Express.js application to MongoDB, a NoSQL database, using Mongoose, an Object Data Modeling (ODM) library. This enables you to store and retrieve data persistently, building dynamic and scalable applications.

In this tutorial, you’ll learn:

- What MongoDB and Mongoose are
- Setting up MongoDB and connecting with Mongoose
- Defining schemas and models
- Performing basic CRUD operations (Create, Read, Update, Delete)
- Handling database errors
- Building a blog post management system with MongoDB

## What are MongoDB and Mongoose?

**MongoDB** is a NoSQL database that stores data in flexible, JSON-like documents. Unlike relational databases, it doesn’t require a fixed schema, making it ideal for dynamic applications.

**Mongoose** is a Node.js library that provides a structured way to interact with MongoDB. It allows you to define schemas, models, and perform database operations with ease.

**Key Features**:
- Schemas for data structure
- Validation and middleware
- Simplified querying

## Setting Up MongoDB and Mongoose

### Prerequisites
1. Install MongoDB locally or use a cloud service like MongoDB Atlas.
2. Ensure MongoDB is running (e.g., `mongod` for local installations).
3. Install Mongoose: `npm install mongoose`.

### Connecting to MongoDB

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Blog App Home');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Expected Output** (in console):
```
Connected to MongoDB
Server running on http://localhost:3000
```

**Notes**:
- Replace `'mongodb://localhost:27017/blog'` with your MongoDB connection string (e.g., MongoDB Atlas URI).
- Install dependencies: `npm install express mongoose ejs`.

## Defining Schemas and Models

A **schema** defines the structure of documents in a MongoDB collection. A **model** is a compiled schema that provides an interface for database operations.

::Editor
#title
models/post.js

#default

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
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

**Explanation**:
- `type`: Specifies the data type (e.g., `String`, `Date`).
- `required`: Ensures the field is mandatory.
- `trim`: Removes leading/trailing whitespace.
- `default`: Sets a default value if none provided.
- `mongoose.model('Post', postSchema)` creates a model for the `posts` collection.

## Performing CRUD Operations

Let’s implement Create, Read, Update, and Delete operations using Mongoose.

### Create (Add a Post)

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res, next) => {
  try {
    const post = new Post({
      title: req.query.title,
      content: req.query.content,
      author: req.query.author
    });
    await post.save();
    res.json({ message: 'Post created', post });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

**Test URL**: `http://localhost:3000/posts?title=First%20Post&content=Hello%20World&author=Alice`
**Expected Output**:
```json
{
  "message": "Post created",
  "post": {
    "_id": "...",
    "title": "First Post",
    "content": "Hello World",
    "author": "Alice",
    "createdAt": "2025-10-01T..."
  }
}
```

### Read (List and Get Posts)

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.render('posts', { posts });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.render('post', { post });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

::

### Update (Edit a Post)

::Editor
#title
routes/posts.js

#default

```javascript
router.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.query.title, content: req.query.content },
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
```

::

**Test URL**: `http://localhost:3000/posts/12345?title=Updated%20Post&content=New%20Content`
**Expected Output** (if post exists):
```json
{
  "message": "Post updated",
  "post": { "_id": "12345", "title": "Updated Post", "content": "New Content", ... }
}
```

### Delete (Remove a Post)

::Editor
#title
routes/posts.js

#default

```javascript
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
```

::

**Test URL**: `http://localhost:3000/posts/12345` (DELETE request)
**Expected Output**:
```json
{ "message": "Post deleted" }
```

## Handling Database Errors

Use error handling middleware to manage MongoDB errors (e.g., validation errors).

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mount routes
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('error', {
    error: {
      status: err.status || 500,
      name: err.name,
      message: err.message
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

## Building a Blog Post Management System

Let’s create a blog post management system with MongoDB, Mongoose, and an EJS frontend.

**Step 1: Complete Post Routes**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('posts', { posts });
  } catch (err) {
    next(err);
  }
});

router.get('/new', (req, res) => {
  res.render('new-post');
});

router.post('/', async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    res.render('post', { post });
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
  <a href="/posts/new" class="new-post-btn">New Post</a>
  <div class="post-list">
    <% posts.forEach(post => { %>
      <div class="post-card">
        <a href="/posts/<%= post._id %>"><%= post.title %></a>
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
  <form action="/posts" method="POST">
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
    <a href="/posts">Back to Posts</a>
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
    <a href="/posts">Back to Posts</a>
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
    <a href="/posts">Back to Posts</a>
  </div>
</body>
</html>
```

::

**Test URLs**:
- `http://localhost:3000/posts` → Lists all posts
- `http://localhost:3000/posts/new` → Shows form to create a new post
- `http://localhost:3000/posts/12345` → Shows post details (if exists)
- `http://localhost:3000/posts/999` → Renders error page: `Error 404: Post not found`

**Note**: Install dependencies: `npm install express mongoose ejs`.

## Best Practices

### 1. **Define Clear Schemas**
Use Mongoose schemas to enforce data structure and validation.

### 2. **Handle Errors Gracefully**
Catch and handle MongoDB errors (e.g., validation, connection issues) with middleware.

### 3. **Use Async/Await**
Leverage `async/await` for clean asynchronous database operations.

### 4. **Secure Connection Strings**
Store MongoDB connection strings in environment variables (e.g., using `dotenv`).

```javascript
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);
```

### 5. **Optimize Queries**
Use `find()`, `findById()`, and sorting to fetch only necessary data.

## Common Patterns

### Query Filtering
Filter posts by author or date:

```javascript
router.get('/', async (req, res, next) => {
  try {
    const query = {};
    if (req.query.author) query.author = req.query.author;
    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.render('posts', { posts });
  } catch (err) {
    next(err);
  }
});
```

### Populate Related Data
For related collections (e.g., comments for posts):

```javascript
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  text: String
});

router.get('/:id', async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('comments');
});
```

## What's Next?

You’ve mastered MongoDB with Mongoose in Express.js! In the next tutorial, we’ll cover **CRUD Operations API**, where you’ll learn how to build a complete RESTful API for creating, reading, updating, and deleting resources.

### Key Takeaways:
- MongoDB is a NoSQL database; Mongoose is an ODM for structured interaction
- Connect to MongoDB using `mongoose.connect()`
- Define schemas and models for data structure
- Perform CRUD operations with Mongoose methods
- Handle database errors with middleware
- Use EJS for dynamic, data-driven frontends
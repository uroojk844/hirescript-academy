---
title: Express Router Module
description: Learn how to organize your Express.js routes using the Express Router module to create modular, maintainable, and scalable application structures.
navigation:
  order: 11
---

# Express Router Module

Welcome to the Express Router Module lesson! In this tutorial, you’ll learn how to use the Express Router to organize your application’s routes into modular, reusable files. This approach improves code maintainability and scalability, making it easier to manage complex applications.

In this tutorial, you’ll learn:

- What the Express Router is and its benefits
- Creating and using Router instances
- Organizing routes into separate modules
- Applying middleware to specific routes
- Handling route parameters and query strings with Router
- Building a modular API structure

## What is the Express Router?

The Express Router is a built-in middleware that allows you to group related routes and middleware into modular units. Instead of defining all routes in a single file, you can split them into separate files for better organization.

**Benefits**:
- Modular code structure
- Reusable route logic
- Easier maintenance for large applications
- Scoped middleware application

## Creating a Basic Router

The `Router` class in Express allows you to define routes similar to the main `app` object but in a modular way.

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('List of users');
});

router.get('/:id', (req, res) => {
  res.send(`User details for ID: ${req.params.id}`);
});

module.exports = router;
```

::

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

// Import the users router
const usersRouter = require('./routes/users');

// Use the router with a base path
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Explanation**:
- `express.Router()` creates a new router instance.
- Routes are defined on the router (e.g., `router.get()`).
- `app.use('/users', usersRouter)` mounts the router at `/users`, so:
  - `/users` maps to the first route.
  - `/users/:id` maps to the second route.

**Test URLs**:
- `http://localhost:3000/users` → `List of users`
- `http://localhost:3000/users/123` → `User details for ID: 123`

## Organizing Routes into Modules

Let’s create a modular structure with separate routers for users and products.

**Step 1: Create User Routes**

::Editor
#title
routes/users.js

#default

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json({ id, name: `User ${id}` });
});

module.exports = router;
```

::

**Step 2: Create Product Routes**

::Editor
#title
routes/products.js

#default

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }]);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json({ id, name: `Product ${id}` });
});

module.exports = router;
```

::

**Step 3: Mount Routers in Main App**

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

// Import routers
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

// Mount routers
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test URLs**:
- `http://localhost:3000/users` → `[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]`
- `http://localhost:3000/products/1` → `{ id: 1, name: "Product 1" }`

## Applying Middleware to Routers

You can apply middleware to a specific router to handle tasks like authentication or logging.

::Editor
#title
routes/admin.js

#default

```javascript
const express = require('express');
const router = express.Router();

// Middleware for admin routes
const authMiddleware = (req, res, next) => {
  const isAdmin = req.query.isAdmin === 'true'; // Simulated auth
  if (!isAdmin) {
    return res.status(403).send('Access denied');
  }
  next();
};

// Apply middleware to all routes in this router
router.use(authMiddleware);

router.get('/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

router.get('/settings', (req, res) => {
  res.send('Admin Settings');
});

module.exports = router;
```

::

**Update `app.js`**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

const adminRouter = require('./routes/admin');

app.use('/admin', adminRouter);

app.listen(3000);
```

::

**Test URLs**:
- `http://localhost:3000/admin/dashboard?isAdmin=true` → `Admin Dashboard`
- `http://localhost:3000/admin/dashboard` → `Access denied`

## Handling Route Parameters and Query Strings

Routers can handle parameters and query strings just like the main app.

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();

router.get('/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  
  res.json({
    postId,
    page,
    comments: Array.from({ length: limit }, (_, i) => ({
      id: i + 1 + (page - 1) * limit,
      text: `Comment ${i + 1} for post ${postId}`
    }))
  });
});

module.exports = router;
```

::

**Mount in `app.js`**:
```javascript
app.use('/posts', postsRouter);
```

**Test URL**: `http://localhost:3000/posts/123/comments?page=2&limit=3`
**Expected Output**:
```json
{
  "postId": "123",
  "page": 2,
  "comments": [
    { "id": 4, "text": "Comment 1 for post 123" },
    { "id": 5, "text": "Comment 2 for post 123" },
    { "id": 6, "text": "Comment 3 for post 123" }
  ]
}
```

## Building a Modular API Structure

Let’s create a small blog API with separate routers for posts and comments, using EJS for a simple frontend.

**Step 1: Set Up Post Routes**

::Editor
#title
routes/posts.js

#default

```javascript
const express = require('express');
const router = express.Router();

// Sample data
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' }
];

router.get('/', (req, res) => {
  res.render('posts', { posts });
});

router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.render('post', { post });
});

module.exports = router;
```

::

**Step 2: Set Up Comment Routes**

::Editor
#title
routes/comments.js

#default

```javascript
const express = require('express');
const router = express.Router();

const comments = [
  { id: 1, postId: 1, text: 'Great post!' },
  { id: 2, postId: 1, text: 'Thanks for sharing.' }
];

router.get('/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const postComments = comments.filter(c => c.postId === postId);
  res.json(postComments);
});

module.exports = router;
```

::

**Step 3: Main App**

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Import routers
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// Mount routers
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Step 4: Create EJS Templates**

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
  </style>
</head>
<body>
  <h1>Blog Posts</h1>
  <div class="post-list">
    <% posts.forEach(post => { %>
      <div class="post-card">
        <a href="/posts/<%= post.id %>"><%= post.title %></a>
        <p><%= post.content.substring(0, 50) %>...</p>
      </div>
    <% }); %>
  </div>
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
    a { color: #3b82f6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1><%= post.title %></h1>
  <div class="post-content">
    <p><%= post.content %></p>
    <a href="/posts">Back to Posts</a>
  </div>
</body>
</html>
```

::

**Test URLs**:
- `http://localhost:3000/posts` → Lists all posts
- `http://localhost:3000/posts/1` → Shows details of post ID 1
- `http://localhost:3000/comments/1` → Returns comments for post ID 1

## Best Practices

### 1. **Organize Routes Logically**
Group related routes (e.g., `/users`, `/products`) into separate router files.

### 2. **Use Descriptive File Names**
Name router files clearly (e.g., `users.js`, `products.js`) to reflect their purpose.

### 3. **Apply Middleware Sparingly**
Use router-specific middleware for tasks like authentication, but avoid overusing it to keep routes lightweight.

### 4. **Handle Errors Locally**
Define error-handling middleware in routers when needed to keep error logic modular.

```javascript
router.use((err, req, res, next) => {
  res.status(500).send('Something went wrong in this route');
});
```

### 5. **Keep Routes RESTful**
Follow REST conventions (e.g., `GET /users`, `POST /users`, `GET /users/:id`).

## Common Patterns

### Nested Routes
For hierarchical resources (e.g., comments under posts):

```javascript
router.use('/:postId/comments', commentsRouter);
```

### Versioned APIs
Use routers for API versioning:

```javascript
app.use('/api/v1/users', usersRouterV1);
app.use('/api/v2/users', usersRouterV2);
```

## What's Next?

You’ve mastered the Express Router module! In the next tutorial, we’ll cover **Error Handling Middleware**, where you’ll learn how to handle errors gracefully in your Express.js applications to improve reliability
---
title: File Upload Multer
description: Learn how to handle file uploads in Express.js using Multer, including secure file storage, validation, and integration with MongoDB for metadata management.
navigation:
  order: 18
---

# File Upload Multer

Welcome to the File Upload Multer lesson! In this tutorial, you’ll learn how to handle file uploads in your Express.js application using the `multer` middleware. This is useful for features like profile picture uploads, document uploads, or media management in web applications.

In this tutorial, you’ll learn:

- What Multer is and its role in file uploads
- Setting up Multer for file handling
- Validating and filtering uploaded files
- Storing files on disk or in memory
- Integrating file uploads with MongoDB
- Building a photo upload API with metadata

## What is Multer?

**Multer** is a middleware for Express.js that handles `multipart/form-data`, primarily used for file uploads. It processes files sent from forms or API requests, making them accessible in your application.

**Key Features**:
- File storage (disk or memory)
- File validation (size, type)
- Multiple file uploads
- Integration with forms and APIs

## Setting Up Multer

**Installation**:
```bash
npm install multer
```

**Basic File Upload**:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const multer = require('multer');
const app = express();

// Configure Multer
const upload = multer({ dest: 'uploads/' }); // Store files in 'uploads' folder

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ 
    message: 'File uploaded', 
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test with Postman**:
- Method: POST
- URL: `http://localhost:3000/upload`
- Body: `form-data`, key: `file`, value: (select a file, e.g., `image.jpg`)

**Expected Response**:
```json
{
  "message": "File uploaded",
  "file": {
    "filename": "a1b2c3d4e5f6",
    "originalname": "image.jpg",
    "size": 123456
  }
}
```

**Note**: Create an `uploads/` folder in your project root.

## Configuring Multer Storage

### Disk Storage
Customize file names and destination.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded', filename: req.file.filename });
});

app.listen(3000);
```

::

**Output Filename**: `file-1633041234567-987654321.jpg`

### Memory Storage
Store files in memory (useful for cloud storage integration).

::Editor
#title
app.js

#default

```javascript
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File in memory', buffer: req.file.buffer.length });
});
```

::

## Validating and Filtering Files

Restrict file types and sizes.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, jpeg, png) allowed'));
  }
});

app.post('/upload', upload.single('photo'), (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    res.json({ message: 'Image uploaded', filename: req.file.filename });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.listen(3000);
```

::

**Test Cases**:
- Upload `image.jpg` → Success
- Upload `doc.pdf` → `{ "error": "Only images (jpg, jpeg, png) allowed" }`
- Upload file >5MB → `{ "error": "File too large" }`

## Integrating with MongoDB

Store file metadata in MongoDB using Mongoose.

**Step 1: Photo Model**

::Editor
#title
models/photo.js

#default

```javascript
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', photoSchema);
```

::

**Step 2: Photo Routes**

::Editor
#title
routes/photos.js

#default

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Photo = require('../models/photo');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    if (filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

// Middleware to check authentication (simplified)
const authenticate = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

router.post('/', authenticate, upload.single('photo'), async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error('No file uploaded');
      err.status = 400;
      throw err;
    }
    const photo = new Photo({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedBy: req.session.user.id
    });
    await photo.save();
    res.json({ message: 'Photo uploaded', photo });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const photos = await Photo.find().populate('uploadedBy', 'username');
    res.json(photos);
  } catch (err) {
    next(err);
  }
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
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Session setup for authentication
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('/photos', require('./routes/photos'));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.name,
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

**Test Flow**:
1. Login via session (from previous lessons) to set `req.session.user`.
2. POST `/photos` with `form-data` (key: `photo`, value: `image.jpg`) → `{ "message": "Photo uploaded", "photo": {...} }`
3. GET `/photos` → List of photo metadata with user info.

**Note**: Install dependencies: `npm install express mongoose express-session multer`.

## Adding a Frontend (Optional)

Add an EJS form for uploading photos.

::Editor
#title
views/upload.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upload Photo</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 20px; }
    form { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: 600; }
    input[type="file"] { width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 4px; }
    button { background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #2563eb; }
    a { color: #3b82f6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Upload Photo</h1>
  <form action="/photos" method="POST" enctype="multipart/form-data">
    <div class="form-group">
      <label for="photo">Choose Photo</label>
      <input type="file" id="photo" name="photo" accept="image/*" required>
    </div>
    <button type="submit">Upload</button>
    <a href="/posts">Back to Posts</a>
  </form>
</body>
</html>
```

::

**Update Routes**:

```javascript
router.get('/upload', authenticate, (req, res) => {
  res.render('upload');
});

router.post('/', authenticate, upload.single('photo'), async (req, res, next) => {
  try {
    const photo = new Photo({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedBy: req.session.user.id
    });
    await photo.save();
    res.redirect('/posts'); // Or show success page
  } catch (err) {
    next(err);
  }
});
```

## Best Practices

### 1. **Validate File Types**
Always filter file types to prevent malicious uploads.

### 2. **Limit File Size**
Set `limits.fileSize` to avoid server overload.

### 3. **Secure File Storage**
Store files outside public directories; serve via routes if needed.

### 4. **Sanitize Filenames**
Use `multer.diskStorage` to generate safe filenames.

### 5. **Use Cloud Storage for Scale**
For production, use AWS S3 or Cloudinary with `multer`.

## Common Patterns

### Multiple Files
Handle multiple uploads:

```javascript
upload.array('photos', 5); // Max 5 files
```

### File Serving
Serve uploaded files:

```javascript
app.get('/files/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});
```

## What's Next?

You’ve mastered file uploads with Multer in Express.js! In the next tutorial, we’ll cover **Security Best Practices**, where you’ll learn how to secure your Express applications against common vulnerabilities.

### Key Takeaways:
- Multer handles `multipart/form-data` for file uploads
- Configure storage with disk or memory options
- Validate file types and sizes for security
- Store file metadata in MongoDB
- Integrate with authentication for user-specific uploads
- Use forms for user-friendly file uploads
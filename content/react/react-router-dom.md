---
title: React Router
description: Learn how to use React Router for navigation and creating multiple pages in a React single-page application.
navigation:
  order: 13
---

# React Router

**React Router** is a library that enables **client-side routing** in React apps.  
It allows you to navigate between different components (pages) without reloading the browser.

---

## 1. Installing React Router

```bash
npm install react-router-dom
```

## 2. Basic Setup
::Editor
#title
App.js
#default
```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
```
::
## 3. Creating Pages
### Home.js
::Editor
#title
Home.js
#default
```jsx
import React from "react";

function Home() {
  return <h1>Home Page</h1>;
}

export default Home;
```
::

### About.js
::Editor
#title
About.js

#default
```jsx
import React from "react";

function About() {
  return <h1>About Page</h1>;
}

export default About;
```
::
## 4. Navigating Programmatically
::Editor
#title
App.js
#default
```jsx
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/about")}>Go to About</button>
    </div>
  );
}
```
::
## 5. Dynamic Routes
::Editor
#title
App.js
#default
```jsx
<Routes>
  <Route path="/user/:id" element={<User />} />
</Routes>
```
::

### User.js
::Editor
#title
User.js
#default
```jsx
import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}

export default User;
```
::
## 6. Nested Routes
::Editor
#title
App.js
#default
```jsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```
::
✅ You’ve now learned how to use React Router to create navigable single-page applications.
Next, we’ll cover React Forms with Validation.
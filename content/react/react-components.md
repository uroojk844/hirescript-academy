---
title: React Components
description: Learn about React components, the building blocks of a React application.
navigation:
  order: 4
---

# React Components

Components are the **building blocks** of React applications.  
They allow you to split the UI into **reusable, independent pieces**.

---

## 1. What is a Component?

A component is a **JavaScript function** (or class) that returns JSX.  

There are **two main types** of components:
- **Functional Components** (modern, recommended)
- **Class Components** (older, less common)

---

## 2. Functional Components

A **functional component** is a plain JavaScript function that returns JSX.

::Editor
#title
App.js
#default
```jsx
import React from "react";

function Welcome() {
  return <h1>Hello from a Functional Component!</h1>;
}

function App() {
  return (
    <div>
      <Welcome />
      <p>This is the App component.</p>
    </div>
  );
}

export default App;
```
::

`<Welcome />` is a component being used inside another component.

Component names must start with a capital letter.

### 3. Class Components
Class components were common before React Hooks.
::Editor
#title
App.js
#default

```jsx
import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return <h1>Hello from a Class Component!</h1>;
  }
}

function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}

export default App;
```
::

⚠️ Today, functional components + hooks are preferred.

### 4. Reusable Components
You can create reusable components for buttons, cards, etc.

::Editor
#title
Button.js
#default

```jsx
import React from "react";

function Button({ text }) {
  return <button>{text}</button>;
}

export default Button;
```
::

::Editor
#title
App.js
#default

```jsx
import React from "react";
import Button from "./Button";

function App() {
  return (
    <div>
      <h1>Reusable Components</h1>
      <Button text="Click Me" />
      <Button text="Submit" />
    </div>
  );
}

export default App;
```
::

Here, the same Button component is reused with different props.

### 5. Nesting Components
Components can contain other components.

::Editor
#title
App.js
#default
```jsx
Copy code
function Header() {
  return <h2>This is a Header</h2>;
}

function Footer() {
  return <p>This is a Footer</p>;
}

function App() {
  return (
    <div>
      <Header />
      <p>Main Content goes here.</p>
      <Footer />
    </div>
  );
}
```
::

### 6. Component Best Practices
Keep components small and focused.

Use PascalCase for component names.

Reuse components where possible.

Prefer functional components over class components.

✅ You’ve now learned about React Components.
Next, we’ll explore Props in React to pass data between components.
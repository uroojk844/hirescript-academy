---
title: React Error Boundaries
description: Learn how to handle runtime errors in React components gracefully using Error Boundaries.
navigation:
  order: 19
---

# React Error Boundaries

React components can sometimes crash due to **runtime errors**.  
**Error Boundaries** help catch these errors and display a fallback UI instead of breaking the entire app.

---

## 1. Creating an Error Boundary

Error boundaries are **class components** that implement either `static getDerivedStateFromError` or `componentDidCatch`.
::Editor
#title
App.js
#default
```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error (can be sent to monitoring service)
    console.log("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
::

## 2. Using Error Boundary
::Editor
#title
App.js
#default
```jsx
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;
```
::
## 3. Example of a Buggy Component
::Editor
#title
App.js
#default
```jsx
import React from "react";

function BuggyComponent() {
  const handleClick = () => {
    throw new Error("Oops! Something went wrong.");
  };

  return <button onClick={handleClick}>Click to Crash</button>;
}

export default BuggyComponent;
```
::
## 4. Key Points
Error Boundaries only catch errors in children, not in themselves.

Cannot catch errors in event handlers (use try-catch instead).

Provides a graceful fallback UI to avoid app crash.

✅ You’ve learned how to handle runtime errors gracefully using React Error Boundaries.
Next, we’ll cover React Portals for rendering components outside the parent DOM hierarchy.
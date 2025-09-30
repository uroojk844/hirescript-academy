---
title: React Portals
description: Learn how to render React components outside the parent DOM hierarchy using React Portals.
navigation:
  order: 20
---

# React Portals

**React Portals** allow you to render a component **outside its parent DOM node**, while keeping it part of the React tree.  
Useful for modals, tooltips, and overlays.

---

## 1. Basic Portal Example
::Editor
#title
App.js
#default
```jsx
import React from "react";
import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div style={{ background: "white", padding: "20px", border: "1px solid black" }}>
      {children}
    </div>,
    document.getElementById("portal-root") // Target DOM node
  );
}

export default Modal;
```
::
## 2. Using the Portal in App
::Editor
#title
App.js
#default
```jsx
import React, { useState } from "react";
import Modal from "./Modal";

function App() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h1>React Portal Example</h1>
      <button onClick={() => setShow(true)}>Open Modal</button>
      {show && (
        <Modal>
          <h2>Modal Content</h2>
          <button onClick={() => setShow(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
```
::
## 3. HTML Setup
::Editor
#title
index.html
#default
```html
<body>
  <div id="root"></div>
  <div id="portal-root"></div>
</body>
```
::

#root → main React app.

#portal-root → container for modals or portal content.

## 4. When to Use Portals
Modals and dialogs

Tooltips

Dropdowns or overlays

Notifications

✅ You’ve learned how to use React Portals to render components outside the parent DOM hierarchy.
Next, we’ll cover React Suspense and Lazy Loading for code splitting.
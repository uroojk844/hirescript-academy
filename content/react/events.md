---
title: Event Handling in React
description: Learn how to handle events like clicks, inputs, and form submissions in React.
navigation:
  order: 7
---

# Event Handling in React

Events allow users to **interact** with your application, such as clicking a button, typing in an input, or submitting a form.  
React uses **camelCase** event names and passes event handlers as **functions**.

---

## 1. Handling Click Events

::Editor
#title
App.js
#default
```jsx
import React from "react";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```
::

Use `onClick` (not onclick).

Event handlers should be functions.

## 2. Passing Arguments to Event Handlers
You can pass arguments using arrow functions.

::Editor
#title
App.js
#default
```jsx

<button onClick={() => greetUser("Adnan")}>Greet</button>
```
::
::Editor
#title
App.js
#default
```jsx
const greetUser = (name) => {
  alert(`Hello, ${name}!`);
};
```
::
## 3. Handling Input Events
::Editor
#title
App.js
#default

```jsx
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>You typed: {text}</p>
    </div>
  );
}

export default App;
```
::

Here:

`onChange` listens for input changes.

`e.target.value` gives the input value.

## 4. Handling Form Submission
::Editor
#title
App.js
#default

```jsx
import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    alert(`Form submitted! Name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```
::

## 5. Event Object
Every event handler receives an event object (usually e).

Example:
::Editor
#title
App.js
#default
```jsx
function handleClick(e) {
  console.log("Event:", e);
}
```
::

## 6. Common React Events
::Editor
#title
App.js
#default
```jsx
Event	     Usage
`onClick`	Button clicks
`onChange`	Input/textarea changes
`onSubmit`	Form submissions
`onMouseEnter`	Mouse hover
`onKeyDown`	Key press

```
::

## 7. Best Practices
Define event handlers outside JSX (avoid inline code for complex logic).

Use arrow functions when passing arguments.

Always call `e.preventDefault()` for forms if you don’t want reloads.

✅ You’ve now learned about Event Handling in React.
Next, we’ll cover Conditional Rendering in React.
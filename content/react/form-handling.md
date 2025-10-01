---
title: Forms and User Input in React
description: Learn how to create forms, capture user input, and manage controlled components in React.
navigation:
  order: 9
---

# Forms and User Input in React

Forms allow users to interact with your app by entering data.  
In React, form elements like `<input>`, `<textarea>`, and `<select>` are usually **controlled components** — their values are managed by React state.

---

## 1. Handling Input with State
::Editor
#title
App.js
#default
```jsx
import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <h1>Hello, {name || "Guest"}!</h1>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </div>
  );
}

export default App;
```
::

## 2. Handling Multiple Inputs
::Editor
#title
App.js
#default
```jsx
import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```
::
## 3. Controlled vs Uncontrolled Components
Controlled Component: Value is managed by React state.

Uncontrolled Component: Value is managed by the DOM (using ref).

Example (uncontrolled input):

::Editor
#title
App.js
#default
```jsx
import React, { useRef } from "react";

function App() {
  const inputRef = useRef();

  function handleSubmit() {
    alert(`You entered: ${inputRef.current.value}`);
  }

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Type something" />
      <button onClick={handleSubmit}>Show Value</button>
    </div>
  );
}

export default App;
```
::
## 4. Handling Textarea and Select
::Editor
#title
App.js
#default
```jsx
function App() {
  const [bio, setBio] = useState("");
  const [fruit, setFruit] = useState("Mango");

  return (
    <div>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write about yourself..."
      />

      <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
        <option>Apple</option>
        <option>Banana</option>
        <option>Mango</option>
      </select>

      <p>Your favorite fruit is: {fruit}</p>
    </div>
  );
}
```
::
✅ You’ve learned how to handle forms and user input in React.
Next, we’ll explore Conditional Rendering.
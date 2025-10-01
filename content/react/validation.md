---
title: React Forms with Validation
description: Learn how to add validation to React forms using state and simple validation logic.
navigation:
  order: 9
---

# React Forms with Validation

Forms are an important part of web apps, but you often need to **validate user input** before submission.  
React allows you to add validation using **state** and **event handlers**.

---

## 1. Simple Form Validation
::Editor
#title
App.js
#default
```jsx
import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
    } else {
      setError("");
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```
::
## 2. Multiple Field Validation
::Editor
#title
App.js
#default
```jsx
import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```
::
## 3. Real-time Validation
::Editor
#title
App.js
#default
```jsx
<input
  type="text"
  name="email"
  value={form.email}
  onChange={(e) => {
    handleChange(e);
    if (!e.target.value.includes("@")) {
      setErrors({ ...errors, email: "Invalid email" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  }}
/>
```
::
## 4. Tips for Validation
Always prevent default form submission using `e.preventDefault()`.

Use state to track errors and display messages.

For complex forms, consider libraries like Formik or React Hook Form.
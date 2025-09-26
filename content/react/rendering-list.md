---
title: Rendering Lists in React
description: Learn how to render lists of data using the map() function and the importance of keys in React.
navigation:
  order: 8
---

# Rendering Lists in React

In React, you can render multiple items dynamically using the **`map()`** function.  
Each item should have a unique **`key`** to help React efficiently update the UI.

---

## 1. Rendering an Array of Strings
::Editor
#title
App.js
#default
```jsx
import React from "react";

function App() {
  const fruits = ["Apple", "Banana", "Mango", "Orange"];

  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
```
::

## 2. Rendering an Array of Objects
::Editor
#title
App.js
#default
```jsx
function App() {
  const users = [
    { id: 1, name: "Adnan", age: 21 },
    { id: 2, name: "Sara", age: 19 },
    { id: 3, name: "Ali", age: 22 },
  ];

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
}
```
::

## 3. Rendering Components from a List
::Editor
#title
App.js
#default
```jsx
function User({ name, age }) {
  return (
    <p>
      {name} - {age} years old
    </p>
  );
}

function App() {
  const users = [
    { id: 1, name: "Adnan", age: 21 },
    { id: 2, name: "Sara", age: 19 },
    { id: 3, name: "Ali", age: 22 },
  ];

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <User key={user.id} name={user.name} age={user.age} />
      ))}
    </div>
  );
}

export default App;
```
::

## 4. Keys in Lists
Keys should be unique and stable (preferably IDs from data).

Avoid using index as a key unless you have no better option.

Example:
::Editor
#title
App.js
#default
```jsx
<li key={user.id}>{user.name}</li>
```
::

✅ You’ve learned how to render lists in React.
Next, we’ll cover Forms and User Input Handling.
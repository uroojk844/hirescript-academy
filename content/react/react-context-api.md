---
title: useEffect Hook and Lifecycle in React
description: Learn how to use the useEffect hook to handle side effects such as fetching data, subscriptions, and DOM updates.
navigation:
  order: 10
---

# useEffect Hook and Lifecycle in React

In React, the **`useEffect` hook** lets you perform **side effects** in functional components.  
Side effects are tasks like fetching data, updating the DOM, setting up timers, or subscribing to services.

---

## 1. Basic useEffect
::Editor
#title
App.js
#default
```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component rendered or updated!");
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}

export default App;
```
::

👉 Runs after every render (initial + updates).

## 2. Running Effect Once (on Mount)
::Editor
#title
App.js
#default
```jsx
useEffect(() => {
  console.log("Component mounted!");
}, []);
```
::
👉 Empty dependency array ([]) = run only once (like componentDidMount).

## 3. Running Effect on Specific State Change
::Editor
#title
App.js
#default
```jsx
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);
```
::
👉 Runs only when count changes.

## 4. Cleanup in useEffect
Some effects (like timers or subscriptions) need cleanup to avoid memory leaks.
::Editor
#title
App.js
#default
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer running...");
  }, 1000);

  return () => {
    clearInterval(timer); // Cleanup
    console.log("Timer stopped!");
  };
}, []);
```
::
## 5. Fetching Data with useEffect
::Editor
#title
App.js
#default
```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```
::
## 6. useEffect Lifecycle Summary
`useEffect(..., [])` → Run once (mount).

`useEffect(..., [dependencies])` → Run when dependencies change.

`useEffect(..., )` → Run after every render.

`return () => { ... }` → Cleanup (like componentWillUnmount).

✅ You’ve learned how to use useEffect for side effects and lifecycle management.
Next, we’ll dive into useContext Hook (React Context API) for state sharing.
---
title: React Performance Optimization
description: Learn how to optimize React components using React.memo, useMemo, and useCallback to prevent unnecessary re-renders.
navigation:
  order: 12
---

# React Performance Optimization

React apps can slow down if components re-render unnecessarily.  
Performance optimization techniques help **reduce re-renders** and **improve efficiency**.

---

## 1. React.memo

`React.memo` is a **Higher-Order Component** that prevents re-rendering if props haven't changed.
::Editor
#title
App.js
#default
```jsx
import React from "react";

const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <p>Child: {name}</p>;
});

function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("Adnan");

  return (
    <div>
      <Child name={name} />
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
    </div>
  );
}

export default App;
```
::
✔️ Notice: Child does not re-render when count changes.

## 2. useMemo
useMemo memoizes expensive calculations so they are only recalculated when dependencies change.
::Editor
#title
App.js
#default
```jsx
import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(5);

  const factorial = useMemo(() => {
    console.log("Calculating factorial...");
    const calc = (n) => (n <= 1 ? 1 : n * calc(n - 1));
    return calc(num);
  }, [num]);

  return (
    <div>
      <p>Factorial of {num} is {factorial}</p>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <input type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} />
    </div>
  );
}

export default App;
```
::
✔️ Notice: Factorial is recalculated only when num changes, not when count changes.

## 3. useCallback
useCallback memoizes functions, preventing re-creation on every render.
::Editor
#title
App.js
#default
```jsx
import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    alert("Button clicked!");
  }, []);

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
    </div>
  );
}

export default App;
```
::
✔️ Notice: Child does not re-render unless onClick changes.

## 4. Tips for Optimization
Use `React.memo` for pure functional components.

Use `useMemo` for expensive calculations.

Use `useCallback` for stable function references.

Avoid unnecessary state updates.

Split components to reduce re-rendering of large trees.

✅ You’ve learned how to optimize React components for better performance.
Next, we’ll cover React Context + useReducer for State Management.
---
title: useReducer Hook in React
description: Learn how to use the useReducer hook for advanced state management in React functional components.
navigation:
  order: 12
---

# useReducer Hook in React

The **useReducer** hook is an alternative to useState for managing **complex state logic**.  
It is especially useful when the next state depends on the **previous state** or when handling **multiple state values**.

---

## 1. Basic useReducer Example
::Editor
#title
App.js
#default
```jsx
import React, { useReducer } from "react";

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}

export default App;
```
::
`state` → current state.

`dispatch` → function to send actions to the reducer.

`reducer` → pure function that returns the new state.

## 2. Multiple State Values
::Editor
#title
App.js
#default
```jsx
function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setAge":
      return { ...state, age: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { name: "", age: 0 });

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={state.name}
        onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={state.age}
        onChange={(e) => dispatch({ type: "setAge", payload: e.target.value })}
      />
      <p>
        Name: {state.name}, Age: {state.age}
      </p>
    </div>
  );
}
```
::
## 3. Advantages of useReducer
Centralizes state logic in a reducer function.

Easier to debug than multiple useState calls.

Works well for complex state updates.

✅ You’ve now learned useReducer for advanced state management.
Next, we’ll cover React Router for navigation in single-page applications.
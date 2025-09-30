---
title: React Context + useReducer
description: Learn how to combine React Context API with useReducer for scalable global state management.
navigation:
  order: 12
---

# React Context + useReducer

For large applications, **combining Context API with useReducer** provides a clean and scalable way to manage global state.

---

## 1. Setting Up Context and Reducer
::Editor
#title
App.js
#default
```jsx
import React, { createContext, useReducer, useContext } from "react";

// 1. Create Context
const CounterContext = createContext();

// 2. Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```
::
## 2. Creating a Provider
::Editor
#title
App.js
#default
```jsx
export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
```
::
## 3. Consuming Context in Components
::Editor
#title
App.js
#default
```jsx
function CounterDisplay() {
  const { state } = useContext(CounterContext);
  return <h1>Count: {state.count}</h1>;
}

function CounterButtons() {
  const { dispatch } = useContext(CounterContext);
  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}
```
::
## 4. Using Provider in App
::Editor
#title
App.js
#default
```jsx
import React from "react";
import { CounterProvider } from "./CounterContext";
import CounterDisplay from "./CounterDisplay";
import CounterButtons from "./CounterButtons";

function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
      <CounterButtons />
    </CounterProvider>
  );
}

export default App;
```
::
## 5. Benefits
Centralized state management for multiple components.

Easy to scale for larger apps.

Combines useReducer’s predictable state updates with Context API’s global access.


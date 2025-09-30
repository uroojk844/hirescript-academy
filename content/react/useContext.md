---
title: useContext Hook and React Context API
description: Learn how to use React Context API and the useContext hook to manage and share state across components without prop drilling.
navigation:
  order: 11
---

# useContext Hook and React Context API

When multiple components need access to the same data, passing props manually (prop drilling) becomes inefficient.  
React provides the **Context API** to share state globally.  
The **`useContext` hook** makes consuming context simple.

---

## 1. Creating Context

::Editor
#title
App.js
#default
```jsx
import React, { createContext } from "react";
// Create a Context
export const ThemeContext = createContext("light");
```
::

## 2. Providing Context
::Editor
#title
App.js
#default
```jsx
import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Child from "./Child";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h1>App Component</h1>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle Theme
        </button>
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```
::
## 3. Consuming Context with useContext
::Editor
#title
App.js
#default
```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Child() {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <h2>Child Component</h2>
      <p>Current theme: {theme}</p>
    </div>
  );
}

export default Child;
```
::
## 4. Multiple Contexts
You can use more than one context:
::Editor
#title
App.js
#default
```jsx
const UserContext = React.createContext();
const ThemeContext = React.createContext();

function App() {
  return (
    <UserContext.Provider value={{ name: "Adnan" }}>
      <ThemeContext.Provider value="dark">
        <Dashboard />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

function Dashboard() {
  const user = React.useContext(UserContext);
  const theme = React.useContext(ThemeContext);

  return (
    <div>
      <h1>{user.name}'s Dashboard</h1>
      <p>Theme: {theme}</p>
    </div>
  );
}
```
::
## 5. When to Use Context?
When multiple components need the same state (e.g., theme, user, auth).

Avoid overusing it for every state — for complex cases, consider Redux or Zustand.
---
title: Conditional Rendering in React
description: Learn how to render components or elements conditionally using if statements, ternary operators, and logical operators in React.
navigation:
  order: 7
---

# Conditional Rendering in React

Sometimes you need to render different UI elements depending on conditions.  
React provides multiple ways to handle conditional rendering.

---

## 1. Using if Statements

::Editor
#title
App.js
#default
```jsx
import React from "react";

function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in.</h1>;
  }
}

export default App;
```
::

## 2. Using Ternary Operator

::Editor
#title
App.js
#default
```jsx
function App() {
  const isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}
    </div>
  );
}
```
::

## 3. Using Logical AND (&&)
Useful when you only want to show something if a condition is true.
::Editor
#title
App.js
#default
```jsx
function App() {
  const hasMessages = true;
  const messages = ["Hello", "React", "World"];

  return (
    <div>
      <h1>Messages</h1>
      {hasMessages && <p>You have {messages.length} new messages!</p>}
    </div>
  );
}
```
::

## 4. Inline Conditions
::Editor
#title
App.js
#default
```jsx
function App() {
  const age = 20;

  return (
    <div>
      <h1>{age >= 18 ? "You are an adult." : "You are underage."}</h1>
    </div>
  );
}
```
::

## 5. Rendering Different Components
::Editor
#title
App.js
#default
```jsx
function UserGreeting() {
  return <h1>Welcome back, User!</h1>;
}

function GuestGreeting() {
  return <h1>Hello, Guest! Please log in.</h1>;
}

function App() {
  const isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? <UserGreeting /> : <GuestGreeting />}
    </div>
  );
}


export default App;
```
::

✅ You’ve learned different ways to conditionally render elements in React.
Next, we’ll cover Rendering Lists to display dynamic collections of data.
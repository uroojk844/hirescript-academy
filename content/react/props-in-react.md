---
title: Props in React
description: Learn how to use props in React to pass data between components.
navigation:
  order: 5
---

# Props in React

**Props** (short for *properties*) are used to **pass data from one component to another**.  
They make components **dynamic and reusable**.

---

## 1. What are Props?

- Props are arguments passed to components, similar to function parameters.  
- They are **read-only** (cannot be modified inside the child component).  

---

## 2. Passing Props

Example of passing props:

::Editor
#title
App.js
#default
```jsx
import React from "react";

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Adnan" />
      <Welcome name="Aisha" />
      <Welcome name="John" />
    </div>
  );
}

export default App;
```
::

Here:

name="Adnan" is a prop.

Inside the component, we access it via props.name.

## 3. Destructuring Props
Instead of using props.name, you can destructure props:

::Editor
#title
App.js
#default
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```
::
## 4. Multiple Props
You can pass multiple props to a component.

::Editor
#title
App.js
#default

```jsx
import React from "react";

function User({ name, age }) {
  return (
    <p>
      {name} is {age} years old.
    </p>
  );
}

function App() {
  return (
    <div>
      <User name="Adnan" age={21} />
      <User name="Aisha" age={20} />
    </div>
  );
}

export default App;
```
::

## 5. Props with Functions
Props can also be functions.

::Editor
#title
App.js
#default

```jsx
import React from "react";

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <Button onClick={handleClick} text="Click Me" />
    </div>
  );
}

export default App;
```
::

## 6. Default Props
You can define default values for props.

::Editor
#title
App.js
#default
```jsx
function Greeting({ name = "Guest" }) {
  return <h2>Welcome, {name}!</h2>;
}
```
::
If no name prop is passed, it defaults to "Guest".

## 7. Props are Immutable
Props cannot be changed inside a component.

❌ Invalid:
::Editor
#title
App.js
#default
```jsx
props.name = "New Name"; // ❌ Error
```
::
✅ Instead, use state if you need to change data (we’ll cover in next topic).

## 8. Best Practices with Props
Use destructuring for cleaner code.

Keep prop names meaningful.

Use default props when needed.

You’ve now learned about Props in React.
Next, we’ll dive into State in React to handle dynamic data inside components
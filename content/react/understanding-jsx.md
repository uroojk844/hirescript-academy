---
title: Understanding JSX
description: Learn about JSX, the syntax extension for JavaScript that looks like HTML and is used in React.
navigation:
  order: 3
---

# Understanding JSX

JSX (**JavaScript XML**) is a syntax extension for JavaScript.  
It looks like HTML but works inside JavaScript code, making it easier to describe the UI.

---

## 1. What is JSX?

- JSX allows you to write HTML-like code inside JavaScript.  
- React then compiles JSX into JavaScript using tools like **Babel**.  

Example:

::Editor
#title
App.js
#default
```jsx
import React from "react";

function App() {
  return <h1>Hello, JSX!</h1>;
}

export default App;
```
::

Behind the scenes, the above JSX is converted to:
```js
React.createElement("h1", null, "Hello, JSX!");
```

## 2. Embedding Expressions in JSX
You can embed JavaScript expressions inside {} in JSX.



::Editor
#title
App.js
#default
```jsx
import React from "react";

function App() {
  const name = "Adnan";
  const year = new Date().getFullYear();

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Year: {year}</p>
    </div>
  );
}

export default App;
```
::

## 3. JSX Must Return a Single Parent Element
JSX expressions must have one parent element.
You can use <div> or React Fragments (<> </>).

✅ Correct:

::Editor
#title
app.js
#default
```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>Welcome to React</p>
  </div>
);
```
::
✅ Using Fragment:

::Editor
#title
app.js
#default
```jsx
Copy code
return (
  <>
    <h1>Hello</h1>
    <p>Welcome to React</p>
  </>
);
```
::
❌ Incorrect:

::Editor
#title
app.js
#default
```jsx
Copy code
return (
  <h1>Hello</h1>
  <p>Welcome to React</p>
);
```
::

## 4. JSX Attributes
JSX uses camelCase attributes instead of HTML attributes.

Example:

::Editor
#title
App.js
#default

```jsx
import React from "react";

function App() {
  return (
    <div>
      <h1 className="heading">Hello, JSX!</h1>
      <button onClick={() => alert("Button clicked!")}>Click Me</button>
    </div>
  );
}

export default App;
```
::

Use className instead of class.

Event handlers use camelCase (onClick, not onclick).

## 5. JavaScript in JSX
You can use any JavaScript expressions inside {}.

Example:
::Editor
#title
app.js
#default
```jsx
const items = ["React", "JSX", "Components"];

return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
```
::

## 6. JSX Best Practices
Wrap JSX in parentheses () for readability.

Always close tags (even `<img />` ).

Use meaningful class names and components.

✅ You’ve now learned JSX basics.
Next, we’ll move to React Components where JSX shines even more.
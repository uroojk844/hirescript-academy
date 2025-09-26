---
title: State in React
description: Learn how to use state in React to manage dynamic and changeable data in components.
navigation:
  order: 6
---

# State in React

**State** is used to store **dynamic data** in a component.  
While props are **read-only** and passed from parent → child, **state is managed inside a component** and can change over time.

---

## 1. What is State?

- State is an object that stores data about the component.  
- When state changes, React **re-renders** the component.  
- Unlike props, state is **mutable**.

---

## 2. Using useState Hook

React provides the **useState hook** to manage state in functional components.

::Editor
#title
App.js
#default
```jsx
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
```
::

count → current state value.

setCount → function to update state.

useState(0) → initializes state with value 0.


## 3. Updating State
State updates are asynchronous and should use the updater function if based on previous state.

✅ Correct:

::Editor
#title
App.js
#default
```jsx
setCount(prevCount => prevCount + 1);
```
::
## 4. Multiple State Variables
You can manage multiple states in one component.
::Editor
#title
App.js
#default

```jsx
import React, { useState } from "react";

function App() {
  const [name, setName] = useState("Guest");
  const [age, setAge] = useState(20);

  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <button onClick={() => setName("Adnan")}>Change Name</button>
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </div>
  );
}

export default App;
```
::

### 5. Objects in State
You can store objects in state.
::Editor
#title
App.js
#default
```jsx
const [user, setUser] = useState({ name: "Guest", age: 20 });

setUser({ ...user, age: user.age + 1 });
Always use the spread operator (...) to avoid losing other object properties.
```
::

## 6. Arrays in State
Arrays can also be stored in state.
::Editor
#title
App.js
#default

```jsx
import React, { useState } from "react";

function App() {
  const [items, setItems] = useState(["Apple", "Banana"]);

  const addItem = () => {
    setItems([...items, "Orange"]);
  };

  return (
    <div>
      <h1>Fruits</h1>
      <ul>
        {items.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Fruit</button>
    </div>
  );
}

export default App;
```
::

## 7. Props vs State
Feature	Props	State
Source	Passed from parent	Managed inside component
Read/Write	Read-only	Mutable
Purpose	Make components reusable	Handle dynamic data
Change triggers re-render?	Yes	Yes

## 8. Best Practices with State
Keep state as simple as possible.

Use separate state variables instead of deeply nested objects when possible.

Don’t modify state directly (always use setter function).

✅ You’ve now learned about State in React.
Next, we’ll explore Event Handling in React to make apps interactive.
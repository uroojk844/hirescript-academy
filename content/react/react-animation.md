---
title: React Animation with Framer Motion
description: Learn how to add smooth animations and transitions in React using the Framer Motion library.
navigation:
  order: 22
---

# React Animation with Framer Motion

**Framer Motion** is a popular library for adding **animations and gestures** in React apps.  
It is easy to use and integrates well with React components.

---

## 1. Installing Framer Motion

```bash
npm install framer-motion
```

## 2. Basic Animation Example
::Editor
#title
App.js
#default
```jsx
import React from "react";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: "lightblue", padding: "20px", textAlign: "center" }}
    >
      <h1>Welcome to React Animation!</h1>
    </motion.div>
  );
}

export default App;
```
::
initial → starting state of the animation.

animate → ending state.

transition → duration and easing of animation.

## 3. Hover and Tap Animations
::Editor
#title
App.js
#defaultHover and Tap Animations
```jsx
<motion.button
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9 }}
  style={{ padding: "10px 20px", fontSize: "16px" }}
>
  Click Me
</motion.button>
```
::
✔️ whileHover triggers on hover, whileTap triggers on click/tap.

## 4. Staggered Animations
::Editor
#title
App.js
#default
```jsx
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.2 } },
    hidden: {},
  }}
>
  {["Item 1", "Item 2", "Item 3"].map((item, index) => (
    <motion.li
      key={index}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```
::
✔️ Staggered animations make lists appear one after another smoothly.

## 5. Benefits of Framer Motion
Easy to integrate with React.

Smooth, high-performance animations.

Supports gestures, layout animations, and advanced effects.


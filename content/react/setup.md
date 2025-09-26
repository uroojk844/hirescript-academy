---
title: Setting Up React
description: Learn how to install Node.js, set up a React project using Create React App or Vite, and run your first React app.
navigation:
  order: 2
---

# Setting Up React

Before writing React code, we need to set up a development environment.



## 1. Install Node.js

React requires **Node.js** and **npm (Node Package Manager)**.  
Download from [Node.js official site](https://nodejs.org).

Check installation:

::Editor
#title
terminal
#default
```bash
node -v
npm -v
```

::


## 2. Create a React App

There are two popular ways to set up React: Create React App (CRA) and Vite.

a) Using Create React App (CRA)

::Editor
#title
terminal
#default

```bash
npx create-react-app my-app
cd my-app
npm start
```
::

This creates a React project named my-app and starts the development server.

b) Using Vite (Faster Alternative)

::Editor
#title
terminal
#default

```bash

npm create vite@latest my-app
cd my-app
npm install
npm run dev
```
::

When asked, choose:

Framework: React

Variant: JavaScript or TypeScript

## 3. Project Structure

A typical React project looks like this:


```bash
my-app/
├── node_modules/     # Dependencies
├── public/           # Public assets (index.html, favicon)
├── src/              # Source code
│   ├── App.js        # Main component
│   ├── index.js      # Entry point
│   └── styles.css    # Styles
├── package.json      # Project configuration
```


Key Files:

index.html → The root HTML file.

index.js → Entry point, renders React components into the DOM.

App.js → Main React component.

## 4. Run the App

Start the development server:

::Editor
#title
terminal
#default

```bash

npm start   # For CRA
npm run dev # For Vite

```
::

Then open http://localhost:3000
 (or port shown in terminal).

## 5. First React Component

Open App.js and update it:

::Editor
#title
App.js
#default
```jsx

import React from "react";

function App() {
  return (
    <div>
      <h1>Welcome to My First React App</h1>
      <p>Project setup successful!</p>
    </div>
  );
}

export default App;
```

::

Save → your browser will auto-refresh and show the updated component.
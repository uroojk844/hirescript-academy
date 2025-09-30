---
title: React Suspense & Lazy Loading
description: Learn how to use React Suspense and lazy loading to split code and load components only when needed.
navigation:
  order: 21
---

# React Suspense & Lazy Loading

**React Suspense** allows you to delay rendering of a component until some condition (like data loading or code loading) is met.  
**Lazy loading** helps load components **only when needed**, reducing initial bundle size.

---

## 1. Lazy Loading a Component
::Editor
#title
App.js
#default
```jsx
import React, { Suspense, lazy } from "react";

// Lazy load the component
const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      <h1>React Lazy Loading Example</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```
::
## 2. Lazy Component Example
::Editor
#title
App.js
#default
```jsx
import React from "react";

function LazyComponent() {
  return <h2>I am a lazy loaded component!</h2>;
}

export default LazyComponent;
```
::

## 3. Fallback UI
The fallback prop in `<Suspense>` is shown while the component is loading.

Can be spinner, text, or skeleton loaders.

## 4. Benefits of Lazy Loading
Reduces initial load time.

Splits code into smaller bundles.

Improves performance in large applications.

## 5. Suspense with Data Fetching (React 18+)
::Editor
#title
App.js
#default
```jsx
import React, { Suspense } from "react";
import { fetchData } from "./api";

const Resource = React.lazy(() => fetchData());

function App() {
  return (
    <Suspense fallback={<p>Loading data...</p>}>
      <Resource />
    </Suspense>
  );
}

export default App;
```
::
Note: For data fetching, you might need libraries like React Query or Relay.

✅ You’ve learned how to use React Suspense and lazy loading for better performance and code splitting.
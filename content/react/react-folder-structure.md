---
title: React Project Structure & Best Practices
description: Learn the recommended project structure and best practices for building scalable React applications.
navigation:
  order: 1
---

# React Project Structure & Best Practices

A well-organized project structure helps **maintainability**, **scalability**, and **team collaboration** in React applications.

---

## 1. Recommended Folder Structure
```
my-app/
├── public/ # Static assets (index.html, favicon)
├── src/
│ ├── assets/ # Images, fonts, icons
│ ├── components/ # Reusable components
│ ├── pages/ # Page components
│ ├── hooks/ # Custom hooks
│ ├── context/ # React Context providers
│ ├── services/ # API calls or utilities
│ ├── styles/ # Global styles and CSS modules
│ ├── App.js # Main component
│ ├── index.js # Entry point
│ └── routes/ # React Router route definitions
├── package.json
├── .gitignore
└── README.md
```

---

## 2. Naming Conventions

- **Components** → PascalCase (`Header.js`, `UserCard.js`)  
- **Hooks** → use prefix (`useAuth.js`, `useFetch.js`)  
- **Context** → PascalCase (`AuthContext.js`)  
- **Files** → kebab-case for non-components (`api-service.js`)  

---

## 3. Best Practices

- Use **functional components** with hooks.  
- Keep **components small and reusable**.  
- Split logic into **custom hooks**.  
- Use **Context + useReducer** for global state.  
- Use **React Router** for navigation.  
- Lazy load components using **React.lazy** and **Suspense**.  
- Keep styles modular (CSS modules or styled-components).  
- Write meaningful commit messages and maintain **version control**.  

---

## 4. Folder Example in Action

```jsx
// src/components/Button.js
export default function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

// src/pages/Home.js
import Button from "../components/Button";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={() => alert("Clicked!")}>Click Me</Button>
    </div>
  );
}
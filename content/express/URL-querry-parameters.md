---
title: URL Query Parameters
description: Learn how to work with URL query parameters for filtering, pagination, and building dynamic routes in Express.js
navigation:
  order: 10
---

# URL Query Parameters

Welcome to the URL Query Parameters lesson! In this tutorial, you'll learn how to work with query strings in URLs to create powerful filtering, sorting, pagination, and search functionality in your Express.js applications.

In this tutorial, you'll learn:

- What query parameters are and how they work
- Accessing query parameters in Express
- Building filter and search functionality
- Implementing pagination
- Handling multiple query parameters
- Default values and validation
- Building dynamic URLs

## What are Query Parameters?

Query parameters (or query strings) are key-value pairs that appear after the `?` in a URL. They provide additional information to the server without being part of the route path.

**URL Structure:**
```
https://example.com/products?category=electronics&sort=price&page=2
                     ↑        ↑
                   path    query string
```

**Breaking it down:**
- `?` - Starts the query string
- `category=electronics` - First parameter
- `&` - Separates multiple parameters
- `sort=price` - Second parameter
- `page=2` - Third parameter

## Accessing Query Parameters

Express automatically parses query parameters and makes them available through `req.query`.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/products', (req, res) => {
  console.log(req.query);
  // URL: /products?category=electronics&sort=price
  // Output: { category: 'electronics', sort: 'price' }
  
  const category = req.query.category;
  const sortBy = req.query.sort;
  const page = req.query.page;
  
  res.send(`Category: ${category}, Sort: ${sortBy}, Page: ${page}`);
});

app.listen(3000);
```

::

## Building a Product Filter System

Let's build a complete product filtering system with search, category filter, price range, and sorting.

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Sample product data
const products = [
  { id: 1, name: 'Laptop Pro', category: 'electronics', price: 1200, rating: 4.5, inStock: true },
  { id: 2, name: 'Wireless Mouse', category: 'electronics', price: 25, rating: 4.2, inStock: true },
  { id: 3, name: 'Office Chair', category: 'furniture', price: 350, rating: 4.7, inStock: false },
  { id: 4, name: 'Desk Lamp', category: 'furniture', price: 45, rating: 4.0, inStock: true },
  { id: 5, name: 'Keyboard', category: 'electronics', price: 80, rating: 4.3, inStock: true },
  { id: 6, name: 'Monitor', category: 'electronics', price: 300, rating: 4.6, inStock: true },
  { id: 7, name: 'Bookshelf', category: 'furniture', price: 150, rating: 4.4, inStock: true },
  { id: 8, name: 'Headphones', category: 'electronics', price: 120, rating: 4.8, inStock: false }
];

app.get('/products', (req, res) => {
  // Get query parameters with defaults
  const search = req.query.search || '';
  const category = req.query.category || 'all';
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || 10000;
  const sortBy = req.query.sort || 'name';
  const inStock = req.query.inStock === 'true';
  
  // Filter products
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesStock = !inStock || product.inStock === true;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });
  
  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name); // default: name
  });
  
  res.render('products', {
    products: filteredProducts,
    filters: {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy,
      inStock
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

::

::Editor
#title
views/products.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Catalog</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #f3f4f6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { color: #1f2937; margin-bottom: 30px; }
    
    .filter-bar { background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .filter-row { display: flex; gap: 15px; flex-wrap: wrap; align-items: flex-end; }
    .filter-group { flex: 1; min-width: 200px; }
    .filter-group label { display: block; margin-bottom: 5px; font-weight: 600; color: #374151; font-size: 14px; }
    .filter-group input, .filter-group select { width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 4px; font-size: 14px; }
    .filter-group input:focus, .filter-group select:focus { outline: none; border-color: #3b82f6; }
    
    .price-range { display: flex; gap: 10px; align-items: center; }
    .price-range input { width: 100px; }
    
    .checkbox-filter { display: flex; align-items: center; gap: 8px; margin-top: 25px; }
    .checkbox-filter input { width: auto; }
    
    button { background: #3b82f6; color: white; padding: 10px 25px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 600; }
    button:hover { background: #2563eb; }
    
    .results-info { margin: 20px 0; color: #6b7280; font-size: 14px; }
    
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    
    .product-card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.2s; }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    
    .product-name { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
    .product-category { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-bottom: 10px; }
    .product-price { font-size: 24px; font-weight: bold; color: #3b82f6; margin: 10px 0; }
    .product-rating { color: #f59e0b; margin-bottom: 10px; }
    .product-stock { font-size: 12px; font-weight: 600; }
    .in-stock { color: #10b981; }
    .out-stock { color: #ef4444; }
    
    .no-results { text-align: center; padding: 60px 20px; color: #6b7280; }
    .no-results h2 { margin-bottom: 10px; color: #1f2937; }
    
    .clear-filters { background: #6b7280; margin-left: 10px; }
    .clear-filters:hover { background: #4b5563; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Product Catalog</h1>
    
    <!-- Filter Form -->
    <div class="filter-bar">
      <form action="/products" method="GET">
        <div class="filter-row">
          <!-- Search -->
          <div class="filter-group">
            <label for="search">Search</label>
            <input type="text" id="search" name="search" placeholder="Search products..." value="<%= filters.search %>">
          </div>
          
          <!-- Category -->
          <div class="filter-group">
            <label for="category">Category</label>
            <select id="category" name="category">
              <option value="all" <%= filters.category === 'all' ? 'selected' : '' %>>All Categories</option>
              <option value="electronics" <%= filters.category === 'electronics' ? 'selected' : '' %>>Electronics</option>
              <option value="furniture" <%= filters.category === 'furniture' ? 'selected' : '' %>>Furniture</option>
            </select>
          </div>
          
          <!-- Sort -->
          <div class="filter-group">
            <label for="sort">Sort By</label>
            <select id="sort" name="sort">
              <option value="name" <%= filters.sortBy === 'name' ? 'selected' : '' %>>Name</option>
              <option value="price-low" <%= filters.sortBy === 'price-low' ? 'selected' : '' %>>Price: Low to High</option>
              <option value="price-high" <%= filters.sortBy === 'price-high' ? 'selected' : '' %>>Price: High to Low</option>
              <option value="rating" <%= filters.sortBy === 'rating' ? 'selected' : '' %>>Rating</option>
            </select>
          </div>
        </div>
        
        <!-- Price Range -->
        <div class="filter-row" style="margin-top: 15px;">
          <div class="filter-group">
            <label>Price Range</label>
            <div class="price-range">
              <input type="number" name="minPrice" placeholder="Min" value="<%= filters.minPrice %>">
              <span>-</span>
              <input type="number" name="maxPrice" placeholder="Max" value="<%= filters.maxPrice %>">
            </div>
          </div>
          
          <!-- In Stock Filter -->
          <div class="checkbox-filter">
            <input type="checkbox" id="inStock" name="inStock" value="true" <%= filters.inStock ? 'checked' : '' %>>
            <label for="inStock">In Stock Only</label>
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <button type="submit">Apply Filters</button>
          <a href="/products" class="clear-filters" style="display: inline-block; padding: 10px 25px; text-decoration: none; color: white; border-radius: 4px;">Clear Filters</a>
        </div>
      </form>
    </div>
    
    <!-- Results Info -->
    <div class="results-info">
      Found <%= products.length %> product<%= products.length !== 1 ? 's' : '' %>
    </div>
    
    <!-- Products Grid -->
    <% if (products.length === 0) { %>
      <div class="no-results">
        <h2>No Products Found</h2>
        <p>Try adjusting your filters or search terms</p>
      </div>
    <% } else { %>
      <div class="products-grid">
        <% products.forEach(function(product) { %>
          <div class="product-card">
            <div class="product-name"><%= product.name %></div>
            <span class="product-category"><%= product.category %></span>
            <div class="product-price">$<%= product.price %></div>
            <div class="product-rating">★ <%= product.rating %> / 5.0</div>
            <div class="product-stock <%= product.inStock ? 'in-stock' : 'out-stock' %>">
              <%= product.inStock ? '✓ In Stock' : '✗ Out of Stock' %>
            </div>
          </div>
        <% }); %>
      </div>
    <% } %>
  </div>
</body>
</html>
```

::

## Understanding the Query String

When you submit the filter form, Express creates a URL like:
```
/products?search=laptop&category=electronics&minPrice=100&maxPrice=500&sort=price-low&inStock=true
```

Access these values:
```javascript
req.query.search      // "laptop"
req.query.category    // "electronics"
req.query.minPrice    // "100" (string)
req.query.maxPrice    // "500" (string)
req.query.sort        // "price-low"
req.query.inStock     // "true" (string)
```

## Handling Different Data Types

Query parameters are always strings. Convert them when needed:

::Editor
#title
app.js

#default

```javascript
app.get('/items', (req, res) => {
  // Strings - use directly
  const name = req.query.name || '';
  
  // Numbers - convert with parseInt/parseFloat
  const page = parseInt(req.query.page) || 1;
  const price = parseFloat(req.query.price) || 0;
  
  // Booleans - check string value
  const featured = req.query.featured === 'true';
  const active = req.query.active !== 'false'; // default true
  
  // Arrays - split if comma-separated
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  
  // Date - convert from string
  const startDate = req.query.date ? new Date(req.query.date) : null;
  
  res.json({
    name,        // string
    page,        // number
    price,       // number
    featured,    // boolean
    active,      // boolean
    tags,        // array
    startDate    // Date object
  });
});

// Example URLs:
// /items?name=Laptop&page=2&price=299.99&featured=true&tags=new,sale&date=2024-01-15
```

::

## Pagination Example

Implementing pagination with query parameters:

::Editor
#title
app.js

#default

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Generate sample data
const allItems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));

app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = Math.ceil(allItems.length / limit);
  
  // Get items for current page
  const items = allItems.slice(startIndex, endIndex);
  
  // Pagination info
  const pagination = {
    currentPage: page,
    totalPages: totalPages,
    totalItems: allItems.length,
    itemsPerPage: limit,
    hasNext: endIndex < allItems.length,
    hasPrev: startIndex > 0
  };
  
  res.render('items', { items, pagination });
});

app.listen(3000);
```

::

::Editor
#title
views/items.ejs

#default

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Paginated Items</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    h1 { color: #1f2937; margin-bottom: 10px; }
    .info { color: #6b7280; margin-bottom: 20px; font-size: 14px; }
    .items { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .item { padding: 20px; border-bottom: 1px solid #e5e7eb; }
    .item:last-child { border-bottom: none; }
    .item h3 { margin: 0 0 8px 0; color: #1f2937; }
    .item p { margin: 0; color: #6b7280; }
    
    .pagination { display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 30px; }
    .pagination a, .pagination span { padding: 8px 16px; text-decoration: none; border: 2px solid #e5e7eb; border-radius: 4px; color: #374151; }
    .pagination a:hover { background: #f3f4f6; border-color: #3b82f6; color: #3b82f6; }
    .pagination .current { background: #3b82f6; color: white; border-color: #3b82f6; font-weight: 600; }
    .pagination .disabled { color: #d1d5db; cursor: not-allowed; }
    .pagination .disabled:hover { background: transparent; border-color: #e5e7eb; color: #d1d5db; }
  </style>
</head>
<body>
  <h1>All Items</h1>
  <div class="info">
    Showing <%= (pagination.currentPage - 1) * pagination.itemsPerPage + 1 %>-<%= Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems) %> of <%= pagination.totalItems %> items
  </div>
  
  <div class="items">
    <% items.forEach(function(item) { %>
      <div class="item">
        <h3><%= item.name %></h3>
        <p><%= item.description %></p>
      </div>
    <% }); %>
  </div>
  
  <div class="pagination">
    <% if (pagination.hasPrev) { %>
      <a href="?page=<%= pagination.currentPage - 1 %>">← Previous</a>
    <% } else { %>
      <span class="disabled">← Previous</span>
    <% } %>
    
    <% for (let i = 1; i <= pagination.totalPages; i++) { %>
      <% if (i === pagination.currentPage) { %>
        <span class="current"><%= i %></span>
      <% } else if (i === 1 || i === pagination.totalPages || Math.abs(i - pagination.currentPage) <= 2) { %>
        <a href="?page=<%= i %>"><%= i %></a>
      <% } else if (i === pagination.currentPage - 3 || i === pagination.currentPage + 3) { %>
        <span>...</span>
      <% } %>
    <% } %>
    
    <% if (pagination.hasNext) { %>
      <a href="?page=<%= pagination.currentPage + 1 %>">Next →</a>
    <% } else { %>
      <span class="disabled">Next →</span>
    <% } %>
  </div>
</body>
</html>
```

::

## Preserving Query Parameters

When you have multiple filters and pagination, you need to preserve existing query parameters:

```javascript
app.get('/products', (req, res) => {
  // Build URL with preserved parameters
  const buildUrl = (newParams) => {
    const params = { ...req.query, ...newParams };
    const queryString = new URLSearchParams(params).toString();
    return `/products?${queryString}`;
  };
  
  res.render('products', {
    products: filteredProducts,
    buildUrl: buildUrl
  });
});
```

In your template:
```html
<a href="<%= buildUrl({ page: 2 }) %>">Page 2</a>
<!-- Preserves search, category, etc. -->
```

## Default Values and Validation

Always provide defaults and validate query parameters:

::Editor
#title
app.js

#default

```javascript
app.get('/search', (req, res) => {
  // Defaults
  const query = req.query.q || '';
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(10, parseInt(req.query.limit) || 20));
  
  // Validation
  const validSortOptions = ['name', 'date', 'price'];
  const sort = validSortOptions.includes(req.query.sort) 
    ? req.query.sort 
    : 'name';
  
  // Range validation
  const minPrice = Math.max(0, parseFloat(req.query.min) || 0);
  const maxPrice = Math.min(10000, parseFloat(req.query.max) || 10000);
  
  res.json({ query, page, limit, sort, minPrice, maxPrice });
});
```

::

## Best Practices

### 1. **Use Meaningful Parameter Names**
```javascript
// Good
?search=laptop&category=electronics&sort=price

// Bad
?q=laptop&c=electronics&s=price
```

### 2. **Provide Sensible Defaults**
```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 20;
```

### 3. **Validate and Sanitize**
```javascript
// Whitelist valid values
const validCategories = ['electronics', 'furniture', 'clothing'];
const category = validCategories.includes(req.query.category) 
  ? req.query.category 
  : 'all';
```

### 4. **Handle Type Conversion**
```javascript
// Always convert and validate
const price = parseFloat(req.query.price);
if (isNaN(price) || price < 0) {
  return res.status(400).send('Invalid price');
}
```

### 5. **Keep URLs Clean**
```javascript
// Good - only include non-default values
/products?category=electronics

// Bad - include everything
/products?category=electronics&page=1&sort=name&limit=20
```

## Common Patterns

### Multiple Values for Same Parameter:
```
/products?tag=sale&tag=new&tag=featured
```
```javascript
// Express automatically creates array
req.query.tag // ['sale', 'new', 'featured']

// Or use comma-separated
/products?tags=sale,new,featured
const tags = req.query.tags.split(',');
```

### Optional Parameters:
```javascript
app.get('/articles', (req, res) => {
  const filters = {};
  
  if (req.query.author) filters.author = req.query.author;
  if (req.query.date) filters.date = req.query.date;
  if (req.query.tag) filters.tag = req.query.tag;
  
  // Only apply filters that exist
});
```

## What's Next?

You've mastered URL query parameters in Express.js! In the next tutorial, we'll cover **Express Router Module**, where you'll learn how to organize your routes into modular, maintainable files and build scalable application structures.

### Key Takeaways:
- Query parameters add filtering without changing routes
- Always provide defaults and validate input
- Convert string values to appropriate types
- Use query params for search, filter, sort, and pagination
- Preserve existing params when building new URLs
- Keep parameter names meaningful and consistent
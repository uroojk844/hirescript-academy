---
title: Image Carousel
description: Create a slideshow with navigation.
navigation:
  order: 5
---

# Image Carousel

In this tutorial, you’ll learn to create an **image carousel** (slideshow) for images or cards, with navigation controls and optional auto-slide. Using plain HTML, CSS, and JavaScript, you’ll build a responsive carousel styled with flexbox and CSS variables.

In this tutorial, you’ll learn:
- Structuring a carousel with HTML
- Styling with CSS flexbox and transitions
- Adding navigation and auto-slide with JavaScript
- Ensuring responsiveness
- Best practices for carousels

## Carousel Structure with HTML

Use `<div>` for slides and navigation:

::Editor
#title
index.html

#default
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Basic Carousel</title>
    <style>
      :root {
        --slide-bg: #f8f9fa;
        --nav-bg: #007bff;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .carousel {
        max-width: 600px;
        margin: 20px auto;
        position: relative;
        overflow: hidden;
      }
      .carousel-slides {
        display: flex;
      }
      .slide {
        background: var(--slide-bg);
        padding: 20px;
        text-align: center;
        flex: 0 0 100%;
      }
      button {
        background: var(--nav-bg);
        color: var(--text-color);
        padding: 10px;
        border: none;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .prev { left: 10px; }
      .next { right: 10px; }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Image Carousel</h1>
      <div class="carousel">
        <div class="carousel-slides">
          <div class="slide">Slide 1</div>
          <div class="slide">Slide 2</div>
          <div class="slide">Slide 3</div>
        </div>
        <button class="prev" onclick="moveSlide(-1)">Prev</button>
        <button class="next" onclick="moveSlide(1)">Next</button>
      </div>
    </main>
    <script>
      let currentSlide = 0;
      const slides = document.querySelector('.carousel-slides');
      function moveSlide(direction) {
        const slideCount = document.querySelectorAll('.slide').length;
        currentSlide = (currentSlide + direction + slideCount) % slideCount;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    </script>
  </body>
</html>
```
::

## Carousel with Smooth Transitions

Add CSS transitions and image content:

::Editor
#title
index.html

#default
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Smooth Carousel</title>
    <style>
      :root {
        --nav-bg: #007bff;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .carousel {
        max-width: 600px;
        margin: 20px auto;
        position: relative;
        overflow: hidden;
      }
      .carousel-slides {
        display: flex;
        transition: transform 0.5s ease;
      }
      .slide {
        flex: 0 0 100%;
      }
      .slide img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
      button {
        background: var(--nav-bg);
        color: var(--text-color);
        padding: 10px;
        border: none;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .prev { left: 10px; }
      .next { right: 10px; }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Smooth Carousel</h1>
      <div class="carousel">
        <div class="carousel-slides">
          <div class="slide"><img src="https://placehold.co/600x300?text=1" alt="Slide 1"></div>
          <div class="slide"><img src="https://placehold.co/600x300?text=2" alt="Slide 2"></div>
          <div class="slide"><img src="https://placehold.co/600x300?text=3" alt="Slide 3"></div>
        </div>
        <button class="prev" onclick="moveSlide(-1)">Prev</button>
        <button class="next" onclick="moveSlide(1)">Next</button>
      </div>
    </main>
    <script>
      let currentSlide = 0;
      const slides = document.querySelector('.carousel-slides');
      function moveSlide(direction) {
        const slideCount = document.querySelectorAll('.slide').length;
        currentSlide = (currentSlide + direction + slideCount) % slideCount;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    </script>
  </body>
</html>
```
::

## Auto-Slide and Accessibility

Add auto-slide and ARIA for accessibility:

::Editor
#title
index.html

#default
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Auto-Slide Carousel</title>
    <style>
      :root {
        --nav-bg: #007bff;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .carousel {
        max-width: 600px;
        margin: 20px auto;
        position: relative;
        overflow: hidden;
      }
      .carousel-slides {
        display: flex;
        transition: transform 0.5s ease;
      }
      .slide {
        flex: 0 0 100%;
      }
      .slide img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
      button {
        background: var(--nav-bg);
        color: var(--text-color);
        padding: 10px;
        border: none;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      button:focus { outline: 2px solid #66b0ff; }
      .prev { left: 10px; }
      .next { right: 10px; }
      .main { padding: 20px; }
    </style>
  </head>
  <body>
    <main class="main">
      <h1>Auto-Slide Carousel</h1>
      <div class="carousel" role="region" aria-label="Image carousel">
        <div class="carousel-slides">
          <div class="slide"><img src="https://placehold.co/600x400?text=1" alt="Slide 1"></div>
          <div class="slide"><img src="https://placehold.co/600x400?text=2" alt="Slide 2"></div>
          <div class="slide"><img src="https://placehold.co/600x400?text=3" alt="Slide 3"></div>
        </div>
        <button class="prev" onclick="moveSlide(-1)" aria-label="Previous slide">Prev</button>
        <button class="next" onclick="moveSlide(1)" aria-label="Next slide">Next</button>
      </div>
    </main>
    <script>
      let currentSlide = 0;
      const slides = document.querySelector('.carousel-slides');
      function moveSlide(direction) {
        const slideCount = document.querySelectorAll('.slide').length;
        currentSlide = (currentSlide + direction) % slideCount;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
      setInterval(() => moveSlide(1), 5000); // Auto-slide every 5 seconds
    </script>
  </body>
</html>
```
::

## Best Practices
- Use CSS `flex` for smooth slide layouts.
- Apply `transition` for animated slide changes.
- Ensure images have `alt` attributes for accessibility.
- Add ARIA attributes (`role="region"`, `aria-label`) for screen readers.
- Test edge cases: no JavaScript, touch devices, small screens.
- Optimize performance by preloading images.

## What’s Next?

You’ve built an image carousel! Explore the next component, **Dropdown Menu**, to create interactive menus.
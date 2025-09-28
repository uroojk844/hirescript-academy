---
title: Typography and Text Styling
description: Master text styling with Tailwind CSS utility classes for fonts, sizes, weights, and more.
navigation:
  order: 6
---

# Typography and Text Styling

Typography is a crucial aspect of web design that affects readability, user experience, and visual hierarchy. Tailwind CSS provides a comprehensive set of utility classes for controlling every aspect of text styling, from font families to line heights and letter spacing.

In this tutorial, you'll learn:

- How to control font families, sizes, and weights
- Text alignment, decoration, and transformation utilities
- Line height and letter spacing adjustments
- Creating visual hierarchy with typography

## Font Families

Tailwind provides several built-in font family utilities that you can use to style your text:

::Editor
#title
typography-fonts.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Font Families</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 space-y-4">
    <p class="font-sans">This text uses the default sans-serif font family.</p>
    <p class="font-serif">This text uses a serif font family.</p>
    <p class="font-mono">This text uses a monospace font family.</p>
    <p class="font-sans font-medium">Combined with font weight utilities.</p>
  </body>
</html>
```

::

### Available Font Families
- `font-sans`: System sans-serif fonts
- `font-serif`: System serif fonts  
- `font-mono`: System monospace fonts

## Font Sizes

Tailwind offers a comprehensive scale of font sizes from very small to very large:

::Editor
#title
font-sizes.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Font Sizes</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 space-y-4">
    <p class="text-xs">Extra small text (12px)</p>
    <p class="text-sm">Small text (14px)</p>
    <p class="text-base">Base text (16px) - default size</p>
    <p class="text-lg">Large text (18px)</p>
    <p class="text-xl">Extra large text (20px)</p>
    <p class="text-2xl">2X large text (24px)</p>
    <p class="text-3xl">3X large text (30px)</p>
    <p class="text-4xl">4X large text (36px)</p>
    <p class="text-5xl">5X large text (48px)</p>
  </body>
</html>
```

::

## Font Weights

Control the thickness of your text with font weight utilities:

::Editor
#title
font-weights.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Font Weights</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 space-y-4">
    <p class="font-thin">Thin font weight (100)</p>
    <p class="font-extralight">Extra light font weight (200)</p>
    <p class="font-light">Light font weight (300)</p>
    <p class="font-normal">Normal font weight (400) - default</p>
    <p class="font-medium">Medium font weight (500)</p>
    <p class="font-semibold">Semibold font weight (600)</p>
    <p class="font-bold">Bold font weight (700)</p>
    <p class="font-extrabold">Extra bold font weight (800)</p>
    <p class="font-black">Black font weight (900)</p>
  </body>
</html>
```

::

## Text Alignment

Align your text horizontally with these utilities:

::Editor
#title
text-alignment.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Alignment</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 space-y-4">
    <p class="text-left bg-gray-100 p-4">Left aligned text</p>
    <p class="text-center bg-gray-100 p-4">Center aligned text</p>
    <p class="text-right bg-gray-100 p-4">Right aligned text</p>
    <p class="text-justify bg-gray-100 p-4">
      Justified text spreads content evenly across the full width of the container.
      This creates clean, straight edges on both sides of the text block.
    </p>
  </body>
</html>
```

::

## Text Decoration and Transformation

Style your text with decorations and transformations:

::Editor
#title
text-decoration.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Decoration</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 space-y-4">
    <!-- Text Decoration -->
    <p class="underline">Underlined text</p>
    <p class="overline">Overlined text</p>
    <p class="line-through">Strikethrough text</p>
    <p class="no-underline">Text with no decoration</p>
    
    <!-- Text Transformation -->
    <p class="uppercase">uppercase text transformation</p>
    <p class="lowercase">LOWERCASE TEXT TRANSFORMATION</p>
    <p class="capitalize">capitalize each word</p>
    <p class="normal-case">Normal case text</p>
    
    <!-- Font Style -->
    <p class="italic">Italic text style</p>
    <p class="not-italic">Not italic text style</p>
  </body>
</html>
```

::

## Line Height and Letter Spacing

Fine-tune text readability with spacing controls:

::Editor
#title
text-spacing.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Spacing</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-8 space-y-6">
    <!-- Line Height -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Line Height Examples</h3>
      <p class="leading-tight bg-blue-50 p-4">
        Tight line height creates compact text blocks. This is useful for headings
        or when you need to save vertical space.
      </p>
      <p class="leading-normal bg-green-50 p-4">
        Normal line height provides comfortable reading experience for most content.
        This is the default spacing for body text.
      </p>
      <p class="leading-loose bg-yellow-50 p-4">
        Loose line height creates more breathing room between lines. This can improve
        readability for longer content or when you want a more relaxed feel.
      </p>
    </div>
    
    <!-- Letter Spacing -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Letter Spacing Examples</h3>
      <p class="tracking-tight">Tight letter spacing</p>
      <p class="tracking-normal">Normal letter spacing</p>
      <p class="tracking-wide">Wide letter spacing</p>
      <p class="tracking-widest">Widest letter spacing</p>
    </div>
  </body>
</html>
```

::

## Creating Visual Hierarchy

Combine typography utilities to create clear visual hierarchy:

::Editor
#title
typography-hierarchy.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Typography Hierarchy</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="max-w-4xl mx-auto p-8 space-y-6">
    <!-- Main Heading -->
    <h1 class="text-4xl font-bold text-gray-900 leading-tight">
      Creating Effective Typography Hierarchy
    </h1>
    
    <!-- Subtitle -->
    <p class="text-xl text-gray-600 leading-relaxed">
      Learn how to structure content with different text styles for better readability
    </p>
    
    <!-- Section Heading -->
    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
      Understanding Typography Scales
    </h2>
    
    <!-- Body Text -->
    <p class="text-base text-gray-700 leading-relaxed mb-4">
      Typography hierarchy helps guide readers through your content by establishing
      visual relationships between different types of information. By varying font
      sizes, weights, and spacing, you create a clear path for the eye to follow.
    </p>
    
    <!-- Subheading -->
    <h3 class="text-lg font-medium text-gray-800 mb-3">
      Key Principles to Remember
    </h3>
    
    <!-- List with different text styles -->
    <ul class="space-y-2 text-gray-700">
      <li class="flex items-start">
        <span class="font-semibold text-blue-600 mr-2">•</span>
        <span>Use <span class="font-medium">consistent scales</span> for predictable hierarchy</span>
      </li>
      <li class="flex items-start">
        <span class="font-semibold text-blue-600 mr-2">•</span>
        <span>Combine <span class="italic">size, weight, and spacing</span> for maximum impact</span>
      </li>
      <li class="flex items-start">
        <span class="font-semibold text-blue-600 mr-2">•</span>
        <span>Maintain sufficient <span class="underline">contrast</span> between levels</span>
      </li>
    </ul>
    
    <!-- Quote or Callout -->
    <blockquote class="border-l-4 border-blue-500 pl-6 my-8">
      <p class="text-lg italic text-gray-600 leading-relaxed">
        "Typography is the craft of endowing human language with a durable visual form."
      </p>
      <cite class="text-sm font-medium text-gray-500 mt-2 block">— Robert Bringhurst</cite>
    </blockquote>
    
    <!-- Caption or Small Text -->
    <p class="text-sm text-gray-500 mt-8">
      Example demonstrating various typography utilities working together to create hierarchy.
    </p>
  </body>
</html>
```

::

### Typography Best Practices

- **Establish a consistent scale**: Use Tailwind's built-in sizing scale for predictable hierarchy
- **Combine multiple properties**: Mix font size, weight, and color for clear distinction
- **Mind the line height**: Adjust `leading-` classes based on font size and content type
- **Use semantic HTML**: Combine utility classes with proper heading tags (`h1`, `h2`, etc.)
- **Test readability**: Ensure sufficient contrast between text and background colors

## What's Next?

You've mastered typography and text styling in Tailwind CSS! In the next tutorial, we'll explore **Colors and Backgrounds**, where you'll learn how to apply colors to text, backgrounds, and create beautiful gradients.
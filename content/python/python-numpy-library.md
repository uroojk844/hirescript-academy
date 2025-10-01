---
title: Python NumPy Library
description: Discover NumPy, the fundamental package for scientific computing in Python, focusing on arrays, mathematical operations, and data manipulation.
navigation:
  order: 11
---


# Python NumPy Library

NumPy is a powerful library for numerical computing in Python, providing support for large, multi-dimensional arrays and matrices, along with mathematical functions to operate on these arrays. It's the foundation for many data science libraries like Pandas and SciPy. This beginner-friendly lesson covers creating arrays, performing operations, and applying NumPy in practical scenarios.

## Learning Objectives
- Understand NumPy arrays and their advantages over Python lists.
- Create and manipulate arrays using indexing, slicing, and reshaping.
- Perform element-wise operations, aggregations, and linear algebra.
- Use broadcasting for efficient computations.
- Apply NumPy in data analysis tasks.

## Section 1: Creating NumPy Arrays
NumPy arrays (`ndarray`) are homogeneous, fixed-size collections that support fast operations. Import NumPy as `np` conventionally.

**Code Example: Basic Array Creation**
```python
import numpy as np

# From a list
arr1 = np.array([1, 2, 3, 4])
print(arr1)

# 2D array
arr2 = np.array([[1, 2], [3, 4]])
print(arr2)

# Zeros and ones
zeros = np.zeros((2, 3))
ones = np.ones((3, 2))
print(zeros)
print(ones)

# Range and linspace
arange = np.arange(0, 10, 2)
linspace = np.linspace(0, 1, 5)
print(arange)
print(linspace)
```

**Expected Output:**
```
[1 2 3 4]
[[1 2]
 [3 4]]
[[0. 0. 0.]
 [0. 0. 0.]]
[[1. 1.]
 [1. 1.]
 [1. 1.]]
[0 2 4 6 8]
[0.   0.25 0.5  0.75 1.  ]
```

**Explanation**:
- `np.array()` converts lists to arrays.
- `zeros()` and `ones()` create arrays filled with 0s or 1s.
- `arange(start, stop, step)` generates evenly spaced integers.
- `linspace(start, stop, num)` generates evenly spaced floats.

## Section 2: Array Attributes and Manipulation
Arrays have attributes like `shape`, `dtype`, and `size`. Manipulate with reshaping, slicing, and indexing.

**Code Example: Attributes and Slicing**
```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

print(f"Shape: {arr.shape}, Dtype: {arr.dtype}, Size: {arr.size}")

# Reshape
reshaped = arr.reshape(3, 2)
print(reshaped)

# Slicing
slice1 = arr[0, 1:]  # First row, from index 1
slice2 = arr[:, 1]   # Second column
print(slice1)
print(slice2)
```

**Expected Output:**
```
Shape: (2, 3), Dtype: int64, Size: 6
[[1 2]
 [3 4]
 [5 6]]
[2 3]
[2 5]
```

**Explanation**:
- `shape` gives dimensions; `dtype` the data type; `size` total elements.
- `reshape()` changes dimensions without altering data.
- Slicing uses `[row, col]`; `:` selects all in a dimension.

## Section 3: Mathematical Operations
NumPy supports element-wise operations, aggregations (sum, mean), and more.

**Code Example: Operations and Aggregations**
```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Element-wise
add = a + b
multiply = a * b
print(add)
print(multiply)

# Aggregations
total = np.sum(a)
average = np.mean(b)
max_val = np.max(a)
print(total, average, max_val)

# Universal functions (ufuncs)
sqrt = np.sqrt(a)
exp = np.exp(b)
print(sqrt)
print(exp)
```

**Expected Output:**
```
[5 7 9]
[ 4 10 18]
6 5.0 3
[1.         1.41421356 1.73205081]
[  54.59815003  148.4131591   403.42879349]
```

**Explanation**:
- Operators like `+`, `*` apply element-wise.
- `sum()`, `mean()`, `max()` aggregate values.
- Ufuncs like `sqrt()`, `exp()` apply math functions efficiently.

## Section 4: Broadcasting and Linear Algebra
Broadcasting allows operations on arrays of different shapes. NumPy also includes linear algebra functions.

**Code Example: Broadcasting and Dot Product**
```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([10, 20])  # 1D broadcasts to 2D

broadcast = a + b
print(broadcast)

# Linear algebra
dot = np.dot(a, a)  # Matrix multiplication
transpose = np.transpose(a)
print(dot)
print(transpose)
```

**Expected Output:**
```
[[11 22]
 [13 24]]
[[ 7 10]
 [15 22]]
[[1 3]
 [2 4]]
```

**Explanation**:
- Broadcasting stretches `b` to match `a`'s shape.
- `dot()` computes matrix product.
- `transpose()` swaps rows and columns.

## Mini-Project: Basic Image Processing with NumPy
This project simulates simple image manipulation using NumPy arrays (representing pixel values).

**Code Example: Image Flipper**
```python
import numpy as np
import matplotlib.pyplot as plt  # For visualization (assume installed)

# Sample 3x3 grayscale image (0-255)
image = np.array([[0, 50, 100],
                  [150, 200, 250],
                  [50, 100, 150]])

# Flip horizontally
flipped_h = np.fliplr(image)

# Flip vertically
flipped_v = np.flipud(image)

# Brighten by adding 50 (clip to 255)
brightened = np.clip(image + 50, 0, 255)

print("Original:\n", image)
print("Horizontal Flip:\n", flipped_h)
print("Vertical Flip:\n", flipped_v)
print("Brightened:\n", brightened)

# Optional: Visualize (comment out if no matplotlib)
plt.imshow(image, cmap='gray')
plt.title("Original")
plt.show()
```

**Expected Output:**
```
Original:
 [[  0  50 100]
 [150 200 250]
 [ 50 100 150]]
Horizontal Flip:
 [[100  50   0]
 [250 200 150]
 [150 100  50]]
Vertical Flip:
 [[ 50 100 150]
 [150 200 250]
 [  0  50 100]]
Brightened:
 [[ 50 100 150]
 [200 250 255]
 [100 150 200]]
```

**Explanation**:
- Image as 2D array of pixel intensities.
- `fliplr()` and `flipud()` flip arrays.
- `clip()` ensures values stay in range.
- Demonstrates NumPy's efficiency for array manipulations.

## Best Practices
- **Use Vectorization**: Avoid loops; use NumPy operations for speed.
- **Specify Dtypes**: Use `dtype='float32'` for memory efficiency.
- **Handle NaNs**: Use `np.nan` and functions like `np.isnan()`.
- **Copy Arrays**: Use `copy()` to avoid modifying views.
- **Integrate with Other Libs**: NumPy arrays are inputs for Pandas, Matplotlib, etc.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Array Creation | Use `array()`, `zeros()`, `arange()`, etc. |
| Manipulation | Reshape, slice, and index arrays. |
| Operations | Element-wise math and aggregations. |
| Broadcasting | Operate on different shapes efficiently. |
| Linear Algebra | Matrix ops like dot product, transpose. |

## What's Next?
In the next module, **Python Pandas Library**, you’ll learn to handle structured data with DataFrames for analysis and manipulation.


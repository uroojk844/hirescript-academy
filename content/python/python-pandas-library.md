---
title: Python Pandas Library
description: Master the Pandas library to efficiently manipulate, analyze, and clean data, enabling powerful data analysis workflows in Python.
navigation:
  order: 12
---

# Python Pandas Library

Pandas is a powerful Python library for data manipulation and analysis, providing flexible data structures like Series and DataFrames to handle structured data efficiently. This lesson introduces Pandas' core functionalities, from basic operations to advanced data processing, making it ideal for beginners diving into data science.

## Learning Objectives
- Understand Pandas' core data structures: Series and DataFrame.
- Perform data loading, cleaning, filtering, and grouping operations.
- Merge and join datasets effectively.
- Handle missing data and perform basic statistical analysis.
- Build a real-world data analysis project using Pandas.

## 1. Introduction to Pandas and Installation
Pandas simplifies working with tabular data (like spreadsheets or SQL tables). It builds on NumPy and integrates well with other data science libraries.

**Installation**:
```bash
pip install pandas
```

**Importing Pandas**:
::Editor
#title
pandas.py
#default
```python
import pandas as pd
```
::

## 2. Pandas Series
A Series is a one-dimensional array-like object that can hold data of any type, with an index for labeling.

**Example: Creating and Manipulating a Series**
::Editor
#title
creation_manipulation.py
#default
```python
import pandas as pd

# Create a Series
data = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print("Series:")
print(data)

# Access elements
print("\nValue at index 'b':", data['b'])

# Basic operations
data_squared = data ** 2
print("\nSquared Series:")
print(data_squared)
```
::

**Expected Output**:
```plaintext
Series:
a    10
b    20
c    30
d    40
dtype: int64

Value at index 'b': 20

Squared Series:
a     100
b     400
c     900
d    1600
dtype: int64
```

## 3. Pandas DataFrame
A DataFrame is a two-dimensional, tabular data structure with labeled rows and columns, similar to a spreadsheet.

**Example: Creating a DataFrame**
::Editor
#title
dataframes.py
#default
```python
# Create a DataFrame from a dictionary
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'London', 'Paris']
}
df = pd.DataFrame(data)
print("DataFrame:")
print(df)

# Access a column
print("\nNames:")
print(df['Name'])

# Access a row
print("\nFirst row:")
print(df.iloc[0])
```
::

**Expected Output**:
```plaintext
DataFrame:
      Name  Age     City
0    Alice   25  New York
1      Bob   30   London
2  Charlie   35    Paris

Names:
0      Alice
1        Bob
2    Charlie
Name: Name, dtype: object

First row:
Name         Alice
Age             25
City      New York
Name: 0, dtype: object
```

## 4. Loading and Exploring Data
Pandas can read data from various formats like CSV, Excel, and JSON. Common exploration methods include `head()`, `info()`, and `describe()`.

**Example: Loading a CSV File**
::Editor
#title
csv.py
#default
```python
# Sample CSV content (save as 'employees.csv')
"""
Name,Age,City,Salary
Alice,25,New York,50000
Bob,30,London,60000
Charlie,35,Paris,55000
"""
# Load CSV
df = pd.read_csv('employees.csv')

# Explore data
print("First 2 rows:")
print(df.head(2))

print("\nData Info:")
print(df.info())

print("\nSummary Statistics:")
print(df.describe())
```
::

**Expected Output**:
```plaintext
First 2 rows:
    Name  Age     City  Salary
0  Alice   25  New York   50000
1    Bob   30   London   60000

Data Info:
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 3 entries, 0 to 2
Data columns (total 4 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   Name    3 non-null      object
 1   Age     3 non-null      int64 
 2   City    3 non-null      object
 3   Salary  3 non-null      int64 
dtypes: int64(2), object(2)
memory usage: 224.0+ bytes

Summary Statistics:
             Age        Salary
count   3.000000      3.000000
mean   30.000000  55000.000000
std     5.000000   5000.000000
min    25.000000  50000.000000
25%    27.500000  52500.000000
50%    30.000000  55000.000000
75%    32.500000  57500.000000
max    35.000000  60000.000000
```

## 5. Data Cleaning
Handle missing data, duplicates, and incorrect types to prepare data for analysis.

**Example: Handling Missing Data**
::Editor
#title
handling_missing_data.py
#default
```python
# DataFrame with missing values
data = {
    'Name': ['Alice', 'Bob', None, 'Charlie'],
    'Age': [25, None, 35, 40],
    'Salary': [50000, 60000, 55000, None]
}
df = pd.DataFrame(data)

# Check for missing values
print("Missing Values:")
print(df.isna())

# Fill missing values
df['Age'] = df['Age'].fillna(df['Age'].mean())
df['Name'] = df['Name'].fillna('Unknown')
df['Salary'] = df['Salary'].fillna(df['Salary'].median())

print("\nCleaned DataFrame:")
print(df)
```
::

**Expected Output**:
```plaintext
Missing Values:
    Name    Age  Salary
0  False  False   False
1  False   True   False
2   True  False   False
3  False  False    True

Cleaned DataFrame:
      Name        Age   Salary
0    Alice  25.000000  50000.0
1      Bob  33.333333  60000.0
2  Unknown  35.000000  55000.0
3  Charlie  40.000000  55000.0
```

## 6. Filtering and Grouping
Filter rows based on conditions and group data for aggregation.

**Example: Filtering and Grouping**
::Editor
#title
filtering_grouping.py
#default
```python
# Filter employees with salary > 55000
high_earners = df[df['Salary'] > 55000]
print("High Earners:")
print(high_earners)

# Group by City and calculate average salary
avg_salary_by_city = df.groupby('City')['Salary'].mean()
print("\nAverage Salary by City:")
print(avg_salary_by_city)
```
::

**Expected Output**:
```plaintext
High Earners:
  Name        Age   Salary
1  Bob  33.333333  60000.0

Average Salary by City:
City
London      60000.0
New York    50000.0
Paris       55000.0
Name: Salary, dtype: float64
```

## 7. Merging and Joining DataFrames
Combine datasets using `merge()` or `concat()` for comprehensive analysis.

**Example: Merging DataFrames**
::Editor
#title
merging_df.py
#default
```python
# Additional DataFrame
data2 = {
    'Name': ['Alice', 'Bob', 'David'],
    'Department': ['HR', 'IT', 'Marketing']
}
df2 = pd.DataFrame(data2)

# Merge DataFrames
merged_df = pd.merge(df, df2, on='Name', how='left')
print("Merged DataFrame:")
print(merged_df)
```
::

**Expected Output**:
```plaintext
Merged DataFrame:
      Name        Age   Salary Department
0    Alice  25.000000  50000.0         HR
1      Bob  33.333333  60000.0         IT
2  Unknown  35.000000  55000.0        NaN
3  Charlie  40.000000  55000.0        NaN
```

## Mini-Project: Sales Data Analysis
Analyze a sample sales dataset to compute total sales, identify top products, and handle missing data.

**Setup**:
Create a `sales.csv` file:
```plaintext
Product,Category,Price,Quantity,Date
Laptop,Electronics,1000,5,2025-01-01
Phone,Electronics,500,10,2025-01-02
Laptop,Electronics,1000,3,2025-01-03
Tablet,Electronics,,2,2025-01-04
Phone,Electronics,500,0,2025-01-05
```

**Code**:
::Editor
#title
sales.py
#default
```python
import pandas as pd
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='sales_analysis.log'
)

def analyze_sales(file_path: str) -> None:
    """Analyze sales data and generate insights."""
    try:
        # Load data
        df = pd.read_csv(file_path)
        logging.info("Loaded sales data")

        # Handle missing values
        df['Price'] = df['Price'].fillna(df.groupby('Product')['Price'].transform('mean'))
        df['Quantity'] = df['Quantity'].fillna(0)
        logging.info("Handled missing values")

        # Calculate total sales
        df['Total_Sales'] = df['Price'] * df['Quantity']
        total_sales = df['Total_Sales'].sum()
        print(f"Total Sales: ${total_sales:.2f}")

        # Top products by sales
        top_products = df.groupby('Product')['Total_Sales'].sum().sort_values(ascending=False)
        print("\nTop Products by Sales:")
        print(top_products)

        # Sales by category
        sales_by_category = df.groupby('Category')['Total_Sales'].sum()
        print("\nSales by Category:")
        print(sales_by_category)

        # Save cleaned data
        df.to_csv('cleaned_sales.csv', index=False)
        logging.info("Saved cleaned data to cleaned_sales.csv")

    except FileNotFoundError:
        logging.error(f"File {file_path} not found")
        print("Error: File not found")
    except Exception as e:
        logging.error(f"Error analyzing data: {e}")
        print(f"Error: {e}")

def main():
    """Main function to run the sales analysis."""
    file_path = 'sales.csv'
    analyze_sales(file_path)

if __name__ == "__main__":
    main()
```
::

**Expected Output**:
```plaintext
Total Sales: $8000.00

Top Products by Sales:
Product
Laptop    8000.0
Phone     5000.0
Tablet    2000.0
Name: Total_Sales, dtype: float64

Sales by Category:
Category
Electronics    15000.0
Name: Total_Sales, dtype: float64
```

**Log File (`sales_analysis.log`)**:
```plaintext
2025-09-30 23:30:45,123 - INFO - Loaded sales data
2025-09-30 23:30:45,124 - INFO - Handled missing values
2025-09-30 23:30:45,125 - INFO - Saved cleaned data to cleaned_sales.csv
```

**Output File (`cleaned_sales.csv`)**:
```plaintext
Product,Category,Price,Quantity,Date,Total_Sales
Laptop,Electronics,1000.0,5.0,2025-01-01,5000.0
Phone,Electronics,500.0,10.0,2025-01-02,5000.0
Laptop,Electronics,1000.0,3.0,2025-01-03,3000.0
Tablet,Electronics,1000.0,2.0,2025-01-04,2000.0
Phone,Electronics,500.0,0.0,2025-01-05,0.0
```

## Best Practices
- **Use Descriptive Column Names**: Ensure columns are clearly labeled.
- **Handle Missing Data Early**: Address `NaN` values before analysis.
- **Log Operations**: Use logging to track data processing steps.
- **Validate Data**: Check data types and ranges to avoid errors.
- **Optimize Performance**: Use vectorized operations (e.g., `df['Total_Sales'] = df['Price'] * df['Quantity']`) instead of loops.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Series | 1D labeled array for single-column data. |
| DataFrame | 2D tabular structure for multi-column data. |
| Data Cleaning | Handle missing values, duplicates, and incorrect types. |
| Grouping | Aggregate data by categories for insights. |
| Merging | Combine datasets using keys or indices. |

## What's Next?
Explore **Data Visualization Essentials (Matplotlib & Seaborn)** (Lesson 13) to learn how to visualize Pandas DataFrames effectively.

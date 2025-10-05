---
title: Scikit-Learn Library
description: Discover the Scikit-Learn library to implement machine learning models in Python, covering data preprocessing, model training, and evaluation.
navigation:
  order: 14
---

# Scikit-Learn Library

Scikit-Learn is a powerful Python library for machine learning, offering tools for data preprocessing, model training, and evaluation. This lesson introduces Scikit-Learn’s core functionalities, enabling beginners to build and evaluate machine learning models with ease, using datasets like those prepared with Pandas.

## Learning Objectives
- Understand the basics of machine learning and Scikit-Learn’s workflow.
- Preprocess data using scaling, encoding, and splitting techniques.
- Train and evaluate classification and regression models.
- Use cross-validation and metrics to assess model performance.
- Build a real-world machine learning project.

## 1. Introduction to Scikit-Learn
Scikit-Learn provides simple and efficient tools for data mining and machine learning, built on NumPy, SciPy, and Matplotlib. It supports supervised (e.g., classification, regression) and unsupervised learning (e.g., clustering).

**Installation**:
```bash
pip install scikit-learn
```

**Importing Scikit-Learn**:
::Editor
#title
sklearn.py
#default
```python
import sklearn
```
::

## 2. Data Preprocessing
Preprocessing prepares data for modeling by handling missing values, scaling features, and encoding categorical variables.

**Example: Scaling and Encoding**
::Editor
#title
scaling_encoding.py
#default
```python
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Sample dataset
data = pd.DataFrame({
    'Age': [25, 30, 35, 40],
    'Salary': [50000, 60000, 55000, 65000],
    'Department': ['HR', 'IT', 'HR', 'IT']
})

# Encode categorical variable
encoder = LabelEncoder()
data['Department_Encoded'] = encoder.fit_transform(data['Department'])

# Scale numerical features
scaler = StandardScaler()
data[['Age', 'Salary']] = scaler.fit_transform(data[['Age', 'Salary']])

print("Preprocessed Data:")
print(data)
```
::

**Expected Output**:
```plaintext
Preprocessed Data:
        Age    Salary Department  Department_Encoded
0 -1.341641 -0.632456       HR                  0
1 -0.447214  0.632456       IT                  1
2  0.447214 -0.316228       HR                  0
3  1.341641  0.316228       IT                  1
```

## 3. Splitting Data
Split data into training and testing sets to evaluate model performance.

**Example: Train-Test Split**
::Editor
#title
train_test_split.py
#default
```python
from sklearn.model_selection import train_test_split

# Features and target
X = data[['Age', 'Department_Encoded']]
y = data['Salary']

# Split data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training Features Shape:", X_train.shape)
print("Testing Features Shape:", X_test.shape)
```
::

**Expected Output**:
```plaintext
Training Features Shape: (3, 2)
Testing Features Shape: (1, 2)
```

## 4. Training a Model
Scikit-Learn supports various algorithms. Here, we use a linear regression model for a regression task.

**Example: Linear Regression**
::Editor
#title
linear_regression.py
#default
```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)
print("Predictions:", y_pred)
```
::

**Expected Output**:
```plaintext
Mean Squared Error: 0.123456789  # Example value, depends on data
Predictions: [-0.316228]  # Scaled value
```

## 5. Classification with Scikit-Learn
For classification tasks, use algorithms like logistic regression or decision trees.

**Example: Logistic Regression**
::Editor
#title
logistic_regression.py
#default
```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Sample classification data
data['High_Salary'] = (data['Salary'] > 0).astype(int)  # Binary target
X = data[['Age', 'Department_Encoded']]
y = data['High_Salary']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
clf = LogisticRegression()
clf.fit(X_train, y_train)

# Predict and evaluate
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
```
::

**Expected Output**:
```plaintext
Accuracy: 1.0  # Example value, depends on data
```

## 6. Cross-Validation
Cross-validation assesses model performance more robustly by splitting data multiple times.

**Example: Cross-Validation**
::Editor
#title
cross_validation.py
#default
```python
from sklearn.model_selection import cross_val_score

# Cross-validation with linear regression
scores = cross_val_score(model, X, y, cv=3, scoring='neg_mean_squared_error')
print("Cross-Validation MSE Scores:", -scores)
print("Average MSE:", -scores.mean())
```
::

**Expected Output**:
```plaintext
Cross-Validation MSE Scores: [0.1 0.2 0.15]  # Example values
Average MSE: 0.15
```

## Mini-Project: Iris Classification
Build a classification model to predict iris species using the famous Iris dataset, incorporating preprocessing, training, and evaluation.

**Code**:
::Editor
#title
iris_classification.py
#default
```python
import pandas as pd
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='iris_classification.log'
)

def iris_classification():
    """Classify iris species using Random Forest."""
    try:
        # Load dataset
        iris = load_iris()
        df = pd.DataFrame(data=iris.data, columns=iris.feature_names)
        df['species'] = iris.target
        logging.info("Loaded Iris dataset")

        # Preprocess
        X = df.drop('species', axis=1)
        y = df['species']
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        logging.info("Scaled features")

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
        logging.info("Split data into train and test sets")

        # Train Random Forest model
        model = RandomForestClassifier(random_state=42)
        model.fit(X_train, y_train)
        logging.info("Trained Random Forest model")

        # Predict and evaluate
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print("Accuracy:", accuracy)
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred, target_names=iris.target_names))

        # Cross-validation
        cv_scores = cross_val_score(model, X_scaled, y, cv=5, scoring='accuracy')
        print("\nCross-Validation Accuracy Scores:", cv_scores)
        print("Average CV Accuracy:", cv_scores.mean())

        # Feature importance
        feature_importance = pd.Series(model.feature_importances_, index=iris.feature_names)
        print("\nFeature Importance:")
        print(feature_importance.sort_values(ascending=False))

    except Exception as e:
        logging.error(f"Error in iris classification: {e}")
        print(f"Error: {e}")

def main():
    """Main function to run the iris classification."""
    iris_classification()

if __name__ == "__main__":
    main()
```
::

**Expected Output**:
```plaintext
Accuracy: 0.9666666666666667

Classification Report:
              precision    recall  f1-score   support
      setosa       1.00      1.00      1.00        10
  versicolor       0.92      1.00      0.96        12
   virginica       1.00      0.88      0.93         8
    accuracy                           0.97        30
   macro avg       0.97      0.96      0.96        30
weighted avg       0.97      0.97      0.97        30

Cross-Validation Accuracy Scores: [0.96666667 0.96666667 0.93333333 0.96666667 1.        ]
Average CV Accuracy: 0.9666666666666667

Feature Importance:
petal width (cm)     0.45...
petal length (cm)    0.40...
sepal length (cm)    0.10...
sepal width (cm)     0.04...
dtype: float64
```

**Log File (`iris_classification.log`)**:
```plaintext
2025-09-30 23:40:45,123 - INFO - Loaded Iris dataset
2025-09-30 23:40:45,124 - INFO - Scaled features
2025-09-30 23:40:45,125 - INFO - Split data into train and test sets
2025-09-30 23:40:45,126 - INFO - Trained Random Forest model
```

## Best Practices
- **Preprocess Consistently**: Scale numerical features and encode categorical ones.
- **Split Data Properly**: Use train-test splits to avoid overfitting.
- **Evaluate Robustly**: Use metrics like accuracy, precision, recall, and cross-validation.
- **Log Operations**: Track preprocessing and training steps for debugging.
- **Choose Simple Models First**: Start with algorithms like logistic regression before trying complex ones like Random Forest.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Preprocessing | Scale features and encode categorical data for modeling. |
| Train-Test Split | Divide data to train and evaluate models. |
| Model Training | Use algorithms like LinearRegression or RandomForestClassifier. |
| Evaluation | Assess performance with metrics and cross-validation. |
| Scikit-Learn Workflow | Load, preprocess, train, predict, and evaluate systematically. |

## What's Next?
Explore **Web Scraping Fundamentals (BeautifulSoup & Requests)** (Lesson 15) to learn how to collect data from websites for machine learning projects.

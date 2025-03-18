import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import zscore

def load_data(file_path):
    """Load CSV file into a DataFrame."""
    try:
        return pd.read_csv(file_path)
    except Exception as e:
        print(f"Error loading file: {e}")
        sys.exit(1)

def calculate_stats(df, column):
    """Calculate basic statistics for a numeric column."""
    if column not in df.columns:
        print("Column not found.")
        return
    print(f"Statistics for {column}:")
    print(df[column].describe())

def generate_histogram(df, column, bins=10):
    """Generate a histogram for a numeric column."""
    if column not in df.columns:
        print("Column not found.")
        return
    plt.hist(df[column], bins=bins, edgecolor="black")
    plt.title(f"Histogram of {column}")
    plt.xlabel(column)
    plt.ylabel("Frequency")
    plt.show()

def find_correlation(df, col1, col2):
    """Find correlation between two numeric columns."""
    if col1 not in df.columns or col2 not in df.columns:
        print("Columns not found.")
        return
    correlation = df[col1].corr(df[col2])
    print(f"Correlation between {col1} and {col2}: {correlation:.2f}")

def detect_outliers(df, column, method="zscore", threshold=2.0):
    """Identify outliers using either Z-score or IQR method."""
    if column not in df.columns:
        print("Column not found.")
        return
    
    # Ensure the column is numeric
    if not pd.api.types.is_numeric_dtype(df[column]):
        print(f"The column '{column}' is not numeric. Outlier detection is not possible.")
        return
    
    if method == "zscore":
        # Z-score method for outlier detection
        df['z_score'] = zscore(df[column])
        outliers = df[abs(df['z_score']) > threshold]
        print(f"Outliers in {column} (using Z-score method):")
        print(outliers)
    
    elif method == "iqr":
        # IQR method for outlier detection
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR

        # Print the bounds
        print(f"Lower bound: {lower_bound}")
        print(f"Upper bound: {upper_bound}")

        # Check for outliers
        outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
        
        # Output the results
        if outliers.empty:
            print(f"No outliers found in {column} (using IQR method).")
        else:
            print(f"Outliers in {column} (using IQR method):")
            print(outliers)
    
    else:
        print("Invalid outlier detection method. Choose 'zscore' or 'iqr'.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python data_analysis.py <file.csv> <command> <column> [optional arguments]")
        sys.exit(1)

    file_path = sys.argv[1]
    command = sys.argv[2]
    df = load_data(file_path)

    if command == "stats":
        calculate_stats(df, sys.argv[3])
    elif command == "histogram":
        generate_histogram(df, sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 10)
    elif command == "correlation":
        find_correlation(df, sys.argv[3], sys.argv[4])
    elif command == "outliers":
        method = sys.argv[4] if len(sys.argv) > 4 else "zscore"  # Default to zscore method
        threshold = float(sys.argv[5]) if len(sys.argv) > 5 else 2.0  # Default threshold
        detect_outliers(df, sys.argv[3], method, threshold)
    else:
        print("Invalid command.")
# AI-Assisted Data Analysis Tool

## **Overview**
This is a command-line tool that analyzes CSV data, providing:
- Basic statistics (mean, median, mode, standard deviation)
- Histograms for numeric columns
- Correlation analysis between two columns
- Outlier detection

## **Usage**
Run the script with different commands:

### **1. Get Statistics**
python data_analysis.py sample_data.csv stats temperature

#### **2. Generate Histogram
python data_analysis.py sample_data.csv histogram humidity 15

#### **3. Find Correlation
python data_analysis.py sample_data.csv correlation temperature humidity

#### **4. Detect Outliers
python data_analysis.py sample_data.csv outliers wind_speed 2.0
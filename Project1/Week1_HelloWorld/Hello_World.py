import datetime

def safe_division(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero."
    except Exception as e:
        return f"Unexpected error: {e}"

# Print "Hello, World!"
print("Hello, World!")

# Ask for the user's name and greet them
name = input("What is your name? ")
print(f"Hello, {name}!")

# Show the current date and time
now = datetime.datetime.now()
print(f"Current date and time: {now.strftime('%Y-%m-%d %H:%M:%S')}")

# Example usage of the function
num1, num2 = 10, 0  # Change values to test
division_result = safe_division(num1, num2)
print(f"Result of {num1} / {num2}: {division_result}")

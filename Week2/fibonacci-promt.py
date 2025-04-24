def fibonacci(n):
    if n < 0:
        raise ValueError("Input must be a non-negative integer")
    elif n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

# Example usage:
n = int(input("Enter a position in the Fibonacci sequence: "))
print(f"The {n}th Fibonacci number is: {fibonacci(n)}")
import datetime  # Importing datetime module to get the current date and time

def get_user_name():
    """Prompt the user for their name and return it."""
    try:
        name = input("Enter your name: ").strip()  # Get user input and remove spaces
        if not name:  # Check if input is empty
            raise ValueError("Name cannot be empty.")
        return name
    except Exception as e:  # Handle any input errors
        print(f"Error: {e}")
        return "Guest"  # If an error occurs, default to "Guest"
def main():
    """Main function to execute the program."""
    print("Hello, World!")  # Print the classic Hello, World!
    
    name = get_user_name()  # Call function to get the user’s name
    print(f"Hello, {name}!")  # Greet the user by name

    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")  
    print(f"Current date and time: {current_time}")  # Display current date & time

if __name__ == "__main__":
    main()  # Runs the main function when the script is executed
const validateUserData = require("./../validateUser");

describe("validateUserData function", () => {
  test("should return errors for missing required fields", () => {
    const result = validateUserData({});
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("username", "Username is required");
    expect(result.errors).toHaveProperty("email", "Email is required");
    expect(result.errors).toHaveProperty("password", "Password is required");
  });

  test("should validate a correct user data object", () => {
    const userData = {
      username: "ValidUser_123",
      email: "test@example.com",
      password: "Password1!",
      age: 25,
      referralCode: "ABCD1234",
    };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("should validate username constraints", () => {
    expect(validateUserData({ username: "ab" }).errors.username).toBe(
      "Username must be between 3 and 20 characters"
    );
    expect(validateUserData({ username: "a".repeat(21) }).errors.username).toBe(
      "Username must be between 3 and 20 characters"
    );
    expect(validateUserData({ username: "Invalid User!" }).errors.username).toBe(
      "Username can only contain letters, numbers, and underscores"
    );
  });

  test("should validate email format", () => {
    expect(validateUserData({ email: "invalid-email" }).errors.email).toBe(
      "Invalid email format"
    );
    expect(validateUserData({ email: "user@domain" }).errors.email).toBe(
      "Invalid email format"
    );
  });

  test("should validate password constraints", () => {
    expect(validateUserData({ password: "short" }).errors.password).toBe(
      "Password must be at least 8 characters long"
    );
    expect(validateUserData({ password: "longpassword" }).errors.password).toBe(
      "Password must contain at least one number"
    );
    expect(validateUserData({ password: "Pass1234" }).errors.password).toBe(
      "Password must contain at least one special character"
    );
  });

  test("should validate age constraints", () => {
    expect(validateUserData({ age: "twenty" }).errors.age).toBe("Age must be a number");
    expect(validateUserData({ age: 17 }).errors.age).toBe("User must be at least 18 years old");
  });

  test("should validate referral code", () => {
    expect(validateUserData({ referralCode: 12345678 }).errors.referralCode).toBe(
      "Referral code must be a string"
    );
    expect(validateUserData({ referralCode: "short" }).errors.referralCode).toBe(
      "Referral code must be exactly 8 characters"
    );
  });

  test("should return a global error for non-object input", () => {
    expect(validateUserData(null).errors.global).toBe("Invalid user data format");
    expect(validateUserData("invalid").errors.global).toBe("Invalid user data format");
  });
  test("should handle missing required fields", () => {
    const userData = {
      username: "",
      email: "test@example.com",
      password: "",
    };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe("Username is required");
    expect(result.errors.password).toBe("Password is required");
    expect(result.errors.email).toBe(undefined); // Email is valid
  });
  test("should reject invalid email format", () => {
    const userData = {
      username: "ValidUser",
      email: "invalid-email",
      password: "Pass1!",
    };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe("Email is invalid");
  });

});

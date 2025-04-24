import unittest
from validateUser import validate_user_data  # Replace with your actual filename

class TestValidateUserData(unittest.TestCase):

    def test_valid_data(self):
        """Test valid user data"""
        user_data = {
            "username": "validUser",
            "email": "valid@example.com",
            "password": "Pass@1234",
            "age": 20,
            "referral_code": "ABCDEFGH"
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])
        self.assertEqual(result["errors"], {})

    def test_missing_username(self):
        """Test missing username"""
        user_data = {
            "email": "test@example.com",
            "password": "Pass@1234"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("username", result["errors"])

    def test_invalid_email(self):
        """Test invalid email"""
        user_data = {
            "username": "validUser",
            "email": "invalid-email",
            "password": "Pass@1234"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("email", result["errors"])

    def test_weak_password(self):
        """Test password without special characters"""
        user_data = {
            "username": "validUser",
            "email": "test@example.com",
            "password": "Password1"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("password", result["errors"])

    def test_underage_user(self):
        """Test user under 18"""
        user_data = {
            "username": "youngUser",
            "email": "young@example.com",
            "password": "Pass@1234",
            "age": 16
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("age", result["errors"])

    def test_invalid_referral_code(self):
        """Test invalid referral code"""
        user_data = {
            "username": "validUser",
            "email": "valid@example.com",
            "password": "Pass@1234",
            "referral_code": "123"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("referral_code", result["errors"])

    # Additional Test Cases

    def test_missing_email(self):
        """Test missing email"""
        user_data = {
            "username": "validUser",
            "password": "Pass@1234"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("email", result["errors"])

    def test_username_with_special_characters(self):
        """Test username with invalid special characters"""
        user_data = {
            "username": "invalid@username!",
            "email": "valid@example.com",
            "password": "Pass@1234"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("username", result["errors"])

    def test_password_too_short(self):
        """Test password that is too short"""
        user_data = {
            "username": "validUser",
            "email": "valid@example.com",
            "password": "short"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("password", result["errors"])

    def test_missing_password(self):
        """Test missing password"""
        user_data = {
            "username": "validUser",
            "email": "valid@example.com"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("password", result["errors"])

    def test_valid_age_without_referral_code(self):
        """Test valid data without referral code"""
        user_data = {
            "username": "validUser",
            "email": "valid@example.com",
            "password": "Pass@1234",
            "age": 25
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])
        self.assertEqual(result["errors"], {})

    def test_valid_referral_code_without_age(self):
        """Test valid referral code without age"""
        user_data = {
            "username": "validUser",
            "email": "valid@example.com",
            "password": "Pass@1234",
            "referral_code": "ABCDEFGH"
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])
        self.assertEqual(result["errors"], {})

if __name__ == "__main__":
    unittest.main()

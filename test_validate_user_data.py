import pytest
from validate_user_data import validate_user_data

def test_valid_data():
    user_data = {
        "username": "validUser123",
        "email": "user@example.com",
        "password": "P@ssword1",
        "age": 25,
        "referral_code": "ABCDEFGH"
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is True
    assert result["errors"] == {}

def test_missing_username():
    user_data = {
        "email": "user@example.com",
        "password": "P@ssword1",
        "age": 25
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is False
    assert "username" in result["errors"]

def test_invalid_username_length():
    user_data = {
        "username": "ab",
        "email": "user@example.com",
        "password": "P@ssword1"
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is False
    assert "username" in result["errors"]

def test_invalid_email_format():
    user_data = {
        "username": "validUser",
        "email": "invalid-email",
        "password": "P@ssword1"
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is False
    assert "email" in result["errors"]

def test_password_missing_number():
    user_data = {
        "username": "validUser",
        "email": "user@example.com",
        "password": "Password!"
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is False
    assert "password" in result["errors"]

def test_password_missing_special_char():
    user_data = {
        "username": "validUser",
        "email": "user@example.com",
        "password": "Password1"
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is False
    assert "password" in result["errors"]

def test_invalid_age():
    user_data = {
        "username": "validUser",
        "email": "user@example.com",
        "password": "P@ssword1",
        "age": 16
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is False
    assert "age" in result["errors"]

def test_invalid_referral_code_length():
    user_data = {
        "username": "validUser",
        "email": "user@example.com",
        "password": "P@ssword1",
        "referral_code": "ABCD"
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] is False
    assert "referral_code" in result["errors"]

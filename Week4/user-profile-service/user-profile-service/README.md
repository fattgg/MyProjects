# User Profile Service

This project is a backend service built using Node.js, Express, and MongoDB. It provides a set of APIs to handle user registration, authentication, and profile management. The service allows users to register, update their profiles, and retrieve their profiles. It also includes authentication via JWT tokens to secure certain routes.
## Features

- **User Registration**: Users can create a new account.
- **User Authentication**: Login functionality with JWT tokens for secure API access.
- **Profile Management**: Users can view and update their profiles.
- **Protected Routes**: Some routes are protected and require authentication via JWT tokens.

## Tech Stack

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js to handle HTTP requests and routing.
- **MongoDB**: NoSQL database for storing user information.
- **JWT (JSON Web Tokens)**: Token-based authentication for securing API endpoints.
- **Bcrypt**: A library for hashing passwords.
- **UUID**: To generate unique IDs for users.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/user-profile-service.git
cd user-profile-service

## 2. Install dependencies

```bash
npm install
```

### 2. Install MongoDB and start the service

Ensure that MongoDB is installed and running locally, or you can use a cloud service like MongoDB Atlas.

### 3.Configuration
1. Create a .env file
Create a .env file in the root directory and add the following:
PORT=5000
MONGO_URI=mongodb://localhost:27017/user-profile-service
JWT_SECRET=your-secret-key

PORT: The port your server will run on.

MONGO_URI: MongoDB connection string.

JWT_SECRET: A secret key used for signing JWT tokens.

### 4.Running the Server

```bash
node server.js
```

### 4.Testing
You can test the server using tools like Postman or Insomnia. The following tests can be done:

Register User: POST /users/

Get User by ID: GET /users/{userId}

Update User: PUT /users/{userId}

Login User: POST /auth/login

For protected routes, you’ll need to include a JWT in the Authorization header:

```bash
Authorization: Bearer {your-jwt-token}
```

## API Endpoints

### 1. POST /users/
**Description**: Register a new user.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### 2. GET /users/{id}
**Description**: Get user details by ID.
**Authorization**: JWT required in the header.
**Response**: The user object.

### 3. PUT /users/{id}
**Description**: Update user details**.
**Authorization**: JWT required in the header.

**Request Body**:
```json
{
  "name": "Updated Name",
  "email": "updatedemail@example.com"
}
```

### 4. POST /auth/login
**Description**: Login and get a JWT token.

**Request Body**:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response Body**:
```json
{
  "token": "your-jwt-token",
  "userId": "user-id"
}
```

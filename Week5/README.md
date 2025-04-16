# Product Catalog API

This is a simple RESTful API built with **Express.js** and **Supabase** to manage a product catalog. You can perform CRUD operations such as retrieving all products, getting a product by ID, creating a new product, updating an existing product, and deleting a product.

---

## Features

- **Get all products**: Fetch a list of all products in the catalog.
- **Get product by ID**: Retrieve a specific product by its unique ID.
- **Create a new product**: Add a new product to the catalog.
- **Update an existing product**: Update product details (name, description, price, etc.).
- **Delete a product**: Remove a product from the catalog.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend API.
- **Express.js**: Web framework for Node.js used to create the REST API.
- **Supabase**: Open-source Firebase alternative for database and authentication. Used here to store product data in PostgreSQL.
- **PostgreSQL**: Relational database used for storing product information.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: JavaScript runtime.
- **Supabase account**: To connect and store the products in the database.

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/product-catalog-api.git
cd product-catalog-api
```

## 2. Install Dependencies
Run the following command to install the required Node.js packages:

```bash
npm install
```

## 3. Setup Supabase

1. **Create a Project in Supabase**  
   Create a new project in [Supabase](https://supabase.io).

2. **Get Credentials**  
   Retrieve the `SUPABASE_URL` and `SUPABASE_KEY` from your Supabase project settings.

3. **Configure Environment Variables**  
   Create a `.env` file in the root of the project and add the following environment variables:

   ```ini
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

   Replace your_supabase_url and your_supabase_key with the actual values from your Supabase project.

Create the products Table
Replace `your_supabase_url` and `your_supabase_key` with the actual values from your Supabase project.

## Create the `products` Table

If the table doesn't exist yet, create it by running this SQL query in the Supabase SQL editor:

```sql
create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  price numeric(10, 2),
  category text,
  imageUrl text,
  created_at timestamp with time zone default now()
);
```

---

## API Endpoints

### 1. **Get All Products**

**Endpoint**:  
`GET /api/products`

**Description**:  
Fetch a list of all products in the catalog.

**Response**:  
- **200 OK**: Returns an array of all products.
- **500 Internal Server Error**: If there is an issue retrieving the products.

**Example Response**:
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 99.99,
    "category": "electronics",
    "image_url": "https://example.com/headphones.jpg",
    "created_at": "2023-10-01T12:00:00Z"
  },
  ...
]
```

---

### 2. **Get Product by ID**

**Endpoint**:  
`GET /api/products/:id`

**Description**:  
Retrieve a specific product by its unique ID.

**Response**:  
- **200 OK**: Returns the product details.
- **404 Not Found**: If the product with the given ID does not exist.

**Example Response**:
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 99.99,
  "category": "electronics",
  "image_url": "https://example.com/headphones.jpg",
  "created_at": "2023-10-01T12:00:00Z"
}
```

---

### 3. **Create a New Product**

**Endpoint**:  
`POST /api/products`

**Description**:  
Add a new product to the catalog.

**Request Body**:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 49.99,
  "category": "Category Name",
  "image_url": "https://example.com/product.jpg"
}
```

**Response**:  
- **201 Created**: Returns the newly created product.
- **400 Bad Request**: If the request body is invalid.

**Example Response**:
```json
{
  "id": 2,
  "name": "Smartphone",
  "description": "Latest model with high-resolution camera",
  "price": 699.99,
  "category": "electronics",
  "image_url": "https://example.com/smartphone.jpg",
  "created_at": "2023-10-01T12:00:00Z"
}
```

---

### 4. **Update a Product**

**Endpoint**:  
`PATCH /api/products/:id`

**Description**:  
Update the details of an existing product.

**Request Body**:
```json
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 59.99,
  "category": "Updated Category",
  "image_url": "https://example.com/updated-product.jpg"
}
```

**Response**:  
- **200 OK**: Returns the updated product details.
- **400 Bad Request**: If the request body is invalid.
- **404 Not Found**: If the product with the given ID does not exist.

**Example Response**:
```json
{
  "id": 1,
  "name": "Updated Wireless Headphones",
  "description": "Updated description for wireless headphones",
  "price": 89.99,
  "category": "electronics",
  "image_url": "https://example.com/updated-headphones.jpg",
  "created_at": "2023-10-01T12:00:00Z"
}
```

---

### 5. **Delete a Product**

**Endpoint**:  
`DELETE /api/products/:id`

**Description**:  
Remove a product from the catalog.

**Response**:  
- **200 OK**: Returns a success message and the deleted product details.
- **404 Not Found**: If the product with the given ID does not exist.

**Example Response**:
```json
{
  "message": "Product deleted",
  "product": {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 99.99,
    "category": "electronics",
    "image_url": "https://example.com/headphones.jpg",
    "created_at": "2023-10-01T12:00:00Z"
  }
}
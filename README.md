# TsEcommerceAPI

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/your-repo)

This is a backend API service for an e-commerce application. It provides various endpoints for user authentication, shopping cart management, product management, and user management.

## **API Documentation**

### **Authentication**

#### `POST /login`

User login endpoint.

#### `POST /register`

User registration endpoint.

### **Cart**

#### `GET /cart`

Get the cart by user ID.

#### `POST /cart`

Create a new cart.

#### `POST /cart/add-item`

Add an item to the cart.

#### `DELETE /cart/remove-item`

Remove an item from the cart.

### **Product**

#### `GET /products/{id}`

Get a product by ID.

#### `PUT /products/{id}`

Update a product by ID.

#### `DELETE /products/{id}`

Delete a product by ID.

#### `GET /products`

Get products by category.

#### `POST /products`

Create a new product.

### **User**

#### `GET /users`

Get a user by email.

#### `DELETE /users/{id}`

Delete a user by ID.

#### `PUT /users/{id}`

Update a user by ID.

## **Getting Started**

To build and run this project, you will need to have Docker and Docker Compose installed on your machine.

1. Clone this repository:

    ```
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```
    cd <project-directory>
    ```

3. Start the Docker Compose services:  
This will create the API service and a MongoDB database.
    ```
    docker-compose up
    ```

4. The API will be available at `http://localhost:8080`.

## **Contributing**

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
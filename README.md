
# Library Management System

A Node.js and TypeScript-based RESTful API for managing library users and books. This application allows operations like adding users and books, borrowing books, returning them with ratings, and viewing user or book details.

---

## Features

### User Management
- List all users.
- View details of a specific user (name, borrowed books, and user scores).
- Add a new user.

### Book Management
- List all books.
- View details of a specific book (name and average rating).
- Add a new book.

### Borrowing & Returning
- Borrow a book by a user.
- Return a book and provide a rating (1-10).

---

## Technologies Used

- **Node.js**: Backend framework.
- **TypeScript**: Type-safe development.
- **Express.js**: API framework.
- **Sequelize**: ORM for database operations.
- **MySQL**: Relational database.
- **Express Validator**: API request validation.
- **Nodemon**: Development tool for auto-restarting the server.
- **Docker**: For containerization and easy deployment.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org)

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Invent Analytics Case
   ```

2. **Start MySQL with Docker**:
   - The project includes a `docker-compose.yml` file to run MySQL.
   - Run the following command to start the MySQL database:
     ```bash
     docker-compose up -d
     ```
   - This will start a MySQL instance with the following credentials:
     - Host: `localhost`
     - Port: `3306`
     - User: `root`
     - Password: `password`
     - Database: `library_db`

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run database migrations**:
   ```bash
   npm run migrate
   ```

5. **Start the application**:
     ```bash
     npm start
     ```

6. **Access the API**:
   - Base URL: `http://localhost:3000`

---

## API Endpoints

### Users
- **GET `/users`**: List all users.
- **GET `/users/:id`**: Get details of a specific user.
- **POST `/users`**: Create a new user.

### Books
- **GET `/books`**: List all books.
- **GET `/books/:id`**: Get details of a specific book.
- **POST `/books`**: Create a new book.

### Borrowing
- **POST `/users/:id/borrow/:bookId`**: Borrow a book for a user.
- **POST `/users/:id/return/:bookId`**: Return a book and provide a rating.

---

## Docker Setup Details

### `docker-compose.yml`
The `docker-compose.yml` file defines a MySQL container with the following configuration:
```yaml
version: "3.8"
services:
  db:
    image: mysql:8.0
    container_name: library_db
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: library_db
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```

### Commands
- **Start MySQL**:
  ```bash
  docker-compose up -d
  ```
- **Stop MySQL**:
  ```bash
  docker-compose down
  ```

---

## Project Structure

```
src
├── controllers    # Handles business logic
├── middleware     # Error handling and validation
├── models         # Sequelize models and associations
├── routes         # API route definitions
└── index.ts       # Main application entry point
```

---

## Error Handling

- Centralized error middleware ensures consistent API responses:
  - **500 Internal Server Error**: For server-side issues.
  - **400 Bad Request**: For validation errors.

---

## Development Notes

- **Sequelize ORM** is used for database interaction.
- **TypeScript** ensures type safety and better developer experience.
- Validation is handled using **express-validator**.

---



Happy coding! 🚀

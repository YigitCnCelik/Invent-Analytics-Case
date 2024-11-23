# Library Management System

This is a Library Management System implemented using Node.js, Express, and Sequelize ORM with a MySQL database for Invent Analytics. The application provides functionalities to manage users and books, as well as borrowing and returning books with ratings.

## Features

- List all users
- Retrieve information about a specific user, including past and currently borrowed books
- Create a new user
- List all books
- Retrieve information about a specific book, including its average rating
- Create a new book
- Borrow a book
- Return a book and provide a rating

## Prerequisites
- nvm use 20 for simplicity
- Node.js (>= 20.x)
- npm (>= 10.x)
- MySQL

## Setup

### Clone the Repository

```bash
git clone <repository-url>
cd library-management

npm install
npm run start
```

### Database Setup
mysql -u root -p in this config password was 123

```sql
CREATE DATABASE library_management;
USE library_management;
```

-- DDL script to create tables for the library management system
```sql
-- Create Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Books table
CREATE TABLE Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score FLOAT DEFAULT NULL,
    scoreCount INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Borrows table
CREATE TABLE Borrows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    bookId INT NOT NULL,
    score INT DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (bookId) REFERENCES Books(id) ON DELETE CASCADE
);
```

to check afterwards

```sql
SHOW TABLES;

+------------------+
| Tables_in_library_management |
+------------------+
| Borrows          |
| Books            |
| Users            |
+------------------+
```

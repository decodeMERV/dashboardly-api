DROP DATABASE IF EXISTS dashboardly2;

CREATE DATABASE dashboardly2;

USE dashboardly2;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  token VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE boards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ownerId INT NOT NULL REFERENCES users (id) ON DELETE SET NULL,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  boardId INT NOT NULL REFERENCES boards (id) ON DELETE SET NULL,
  title VARCHAR(50) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (boardId) REFERENCES boards (id) ON DELETE CASCADE
);

ALTER TABLE bookmarks ADD COLUMN description varchar(100) AFTER url;

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS bhraman;
USE bhraman;

-- 2. Create users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(255),
    session_token VARCHAR(255),   
    session_expiry TIMESTAMP     
);

-- 3. Create location table
CREATE TABLE location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL,
    total_rating INT NOT NULL,
    number_of_ratings INT NOT NULL,
    description TEXT,
    hotel_names TEXT NOT NULL,
    hotel_prices TEXT NOT NULL,
    vehicle_type TEXT,
    image_url VARCHAR(255) NOT NULL
);

-- 4. Create booking table (linked to users)
CREATE TABLE booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_id INT NOT NULL,
    vehicle_type VARCHAR(50),
    number_of_people INT NOT NULL,
    booking_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (location_id) REFERENCES location(location_id)
);

-- 5. Create comment table (linked to users and location table)
CREATE TABLE comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_id INT NOT NULL,
    comment TEXT NOT NULL,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (location_id) REFERENCES location(location_id)
);

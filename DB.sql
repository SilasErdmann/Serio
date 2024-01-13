CREATE DATABASE serio_db; 
USE serio_db;

CREATE TABLE users ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    email VARCHAR(100) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL 
    );

CREATE TABLE media ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    image VARCHAR(255) NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    release_date DATE NOT NULL, 
    total_runtime SMALLINT, 
    fsk ENUM('0', '6', '12', '16', '18'), 
    description TEXT NOT NULL 
    );

CREATE TABLE comments ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    text TEXT NOT NULL, 
    date DATETIME, 
    media_id INT NOT NULL, 
    FOREIGN KEY (media_id) REFERENCES media(id), 
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES user(id) 
    );

CREATE TABLE ratings ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    rating TINYINT, 
    media_id INT NOT NULL, 
    FOREIGN KEY (media_id) REFERENCES media(id), 
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES user(id) 
    );

CREATE TABLE seasons ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    number TINYINT NOT NULL, 
    name VARCHAR(100), 
    description TEXT, 
    media_id INT NOT NULL, 
    FOREIGN KEY (media_id) REFERENCES media(id) 
    );

CREATE TABLE episodes ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    number TINYINT NOT NULL, 
    name VARCHAR(100), 
    description TEXT, 
    runtime SMALLINT NOT NULL, 
    season_id INT NOT NULL, 
    FOREIGN KEY(season_id) REFERENCES seasons(id) 
    );

CREATE TABLE contributors ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    role ENUM('Autor', 'Schauspieler', 'Regisseur') NOT NULL 
    );

CREATE TABLE media_contributors ( 
    media_id INT NOT NULL, 
    contributor_id INT NOT NULL, 
    PRIMARY KEY (media_id, contributor_id), 
    FOREIGN KEY (media_id) REFERENCES media(id), 
    FOREIGN KEY (contributor_id) REFERENCES contributors(id) 
    );

CREATE TABLE genres ( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL 
    );

CREATE TABLE media_genres ( 
    media_id INT NOT NULL, 
    genre_id INT NOT NULL, 
    PRIMARY KEY (media_id, genre_id), 
    FOREIGN KEY (media_id) REFERENCES media(id), 
    FOREIGN KEY (genre_id) REFERENCES genres(id) 
    );
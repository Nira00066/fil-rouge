-- ==========================
-- 1. Création de la base
-- ==========================
CREATE DATABASE IF NOT EXISTS NovaMett;

USE NovaMett;

-- 2. Table role (créée avant user car user en dépend)
CREATE TABLE IF NOT EXISTS role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE
);

-- 3. Table user
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    role_id INT,
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    Url_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- 4. Table location
CREATE TABLE IF NOT EXISTS location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    ville VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- 5. Table category
CREATE TABLE IF NOT EXISTS category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255)
);

-- 6. Table tags
CREATE TABLE IF NOT EXISTS tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255)
);

-- 7. Table imgEvent
CREATE TABLE IF NOT EXISTS imgEvent (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Url_principal VARCHAR(255) NOT NULL,
    Url_second VARCHAR(255)
);

-- 8. Table event
CREATE TABLE IF NOT EXISTS event (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category_id INT,
    location_id INT,
    tags_id INT,
    imgEvent_id INT,
    date_start DATETIME NOT NULL,
    date_end DATETIME NOT NULL,
    hour_start TIME NOT NULL,
    hour_end TIME NOT NULL,
    prix DECIMAL(10,2),
    lieu VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    description TEXT,
    regle_event VARCHAR(255),
    services_dispo VARCHAR(255),
    tel VARCHAR(20),
    email VARCHAR(255),
    siteUrl VARCHAR(255),
    reSociaux VARCHAR(255),
    nomOrga VARCHAR(255),
    desOrga TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (imgEvent_id) REFERENCES imgEvent(id),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (tags_id) REFERENCES tags(id),
    FOREIGN KEY (location_id) REFERENCES location(id)
);

-- 9. Table Favori (Many-to-Many user/event)
CREATE TABLE IF NOT EXISTS Favori (
    user_id INT,
    event_id INT,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

-- 10. Table location_user (Many-to-Many user/location)
CREATE TABLE IF NOT EXISTS location_user (
    user_id INT,
    location_id INT,
    PRIMARY KEY (user_id, location_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (location_id) REFERENCES location(id)
);

-- 11. Table form
CREATE TABLE IF NOT EXISTS form (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    picture VARCHAR(255),
    sujet VARCHAR(255),
    message LONGTEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- 12. Table tag_event (Many-to-Many tags/event)
CREATE TABLE IF NOT EXISTS tag_event (
    tags_id INT,
    event_id INT,
    PRIMARY KEY (event_id, tags_id),
    FOREIGN KEY (tags_id) REFERENCES tags(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

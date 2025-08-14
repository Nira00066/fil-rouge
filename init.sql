-- ==========================
-- 1. Création de la base
-- ==========================
CREATE DATABASE IF NOT EXISTS NovaMett;

USE NovaMett;

-- 2. Table user
-- C'est la table principale pour stocker les infos des utilisateurs.
CREATE TABLE
    IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        role_id INT
        lastname VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        Url_picture VARCHAR(255),
        FOREIGN KEY (role_id) REFERENCES role(id);
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- 3. Table location
CREATE TABLE
    IF NOT EXISTS location (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        ville VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES user (id)
    );
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE
);

-- 4. Table category
-- Stocke les catégories d'événements.
CREATE TABLE
    IF NOT EXISTS category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        label VARCHAR(255)
    );

-- 5. Table tags
-- Liste des tags disponibles pour les événements.
CREATE TABLE
    IF NOT EXISTS tags (
        id INT PRIMARY KEY AUTO_INCREMENT,
        label VARCHAR(255)
    );

-- 6. Table imgEvent
-- Stocke les images liées aux événements.
CREATE TABLE
    IF NOT EXISTS imgEvent (
        id INT PRIMARY KEY AUTO_INCREMENT,
        Url_principal VARCHAR(255) NOT NULL,
        Url_second VARCHAR(255)
    );

-- 7. Table event
-- On crée maintenant la table des événements.
CREATE TABLE
    IF NOT EXISTS event (
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
        prix DECIMAL(10, 2) CHECK (prix > 0),
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        FOREIGN KEY (imgEvent_id) REFERENCES imgEvent (id),
        FOREIGN KEY (category_id) REFERENCES category (id),
        FOREIGN KEY (tags_id) REFERENCES tags (id),
        FOREIGN KEY (location_id) REFERENCES location (id)
    );

-- 8. Table Favori
-- Table de relation Many-to-Many entre user et event.
CREATE TABLE
    IF NOT EXISTS Favori (
        user_id INT,
        event_id INT,
        PRIMARY KEY (user_id, event_id),
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (event_id) REFERENCES event (id)
    );


-- 9. Table location_user
-- Table de relation Many-to-Many entre user et location.
CREATE TABLE
    IF NOT EXISTS location_user (
        user_id INT,
        location_id INT,
        PRIMARY KEY (user_id, location_id),
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (location_id) REFERENCES location (id)
    );


-- 10. Table form
-- Formulaire de contact ou autre.
CREATE TABLE
    IF NOT EXISTS form (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE,
        picture VARCHAR(255),
        sujet VARCHAR(255),
        message LONGTEXT,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES user (id)
    );


-- 11. Table tag_event
-- Table de relation Many-to-Many entre tags et event.

CREATE TABLE
    IF NOT EXISTS tag_event (
        tags_id INT,
        event_id INT,
        PRIMARY KEY (event_id, tags_id),
        FOREIGN KEY (tags_id) REFERENCES tags (id),
        FOREIGN KEY (event_id) REFERENCES event (id)
    );


/*
Questions: 

- 1 : Est-ce que une table de laison peut etre utiliser pour une autre table comme lieu de stockage ? 
exemple table url_picture ou tu est en many to many avec l'event  et many to 1 avec le user ?

- 2 : quand tu crée un formulaire on est d'accord qu'il dois etre envoyer a quelqu'un  mais qui ? si admin a l'admin  ou on dois mettre en  chemain un email ou c'est recu ? 



 */
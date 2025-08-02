CREATE DATABASE IF NOT EXISTS NovaMett;

-- Creation de la bases de bonnée 
USE NovaMett;

CREATE TABLE
    IF NOT EXISTS user (
        id int PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        lastname VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        Url_picture VARCHAR(255) created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    -- Table des villes (locations)
CREATE TABLE
    IF NOT EXISTS Favori (
        user_id INT,
        event_id INT,
        PRIMARY KEY (user_id, event_id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (event_id) REFERENCES event(id)
    )
    -- Localisation liste ou les listes souhaitez 
CREATE TABLE
    IF NOT EXISTS location (
        id int PRIMARY KEY AUTO_INCREMANT,
        user_id INT,
        -- qustion je sais plus si tu as la clée ici ou pas ?
        ville VARCHAR(255) 
        FOREIGN KEY (user_id) REFERENCES user (id)
    )
    -- Table de jointure entre user et location (many-to-many)
CREATE TABLE
    IF NOT EXISTS location_user (
        user_id INT,
        location_id INT,
        PRIMARY KEY (user_id, location_id),
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (location_id) REFERENCES location (id)
        -- cest une table jointure de lacation a user
    )
    -- Table formulaire de contact ou autre
CREATE TABLE
    IF NOT EXISTS form (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE,
        picture VARCHAR(255),
        sujet VARCHAR(255),
        message LONGTEXT,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES user(id)
    )
CREATE TABLE
    IF NOT EXISTS tags (
        id INT PRIMARY KEY AUTO_INCREMENT,
        label VARCHAR(255)
    )
CREATE TABLE
    IF NOT EXISTS tag_event (
        tags_id INT,
        event_id INT,
        PRIMARY KEY (event_id, tags_id),
        FOREIGN KEY (tags_id) REFERENCES tags(id),
        FOREIGN KEY (event_id) REFERENCES event(id)
        --   table de laison entre tags et event
    )
CREATE TABLE
    IF NOT EXISTS category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        Label VARCHAR(255),
        event_id INT,
        FOREIGN KEY (event_id) REFERENCES event(id)
        --   table de laison entre tags et event
    )
CREATE TABLE
    IF NOT EXISTS event (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        category_id INT,
        location_id INT,
        tags_id INT,
        Url_principal VARCHAR(255) NOT NULL,
        Url_second VARCHAR(255),
        date_Start DATETIME NOT NULL,
        date_end DATETIME NOT NULL,
        hour_start TIME NOT NULL,
        hour_end TIME NOT NULL,
        prix DECIMAL(10, 2) CHECK (prix > 0),
        lieu VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,                  
        description TEXT,
        regle_event VARCHAR(255),
        services_dispo VARCHAR(255),
        tel NUMBER,
        email VARCHAR(255),
        siteUrl VARCHAR(255),
        reSociaux VARCHAR(255),
        nomOrga VARCHAR(255),
        FOREIGN KEY (category_id) REFERENCES category(id),
        FOREIGN KEY (tags_id) REFERENCES tags(id),
        FOREIGN KEY (location_id) REFERENCES location(id),
        desOrga TEXT created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

    /*
    Questions: 

    - 1 : Est-ce que une table de laison peut etre utiliser pour une autre table comme lieu de stockage ? 
    exemple table url_picture ou tu est en many to many avec l'event  et many to 1 avec le user ?

    - 2 : quand tu crée un formulaire on est d'accord qu'il dois etre envoyer a quelqu'un  mais qui ? si admin a l'admin  ou on dois mettre en  chemain un email ou c'est recu ? 

    
    
    */
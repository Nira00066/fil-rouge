CREATE DATABASE IF NOT EXISTS NovaMeet;
USE NovaMeet;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS 
  tag_event,
  favorite,
  location_user,
  contact_form,
  `event`,
  event_image,
  tags,
  category,
  location,
  `user`,
  `role`;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
-- Roles
-- ----------------------------
CREATE TABLE `role` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

-- ----------------------------
-- Locations
-- ----------------------------
CREATE TABLE location (
  id INT PRIMARY KEY AUTO_INCREMENT,
  city VARCHAR(255)
);

-- ----------------------------
-- Users
-- ----------------------------
CREATE TABLE `user` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  lastname VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  profile_picture_url VARCHAR(255) DEFAULT './assets/images/nissan.webp',
  role_id INT DEFAULT 2,
  location_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES `role` (id),
  CONSTRAINT fk_user_location FOREIGN KEY (location_id) REFERENCES location (id)
);

-- ----------------------------
-- Categories
-- ----------------------------
CREATE TABLE category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(10),
  description VARCHAR(255)
);

-- ----------------------------
-- Tags
-- ----------------------------
CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(255) UNIQUE
);

-- ----------------------------
-- Event images
-- ----------------------------
CREATE TABLE event_image (
  id INT PRIMARY KEY AUTO_INCREMENT,
  main_url VARCHAR(255) NOT NULL,
  secondary_url VARCHAR(255)
);

-- ----------------------------
-- Events
-- ----------------------------
CREATE TABLE `event` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category_id INT,
  location_id INT,
  user_id INT,
  event_image_id INT,
  date_start DATETIME NOT NULL,
  date_end DATETIME NOT NULL,
  hour_start TIME NOT NULL,
  hour_end TIME NOT NULL,
  price DECIMAL(10, 2),
  address VARCHAR(255) NOT NULL,
  description TEXT,
  event_rules VARCHAR(255),
  available_services VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  website_url VARCHAR(255),
  social_name VARCHAR(255),
  organization_name VARCHAR(255),
  organization_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME DEFAULT NULL,
  CONSTRAINT fk_event_category FOREIGN KEY (category_id) REFERENCES category (id),
  CONSTRAINT fk_event_location FOREIGN KEY (location_id) REFERENCES location (id),
  CONSTRAINT fk_event_image FOREIGN KEY (event_image_id) REFERENCES event_image (id),
  CONSTRAINT fk_event_user FOREIGN KEY (user_id) REFERENCES `user` (id)
);

-- ----------------------------
-- Favorites
-- ----------------------------
CREATE TABLE favorite (
  user_id INT,
  event_id INT,
  PRIMARY KEY (user_id, event_id),
  CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES `user` (id),
  CONSTRAINT fk_favorite_event FOREIGN KEY (event_id) REFERENCES `event` (id)
);

-- ----------------------------
-- User <-> Location
-- ----------------------------
CREATE TABLE location_user (
  user_id INT,
  location_id INT,
  PRIMARY KEY (user_id, location_id),
  CONSTRAINT fk_locuser_user FOREIGN KEY (user_id) REFERENCES `user` (id),
  CONSTRAINT fk_locuser_location FOREIGN KEY (location_id) REFERENCES location (id)
);

-- ----------------------------
-- Event <-> Tags
-- ----------------------------
CREATE TABLE tag_event (
  tag_id INT,
  event_id INT,
  PRIMARY KEY (event_id, tag_id),
  CONSTRAINT fk_tagevent_tag FOREIGN KEY (tag_id) REFERENCES tags (id),
  CONSTRAINT fk_tagevent_event FOREIGN KEY (event_id) REFERENCES `event` (id)
);

-- ----------------------------
-- Contact forms
-- ----------------------------
CREATE TABLE contact_form (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  subject VARCHAR(255),
  message LONGTEXT,
  user_id INT,
  CONSTRAINT fk_form_user FOREIGN KEY (user_id) REFERENCES `user` (id)
);

-- ----------------------------
-- INSERTS
-- ----------------------------

-- Roles
INSERT INTO role (name) VALUES ('admin'), ('user');

-- Locations
INSERT INTO location (city) VALUES ('Bayonne'), ('Biarritz'), ('Dax'), ('Pau'), ('Bordeaux');

-- Users
INSERT INTO `user` (name, lastname, email, hashed_password, role_id, location_id)
VALUES
  ('Nina', 'Lopez', 'admin@novameet.com', 'hashed_admin_pass', 1, 1),
  ('Alex', 'Martin', 'user@novameet.com', 'hashed_user_pass', 2, 5);

-- Categories (nouvelles avec slug + icon)
INSERT INTO category (label, slug, icon, description) VALUES
('Compétition & Performance', 'competition', '🏁', 'Courses, drift, runs, time attack'),
('Rassemblements & Meets', 'rassemblements', '🚗', 'Meetings, balades, clubs et communauté'),
('Mécanique & Préparation', 'mecanique', '🔧', 'Prépa, atelier, tuning, stages'),
('Shows & Festivals', 'carshow', '🎉', 'Salons auto/moto et festivals mécaniques'),
('Offroad & Aventure', 'offroad', '🏔️', '4x4, rallye-raid, quads, escapades'),
('Innovation & Futur', 'innovation', '⚡', 'Tech, véhicules électriques, innovations'),
('Culture & Lifestyle', 'culture', '🧠', 'Vintage, expo, art mécanique et lifestyle');

-- Tags
INSERT INTO tags (label) VALUES ('Tuning'), ('Sport'), ('Classic'), ('Moto'), ('Family');

-- Event images
INSERT INTO event_image (main_url, secondary_url) VALUES
('img/events/rally_bayonne.jpg', NULL),
('img/events/show_biarritz.jpg', NULL),
('img/events/festival_dax.jpg', NULL);

-- Events
INSERT INTO `event` (
  title, category_id, location_id, user_id, event_image_id,
  date_start, date_end, hour_start, hour_end, price, address,
  description, event_rules, available_services, phone, email,
  website_url, social_name, organization_name, organization_description
) VALUES
('Bayonne Auto Rally', 1, 1, 1, 1, '2025-06-15 10:00:00', '2025-06-15 18:00:00', '10:00:00', '18:00:00',
  20.00, 'Parc des Expositions', 'Annual rally event in Bayonne.', 'Helmet required for drivers', 
  'Food, Drinks, Parking', '+33611111111', 'contact@bayonnerally.com', 'www.bayonnerally.com', 
  '@bayonnerally', 'Bayonne Racing Club', 'Local racing association organizing rally events.'),
('Biarritz Car Show', 4, 2, 1, 2, '2025-07-20 09:00:00', '2025-07-20 19:00:00', '09:00:00', '19:00:00',
  15.00, 'Grande Plage Parking', 'Car exhibition and tuning festival.', 'No burnouts allowed',
  'Food Trucks, Merch Stands', '+33622222222', 'info@biarritzshow.com', 'www.biarritzshow.com',
  '@biarritzcarshow', 'Biarritz Auto Club', 'Club promoting car culture in Biarritz.'),
('Dax Moto Festival', 5, 3, 2, 3, '2025-08-10 12:00:00', '2025-08-12 22:00:00', '12:00:00', '22:00:00',
  25.00, 'Zénith Arena', 'Motorcycle festival with live music and shows.', 'Helmet required', 
  'Camping, Food, Concerts', '+33633333333', 'fest@daxmoto.com', 'www.daxmotofest.com', 
  '@daxmoto', 'Moto Dax Assoc', 'Motorcycle enthusiasts association.');

-- Tag associations
INSERT INTO tag_event (tag_id, event_id) VALUES
(2, 1),
(3, 2),
(1, 2),
(4, 3),
(5, 3);

-- Favorites
INSERT INTO favorite (user_id, event_id) VALUES (2, 1), (2, 2);
-- Location_User associations
INSERT INTO location_user (user_id, location_id) VALUES (2, 1), (2, 5);

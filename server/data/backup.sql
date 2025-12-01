-- MySQL dump 10.13  Distrib 8.4.5, for Win64 (x86_64)
--
-- Host: localhost    Database: novameet
-- ------------------------------------------------------
-- Server version	8.4.5
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!50503 SET NAMES utf8mb4 */;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;

/*!40103 SET TIME_ZONE='+00:00' */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--
DROP TABLE IF EXISTS `category`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `category` (
    `id` int NOT NULL AUTO_INCREMENT,
    `label` varchar(255) DEFAULT NULL,
    `slug` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `slug` (`slug`),
    UNIQUE KEY `label` (`label`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--
LOCK TABLES `category` WRITE;

/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO
  `category`
VALUES
  (1, 'Compétition & Performance', 'competition'),
  (2, 'Rassemblements & Meets', 'rassemblements'),
  (3, 'Mécanique & Préparation', 'mecanique'),
  (4, 'Shows & Festivals', 'carshow'),
  (5, 'Offroad & Aventure', 'offroad'),
  (6, 'Innovation & Futur', 'innovation'),
  (7, 'Culture & Lifestyle', 'culture');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `contact_form`
--
DROP TABLE IF EXISTS `contact_form`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `contact_form` (
    `id` int NOT NULL AUTO_INCREMENT,
    `email` varchar(255) DEFAULT NULL,
    `subject` varchar(255) DEFAULT NULL,
    `message` longtext,
    `user_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    KEY `fk_form_user` (`user_id`),
    CONSTRAINT `fk_form_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_form`
--
LOCK TABLES `contact_form` WRITE;

/*!40000 ALTER TABLE `contact_form` DISABLE KEYS */;

/*!40000 ALTER TABLE `contact_form` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `event`
--
DROP TABLE IF EXISTS `event`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `event` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `category_id` int DEFAULT NULL,
    `location_id` int DEFAULT NULL,
    `event_image_id` int DEFAULT NULL,
    `user_id` int DEFAULT NULL,
    `date_start` datetime NOT NULL,
    `date_end` datetime NOT NULL,
    `hour_start` time NOT NULL,
    `hour_end` time NOT NULL,
    `price` varchar(50) DEFAULT NULL,
    `address` varchar(255) NOT NULL,
    `description` text,
    `event_rules` varchar(255) DEFAULT NULL,
    `available_services` varchar(255) DEFAULT NULL,
    `phone` varchar(20) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `website_url` varchar(255) DEFAULT NULL,
    `social_name` varchar(255) DEFAULT NULL,
    `organization_name` varchar(255) DEFAULT NULL,
    `organization_description` text,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_event_category` (`category_id`),
    KEY `fk_event_location` (`location_id`),
    KEY `fk_event_image` (`event_image_id`),
    KEY `fk_event_user` (`user_id`),
    CONSTRAINT `fk_event_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
    CONSTRAINT `fk_event_image` FOREIGN KEY (`event_image_id`) REFERENCES `event_image` (`id`),
    CONSTRAINT `fk_event_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
    CONSTRAINT `fk_event_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--
LOCK TABLES `event` WRITE;

/*!40000 ALTER TABLE `event` DISABLE KEYS */;

INSERT INTO
  `event`
VALUES
  (
    1,
    'Bayonne Auto Rally',
    2,
    1,
    1,
    NULL,
    '2025-06-15 10:00:00',
    '2025-06-15 18:00:00',
    '10:00:00',
    '18:00:00',
    '20.00',
    'Parc des Expositions',
    'Annual rally event in Bayonne.',
    'Helmet required for drivers',
    'Food, Drinks, Parking',
    '+33611111111',
    'contact@bayonnerally.com',
    'www.bayonnerally.com',
    '@bayonnerally',
    'Bayonne Racing Club',
    'Local racing association organizing rally events.',
    '2025-08-29 10:10:53',
    '2025-08-29 10:10:53',
    NULL
  ),
  (
    2,
    'Biarritz Car Show',
    1,
    2,
    2,
    NULL,
    '2025-07-20 09:00:00',
    '2025-07-20 19:00:00',
    '09:00:00',
    '19:00:00',
    '15.00',
    'Grande Plage Parking',
    'Car exhibition and tuning festival.',
    'No burnouts allowed',
    'Food Trucks, Merch Stands',
    '+33622222222',
    'info@biarritzshow.com',
    'www.biarritzshow.com',
    '@biarritzcarshow',
    'Biarritz Auto Club',
    'Club promoting car culture in Biarritz.',
    '2025-08-29 10:10:53',
    '2025-08-29 10:10:53',
    NULL
  ),
  (
    3,
    'Dax Moto Festival',
    5,
    3,
    3,
    NULL,
    '2025-08-10 12:00:00',
    '2025-08-12 22:00:00',
    '12:00:00',
    '22:00:00',
    '25.00',
    'Zénith Arena',
    'Motorcycle festival with live music and shows.',
    'Motorcycle helmet required',
    'Camping, Food, Concerts',
    '+33633333333',
    'fest@daxmoto.com',
    'www.daxmotofest.com',
    '@daxmoto',
    'Moto Dax Assoc',
    'Motorcycle enthusiasts association.',
    '2025-08-29 10:10:53',
    '2025-08-29 10:10:53',
    NULL
  ),
  (
    4,
    'fesfesfes',
    3,
    2,
    NULL,
    1,
    '1998-11-10 00:00:00',
    '2025-05-05 00:00:00',
    '10:00:00',
    '20:00:00',
    '5.00',
    'ffefesfesfse',
    'fesfersfsefesfes',
    '[\"Respecter les horaires\",\"Port du casque obligatoire pour les pilotes\",\"Interdiction de jeter des déchets\",\"Suivre les consignes des organisateurs\",\"Respect des autres participants\",\"tdgdgrd\"]',
    '[\"Parking sécurisé\",\"grdgrdgr\"]',
    '0605050505',
    'user1@example.com',
    '',
    '',
    '',
    '',
    '2025-11-13 13:45:04',
    '2025-11-13 13:45:04',
    NULL
  ),
  (
    5,
    'grdgrdgrd',
    1,
    2,
    4,
    1,
    '2025-10-10 00:00:00',
    '2025-02-20 00:00:00',
    '11:00:00',
    '21:00:00',
    '',
    'ffefesfesfse',
    '',
    '[\"Interdiction de jeter des déchets\",\"Port du casque obligatoire pour les pilotes\"]',
    '[\"Toilettes publiques\",\"Restaurant sur place\",\"Animations pour enfants\"]',
    '',
    '',
    '',
    '',
    '',
    '',
    '2025-11-13 14:23:55',
    '2025-11-13 14:23:55',
    NULL
  );

/*!40000 ALTER TABLE `event` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `event_image`
--
DROP TABLE IF EXISTS `event_image`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `event_image` (
    `id` int NOT NULL AUTO_INCREMENT,
    `main_url` varchar(255) NOT NULL,
    `secondary_url` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_image`
--
LOCK TABLES `event_image` WRITE;

/*!40000 ALTER TABLE `event_image` DISABLE KEYS */;

INSERT INTO
  `event_image`
VALUES
  (1, 'images/events/rally_bayonne.jpg', NULL),
  (2, 'images/events/show_biarritz.jpg', NULL),
  (3, 'images/events/festival_dax.jpg', NULL),
  (
    4,
    'images/events/1763043835470-457293978.jpg',
    NULL
  );

/*!40000 ALTER TABLE `event_image` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `favorite`
--
DROP TABLE IF EXISTS `favorite`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `favorite` (
    `user_id` int NOT NULL,
    `event_id` int NOT NULL,
    PRIMARY KEY (`user_id`, `event_id`),
    KEY `fk_favorite_event` (`event_id`),
    CONSTRAINT `fk_favorite_event` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
    CONSTRAINT `fk_favorite_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--
LOCK TABLES `favorite` WRITE;

/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;

INSERT INTO
  `favorite`
VALUES
  (2, 1),
  (2, 2);

/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `location`
--
DROP TABLE IF EXISTS `location`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `location` (
    `id` int NOT NULL AUTO_INCREMENT,
    `city` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--
LOCK TABLES `location` WRITE;

/*!40000 ALTER TABLE `location` DISABLE KEYS */;

INSERT INTO
  `location`
VALUES
  (1, 'Bayonne'),
  (2, 'Biarritz'),
  (3, 'Dax'),
  (4, 'Pau'),
  (5, 'Bordeaux');

/*!40000 ALTER TABLE `location` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `location_user`
--
DROP TABLE IF EXISTS `location_user`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `location_user` (
    `user_id` int NOT NULL,
    `location_id` int NOT NULL,
    PRIMARY KEY (`user_id`, `location_id`),
    KEY `fk_locuser_location` (`location_id`),
    CONSTRAINT `fk_locuser_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
    CONSTRAINT `fk_locuser_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_user`
--
LOCK TABLES `location_user` WRITE;

/*!40000 ALTER TABLE `location_user` DISABLE KEYS */;

/*!40000 ALTER TABLE `location_user` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `role`
--
DROP TABLE IF EXISTS `role`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `role` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--
LOCK TABLES `role` WRITE;

/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO
  `role`
VALUES
  (1, 'admin'),
  (2, 'user');

/*!40000 ALTER TABLE `role` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `tag_event`
--
DROP TABLE IF EXISTS `tag_event`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `tag_event` (
    `tag_id` int NOT NULL,
    `event_id` int NOT NULL,
    PRIMARY KEY (`event_id`, `tag_id`),
    KEY `fk_tagevent_tag` (`tag_id`),
    CONSTRAINT `fk_tagevent_event` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
    CONSTRAINT `fk_tagevent_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_event`
--
LOCK TABLES `tag_event` WRITE;

/*!40000 ALTER TABLE `tag_event` DISABLE KEYS */;

INSERT INTO
  `tag_event`
VALUES
  (1, 2),
  (2, 1),
  (3, 2),
  (4, 3),
  (5, 3);

/*!40000 ALTER TABLE `tag_event` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `tags`
--
DROP TABLE IF EXISTS `tags`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `tags` (
    `id` int NOT NULL AUTO_INCREMENT,
    `label` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `label` (`label`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--
LOCK TABLES `tags` WRITE;

/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO
  `tags`
VALUES
  (3, 'Classic'),
  (5, 'Family'),
  (4, 'Moto'),
  (2, 'Sport'),
  (1, 'Tuning');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `user`
--
DROP TABLE IF EXISTS `user`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `lastname` varchar(255) DEFAULT NULL,
    `email` varchar(255) NOT NULL,
    `hashed_password` varchar(255) NOT NULL,
    `profile_picture_url` varchar(255) DEFAULT './assets/images/nissan.webp',
    `role_id` int DEFAULT NULL,
    `location_id` int DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    KEY `fk_user_role` (`role_id`),
    KEY `fk_user_location` (`location_id`),
    CONSTRAINT `fk_user_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
    CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--
LOCK TABLES `user` WRITE;

/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO
  `user`
VALUES
  (
    1,
    'Nina',
    'Lopez',
    'admin@novamett.com',
    'hashed_admin_pass',
    './assets/images/nissan.webp',
    1,
    1,
    '2025-08-29 10:10:53',
    '2025-08-29 10:10:53'
  ),
  (
    2,
    'Alex',
    'Martin',
    'user@novamett.com',
    'hashed_user_pass',
    './assets/images/nissan.webp',
    2,
    5,
    '2025-08-29 10:10:53',
    '2025-08-29 10:10:53'
  ),
  (
    3,
    NULL,
    NULL,
    'exemple@gmail.com',
    '$2b$10$dmPNr3IkCCFM5iSbBR3xs.twdzZJ81Odpi8i1tdMK7g8f8zzgVFpO',
    './assets/images/nissan.webp',
    NULL,
    NULL,
    '2025-08-29 10:14:42',
    '2025-08-29 10:14:42'
  ),
  (
    5,
    'nina',
    'lilou',
    'exemple2@gmail.com',
    '$2b$10$QB2mGOzt8VNNjZ3fjDwykuA3BPEP8p7zqOzkDnE8O.aVo4.5p/.Yu',
    './assets/images/nissan.webp',
    NULL,
    NULL,
    '2025-11-04 16:07:35',
    '2025-11-04 16:07:35'
  ),
  (
    6,
    'nina',
    'michel',
    'exem@gmail.com',
    '$2b$10$v8sfZz0P/DFwDSA.GsiOGeqKc3PPMTWnSDSXy3oHTyA53QGR7m2Du',
    './assets/images/nissan.webp',
    NULL,
    NULL,
    '2025-11-07 10:25:12',
    '2025-11-07 10:25:12'
  ),
  (
    7,
    'aze',
    'test',
    'dev.tester@example.com',
    '$2b$10$G1zFUcnjCMLMy3JPm6/Yg.GNaOzzenVRdMBD11RdsnM0qBWiMwF76',
    './assets/images/nissan.webp',
    NULL,
    NULL,
    '2025-11-07 10:31:05',
    '2025-11-07 10:31:05'
  ),
  (
    8,
    'caca',
    'caca',
    'user1@example.com',
    '$2b$10$NA7mXnS/uOW0BnhFXiXq.OzZ8mltuZ9DES/Ni3Lm0luSwSen4JPZW',
    './assets/images/nissan.webp',
    NULL,
    NULL,
    '2025-11-07 10:33:27',
    '2025-11-07 10:33:27'
  ),
  (
    9,
    'test',
    'test',
    'test.dev@gmail.com',
    '$2b$10$7yUC9NgMM8lpAinlHTitPuVl400K5vjX.tYi3V9l5WwYV8oyRWaZS',
    './assets/images/nissan.webp',
    NULL,
    NULL,
    '2025-11-07 10:34:57',
    '2025-11-07 10:34:57'
  );

/*!40000 ALTER TABLE `user` ENABLE KEYS */;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 13:39:38
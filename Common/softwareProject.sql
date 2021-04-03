-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: softwareproject
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `addressID` int NOT NULL AUTO_INCREMENT,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zipcode` int NOT NULL,
  `userID` int NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`addressID`),
  KEY `userID` (`userID`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'1600 Pennsylvania Avenue, N.W.','','Washington','DC',20500,1,1),(2,'Residence of B. Baggins Esquire','','Bag End','The Shire',0,1,0),(3,'DEBUG MAIN ADDRESS','DEBUG SECOND ADDRESS','DEBUG CITY','DEBUG STATE',1,2,1),(4,'DEBUG SECONDARY ADDRESS','DEBUG SECOND ADDRESS','DEBUG CITY 2 ','DEBUG STATE 2 ',2,2,0),(5,'The al\'Thor Farm','Literally the only house there','Emond\'s Field','The Two Rivers',3,3,1);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `historyID` int NOT NULL AUTO_INCREMENT,
  `gallonsRequested` double NOT NULL,
  `deliveryDate` date NOT NULL,
  `pricePerGallon` double NOT NULL,
  `totalPrice` double NOT NULL,
  `userID` int NOT NULL,
  `addressID` int NOT NULL,
  PRIMARY KEY (`historyID`),
  KEY `userID` (`userID`),
  KEY `addressID` (`addressID`),
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `history_ibfk_2` FOREIGN KEY (`addressID`) REFERENCES `addresses` (`addressID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,1,'2006-05-01',10,10,1,1),(2,1.5,'2021-01-01',2,3,2,3),(3,9001,'3001-12-12',0,0,2,4);
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- CREATING TABLE STATES
DROP TABLE IF EXISTS `states`;

CREATE TABLE `states` (
  `state` CHAR(2)
);

--Populating states
LOCK TABLES `states` WRITE;
INSERT INTO `states` VALUES("AL"); 
INSERT INTO `states` VALUES("AK"); 
INSERT INTO `states` VALUES("AZ"); 
INSERT INTO `states` VALUES("AR"); 
INSERT INTO `states` VALUES("CA"); 
INSERT INTO `states` VALUES("CO"); 
INSERT INTO `states` VALUES("CT"); 
INSERT INTO `states` VALUES("DE"); 
INSERT INTO `states` VALUES("FL"); 
INSERT INTO `states` VALUES("GA"); 
INSERT INTO `states` VALUES("HI"); 
INSERT INTO `states` VALUES("ID"); 
INSERT INTO `states` VALUES("IL"); 
INSERT INTO `states` VALUES("IN"); 
INSERT INTO `states` VALUES("IA"); 
INSERT INTO `states` VALUES("KS"); 
INSERT INTO `states` VALUES("KY"); 
INSERT INTO `states` VALUES("LA"); 
INSERT INTO `states` VALUES("ME"); 
INSERT INTO `states` VALUES("MD"); 
INSERT INTO `states` VALUES("MA"); 
INSERT INTO `states` VALUES("MI"); 
INSERT INTO `states` VALUES("MN"); 
INSERT INTO `states` VALUES("MS"); 
INSERT INTO `states` VALUES("MO"); 
INSERT INTO `states` VALUES("MT"); 
INSERT INTO `states` VALUES("NE"); 
INSERT INTO `states` VALUES("NV"); 
INSERT INTO `states` VALUES("NH"); 
INSERT INTO `states` VALUES("NJ"); 
INSERT INTO `states` VALUES("NM"); 
INSERT INTO `states` VALUES("NY"); 
INSERT INTO `states` VALUES("NC"); 
INSERT INTO `states` VALUES("ND"); 
INSERT INTO `states` VALUES("OH"); 
INSERT INTO `states` VALUES("OK"); 
INSERT INTO `states` VALUES("OR"); 
INSERT INTO `states` VALUES("PA"); 
INSERT INTO `states` VALUES("RI"); 
INSERT INTO `states` VALUES("SC"); 
INSERT INTO `states` VALUES("SD"); 
INSERT INTO `states` VALUES("TN"); 
INSERT INTO `states` VALUES("TX"); 
INSERT INTO `states` VALUES("UT"); 
INSERT INTO `states` VALUES("VT"); 
INSERT INTO `states` VALUES("VA"); 
INSERT INTO `states` VALUES("WA"); 
INSERT INTO `states` VALUES("WV"); 
INSERT INTO `states` VALUES("WI"); 
INSERT INTO `states` VALUES("WY"); 

UNLOCK TABLES; 
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','pass1','Joe_Biden'),(2,'DEBUG_USER','DEBUG_PASS','DEBUG USER'),(3,'justice','dragon','Tam_al\'Thor'');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-01 12:40:43

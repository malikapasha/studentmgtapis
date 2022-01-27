-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: attendance.cxawzmd8wcoz.ap-south-1.rds.amazonaws.com    Database: attendance
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED='';

--
-- Table structure for table `archive`
--

DROP TABLE IF EXISTS `archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` bigint(20) DEFAULT NULL,
  `fromModel` varchar(255) DEFAULT NULL,
  `originalRecord` longtext,
  `originalRecordId` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive`
--

LOCK TABLES `archive` WRITE;
/*!40000 ALTER TABLE `archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `session` int(11) DEFAULT NULL,
  `classroom` int(11) DEFAULT NULL,
  `student` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1578980668275,1578980668275,1,1,'2020-01-14','',1,1,1,1),(1578980668589,1578980668589,2,1,'2020-01-14','',1,1,3,1),(1578980685939,1579500382466,3,4,'2020-01-15','',1,1,1,1),(1578980686251,1579500382719,4,2,'2020-01-15','',1,1,3,1),(1578980698863,1579500418686,5,5,'2020-01-15','',2,1,1,1),(1578980699177,1579500418950,6,1,'2020-01-15','',2,1,3,1),(1579504684222,1579504727504,7,4,'2020-01-20','',10,4,9,1),(1579504684820,1579504727917,8,4,'2020-01-20','',10,4,8,1),(1579504695618,1579504695618,9,0,'2020-01-20','',11,4,9,1),(1579504696164,1579504696164,10,0,'2020-01-20','',11,4,8,1),(1579507165543,1579507165543,11,1,'2020-01-20','',1,1,1,1),(1579507166118,1579507166118,12,0,'2020-01-20','',1,1,3,1),(1579610257101,1579610383865,13,0,'2020-01-21','',20,7,11,3),(1579610257430,1579610384128,14,0,'2020-01-21','',20,7,10,3),(1579610337954,1579610337954,15,0,'2020-01-21','',19,7,11,3),(1579610338274,1579610338274,16,1,'2020-01-21','',19,7,10,3);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classroom` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activeStatus` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `monday` tinyint(1) DEFAULT NULL,
  `tuesday` tinyint(1) DEFAULT NULL,
  `wednesday` tinyint(1) DEFAULT NULL,
  `thursday` tinyint(1) DEFAULT NULL,
  `friday` tinyint(1) DEFAULT NULL,
  `saturday` tinyint(1) DEFAULT NULL,
  `sunday` tinyint(1) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1578980602422,1579131542449,1,2,'CS','IT',1,1,1,1,1,0,0,1),(1578980657156,1579130925455,2,0,'SE','IT',1,1,1,1,1,0,0,1),(1579103357641,1579103512259,3,1,'Arabic','Learn Huruf',0,0,0,0,1,0,0,2),(1579500651672,1580111883672,4,1,'Js','It class',1,1,1,1,1,0,0,1),(1579517532647,1579518909916,5,0,'Se','Er',1,1,1,1,1,0,0,1),(1579594542526,1579660863710,6,1,'IPC','It',1,1,1,1,1,0,0,1),(1579610226970,1579610559308,7,2,'Class one','Done',1,1,1,1,1,0,0,3);
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_student__student_classroom`
--

DROP TABLE IF EXISTS `classroom_student__student_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classroom_student__student_classroom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classroom_student` int(11) DEFAULT NULL,
  `student_classroom` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_student__student_classroom`
--

LOCK TABLES `classroom_student__student_classroom` WRITE;
/*!40000 ALTER TABLE `classroom_student__student_classroom` DISABLE KEYS */;
INSERT INTO `classroom_student__student_classroom` VALUES (5,2,1),(6,2,2),(7,1,3),(8,1,1),(11,3,5),(12,3,6),(31,5,2),(96,7,10),(97,7,11),(100,6,8),(101,4,9),(102,4,8);
/*!40000 ALTER TABLE `classroom_student__student_classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `license`
--

DROP TABLE IF EXISTS `license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `license` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activeStatus` double DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `receiptId` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license`
--

LOCK TABLES `license` WRITE;
/*!40000 ALTER TABLE `license` DISABLE KEYS */;
/*!40000 ALTER TABLE `license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activeStatus` double DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `classPermission` tinyint(1) DEFAULT NULL,
  `studentPermission` tinyint(1) DEFAULT NULL,
  `attendancePermission` tinyint(1) DEFAULT NULL,
  `workspace` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1579083252567,1579083252567,2,0,'salahudin.wk@gmail.com',1,1,1,1),(1579084329810,1579084329810,3,0,'salahudin.wkssd@gmail.com',1,1,1,1),(1579090062558,1579090062558,8,0,'ehtishamali042@gmail.com',1,1,1,1),(1579090225059,1579090225059,9,0,'ehtashamali042@gmail.com',1,1,1,1),(1579090246397,1579090246397,10,0,'techjs042@gmail.com',1,1,1,1);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `classroom` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (1578980602037,1579102387355,1,'2020-01-14 10:00:56','2020-01-14 11:00:03',1),(1578980602233,1579102387355,2,'2020-01-14 12:00:13','2020-01-14 13:00:17',1),(1578980656782,1579006100283,3,'2020-01-14 05:00:53','2020-01-14 06:00:57',2),(1578980656964,1579006100283,4,'2020-01-14 10:00:04','2020-01-14 11:00:08',2),(1579103357255,1579103513394,5,'2020-01-15 12:30:49','2020-01-15 14:00:54',3),(1579103357450,1579103513394,6,'2020-01-15 12:30:04','2020-01-15 14:00:10',3),(1579500651281,1579504617695,7,'2020-01-21 02:00:28','2020-01-21 04:00:32',NULL),(1579500651474,1579504617695,8,'2020-01-21 06:00:46','2020-01-21 08:00:43',NULL),(1579500745875,1579504617695,9,'2020-01-20 19:00:14','2020-01-20 20:00:18',NULL),(1579504616617,1580111885651,10,'2020-01-21 04:00:29','2020-01-21 06:00:39',4),(1579504617210,1580111885651,11,'2020-01-20 19:00:46','2020-01-20 21:00:51',4),(1579504665815,1580111885651,12,'2020-01-20 21:00:25','2020-01-20 22:00:35',4),(1579517532307,1579517533284,13,'2020-01-20 15:52:02','2020-01-20 17:52:07',5),(1579520459821,1580111885651,14,'2020-01-20 07:00:45','2020-01-20 08:00:53',4),(1579594402509,1580111885651,15,'2020-01-21 09:00:48','2020-01-21 10:00:05',4),(1579594542159,1579660865227,16,'2020-01-21 09:00:16','2020-01-21 11:00:19',6),(1579594542341,1579660865227,17,'2020-01-21 12:00:35','2020-01-21 14:00:38',6),(1579594801183,1579660865227,18,'2020-01-21 05:00:48','2020-01-21 06:00:55',6),(1579610226585,1579610227292,19,'2020-01-21 08:00:33','2020-01-21 09:00:38',7),(1579610226775,1579610227292,20,'2020-01-21 09:00:55','2020-01-21 10:00:51',7);
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activeStatus` double DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `imageUrl` longtext,
  `actualImage` longtext,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1578980534611,1579531359018,1,1,'Ali','Awan',NULL,NULL,NULL,'+923475123911','','',1),(1578980534735,1579131331041,2,1,'Ahmed','Zaman',NULL,NULL,NULL,'03078148614','','Student ',1),(1578980547242,1578980547242,3,1,'Qasim','Khan',NULL,NULL,NULL,'','','',1),(1579103196259,1579103196259,4,1,'Abu','Bakar',NULL,NULL,NULL,'','','',2),(1579103212215,1579103212215,5,1,'Rahman','Auf',NULL,NULL,NULL,'','','',2),(1579103224065,1579103224065,6,1,'Othman','Ali',NULL,NULL,NULL,'','','',2),(1579131516217,1579131516217,7,1,'Zong','Num',NULL,NULL,NULL,'+923115094197','','',1),(1579504525675,1579504525675,8,1,'Zameer','Ali',NULL,NULL,NULL,'','','',1),(1579504525898,1579504525898,9,1,'Khan','Ahmed',NULL,NULL,NULL,'','','',1),(1579610162534,1579610652691,10,1,'Abc','Def',NULL,NULL,NULL,'','ahsanpasha01@gmail.com','',3),(1579610162669,1579610660392,11,1,'Aasim','usmani',NULL,NULL,NULL,'+923015566779','ahsanpasha01@gmail.com','',3);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1578980512346,1578980512346,1,'','ehtisham@gmail.com','$2a$10$4LeDd4IFGbrLfGevL0t0pur6f2vj/rFbBdGxg84.h2vPdUTpZjMsa'),(1579102981653,1579102981653,2,'','rahim@gmail.com','$2a$10$vLZgcmjLXQAoRLuJJ0qNeO4cFqGbhof1IVg7ez6j9qS/fl6aKMLw6'),(1579610114628,1579610114628,3,'','ahsanpasha01@gmail.com','$2a$10$DwLgsKcEqEzNyfWolhN1TuZo4TGy.dkSauVaNsYsNon7HvDuHwLTi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workspace`
--

DROP TABLE IF EXISTS `workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workspace` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `ownerName` varchar(255) DEFAULT NULL,
  `activeStatus` double DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `owner` (`owner`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspace`
--

LOCK TABLES `workspace` WRITE;
/*!40000 ALTER TABLE `workspace` DISABLE KEYS */;
INSERT INTO `workspace` VALUES (1578980771506,1578980771506,1,'Computer ','Ehtisham ',1,1);
/*!40000 ALTER TABLE `workspace` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-27 15:37:27

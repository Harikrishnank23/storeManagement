-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 11:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ddflogbookmodel`
--

-- --------------------------------------------------------

--
-- Table structure for table `logger`
--

CREATE TABLE `logger` (
  `id` int(11) NOT NULL,
  `apiUrl` varchar(500) DEFAULT NULL,
  `user` varchar(500) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
--



--
-- Table structure for table `loggerexception`
--

CREATE TABLE `loggerexception` (
  `id` bigint(20) NOT NULL,
  `apiName` varchar(500) DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `exception` varchar(500) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--


--
-- Table structure for table `logincredentials`
--

CREATE TABLE `logincredentials` (
  `id` int(11) NOT NULL,
  `empUsrName` varchar(255) NOT NULL,
  `userType` enum('staff','supervisor','SPT','admin','SCT') DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `deviceId` varchar(250) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logincredentials`
--

INSERT INTO `logincredentials` (`id`, `empUsrName`, `userType`, `password`, `deviceId`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, '44444', 'admin', '$2b$12$9i0amkZpR3Vs7jKzSIvFSuWj2KNt1HGzJPtWVLaJCdLrIjZZjqI9S', NULL, '2024-11-27 12:49:19', '2024-11-27 18:08:40', 0),
(11, '11111', 'staff', '$2b$12$WpPQP9HUv3XvoT10lHv0Vu4s4D0Yab1HYqOmDdnE9vNj0/Um83Tse', NULL, '2024-11-27 17:43:22', '2024-11-27 17:43:22', 0),
(12, '22222', 'supervisor', '$2b$12$3wmJl7ssOwj0VF8Rv33Qq.RliJVJPMvKnZ5PDpm40/ZAbgiwcMW..', NULL, '2024-11-27 18:14:05', '2024-11-27 18:14:05', 0);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `id` bigint(20) NOT NULL,
  `storeNo` int(11) NOT NULL,
  `area` varchar(255) NOT NULL,
  `storeName` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`id`, `storeNo`, `area`, `storeName`, `createdAt`, `updatedAt`, `isDelete`) VALUES
(1, 0, 'dubai', 'zudio', '2024-11-28 05:30:35', '2024-11-28 06:53:37', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logger`
--
ALTER TABLE `logger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loggerexception`
--
ALTER TABLE `loggerexception`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `logincredentials`
--
ALTER TABLE `logincredentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`storeNo`,`isDelete`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logger`
--
ALTER TABLE `logger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `loggerexception`
--
ALTER TABLE `loggerexception`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logincredentials`
--
ALTER TABLE `logincredentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

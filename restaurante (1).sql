-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2024 at 12:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurante`
--

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) NOT NULL,
  `status` enum('Available','Out of Stock') DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `price`, `category`, `status`) VALUES
(1, 'Spaghetti Carbonara', 12.50, 'Executive Diary', 'Available'),
(2, 'Caesar Salad', 8.00, 'Low Cost Diary', 'Available'),
(3, 'Chocolate Cake', 6.00, 'Dessert', 'Out of Stock');

-- --------------------------------------------------------

--
-- Table structure for table `layouts`
--

CREATE TABLE `layouts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('Pending','Preparing','Completed') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `timeToComplete` int(11) DEFAULT NULL,
  `categoryBadge` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `table_number`, `user_id`, `status`, `created_at`, `timeToComplete`, `categoryBadge`) VALUES
(1, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(2, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(3, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(4, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(5, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(6, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(7, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(8, 1, 5, 'Completed', '2024-09-16 18:13:18', NULL, NULL),
(189, 1, 5, 'Completed', '2024-01-01 12:00:00', NULL, NULL),
(190, 2, 5, 'Completed', '2024-01-01 13:00:00', NULL, NULL),
(191, 3, 5, 'Completed', '2024-01-01 14:00:00', NULL, NULL),
(192, 4, 5, 'Completed', '2024-01-01 15:00:00', NULL, NULL),
(193, 5, 5, 'Completed', '2024-01-01 16:00:00', NULL, NULL),
(194, 6, 5, 'Completed', '2024-01-02 12:00:00', NULL, NULL),
(195, 1, 5, 'Completed', '2024-01-02 13:00:00', NULL, NULL),
(196, 2, 5, 'Completed', '2024-01-02 14:00:00', NULL, NULL),
(197, 3, 5, 'Completed', '2024-01-02 15:00:00', NULL, NULL),
(198, 4, 5, 'Completed', '2024-01-02 16:00:00', NULL, NULL),
(199, 1, 5, 'Completed', '2024-02-01 12:00:00', NULL, NULL),
(200, 2, 5, 'Completed', '2024-02-01 13:00:00', NULL, NULL),
(201, 3, 5, 'Completed', '2024-02-01 14:00:00', NULL, NULL),
(202, 4, 5, 'Completed', '2024-02-01 15:00:00', NULL, NULL),
(203, 5, 5, 'Completed', '2024-02-01 16:00:00', NULL, NULL),
(204, 6, 5, 'Completed', '2024-02-02 12:00:00', NULL, NULL),
(205, 1, 5, 'Completed', '2024-02-02 13:00:00', NULL, NULL),
(206, 2, 5, 'Completed', '2024-02-02 14:00:00', NULL, NULL),
(207, 3, 5, 'Completed', '2024-02-02 15:00:00', NULL, NULL),
(208, 4, 5, 'Completed', '2024-02-02 16:00:00', NULL, NULL),
(209, 1, 5, 'Completed', '2024-03-01 12:00:00', NULL, NULL),
(210, 2, 5, 'Completed', '2024-03-01 13:00:00', NULL, NULL),
(211, 3, 5, 'Completed', '2024-03-01 14:00:00', NULL, NULL),
(212, 4, 5, 'Completed', '2024-03-01 15:00:00', NULL, NULL),
(213, 5, 5, 'Completed', '2024-03-01 16:00:00', NULL, NULL),
(214, 6, 5, 'Completed', '2024-03-02 12:00:00', NULL, NULL),
(215, 1, 5, 'Completed', '2024-03-02 13:00:00', NULL, NULL),
(216, 2, 5, 'Completed', '2024-03-02 14:00:00', NULL, NULL),
(217, 3, 5, 'Completed', '2024-03-02 15:00:00', NULL, NULL),
(218, 4, 5, 'Completed', '2024-03-02 16:00:00', NULL, NULL),
(219, 1, 5, 'Completed', '2024-04-01 11:00:00', NULL, NULL),
(220, 2, 5, 'Completed', '2024-04-01 12:00:00', NULL, NULL),
(221, 3, 5, 'Completed', '2024-04-01 13:00:00', NULL, NULL),
(222, 4, 5, 'Completed', '2024-04-01 14:00:00', NULL, NULL),
(223, 5, 5, 'Completed', '2024-04-01 15:00:00', NULL, NULL),
(224, 6, 5, 'Completed', '2024-04-02 11:00:00', NULL, NULL),
(225, 1, 5, 'Completed', '2024-04-02 12:00:00', NULL, NULL),
(226, 2, 5, 'Completed', '2024-04-02 13:00:00', NULL, NULL),
(227, 3, 5, 'Completed', '2024-04-02 14:00:00', NULL, NULL),
(228, 4, 5, 'Completed', '2024-04-02 15:00:00', NULL, NULL),
(229, 1, 5, 'Completed', '2024-05-01 11:00:00', NULL, NULL),
(230, 2, 5, 'Completed', '2024-05-01 12:00:00', NULL, NULL),
(231, 3, 5, 'Completed', '2024-05-01 13:00:00', NULL, NULL),
(232, 4, 5, 'Completed', '2024-05-01 14:00:00', NULL, NULL),
(233, 5, 5, 'Completed', '2024-05-01 15:00:00', NULL, NULL),
(234, 6, 5, 'Completed', '2024-05-02 11:00:00', NULL, NULL),
(235, 1, 5, 'Completed', '2024-05-02 12:00:00', NULL, NULL),
(236, 2, 5, 'Completed', '2024-05-02 13:00:00', NULL, NULL),
(237, 3, 5, 'Completed', '2024-05-02 14:00:00', NULL, NULL),
(238, 4, 5, 'Completed', '2024-05-02 15:00:00', NULL, NULL),
(239, 1, 5, 'Completed', '2024-06-01 11:00:00', NULL, NULL),
(240, 2, 5, 'Completed', '2024-06-01 12:00:00', NULL, NULL),
(241, 3, 5, 'Completed', '2024-06-01 13:00:00', NULL, NULL),
(242, 4, 5, 'Completed', '2024-06-01 14:00:00', NULL, NULL),
(243, 5, 5, 'Completed', '2024-06-01 15:00:00', NULL, NULL),
(244, 6, 5, 'Pending', '2024-06-02 11:00:00', NULL, NULL),
(245, 1, 5, 'Completed', '2024-06-02 12:00:00', NULL, NULL),
(246, 2, 5, 'Completed', '2024-06-02 13:00:00', NULL, NULL),
(247, 3, 5, 'Pending', '2024-06-02 14:00:00', NULL, NULL),
(248, 4, 5, 'Completed', '2024-06-02 15:00:00', NULL, NULL),
(249, 1, 5, 'Completed', '2024-07-01 11:00:00', NULL, NULL),
(250, 2, 5, 'Completed', '2024-07-01 12:00:00', NULL, NULL),
(251, 3, 5, 'Pending', '2024-07-01 13:00:00', NULL, NULL),
(252, 4, 5, 'Pending', '2024-07-01 14:00:00', NULL, NULL),
(253, 5, 5, 'Completed', '2024-07-01 15:00:00', NULL, NULL),
(254, 6, 5, 'Pending', '2024-07-02 11:00:00', NULL, NULL),
(255, 1, 5, 'Completed', '2024-07-02 12:00:00', NULL, NULL),
(256, 2, 5, 'Completed', '2024-07-02 13:00:00', NULL, NULL),
(257, 3, 5, 'Pending', '2024-07-02 14:00:00', NULL, NULL),
(258, 4, 5, 'Completed', '2024-07-02 15:00:00', NULL, NULL),
(259, 1, 5, 'Completed', '2024-08-01 11:00:00', NULL, NULL),
(260, 2, 5, 'Completed', '2024-08-01 12:00:00', NULL, NULL),
(261, 3, 5, 'Pending', '2024-08-01 13:00:00', NULL, NULL),
(262, 4, 5, 'Pending', '2024-08-01 14:00:00', NULL, NULL),
(263, 5, 5, 'Completed', '2024-08-01 15:00:00', NULL, NULL),
(264, 6, 5, 'Pending', '2024-08-02 11:00:00', NULL, NULL),
(265, 1, 5, 'Completed', '2024-08-02 12:00:00', NULL, NULL),
(266, 2, 5, 'Completed', '2024-08-02 13:00:00', NULL, NULL),
(267, 3, 5, 'Pending', '2024-08-02 14:00:00', NULL, NULL),
(268, 4, 5, 'Completed', '2024-08-02 15:00:00', NULL, NULL),
(269, 1, 5, 'Completed', '2024-09-01 11:00:00', NULL, NULL),
(270, 2, 5, 'Completed', '2024-09-01 12:00:00', NULL, NULL),
(271, 3, 5, 'Pending', '2024-09-01 13:00:00', NULL, NULL),
(272, 4, 5, 'Pending', '2024-09-01 14:00:00', NULL, NULL),
(273, 5, 5, 'Completed', '2024-09-01 15:00:00', NULL, NULL),
(274, 6, 5, 'Pending', '2024-09-02 11:00:00', NULL, NULL),
(275, 1, 5, 'Completed', '2024-09-02 12:00:00', NULL, NULL),
(276, 2, 5, 'Completed', '2024-09-02 13:00:00', NULL, NULL),
(277, 3, 5, 'Pending', '2024-09-02 14:00:00', NULL, NULL),
(278, 4, 5, 'Completed', '2024-09-02 15:00:00', NULL, NULL),
(279, 1, 5, 'Pending', '2024-09-18 17:21:26', NULL, 'Takeway'),
(280, 1, 5, 'Completed', '2024-09-22 13:10:56', 4453, 'Takeaway'),
(281, 1, 5, 'Completed', '2024-09-22 13:10:56', 3593, 'Room Service'),
(282, 1, 5, 'Completed', '2024-09-22 13:10:56', NULL, 'Takeaway');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('Requested','Preparing','Completed') DEFAULT 'Requested'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `dish_id`, `quantity`, `status`) VALUES
(1, 1, 1, 1, 'Requested'),
(2, 1, 2, 1, 'Requested'),
(279, 279, 2, 1, 'Requested');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `status` enum('Available','Occupied','Reserved') DEFAULT 'Available',
  `layout_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('Admin','Counter','Kitchen','Staff') NOT NULL DEFAULT 'Staff',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `email`, `password`, `profile_pic`) VALUES
(1, 'John Doe', 'Admin', 'john@example.com', 'password123', ''),
(2, 'Jane Smith', 'Counter', 'jane@example.com', 'password123', ''),
(3, 'Sam Lee', 'Kitchen', 'sam@example.com', 'password123', ''),
(4, 'Anna Brown', 'Staff', 'anna@example.com', 'password123', ''),
(5, 'Nuno Mansilhas', 'Admin', 'nunomansilhas@gmail.com', '$2a$10$gSr20MVmdWNORuYL/CjphOi4ubj7lPE1LcdlG9EjB91ybg8phWlwu', 'img\\profile_images\\1726612203073-293226835.svg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `layouts`
--
ALTER TABLE `layouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `dish_id` (`dish_id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `layout_id` (`layout_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `layouts`
--
ALTER TABLE `layouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=280;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `layouts`
--
ALTER TABLE `layouts`
  ADD CONSTRAINT `layouts_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`layout_id`) REFERENCES `layouts` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

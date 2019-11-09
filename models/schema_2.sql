
CREATE DATABASE `debugger_db`;

CREATE TABLE `game_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `kills` int(11) NOT NULL,
  `level_one` int(11) NOT NULL,
  `level_two` int(11) NOT NULL,
  `level_three` int(11) NOT NULL,
  `ltotal_score` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) 

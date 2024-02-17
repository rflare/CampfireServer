DROP TABLE IF EXISTS `userPosts`;
CREATE TABLE `userPosts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `text` TEXT DEFAULT NULL,
    `name` TEXT DEFAULT NULL,
    `timeMillis` BIGINT(20) DEFAULT NULL,
    PRIMARY KEY (id)
  
)

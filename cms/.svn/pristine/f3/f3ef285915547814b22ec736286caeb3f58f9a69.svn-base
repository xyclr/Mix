-- DROP TABLE IF EXISTS `oa_attend`;
CREATE TABLE `oa_attend` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `account` char(30) NOT NULL,
  `date` date NOT NULL,
  `signIn` time NOT NULL,
  `signOut` time NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT '',
  `ip` varchar(15) NOT NULL,
  `device` varchar(30) NOT NULL,
  `manualIn` time NOT NULL,
  `manualOut` time NOT NULL,
  `reason` varchar(30) NOT NULL DEFAULT '',
  `desc` text NOT NULL,
  `reviewStatus` varchar(30) NOT NULL DEFAULT '',
  `reviewedBy` char(30) NOT NULL,
  `reviewedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account` (`account`),
  KEY `date` (`date`),
  KEY `status` (`status`),
  KEY `reason` (`reason`),
  KEY `reviewStatus` (`reviewStatus`),
  KEY `reviewedBy` (`reviewedBy`),
  UNIQUE KEY `attend` (`date`,`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
-- DROP TABLE IF EXISTS `oa_holiday`;
CREATE TABLE `oa_holiday` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `desc` text NOT NULL,
  `year` char(4) NOT NULL,
  `begin` date NOT NULL,
  `end` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `year` (`year`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
-- DROP TABLE IF EXISTS `oa_leave`;
CREATE TABLE `oa_leave` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `year` char(4) NOT NULL,
  `begin` date NOT NULL,
  `end` date NOT NULL,
  `start` time NOT NULL,
  `finish` time NOT NULL,
  `type` varchar(30) NOT NULL DEFAULT '',
  `desc` text NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT '',
  `createdBy` char(30) NOT NULL,
  `createdDate` datetime NOT NULL,
  `reviewedBy` char(30) NOT NULL,
  `reviewedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `year` (`year`),
  KEY `type` (`type`),
  KEY `status` (`status`),
  KEY `createdBy` (`createdBy`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
-- DROP TABLE IF EXISTS `oa_trip`;
CREATE TABLE `oa_trip` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `desc` text NOT NULL,
  `year` char(4) NOT NULL,
  `begin` date NOT NULL,
  `end` date NOT NULL,
  `start` time NOT NULL,
  `finish` time NOT NULL,
  `from` char(50) NOT NULL,
  `to` char(50) NOT NULL,
  `createdBy` char(30) NOT NULL,
  `createdDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `year` (`year`),
  KEY `createdBy` (`createdBy`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

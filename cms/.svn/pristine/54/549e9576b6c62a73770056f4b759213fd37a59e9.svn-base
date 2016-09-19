ALTER TABLE `sys_task` add `parent` mediumint(8) unsigned NOT NULL DEFAULT 0 AFTER `desc`;
ALTER TABLE `sys_task` add `children` varchar(255) NOT NULL AFTER `parent`;

ALTER TABLE `sys_team` add `estimate` decimal(12,1) unsigned NOT NULL AFTER `hours`;
ALTER TABLE `sys_team` add `consumed` decimal(12,1) unsigned NOT NULL AFTER `estimate`;
ALTER TABLE `sys_team` add `left` decimal(12,1) unsigned NOT NULL AFTER `consumed`;
ALTER TABLE `sys_team` add `order` tinyint(3) unsigned NOT NULL AFTER `left`;

-- DROP TABLE IF EXISTS `oa_todo`;
CREATE TABLE IF NOT EXISTS `oa_todo` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `account` char(30) NOT NULL,
  `date` date NOT NULL,
  `begin` smallint(4) unsigned zerofill NOT NULL,
  `end` smallint(4) unsigned zerofill NOT NULL,
  `type` char(10) NOT NULL,
  `idvalue` mediumint(8) unsigned NOT NULL default '0',
  `pri` tinyint(3) unsigned NOT NULL,
  `name` char(150) NOT NULL,
  `desc` text NOT NULL,
  `status`  enum('wait','doing','done') NOT NULL DEFAULT 'wait',
  `private` tinyint(1) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `user` (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

ALTER TABLE `oa_project` add `whitelist` varchar(255) NOT NULL AFTER `status`;

-- DROP TABLE IF EXISTS `oa_refund`;
CREATE TABLE IF NOT EXISTS `oa_refund` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `name` char(150) NOT NULL,
  `parent`  mediumint(8) NOT NULL DEFAULT 0,
  `category` char(30) NOT NULL,
  `date` date NOT NULL,
  `money` decimal(12,2) NOT NULL,
  `currency` varchar(30) NOT NULL,
  `desc` text NOT NULL,
  `related` char(200) NOT NULL DEFAULT '',
  `status` char(30) NOT NULL DEFAULT 'wait',
  `createdBy` char(30) NOT NULL DEFAULT '',
  `createdDate` datetime NOT NULL,
  `editedBy` char(30) NOT NULL DEFAULT '',
  `editedDate` datetime NOT NULL,
  `firstReviewer` char(30) NOT NULL DEFAULT '',
  `firstReviewDate` datetime NOT NULL,
  `secondReviewer` char(30) NOT NULL DEFAULT '',
  `secondReviewDate` datetime NOT NULL,
  `refundBy` char(30) NOT NULL DEFAULT '',
  `refundDate` datetime NOT NULL,
  `reason` text NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `createdBy` (`createdBy`),
  KEY `firstReviewer` (`firstReviewer`),
  KEY `secondReviewer` (`secondReviewer`),
  KEY `refundBy` (`refundBy`),
  KEY `category` (`category`),
  KEY `date` (`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

ALTER TABLE `sys_category` ADD `refund` enum('0','1') NOT NULL DEFAULT '0';

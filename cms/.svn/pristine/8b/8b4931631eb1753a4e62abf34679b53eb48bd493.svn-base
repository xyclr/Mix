CREATE TABLE `crm_plan` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL,
  `contract` mediumint(8) unsigned NOT NULL,
  `returnedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL,
  `returnedDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `crm_delivery` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `contract` mediumint(8) unsigned NOT NULL,
  `deliveredBy` char(30) COLLATE 'utf8_general_ci' NOT NULL,
  `deliveredDate` date NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

ALTER TABLE `sys_schema` ADD `dept` char(10) NOT NULL AFTER `fee`;

CREATE TABLE IF NOT EXISTS `sys_package` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `name` varchar(150) NOT NULL,
  `code` varchar(30) NOT NULL,
  `version` varchar(50) NOT NULL,
  `author` varchar(100) NOT NULL,
  `desc` text NOT NULL,
  `license` text NOT NULL,
  `type` varchar(20) NOT NULL default 'extension',
  `site` varchar(150) NOT NULL,
  `ranzhiCompatible` varchar(100) NOT NULL,
  `installedTime` datetime NOT NULL,
  `depends` varchar(100) NOT NULL,
  `dirs` text NOT NULL,
  `files` text NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `name` (`name`),
  KEY `addedTime` (`installedTime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_userQuery` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `account` char(30) NOT NULL,
  `module` varchar(30) NOT NULL,
  `title` varchar(90) NOT NULL,
  `form` text NOT NULL,
  `sql` text NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `account` (`account`),
  KEY `module` (`module`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

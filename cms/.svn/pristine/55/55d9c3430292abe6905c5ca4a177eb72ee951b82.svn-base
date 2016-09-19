ALTER TABLE `sys_entry` CHANGE `login` `login` varchar(255) COLLATE 'utf8_general_ci' NOT NULL AFTER `logo`,
CHANGE `logout` `logout` varchar(255) COLLATE 'utf8_general_ci' NOT NULL AFTER `login`,
CHANGE `api` `block` varchar(255) COLLATE 'utf8_general_ci' NOT NULL AFTER `logout`;
ALTER TABLE `sys_entry` ADD `control` varchar(10) COLLATE 'utf8_general_ci' NOT NULL DEFAULT 'simple' AFTER `block`,
ADD `size` varchar(50) COLLATE 'utf8_general_ci' NOT NULL DEFAULT 'max' AFTER `control`,
ADD `position` varchar(10) COLLATE 'utf8_general_ci' NOT NULL DEFAULT 'default' AFTER `size`;

ALTER TABLE `crm_contract`
ADD `delivery` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `end`,
ADD `return` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `delivery`,
ADD `createdBy` char(30) COLLATE 'utf8_general_ci' NOT NULL,
ADD `createdDate` datetime NOT NULL AFTER `createdBy`,
ADD `editedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `createdDate`,
ADD `editedDate` datetime NOT NULL AFTER `editedBy`;

ALTER TABLE `crm_contact` ADD `customer` MEDIUMINT( 8 ) NOT NULL AFTER `id`;
CREATE TABLE IF NOT EXISTS `oa_effort` (
  `id` MEDIUMINT( 8 ) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `objectType` VARCHAR( 30 ) NOT NULL ,
  `objectID` SMALLINT( 8 ) UNSIGNED NOT NULL ,
  `product` VARCHAR( 255 ) NOT NULL ,
  `account` VARCHAR( 30 ) NOT NULL ,
  `work` VARCHAR( 255 ) NOT NULL ,
  `date` DATE NOT NULL ,
  `left` float NOT NULL,
  `consumed` float NOT NULL,
  `begin` SMALLINT( 4 ) UNSIGNED ZEROFILL NOT NULL ,
  `end` SMALLINT( 4 ) UNSIGNED ZEROFILL NOT NULL
) ENGINE = MYISAM CHARACTER SET utf8 COLLATE utf8_general_ci ;
ALTER TABLE `sys_action` ADD `efforted` tinyint(1) NOT NULL DEFAULT '0';
CREATE TABLE IF NOT EXISTS `sys_lang` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `lang` varchar(30) NOT NULL,
  `app` varchar(30) NOT NULL default 'sys',
  `module` varchar(30) NOT NULL,
  `section` varchar(30) NOT NULL,
  `key` varchar(60) NOT NULL,
  `value` text NOT NULL,
  `system` enum('0','1') NOT NULL default '1', 
  PRIMARY KEY  (`id`),
  UNIQUE KEY `lang` (`app`, `lang`,`module`,`section`,`key`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `sys_issue` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `product` mediumint(8) unsigned NOT NULL,
  `category` mediumint(8) unsigned NOT NULL,
  `customer` mediumint(8) NOT NULL,
  `contact` mediumint(8) NOT NULL,
  `pri` tinyint(3) unsigned default NULL,
  `title` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `type` varchar(30) NOT NULL,
  `addedBy` mediumint(8) NOT NULL,
  `addedDate` datetime NOT NULL,
  `viewedDate` datetime NOT NULL,
  `assignedTo` mediumint(8) NOT NULL,
  `assignedBy` mediumint(8) NOT NULL,
  `assignedDate` datetime NOT NULL,
  `repliedBy` mediumint(8) NOT NULL,
  `repliedDate` datetime NOT NULL,
  `transferedBy` mediumint(8) NOT NULL,
  `transferedDate` datetime NOT NULL,
  `editedBy` mediumint(8) NOT NULL,
  `editedDate` datetime NOT NULL,
  `closedBy` mediumint(8) unsigned NOT NULL,
  `closedDate` datetime NOT NULL,
  `closedReason` varchar(30) NOT NULL,
  `toObjectType` varchar(30) NOT NULL,
  `toObjectID` mediumint(8) unsigned NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
CREATE TABLE IF NOT EXISTS `crm_service` (
  `customer` smallint(8) NOT NULL,
  `product` mediumint(8) NOT NULL,
  `expire` date NOT NULL,
  UNIQUE KEY `customer` (`customer`,`product`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
ALTER TABLE `sys_issue` CHANGE `addedBy` `addedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `type`,
CHANGE `assignedTo` `assignedTo` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `viewedDate`,
CHANGE `assignedBy` `assignedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `assignedTo`,
CHANGE `repliedBy` `repliedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `assignedDate`,
CHANGE `transferedBy` `transferedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `repliedDate`,
CHANGE `editedBy` `editedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `transferedDate`,
CHANGE `closedBy` `closedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `editedDate`;

ALTER TABLE sys_task CHANGE lastEditedBy editedBy varchar(30) NOT NULL;
ALTER TABLE sys_task CHANGE lastEditedDate editedDate datetime NOT NULL;

ALTER TABLE `crm_contact` CHANGE `avatar` `avatar` char(100) NOT NULL AFTER `nickname`;

CREATE TABLE IF NOT EXISTS `oa_doc` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `product` mediumint(8) unsigned NOT NULL,
  `project` mediumint(8) unsigned NOT NULL,
  `lib` varchar(30) NOT NULL,
  `module` varchar(30) NOT NULL,
  `title` varchar(255) NOT NULL,
  `digest` varchar(255) NOT NULL,
  `keywords` varchar(255) NOT NULL,
  `type` varchar(30) NOT NULL,
  `content` text NOT NULL,
  `url` varchar(255) NOT NULL,
  `views` smallint(5) unsigned NOT NULL,
  `addedBy` varchar(30) NOT NULL,
  `addedDate` datetime NOT NULL,
  `editedBy` varchar(30) NOT NULL,
  `editedDate` datetime NOT NULL,
  `deleted` enum('0','1') NOT NULL default '0', 
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `oa_docLib` (
  `id` smallint(5) unsigned NOT NULL auto_increment,
  `name` varchar(60) NOT NULL,
  `deleted` enum('0','1') NOT NULL default '0', 
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

ALTER TABLE `sys_category` ADD `root` mediumint unsigned NOT NULL DEFAULT '0' AFTER `keywords`;

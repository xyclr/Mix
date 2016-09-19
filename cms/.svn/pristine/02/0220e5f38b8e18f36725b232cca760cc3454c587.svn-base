ALTER TABLE `oa_article` change `addedDate` `createdDate` datetime NOT NULL;

ALTER TABLE `oa_doc` change `addedBy` `createdBy`  varchar(30) NOT NULL;
ALTER TABLE `oa_doc` change `addedDate` `createdDate` datetime NOT NULL;

ALTER TABLE `sys_file` change `addedBy` `createdBy`  varchar(30) NOT NULL;
ALTER TABLE `sys_file` change `addedDate` `createdDate` datetime NOT NULL;

ALTER TABLE `crm_customer` add `relation` enum('client', 'provider', 'partner') NOT NULL default 'client' AFTER `type`;

CREATE TABLE `cash_depositor` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `abbr` char(60) NOT NULL,
  `provider` char(100) NOT NULL,
  `title` char(100) NOT NULL,
  `account` char(90) NOT NULL,
  `bankcode` varchar(30) NOT NULL,
  `public` enum('0','1') NOT NULL,
  `type` enum('cash','bank','online') NOT NULL,
  `currency` char(30) NOT NULL,
  `status` enum('normal','disable') NOT NULL DEFAULT 'normal',
  `createdBy` char(30) NOT NULL DEFAULT '',
  `createdDate` datetime NOT NULL,
  `editedBy` char(30) NOT NULL DEFAULT '',
  `editedDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `cash_balance` ( 
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `depositor` mediumint(8) NOT NULL,
  `date` date NOT NULL,
  `money` float(12,2) NOT NULL,
  `currency` char(30) NOT NULL,
  `createdBy` char(30) NOT NULL DEFAULT '',
  `createdDate` datetime NOT NULL,
  `editedBy` char(30) NOT NULL DEFAULT '',
  `editedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `depositor` (`depositor`,`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `cash_trade` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT, 
  `depositor` mediumint(8) NOT NULL,
  `parent`  mediumint(8) NOT NULL DEFAULT 0,
  `product` mediumint(8) NOT NULL,
  `trader` smallint(5) unsigned NOT NULL DEFAULT 0,
  `order` mediumint(8) NOT NULL,
  `contract` mediumint(8) NOT NULL,
  `dept` mediumint(8) unsigned NOT NULL,
  `type` enum('in', 'out', 'transferin', 'transferout', 'fee') NOT NULL,
  `money` float(12,2) NOT NULL,
  `currency` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `handlers` varchar(255) NOT NULL,
  `category` char(30) NOT NULL,
  `desc` text NOT NULL,
  `createdBy` char(30) NOT NULL DEFAULT '',
  `createdDate` datetime NOT NULL,
  `editedBy` char(30) NOT NULL DEFAULT '',
  `editedDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

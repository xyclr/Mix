ALTER TABLE `oa_doc` CHANGE `lib` `lib` mediumint(8) unsigned NOT NULL AFTER `project`,
CHANGE `module` `module` mediumint(8) unsigned NOT NULL AFTER `lib`;

ALTER TABLE `oa_relation` RENAME TO `sys_relation`;

UPDATE `cash_trade` SET `type` = 'out' WHERE `type`='fee';

ALTER TABLE `cash_trade` CHANGE `type` `type` enum('in', 'out', 'transferin', 'transferout', 'inveset', 'redeem') NOT NULL AFTER `dept`;

ALTER TABLE `crm_order` CHANGE `product` `product` char(255) NOT NULL AFTER `id`;

CREATE TABLE `crm_salesgroup` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `users` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `crm_salespriv` (
  `account` char(30) NOT NULL,
  `salesgroup` mediumint(8) unsigned NOT NULL,
  `priv` enum('view','edit') NOT NULL,
  KEY `account` (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

UPDATE `crm_customer` SET `assignedTo` = `createdBy` WHERE `assignedTo` = '' AND `relation` = 'client';

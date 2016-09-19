ALTER TABLE `crm_contract` ADD `code` char(30) NOT NULL AFTER `name`;
ALTER TABLE `oa_project` CHANGE status status enum('doing','finished','suspend') NOT NULL DEFAULT 'doing';
ALTER TABLE `sys_schema` CHANGE `customer` `trader` char(10) not null;
CREATE TABLE `sys_team` (
  `type` char(30) NOT NULL,
  `id` mediumint(8) NOT NULL DEFAULT '0',
  `account` char(30) NOT NULL DEFAULT '',
  `role` char(30) NOT NULL DEFAULT '',
  `join` date NOT NULL DEFAULT '0000-00-00',
  `days` smallint(5) unsigned NOT NULL,
  `hours` float(2,1) unsigned NOT NULL DEFAULT '0.0',
  PRIMARY KEY (`type`,`id`,`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

UPDATE `sys_entry` SET `name` = '现金记账' WHERE `code` = 'cash';
DELETE FROM `oa_docLib` WHERE `deleted` = 1;

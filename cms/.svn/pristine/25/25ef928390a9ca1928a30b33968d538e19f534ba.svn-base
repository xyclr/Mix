ALTER TABLE `sys_product` CHANGE `summary`  `desc` text NOT NULL,
DROP `code`;

ALTER TABLE `crm_customer` ADD `intension` text NOT NULL AFTER `level`, DROP `referType`, DROP `referID`;

ALTER TABLE `crm_order` add `nextDate` date NOT NULL;

ALTER TABLE `crm_contract`
ADD `deliveredBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `signedDate`,
ADD `deliveredDate` datetime NOT NULL AFTER `deliveredBy`,
ADD `returnedBy` char(30) COLLATE 'utf8_general_ci' NOT NULL AFTER `deliveredDate`,
ADD `returnedDate` datetime NOT NULL AFTER `returnedBy`,
ADD `handlers` varchar(255) NOT NULL AFTER `contact`;

ALTER TABLE sys_action ADD customer mediumint(8) UNSIGNED AFTER id,
ADD contact mediumint(8) UNSIGNED AFTER customer,
ADD contract mediumint(8) UNSIGNED AFTER contact,
CHANGE `product` `product`  mediumint(8) UNSIGNED AFTER contract;
ALTER TABLE sys_action ADD drop product, drop contract;

ALTER TABLE `crm_contact` ADD `maker` enum('0','1') COLLATE 'utf8_general_ci' NOT NULL DEFAULT '0' AFTER `customer`;
ALTER TABLE `crm_relation` RENAME TO `crm_resume`;

ALTER TABLE `crm_resume` ADD `id` mediumint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE `crm_resume` CHANGE `titile` `title` char(100) COLLATE 'utf8_general_ci' NOT NULL AFTER `dept`;

ALTER TABLE `crm_address` ADD `title` varchar(255) COLLATE 'utf8_general_ci' NOT NULL AFTER `objectID`;
ALTER TABLE `crm_address` CHANGE `id` `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE `crm_address` CHANGE `city` `area` mediumint(8) unsigned NOT NULL;
ALTER TABLE `crm_address` drop province, drop country;

ALTER TABLE sys_category CHANGE id id mediumint(8) unsigned NOT NULL AUTO_INCREMENT;
ALTER TABLE sys_category CHANGE parent parent mediumint(8) unsigned NOT NULL AUTO_INCREMENT;

ALTER TABLE `crm_contact` ADD `deleted` enum('0','1') COLLATE 'utf8_general_ci' NOT NULL DEFAULT '0';
ALTER TABLE `crm_contract` ADD `deleted` enum('0','1') COLLATE 'utf8_general_ci' NOT NULL DEFAULT '0';
ALTER TABLE `crm_customer` ADD `deleted` enum('0','1') COLLATE 'utf8_general_ci' NOT NULL DEFAULT '0';
ALTER TABLE `crm_order` ADD `deleted` enum('0','1') COLLATE 'utf8_general_ci' NOT NULL DEFAULT '0';

ALTER TABLE `crm_contact` DROP `customer`, DROP `maker`;
ALTER TABLE `crm_resume` ADD `maker` enum('0','1') COLLATE 'utf8_general_ci' NOT NULL DEFAULT '0' AFTER `customer`,
CHANGE `join` `join` char(10) COLLATE 'utf8_general_ci' NOT NULL AFTER `address`,
CHANGE `left` `left` char(10) COLLATE 'utf8_general_ci' NOT NULL AFTER `join`;

ALTER TABLE `crm_customer` CHANGE `name` `name` CHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `crm_customer` change `level` `level` char(10) NOT NULL;

ALTER TABLE `crm_order` DROP `closedNote`;

ALTER TABLE `crm_contact` ADD `resume` mediumint unsigned NOT NULL AFTER `nickname`;
ALTER TABLE `crm_resume` ADD `deleted` enum('0','1') COLLATE 'utf8_general_ci' NOT NULL DEFAULT '0' AFTER `left`;

ALTER TABLE `oa_relation` CHANGE `category` `category` mediumint(9) NOT NULL;

ALTER TABLE `sys_user` CHANGE `dept` `dept` mediumint(8) unsigned NOT NULL;

CREATE TABLE `oa_project` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `createdBy` char(30) NOT NULL,
  `createdDate` datetime NOT NULL,
  `deleted` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE='MyISAM' COLLATE 'utf8_general_ci'; 

ALTER TABLE `crm_order` DROP `payedDate`;

ALTER TABLE `crm_contract` CHANGE `signedDate` `signedDate` date NOT NULL,
CHANGE `deliveredDate` `deliveredDate` date NOT NULL,
CHANGE `returnedDate` `returnedDate` date NOT NULL,
CHANGE `finishedDate` `finishedDate` date NOT NULL,
CHANGE `canceledDate` `canceledDate` date NOT NULL;

ALTER TABLE `crm_order` CHANGE `signedDate` `signedDate` date NOT NULL;

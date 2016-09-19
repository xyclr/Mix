ALTER TABLE `sys_category` ADD `rights` char(30) NOT NULL;
ALTER TABLE `sys_product` ADD `line` varchar(30) NOT NULL DEFAULT 'default' AFTER `status`;
ALTER TABLE `crm_customer` CHANGE `status` `status` varchar(30) NOT NULL;

-- DROP TABLE IF EXISTS `sys_cron`;
CREATE TABLE IF NOT EXISTS `sys_cron` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `m` varchar(20) NOT NULL,
  `h` varchar(20) NOT NULL,
  `dom` varchar(20) NOT NULL,
  `mon` varchar(20) NOT NULL,
  `dow` varchar(20) NOT NULL,
  `command` text NOT NULL,
  `remark` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `buildin` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(20) NOT NULL,
  `lastTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `sys_cron` (`m`, `h`, `dom`, `mon`, `dow`, `command`, `remark`, `type`, `buildin`, `status`, `lastTime`) VALUES
('*', '*', '*', '*', '*', '', '监控定时任务', 'ranzhi', 1, 'normal', '0000-00-00 00:00:00'),
('1', '1', '*', '*', '*', 'appName=sys&moduleName=backup&methodName=backup&reload=0', '定时备份任务', 'ranzhi', 0, 'normal', '0000-00-00 00:00:00'),
('1', '1', '*', '*', '*', 'appName=sys&moduleName=backup&methodName=batchdelete&saveDays=30', '删除30天前的备份', 'ranzhi', 0, 'normal', '0000-00-00 00:00:00');

UPDATE `sys_action` SET `extra` = `date` WHERE `action` = 'record';

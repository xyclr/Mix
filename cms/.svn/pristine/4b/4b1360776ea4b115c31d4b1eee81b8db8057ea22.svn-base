CREATE TABLE `team_thread` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `board` mediumint(9) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(60) NOT NULL,
  `editor` varchar(60) NOT NULL,
  `createdDate` datetime NOT NULL,
  `editedDate` datetime NOT NULL,
  `readonly` tinyint(1) NOT NULL DEFAULT '0',
  `views` smallint(5) unsigned NOT NULL DEFAULT '0',
  `stick` enum('0','1','2','3') NOT NULL DEFAULT '0',
  `replies` smallint(6) NOT NULL,
  `repliedBy` varchar(30) NOT NULL,
  `repliedDate` datetime NOT NULL,
  `replyID` mediumint(8) unsigned NOT NULL,
  `hidden` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category` (`board`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `team_reply` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `thread` mediumint(8) unsigned NOT NULL,
  `content` text NOT NULL,
  `author` char(30) NOT NULL,
  `editor` char(30) NOT NULL,
  `createdDate` datetime NOT NULL,
  `editedDate` datetime NOT NULL,
  `hidden` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `thread` (`thread`),
  KEY `author` (`author`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_message` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `type` char(20) NOT NULL,
  `objectType` varchar(30) NOT NULL DEFAULT '',
  `objectID` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `account` char(30) DEFAULT NULL,
  `from` char(30) NOT NULL,
  `to` char(30) NOT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL,
  `status` char(20) NOT NULL,
  `readed` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  KEY `object` (`objectType`,`objectID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

RENAME TABLE oa_article TO sys_article;

CREATE TABLE `sys_tag` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) NOT NULL,
  `rank` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tag` (`tag`),
  KEY `rank` (`rank`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_group` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `name` char(30) NOT NULL,
  `desc` char(255) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

CREATE TABLE `sys_userGroup` (
  `account` char(30) NOT NULL DEFAULT '',
  `group` mediumint(8) unsigned NOT NULL DEFAULT '0',
  UNIQUE KEY `account` (`account`,`group`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_groupPriv` (
  `group` mediumint(8) unsigned NOT NULL default '0',
  `module` char(30) NOT NULL default '',
  `method` char(30) NOT NULL default '',
  UNIQUE KEY `group` (`group`,`module`,`method`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `sys_group` VALUES (1,'管理员','管理员拥有前台所有权限'),(2,'财务专员','财务专员拥有现金流所有权限'),(3,'普通用户','默认的普通账号权限');
INSERT INTO sys_userGroup (account,`group`) SELECT account,3 FROM sys_user;
INSERT INTO `sys_groupPriv` VALUES (1,'address','browse'),(1,'address','create'),(1,'address','delete'),(1,'address','edit'),(1,'announce','browse'),(1,'announce','create'),(1,'announce','delete'),(1,'announce','edit'),(1,'announce','view'),(1,'blog','create'),(1,'blog','delete'),(1,'blog','edit'),(1,'blog','index'),(1,'blog','view'),(1,'contact','block'),(1,'contact','browse'),(1,'contact','create'),(1,'contact','delete'),(1,'contact','edit'),(1,'contact','view'),(1,'contract','browse'),(1,'contract','cancel'),(1,'contract','create'),(1,'contract','delete'),(1,'contract','delivery'),(1,'contract','edit'),(1,'contract','finish'),(1,'contract','receive'),(1,'contract','view'),(1,'crm','manageAll'),(1,'customer','browse'),(1,'customer','contact'),(1,'customer','contract'),(1,'customer','create'),(1,'customer','delete'),(1,'customer','edit'),(1,'customer','linkContact'),(1,'customer','order'),(1,'customer','record'),(1,'customer','view'),(1,'doc','browse'),(1,'doc','create'),(1,'doc','createLib'),(1,'doc','delete'),(1,'doc','deleteLib'),(1,'doc','edit'),(1,'doc','editLib'),(1,'doc','view'),(1,'forum','admin'),(1,'forum','board'),(1,'forum','index'),(1,'forum','update'),(1,'order','activate'),(1,'order','assign'),(1,'order','browse'),(1,'order','close'),(1,'order','contact'),(1,'order','create'),(1,'order','edit'),(1,'order','view'),(1,'product','browse'),(1,'product','create'),(1,'product','delete'),(1,'product','edit'),(1,'project','create'),(1,'project','delete'),(1,'project','edit'),(1,'resume','browse'),(1,'resume','create'),(1,'resume','delete'),(1,'resume','edit'),(1,'task','activate'),(1,'task','assignTo'),(1,'task','batchCreate'),(1,'task','browse'),(1,'task','cancel'),(1,'task','close'),(1,'task','create'),(1,'task','delete'),(1,'task','edit'),(1,'task','finish'),(1,'task','view'),(1,'thread','delete'),(1,'thread','deleteFile'),(1,'thread','edit'),(1,'thread','post'),(1,'thread','stick'),(1,'thread','switchStatus'),(1,'thread','transfer'),(1,'thread','view'),(1,'tree','browse'),(1,'tree','children'),(1,'tree','delete'),(1,'tree','edit'),(1,'user','active'),(1,'user','admin'),(1,'user','changePassword'),(1,'user','colleague'),(1,'user','create'),(1,'user','delete'),(1,'user','edit'),(1,'user','forbid'),(1,'user','message'),(1,'user','profile'),(1,'user','reply'),(1,'user','thread'),(1,'user','vcard'),(2,'balance','browse'),(2,'balance','create'),(2,'balance','delete'),(2,'balance','edit'),(2,'depositor','activate'),(2,'depositor','browse'),(2,'depositor','check'),(2,'depositor','create'),(2,'depositor','edit'),(2,'depositor','forbid'),(2,'trade','batchCreate'),(2,'trade','browse'),(2,'trade','create'),(2,'trade','delete'),(2,'trade','detail'),(2,'trade','edit'),(2,'trade','transfer'),(3,'announce','browse'),(3,'announce','create'),(3,'announce','delete'),(3,'announce','edit'),(3,'announce','view'),(3,'blog','create'),(3,'blog','delete'),(3,'blog','edit'),(3,'blog','index'),(3,'blog','view'),(3,'doc','browse'),(3,'doc','create'),(3,'doc','createLib'),(3,'doc','delete'),(3,'doc','deleteLib'),(3,'doc','edit'),(3,'doc','editLib'),(3,'doc','view'),(3,'forum','admin'),(3,'forum','board'),(3,'forum','index'),(3,'forum','update'),(3,'project','create'),(3,'project','delete'),(3,'project','edit'),(3,'thread','delete'),(3,'thread','deleteFile'),(3,'thread','edit'),(3,'thread','post'),(3,'thread','stick'),(3,'thread','switchStatus'),(3,'thread','transfer'),(3,'thread','view'),(3,'user','changePassword'),(3,'user','colleague'),(3,'user','message'),(3,'user','profile'),(3,'user','reply'),(3,'user','thread'),(3,'user','vcard');

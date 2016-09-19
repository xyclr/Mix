<?php
/**
 * The config file of depositor module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     depositor 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
$config->depositor->require = new stdclass();
$config->depositor->require->create = 'type, abbr, currency';
$config->depositor->require->edit   = 'abbr';

$config->depositor->editor = new stdclass();
$config->depositor->editor->forbid   = array('id' => 'comment', 'tools' => 'simple');
$config->depositor->editor->activate = array('id' => 'comment', 'tools' => 'simple');

$config->depositor->exportFields = '
  id, abbr, provider, type, title, account, bankcode, public, currency, status, public,
  createdBy, createdDate, editedBy, editedDate, balance';

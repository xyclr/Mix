<?php
/**
 * The customer module config file of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     customer
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
$config->customer->require = new stdclass();
$config->customer->require->create = 'contact';
$config->customer->require->edit   = 'name';

$config->customer->editor = new stdclass();
$config->customer->editor->create = array('id' => 'desc', 'tools' => 'simple');
$config->customer->editor->edit   = array('id' => 'desc', 'tools' => 'simple');
$config->customer->editor->assign = array('id' => 'comment', 'tools' => 'simple');

global $lang;
$config->customer->search['module'] = 'customer';

$config->customer->search['fields']['name']          = $lang->customer->name;
$config->customer->search['fields']['intension']     = $lang->customer->intension;
$config->customer->search['fields']['level']         = $lang->customer->level;
$config->customer->search['fields']['contactedDate'] = $lang->customer->contactedDate;
$config->customer->search['fields']['nextDate']      = $lang->customer->nextDate;
$config->customer->search['fields']['status']        = $lang->customer->status;
$config->customer->search['fields']['size']          = $lang->customer->size;
$config->customer->search['fields']['type']          = $lang->customer->type;
$config->customer->search['fields']['createdBy']     = $lang->customer->createdBy;
$config->customer->search['fields']['createdDate']   = $lang->customer->createdDate;
$config->customer->search['fields']['assignedTo']    = $lang->customer->assignedTo;
$config->customer->search['fields']['industry']      = $lang->customer->industry;
$config->customer->search['fields']['area']          = $lang->customer->area;
$config->customer->search['fields']['id']            = $lang->customer->id;

$config->customer->search['params']['name']          = array('operator' => 'include', 'control' => 'input', 'values' => '');
$config->customer->search['params']['intension']     = array('operator' => 'include', 'control' => 'input', 'values' => '');
$config->customer->search['params']['level']         = array('operator' => '=',  'control' => 'select', 'values' => $lang->customer->levelNameList);
$config->customer->search['params']['contactedDate'] = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->customer->search['params']['nextDate']      = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->customer->search['params']['status']        = array('operator' => '=',  'control' => 'select', 'values' => array('' => '') + $lang->customer->statusList);
$config->customer->search['params']['size']          = array('operator' => '=',  'control' => 'select', 'values' => $lang->customer->sizeNameList);
$config->customer->search['params']['type']          = array('operator' => '=',  'control' => 'select', 'values' => $lang->customer->typeList);
$config->customer->search['params']['createdBy']     = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->customer->search['params']['createdDate']   = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->customer->search['params']['assignedTo']    = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->customer->search['params']['industry']      = array('operator' => 'belong', 'control' => 'select', 'values' => 'set in control');
$config->customer->search['params']['area']          = array('operator' => 'belong', 'control' => 'select', 'values' => 'set in control');
$config->customer->search['params']['id']            = array('operator' => '=', 'control' => 'input',  'values' => '');

$config->customer->list = new stdclass();
$config->customer->list->exportFields = '
  id, name, type, relation, size, industry, area,
  status, level, intension, site, weibo, weixin, public,
  createdBy, createdDate, assignedBy, assignedDate, assignedTo,
  editedBy, editedDate, contactedBy, contactedDate, nextDate, desc';

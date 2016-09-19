<?php
/**
 * The config file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     order 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
$config->order->require = new stdclass();
$config->order->require->create = 'product,customer';
$config->order->require->edit   = 'product,customer';

$config->order->editor = new stdclass();
$config->order->editor->close    = array('id' => 'closedNote', 'tools' => 'simple');
$config->order->editor->assign   = array('id' => 'comment', 'tools' => 'simple');
$config->order->editor->activate = array('id' => 'comment', 'tools' => 'simple');

$config->order->statusClassList['normal']   = '';
$config->order->statusClassList['assigned'] = 'alert-warning';
$config->order->statusClassList['signed']   = 'alert-info';
$config->order->statusClassList['payed']    = 'alert-success';
$config->order->statusClassList['closed']   = '';

global $lang, $app;
$app->loadLang('customer', 'crm');
$config->order->search['module'] = 'order';

$config->order->search['fields']['o.customer']      = $lang->order->customer;
$config->order->search['fields']['o.product']       = $lang->order->product;
$config->order->search['fields']['o.status']        = $lang->order->status;
$config->order->search['fields']['o.plan']          = $lang->order->plan;
$config->order->search['fields']['o.real']          = $lang->order->real;
$config->order->search['fields']['o.id']            = $lang->order->id;
$config->order->search['fields']['c.level']         = $lang->customer->level;
$config->order->search['fields']['o.assignedTo']    = $lang->order->assignedTo;
$config->order->search['fields']['o.contactedDate'] = $lang->order->contactedDate;
$config->order->search['fields']['o.nextDate']      = $lang->order->nextDate;
$config->order->search['fields']['o.createdBy']     = $lang->order->createdBy;
$config->order->search['fields']['o.createdDate']   = $lang->order->createdDate;
$config->order->search['fields']['o.closedBy']      = $lang->order->closedBy;
$config->order->search['fields']['o.closedDate']    = $lang->order->closedDate;
$config->order->search['fields']['o.closedReason']  = $lang->order->closedReason;
$config->order->search['fields']['o.editedBy']      = $lang->order->editedBy;
$config->order->search['fields']['o.editedDate']    = $lang->order->editedDate;

$config->order->search['params']['o.customer']      = array('operator' => '=',  'control' => 'select', 'values' => 'set in control');
$config->order->search['params']['o.product']       = array('operator' => 'include',  'control' => 'select', 'values' => 'set in control');
$config->order->search['params']['o.status']        = array('operator' => '=',  'control' => 'select', 'values' => array('' => '') + $lang->order->statusList);
$config->order->search['params']['o.plan']          = array('operator' => '>=', 'control' => 'input',  'values' => '');
$config->order->search['params']['o.real']          = array('operator' => '>=', 'control' => 'input',  'values' => '');
$config->order->search['params']['o.id']            = array('operator' => '=',  'control' => 'input',  'values' => '');
$config->order->search['params']['c.level']         = array('operator' => '=',  'control' => 'select', 'values' => $lang->customer->levelNameList);
$config->order->search['params']['o.assignedTo']    = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->order->search['params']['o.contactedDate'] = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->order->search['params']['o.nextDate']      = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->order->search['params']['o.createdBy']     = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->order->search['params']['o.createdDate']   = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->order->search['params']['o.closedBy']      = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->order->search['params']['o.closedDate']    = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->order->search['params']['o.closedReason']  = array('operator' => '=',  'control' => 'select', 'values' => $lang->order->closedReasonList);
$config->order->search['params']['o.editedBy']      = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->order->search['params']['o.editedDate']    = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');

$config->order->list = new stdclass();
$config->order->list->exportFields = '
  id, product, customer, plan, real, currency,
  status, createdBy, createdDate, editedBy, editedDate,
  assignedTo, assignedBy, assignedDate, signedBy, signedDate,
  closedBy, closedDate, closedReason, activatedBy, activatedDate,
  contactedBy, contactedDate, nextDate';

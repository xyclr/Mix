<?php
/**
 * The config file of contract module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     contract 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
$config->contract->require = new stdclass();
$config->contract->require->create  = 'customer, name';
$config->contract->require->edit    = 'customer, name';
$config->contract->require->receive = 'amount';

$config->contract->editor = new stdclass();
$config->contract->editor->create       = array('id' => 'items', 'tools' => 'full');
$config->contract->editor->edit         = array('id' => 'items', 'tools' => 'full');
$config->contract->editor->receive      = array('id' => 'comment', 'tools' => 'simple');
$config->contract->editor->delivery     = array('id' => 'comment', 'tools' => 'simple');
$config->contract->editor->finish       = array('id' => 'comment', 'tools' => 'simple');
$config->contract->editor->cancel       = array('id' => 'comment', 'tools' => 'simple');
$config->contract->editor->editreturn   = array('id' => 'comment', 'tools' => 'simple');
$config->contract->editor->editdelivery = array('id' => 'comment', 'tools' => 'simple');

$config->contract->codeFormat = array('Y', 'm', 'd', 'input');

global $lang, $app;
$config->contract->search['module'] = 'contract';

$config->contract->search['fields']['name']          = $lang->contract->name;
$config->contract->search['fields']['amount']        = $lang->contract->amount;
$config->contract->search['fields']['signedDate']    = $lang->contract->signedDate;
$config->contract->search['fields']['status']        = $lang->contract->status;
$config->contract->search['fields']['delivery']      = $lang->contract->delivery;
$config->contract->search['fields']['deliveredBy']   = $lang->contract->deliveredBy;
$config->contract->search['fields']['deliveredDate'] = $lang->contract->deliveredDate;
$config->contract->search['fields']['return']        = $lang->contract->return;
$config->contract->search['fields']['returnedBy']    = $lang->contract->returnedBy;
$config->contract->search['fields']['returnedDate']  = $lang->contract->returnedDate;
$config->contract->search['fields']['id']            = $lang->contract->id;

$config->contract->search['params']['name']          = array('operator' => 'include', 'control' => 'input', 'values' => '');
$config->contract->search['params']['amount']        = array('operator' => '>=', 'control' => 'input',  'values' => '');
$config->contract->search['params']['signedDate']    = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->contract->search['params']['status']        = array('operator' => '=',  'control' => 'select', 'values' => $lang->contract->statusList);
$config->contract->search['params']['delivery']      = array('operator' => '=',  'control' => 'select', 'values' => $lang->contract->deliveryList);
$config->contract->search['params']['deliveredBy']   = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->contract->search['params']['deliveredDate'] = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->contract->search['params']['return']        = array('operator' => '=',  'control' => 'select', 'values' => $lang->contract->returnList);
$config->contract->search['params']['returnedBy']    = array('operator' => '=',  'control' => 'select', 'values' => 'users');
$config->contract->search['params']['returnedDate']  = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->contract->search['params']['id']            = array('operator' => '=',  'control' => 'input',  'values' => '');

$config->contract->list = new stdclass();
$config->contract->list->exportFields = '
  id, customer, order, name, code, amount, currency, begin, end,
  delivery, return, status, contact, handlers, signedBy, signedDate,
  deliveredBy, deliveredDate, returnedBy, returnedDate, finishedBy, finishedDate,
  canceledBy, canceledDate, createdBy, createdDate, editedBy, editedDate,
  contactedBy, contactedDate, nextDate, items, files';

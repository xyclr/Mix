<?php
/**
 * The config file of trade module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     trade 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
$config->trade->require = new stdclass();
$config->trade->require->create  = 'depositor,money,type,handlers';
$config->trade->require->edit    = 'depositor,money,type,handlers';
$config->trade->require->inveset = 'depositor,money,type,handlers';

$config->trade->batchCreateCount = 10;

$config->trade->importField = 'category,dept,trader,type,money,desc,date,fee';

global $lang;
$config->trade->search['module'] = 'trade';

$config->trade->search['fields']['depositor'] = $lang->trade->depositor;
$config->trade->search['fields']['type']      = $lang->trade->type;
$config->trade->search['fields']['trader']    = $lang->trade->trader;
$config->trade->search['fields']['money']     = $lang->trade->money;
$config->trade->search['fields']['category']  = $lang->trade->category;
$config->trade->search['fields']['handlers']  = $lang->trade->handlers;
$config->trade->search['fields']['date']      = $lang->trade->date;
$config->trade->search['fields']['id']        = $lang->trade->id;

$config->trade->search['params']['depositor'] = array('operator' => '=',  'control' => 'select', 'values' => 'set in control');
$config->trade->search['params']['type']      = array('operator' => '=',  'control' => 'select', 'values' => array('' => '') + $lang->trade->typeList);
$config->trade->search['params']['trader']    = array('operator' => '=',  'control' => 'select', 'values' => 'set in control');
$config->trade->search['params']['money']     = array('operator' => '>=', 'control' => 'input',  'values' => '');
$config->trade->search['params']['category']  = array('operator' => '=',  'control' => 'select', 'values' => 'set in control');
$config->trade->search['params']['handlers']  = array('operator' => 'include', 'control' => 'select', 'values' => 'users');
$config->trade->search['params']['date']      = array('operator' => '>=', 'control' => 'input', 'values' => '', 'class' => 'date');
$config->trade->search['params']['id']        = array('operator' => '=',  'control' => 'input',  'values' => '');

$config->trade->exportFields = '
  id, depositor, type, money, currency, category, trader, date,
  desc, dept, handlers, order, contract,
  createdBy, createdDate, editedBy, editedDate, detail';

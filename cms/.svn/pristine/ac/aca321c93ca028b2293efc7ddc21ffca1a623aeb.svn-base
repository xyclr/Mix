<?php
/**
 * The config file of task module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     task 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
$config->task->require = new stdclass();
$config->task->require->create = 'name';
$config->task->require->edit   = 'name';

$config->task->editor = new stdclass();
$config->task->editor->create         = array('id' => 'desc', 'tools' => 'simple');
$config->task->editor->edit           = array('id' => 'desc', 'tools' => 'simple');
$config->task->editor->assignto       = array('id' => 'comment', 'tools' => 'simple');
$config->task->editor->finish         = array('id' => 'comment', 'tools' => 'simple');
$config->task->editor->activate       = array('id' => 'comment', 'tools' => 'simple');
$config->task->editor->cancel         = array('id' => 'comment', 'tools' => 'simple');
$config->task->editor->close          = array('id' => 'comment', 'tools' => 'simple');
$config->task->editor->start          = array('id' => 'comment', 'tools' => 'simple');
$config->task->editor->recordestimate = array('id' => 'comment', 'tools' => 'simple');

$config->task->batchCreate =  10;

global $lang;
$config->task->search['module'] = 'task';

$config->task->search['fields']['name']        = $lang->task->name;
$config->task->search['fields']['pri']         = $lang->task->pri;
$config->task->search['fields']['deadline']    = $lang->task->deadline;
$config->task->search['fields']['assignedTo']  = $lang->task->assignedTo;
$config->task->search['fields']['status']      = $lang->task->status;
$config->task->search['fields']['createdDate'] = $lang->task->createdDate;
$config->task->search['fields']['consumed']    = $lang->task->consumed;
$config->task->search['fields']['id']          = $lang->task->id;

$config->task->search['params']['name']        = array('operator' => 'include',  'control' => 'input',  'values' => '');
$config->task->search['params']['pri']         = array('operator' => '=',  'control' => 'select', 'values' => $lang->task->priList);
$config->task->search['params']['deadline']    = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->task->search['params']['assignedTo']  = array('operator' => '=',  'control' => 'select', 'values' => 'set in control');
$config->task->search['params']['status']      = array('operator' => '=',  'control' => 'select', 'values' => $lang->task->statusList);
$config->task->search['params']['createdDate'] = array('operator' => '>=', 'control' => 'input',  'values' => '', 'class' => 'date');
$config->task->search['params']['consumed']    = array('operator' => '>=', 'control' => 'input',  'values' => '');
$config->task->search['params']['id']          = array('operator' => '=',  'control' => 'input',  'values' => '');

$config->task->exportFields = '
    id, project, name, desc,
    type, pri, estStarted, realStarted, estimate, consumed, left, deadline, status,
    mailto,
    createdBy, createdDate, assignedTo, assignedDate, 
    finishedBy, finishedDate, canceledBy, canceledDate,
    closedBy, closedDate, closedReason,
    editedBy, editedDate,
    files';

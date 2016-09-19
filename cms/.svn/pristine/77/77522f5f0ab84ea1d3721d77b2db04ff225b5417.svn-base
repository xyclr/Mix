<?php
$config->forum->newDays = 3;

global $lang, $app;
$app->loadLang('thread');
$config->forum->search['module'] = 'forum';

$config->forum->search['fields']['title']   = $lang->thread->title;
$config->forum->search['fields']['content'] = $lang->thread->content;

$config->forum->search['params']['title']   = array('operator' => 'include',  'control' => 'input',  'values' => '');
$config->forum->search['params']['content'] = array('operator' => 'include',  'control' => 'input',  'values' => '');

<?php
$config->announce->require = new stdclass();
$config->announce->require->create = 'categories, title, content';
$config->announce->require->edit   = 'categories, title, content';

$config->announce->editor = new stdclass();
$config->announce->editor->create = array('id' => 'content', 'tools' => 'full');
$config->announce->editor->edit   = array('id' => 'content', 'tools' => 'full');

global $lang, $app;
$app->loadLang('article', 'sys');
$config->announce->search['module'] = 'announce';

$config->announce->search['fields']['t1.title']   = $lang->article->title;
$config->announce->search['fields']['t1.content'] = $lang->article->content;

$config->announce->search['params']['t1.title']   = array('operator' => 'include',  'control' => 'input',  'values' => '');
$config->announce->search['params']['t1.content'] = array('operator' => 'include',  'control' => 'input',  'values' => '');

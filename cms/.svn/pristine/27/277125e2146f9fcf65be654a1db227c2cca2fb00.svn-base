<?php
$config->blog->require = new stdclass();
$config->blog->require->create = 'categories, title, content';
$config->blog->require->edit   = 'categories, title, content';

$config->blog->editor = new stdclass();
$config->blog->editor->create = array('id' => 'content', 'tools' => 'full');
$config->blog->editor->edit   = array('id' => 'content', 'tools' => 'full');

global $lang, $app;
$app->loadLang('article', 'sys');
$config->blog->search['module'] = 'blog';

$config->blog->search['fields']['t1.title']   = $lang->article->title;
$config->blog->search['fields']['t1.content'] = $lang->article->content;

$config->blog->search['params']['t1.title']   = array('operator' => 'include',  'control' => 'input',  'values' => '');
$config->blog->search['params']['t1.content'] = array('operator' => 'include',  'control' => 'input',  'values' => '');

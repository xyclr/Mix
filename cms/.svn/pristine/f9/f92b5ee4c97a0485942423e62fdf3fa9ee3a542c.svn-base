<?php
/**
 * The control file of schema module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     schema
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class schema extends control
{
    public function __construct()
    {
        parent::__construct();

        $this->lang->schema->menu = $this->lang->setting->menu;
        $this->lang->menuGroups->schema = 'setting';
    }

    /** 
     * The index page, locate to the browse page.
     * 
     * @access public
     * @return void
     */
    public function index()
    {
        $this->locate(inlink('browse'));
    }

    /**
     * Browse schema. 
     * 
     * @access public
     * @return void
     */
    public function browse()
    {
        $this->app->loadLang('trade', 'cash');
        $this->view->schemas = $this->schema->getList();
        $this->display();
    }

    /**
     * View a schema.
     * 
     * @param  int    $schema 
     * @access public
     * @return void
     */
    public function view($schema)
    {
        $this->app->loadLang('trade', 'cash');
        $schema = $this->schema->getByID($schema);
        if(strpos($schema->money, ',') !== false)
        {
           list($schema->in, $schema->out) = explode(',', $schema->money);
           unset($schema->money);
        }

        $reversedSchema = array();

        /* Reverse schema to arrary with key like A,B,C,D...  */
        foreach($schema as $field => $columns)
        {
            if(strpos('id,name', $field) !== false) continue;
            if(strpos($columns, ',') !== false)
            {
                $columns = explode(',', $columns);
                foreach($columns as $column) $reversedSchema[$column] = $field;
            }
            else
            {
               $reversedSchema[$columns] = $field; 
            }
        }

        $this->view->title      = $this->lang->schema->view;
        $this->view->subtitle   = $schema->name;
        $this->view->modalWidth = 900;
        $this->view->schema     = $reversedSchema;
        $this->view->maxColumn  = max(array_keys($reversedSchema));

        $this->display();
    }

    /**
     * create a schema. 
     * 
     * @access public
     * @return void
     */
    public function create()
    {
        $this->loadModel('file');
        $this->app->loadLang('trade', 'cash');

        if($this->post->encode)
        {
            $file = $this->file->getUpload('files');

            if(empty($file)) die(js::error($this->lang->file->errorNoFile) . js::locate('back'));

            $file = $file[0];

            $fc = file_get_contents($file['tmpname']);
            if($this->post->encode != "utf8") 
            {
                if(function_exists('mb_convert_encoding'))
                {
                    $fc = @mb_convert_encoding($fc, 'utf-8', $this->post->encode);
                }              
                elseif(function_exists('iconv'))
                {
                    $fc = @iconv($this->post->encode, 'utf-8', $fc);
                }
                else
                {              
                    die(js::error($this->lang->noConvertFun) . js::locate('back'));
                }              
            }

            $tmpFile = $this->file->savePath . $file['pathname'];
            file_put_contents($tmpFile, $fc);
            $records = $this->schema->parseCSV($tmpFile);
            $columns = 0;
            foreach($records as $row)
            {
                $columns = (count($row) > $columns) ? count($row) : $columns;
            }

            $this->view->records = $records;
            $this->view->columns = $columns;
            $this->view->file    = $file;
            $this->view->mode    = "row";
            @unlink($tmpFile);
            unset($this->lang->schema->menu);
            $this->display();
        }
        elseif($_POST and !$this->post->encode)
        {
            $schemaID = $this->schema->create();
            $errors  = dao::getError();
            $message = '';
            if(is_array($errors))
            {
                foreach(array_keys($errors) as $field)
                {
                    if($field == 'name')
                    {
                        $message .= strip_tags(join(',', $errors['name']));
                        continue;
                    }
                    $message .= (isset($this->lang->trade->{$field}) ? $this->lang->trade->{$field} : '') . ' ';
                }
                $message = sprintf($this->lang->schema->fieldRequired, $message);
            }
            if(!empty($errors)) $this->send(array('result' => 'fail', 'message' => $message));

            $this->loadModel('action')->create('schema', $schemaID, 'Created');

            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        $this->app->loadLang('trade', 'cash');
        $this->view->title = $this->lang->schema->create;
        $this->display();
    }

    /**
     * Edit schema. 
     * 
     * @param  int    $schemaID 
     * @access public
     * @return void
     */
    public function edit($schemaID)
    {
        if($_POST)
        {
            $changes = $this->schema->update($schemaID);
            if(dao::isError())$this->send(array('result' => 'fail', 'message' => dao::getError()));

            if($changes)
            {
                $actionID = $this->loadModel('action')->create('schema', $schemaID, 'Edited');
                $this->action->logHistory($actionID, $changes);
            }

            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));

        }

        $this->app->loadLang('trade', 'cash');

        $schema = $this->schema->getByID($schemaID);
        if(!$schema) $this->locate(inlink('browse'));

        $this->view->schema = $schema;
        $this->display();
    }

    /**
     * Delete schema. 
     * 
     * @param  int    $schemaID 
     * @access public
     * @return void
     */
    public function delete($schemaID)
    {
        if($this->schema->delete($schemaID)) $this->send(array('result' => 'success', 'locate' => inlink('browse')));
        $this->send(array('result' => 'fail', 'message' => dao::getError()));
    }
}

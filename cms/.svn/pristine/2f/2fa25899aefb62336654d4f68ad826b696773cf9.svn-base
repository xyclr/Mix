<?php
/**
 * The control file of setting module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     setting
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class setting extends control
{
    /**
     * Set lang. 
     * 
     * @param  string    $module 
     * @param  string    $field 
     * @access public
     * @return void
     */
    public function lang($module, $field, $appName = '')
    {
        $clientLang = $this->app->getClientLang();

        if(empty($appName)) $appName = $this->app->getAppName();
        $this->app->loadLang($module, $appName);

        if($module == 'user' and $field == 'roleList' and $appName == 'sys') $this->lang->menuGroups->setting = 'user';

        if(!empty($_POST))
        {
            if($module == 'common' and $field == 'currencyList')
            {
                $setting = fixer::input('post')->join('currency', ',')->setDefault('currency', '')->get();
                $this->setting->setItems('system.sys.setting', $setting);
                if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
                $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('lang', "module=$module&field=$field&appName=$appName")));
            }

            $lang = $_POST['lang'];
            $appendField = isset($this->config->setting->appendLang[$module][$field]) ? $this->config->setting->appendLang[$module][$field] : '';

            $this->setting->deleteItems("lang=$lang&app=$appName&module=$module&section=$field", $type = 'lang');
            if($appendField) $this->setting->deleteItems("lang=$lang&app=$appName&module=$module&section=$appendField", $type = 'lang');

            foreach($_POST['keys'] as $index => $key)
            {   
                $value = $_POST['values'][$index];
                if(!$value or !$key) continue;
                $system = $_POST['systems'][$index];
                $this->setting->setItem("{$lang}.{$appName}.{$module}.{$field}.{$key}.{$system}", $value, $type = 'lang');

                /* Save additional item. */
                if($appendField)
                {
                    $this->setting->setItem("{$lang}.{$appName}.{$module}.{$appendField}.{$key}.{$system}", $_POST[$appendField][$index], $type = 'lang');
                }
            }

            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('lang', "module=$module&field=$field&appName=$appName")));
        }   

        $dbFields    = $this->setting->getItems("lang=$clientLang,all&app=$appName&module=$module&section=$field", 'lang');
        $systemField = array();
        foreach($dbFields as $dbField) $systemField[$dbField->key] = $dbField->system;

        $this->view->fieldList   = $module == 'common' ? $this->lang->$field : $this->lang->$module->$field;
        $this->view->module      = $module;
        $this->view->field       = $field;
        $this->view->clientLang  = $clientLang;
        $this->view->systemField = $systemField;
        $this->view->appName     = $appName;
        $this->display();
    }

    /** 
     * Restore the default lang. Delete the related items.
     * 
     * @param  string $module 
     * @param  string $field 
     * @access public
     * @return void
     */
    public function reset($module, $field, $appName = '')
    {   
        if(empty($appName)) $appName = $this->app->getAppName();
        $this->setting->deleteItems("app=$appName&module=$module&section=$field", $type = 'lang');
        if(isset($this->config->setting->appendLang[$module][$field]))
        {
            $appendField = $this->config->setting->appendLang[$module][$field];
            $this->setting->deleteItems("app=$appName&module=$module&section=$appendField", $type = 'lang');
        }

        $this->send(array('result' => 'success'));
    }   

    /**
     * customer settings. 
     * 
     * @access public
     * @return void
     */
    public function customerPool()
    {
        if($_POST)
        {
            if($this->post->reserveDays == '') $this->send(array('result' => 'fail', 'message' => array('reserveDays' => sprintf($this->lang->error->notempty, $this->lang->setting->reserveDays))));
            $this->setting->setItem("system.crm.customer.reserveDays", $this->post->reserveDays);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess));
        }
        $reserveDays = $this->setting->getItem('owner=system&app=crm&module=customer&key=reserveDays');
        if($reserveDays == '') $reserveDays = 0;

        $this->view->reserveDays = $reserveDays;
        $this->display();
    }
}

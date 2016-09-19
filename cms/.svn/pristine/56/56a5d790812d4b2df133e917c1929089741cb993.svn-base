<?php
/**
 * The control file of webapp of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <Yidong@cnezsoft.com>
 * @package     webapp
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class webapp extends control
{

    /**
     * Obtain web app. 
     * 
     * @param  string $type 
     * @param  string $param 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function obtain($type = 'byUpdatedTime', $param = '', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        $this->lang->webapp->menu = $this->lang->entry->menu;
        $this->lang->menuGroups->webapp = 'entry';

        /* Init vars. */
        $type     = strtolower($type);
        $moduleID = $type == 'bymodule' ? (int)$param : 0;
        $webapps  = array();
        $pager    = null;

        /* Set the key. */
        if($type == 'bysearch') $param = helper::safe64Encode($this->post->key);

        /* Get results from the api. */
        $recPerPage = $this->cookie->pagerWebappObtain ? $this->cookie->pagerWebappObtain : $recPerPage;
        $results = $this->webapp->getAppsByAPI($type, $param, $recTotal, $recPerPage, $pageID);
        if($results)
        {
            $this->app->loadClass('pager', $static = true);
            $pager   = new pager($results->dbPager->recTotal, $results->dbPager->recPerPage, $results->dbPager->pageID);
            $webapps = $results->webapps;
        }

        $this->view->title      = $this->lang->webapp->common . $this->lang->colon . $this->lang->webapp->obtain;
        $this->view->position[] = $this->lang->webapp->obtain;
        $this->view->moduleTree = $this->webapp->getModulesByAPI();
        $this->view->webapps    = $webapps;
        $this->view->installeds = $this->webapp->getLocalApps();
        $this->view->pager      = $pager;
        $this->view->tab        = 'obtain';
        $this->view->type       = $type;
        $this->view->moduleID   = $moduleID;
        $this->display();
    }

    /**
     * Install web app. 
     * 
     * @param  int    $webappID 
     * @access public
     * @return void
     */
    public function install($webappID)
    {
        $result = $this->webapp->install($webappID);
        if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError(), 'locate' => $this->createLink('webapp', 'obtain')));
        $this->send(array('result' => 'success', 'message' => $this->lang->webapp->successInstall, 'locate' => $this->createLink('entry', 'admin'), 'entries' => $this->loadModel('entry')->getJSONEntries()));
    }

    /**
     * View app.
     * 
     * @param  int    $webappID 
     * @param  string $type 
     * @access public
     * @return void
     */
    public function view($webappID, $type = 'local')
    {
        $this->view->title   = $this->lang->webapp->common . $this->lang->colon . $this->lang->webapp->edit;
        $this->view->modules = $this->loadModel('tree')->getOptionMenu(0, 'webapp');
        $this->view->users   = $this->loadModel('user')->getPairs('noletter');
        $this->view->webapp  = $type == 'local' ? $this->webapp->getLocalAppByID($webappID) : $this->webapp->getAppInfoByAPI($webappID)->webapp;
        $this->view->type    = $type;
        $this->display();
    }
}

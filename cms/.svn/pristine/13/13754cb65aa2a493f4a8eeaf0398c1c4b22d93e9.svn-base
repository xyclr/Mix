<?php
/**
 * The control file of search module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     search
 * @version     $Id: control.php 4129 2013-01-18 01:58:14Z wwccss $
 * @link        http://www.ranzhico.com
 */
class search extends control
{
    /**
     * Build search form.
     * 
     * @param  string  $module 
     * @param  array   $searchFields 
     * @param  array   $fieldParams 
     * @param  string  $actionURL 
     * @param  int     $queryID 
     * @access public
     * @return void
     */
    public function buildForm($module = '', $searchFields = '', $fieldParams = '', $actionURL = '', $queryID = 0)
    {
        /* use session queryID and delete queryID session. */
        if($queryID == 0 and $this->session->queryID != false)
        {
            $queryID = $this->session->queryID;
            $this->session->set('queryID', false);
        }

        $queryID      = (empty($module) and empty($queryID)) ? $this->session->searchParams['queryID'] : $queryID;
        $module       = empty($module) ?       $this->session->searchParams['module'] : $module;
        $searchFields = empty($searchFields) ? json_decode($this->session->searchParams['searchFields'], true) : $searchFields;
        $fieldParams  = empty($fieldParams) ?  json_decode($this->session->searchParams['fieldParams'], true)  : $fieldParams;
        $actionURL    = empty($actionURL) ?    $this->session->searchParams['actionURL'] : $actionURL;
        $this->search->initSession($module, $searchFields, $fieldParams);

        $this->view->module       = $module;
        $this->view->groupItems   = $this->config->search->groupItems;
        $this->view->searchFields = $searchFields;
        $this->view->actionURL    = $actionURL;
        $this->view->fieldParams  = $this->search->setDefaultParams($searchFields, $fieldParams);
        $this->view->queries      = $this->search->getQueryPairs($module);
        $this->view->queryID      = $queryID;
        $this->display();
    }

    /**
     * Build query
     * 
     * @access public
     * @return void
     */
    public function buildQuery($queryID = '')
    {
        if($queryID)
        {
            $query = $this->search->getQuery($queryID);
            if($query)
            {
                $this->session->set($query->module . 'Query', $query->sql);
                $this->session->set($query->module . 'Form', $query->form);
                $this->session->set('queryID', $queryID);
                if(!empty($query->form['actionURL']))
                {
                    die(js::locate($query->form['actionURL']));
                }
                else
                {
                    die(js::locate('back'));
                }
            }
            else
            {
                die(js::locate('back'));
            }
        }
        $this->search->buildQuery();
        die(js::locate($this->post->actionURL, 'parent'));
    }

    /**
     * Save search query.
     * 
     * @access public
     * @return void
     */
    public function saveQuery()
    {
        $this->search->saveQuery();
        if(dao::isError()) die(js::error(dao::getError()));
        die('success');
    }

    /**
     * Delete a query 
     * 
     * @param  int    $queryID 
     * @access public
     * @return void
     */
    public function deleteQuery($queryID)
    {
        $this->dao->delete()->from(TABLE_USERQUERY)->where('id')->eq($queryID)->andWhere('account')->eq($this->app->user->account)->exec();
        die(js::reload('parent'));
    }
}

<?php
/**
 * The control file of refund of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL 
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     refund
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class refund extends control
{
    /**
     * index 
     * 
     * @access public
     * @return void
     */
    public function index()
    {
        $this->locate(inlink('personal'));
    }

    /**
     * create a refund.
     * 
     * @access public
     * @return void
     */
    public function create()
    {
        if($_POST)
        {
            $this->refund->create();
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('personal')));
        }

        $this->view->currencyList = $this->loadModel('common', 'sys')->getCurrencyList();
        $this->view->currencySign = $this->loadModel('common', 'sys')->getCurrencySign();
        $this->view->categories   = $this->refund->getCategoryPairs();
        $this->view->users        = $this->loadModel('user')->getPairs('noclosed,nodeleted');
        $this->display();
    }

    /**
     * Edit a refund.
     * 
     * @param  int    $refundID 
     * @access public
     * @return void
     */
    public function edit($refundID)
    {
        $refund = $this->refund->getByID($refundID);
        $this->checkPriv($refund, 'edit');

        if($_POST)
        {
            $changes = $this->refund->update($refundID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));

            if(!empty($changes))
            {
                $actionID = $this->loadModel('action')->create('refund', $refundID, 'Edited');
                $this->action->logHistory($actionID, $changes);
            }
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('view', "refundID=$refundID")));
        }

        $this->view->currencyList = $this->loadModel('common', 'sys')->getCurrencyList();
        $this->view->currencySign = $this->loadModel('common', 'sys')->getCurrencySign();
        $this->view->categories   = $this->refund->getCategoryPairs();
        $this->view->refund       = $refund;
        $this->view->users        = $this->loadModel('user')->getPairs('noclosed,nodeleted');
        $this->display();
    }

    /**
     * view personal refund.
     * 
     * @param  string $orderBy 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function personal($orderBy = 'id_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        $this->browse('personal', $orderBy, $recTotal, $recPerPage, $pageID);
    }

    /**
     * view company refund.
     * 
     * @param  string $orderBy 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function company($orderBy = 'id_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        $this->browse('company', $orderBy, $recTotal, $recPerPage, $pageID);
    }

    /**
     * view todo refund.
     * 
     * @param  string $orderBy 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function todo($orderBy = 'id_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        $this->browse('todo', $orderBy, $recTotal, $recPerPage, $pageID);
    }

    /**
     * browse refund.
     * 
     * @param  string $mode 
     * @param  string $orderBy 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function browse($mode = 'personal', $orderBy = 'id_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        $this->app->loadClass('pager', $static = true);
        $pager = new pager($recTotal, $recPerPage, $pageID);

        $deptList    = $this->loadModel('tree')->getPairs('', 'dept');
        $deptList[0] = '/';
        $users       = $this->loadModel('user')->getList();
        $userPairs   = array();
        $userDept    = array();
        foreach($users as $key => $user) 
        {
            $userPairs[$user->account] = $user->realname;
            $userDept[$user->account] = zget($deptList, $user->dept);
        }

        if($mode == 'personal') $refunds = $this->refund->getList('', '', $this->app->user->account, $orderBy, $pager);
        if($mode == 'company')  $refunds = $this->refund->getList('', '', '', $orderBy, $pager);
        if($mode == 'todo')     $refunds = $this->refund->getList('', 'pass', '', $orderBy, $pager);

        /* Set return url. */
        $this->session->set('refundList', $this->app->getURI(true));

        $this->view->title        = $this->lang->refund->$mode;
        $this->view->refunds      = $refunds;
        $this->view->orderBy      = $orderBy;
        $this->view->mode         = $mode;
        $this->view->pager        = $pager;
        $this->view->categories   = $this->refund->getCategoryPairs();
        $this->view->currencySign = $this->loadModel('common', 'sys')->getCurrencySign();
        $this->view->userPairs    = $userPairs;
        $this->view->userDept     = $userDept;
        $this->display('refund', 'browse');
    }
    
    /**
     * View a refund.
     * 
     * @param  int    $refundID 
     * @access public
     * @return void
     */
    public function view($refundID)
    {
        $refund = $this->refund->getByID($refundID);

        $this->view->title        = $this->lang->refund->view;
        $this->view->refund       = $refund;
        $this->view->users        = $this->loadModel('user')->getPairs();
        $this->view->currencySign = $this->loadModel('common', 'sys')->getCurrencySign();
        $this->view->categories   = $this->refund->getCategoryPairs();
        $this->view->preAndNext   = $this->loadModel('common', 'sys')->getPreAndNextObject('refund', $refundID);
        $this->display();
    }

    /**
     * Delete a refund.
     * 
     * @param  int    $refundID 
     * @access public
     * @return void
     */
    public function delete($refundID)
    {
        $refund = $this->refund->getByID($refundID);
        $this->checkPriv($refund, 'delete', 'json');

        $this->refund->delete($refundID);
        if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        $this->send(array('result' => 'success'));
    }

    /**
     * browse review list.
     * 
     * @access public
     * @return void
     */
    public function browseReview()
    {
        $refunds  = array();
        $deptList = array();
        $newUsers = array();
        $users    = $this->loadModel('user')->getList();
        foreach($users as $key => $user) $newUsers[$user->account] = $user;

        if(!empty($this->config->refund->firstReviewer) or !empty($this->config->refund->secondReviewer))
        { 
            if(empty($this->config->refund->firstReviewer) and !empty($this->config->refund->secondReviewer))
            {
                if($this->config->refund->secondReviewer == $this->app->user->account)
                {
                    $deptList = $this->loadModel('tree')->getListByType('dept');
                    $refunds = $this->refund->getList('', 'doing');
                }
                else
                {
                    $deptList = $this->loadModel('tree')->getDeptManagedByMe($this->app->user->account);
                    $deptIDList = array_keys($deptList);
                    if(!empty($deptList)) $refunds = $this->refund->getList($deptIDList, 'wait');
                }
            }
            else
            {
                $deptList = $this->loadModel('tree')->getListByType('dept');
                if($this->config->refund->firstReviewer == $this->app->user->account) $refunds = $this->refund->getList('', 'wait');
                if($this->config->refund->secondReviewer == $this->app->user->account) $refunds = $this->refund->getList('', 'doing');
            }
        }
        else
        {
            $deptList = $this->loadModel('tree')->getDeptManagedByMe($this->app->user->account);
            $deptIDList = array_keys($deptList);
            if(!empty($deptList)) $refunds = $this->refund->getList($deptIDList, 'wait,doing');
        }
        $deptList[0] = new stdclass();
        $deptList[0]->name = '/';

        $this->view->title        = $this->lang->refund->review;
        $this->view->users        = $newUsers;
        $this->view->refunds      = $refunds;
        $this->view->deptList     = $deptList;
        $this->view->categories   = $this->refund->getCategoryPairs();
        $this->view->currencySign = $this->loadModel('common', 'sys')->getCurrencySign();

        $this->display();
    }

    /**
     * Review refund.
     * 
     * @param  int     $refundID 
     * @param  string  $status 
     * @access public
     * @return void
     */
    public function review($refundID)
    {
        $refund = $this->refund->getByID($refundID);

        if($_POST)
        {
            $result = $this->refund->review($refundID);
            if(is_array($result)) $this->send($result);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $isDetail = ($refund->parent != 0) ? true : false;
            $this->send(array('result' => 'success', 'isDetail' => $isDetail, 'message' => $this->lang->saveSuccess, 'locate' => inlink('browsereview')));
        }

        $this->view->title      = $this->lang->refund->review;
        $this->view->refund     = $refund;
        $this->view->categories = $this->refund->getCategoryPairs();
        $this->view->currencySign = $this->loadModel('common', 'sys')->getCurrencySign();
        $this->display();
    }

    /**
     * Refund a reimbursement.
     * 
     * @param  int    $refundID 
     * @access public
     * @return void
     */
    public function reimburse($refundID)
    {
        $this->refund->reimburse($refundID);
        if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        $this->send(array('result' => 'success', 'refundID' => $refundID));
    }

    /**
     * Create trade of refund.
     * 
     * @param  int    $refundID 
     * @access public
     * @return void
     */
    public function createTrade($refundID)
    {
        if(!commonModel::hasPriv('refund', 'reimburse')) $this->deny('refund', 'reimburse');

        $this->app->loadLang('trade', 'cash');

        if($_POST)
        {
            $this->refund->createTrade($refundID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => 'reload'));
        }

        $this->view->title         = $this->lang->refund->common;
        $this->view->refundID      = $refundID;
        $this->view->depositorList = $this->loadModel('depositor', 'cash')->getPairs();

        $this->display();
    }

    /**
     * Set reviewer for refund. 
     * 
     * @access public
     * @return void
     */
    public function settings()
    {
        $this->loadModel('user');
        if($_POST)
        {
            $settings = fixer::input('post')->get();

            if($settings->firstReviewer and $settings->secondReviewer and $settings->firstReviewer == $settings->secondReviewer) $this->send(array('result' => 'fail', 'message' => $this->lang->refund->uniqueReviewer));

            $this->loadModel('setting')->setItems('system.oa.refund', $settings);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => 'reload'));
        }

        $this->view->title           = $this->lang->refund->settings; 
        $this->view->firstReviewer   = !empty($this->config->refund->firstReviewer) ? $this->config->refund->firstReviewer : '';
        $this->view->secondReviewer  = !empty($this->config->refund->secondReviewer) ? $this->config->refund->secondReviewer : '';
        $this->view->firstReviewers  = array('' => $this->lang->dept->moderators) + $this->user->getPairs('noempty,nodeleted,noclosed');
        $this->view->secondReviewers = $this->user->getPairs('nodeleted,noclosed');
        $this->display();
    }

    /**
     * Set category for refund.
     * 
     * @access public
     * @return void
     */
    public function setCategory()
    {
        $expenseList   = $this->loadModel('tree')->getOptionMenu('out', 0, true);
        $expenseIdList =  array_keys($expenseList);

        $refundCategories = $this->dao->select('*')->from(TABLE_CATEGORY)->where('type')->eq('out')->andWhere('refund')->eq(1)->fetchAll('id');
        $refundCategories = array_keys($refundCategories);
        $refundCategories = implode($refundCategories, ',');

        if($_POST)
        {
            $this->refund->setCategory($expenseIdList);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess));
        }

        $this->view->expenseList      = $expenseList;
        $this->view->refundCategories = $refundCategories;
        $this->display();
    }

    /**
     * Check refund privilege and locate personal if no privilege. 
     * 
     * @param  object $refund 
     * @param  string $action 
     * @param  string $errorType   html|json 
     * @access private
     * @return void
     */
    private function checkPriv($refund, $action, $errorType = '')
    {
        if($this->app->user->admin == 'super') return true;

        $pass = true;
        $action = strtolower($action);
        $account = $this->app->user->account;

        if(strpos(',edit,delete,', ",$action,") !== false)
        {
            if($refund->status != 'wait' or $refund->createdBy != $account) $pass = false;
        }

        if(!$pass)
        {
            if($errorType == '') $errorType = empty($_POST) ? 'html' : 'json';
            if($errorType == 'json')
            {
                $this->app->loadLang('error');
                $this->send(array('result' => 'fail', 'message' => $this->lang->error->typeList['accessLimited']));
            }
            else
            {
                $locate = helper::safe64Encode($this->server->http_referer);
                $errorLink = helper::createLink('error', 'index', "type=accessLimited&locate={$locate}");
                $this->locate($errorLink);
            }
        }
        return $pass;
    }
}

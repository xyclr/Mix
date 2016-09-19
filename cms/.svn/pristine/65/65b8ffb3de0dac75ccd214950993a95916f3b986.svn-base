<?php
/**
 * The control file for block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     block
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class block extends control
{
    /**
     * Block Index Page.
     * 
     * @access public
     * @return void
     */
    public function index()
    {
        $lang = $this->get->lang;
        $this->app->setClientLang($lang);
        $this->app->loadLang('common', 'crm');
        $this->app->loadLang('block');

        $mode = strtolower($this->get->mode);
        if($mode == 'getblocklist')
        {   
            echo $this->block->getAvailableBlocks();
        }   
        elseif($mode == 'getblockform')
        {   
            $code = strtolower($this->get->blockid);
            $func = 'get' . ucfirst($code) . 'Params';
            echo $this->block->$func();
        }   
        elseif($mode == 'getblockdata')
        {   
            $code = strtolower($this->get->blockid);
            $func = 'print' . ucfirst($code) . 'Block';
            $this->$func();
        }
    }

    /**
     * Block Admin Page.
     * 
     * @param  int    $index 
     * @param  string $blockID 
     * @access public
     * @return void
     */
    public function admin($index = 0, $blockID = '')
    {
        $this->app->loadLang('block', 'sys');
        $title = $index == 0 ? $this->lang->block->createBlock : $this->lang->block->editBlock;

        if(!$index) $index = $this->block->getLastKey('crm') + 1;

        if($_POST)
        {
            $this->block->save($index, 'system', 'crm');
            if(dao::isError())  $this->send(array('result' => 'fail', 'message' => dao::geterror())); 
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->server->http_referer));
        }

        $block   = $this->block->getBlock($index, 'crm');
        $blockID = $blockID ? $blockID : ($block ? $block->block : '');

        $this->view->title   = $title;
        $this->view->blocks  = array_merge(array(''), json_decode($this->block->getAvailableBlocks(), true));
        $this->view->params  = $blockID ? json_decode($this->block->{'get' . ucfirst($blockID) . 'Params'}(), true) : array();
        $this->view->blockID = $blockID;
        $this->view->block   = $block;
        $this->view->index   = $index;
        $this->display();
    }

    /**
     * Sort block. 
     * 
     * @param  string    $oldOrder 
     * @param  string    $newOrder 
     * @access public
     * @return void
     */
    public function sort($oldOrder, $newOrder)
    {
        $this->locate($this->createLink('sys.block', 'sort', "oldOrder=$oldOrder&newOrder=$newOrder&app=crm"));
    }

    /**
     * Delete block. 
     * 
     * @param  int    $index 
     * @access public
     * @return void
     */
    public function delete($index)
    {
        $this->locate($this->createLink('sys.block', 'delete', "index=$index&app=crm"));
    }

    /**
     * Print order block.
     * 
     * @access public
     * @return void
     */
    public function printOrderBlock()
    {
        $this->lang->order = new stdclass();
        $this->app->loadLang('order', 'crm');

        $params = $this->get->param;
        $params = json_decode(base64_decode($params));
        if(!isset($params->type)) $params->type = '';

        $this->session->set('orderList', $this->createLink('crm.dashboard', 'index'));
        if($this->get->app == 'sys') $this->session->set('orderList', 'javascript:$.openEntry("home")');

        $this->view->sso       = base64_decode($this->get->sso);
        $this->view->code      = $this->get->blockid;
        $this->view->products  = $this->loadModel('product')->getPairs();
        $this->view->customers = $this->loadModel('customer')->getPairs('client');

        $customerIdList = $this->loadModel('customer', 'crm')->getCustomersSawByMe('view');

        $this->view->orders = $this->dao->select('*')->from(TABLE_ORDER)
            ->where('deleted')->eq(0)
            ->beginIF(!isset($this->app->user->rights['crm']['manageall']) and ($this->app->user->admin != 'super'))
            ->andWhere('customer')->in($customerIdList)
            ->fi()
            ->beginIF($params->type and strpos($params->type, 'status') === false)->andWhere($params->type)->eq($params->account)->fi()
            ->beginIF($params->type and strpos($params->type, 'status') !== false)->andWhere('status')->eq(str_replace('status' , '', $params->type))->fi()
            ->orderBy($params->orderBy)
            ->limit($params->num)
            ->fetchAll('id');

        $this->display();
    }

    /**
     * Print task block.
     * 
     * @access public
     * @return void
     */
    public function printTaskBlock()
    {
        $this->lang->task = new stdclass();
        $this->app->loadLang('task', 'sys');

        $params = $this->get->param;
        $params = json_decode(base64_decode($params));

        $this->view->sso    = base64_decode($this->get->sso);
        $this->view->code   = $this->get->blockid;

        $this->view->tasks = $this->dao->select('*')->from(TABLE_TASK)
            ->where('deleted')->eq(0)
            ->andWhere("(createdBy='$params->account' OR assignedTo = '$params->account')")
            ->beginIF(isset($params->status) and join($params->status) != false)->andWhere('status')->in($params->status)->fi()
            ->orderBy($params->orderBy)
            ->limit($params->num)
            ->fetchAll('id');

        $this->display();
    }

    /**
     * Print contract block.
     * 
     * @access public
     * @return void
     */
    public function printContractBlock()
    {
        $this->lang->contract = new stdclass();
        $this->app->loadLang('contract', 'crm');

        $params = $this->get->param;
        $params = json_decode(base64_decode($params));
        if(!isset($params->type)) $params->type = '';

        $this->session->set('contractList', $this->createLink('crm.dashboard', 'index'));
        if($this->get->app == 'sys') $this->session->set('contractList', 'javascript:$.openEntry("home")');

        $this->view->sso    = base64_decode($this->get->sso);
        $this->view->code   = $this->get->blockid;

        $this->view->contracts = $this->dao->select('*')->from(TABLE_CONTRACT)
            ->where('deleted')->eq(0)
            ->beginIF($params->type and strpos($params->type, 'status') === false)->andWhere($params->type)->eq($params->account)->fi()
            ->beginIF($params->type and strpos($params->type, 'status') !== false)->andWhere('status')->eq(str_replace('status' , '', $params->type))->fi()
            ->orderBy($params->orderBy)
            ->limit($params->num)
            ->fetchAll('id');

        $this->display();
    }

    /**
     * Print customer block.
     * 
     * @access public
     * @return void
     */
    public function printCustomerBlock()
    {
        $this->app->loadLang('customer', 'crm');

        $params = $this->get->param;
        $params = json_decode(base64_decode($params));
        if(!isset($params->type)) $params->type = '';
        $this->app->loadClass('date');
        $thisWeek = date::getThisWeek();

        $this->session->set('customerList', $this->createLink('crm.dashboard', 'index'));
        if($this->get->app == 'sys') $this->session->set('customerList', 'javascript:$.openEntry("home")');

        $customerIdList = $this->loadModel('customer', 'crm')->getCustomersSawByMe();
        if(empty($customerIdList))
        {
            $customers = array();
        }
        else
        {
            $customers = $this->dao->select('*')->from(TABLE_CUSTOMER)
                ->where('deleted')->eq(0)
                ->andWhere('id')->in($customerIdList)
                ->beginIF($params->type and $params->type == 'today')->andWhere('nextDate')->eq(helper::today())->fi()
                ->beginIF($params->type and $params->type == 'thisweek')->andWhere('nextDate')->between($thisWeek['begin'], $thisWeek['end'])->fi()
                ->orderBy($params->orderBy)
                ->limit($params->num)
                ->fetchAll('id');
        }

        $this->view->sso       = base64_decode($this->get->sso);
        $this->view->code      = $this->get->blockid;
        $this->view->customers = $customers;

        $this->display();
    }
}

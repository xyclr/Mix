<?php
/**
 * The control file of block module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
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
        $this->app->loadLang('common', 'cash');
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

        if(!$index) $index = $this->block->getLastKey('cash') + 1;

        if($_POST)
        {
            $this->block->save($index, 'system', 'cash');
            if(dao::isError())  $this->send(array('result' => 'fail', 'message' => dao::geterror())); 
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->server->http_referer));
        }

        $block   = $this->block->getBlock($index, 'cash');
        $blockID = $blockID ? $blockID : ($block ? $block->block : '');

        $blocks = json_decode($this->block->getAvailableBlocks(), true);
        $this->view->blocks  = array_merge(array(''), $blocks);

        $this->view->title   = $title;
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
        $this->locate($this->createLink('sys.block', 'sort', "oldOrder=$oldOrder&newOrder=$newOrder&app=cash"));
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
        $this->locate($this->createLink('sys.block', 'delete', "index=$index&app=cash"));
    }

    /**
     * Print depositor block.
     * 
     * @access public
     * @return void
     */
    public function printDepositorBlock()
    {
        $this->lang->depositor = new stdclass();
        $this->app->loadLang('depositor', 'cash');

        $this->processParams();

        $this->view->depositors = $this->dao->select('*')->from(TABLE_DEPOSITOR)->where('type')->ne('cash')->andWhere('status')->eq('normal')->fetchAll('id');
        $this->display();
    }

    /**
     * Print trade block.
     * 
     * @access public
     * @return void
     */
    public function printTradeBlock()
    {
        $this->app->loadLang('trade', 'cash');

        $this->processParams();

        /* Do not get trades which user has no privilege to browse their categories. */
        $denyCategories = array();
        $outCategories = $this->dao->select('*')->from(TABLE_CATEGORY)->where('type')->eq('out')->fetchAll('id');
        foreach($outCategories as $id => $outCategory)
        {
            if(!$this->loadModel('tree')->hasRight($id)) $denyCategories[] = $id; 
        }

        $rights = $this->app->user->rights;
        $expensePriv = (isset($rights['tradebrowse']['out']) or $this->app->user->admin == 'super') ? true : false; 

        $this->view->trades = $this->dao->select('*')->from(TABLE_TRADE)
            ->where('1=1')
            ->beginIF(!empty($denyCategories))->andWhere('category')->notin($denyCategories)
            ->beginIF(!$expensePriv)->andWhere('type')->ne('out')->fi()
            ->orderBy($this->params->orderBy)
            ->limit($this->params->num)
            ->fetchAll('id');

        $this->view->currencySign  = $this->loadModel('common', 'sys')->getCurrencySign();
        $this->view->depositorList = $this->loadModel('depositor')->getPairs();
        $this->display();
    }

    /**
     * Print provider block.
     * 
     * @access public
     * @return void
     */
    public function printProviderBlock()
    {
        $this->app->loadLang('provider', 'cash');

        $this->session->set('providerList', $this->createLink('cash.dashboard', 'index'));
        if($this->get->app == 'sys') $this->session->set('providerList', 'javascript:$.openEntry("home")');

        $this->processParams();

        $this->view->providers = $this->dao->select('*')->from(TABLE_CUSTOMER)
            ->where('deleted')->eq(0)
            ->andWhere('relation')->eq('provider')
            ->orderBy($this->params->orderBy)
            ->limit($this->params->num)
            ->fetchAll('id');

        $this->view->areas      = $this->loadModel('tree')->getOptionMenu('area');
        $this->view->industries = $this->tree->getOptionMenu('industry');
        $this->display();
    }

    /**
     * Process params.
     * 
     * @access public
     * @return void
     */
    public function processParams()
    {
        $params = $this->get->param;
        $this->params = json_decode(base64_decode($params));

        $this->view->sso  = base64_decode($this->get->sso);
        $this->view->code = $this->get->blockid;
    }
}

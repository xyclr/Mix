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
        $this->app->loadLang('common', 'team');
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

        if(!$index) $index = $this->block->getLastKey('team') + 1;

        if($_POST)
        {
            $this->block->save($index, 'system', 'team');
            if(dao::isError())  $this->send(array('result' => 'fail', 'message' => dao::geterror())); 
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->server->http_referer));
        }

        $block   = $this->block->getBlock($index, 'team');
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
        $this->locate($this->createLink('sys.block', 'sort', "oldOrder=$oldOrder&newOrder=$newOrder&app=team"));
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
        $this->locate($this->createLink('sys.block', 'delete', "index=$index&app=team"));
    }

    /**
     * Print blog block.
     * 
     * @access public
     * @return void
     */
    public function printBlogBlock()
    {
        $this->lang->blog = new stdclass();
        $this->app->loadLang('blog', 'team');

        $this->processParams();

        $this->view->blogs = $this->dao->select('*')->from(TABLE_ARTICLE)
            ->where('type')->eq('blog')
            ->orderBy('createdDate desc')
            ->limit($this->params->num)
            ->fetchAll('id');

        $this->display();
    }

    /**
     * Print thread block.
     * 
     * @access public
     * @return void
     */
    public function printThreadBlock()
    {
        $this->lang->thread = new stdclass();
        $this->app->loadLang('thread', 'team');

        $this->processParams();

        $threads = $this->dao->select('*')->from(TABLE_THREAD)
            ->beginIF(isset($this->params->type) and $this->params->type == 'stick')
            ->where('stick')->in('1,2')
            ->fi()
            ->orderBy('createdDate desc')
            ->limit($this->params->num)
            ->fetchAll('id');

        $this->loadModel('thread')->setRealNames($threads);
        $threads = $this->thread->process($threads);

        $this->view->threads = $threads;

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

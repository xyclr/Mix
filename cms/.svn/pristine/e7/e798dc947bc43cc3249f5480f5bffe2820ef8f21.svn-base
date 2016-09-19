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

        if(!$index) $index = $this->block->getLastKey('oa') + 1;

        if($_POST)
        {
            $this->block->save($index, 'system', 'oa');
            if(dao::isError())  $this->send(array('result' => 'fail', 'message' => dao::geterror())); 
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->server->http_referer));
        }

        $block   = $this->block->getBlock($index, 'oa');
        $blockID = $blockID ? $blockID : ($block ? $block->block : '');

        $blocks = json_decode($this->block->getAvailableBlocks(), true);
        $this->view->blocks  = array_merge(array(''), $blocks);

        $this->view->title   = $title;
        $this->view->params  = $blockID ? json_decode($this->block->{'get' . ucfirst($blockID) . 'Params'}(), true) : array();;
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
        $this->locate($this->createLink('sys.block', 'sort', "oldOrder=$oldOrder&newOrder=$newOrder&app=oa"));
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
        $this->locate($this->createLink('sys.block', 'delete', "index=$index&app=oa"));
    }

    /**
     * Print announce block.
     * 
     * @access public
     * @return void
     */
    public function printAnnounceBlock()
    {
        $this->lang->announce = new stdclass();
        $this->app->loadLang('announce', 'oa');

        $this->processParams();

        $this->view->announces = $this->dao->select('*')->from(TABLE_ARTICLE)
            ->where('type')->eq('announce')
            ->orderBy('createdDate desc')
            ->limit($this->params->num)
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
        $this->session->set('taskList', $this->createLink('dashboard', 'index'));
        if($this->get->app == 'sys') $this->session->set('taskList', 'javascript:$.openEntry("home")');

        $this->processParams();
        if(strpos(join($this->params->status), 'unfinished') !== false)
        {
            $this->params->status[] = 'wait';
            $this->params->status[] = 'doing';
        }

        /* Get project ids. */
        $projects = $this->loadMOdel('project')->getPairs();
        $ids = '';
        foreach($projects as $key => $project) $ids .= ',' . $key;

        $this->view->tasks = $this->dao->select('*')->from(TABLE_TASK)
            ->where('deleted')->eq(0)
            ->andWhere('project')->ne(0)
            ->andWhere('project')->in($ids)
            ->beginIF(isset($this->params->status) and join($this->params->status) != false)->andWhere('status')->in($this->params->status)->fi()
            ->beginIF($this->params->type)->andWhere($this->params->type)->eq($this->params->account)->fi()
            ->orderBy($this->params->orderBy)
            ->limit($this->params->num)
            ->fetchAll('id');

        $this->display();
    }

    /**
     * Print task block for created by me.
     * 
     * @access public
     * @return void
     */
    public function printMyCreatedTaskBlock()
    {
        $this->lang->task = new stdclass();
        $this->app->loadLang('task', 'sys');
        $this->session->set('taskList', $this->createLink('dashboard', 'index'));
        if($this->get->app == 'sys') $this->session->set('taskList', 'javascript:$.openEntry("home")');

        $this->processParams();

        $this->view->tasks = $this->dao->select('*')->from(TABLE_TASK)
            ->where('createdBy')->eq($this->params->account)
            ->andWhere('deleted')->eq(0)
            ->andWhere('project')->ne(0)
            ->beginIF(isset($this->params->status) and join($this->params->status) != false)->andWhere('status')->in($this->params->status)->fi()
            ->orderBy($this->params->orderBy)
            ->limit($this->params->num)
            ->fetchAll('id');

        $this->display();
    }

    /**
     * Print task block for assigned to me.
     * 
     * @access public
     * @return void
     */
    public function printAssignedMeTaskBlock()
    {
        $this->lang->task = new stdclass();
        $this->app->loadLang('task', 'sys');
        $this->session->set('taskList', $this->createLink('dashboard', 'index'));
        if($this->get->app == 'sys') $this->session->set('taskList', 'javascript:$.openEntry("home")');

        $this->processParams();

        $this->view->tasks = $this->dao->select('*')->from(TABLE_TASK)
            ->where('assignedTo')->eq($this->params->account)
            ->andWhere('deleted')->eq(0)
            ->andWhere('project')->ne(0)
            ->beginIF(isset($this->params->status) and join($this->params->status) != false)->andWhere('status')->in($this->params->status)->fi()
            ->orderBy($this->params->orderBy)
            ->limit($this->params->num)
            ->fetchAll('id');

        $this->display();
    }

    /**
     * Print broject block.
     * 
     * @access public
     * @return void
     */
    public function printProjectBlock()
    {
        $this->lang->project = new stdclass();
        $this->app->loadLang('project', 'oa');
        $this->loadModel('task', 'sys');

        $this->processParams();

        $projects = $this->dao->select('*')->from(TABLE_PROJECT)
            ->where('deleted')->eq(0)
            ->andWhere('status')->eq(isset($this->params->status) ? $this->params->status : 'doing')
            ->orderBy($this->params->orderBy)
            ->limit($this->params->num)
            ->fetchAll('id');

        /* Get task info of project. */
        foreach($projects as $project)
        {
            $tasks = $this->task->getList($project->id, null, 'id_desc', null, 'status');

            $left     = 0;
            $consumed = 0;
            foreach($tasks as $group)
            {
                foreach($group as $task)
                {
                    $left     += $task->left;
                    $consumed += $task->consumed;
                }
            }
            $total = $left + $consumed;

            $project->wait = isset($tasks['wait']) ? count($tasks['wait']) : 0;
            $project->done = (isset($tasks['done']) ? count($tasks['done']) : 0) + (isset($tasks['closed']) ? count($tasks['closed']) : 0);
            $project->rate = $total ? round(($consumed / $total), 3) * 100 . '%' : '0%';
        }

        $this->view->users    = $this->loadModel('user')->getPairs();
        $this->view->projects = $projects;

        $this->display();
    }

    /**
     * Print attend block. 
     * 
     * @access public
     * @return void
     */
    public function printAttendBlock()
    {
        $this->loadModel('attend', 'oa');
        $date      = date('Y-m-d');
        $dateTime  = strtotime($date);
        if($this->config->attend->workingDays > 7)
        {
            $startDate = date('w', $dateTime) == 0 ? date('Y-m-d', $dateTime) : date('Y-m-d', strtotime("last Sunday $date"));
            $endDate   = date('Y-m-d', strtotime("next Saturday $startDate"));
        }
        else
        {
            $startDate = date('w', $dateTime) == 1 ? date('Y-m-d', $dateTime) : date('Y-m-d', strtotime("last Monday $date"));
            $endDate   = date('Y-m-d', strtotime("next Sunday $startDate"));
        }
        $attends   = $this->attend->getByAccount($this->app->user->account, $startDate, $endDate);

        $dateLimit = array();
        $dateLimit['begin'] = $startDate;
        $dateLimit['end']   = $endDate;
        $todos = $this->loadModel('todo', 'oa')->getList($dateLimit, $this->app->user->account);

        /* Process todos. */
        $newTodos = array();
        foreach($todos as $todo)
        {
            if(!isset($newTodos[$todo->date])) $newTodos[$todo->date] = array();
            $time = date('H', strtotime("{$todo->date} {$todo->begin}")) > 12 ? 'PM' : 'AM';
            if(!isset($newTodos[$todo->date][$time])) $newTodos[$todo->date][$time] = array();
            $newTodos[$todo->date][$time][] = $todo;
        }

        $this->processParams();
        $this->view->attends   = $attends;
        $this->view->todos     = $newTodos;
        $this->view->date      = $date;
        $this->view->startDate = $startDate;
        $this->view->endDate   = $endDate;
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

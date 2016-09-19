<?php
/**
 * The control file of sales of RanZhi.
 *
 * @copyright   Copyright 2009-2010 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL 
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     sales
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class sales extends control
{
    /**
     * Construct function.
     * 
     * @access public
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->loadModel('user');
        $this->lang->menuGroups->sales = 'setting';
    }

    /**
     * Browse groups.
     * 
     * @param  int    $companyID 
     * @access public
     * @return void
     */
    public function browse()
    {
        $groups = $this->sales->getGroupList();
        $users  = $this->user->getPairs('nodeleted, noempty, noclosed, noforbidden');
        foreach($groups as $group) 
        {
            $accounts = explode(',', $group->users);
            $group->users = '';
            foreach($accounts as $account) if($account != '' and isset($users[$account])) $group->users .= " " . $users[$account]; 
        }

        $this->view->title  = $this->lang->sales->browse;
        $this->view->groups = $groups;

        $this->display();
    }

    /**
     * Create a group.
     * 
     * @access public
     * @return void
     */
    public function create()
    {
        if(!empty($_POST))
        {
            $this->sales->create();
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        $this->view->title  = $this->lang->sales->create;
        $this->view->users  = $this->user->getPairs('nodeleted, noempty, noclosed, noforbidden');
        $this->view->privs  = $this->sales->getAllPrivs();
        $this->view->groups = $this->sales->getGroupList();

        $this->display();
    }

    /**
     * edit 
     * 
     * @param  int    $groupID 
     * @access public
     * @return void
     */
    public function edit($groupID)
    {
        if(!empty($_POST))
        {
            $this->sales->edit($groupID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        /* Put current group first. */
        $group    = $this->sales->getByID($groupID);
        $groups[] = $group;
        foreach($this->sales->getGroupList() as $g) if($g->id != $groupID) $groups[] = $g;

        $this->view->title  = $this->lang->sales->create;
        $this->view->group  = $group;
        $this->view->users  = $this->user->getPairs('nodeleted, noempty, noclosed, noforbidden');
        $this->view->privs  = $this->sales->getAllPrivs();
        $this->view->groups = $groups;

        $this->display();
    }

    /**
     * delete a group.
     * 
     * @param  int    $groupID 
     * @access public
     * @return void
     */
    public function delete($groupID)
    {
        $this->sales->delete($groupID);
        if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        $this->send(array('result' => 'success', 'locate' => inlink('browse')));
    }
}

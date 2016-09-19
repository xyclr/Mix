<?php
/**
 * The control file of trip of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL 
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     trip
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class trip extends control
{
    /**
     * index 
     * 
     * @access public
     * @return void
     */
    public function index()
    {
        $this->locate(inlink('browse'));
    }

    /**
     * personal's trip. 
     * 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function personal($date = '')
    {
        die($this->fetch('trip', 'browse', "type=personal&date=$date", 'oa'));
    }

    /**
     * Department's trip. 
     * 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function department($date = '')
    {
        die($this->fetch('trip', 'browse', "type=department&date=$date", 'oa'));
    }

    /**
     * Company's trip. 
     * 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function company($date = '')
    {
        die($this->fetch('trip', 'browse', "type=company&date=$date", 'oa'));
    }

    /**
     * browse 
     * 
     * @param  string $type 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function browse($type = 'personal', $date = '')
    {
        if($date == '' or (strlen($date) != 6 and strlen($date) != 4)) $date = date("Ym");
        $currentYear  = substr($date, 0, 4);
        $currentMonth = strlen($date) == 6 ? substr($date, 4, 2) : '';
        $monthList    = $this->trip->getAllMonth();
        $yearList     = array_reverse(array_keys($monthList));
        $deptList     = array();

        if($type == 'personal')
        {
            $tripList = $this->trip->getList($currentYear, $currentMonth, $this->app->user->account);
        }
        elseif($type == 'department')
        {
            $deptList = $this->loadModel('tree')->getDeptManagedByMe($this->app->user->account);
            foreach($deptList as $key => $value) $deptList[$key] = $value->name;
            $tripList = $this->trip->getList($currentYear, $currentMonth, '', array_keys($deptList));
        }
        elseif($type == 'company')
        {
            $tripList = $this->trip->getList($currentYear, $currentMonth);
        }

        $this->view->title        = $this->lang->trip->browse;
        $this->view->type         = $type;
        $this->view->currentYear  = $currentYear;
        $this->view->currentMonth = $currentMonth;
        $this->view->monthList    = $monthList;
        $this->view->yearList     = $yearList;
        $this->view->deptList     = $deptList;
        $this->view->users        = $this->loadModel('user')->getPairs();
        $this->view->tripList    = $tripList;
        $this->display();
    }

    /**
     * create trip.
     * 
     * @access public
     * @return void
     */
    public function create()
    {
        if($_POST)
        {
            $result = $this->trip->create();
            if(is_array($result)) $this->send($result);

            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => 'reload'));
        }

        $this->app->loadConfig('attend');
        $this->view->title = $this->lang->trip->create;
        $this->display();
    }

    /**
     * Edit trip.
     * 
     * @param  int    $id 
     * @access public
     * @return void
     */
    public function edit($id)
    {
        $trip = $this->trip->getById($id);
        /* check privilage. */
        if($trip->createdBy != $this->app->user->account) 
        {
            $locate = helper::safe64Encode(helper::createLink('oa.trip', 'browse'));
            $errorLink = helper::createLink('error', 'index', "type=accessLimited&locate={$locate}");
            die(js::locate($errorLink));
        }

        if($_POST)
        {
            $result = $this->trip->update($id);
            if(is_array($result)) $this->send($result);

            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => 'reload'));
        }

        $this->view->title = $this->lang->trip->edit;
        $this->view->trip = $trip;
        $this->display();
    }

    /**
     * Delete trip.
     * 
     * @param  int    $id 
     * @access public
     * @return void
     */
    public function delete($id)
    {
        $trip = $this->trip->getByID($id);
        if($trip->createdBy != $this->app->user->account) $this->send(array('result' => 'fail', 'message' => $this->lang->trip->denied));

        $this->trip->delete($id);
        if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        $this->send(array('result' => 'success'));
    }
}


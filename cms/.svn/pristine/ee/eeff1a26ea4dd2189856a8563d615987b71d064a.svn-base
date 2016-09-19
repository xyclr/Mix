<?php
/**
 * The model file of leave module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL 
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     leave
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class leaveModel extends model
{
    /**
     * Get a leave by id. 
     * 
     * @param  int    $id 
     * @access public
     * @return object
     */
    public function getById($id)
    {
        return $this->dao->select('*')->from(TABLE_LEAVE)->where('id')->eq($id)->fetch();
    }

    /**
     * Get leave list. 
     * 
     * @param  string $year 
     * @param  string $month 
     * @param  string $account 
     * @param  string $dept 
     * @param  string $status 
     * @access public
     * @return array
     */
    public function getList($year = '', $month = '', $account = '', $dept = '', $status = '')
    {
        return $this->dao->select('t1.*, t2.realname, t2.dept')->from(TABLE_LEAVE)->alias('t1')->leftJoin(TABLE_USER)->alias('t2')->on("t1.createdBy=t2.account")
            ->where('1=1')
            ->beginIf($year != '')->andWhere('t1.year')->eq($year)->fi()
            ->beginIf($month != '')->andWhere('t1.begin')->like("%-$month-%")->fi()
            ->beginIf($account != '')->andWhere('t1.createdBy')->eq($account)->fi()
            ->beginIf($dept != '')->andWhere('t2.dept')->in($dept)->fi()
            ->beginIf($status != '')->andWhere('t1.status')->eq($status)->fi()
            ->orderBy('t2.dept,t1.id_desc')
            ->fetchAll();
    }

    /**
     * Get leave by date and account.
     * 
     * @param  string    $date 
     * @param  string    $account 
     * @access public
     * @return object
     */
    public function getByDate($date, $account)
    {
        return $this->dao->select('*')->from(TABLE_LEAVE)->where('begin')->le($date)->andWhere('end')->ge($date)->andWhere('createdBy')->eq($account)->fetch();
    }

    /**
     * Get all month of leave's begin.
     * 
     * @access public
     * @return array
     */
    public function getAllMonth()
    {
        $monthList = array();
        $dateList  = $this->dao->select('begin')->from(TABLE_LEAVE)->groupBy('begin')->orderBy('begin_asc')->fetchAll('begin');
        foreach($dateList as $date)
        {
            $year  = substr($date->begin, 0, 4);
            $month = substr($date->begin, 5, 2);
            if(!isset($monthList[$year][$month])) $monthList[$year][$month] = $month;
        }
        return $monthList;
    }

    /**
     * Create a leave.
     * 
     * @access public
     * @return bool
     */
    public function create()
    {
        $leave = fixer::input('post')
            ->add('status', 'wait')
            ->add('createdBy', $this->app->user->account)
            ->add('createdDate', helper::now())
            ->get();
        if(isset($leave->begin) and $leave->begin != '') $leave->year = substr($leave->begin, 0, 4);

        $dates = range(strtotime($leave->begin), strtotime($leave->end), 60*60*24);
        foreach($dates as $date)
        {
            $date = date('Y-m-d', $date);
            $existLeave = $this->getByDate($date, $this->app->user->account);
            if($existLeave) return array('result' => 'fail', 'message' => sprintf($this->lang->leave->unique, $date)); 

            $existTrip = $this->loadModel('trip')->getByDate($date, $this->app->user->account);
            if($existTrip) return array('result' => 'fail', 'message' => sprintf($this->lang->trip->unique, $date)); 
        }

        $this->dao->insert(TABLE_LEAVE)
            ->data($leave)
            ->autoCheck()
            ->batchCheck($this->config->leave->require->create, 'notempty')
            ->check('end', 'ge', $leave->begin)
            ->exec();

        if(!dao::isError()) $this->loadModel('attend')->batchUpdate($dates, $leave->createdBy, '', 'leave');

        return false;
    }

    /**
     * update leave.
     * 
     * @param  int    $id 
     * @access public
     * @return bool
     */
    public function update($id)
    {
        $oldLeave = $this->getByID($id);

        $leave = fixer::input('post')
            ->remove('status')
            ->remove('createdBy')
            ->remove('createdDate')
            ->get();

        if(isset($leave->begin) and $leave->begin != '') $leave->year = substr($leave->begin, 0, 4);

        $dates = range(strtotime($leave->begin), strtotime($leave->end), 60*60*24);
        foreach($dates as $date)
        {
            $date = date('Y-m-d', $date);
            $existLeave = $this->getByDate($date, $this->app->user->account);
            if($existLeave and $existLeave->id != $oldLeave->id) return array('result' => 'fail', 'message' => sprintf($this->lang->leave->unique, $date)); 

            $existTrip = $this->loadModel('trip')->getByDate($date, $this->app->user->account);
            if($existTrip) return array('result' => 'fail', 'message' => sprintf($this->lang->trip->unique, $date)); 
        }

        $this->dao->update(TABLE_LEAVE)
            ->data($leave)
            ->autoCheck()
            ->batchCheck($this->config->leave->require->edit, 'notempty')
            ->check('end', 'ge', $leave->begin)
            ->where('id')->eq($id)
            ->exec();

        if(!dao::isError())
        {
            $oldDates = range(strtotime($oldLeave->begin), strtotime($oldLeave->end), 60*60*24);
            $this->loadModel('attend')->batchUpdate($oldDates, $oldLeave->createdBy, '');

            $this->loadModel('attend')->batchUpdate($dates, $oldLeave->createdBy, '', 'leave');
        }
        return !dao::isError();
    }

    /**
     * review 
     * 
     * @param  int    $id 
     * @param  string $status 
     * @access public
     * @return bool
     */
    public function review($id, $status)
    {
        if(!isset($this->lang->leave->statusList[$status])) return false;

        $leave = $this->getByID($id);

        $this->dao->update(TABLE_LEAVE)
            ->set('status')->eq($status)
            ->set('reviewedBy')->eq($this->app->user->account)
            ->set('reviewedDate')->eq(helper::now())
            ->where('id')->eq($id)
            ->exec();

        if(!dao::isError() and $status == 'pass')
        {
            $dates = range(strtotime($leave->begin), strtotime($leave->end), 60*60*24);
            $this->loadModel('attend')->batchUpdate($dates, $leave->createdBy, 'leave', '', $leave);
        }

        return !dao::isError();
    }

    /**
     * check date is in leave. 
     * 
     * @param  string $date 
     * @param  string $account 
     * @access public
     * @return bool
     */
    public function isLeave($date, $account)
    {
        static $leaveList = array();
        if(!isset($leaveList[$account])) $leaveList[$account] = $this->getList($year = '', $month = '', $account, $dept = '', 'pass');

        foreach($leaveList[$account] as $leave)
        {
            if(strtotime($date) >= strtotime($leave->begin) and strtotime($date) <= strtotime($leave->end)) return true;
        }

        return false;
    }

    /**
     * delete leave.
     * 
     * @param  int    $id 
     * @access public
     * @return bool
     */
    public function delete($id, $null = null)
    {
        $oldLeave = $this->getByID($id);

        $this->dao->delete()->from(TABLE_LEAVE)->where('id')->eq($id)->exec();

        if(!dao::isError())
        {
            $oldDates = range(strtotime($oldLeave->begin), strtotime($oldLeave->end), 60*60*24);
            $this->loadModel('attend')->batchUpdate($oldDates, $oldLeave->createdBy, '');
        }

        return !dao::isError();
    }
}

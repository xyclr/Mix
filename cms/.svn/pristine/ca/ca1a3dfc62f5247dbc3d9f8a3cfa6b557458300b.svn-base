<?php
/**
 * The model file of attend module of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     attend
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class attendModel extends model
{
    /**
     * Get by attend id. 
     * 
     * @param  int    $attendID 
     * @access public
     * @return object
     */
    public function getByID($attendID)
    {
        $attend = $this->dao->select('*')->from(TABLE_ATTEND)->where('id')->eq($attendID)->fetch();
        return empty($attend) ? $attend : $this->processAttend($attend);
    }

    /**
     * Get by date and account.
     * 
     * @param  string $date 
     * @param  string $account 
     * @access public
     * @return void
     */
    public function getByDate($date, $account)
    {
        $this->processStatus();
        $attend = $this->dao->select('*')->from(TABLE_ATTEND)->where('date')->eq($date)->andWhere('account')->eq($account)->fetch();
        if(empty($attend))
        {
            $attend = new stdclass();
            $attend->account = $account;
            $attend->date    = $date;
            $attend->signIn  = '00:00:00';
            $attend->signOut = '00:00:00';
            $attend->status  = $this->computeStatus($attend);
            $attend->manualIn     = '';
            $attend->manualOut    = '';
            $attend->reason       = '';
            $attend->desc         = '';
            $attend->reviewStatus = '';
            $attend->reviewedBy   = '';
            $attend->reviewedDate = '';
            $attend->new          = true;
        }

        return $this->processAttend($attend);
    }

    /**
     * Get by account. 
     * 
     * @param  string $account 
     * @param  string $startDate 
     * @param  string $endDate 
     * @access public
     * @return array
     */
    public function getByAccount($account, $startDate = '', $endDate = '')
    {
        $this->processStatus();
        $attends = $this->dao->select('*')->from(TABLE_ATTEND)
            ->where('account')->eq($account)
            ->beginIf($startDate != '')->andWhere('`date`')->ge($startDate)->fi()
            ->beginIf($endDate != '')->andWhere('`date`')->le($endDate)->fi()
            ->orderBy('`date`')
            ->fetchAll('date');

        $attends = $this->fixUserAttendList($attends, $startDate, $endDate);
        return $this->processAttendList($attends);
    }

    /**
     * Get department's attend list. 
     * 
     * @param  string $deptID
     * @param  string $startDate 
     * @param  string $endDate 
     * @param  string $reviewStatus 
     * @access public
     * @return array
     */
    public function getByDept($deptID, $startDate = '', $endDate = '', $reviewStatus = '')
    {
        $this->processStatus();
        $users = $this->loadModel('user')->getPairs('noclosed,noempty,nodeleted', $deptID);

        $attends = $this->dao->select('t1.*, t2.dept')->from(TABLE_ATTEND)->alias('t1')->leftJoin(TABLE_USER)->alias('t2')->on("t1.account=t2.account")
            ->where('t1.account')->in(array_keys($users))
            ->beginIf($startDate != '')->andWhere('t1.date')->ge($startDate)->fi()
            ->beginIf($endDate != '')->andWhere('t1.date')->le($endDate)->fi()
            ->beginIf($reviewStatus != '')->andWhere('t1.reviewStatus')->eq($reviewStatus)->fi()
            ->orderBy('t2.dept,t1.date')
            ->fetchAll();

        /* Format attend list. */
        $newAttends = array();
        foreach($attends as $key => $attend) $newAttends[$attend->dept][$attend->account][$attend->date] = $attend; 

        /* Fix dept's user record. */
        if(!is_array($deptID)) $deptID = explode(',', trim($deptID, ','));
        foreach($deptID as $dept)
        {
            if($dept == 0) continue;
            $deptUsers = $this->loadModel('user')->getPairs('noclosed,noempty,nodeleted', $dept);
            foreach($deptUsers as $account => $realname) if(!isset($newAttends[$dept][$account])) $newAttends[$dept][$account] = array();
        }

        /* Fix user's record. */
        foreach($newAttends as $dept => $deptAttends)
        {
            foreach($newAttends[$dept] as $user => $userAttends)
            {
                if($reviewStatus == '') $newAttends[$dept][$user] = $this->fixUserAttendList($newAttends[$dept][$user], $startDate, $endDate, $user);
                $newAttends[$dept][$user] = $this->processAttendList($newAttends[$dept][$user]);
            }
        }

        return $newAttends;
    }

    /**
     * Get wait attends.
     * 
     * @access public
     * @return array()
     */
    public function getWaitAttends()
    {
        return $this->dao->select('*')->from(TABLE_ATTEND)->where('reviewStatus')->eq('wait')->fetchAll();
    }

    /**
     * Get all month data.
     * return array[year][month]
     * 
     * @access public
     * @return array
     */
    public function getAllMonth()
    {
        $dateList = $this->dao->select('date')->from(TABLE_ATTEND)->groupBy('date')->orderBy('date_asc')->fetchAll();

        $monthList = array();
        foreach($dateList as $date)
        {
            $year  = substr($date->date, 0, 4);
            $month = substr($date->date, 5, 2);
            if(!isset($monthList[$year][$month])) $monthList[$year][$month] = $month;
        }
        return $monthList;
    }

    /**
     * Get notice.
     * 
     * @access public
     * @return string
     */
    public function getNotice()
    {
        $account = $this->app->user->account;
        $link    = helper::createLink('oa.attend', 'personal');
        $entry   = $this->loadModel('entry')->getByCode('oa');
        $misc    = "class='app-btn' data-id='{$entry->id}'";

        $this->lang->attend->statusList['absent'] = $this->lang->attend->notice['absent'];

        $today  = helper::today();
        $attend = $this->getByDate($today, $account);
        if(empty($attend)) return sprintf($this->lang->attend->notice['today'], $this->lang->attend->statusList['absent'], $link, $misc); 
        if(!empty($attend) and strpos('late,early,both,absent', $attend->status) !== false) 
        {
            return sprintf($this->lang->attend->notice['today'], zget($this->lang->attend->statusList, $attend->status), $link, $misc); 
        }

        $yestoday = date("Y-m-d", strtotime("-1 day"));
        $attend   = $this->getByDate($yestoday, $account);
        if(empty($attend)) return sprintf($this->lang->attend->notice['yestoday'], $this->lang->attend->statusList['absent'], $link, $misc); 
        if(!empty($attend) and strpos('late,early,both,absent', $attend->status) !== false) 
        {
            return sprintf($this->lang->attend->notice['yestoday'], zget($this->lang->attend->statusList, $attend->status), $link, $misc); 
        }

        return '';
    }

    /**
     * sign in.
     * 
     * @param  string $account 
     * @param  string $date 
     * @access public
     * @return bool
     */
    public function signIn($account = '', $date = '')
    {
        if($account == '') $account = $this->app->user->account;
        if($date == '')    $date    = date('Y-m-d');

        $attend = $this->dao->select('*')->from(TABLE_ATTEND)->where('account')->eq($account)->andWhere('`date`')->eq($date)->fetch();
        if(empty($attend))
        {
            $attend = new stdclass();
            $attend->account = $account;
            $attend->date    = $date;
            $attend->signIn  = helper::time();
            $attend->ip      = helper::getRemoteIp();
            $this->dao->insert(TABLE_ATTEND)->data($attend)->autoCheck()->exec();
            return !dao::isError();
        }

        if($attend->signIn == '' or $attend->signIn == '00:00:00')
        {
            $this->dao->update(TABLE_ATTEND)->set('signIn')->eq(helper::time())->where('id')->eq($attend->id)->exec();
            return !dao::isError();
        }

        return true;
    }

    /**
     * sign out.
     * 
     * @param  string $account 
     * @param  string $date 
     * @access public
     * @return bool
     */
    public function signOut($account = '', $date = '')
    {
        if($account == '') $account = $this->app->user->account;
        if($date == '')    $date    = date('Y-m-d');

        $attend = $this->dao->select('*')->from(TABLE_ATTEND)->where('account')->eq($account)->andWhere('`date`')->eq($date)->fetch();
        if(empty($attend))
        {
            $attend = new stdclass();
            $attend->account = $account;
            $attend->date    = $date;
            $attend->signOut = helper::time();
            $this->dao->insert(TABLE_ATTEND)
                ->data($attend)
                ->autoCheck()
                ->exec();
            return !dao::isError();
        }

        $this->dao->update(TABLE_ATTEND)
            ->set('signOut')->eq(helper::time())
            ->where('id')->eq($attend->id)
            ->exec();
        return !dao::isError();
    }

    /**
     * Pass manual sign date.
     * 
     * @param  int    $attendID 
     * @param  string $status 
     * @access public
     * @return bool
     */
    public function review($attendID, $status)
    {
        if($status == 'pass')
        {
            $attend  = $this->getByID($attendID);
            $signIn  = (!empty($attend->manualIn) and $attend->manualIn != '00:00:00') ? $attend->manualIn : $attend->signIn;
            $signOut = (!empty($attend->manualOut) and $attend->manualOut != '00:00:00') ? $attend->manualOut : $attend->signOut;

            $this->dao->update(TABLE_ATTEND)
                ->set('status')->eq($attend->reason)
                ->set('reviewStatus')->eq('pass')
                ->set('signIn')->eq($signIn)
                ->set('signOut')->eq($signOut)
                ->where('id')->eq($attendID)
                ->exec();
        }

        if($status == 'reject')
        {
            $this->dao->update(TABLE_ATTEND)->set('reviewStatus')->eq('reject')->where('id')->eq($attendID)->exec();
        }

        return !dao::isError();
    }

    /**
     * Reject manual sign data.
     * 
     * @param  int    $attendID 
     * @access public
     * @return bool
     */
    public function reject($attendID)
    {
        return !dao::isError();
    }

    /**
     * add manual sign in and sign out date.
     * 
     * @param  string $date 
     * @param  string $account 
     * @access public
     * @return void
     */
    public function update($date, $account)
    {
        $oldAttend = $this->getByDate($date, $account);
        $attend = fixer::input('post')
            ->remove('date,account,signIn,signOut,status,reviewStatus')
            ->setDefault('manualIn', '')
            ->setDefault('manualOut', '')
            ->add('reviewStatus', 'wait')
            ->add('reason', 'normal')
            ->get();

        $attend->manualIn  = date("H:i", strtotime("{$date} {$attend->manualIn}"));
        $attend->manualOut = date("H:i", strtotime("{$date} {$attend->manualOut}"));

        if(isset($oldAttend->new))
        {
            $attend->date    = $date;
            $attend->account = $account;
            $attend->status  = 'absent';
            $this->dao->insert(TABLE_ATTEND)
                ->data($attend)
                ->autoCheck()
                ->exec();
        }
        else
        {
            $this->dao->update(TABLE_ATTEND)
                ->data($attend)
                ->autoCheck()
                ->where('date')->eq($date)
                ->andWhere('account')->eq($account)
                ->exec();
        }

        return !dao::isError();
    }

    /**
     * Update status of unknow status attend.
     * 
     * @access public
     * @return bool
     */
    public function processStatus()
    {
        $attends = $this->dao->select('*')->from(TABLE_ATTEND)
            ->where('status')->eq('')
            ->andWhere('date')->lt(helper::today())
            ->orWhere('date')->eq(date("Y-m-d", strtotime("-1 day")))
            ->fetchAll('id');

        foreach($attends as $attend)
        {
            $status = $this->computeStatus($attend);
            $this->dao->update(TABLE_ATTEND)->set('status')->eq($status)->where('id')->eq($attend->id)->exec();
        }
        return true;
    }

    /**
     * Compute attend's status. 
     * 
     * @param  object $attend 
     * @access public
     * @return string
     */
    public function computeStatus($attend)
    {
        /* 'leave': ask for leave. 'trip': biz trip. */
        if($this->loadModel('leave')->isLeave($attend->date, $attend->account)) return 'leave';
        if($this->loadModel('trip')->isTrip($attend->date, $attend->account)) return 'trip';

        $status = 'normal';
        if(($attend->signIn == "00:00:00" and $attend->signOut == "00:00:00") or (!$attend->signIn and !$attend->signOut)) 
        {
            /* 'absent', absenteeism */
            $status = 'absent';
        }
        else
        {
            /* normal, late, early, both */
            if(strtotime("{$attend->date} {$attend->signIn}") > strtotime("{$attend->date} {$this->config->attend->signInLimit}")) $status = 'late';
            if($this->config->attend->mustSignOut == 'yes')
            {
                if(strtotime("{$attend->date} {$attend->signOut}") <  strtotime("{$attend->date} {$this->config->attend->signOutLimit}"))
                {
                    $status = $status == 'late' ? 'both' : 'early';
                }
            }
        }

        /* 'rest': rest day. */
        $dayIndex = date('w', strtotime($attend->date));
        if($this->config->attend->workingDays == '5' and ($dayIndex == 0 or $dayIndex == 6)) $status = $status == 'absent' ? 'rest' : $status;
        if($this->config->attend->workingDays == '6' and $dayIndex == 0) $status = $status == 'absent' ? 'rest' : $status;
        if($this->config->attend->workingDays == '12' and $dayIndex == 5 or $dayIndex == 6) $status = $status == 'absent' ? 'rest' : $status;
        if($this->config->attend->workingDays == '13' and $dayIndex == 6) $status = $status == 'absent' ? 'rest' : $status;
        if($this->loadModel('holiday')->isHoliday($attend->date)) $status = $status == 'absent' ? 'rest' : $status;

        return $status;
    }

    /**
     * Process attend, add dayName, comput today's status.
     * 
     * @param  object $attend 
     * @access public
     * @return object
     */
    public function processAttend($attend)
    {
        /* Compute status and remove signOut if date is today. */
        if($attend->date == helper::today()) 
        {
            if(time() < strtotime("{$attend->date} {$this->config->attend->signOutLimit}")) $attend->signOut = '00:00:00';
            $status = $this->computeStatus($attend);
            $attend->status = $status;
            if($status == 'early') $attend->status = 'normal';
            if($status == 'both')  $attend->status = 'late';
        }

        if($attend->status == '') $attend->status = $this->computeStatus($attend);

        /* Remove time. */
        if($attend->signIn == '00:00:00')    $attend->signIn = '';
        if($attend->signOut == '00:00:00')   $attend->signOut = '';
        if($attend->manualIn == '00:00:00')  $attend->manualIn = '';
        if($attend->manualOut == '00:00:00') $attend->manualOut = '';

        $dayIndex = date('w', strtotime($attend->date));
        $attend->dayName = $this->lang->datepicker->dayNames[$dayIndex];
        return $attend;
    }

    /**
     * Process attend list. 
     * 
     * @param  array $attends 
     * @access public
     * @return array
     */
    public function processAttendList($attends)
    {
        foreach($attends as $attend) $attend = $this->processAttend($attend);
        return $attends;
    }

    /**
     * Fix user's attendlist, add default data if no this date record. 
     * 
     * @param  array  $attends 
     * @param  string $startDate 
     * @param  string $endDate 
     * @param  string $account 
     * @access public
     * @return void
     */
    public function fixUserAttendList($attends, $startDate = '0000-00-00', $endDate = '0000-00-00', $account = '')
    {
        if(strtotime($endDate) > time()) $endDate = date("Y-m-d");

        /* Get account, start date and end date. */
        foreach($attends as $attend)
        {
            if(strtotime($attend->date) < strtotime($startDate) or $startDate == '0000-00-00') $startDate = $attend->date;
            if(strtotime($attend->date) > strtotime($endDate)) $endDate   = $attend->date;
            if($account == '') $account = $attend->account;
        }

        /* Add data if not set. */
        while(strtotime($startDate) <= strtotime($endDate))
        {
            if(!isset($attends[$startDate]))
            {
                $attend = new stdclass();
                $attend->account = $account;
                $attend->date    = $startDate;
                $attend->signIn  = '00:00:00';
                $attend->signOut = '00:00:00';
                $attend->ip      = '';
                $attend->device  = '';
                $attend->reason  = '';
                $attend->desc    = '';
                $attend->status  = $this->computeStatus($attend);
                $attend->manualIn  = '00:00:00';
                $attend->manualOut = '00:00:00';
                $attends[$startDate] = $attend;
            }
            $startDate = date("Y-m-d", strtotime("$startDate +1 day"));
        }

        return $attends;
    }

    /**
     * Set reviewer for attend.
     * 
     * @access public
     * @return bool
     */
    public function setManager()
    {
        $deptList = $this->post->dept;
        foreach($deptList as $id => $dept)
        {
            if(!empty($dept)) $dept = ",{$dept}," ;
            $this->dao->update(TABLE_CATEGORY)->set('moderators')->eq($dept)->where('id')->eq($id)->andWhere('type')->eq('dept')->exec();
        }
        return !dao::isError();
    }

    /**
     * Batch update attends for trip and leave.
     * 
     * @param  string    $dates 
     * @param  string    $account 
     * @param  string    $status 
     * @param  string    $reason 
     * @param  object    $time 
     * @access public
     * @return bool
     */
    public function batchUpdate($dates, $account, $status = '', $reason = '', $time = '')
    {
        if($status != '' and strpos('trip,leave,normal', $status) === false) return false;
        if($reason == '') $reason = $status;

        foreach($dates as $datetime)
        {
            $date = date('Y-m-d', $datetime);
            $oldAttend = $this->loadModel('attend')->getByDate($date, $account);

            $attend = new stdclass();
            $attend->status       = $status ? $status : 'absent';
            $attend->reason       = $reason;
            $attend->reviewStatus = '';
            $attend->desc         = '';

            if(is_object($time))
            {
                if($time->begin == $date and $time->end == $date) $hours = floor((strtotime("{$date} {$time->finish}") - strtotime("{$date} {$time->start}")) / 3600);
                if($time->begin == $date and $time->end != $date) $hours = floor((strtotime("{$date} {$this->config->attend->signOutLimit}") - strtotime("{$date} {$time->start}")) / 3600);
                if($time->begin != $date and $time->end == $date) $hours = floor((strtotime("{$date} {$time->finish}") - strtotime("{$date} {$this->config->attend->signInLimit}")) / 3600);

                $attend->desc = $hours;
            }

            if(isset($oldAttend->new))
            {
                $attend->date    = $date;
                $attend->account = $account;
                $this->dao->insert(TABLE_ATTEND)
                    ->data($attend)
                    ->autoCheck()
                    ->exec();
            }
            else
            {
                $attend->status = $this->computeStatus($oldAttend);

                $this->dao->update(TABLE_ATTEND)
                    ->data($attend)
                    ->autoCheck()
                    ->where('date')->eq($date)
                    ->andWhere('account')->eq($account)
                    ->exec();
            }
        }

        return !dao::isError();
    }
}

<?php
/**
 * The control file of attend of Ranzhi.
 *
 * @copyright   Copyright 2009-2015 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL 
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     attend
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class attend extends control
{
    /**
     * personal 
     * 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function personal($date = '')
    {
        if($date == '' or strlen($date) != 6) $date = date('Ym');
        $currentYear  = substr($date, 0, 4);
        $currentMonth = substr($date, 4, 2);
        $startDate    = "{$currentYear}-{$currentMonth}-01";
        $endDate      = date('Y-m-d', strtotime("$startDate +1 month"));
        $dayNum       = (int)date('d', strtotime("$endDate -1 day"));
        $weekNum      = (int)ceil($dayNum / 7);

        $attends   = $this->attend->getByAccount($this->app->user->account, $startDate, $endDate);
        $monthList = $this->attend->getAllMonth();
        $yearList  = array_reverse(array_keys($monthList));

        $this->view->title        = $this->lang->attend->personal;
        $this->view->attends      = $attends;
        $this->view->dayNum       = $dayNum;
        $this->view->weekNum      = $weekNum;
        $this->view->currentYear  = $currentYear;
        $this->view->currentMonth = $currentMonth;
        $this->view->yearList     = $yearList;
        $this->view->monthList    = $monthList;
        $this->display();
    }

    /**
     * department's attend. 
     * 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function department($date = '')
    {
        die($this->fetch('attend', 'browse', "date=$date", 'oa'));
    }

    /**
     * company's attend. 
     * 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function company($date = '')
    {
        die($this->fetch('attend', 'browse', "date=$date&company=true", 'oa'));
    }

    /**
     * Browse attend. 
     * 
     * @param  string $date 
     * @param  bool   $company 
     * @access public
     * @return void
     */
    public function browse($date = '', $company = false)
    {
        if($date == '' or strlen($date) != 6) $date = date('Ym');
        $currentYear  = substr($date, 0, 4);
        $currentMonth = substr($date, 4, 2);
        $startDate    = "{$currentYear}-{$currentMonth}-01";
        $endDate      = date('Y-m-d', strtotime("$startDate +1 month"));

        $dayNum    = (int)date('d', strtotime("$endDate -1 day"));
        $weekNum   = (int)ceil($dayNum / 7);
        $monthList = $this->attend->getAllMonth();
        $yearList  = array_reverse(array_keys($monthList));

        /* Get deptList. */
        if($company) 
        {
            $deptList = $this->loadModel('tree')->getPairs('', 'dept');
            $deptList[0] = '/';
        }
        else
        {
            $deptList = $this->loadModel('tree')->getDeptManagedByMe($this->app->user->account);
            foreach($deptList as $key => $value) $deptList[$key] = $value->name;
        }

        /* Get attend. */
        $attends = array();
        if(!empty($deptList)) 
        {
            $dept = array_keys($deptList);
            $attends = $this->attend->getByDept($dept, $startDate, $endDate);
        }

        $users    = $this->loadModel('user')->getList();
        $newUsers = array();
        foreach($users as $key => $user) $newUsers[$user->account] = $user;

        $this->view->title        = $this->lang->attend->department;
        $this->view->attends      = $attends;
        $this->view->dayNum       = $dayNum;
        $this->view->weekNum      = $weekNum;
        $this->view->currentYear  = $currentYear;
        $this->view->currentMonth = $currentMonth;
        $this->view->yearList     = $yearList;
        $this->view->monthList    = $monthList;
        $this->view->deptList     = $deptList;
        $this->view->users        = $newUsers;
        $this->view->company      = $company;
        $this->display();
    }

    /**
     * Export attend data.
     * 
     * @param  string $date 
     * @param  bool   $company 
     * @access public
     * @return void
     */
    public function export($date = '', $company = false)
    {
        if($date == '' or strlen($date) != 6) $date = date('Ym');
        $currentYear  = substr($date, 0, 4);
        $currentMonth = substr($date, 4, 2);
        $startDate    = "{$currentYear}-{$currentMonth}-01";
        $endDate      = date('Y-m-d', strtotime("$startDate +1 month"));
        $dayNum       = (int)date('d', strtotime("$endDate -1 day"));

        if($_POST)
        {
            /* Get deptList. */
            if($company) 
            {
                $deptList = $this->loadModel('tree')->getPairs('', 'dept');
                $deptList[0] = '/';
            }
            else
            {
                $deptList = $this->loadModel('tree')->getDeptManagedByMe($this->app->user->account);
                foreach($deptList as $key => $value) $deptList[$key] = $value->name;
            }

            /* Get attend. */
            $attends = array();
            if(!empty($deptList)) 
            {
                $dept = array_keys($deptList);
                $attends = $this->attend->getByDept($dept, $startDate, $endDate);
            }

            $users    = $this->loadModel('user')->getList();
            $tmpUsers = array();
            foreach($users as $key => $user) $tmpUsers[$user->account] = $user;
            $users = $tmpUsers;

            /* Get fields. */
            $this->app->loadLang('user');
            $fields['dept']     = $this->lang->user->dept;
            $fields['realname'] = $this->lang->user->realname;
            for($i = 1; $i <= $dayNum; $i++)
            {
                $currentDate  = date("Y-m-d", strtotime("$currentYear-$currentMonth-$i"));
                $fields[$currentDate] = $i;
            }

            /* Get dayname */
            $datas = array();
            $data  = new stdclass();
            $data->dept     = '';
            $data->realname = '';
            for($i = 1; $i <= $dayNum; $i++)
            {
                $currentDate  = date("Y-m-d", strtotime("$currentYear-$currentMonth-$i"));
                $dayNameIndex = date('w', strtotime($currentDate));
                $data->$currentDate = $this->lang->datepicker->abbrDayNames[$dayNameIndex];
            }
            $datas[] = $data;

            /* Get row data. */
            foreach($attends as $dept => $deptAttendList)
            {
                foreach($deptAttendList as $account => $attendList)
                {
                    $data = new stdclass();
                    $data->dept     = $deptList[$users[$account]->dept];
                    $data->realname = $users[$account]->realname;
                    for($i = 1; $i <= $dayNum; $i++)
                    {
                        $currentDate  = date("Y-m-d", strtotime("$currentYear-$currentMonth-$i"));
                        $data->$currentDate = isset($attendList[$currentDate]) ? zget($this->lang->attend->markStatusList, $attendList[$currentDate]->status) : '';
                    }
                    $datas[] = $data;
                }
            }

            /* Get legend. */
            if(!empty($datas))
            {
                $data = new stdclass();
                $data->dept = '';
                $datas[] = $data;

                $legend = array();
                foreach($this->lang->attend->markStatusList as $key => $value)
                {
                    $data = new stdclass();
                    $data->dept = $value;
                    $data->realname = $this->lang->attend->statusList[$key];
                    $datas[] = $data;
                }
            }

            $this->post->set('fields', $fields);
            $this->post->set('rows', $datas);
            $this->post->set('kind', 'attendance');
            $this->fetch('file', 'export2CSV', $_POST);
        }

        $this->view->fileName = $currentYear . $this->lang->year . $currentMonth . $this->lang->month . $this->lang->attend->report;
        $this->display();
    }

    /**
     * Sign in. 
     * 
     * @access public
     * @return void
     */
    public function signIn()
    {
        $result = $this->attend->signIn();
        if(!$result) $this->send(array('result' => 'fail', 'message' => $this->lang->attend->inFail));
        $this->send(array('result' => 'success', 'message' => $this->lang->attend->inSuccess));
    }

    /**
     * Sign out. 
     * 
     * @access public
     * @return void
     */
    public function signOut()
    {
        $result  = $this->attend->signOut();
        if(!$result) $this->send(array('result' => 'fail', 'message' => $this->lang->attend->outFail));
        $this->send(array('result' => 'success', 'message' => $this->lang->attend->outSuccess));
    }

    /**
     * settings 
     * 
     * @access public
     * @return void
     */
    public function settings()
    {
        if($_POST)
        {
            $settings = fixer::input('post')
                ->setDefault('mustSignOut', 'no')
                ->join('mustSignOut', '')
                ->get();

            $settings->signInLimit  = date("H:i", strtotime($settings->signInLimit));
            $settings->signOutLimit = date("H:i", strtotime($settings->signOutLimit));
            $this->loadModel('setting')->setItems('system.oa.attend', $settings);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => 'reload'));
        }

        $this->loadModel('user');
        $this->view->title        = $this->lang->attend->settings; 
        $this->view->signInLimit  = $this->config->attend->signInLimit;
        $this->view->signOutLimit = $this->config->attend->signOutLimit;
        $this->view->workingDays  = $this->config->attend->workingDays;
        $this->view->mustSignOut  = $this->config->attend->mustSignOut;
        $this->view->reviewedBy   = isset($this->config->attend->reviewedBy) ? $this->config->attend->reviewedBy : '';
        $this->view->users        = array('' => $this->lang->dept->moderators) + $this->user->getPairs('noempty,noclosed,nodeleted');
        $this->display();
    }

    /**
     * add manual sign in and sign out data. 
     * 
     * @param  string $date 
     * @access public
     * @return void
     */
    public function edit($date)
    {
        $account = $this->app->user->account;
        $attend  = $this->attend->getByDate($date, $account);

        if($_POST)
        {
            $this->attend->update($date, $account);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => 'reload'));
        }

        $this->view->title  = $this->lang->attend->edit;
        $this->view->attend = $attend;
        $this->view->date   = $date;
        $this->display();
    }

    /**
     * browse review list.
     * 
     * @param  int    $dept 
     * @param  string $reviewStatus 
     * @access public
     * @return void
     */
    public function browseReview($dept = '', $reviewStatus = 'wait')
    {
        $attends  = array();
        $users    = $this->loadModel('user')->getList($dept);
        $newUsers = array();
        foreach($users as $key => $user) $newUsers[$user->account] = $user;

        $this->view->title = $this->lang->attend->review;
        $this->view->users = $newUsers;

        if(!empty($this->config->attend->reviewedBy))
        { 
            if($this->config->attend->reviewedBy == $this->app->user->account)
            {
                $deptList = $this->loadModel('tree')->getPairs('', 'dept');
                $attends  = $this->attend->getWaitAttends();

                $this->view->attends  = $attends;
                $this->view->deptList = $deptList;
            }
        }
        else
        {
            $deptList = $this->loadModel('tree')->getDeptManagedByMe($this->app->user->account);
            if(!empty($deptList)) 
            {
                if($dept == '' or !isset($deptList[$dept])) $dept = array_keys($deptList);
                $attends = $this->attend->getByDept($dept, $startDate = '', $endDate = '', $reviewStatus);
            }

            $this->view->attends      = $attends;
            $this->view->deptList     = $deptList;
            $this->view->reviewStatus = $reviewStatus;
        }

        $this->display();
    }

    /**
     * Review manual sign data. 
     * 
     * @param  int    $attendID 
     * @param  string $reviewStatus 
     * @access public
     * @return void
     */
    public function review($attendID, $reviewStatus)
    {
        $result = $this->attend->review($attendID, $reviewStatus);
        if(!$result) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->createLink('attend', 'browseReview')));
    }

    /**
     * ajax get review list for todo. 
     * 
     * @param  string $account 
     * @param  string $id 
     * @access public
     * @return void
     */
    public function ajaxGetTodoList($account = '', $id = '')
    {
        $attendList = array();
        $deptList   = $this->loadModel('tree')->getDeptManagedByMe($this->app->user->account);
        if(!empty($deptList)) 
        {
            $dept = join(',', array_keys($deptList));
            $attendList = $this->attend->getByDept($dept, $startDate = '', $endDate = '', 'wait');
        }
        $users = $this->loadModel('user')->getPairs();
        $attends = array();
        foreach($attendList as $deptKey => $attendDept)
        {
            foreach($attendDept as $accountKey => $attendUser)
            {
                foreach($attendUser as $attend)
                {
                    $attends[$attend->id] = $deptList[$deptKey]->name . '/' . $users[$accountKey] . '(' . $attend->date . ')';
                }
            }
        }

        if($id) die(html::select("idvalues[$id]", $attends, '', 'class="form-control"'));
        die(html::select('idvalue', $attends, '', 'class=form-control'));
    }

    /**
     * Set reviewer for attend.
     * 
     * @access public
     * @return void
     */
    public function setManager()
    {
        $deptList = $this->loadModel('tree')->getListByType('dept');

        if($_POST)
        {
            $this->attend->setManager();
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess));
        }

        $this->view->deptList = $deptList;
        $this->view->users    = $this->loadModel('user')->getPairs('noclosed,nodeleted');
        $this->display();
    }
}

<?php
/**
 * The model file of task module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     task
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class taskModel extends model
{
    /**
     * Get task by ID.
     * 
     * @param  int    $taskID 
     * @access public
     * @return object.
     */
    public function getByID($taskID)
    {
        $task     = $this->dao->select("*")->from(TABLE_TASK)->where('id')->eq($taskID)->limit(1)->fetch();
        $children = $this->dao->select("*")->from(TABLE_TASK)->where('parent')->eq($taskID)->andWhere('deleted')->eq(0)->fetchAll('id');

        foreach($task as $key => $value) if(strpos($key, 'Date') !== false and !(int)substr($value, 0, 4)) $task->$key = '';

        if($task) 
        {
            $task->files    = $this->loadModel('file')->getByObject('task', $taskID);
            $task->children = $children;
        }
        
        $teams = $this->dao->select('*')->from(TABLE_TEAM)->where('type')->eq('task')->andWhere('id')->in(array_keys($children) + array($taskID))->orderBy('order_desc')->fetchGroup('id', 'account');
        foreach($teams as $key => $team) $teams[$key] = array_reverse($team);
        $task->team = isset($teams[$taskID]) ? $teams[$taskID] : array();
        foreach($children as $child) $child->team = isset($teams[$child->id]) ? $teams[$child->id] : array();

        return $task;
    }

    /**
     * Get task list.
     * 
     * @param  int       $projectID 
     * @param  string    $mode
     * @param  string    $orderBy 
     * @param  object    $pager 
     * @param  string    $groupBy
     * @access public
     * @return array
     */
    public function getList($projectID = 0, $mode = 'all', $orderBy = 'id_desc', $pager = null, $groupBy = 'id')
    {
        if($this->session->taskQuery == false) $this->session->set('taskQuery', ' 1 = 1');
        $taskQuery  = $this->loadModel('search', 'sys')->replaceDynamic($this->session->taskQuery);
        $project    = $this->loadModel('project', 'oa')->getByID($projectID);
        $canViewAll = $this->viewAllTask($projectID);

        if(strpos($orderBy, 'id') === false) $orderBy .= ', id_desc';

        $this->dao->select("*")->from(TABLE_TASK)
            ->where('deleted')->eq(0)
            ->beginIF($projectID)->andWhere('project')->eq($projectID)->fi()
            ->beginIF($mode == 'createdBy')->andWhere('createdBy')->eq($this->app->user->account)->fi()
            ->beginIF($mode == 'assignedTo')->andWhere('assignedTo')->eq($this->app->user->account)->fi()
            ->beginIF($mode == 'finishedBy')->andWhere('finishedBy')->eq($this->app->user->account)->fi()
            ->beginIF($mode == 'untilToday')->andWhere('deadline')->eq(helper::today())->fi()
            ->beginIF($mode == 'expired')->andWhere('deadline')->ne('0000-00-00')->andWhere('deadline')->lt(helper::today())->fi()
            ->beginIF($mode == 'bysearch')->andWhere($taskQuery)->fi()
            ->beginIF($groupBy == 'closedBy')->andWhere('status')->eq('closed')->fi()
            ->beginIF($groupBy == 'finishedBy')->andWhere('finishedBy')->ne('')->fi()
            ->beginIF(!$canViewAll)
            ->andWhere()->markLeft(1)
            ->where('assignedTo')->eq($this->app->user->account)
            ->orWhere('finishedBy')->eq($this->app->user->account)
            ->orWhere('createdBy')->eq($this->app->user->account)
            ->markRight(1)
            ->fi()
            ->orderBy($orderBy)
            ->page($pager);
        
        if($groupBy == 'id') $taskList = $this->dao->fetchAll('id');
        if($groupBy != 'id') $taskList = $this->dao->fetchGroup($groupBy, 'id');

        /* Save query condition for export and pre/next button. */
        $this->session->set('taskQueryCondition', $this->dao->get());

        if($groupBy == 'id') 
        {
            /* Process multiple user task. */
            $teams = $this->dao->select('*')->from(TABLE_TEAM)->where('type')->eq('task')->andWhere('id')->in(array_keys($taskList))->orderBy('order_desc')->fetchGroup('id', 'account');
            foreach($teams as $key => $team) $teams[$key] = array_reverse($team);
            foreach($taskList as $key => $task) $task->team = isset($teams[$key]) ? $teams[$key] : array();

            /* Process childen task. */
            foreach($taskList as $key => $task)
            {
                if(!isset($task->children)) $task->children = array();
                if($task->parent != 0 and isset($taskList[$task->parent])) 
                {
                    $taskList[$task->parent]->children[$key] = $task;
                    unset($taskList[$key]);
                }
            }
        }
        if($groupBy != 'id') 
        {
            /* Prosess multiple user task. */
            $idList = array();
            foreach($taskList as $tasks) $idList += array_keys($tasks);
            $teams = $this->dao->select('*')->from(TABLE_TEAM)->where('type')->eq('task')->andWhere('id')->in($idList)->orderBy('order_desc')->fetchGroup('id', 'account');
            foreach($teams as $key => $team) $teams[$key] = array_reverse($team);
            foreach($taskList as $tasks) foreach($tasks as $task) $task->team = isset($teams[$task->id]) ? $teams[$task->id] : array();

            /* Prosess children task. */
            foreach($taskList as $groupKey => $tasks)
            {
                foreach($tasks as $key => $task)
                {
                    if(!isset($task->children)) $task->children = array();
                    if($task->parent != 0 and isset($taskList[$groupKey][$task->parent])) 
                    {
                        $taskList[$groupKey][$task->parent]->children[$key] = $task;
                        unset($taskList[$groupKey][$key]);
                    }
                }
            }
        }

        return $taskList;
    }
    
    /**
     * Get tasks of a project.
     * 
     * @param  int    $projectID 
     * @param  string $type       all|wait|doing|done|cancel
     * @param  object $pager 
     * @access public
     * @return array
     */
    public function getProjectTasks($projectID, $type = 'all', $orderBy = 'status_asc, id_desc', $pager = null)
    {
        if(is_string($type)) $type = strtolower($type);
        $project    = $this->loadModel('project', 'oa')->getByID($projectID);
        $canViewAll = $this->viewAllTask($projectID);

        $tasks = $this->dao->select("*")
            ->from(TABLE_TASK)
            ->where('project')->eq((int)$projectID)
            ->andWhere('deleted')->eq(0)
            ->beginIF($type == 'undone')->andWhere("(status = 'wait' or status ='doing')")->fi()
            ->beginIF($type == 'assignedtome')->andWhere('assignedTo')->eq($this->app->user->account)->fi()
            ->beginIF($type == 'finishedbyme')->andWhere('finishedby')->eq($this->app->user->account)->fi()
            ->beginIF($type == 'delayed')->andWhere('deadline')->between('1970-1-1', helper::now())->andWhere('status')->in('wait,doing')->fi()
            ->beginIF(is_array($type) or strpos(',all,undone,assignedtome,delayed,finishedbyme,', ",$type,") === false)->andWhere('status')->in($type)->fi()
            ->beginIF(!$canViewAll)
            ->andWhere()->markLeft(1)
            ->where('assignedTo')->eq($this->app->user->account)
            ->orWhere('finishedBy')->eq($this->app->user->account)
            ->orWhere('createdBy')->eq($this->app->user->account)
            ->markRight(1)
            ->fi()
            ->orderBy($orderBy)
            ->page($pager)
            ->fetchAll('id');

        if($tasks)
        {
            $teams = $this->dao->select('*')->from(TABLE_TEAM)->where('type')->eq('task')->andWhere('id')->in(array_keys($tasks))->orderBy('order_desc')->fetchGroup('id', 'account');
            foreach($teams as $key => $team) $teams[$key] = array_reverse($team);
            foreach($tasks as $task) $task->team = isset($teams[$task->id]) ? $teams[$task->id] : array();
            return $tasks;
        }
        return array();
    }

    /**
     * Fix task groups.
     * 
     * @param  array    $tasks 
     * @param  string   $groupBy 
     * @access public
     * @return void
     */
    public function fixTaskGroups($project, $tasks, $groupBy)
    {
        $taskGroups = array();
        if($groupBy == 'status')
        {
            foreach($this->lang->task->statusList as $status => $statusName) if(!empty($status) and !isset($tasks[$status])) $tasks[$status] = array();
            foreach($this->lang->task->statusList as $status => $statusName) if(!empty($status)) $taskGroups[$status] = $tasks[$status];
        }

        if($groupBy != 'status' and !empty($project->members))
        {
            /* Add member to $tasks which no tasks. */
            foreach($project->members as $key => $member) if(!isset($tasks[$key])) $tasks[$key] = array();
            /* Add empty key group to $taskGroups. */
            foreach($tasks as $groupKey => $task) if($groupKey == '') $taskGroups[''] = $tasks[''];
            /* Add member's task to $taskGroups. */
            foreach($project->members as $key => $member) $taskGroups[$key] = $tasks[$key];
            /* Add other member's task to $taskGroups. */
            foreach($tasks as $groupKey => $task) if(!in_array($groupKey, $project->members)) $taskGroups[$groupKey] = $tasks[$groupKey];
        }

        if(!empty($taskGroups)) return $taskGroups;
        return $tasks;
    }

    /**
     * Create a task.
     * 
     * @param  object    $task 
     * @access public
     * @return void
     */
    public function create($task = null)
    {
        $now  = helper::now();
        if(empty($task))
        {
            $task = fixer::input('post')
                ->setDefault('estimate, left', 0)
                ->setDefault('estStarted', '0000-00-00')
                ->setDefault('deadline', '0000-00-00')
                ->setDefault('status', 'wait')
                ->setIF($this->post->estimate != false, 'left', $this->post->estimate)
                ->setIF($this->post->assignedTo, 'assignedDate', $now)
                ->setForce('assignedTo', $this->post->assignedTo)
                ->setDefault('createdBy', $this->app->user->account)
                ->setDefault('createdDate', $now)
                ->specialChars('name')
                ->stripTags('desc', $this->config->allowedTags->admin)
                ->get();
        }

        $this->dao->insert(TABLE_TASK)->data($task, $skip = 'uid,files,labels,team')
            ->autoCheck()
            ->batchCheck($this->config->task->require->create, 'notempty')
            ->checkIF($task->estimate != '', 'estimate', 'float')
            ->checkIF($task->deadline != '0000-00-00', 'deadline', 'ge', $task->estStarted)
            ->exec();

        if(dao::isError()) return false;

        $taskID = $this->dao->lastInsertID();
        $this->loadModel('file')->saveUpload('task', $taskID);
        return $taskID;
    }

    /**
     * Batch create.
     * 
     * @param  int    $projectID 
     * @access public
     * @return array
     */
    public function batchCreate($projectID)
    {
        $now        = helper::now();
        $assignedTo = '';
        $tasks      = array();

        /* Get data. */
        foreach($this->post->name as $key => $name)
        {
            if(empty($name)) break;

            $assignedTo = $this->post->assignedTo[$key] == 'ditto' ? $assignedTo : $this->post->assignedTo[$key];

            $task = new stdclass();
            $task->project     = $projectID;
            $task->name        = htmlspecialchars($name);
            $task->assignedTo  = $assignedTo;
            $task->estimate    = (float)$this->post->estimate[$key];
            $task->left        = $task->estimate;
            $task->deadline    = $this->post->deadline[$key] ? $this->post->deadline[$key] : '0000-00-00';
            $task->desc        = strip_tags(nl2br($this->post->desc[$key]), $this->config->allowedTags->admin);
            $task->pri         = $this->post->pri[$key];
            $task->status      = 'wait';
            $task->createdBy   = $this->app->user->account;
            $task->createdDate = $now;
            $task->parent      = empty($this->post->parent[$key]) ? 0 : $this->post->parent[$key];

            /* Process multiple user task data. */
            if(isset($_POST['multiple'][$key]) and !empty($_POST['multiple'][$key]))
            {
                $team = array();
                $estimate = 0;
                $left     = 0;
                foreach($this->post->team[$key] as $row => $account)
                {
                    if(empty($account) or isset($team[$account])) continue;
                    $member = new stdclass();
                    $member->type     = 'task';
                    $member->id       = '';
                    $member->account  = $account;
                    $member->role     = 'member';
                    $member->join     = helper::today();
                    $member->estimate = empty($this->post->teamEstimate[$key][$row]) ? 0 : $this->post->teamEstimate[$key][$row];
                    $member->left     = $member->estimate;
                    $member->order    = $row;
                    $team[$account]   = $member;
                    $estimate += (float)$member->estimate;
                    $left     += (float)$member->left;
                }
                if(!empty($team))
                {
                    $firstMember = reset($team);
                    $task->assignedTo = $firstMember->account;
                    $task->estimate   = $estimate;
                    $task->left       = $left;
                }
                $task->team = $team;
            }

            if($task->assignedTo) $task->assignedDate = $now;

            $tasks[] = $task;
        }

        $taskIDList = array();
        foreach($tasks as $task)
        {
            $this->dao->insert(TABLE_TASK)->data($task, 'team')->autoCheck()->exec();
            if(!dao::isError()) $taskIDList[] = $this->dao->lastInsertID();

            /* Save team. */
            if(!empty($task->team))
            {
                $lastInsertID = $this->dao->lastInsertID();
                foreach($task->team as $member)
                {
                    $member->id = $lastInsertID;
                    $this->dao->insert(TABLE_TEAM)->data($member)->autoCheck()->exec();
                }
            }
        }

        return $taskIDList;
    }

    /**
     * Update a task.
     * 
     * @param  int       $taskID 
     * @param  object    $task
     * @access public
     * @return void
     */
    public function update($taskID, $task = null)
    {
        $oldTask = $this->getById($taskID);
        $now     = helper::now();
        if(!$task)
        {
            $task = fixer::input('post')
                ->setDefault('estimate, left, consumed', 0)
                ->setDefault('deadline,estStarted,realStarted', '0000-00-00')

                ->setIF($this->post->status == 'done', 'left', 0)
                ->setIF($this->post->status == 'done', 'canceledBy', '')
                ->setIF($this->post->status == 'done', 'canceledDate', '')
                ->setIF($this->post->status == 'done'   and !$this->post->finishedBy,   'finishedBy',   $this->app->user->account)
                ->setIF($this->post->status == 'done'   and !$this->post->finishedDate, 'finishedDate', $now)

                ->setIF($this->post->status == 'cancel' and !$this->post->canceledBy,   'canceledBy',   $this->app->user->account)
                ->setIF($this->post->status == 'cancel' and !$this->post->canceledDate, 'canceledDate', $now)
                ->setIF($this->post->status == 'cancel', 'assignedTo',   $oldTask->createdBy)
                ->setIF($this->post->status == 'cancel', 'assignedDate', $now)

                ->setIF($this->post->status == 'closed', 'finishedBy', '')
                ->setIF($this->post->status == 'closed', 'finishedDate', '')
                ->setIF($this->post->status == 'closed' and !$this->post->closedBy,   'closedBy',   $this->app->user->account)
                ->setIF($this->post->status == 'closed' and !$this->post->closedDate, 'closedDate', $now)

                ->setIF($this->post->status == 'wait' and $this->post->left == $oldTask->left and $this->post->consumed == 0, 'left', $this->post->estimate)

                ->setIF($this->post->consumed > 0 and $this->post->left > 0 and $this->post->status == 'wait', 'status', 'doing')
                ->setIF($this->post->assignedTo != $oldTask->assignedTo, 'assignedDate', $now)

                ->add('editedBy',   $this->app->user->account)
                ->add('editedDate', $now)
                ->specialChars('name')
                ->stripTags('desc', $this->config->allowedTags->admin)
                ->remove('referer,uid,files,labels,multiple,team,teamEstimate,teamConsumed,teamLeft')
                ->join('mailto', ',')
                ->get();

            /* Process team. */
            if($this->post->multiple)
            {
                $team = array();
                $estimate = 0;
                $left     = 0;
                foreach($this->post->team as $row => $account)
                {
                    if(empty($account) or isset($team[$account])) continue;
                    $member = new stdclass();
                    $member->type     = 'task';
                    $member->id       = $taskID;
                    $member->account  = $account;
                    $member->role     = 'member';
                    $member->join     = helper::today();
                    $member->estimate = $this->post->teamEstimate[$row];
                    $member->consumed = $this->post->teamConsumed[$row];
                    $member->left     = $this->post->teamLeft[$row];
                    $member->order    = $row;
                    $team[$account]   = $member;
                    $estimate += (float)$member->estimate;
                    $left     += (float)$member->left;
                }
                if(!empty($team))
                {
                    $task->estimate = $estimate;
                    $task->left     = $left;
                    if(!isset($team[$task->assignedTo]))
                    {
                        $firstMember = reset($team);
                        $task->assignedTo = $firstMember->account;
                    }
                }
                $task->team = $team;
            }
        }

        $this->dao->update(TABLE_TASK)->data($task, 'team')
            ->autoCheck()
            ->batchCheckIF($task->status != 'cancel', $this->config->task->require->edit, 'notempty')

            ->checkIF($task->estimate != false, 'estimate', 'float')
            ->checkIF($task->left     != false, 'left',     'float')
            ->checkIF($task->consumed != false, 'consumed', 'float')
            ->checkIF($task->status   != 'wait' and $task->left == 0 and $task->status != 'cancel' and $task->status != 'closed', 'status', 'equal', 'done')

            ->batchCheckIF($task->status == 'wait' or $task->status == 'doing', 'finishedBy, finishedDate,canceledBy, canceledDate, closedBy, closedDate, closedReason', 'empty')

            ->checkIF($task->status == 'done', 'consumed', 'notempty')
            ->checkIF($task->status == 'done' and $task->closedReason, 'closedReason', 'equal', 'done')
            ->batchCheckIF($task->status == 'done', 'canceledBy, canceledDate', 'empty')

            ->checkIF($task->status == 'closed', 'closedReason', 'notempty')
            ->batchCheckIF($task->closedReason == 'cancel', 'finishedBy, finishedDate', 'empty')
            ->where('id')->eq((int)$taskID)
            ->exec();

        /* Save team. */
        $this->dao->delete()->from(TABLE_TEAM)->where('type')->eq('task')->andWhere('id')->eq($taskID)->exec();
        if(!empty($task->team))
        {
            foreach($task->team as $member) $this->dao->insert(TABLE_TEAM)->data($member)->autoCheck()->exec();
        }

        $this->updateParent($oldTask);

        if(dao::isError()) return false;
        return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Update parent task info. 
     * 
     * @param  object $task 
     * @access public
     * @return void
     */
    public function updateParent($task)
    {
        if($task->parent == 0) return true;
        $parent   = $this->getById($task->parent);
        $wait     = true;
        $done     = true;
        $estimate = 0;
        $consumed = 0;
        $left     = 0;

        foreach($parent->children as $child)
        {
            if($child->status != 'wait') $wait = false;
            if($child->status != 'done') $done = false;
            $estimate += $child->estimate;
            $consumed += $child->consumed;
            $left     += $child->left;
        }
        $newParent = new stdclass();
        $newParent->status   = $wait ? 'wait' : ($done ? 'done' : 'doing');
        $newParent->estimate = $estimate;
        $newParent->consumed = $consumed;
        $newParent->left     = $left;

        $this->dao->update(TABLE_TASK)->data($newParent)->where('id')->eq($parent->id)->exec();
        return true;
    }

    /**
     * Recordestimate 
     * 
     * @param  int    $taskID 
     * @access public
     * @return void
     */
    public function recordEstimate($taskID)
    {
        $oldTask = $this->getByID($taskID);
        if(empty($oldTask->team))
        {
            $task = new stdclass();
            $task->consumed = $this->post->consumed;
            $task->left     = $this->post->left;
            $this->dao->update(TABLE_TASK)->data($task)->autoCheck()->where('id')->eq($taskID)->exec();
        }

        if(!empty($oldTask->team) and $oldTask->assignedTo != '')
        {
            $account    = $oldTask->assignedTo;
            $task       = new stdclass();
            $task->team = $oldTask->team;
            $task->team[$account]->consumed = (float)$this->post->consumed;
            $task->team[$account]->left     = $this->post->left;

            $consumed = 0;
            $left     = 0;
            foreach($task->team as $member) $consumed += (float)$member->consumed;
            foreach($task->team as $member) $left     += (float)$member->left;
            $task->consumed = $consumed;
            $task->left     = $left;

            $this->dao->update(TABLE_TEAM)
                ->set('consumed')->eq($task->team[$account]->consumed)
                ->set('left')->eq($task->team[$account]->left)
                ->where('type')->eq('task')
                ->andWhere('id')->eq($taskID)
                ->andWhere('account')->eq($account)
                ->exec();

            $this->dao->update(TABLE_TASK)
                ->set('consumed')->eq($consumed)
                ->set('left')->eq($left)
                ->where('id')->eq($taskID)
                ->exec();
        }

        return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Finish task.
     * 
     * @param  int    $taskID 
     * @access public
     * @return bool
     */
    public function finish($taskID)
    {
        $oldTask = $this->getById($taskID);
        $now     = helper::now();

        $task = fixer::input('post')
            ->setDefault('left', 0)
            ->setDefault('assignedTo',   $oldTask->createdBy)
            ->setDefault('assignedDate', $now)
            ->setDefault('status', 'done')
            ->setDefault('finishedBy, editedBy', $this->app->user->account)
            ->setDefault('finishedDate, editedDate', $now) 
            ->remove('files,labels')
            ->get();

        /* Compute time for multiple user task. */
        if(!empty($oldTask->team) and $oldTask->assignedTo != '')
        {
            $team        = $oldTask->team;
            $consumed    = empty($_POST['consumed']) ? 0 : $this->post->consumed;
            $allConsumed = 0;
            $account     = $oldTask->assignedTo;
            $team[$account]->consumed = $consumed;
            foreach($team as $member) $allConsumed += (float)$member->consumed;

            $this->dao->update(TABLE_TEAM)
                ->set('consumed')->eq($team[$account]->consumed)
                ->where('type')->eq('task')
                ->andWhere('id')->eq($taskID)
                ->andWhere('account')->eq($account)
                ->exec();

            $task->consumed = $allConsumed;
        }

        $this->dao->update(TABLE_TASK)
            ->data($task, $skip = 'uid, comment')
            ->autoCheck()
            ->check('consumed', 'notempty')
            ->where('id')->eq((int)$taskID)
            ->exec();

        $this->updateParent($oldTask);

        if(!dao::isError()) return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Start a task.
     * 
     * @param  int      $taskID 
     * @access public
     * @return void
     */
    public function start($taskID)
    {
        $oldTask = $this->getById($taskID);
        $now  = helper::now();
        $task = fixer::input('post')
            ->setDefault('assignedTo', $this->app->user->account)
            ->setDefault('editedBy', $this->app->user->account)
            ->setDefault('editedDate', $now) 
            ->setIF($oldTask->assignedTo != $this->app->user->account, 'assignedDate', $now)
            ->get();

        if($this->post->left == 0)
        {
            $task->status       = 'done'; 
            $task->finishedBy   = $this->app->user->account;
            $task->finishedDate = helper::now();
        }
        else
        {
            $task->status = 'doing';
        }

        $this->dao->update(TABLE_TASK)->data($task, $skip = 'uid,comment,doStart')
            ->autoCheck()
            ->check('consumed,left', 'float')
            ->checkIF($this->post->consumed < $oldTask->consumed, 'consumed', 'ge', $this->lang->task->consumedBefore)
            ->where('id')->eq((int)$taskID)
            ->exec();
        
        $this->updateParent($oldTask);

        if(!dao::isError()) return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Assign a task to a user again.
     * 
     * @param  int    $taskID 
     * @access public
     * @return void
     */
    public function assign($taskID)
    {
        $oldTask = $this->getById($taskID);
        $task    = fixer::input('post')
            ->cleanFloat('left')
            ->setDefault('editedBy', $this->app->user->account)
            ->setDefault('editedDate', helper::now())
            ->remove('consumed')
            ->get();

        /* Compute time for multiple user task. */
        if(!empty($oldTask->team) and $oldTask->assignedTo != '')
        {
            $team        = $oldTask->team;
            $consumed    = empty($_POST['consumed']) ? 0 : $this->post->consumed;
            $allConsumed = 0;
            $account     = $oldTask->assignedTo;
            $team[$account]->consumed = $consumed;
            foreach($team as $member) $allConsumed += (float)$member->consumed;

            $this->dao->update(TABLE_TEAM)
                ->set('consumed')->eq($team[$account]->consumed)
                ->where('type')->eq('task')
                ->andWhere('id')->eq($taskID)
                ->andWhere('account')->eq($account)
                ->exec();

            $task->consumed = $allConsumed;
            if($oldTask->status == 'wait') $task->status = 'doing';
        }

        $this->dao->update(TABLE_TASK)
            ->data($task, $skip = 'uid, comment')
            ->autoCheck()
            ->check('left', 'float')
            ->where('id')->eq($taskID)
            ->exec();

        if(!dao::isError()) return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Activate task. 
     * 
     * @param  int    $taskID 
     * @access public
     * @return array
     */
    public function activate($taskID)
    {
        $oldTask = $this->getById($taskID);
        $task    = fixer::input('post')
            ->cleanFloat('left')
            ->setDefault('status', 'doing')
            ->setDefault('finishedBy, canceledBy, closedBy, closedReason', '')
            ->setDefault('finishedDate, canceledDate, closedDate', '0000-00-00 00:00:00')
            ->setDefault('editedBy', $this->app->user->account)
            ->setDefault('editedDate', helper::now())
            ->get();

        /* Compute multiple user task data. */
        if(!empty($oldTask->team))
        {
            $left = 0;
            foreach($oldTask->team as $member) $left += (float)$member->left;
            $task->left = $left;
        }

        $this->dao->update(TABLE_TASK)
            ->data($task, $skip = 'uid,comment')
            ->autoCheck()
            ->check('left', 'float')
            ->where('id')->eq($taskID)
            ->exec();

        if(!dao::isError()) return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Cancel task. 
     * 
     * @param  int    $taskID 
     * @access public
     * @return array
     */
    public function cancel($taskID)
    {
        $oldTask = $this->getById($taskID);
        $now     = helper::now();
        $task = fixer::input('post')
            ->setDefault('status', 'cancel')
            ->setDefault('assignedTo', $oldTask->createdBy)
            ->setDefault('assignedDate', $now)
            ->setDefault('finishedBy', '')
            ->setDefault('finishedDate', '0000-00-00')
            ->setDefault('canceledBy, editedBy', $this->app->user->account)
            ->setDefault('canceledDate, editedDate', $now)
            ->get();

        $this->dao->update(TABLE_TASK)->data($task, 'uid,comment')->autoCheck()->where('id')->eq((int)$taskID)->exec();

        if(!dao::isError()) return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Close task. 
     * 
     * @param  int    $taskID 
     * @access public
     * @return array
     */
    public function close($taskID)
    {
        $oldTask = $this->getById($taskID);
        $now     = helper::now();
        $task = fixer::input('post')
            ->setDefault('status', 'closed')
            ->setDefault('assignedTo', 'closed')
            ->setDefault('assignedDate', $now)
            ->setDefault('closedBy, editedBy', $this->app->user->account)
            ->setDefault('closedDate, editedDate', $now)
            ->setIF($oldTask->status == 'done',   'closedReason', 'done')
            ->setIF($oldTask->status == 'cancel', 'closedReason', 'cancel')
            ->get();

        $this->dao->update(TABLE_TASK)->data($task, 'uid,comment')->autoCheck()->where('id')->eq((int)$taskID)->exec();

        $this->updateParent($oldTask);

        if(!dao::isError()) return commonModel::createChanges($oldTask, $task);
    }

    /**
     * Check clickable for action.
     * 
     * @param  object    $task 
     * @param  string    $action 
     * @static
     * @access public
     * @return bool
     */
    public static function isClickable($task, $action)
    {
        $action = strtolower($action);  

        if($action == 'assignto') return $task->status != 'closed' and $task->status != 'cancel';
        if($action == 'start')    return $task->status != 'doing'  and $task->status != 'closed' and $task->status != 'cancel';
        if($action == 'finish')   return $task->status != 'done'   and $task->status != 'closed' and $task->status != 'cancel';
        if($action == 'close')    return $task->status == 'done'   or  $task->status == 'cancel';  
        if($action == 'activate') return $task->status == 'done'   or  $task->status == 'closed'  or $task->status == 'cancel' ;  
        if($action == 'cancel')   return $task->status != 'done  ' and $task->status != 'closed' and $task->status != 'cancel';

        return true;
    }

    /**
     * is could view all tasks. 
     * 
     * @param  int    $projectID 
     * @access public
     * @return bool
     */
    public function viewAllTask($projectID)
    {
        if($this->app->user->admin == 'super') return true;
        if(!empty($this->app->user->rights['task']['viewall'])) return true;
        if(!empty($this->app->user->rights['task']['editall'])) return true;
        if(!empty($this->app->user->rights['task']['deleteall'])) return true;

        static $projects;
        if(empty($projects)) 
        {
            $projects = $this->loadModel('project', 'oa')->getList();
            /* Process whitelist. */
            $groups = $this->loadModel('group')->getList(0);
            foreach($groups as $group) $groupUsers[$group->id] = $this->group->getUserPairs($group->id);
            foreach($projects as $project)
            {
                $accountList = array();
                $whitelist = trim($project->whitelist, ',');
                $whitelist = empty($whitelist) ? array() : explode(',', $whitelist);
                foreach($whitelist as $groupID) foreach($groupUsers[$groupID] as $account => $realname) $accountList[] = $account;
                $project->whitelist = $accountList;
            }
        }

        if(!isset($projects[$projectID])) return false;
        $account = $this->app->user->account;
        $project = $projects[$projectID];

        /* manager, senior or member. */
        if(isset($project->members[$account]))
        {
            if(strpos(',manager,senior,member,', $project->members[$account]->role) !== false) return true;
            return false;
        }

        if(in_array($account, $project->whitelist)) return true;
        return false;
    }

    /**
     * Check task's privilege for action. 
     * 
     * @param  object $task 
     * @param  string $action 
     * @access public
     * @return bool
     */
    public function checkPriv($task, $action)
    {
        if($this->app->user->admin == 'super') return true;
        if($action == 'view' and !empty($this->app->user->rights['task']['viewall'])) return true;
        if(strpos(',edit,recordestimate,assignto,start,finish,close,activate,cancel,', ",$action,") !== false and !empty($this->app->user->rights['task']['editall'])) return true;
        if($action == 'delete' and !empty($this->app->user->rights['task']['deleteall'])) return true;

        static $projects;
        if(empty($projects)) 
        {
            $projects = $this->loadModel('project', 'oa')->getList();
            /* Process whitelist. */
            $groups = $this->loadModel('group')->getList(0);
            foreach($groups as $group) $groupUsers[$group->id] = $this->group->getUserPairs($group->id);
            foreach($projects as $project)
            {
                $accountList = array();
                $whitelist = trim($project->whitelist, ',');
                $whitelist = empty($whitelist) ? array() : explode(',', $whitelist);
                foreach($whitelist as $groupID) foreach($groupUsers[$groupID] as $account => $realname) $accountList[] = $account;
                $project->whitelist = $accountList;
            }
        }
        $action  = strtolower($action);  
        $account = $this->app->user->account;
        $project = isset($projects[$task->project]) ? $projects[$task->project] : new stdclass();
        if(empty($project)) return false;

        /* manager and senior member. */
        if(isset($project->members[$account]) and (strpos(',manager,senior,', $project->members[$account]->role) !== false)) return true;

        /* default member. */
        if(isset($project->members[$account]) and $project->members[$account]->role == 'member')
        {
            if(strpos(',view,edit,recordestimate,assignto,start,finish,close,activate,cancel,', ",$action,") !== false) return true;
            if($action == 'delete')
            {
                if(strpos(",{$task->createdBy},{$task->assignedTo},{$task->finishedBy},", ",$account,") !== false) return true;
            }
        }

        /* limited member. */
        if(isset($project->members[$account]) and $project->members[$account]->role == 'limited')
        {
            if(strpos(',view,edit,recordestimate,assignto,start,finish,close,activate,cancel,', ",$action,") !== false)
            {
                if(strpos(",{$task->createdBy},{$task->assignedTo},{$task->finishedBy},", ",$account,") !== false) return true;
            }
        }

        /* whitelist. */
        if(in_array($account, $project->whitelist))
        {
            if($action == 'view') return true;
        }

        return false;
    }

    /**
     * Build operate menu.
     * 
     * @param  object $task 
     * @param  string $class 
     * @param  string $type 
     * @param  string $print 
     * @access public
     * @return string
     */
    public function buildOperateMenu($task, $class = '', $type = 'browse', $print = true)
    {
        $menu      = $type == 'view' ? "<div class='btn-group'>" : '';
        $canEdit   = $this->checkPriv($task, 'edit');
        $canDelete = $this->checkPriv($task, 'delete');
        $isParent  = !empty($task->children);
        $isMulti   = !empty($task->team);

        $disabled = (!$isParent and $canEdit and self::isClickable($task, 'recordEstimate')) ? '' : 'disabled';
        $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class'";
        $menu    .= $disabled ? html::a('###', $this->lang->task->recordEstimate, $misc) : commonModel::printLink('task', 'recordEstimate', "taskID=$task->id", $this->lang->task->recordEstimate, $misc, false);

        $disabled = ($canEdit and self::isClickable($task, 'assignto')) ? '' : 'disabled';
        $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class'";
        $menu    .= $disabled ? html::a('###', $isMulti ? $this->lang->task->transmit : $this->lang->assign, "$misc") : commonModel::printLink('task', 'assignto', "taskID=$task->id", $isMulti ? $this->lang->task->transmit : $this->lang->assign, $misc, false);

        if(!$isMulti)
        {
            $disabled = (!$isParent and $canEdit and self::isClickable($task, 'start')) ? '' : 'disabled';
            $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class'";
            $menu    .= $disabled ? html::a('###', $this->lang->start, $misc) : commonModel::printLink('task', 'start', "taskID=$task->id", $this->lang->start, $misc, false);
        }

        if($type == 'view')
        {
            $disabled = ($canEdit and self::isClickable($task, 'activate')) ? '' : 'disabled';
            $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class'";
            $menu    .= $disabled ? html::a('###', $this->lang->activate, $misc) : commonModel::printLink('task', 'activate', "taskID=$task->id", $this->lang->activate, $misc, false);
        }

        $disabled = (!$isParent and $canEdit and self::isClickable($task, 'finish')) ? '' : 'disabled';
        $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class'";
        $menu    .= $disabled ? html::a('###', $isMulti ? $this->lang->task->end : $this->lang->finish, $misc) : commonModel::printLink('task', 'finish', "taskID=$task->id", $isMulti ? $this->lang->task->end : $this->lang->finish, $misc, false);

        if($type == 'view')
        {
            $menu .= "</div><div class='btn-group'>";

            $disabled = ($canEdit and self::isClickable($task, 'cancel')) ? '' : 'disabled';
            $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class'";
            $menu    .= $disabled ? html::a('###', $this->lang->cancel, $misc) : commonModel::printLink('task', 'cancel', "taskID=$task->id", $this->lang->cancel, $misc, false);

            $disabled = $canDelete ? '' : 'disabled';
            $deleter  = $type == 'browse' ? 'reloadDeleter' : 'deleter';
            $menu    .= $disabled ? html::a('###', $this->lang->delete, "class='disabled $class' disabled='disabled'") : commonModel::printLink('task', 'delete', "taskID=$task->id", $this->lang->delete, "class='$deleter $class'", false);
        }

        $disabled = ($canEdit and self::isClickable($task, 'close')) ? '' : 'disabled';
        $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class'";
        $menu    .= $disabled ? html::a('###', $this->lang->close, $misc) : commonModel::printLink('task', 'close', "taskID=$task->id", $this->lang->close, $misc, false);

        if($type == 'view') $menu .= "</div><div class='btn-group'>";
        $disabled = $canEdit ? '' : 'disabled';
        $menu    .= $disabled ? html::a('###', $this->lang->edit, "class='disabled $class' disabled='disabled'") : commonModel::printLink('task', 'edit', "taskID=$task->id", $this->lang->edit, "class='$class'", false);

        if($task->parent == 0 and !$isMulti)
        {
            $disabled = ($canEdit and self::isClickable($task, 'batchCreate')) ? '' : 'disabled';
            $misc     = $disabled ? "class='$disabled $class'" : "data-toggle='modal' class='$class' data-width='80%'";
            $menu    .= $disabled ? html::a('###', $this->lang->task->children, $misc) : commonModel::printLink('task', 'batchCreate', "projectID=$task->project&taskID=$task->id", $this->lang->task->children, $misc, false);
        }
        if($type == 'view') $menu .= "</div>";
        if($print) echo $menu;
        return $menu;
    }

    /**
     * Save data from mind.
     * 
     * @param  int    $changes 
     * @access public
     * @return void
     */
    public function saveMind($changes)
    {
        $newTasks     = array();
        $updatedTasks = array();
        foreach($changes as $task)
        {
            $task->estimate     = false;
            $task->left         = false;
            $task->closedReason = false;
            if(empty($task->deadline)) $task->deadline = '0000-00-00';
            if(empty($task->consumed)) $task->consumed = '0';

            if($task->change == 'add')  $newTasks[] = $task;
            if($task->change == 'edit') $updatedTasks[] = $task;
        }

        foreach($newTasks as $task)
        {
            unset($task->id);
            unset($task->change);
            $task->createdBy   = $this->app->user->account;
            $task->createdDate = helper::now();
            $this->create($task);
        }
        
        foreach($updatedTasks as $task)
        {
            unset($task->change);
            $task->editedBy   = $this->app->user->account;
            $task->editedDate = helper::now();
            $this->update($task->id, $task);
        }
        return !dao::isError();
    }

    /**
     * Get next user. 
     * 
     * @param  string $users 
     * @param  string $currentUser 
     * @access public
     * @return void
     */
    public function getNextUser($users, $current)
    {
        /* Process user */
        if(!is_array($users)) $users = explode(',', trim($users, ','));
        if(!$current) return reset($users);
        $hit  = false;
        $next = '';
        foreach($users as $key => $account)
        {
            if($hit)
            {
                $next = $account;
                break;
            }

            if($account == $current) $hit = true;
        }
        if($next == '') return reset($users);
        return $next;
    }

    /**
     * Get task's team member pairs. 
     * 
     * @param  object $task 
     * @access public
     * @return array
     */
    public function getMemberPairs($task)
    {
        $users   = $this->loadModel('user')->getPairs();
        $members = array();
        foreach($task->team as $member)
        {
            $members[$member->account] = $users[$member->account];
        }
        return $members;
    }

    /**
     * getUserTaskPairs 
     * 
     * @param  string $account 
     * @param  string $status 
     * @access public
     * @return void
     */
    public function getUserTaskPairs($account, $status)
    {
        $tasks = array();
        $sql = $this->dao->select('t1.id, t1.name, t2.name as project')
            ->from(TABLE_TASK)->alias('t1')
            ->leftjoin(TABLE_PROJECT)->alias('t2')->on('t1.project = t2.id')
            ->where('t1.assignedTo')->eq($account)
            ->andWhere('t1.deleted')->eq(0);
        if($status != 'all') $sql->andwhere('t1.status')->in($status);
        $sql->orderBy('t1.id_desc');
        $stmt = $sql->query();
        while($task = $stmt->fetch())
        {    
            $tasks[$task->id] = $task->project . ' / ' . $task->name;
        }    
        return $tasks;
    }
}

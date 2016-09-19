<?php
/**
 * The model file of resume module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     resume
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class resumeModel extends model
{ 
    /**
     * Get by id.
     * 
     * @param  int    $resumeID 
     * @access public
     * @return object
     */
    public function getByID($resumeID)
    {
        return $this->dao->select('*')->from(TABLE_RESUME)->where('id')->eq($resumeID)->fetch();
    }

    /**
     * Get resumes saw by me. 
     * 
     * @param  string $type view|edit
     * @param  array  $resumeIdList
     * @access public
     * @return void
     */
    public function getResumesSawByMe($type = 'view', $resumeIdList = array())
    {
        $customerIdList = $this->loadModel('customer')->getCustomersSawByMe($type);
        $resumeList = $this->dao->select('*')->from(TABLE_RESUME)
            ->where('deleted')->eq(0)
            ->beginIF(!empty($resumeIdList))->andWhere('id')->in($resumeIdList)->fi()
            ->beginIF(!isset($this->app->user->rights['crm']['manageall']) and ($this->app->user->admin != 'super'))
            ->andWhere('customer')->in($customerIdList)
            ->fi()
            ->fetchAll('id');

        return array_keys($resumeList);

    }

    /**
     * Get list.
     * 
     * @param  int    $contactID 
     * @access public
     * @return array
     */
    public function getList($contactID)
    {
        return $this->dao->select('*')->FROM(TABLE_RESUME)->where('contact')->eq($contactID)->andWhere('deleted')->eq(0)->orderBy('id')->fetchAll('id');
    }

    /**
     * Create resume. 
     * 
     * @param  int    $contactID 
     * @param  object $resume 
     * @access public
     * @return int
     */
    public function create($contactID, $resume = null)
    {
        if(empty($resume))
        {
            $resume = fixer::input('post')
                ->add('contact', $contactID)
                ->remove('newCustomer,type,size,status,level,name')
                ->get();

            if($this->post->newCustomer)
            {
                $customer = new stdclass();
                $customer->name        = $this->post->name;
                $customer->type        = $this->post->type;
                $customer->size        = $this->post->size;
                $customer->status      = $this->post->status;
                $customer->level       = $this->post->level;
                $customer->assignedTo  = $this->app->user->account;
                $customer->createdBy   = $this->app->user->account;
                $customer->createdDate = helper::now();

                $return = $this->loadModel('customer')->create($customer);
                if($return['result'] == 'fail') return false;

                $resume->customer = $return['customerID'];
                $this->loadModel('action')->create('customer', $resume->customer, 'Created');
            }
        }

        $this->dao->insert(TABLE_RESUME)->data($resume)
            ->autoCheck()
            ->batchCheck($this->config->resume->require->create, 'notempty')
            ->exec();

        if(!dao::isError())
        {
            $resumeID = $this->dao->lastInsertID();
            $this->dao->update(TABLE_CONTACT)->set('resume')->eq($resumeID)->where('id')->eq($contactID)->exec();

            return $resumeID;
        }

        return false;
    }

    /**
     * Update resume.
     * 
     * @param  int    $resumeID 
     * @access public
     * @return string
     */
    public function update($resumeID)
    {
        $oldResume = $this->getByID($resumeID);
        $resume    = fixer::input('post')->get();

        $this->dao->update(TABLE_RESUME)->data($resume)->where('id')->eq($resumeID)->exec();

        return commonModel::createChanges($oldResume, $resume);
    }

    /**
     * leave 
     * 
     * @param  int    $resumeID 
     * @access public
     * @return void
     */
    public function leave($resumeID)
    {
        $oldResume = $this->getByID($resumeID);

        $resume = new stdclass();
        $resume->left = helper::today();
        $this->dao->update(TABLE_RESUME)->data($resume)->where('id')->eq($resumeID)->exec();

        /* Update contact info if exists another same resume. */
        $sameResume = $this->dao->select('id')->from(TABLE_RESUME)
            ->where('contact')->eq($oldResume->contact)
            ->andWhere('customer')->eq($oldResume->customer)
            ->andWhere('`left`')->eq('')
            ->orWhere('contact')->eq($oldResume->contact)
            ->andWhere('customer')->eq($oldResume->customer)
            ->andWhere('`left`')->gt(helper::today())
            ->fetch('id');
        if($sameResume) $this->dao->update(TABLE_CONTACT)->set('resume')->eq($sameResume)->exec();

        return commonModel::createChanges($oldResume, $resume);
    }
}

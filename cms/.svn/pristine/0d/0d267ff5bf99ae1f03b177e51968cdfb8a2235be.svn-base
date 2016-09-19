<?php
/**
 * The model file of customer module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     customer
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class customerModel extends model
{
    /**
     * Get customer by id.
     * 
     * @param  int    $id 
     * @access public
     * @return int|bool
     */
    public function getByID($id)
    {
        $customerIdList = $this->getCustomersSawByMe();
        if(empty($customerIdList)) return false;
        if(!in_array($id, $customerIdList)) return false;

        return $this->dao->select('*')->from(TABLE_CUSTOMER)->where('id')->eq($id)->limit(1)->fetch();
    }

    /**
     * Get my customer id list or allowed view customer.
     * 
     * @param  string $type           view|edit
     * @param  array  $customerIdList 
     * @access public
     * @return array
     */
    public function getCustomersSawByMe($type = 'view', $customerIdList = array())
    {
        $accountsSawByMe = $this->loadModel('sales', 'crm')->getAccountsSawByMe($this->app->user->account, $type);

        $customerList = $this->dao->select('*')->from(TABLE_CUSTOMER)
            ->where('deleted')->eq(0)
            ->beginIF(!empty($customerIdList))->andWhere('id')->in($customerIdList)->fi()
            ->beginIF(!isset($this->app->user->rights['crm']['manageall']) and ($this->app->user->admin != 'super'))
            ->andWhere('assignedTo')->in($accountsSawByMe)
            ->orWhere('public')->eq('1')
            ->fi()
            ->fetchAll('id');

        /* Get customers not assigned to these accounts but theirs orders assigned to. */
        $orderList = $this->dao->select('customer')->from(TABLE_ORDER)->where('assignedTo')->in($accountsSawByMe)->fetchAll('customer');
        foreach($orderList as $customer => $order)
        {
            if(!isset($customerList[$customer])) $customerList[$customer] = $customer;
        }

        return array_keys($customerList);
    }

    /** 
     * Get customer list.
     * 
     * @param  string  $mode 
     * @param  mix     $param 
     * @param  string  $relation  client|provider
     * @param  string  $orderBy 
     * @param  object  $pager 
     * @access public
     * @return array
     */
    public function getList($mode = 'all', $param = null, $relation = 'client', $orderBy = 'id_desc', $pager = null)
    {
        $customerIdList = $this->getCustomersSawByMe();
        if(empty($customerIdList)) return array();

        $this->app->loadClass('date', $static = true);
        $thisMonth = date::getThisMonth();
        $thisWeek  = date::getThisWeek();

        if($this->session->customerQuery == false) $this->session->set('customerQuery', ' 1 = 1');
        $customerQuery = $this->loadModel('search', 'sys')->replaceDynamic($this->session->customerQuery);

        if(strpos($orderBy, 'id') === false) $orderBy .= ', id_desc';

        return $this->dao->select('*')->from(TABLE_CUSTOMER)
            ->where('deleted')->eq(0)
            ->beginIF($relation == 'client')->andWhere('relation')->ne('provider')
            ->beginIF($relation == 'provider')->andWhere('relation')->ne('client')
            ->beginIF($mode == 'field')->andWhere('mode')->eq($param)->fi()
            ->beginIF($mode == 'past')->andWhere('nextDate')->lt(helper::today())->fi()
            ->beginIF($mode == 'today')->andWhere('nextDate')->eq(helper::today())->fi()
            ->beginIF($mode == 'tomorrow')->andWhere('nextDate')->eq(formattime(date::tomorrow(), DT_DATE1))->fi()
            ->beginIF($mode == 'thisweek')->andWhere('nextDate')->between($thisWeek['begin'], $thisWeek['end'])->fi()
            ->beginIF($mode == 'thismonth')->andWhere('nextDate')->between($thisMonth['begin'], $thisMonth['end'])->fi()
            ->beginIF($mode == 'public')->andWhere('public')->eq('1')->fi()
            ->beginIF($mode == 'assignedtome')->andWhere('assignedTo')->eq($this->app->user->account)->fi()
            ->beginIF($mode == 'query')->andWhere($param)->fi()
            ->beginIF($mode == 'bysearch')->andWhere($customerQuery)->fi()
            ->beginIF(strpos('all, bysearch, public, assignedtome, query', $mode) === false)->andWhere('nextDate')->ne('0000-00-00')->fi()
            ->andWhere('id')->in($customerIdList)
            ->orderBy($orderBy)
            ->page($pager)
            ->fetchAll('id');
    }

    /** 
     * Get customer pairs.
     * 
     * @param  string  $mode 
     * @param  mix     $param 
     * @param  string  $orderBy 
     * @param  bool    $emptyOption 
     * @access public
     * @return array
     */
    public function getPairs($relation = '', $emptyOption = true)
    {
        $customerIdList = $this->getCustomersSawByMe();

        if(empty($customerIdList))
        {
           $customers = array();
        }
        else
        {
            $customers = $this->dao->select('id, name')->from(TABLE_CUSTOMER)
                ->where('deleted')->eq(0)
                ->beginIF($relation == 'client')->andWhere('relation')->ne('provider')->fi()
                ->beginIF($relation == 'provider')->andWhere('relation')->ne('client')->fi()
                ->andWhere('id')->in($customerIdList)
                ->orderBy('id_desc')
                ->fetchPairs('id');
        }

        if($emptyOption)  $customers = array('' => '') + $customers;
        return $customers;
    }

    /**
     * Create a customer.
     * 
     * @param  object    $customer 
     * @access public
     * @return int|bool
     */
    public function create($customer = null, $relation = 'client')
    {
        $now = helper::now();
        if(empty($customer))
        {
            $customer = fixer::input('post')
                ->setIF($this->post->name == '', 'name', $this->post->contact)
                ->add('relation', $relation)
                ->setIF($relation == 'provider', 'public', 1)
                ->add('createdBy', $this->app->user->account)
                ->add('assignedTo', $this->app->user->account)
                ->add('createdDate', $now)
                ->get();

            /* check field before insert. */
            $this->dao->insert(TABLE_CUSTOMER)
                ->data($customer)
                ->check('contact', 'length', 30, 0);
        }

        if(!$this->post->continue)
        {
            $return = $this->checkUnique($customer);
            if($return['result'] == 'fail') return $return;
        }

        $this->loadModel('contact');
        if(!empty($customer->contact))
        {
            $contact = new stdclass();
            $contact->realname    = $customer->contact;
            $contact->customer    = '';
            $contact->phone       = $customer->phone;
            $contact->email       = $customer->email;
            $contact->qq          = $customer->qq;
            $contact->createdBy   = $this->app->user->account;
            $contact->createdDate = $now;

            $this->dao->insert(TABLE_CONTACT)->data($contact)
                ->autoCheck()
                ->checkIF($contact->email, 'email', 'email')
                ->checkIF($contact->phone, 'phone', 'length', 20, 7);

            if(dao::isError()) return array('result' => 'fail', 'message' => dao::getError());

            if(!$this->post->continue)
            {
                $return = $this->contact->checkContact($contact);
                if($return['result'] == 'fail') return $return;
            }
        }

        if(!isset($customer->contact)) $this->config->customer->require->create = 'name';
        $this->dao->insert(TABLE_CUSTOMER)
            ->data($customer, $skip = 'uid,contact,email,qq,phone,continue')
            ->autoCheck()
            ->batchCheck($this->config->customer->require->create, 'notempty')
            ->exec();

        if(dao::isError()) return array('result' => 'fail', 'message' => dao::getError());
        $customerID = $this->dao->lastInsertID();
        $this->loadModel('action')->create('customer', $customerID, 'Created');

        if(isset($contact))
        {
            $contact->customer = $customerID;
            $return = $this->contact->create($contact);
            if($return['result'] == 'fail') return $return;
        }

        $locate = $relation == 'provider' ? helper::createLink('provider', 'browse') : helper::createLink('customer', 'browse');
        return array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $locate, 'customerID' => $customerID);
    }

    /**
     * Update a customer.
     * 
     * @param  int    $customerID 
     * @access public
     * @return array
     */
    public function update($customerID)
    {
        $oldCustomer = $this->getByID($customerID);
        $customer    = fixer::input('post')
            ->add('editedBy', $this->app->user->account)
            ->add('editedDate', helper::now())
            ->setIF(!$this->post->public and $oldCustomer->relation == 'client', 'public', 0)
            ->stripTags('desc', $this->config->allowedTags->admin)
            ->get();

        /* Add http:// in head when that has not http:// or https://. */
        if(strpos($customer->site, '://') === false )  $customer->site  = 'http://' . $customer->site;
        if(strpos($customer->weibo, 'http://weibo.com/') === false ) $customer->weibo = 'http://weibo.com/' . $customer->weibo;
        if($customer->site == 'http://') $customer->site = '';
        if($customer->weibo == 'http://weibo.com/') $customer->weibo = '';

        $this->dao->update(TABLE_CUSTOMER)
            ->data($customer, $skip = 'uid')
            ->autoCheck()
            ->batchCheck($this->config->customer->require->edit, 'notempty')
            ->where('id')->eq($customerID)
            ->exec();

        if(dao::isError()) return array('result' => 'fail', 'message' => dao::getError());

        $changes = commonModel::createChanges($oldCustomer, $customer);
        if($changes)
        {
            $actionID = $this->loadModel('action')->create('customer', $customerID, 'Edited');
            $this->action->logHistory($actionID, $changes);
        }

        $locate = strpos($this->server->http_referer, 'provider') ? helper::createLink('provider', 'view', "customerID=$customerID") :helper::createLink('customer', 'view', "customerID=$customerID");
        return array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $locate);
    }

    /**
     * Update editeddate. 
     * 
     * @param  int    $customerID 
     * @access public
     * @return void
     */
    public function updateEditedDate($customerID)
    {
        $this->dao->update(TABLE_CUSTOMER)
            ->set('editedDate')->eq(helper::now())
            ->where('id')->eq($customerID)
            ->exec();
    }

    /**
     * Assign an customer to a member again.
     * 
     * @param  int    $customerID 
     * @access public
     * @return void
     */
    public function assign($customerID)
    {
        $customer = fixer::input('post')
            ->setDefault('assignedBy', $this->app->user->account)
            ->setDefault('assignedDate', helper::now())
            ->add('editedBy', $this->app->user->account)
            ->add('editedDate', helper::now())
            ->get();

        $this->dao->update(TABLE_CUSTOMER)
            ->data($customer, $skip = 'uid, comment')
            ->autoCheck()
            ->where('id')->eq($customerID)
            ->exec();

        return !dao::isError();
    }

    /**
     * Link contact.
     * 
     * @param  int    $customerID 
     * @access public
     * @return bool
     */
    public function linkContact($customerID)
    {
        $this->loadModel('action');
        $this->loadModel('contact');
        if(!$this->post->selectContact)
        {
            $contact = fixer::input('post')
                ->add('customer', $customerID)
                ->add('createdBy', $this->app->user->account)
                ->add('createdDate', helper::now())
                ->remove('contact')
                ->get();

            return $this->contact->create($contact);
        }

        if($this->post->contact)
        {
            $contactID = $this->post->contact;
            $contact   = $this->contact->getByID($contactID);
            $contacts  = $this->contact->getPairs();

            if($contact->customer != $customerID or ($contact->left != '' and strtotime($contact->left) <= strtotime(helper::today())))
            {
                $resume = new stdclass();
                $resume->customer = $customerID;
                $resume->contact  = $contactID;
                $resumeID = $this->loadModel('resume')->create($contactID, $resume);

                if($resumeID)
                {
                    $changes[] = array('field' => 'customer', 'old' => $contact->customer, 'new' => $customerID, 'diff' => '');
                    $actionID  = $this->action->create('contact', $contactID, 'Edited');
                    $this->action->logHistory($actionID, $changes);
                }

                $this->loadModel('action')->create('customer', $customerID, 'linkContact', '', $this->post->newcontact ? $this->post->realname : $contacts[$this->post->contact]);

                return array('result' => 'success', 'message' => $this->lang->saveSuccess);
            }
        }

        return array('result' => 'fail', 'message' => dao::getError());
    }

    /**
     * Combine sizeList for customer.
     * 
     * @access public
     * @return array
     */
    public function combineSizeList()
    {
        $sizeList = array();
        foreach($this->lang->customer->sizeNameList as $key => $sizeName)
        {
            $sizeList[$key] = $sizeName . '(' . $this->lang->customer->sizeNoteList[$key] . ')';
            if(empty($sizeName)) $sizeList[$key] = '';
        }
        return $sizeList;
    }

    /**
     * Combine levelList for customer.
     * 
     * @access public
     * @return array
     */
    public function combineLevelList()
    {
        $levelList = array();
        foreach($this->lang->customer->levelNameList as $key => $levelName)
        {
            $levelList[$key] = $levelName . '(' . $this->lang->customer->levelNoteList[$key] . ')';
            if(empty($levelName)) $levelList[$key] = '';
        }
        return $levelList;
    }


    /**
     * Check customer is unique.
     * 
     * @param  object  $customer
     * @access public
     * @return array
     */
    public function checkUnique($customer)
    {
        if($customer->name) $data = $this->dao->select('*')->from(TABLE_CUSTOMER)->where('name')->eq($customer->name)->fetch();
        if(!empty($data))
        {
            $error = sprintf($this->lang->error->unique, $this->lang->customer->name, html::a(helper::createLink('customer', 'view', "customerID={$data->id}"), $data->name, "target='_blank'"));
            return array('result' => 'fail', 'error' => $error);
        }
    }

    /**
     * Move customer to public if customer longtime no edited.
     * 
     * @access public
     * @return void
     */
    public function moveCustomerPool()
    {
        $reserveDays = isset($this->config->customer->reserveDays) ? $this->config->customer->reserveDays : 0;
        if($reserveDays == 0) return true;
        
        $reserveTime = date(DT_DATETIME1, strtotime("-{$reserveDays} day"));
        $customers = $this->dao->select('id')->from(TABLE_CUSTOMER)
            ->where('editedDate')->lt($reserveTime)
            ->andWhere('status')->in('potential,intension,failed')
            ->andWhere('public')->eq('0')
            ->andWhere('deleted')->eq('0')
            ->fetchAll('id');
        if(empty($customers)) return true;

        $this->dao->update(TABLE_CUSTOMER)
            ->set('public')->eq('1')
            ->set('editedDate')->eq(helper::now())
            ->where('id')->in(array_keys($customers))
            ->exec();

        $changes[] = array('field' => 'public', 'old' => '0', 'new' => '1', 'diff' => '');
        foreach($customers as $key => $customer)
        {
            $actionID  = $this->loadModel('action')->create('customer', $key, 'Edited');
            $this->action->logHistory($actionID, $changes);
        }
    }
}

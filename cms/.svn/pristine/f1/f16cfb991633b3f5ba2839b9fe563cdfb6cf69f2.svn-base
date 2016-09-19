<?php
/**
 * The control file of action module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     action
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class action extends control
{
    /**
     * browse history actions and records. 
     * 
     * @param  string    $objectType
     * @param  int       $objectID 
     * @param  string    $action
     * @access public
     * @return void
     */
    public function history($objectType, $objectID, $action = '', $from = 'view')
    {
        $this->view->actions    = $this->loadModel('action')->getList($objectType, $objectID, $action);
        $this->view->objectType = $objectType;
        $this->view->objectID   = $objectID;
        $this->view->users      = $this->loadModel('user')->getPairs();
        $this->view->from       = $from;
        $this->display();
    }

    /**
     * Edit comment of an action.
     * 
     * @param  int    $actionID 
     * @access public
     * @return void
     */
    public function editComment($actionID)
    {
        if(!strip_tags($this->post->lastComment)) $this->send(array('result' => 'success', 'locate' => $this->server->http_referer));
        $this->action->updateComment($actionID);
        $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->server->http_referer));
    }

    /**
     * Create one record of an object.
     * 
     * @param  string    $objectType  order|contact|customer
     * @param  int       $objectID 
     * @param  int       $customer 
     * @access public
     * @return void
     */
    public function createRecord($objectType, $objectID, $customer = 0)
    {
        if($_POST)
        {
            if($this->post->contract)
            {
                $objectType = 'contract';
                $objectID   = $this->post->contract;
            }

            if($this->post->order)
            {
                $objectType = 'order';
                $objectID   = $this->post->order;
            }

            if($this->post->customer) $customer = $this->post->customer;

            /* Can create contact when objectType is customer. */
            if($this->post->createContact and $objectType == 'customer')
            {
                $contact = new stdclass();
                $contact->realname = $this->post->realname;
                $contact->customer = $objectID;
                $contact->email    = '';
                $return = $this->loadModel('contact', 'crm')->create($contact);
                if($return['result'] == 'success')
                {
                    $this->post->set('contact', $return['contactID']);
                }
                else
                {
                    $this->send($return);
                }
            }

            $this->action->createRecord($objectType, $objectID, $customer, $this->post->contact);

            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => 'parent.reload'));
        }
        
        if($objectType == 'contact')
        {
            $this->view->customers = $this->loadModel('contact')->getCustomerPairs($objectID);
        }

        if($objectType == 'customer')
        {
            $this->view->orders    = array('') + $this->loadModel('order')->getPairs($objectID);
            $this->view->contracts = array('') + $this->loadModel('contract')->getPairs($objectID);
        }

        $this->view->title      = $this->lang->action->record->create;
        $this->view->modalWidth = 900;
        $this->view->objectType = $objectType;
        $this->view->objectID   = $objectID;
        $this->view->customer   = $customer;
        $this->view->contacts   = $this->loadModel('contact', 'crm')->getPairs($customer);
        $this->display();
    }

   /**
     * Edit one record of an object.
     * 
     * @param  int    $recordID
     * @access public
     * @return void
     */
    public function editRecord($recordID, $from = '')
    {
        $record = $this->loadModel('action')->getByID($recordID);
        if($record->action != 'record') exit;
        $object = $this->loadModel($record->objectType)->getByID($record->objectID);

        if($_POST)
        {
            $action = fixer::input('post')->get();
            $this->action->update($action, $recordID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => $this->post->referer));
        }

        $this->view->title    = $this->lang->action->record->edit;
        $this->view->from     = $from;
        $this->view->record   = $record;
        $this->view->contacts = $this->loadModel('contact')->getPairs($record->objectType == 'customer' ? $object->id : $object->customer);
        $this->display();
    }

    /**
     * Trash 
     * 
     * @param  string $type all|hidden 
     * @param  string $orderBy 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function trash($type = 'all', $orderBy = 'id_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        /* Save session. */
        $uri = $this->app->getURI(true);
        $this->session->set('projectList', $uri);
        $this->session->set('taskList',    $uri);
        $this->session->set('docList',     $uri);

        /* Get deleted objects. */
        $this->app->loadClass('pager', $static = true);
        $pager = pager::init($recTotal, $recPerPage, $pageID);

        $trashes = $this->action->getTrashes($type, $orderBy, $pager);

        /* Title and position. */
        $this->view->title   = $this->lang->action->trash;
        $this->view->trashes = $trashes;
        $this->view->type    = $type;
        $this->view->orderBy = $orderBy;
        $this->view->pager   = $pager;
        $this->view->users   = $this->loadModel('user')->getPairs('noletter');
        $this->display();
    }

    /**
     * Hide an deleted object. 
     * 
     * @param  int    $actionID 
     * @access public
     * @return void
     */
    public function hideOne($actionID)
    {
        $this->action->hideOne($actionID);
        $this->send(array('result' => 'success', 'locate' => inlink('trash')));
    }

    /**
     * Hide all deleted objects.
     * 
     * @param  string $confirm 
     * @access public
     * @return void
     */
    public function hideAll($confirm = 'no')
    {
        $this->action->hideAll();
        $this->send(array('result' => 'success', 'locate' => inlink('trash', "type=hidden")));
    }

    /**
     * Undelete an object.
     * 
     * @param  int    $actionID 
     * @access public
     * @return void
     */
    public function undelete($actionID)
    {
        $this->action->undelete($actionID);
        $this->send(array('result' => 'success', 'locate' => $this->server->http_referer));
    }
}

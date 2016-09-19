<?php
/**
 * The control file of message module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     message
 * @version     $Id$
 * @link        http://www.chanzhi.org
 */
class message extends control
{
    /**
     * The index page of message front.
     * 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function index($pageID = 1)
    {
        $this->app->loadClass('pager', $static = true);
        $pager = new pager($recTotal = 0, $recPerPage = 10, $pageID);

        $this->view->messages    = $this->message->getByObject($type = 'message', $objectType = 'message', $objectID = 0, $pager);
        $this->view->replies     = $this->message->getReplies($this->view->messages);
        $this->view->pager       = $pager;
        $this->view->title       = $this->lang->message->list;
        $this->view->startNumber = ($pageID - 1) * 10;
        $this->display();
    }

    /**
     * Show the comment of one object, and print the comment form.
     * 
     * @param string $objectType 
     * @param string $objectID 
     * @access public
     * @return void
     */
    public function comment($objectType, $objectID, $pageID = 1)
    {
        $this->app->loadClass('pager', $static = true);
        $pager = new pager($recTotal = 0 , $recPerPage = 10, $pageID);

        $this->view->objectType  = $objectType;
        $this->view->objectID    = $objectID;
        $this->view->comments    = $this->message->getByObject($type = 'comment', $objectType, $objectID, $pager);
        $this->view->replies     = $this->message->getReplies($this->view->comments);
        $this->view->pager       = $pager;
        $this->view->startNumber = ($pageID - 1) * 10;
        $this->lang->message     = $this->lang->comment;
        $this->display();
    }

    /**
     * View a message 
     * 
     * @param  int    $messageID 
     * @access public
     * @return void
     */
    public function view($messageID)
    {
        $message = $this->message->getByID($messageID);
        if($message->to != $this->app->user->account) die();
        $this->message->markReaded($message->id);
        if($message->link) $this->locate($message->link);
        $this->locate($this->createLink('user', 'message'));
    }

    /**
     * show notify in msgBox.
     * 
     * @access public
     * @return string
     */
    public function notify()
    {
        $messages = $this->dao->select('COUNT(*) as count')->from(TABLE_MESSAGE)->where('`to`')->eq($this->app->user->account)->andWhere('readed')->eq(0)->fetch('count');
        if($messages) echo  html::a(helper::createLink('user', 'message'), sprintf($this->lang->user->message->mine, $messages));
    }

    /**
     * Get the latest approvaled messages.
     * 
     * @param  string $type 
     * @param  string $status 
     * @param  int    $recTotal 
     * @param  int    $recPerPage 
     * @param  int    $pageID 
     * @access public
     * @return void
     */
    public function admin($type = 'message', $status = '0', $recTotal = 0, $recPerPage = 5, $pageID = 1)
    {
        $this->app->loadClass('pager', $static = true);
        $pager = new pager($recTotal, $recPerPage, $pageID);

        $this->view->title    = $this->lang->message->common;
        $this->view->messages = $this->message->getList($type, '', $status, $pager);
        $this->view->replies  = $this->message->getReplies($this->view->messages);
        $this->view->pager    = $pager;
        $this->view->type     = $type;
        $this->view->status   = $status;
        $this->display();
    }

    /**
     * Post a message.
     * 
     * @param  string  $type
     * @access public
     * @return void
     */
    public function post($type)
    {
        $this->lang->message = $this->lang->$type;
        if($_POST)
        {
            /* Try to save to database. */
            $messageID = $this->message->post($type);

            /* If save fail, return the error info. */
            if(!$messageID)
            {
                $this->send(array('result' => 'fail', 'reason' => 'error', 'message' => dao::getError()));
            }

            /* If save successfully, save the cookie and send success info. */
            $this->send(array('result' => 'success', 'message' => $this->lang->message->thanks));
        }
    }

    /**
     * Reply a message.
     * 
     * @param  int    $messageID 
     * @access public
     * @return void
     */
    public function reply($messageID)
    {
        if($_POST)
        {
            $result = $this->message->reply($messageID);
            if($result) $this->send(array('result' => 'success', 'message' => $this->lang->sendSuccess));
            $this->send(array('result' => 'fail', 'reason' => 'error', 'message' => dao::getError()));
        }

        $this->view->message = $this->message->getByID($messageID);
        $this->display();
    }

    /**
     * Pass messages.
     * 
     * @param  int    $messageID 
     * @param  string $type 
     * @access public
     * @return void
     */
    public function pass($messageID, $type)
    {
        $this->message->pass($messageID, $type);
        if(!dao::isError()) $this->send(array('result' => 'success'));
        $this->send(array('result' => 'fail', 'message' => dao::getError()));
    }

    /** 
     * Delete messages.
     *
     * @param int    $messageID 
     * @param string $type          single|pre
     * @access public
     * @return void
     */
    public function delete($messageID, $type)
    {
        $this->message->delete($messageID, $type);
        if(!dao::isError()) $this->send(array('result' => 'success'));
        $this->send(array('result' => 'fail', 'message' => dao::getError()));
    }

    /**
     * Batch delete messages.
     * 
     * @access public
     * @return void
     */
    public function batchDelete()
    {
        $messages = $this->post->messages;
        if(empty($messages)) $this->send(array('result' => 'fail', 'message' => $this->lang->message->noSelectedMessage));

        foreach($messages as $message) 
        {
            $result = $this->message->deleteByAccount($message);
            if(!$result) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        }

        $this->send(array('result' => 'success', 'message' => $this->lang->deleteSuccess, 'locate' => $this->createLink('user', 'message')));
    }
}

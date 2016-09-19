<?php
/**
 * The model file of message module of chanzhiEPS.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     message
 * @version     $Id$
 * @link        http://www.chanzhi.org
 */
class messageModel extends model
{
    /**
     * Get message by ID. 
     * 
     * @param  int    $messageID 
     * @access public
     * @return object
     */
    public function getByID($messageID)
    {
        return $this->dao->select('*')->from(TABLE_MESSAGE)->findByID($messageID)->fetch();
    }
    
    /**
     * Get message list By Account 
     * 
     * @param  string    $account 
     * @param  object    $pager 
     * @access public
     * @return array
     */
    public function getByAccount($account, $pager)
    {
         return $this->dao->select('*')->from(TABLE_MESSAGE)
            ->where('`to`')->eq($account)
            ->orderBy('id_desc')
            ->page($pager)
            ->fetchAll('id');
    }   

    /**
     * Get messages of one object.
     * 
     * @param  string $type          the message type
     * @param  string $objectType    the object type
     * @param  int    $objectID      the object id
     * @access public
     * @return array
     */
    public function getByObject($type, $objectType, $objectID, $pager = null)
    {
        $userMessages = $this->cookie->cmts;
        $userMessages = trim($userMessages, ',');
        if(empty($userMessages)) $userMessages = '0';
        return  $this->dao->select('*')->from(TABLE_MESSAGE)
            ->where('type')->eq($type)
            ->andWhere('objectType')->eq($objectType)
            ->andWhere('objectID')->eq($objectID)
            ->andWhere("(id in ({$userMessages}) or (status = '1'))")
            ->orderBy('id_desc')
            ->page($pager)
            ->fetchAll();
    }

    /**
     * Get replies of message list. 
     * 
     * @param  mix    $messages 
     * @access public
     * @return array
     */
    public function getReplies($messages)
    {
        if(empty($messages)) return false;
        foreach($messages as $message) $objectList[] = $message->id;
        return $this->dao->select('*')->from(TABLE_MESSAGE)
            ->where('type')->eq('reply')
            ->andWhere('objectID')->in($objectList)
            ->fetchGroup('objectID');
    }

    /**
     * Get message list.
     * 
     * @param string $type          the message type
     * @param string $objectType
     * @param int    $status        the message status
     * @param object $pager 
     * @access public
     * @return void
     */
    public function getList($type, $objectType = null, $status, $pager = null)
    {
        $messages = $this->dao->select('*')->from(TABLE_MESSAGE)
            ->where('type')->eq($type)
            ->andWhere('status')->eq($status)
            ->beginIF($objectType)->andWhere('objectType')->eq($objectType)->fi()
            ->orderBy('id_desc')
            ->page($pager)
            ->fetchAll('id');

        /* Get object titles and id. */
        $articles = array();
        $blogs    = array();
        $products = array();
        $books    = array();

        foreach($messages as $message)
        {
            if('article' == $message->objectType) $articles[] = $message->objectID;
            if('blog'    == $message->objectType) $blogs[]    = $message->objectID;
            if('product' == $message->objectType) $products[] = $message->objectID;
            if('book'    == $message->objectType) $books[]    = $message->objectID;
        }

        $articleTitles = $this->dao->select('id, title')->from(TABLE_ARTICLE)->where('id')->in($articles)->fetchPairs('id', 'title');
        $blogTitles    = $this->dao->select('id, title')->from(TABLE_ARTICLE)->where('id')->in($blogs)->fetchPairs('id', 'title');
        $productTitles = $this->dao->select('id, name')->from(TABLE_PRODUCT)->where('id')->in($products)->fetchPairs('id', 'name');
        //$bookTitles    = $this->dao->select('id, title')->from(TABLE_BOOK)->where('id')->in($books)->fetchPairs('id', 'title');

        foreach($messages as $message)
        {
            if($message->objectType == 'article') $message->objectTitle = isset($articleTitles[$message->objectID]) ? $articleTitles[$message->objectID] : '';
            if($message->objectType == 'blog')    $message->objectTitle = isset($blogTitles[$message->objectID])    ? $blogTitles[$message->objectID] : '';
            if($message->objectType == 'product') $message->objectTitle = isset($productTitles[$message->objectID]) ? $productTitles[$message->objectID] : '';
            if($message->objectType == 'book')    $message->objectTitle = isset($bookTitles[$message->objectID])    ? $bookTitles[$message->objectID] : '';
        }

        foreach($messages as $message)
        {
            if($message->type != 'message') $message->objectViewURL = $this->getObjectLink($message);
        }

        return $messages;
    }

    /**
     * Post a message.
     * 
     * @access public
     * @return void
     */
    public function post($type)
    {
        $account = $this->app->user->account;
        $admin   = $this->app->user->admin;
        $message = fixer::input('post')
            ->add('date', helper::now())
            ->add('type', $type)
            ->add('status', 1)
            ->setIF(isset($_POST['secret']) and $_POST['secret'] == 1, 'public', '0')
            ->setIF($type == 'message', 'to', 'admin')
            ->setIF($account != 'guest', 'account', $account)
            ->setIF($admin == 'super', 'status', '1')
            ->get();

        $this->dao->insert(TABLE_MESSAGE)
            ->data($message, $skip = 'captcha, secret')
            ->autoCheck()
            ->check('captcha', 'captcha')
            ->check('type', 'in', $this->config->message->types)
            ->batchCheck('from, type, content', 'notempty')
            ->exec();

        if(dao::isError()) return false;
        return $this->dao->lastInsertId();
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
        $message = $this->getByID($messageID);

        $reply = fixer::input('post')
            ->add('objectType', $message->type)
            ->add('objectID', $message->id)
            ->add('to', $message->to)
            ->add('type', 'reply')
            ->add('date', helper::now())
            ->add('account', $this->app->user->account)
            ->remove('status')
            ->get();

        $this->dao->insert(TABLE_MESSAGE)
            ->data($reply, $skip = 'captcha')
            ->autoCheck()
            ->check('type', 'in', $this->config->message->types)
            ->batchCheck('from, type, content', 'notempty')
            ->exec();

        if(!dao::isError()) 
        {
            $this->dao->update(TABLE_MESSAGE)->set('status')->eq(1)->where('status')->eq(0)->andWhere('id')->eq($messageID)->exec();
            if(dao::isError()) return false;
            return true;
        }

        return false;
    }

    /**
     * Delete a message.
     * 
     * @param string $messageID 
     * @param string $mode 
     * @access public
     * @return void
     */
    public function delete($messageID, $mode)
    {
        $message = $this->dao->select('status')->from(TABLE_MESSAGE)->where('id')->eq($messageID)->fetch('', false);
        if($message->status == 0)
        {
            $this->dao->delete()
                ->from(TABLE_MESSAGE)
                ->where('status')->eq(0)
                ->beginIF($mode == 'single')->andWhere('id')->eq($messageID)->fi()
                ->beginIF($mode == 'pre')->andWhere('id')->ge($messageID)->fi()
                ->exec(false);
        }
        else
        {
            $this->dao->delete()->from(TABLE_MESSAGE)->where('id')->eq($messageID)->exec(false);
        }
    }

    /**
     * Pass messages.
     * 
     * @param string $messageID 
     * @param string $type          single|pr
     * @access public
     * @return void
     */
    public function pass($messageID, $type)
    {
        $this->dao->update(TABLE_MESSAGE)
            ->set('status')->eq(1)
            ->where('status')->eq(0)
            ->beginIF($type == 'single')->andWhere('id')->eq($messageID)->fi()
            ->beginIF($type == 'pre')->andWhere('id')->ge($messageID)->fi()
            ->exec(false);
    }

    /**
     * Mark a message readed.
     * 
     * @param  int    $messageID 
     * @access public
     * @return bool
     */
    public function markReaded($messageID)
    {
        $this->dao->update(TABLE_MESSAGE)->set('readed')->eq('1')->where('id')->eq($messageID)->exec();
        return !dao::isError();
    }

    /**
     * Get the link of the object of one message.
     * 
     * @param string $message 
     * @access public
     * @return sting
     */
    public function getObjectLink($message)
    {
        if($message->objectType == 'article')
        {
            $link = helper::createLink('article', 'view', "id=$message->objectID");
        }
        elseif($message->objectType == 'blog')
        {
            $link = helper::createLink('team.blog', 'view', "id=$message->objectID");
        }
        elseif($message->objectType == 'product')
        {
            $link = helper::createLink('prooduct', 'view', "id=$message->objectID");
        }
        elseif($message->objectType == 'book')
        {
            $link = helper::createLink('view', 'view', "id=$message->objectID");
        }

        return $link;
    }

    /**
     * Delete messages of a user..
     * 
     * @param  int     $message 
     * @access public
     * @return void
     */
    public function deleteByAccount($message)
    {
        $this->dao->delete()->from(TABLE_MESSAGE)->where('`to`')->eq($this->app->user->account)->andWhere('id')->eq($message)->exec();
        return !dao::isError();
    }
}

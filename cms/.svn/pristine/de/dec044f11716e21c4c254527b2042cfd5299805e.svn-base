<?php
/**
 * The model file of sales module of RanZhi.
 *
 * @copyright   Copyright 2009-2010 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     chujilu
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     sales
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class salesModel extends model
{
    /**
     * Get sales group list.
     * 
     * @access public
     * @return array
     */
    public function getGroupList()
    {
        return $this->dao->select('*')->from(TABLE_SALESGROUP)->fetchAll('id');
    }

    /**
     * getByID 
     * 
     * @param  int    $groupID 
     * @access public
     * @return object
     */
    public function getByID($groupID)
    {
        return $this->dao->select('*')->from(TABLE_SALESGROUP)->where('id')->eq($groupID)->fetch();
    }

    /**
     * create group
     * 
     * @access public
     * @return void
     */
    public function create()
    {
        $users = '';
        if($this->post->users != false) foreach($this->post->users as $key => $value) $users .= ',' . $value;
        if($users != '') $users = $users . ',';

        $group = fixer::input('post')
            ->remove('users, privs_view, privs_edit')
            ->get();

        $group->users = $users;

        $this->dao->insert(TABLE_SALESGROUP)
            ->data($group)
            ->batchCheck($this->config->sales->require->create, 'notempty')
            ->exec();

        $groupID = $this->dao->lastInsertID();

        /* Update user priv. */
        $this->dao->delete()->from(TABLE_SALESPRIV)->where('priv')->eq('view')->exec();
        if($this->post->privs_view != false)
        {
            foreach($this->post->privs_view as $key => $value)
            {
                $value = explode('_', $value);
                $data['account']    = $value[0];
                $data['salesgroup'] = $value[1];
                $data['priv']       = 'view';
                if($data['salesgroup'] == 'current') $data['salesgroup'] = $groupID;

                $this->dao->insert(TABLE_SALESPRIV)->data($data)->exec();
            }
        }

        $this->dao->delete()->from(TABLE_SALESPRIV)->where('priv')->eq('edit')->exec();
        if($this->post->privs_edit != false)
        {
            foreach($this->post->privs_edit as $key => $value)
            {
                $value = explode('_', $value);
                $data['account']    = $value[0];
                $data['salesgroup'] = $value[1];
                $data['priv']       = 'edit';
                if($data['salesgroup'] == 'current') $data['salesgroup'] = $groupID;

                $this->dao->insert(TABLE_SALESPRIV)->data($data)->exec();
            }
        }
    }

    /**
     * edit 
     * 
     * @param  int    $groupID 
     * @access public
     * @return void
     */
    public function edit($groupID)
    {
        $users = '';
        if($this->post->users != false) foreach($this->post->users as $key => $value) $users .= ',' . $value;
        if($users != '') $users = $users . ',';

        $group = fixer::input('post')
            ->remove('users, privs_view, privs_edit, id')
            ->get();

        $group->users = $users;

        $this->dao->update(TABLE_SALESGROUP)
            ->data($group)
            ->batchCheck($this->config->sales->require->edit, 'notempty')
            ->where('id')->eq($groupID)
            ->exec();

        /* Update user priv. */
        $this->dao->delete()->from(TABLE_SALESPRIV)->where('priv')->eq('view')->exec();
        if($this->post->privs_view != false)
        {
            foreach($this->post->privs_view as $key => $value)
            {
                $value = explode('_', $value);
                $data['account']    = $value[0];
                $data['salesgroup'] = $value[1];
                $data['priv']       = 'view';

                $this->dao->insert(TABLE_SALESPRIV)->data($data)->exec();
            }
        }

        $this->dao->delete()->from(TABLE_SALESPRIV)->where('priv')->eq('edit')->exec();
        if($this->post->privs_edit != false)
        {
            foreach($this->post->privs_edit as $key => $value)
            {
                $value = explode('_', $value);
                $data['account']    = $value[0];
                $data['salesgroup'] = $value[1];
                $data['priv']       = 'edit';

                $this->dao->insert(TABLE_SALESPRIV)->data($data)->exec();
            }
        }
    }

    /**
     * delete a group.
     * 
     * @param  int    $groupID 
     * @param  string $null 
     * @access public
     * @return void
     */
    public function delete($groupID, $null = '')
    {
        return $this->dao->delete()->from(TABLE_SALESGROUP)->where('id')->eq($groupID)->exec();
    }

    /**
     * Get privs of user. 
     * 
     * @param  string $account 
     * @access public
     * @return array
     */
    public function getPrivsByAccount($account)
    {
        $all = $this->dao->select('*')->from(TABLE_SALESPRIV)->where('account')->eq($account)->fetchAll();

        $privs = array();
        foreach($all as $account => $priv) $privs[$priv->salesgroup][$priv->priv] = true;

        return $privs;
    }

    /**
     * Get all user privs. 
     * 
     * @access public
     * @return array
     */
    public function getAllPrivs()
    {
        $all = $this->dao->select('*')->from(TABLE_SALESPRIV)->fetchAll();

        $privs = array();
        foreach($all as $key => $priv) $privs[$priv->account][$priv->salesgroup][$priv->priv] = true;

        return $privs;
    }

    /**
     * Get accounts accessed by sales group.
     * 
     * @param  string $account 
     * @param  string $type     view|edit
     * @access public
     * @return string
     */
    public function getAccountsSawByMe($account, $type = 'view')
    {
        $privs  = $this->getPrivsByAccount($account);
        $groups = $this->getGroupList();
        $users  = '';
        foreach($privs as $key => $priv)
        {
            if(!isset($groups[$key])) continue;
            if($type == 'view' and isset($priv['view'])) $users .= $groups[$key]->users;
            if(($type == 'edit' or $type == 'view') and isset($priv['edit'])) $users .= $groups[$key]->users;
        }

        /* Remove repeat user. */
        $accounts = ",$account,";
        foreach(explode(',', $users) as $user)
        {
            if($user != '' and strpos($accounts, ",$user,") === false) $accounts .= "$user,";
        }

        return $accounts;
    }
}

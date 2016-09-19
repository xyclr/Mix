<?php
/**
 * The model file of balance module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     contact
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class balanceModel extends model
{
    /**
     * Get balance by id.
     * 
     * @param  int    $id 
     * @access public
     * @return object
     */
    public function getByID($id)
    {
        return $this->dao->select('*')->from(TABLE_BALANCE)->where('id')->eq($id)->limit(1)->fetch();
    }

    /** 
     * Get balance list.
     * 
     * @param  int    $depositor 
     * @param  string  $orderBy 
     * @param  object  $pager 
     * @access public
     * @return array
     */
    public function getList($depositor, $orderBy, $pager = null)
    {
        return $this->dao->select('*')->from(TABLE_BALANCE)
            ->beginIf($depositor)->where('depositor')->eq($depositor)->fi()
            ->orderBy($orderBy)
            ->page($pager)
            ->fetchAll('id');
    }

    /**
     * Get latest balances.
     * 
     * @access public
     * @return void
     */
    public function getLatest()
    {
        return $this->dao->select('depositor, date, money, currency')
            ->from(TABLE_BALANCE)
            ->orderBy('date')
            ->fetchGroup('currency', 'depositor');
    }

    /**
     * Get date otions of all balances.
     * 
     * @param  int    $depositorID 
     * @access public
     * @return void
     */
    public function getDateOptions($depositorID = 0)
    {
        return $this->dao->select('date')->from(TABLE_BALANCE)
            ->beginIF($depositorID)->where('depositor')->in($depositorID)->fi()
            ->orderBy('date_desc')
            ->fetchPairs('date', 'date');
    }

    /**
     * Create a balance.
     * 
     * @param  object    $balance 
     * @access public
     * @return int|bool
     */
    public function create($balance = null)
    {
        if(empty($balance))
        {
            $now = helper::now();
            $depositor = $this->loadModel('depositor')->getByID($this->post->depositor);

            $balance = fixer::input('post')
                ->add('currency', !empty($depositor) ? "{$depositor->currency}" : '')
                ->add('createdBy', $this->app->user->account)
                ->add('createdDate', $now)
                ->get();
        }

        $this->dao->replace(TABLE_BALANCE)
            ->data($balance)
            ->autoCheck()
            ->batchCheck($this->config->balance->require->create, 'notempty')
            ->exec();

        return $this->dao->lastInsertID();
    }

    /**
     * Update a balance.
     * 
     * @param  int    $balanceID 
     * @access public
     * @return string|bool
     */
    public function update($balanceID)
    {
        $oldBalance = $this->getByID($balanceID);

        $depositor = $this->loadModel('depositor')->getByID($this->post->depositor);

        $balance = fixer::input('post')
            ->add('currency', $depositor->currency)
            ->add('editedBy', $this->app->user->account)
            ->add('editedDate', helper::now())
            ->removeIF($this->post->type == 'cash', 'public')
            ->get();

        $this->dao->delete()->from(TABLE_BALANCE)->where('depositor')->eq($balance->depositor)->andWhere('date')->eq($balance->date)->andWhere('id')->ne($balanceID)->exec();

        $this->dao->update(TABLE_BALANCE)->data($balance)->autoCheck()->where('id')->eq($balanceID)->exec();

        if(!dao::isError()) return commonModel::createChanges($oldBalance, $balance);

        return false;
    }

    /**
     * Delete a balance.
     * 
     * @param  int      $balanceID 
     * @access public
     * @return void
     */
    public function delete($balanceID, $null = null)
    {
        $balance = $this->getByID($balanceID);
        if(!$balance) return false;

        $this->dao->delete()->from(TABLE_BALANCE)->where('id')->eq($balanceID)->exec();

        return !dao::isError();
    }
}

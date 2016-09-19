<?php
/**
 * The model file of address module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     address
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class addressModel extends model
{ 
    /**
     * Get by id.
     * 
     * @param  int    $addressID 
     * @access public
     * @return object
     */
    public function getByID($addressID)
    {
        return $this->dao->select('*')->from(TABLE_ADDRESS)->where('id')->eq($addressID)->fetch();
    }

    /**
     * Get by object.
     * 
     * @param  string  $objectType 
     * @param  int     $objectID 
     * @access public
     * @return array
     */
    public function getByObject($objectType, $objectID)
    {
        return $this->dao->select('*')->from(TABLE_ADDRESS)->where('objectType')->eq($objectType)->andWhere('objectID')->eq($objectID)->fetchAll();
    }

    /**
     * Get addresses saw by me.  
     * 
     * @param  string $type  view|edit
     * @param  array  $addressIdList 
     * @access public
     * @return array
     */
    public function getAddressesSawByMe($type = 'view', $addressIdList = array())
    {
        $customerIdList = $this->loadModel('customer')->getCustomersSawByMe($type);
        $contactIdList  = $this->loadModel('contact')->getContactsSawByMe($type);

        $addressListOfCustomer = $this->dao->select('*')->from(TABLE_ADDRESS)
            ->where('objectType')->eq('customer')
            ->andWhere('objectID')->in($customerIdList)
            ->beginIF(!empty($addressIdList))->andWhere('id')->in($addressIdList)->fi()
            ->fetchAll('id');

        $addressListOfContact = $this->dao->select('*')->from(TABLE_ADDRESS)
            ->where('objectType')->eq('contact')
            ->andWhere('objectID')->in($contactIdList)
            ->beginIF(!empty($addressIdList))->andWhere('id')->in($addressIdList)->fi()
            ->fetchAll('id');

        return array_keys($addressListOfCustomer + $addressListOfContact);
    }

    /**
     * Get list.
     * 
     * @param  string  $objectType 
     * @param  int    $objectID 
     * @access public
     * @return array
     */
    public function getList($objectType, $objectID)
    {
        $addresses = $this->getByObject($objectType, $objectID);

        if($objectType == 'contact')
        {
            $contact   = $this->loadModel('contact')->getByID($objectID);
            $addresses = array_merge($this->getByObject('customer', $contact->customer), $addresses);
        }

        /* Join area and location to fullLocation. */
        $areaList = $this->loadModel('tree')->getOptionMenu('area');
        foreach($addresses as $address)
        {
            $address->fullLocation = '';
            if(isset($address->area)) $address->fullLocation .= str_replace('/', ' ', zget($areaList, $address->area));
            $address->fullLocation .= ' ' . $address->location;
        }

        return $addresses;
    }

    /**
     * Create address. 
     * 
     * @param  string  $objectType 
     * @param  int    $objectID 
     * @access public
     * @return int
     */
    public function create($objectType, $objectID)
    {
        $address = fixer::input('post')
            ->add('objectType', $objectType)
            ->add('objectID', $objectID)
            ->get();

        $this->dao->insert(TABLE_ADDRESS)->data($address)
            ->autoCheck()
            ->batchCheck($this->config->address->require->create, 'notempty')
            ->exec();

        if(!dao::isError()) return $this->dao->lastInsertID();

        return false;
    }

    /**
     * Update address.
     * 
     * @param  int    $addressID 
     * @access public
     * @return string
     */
    public function update($addressID)
    {
        $oldAddress = $this->getByID($addressID);
        $address    = fixer::input('post')->get();

        $this->dao->update(TABLE_ADDRESS)->data($address)->where('id')->eq($addressID)->exec();
        
        if(dao::isError()) return false;
        
        return commonModel::createChanges($oldAddress, $address);
    }

    /**
     * Delete address.
     * 
     * @param  int    $addressID 
     * @param  string $table 
     * @access public
     * @return bool
     */
    public function delete($addressID, $table = null)
    {
        $this->dao->delete()->from(TABLE_ADDRESS)->where('id')->eq($addressID)->exec();
        return !dao::isError();
    }
}

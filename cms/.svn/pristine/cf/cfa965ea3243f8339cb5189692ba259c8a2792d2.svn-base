<?php
/**
 * The control file of address module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     address
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class address extends control
{
    /**
     * Browse address. 
     * 
     * @param  string $objectType 
     * @param  int    $objectID 
     * @access public
     * @return void
     */
    public function browse($objectType, $objectID)
    {
        $addresses = $this->address->getList($objectType, $objectID);

        $addressIdList = array();
        foreach($addresses as $address) $addressIdList[] = $address->id;
        $this->app->user->canEditAddressIdList = ',' . implode(',', $this->address->getAddressesSawByMe('edit', $addressIdList)) . ',';

        $this->view->title      = $this->lang->address->common;
        $this->view->modalWidth = 800;
        $this->view->addresses  = $addresses;
        $this->view->areaList   = $this->loadModel('tree')->getOptionMenu('area');
        $this->view->objectType = $objectType;
        $this->view->objectID   = $objectID;

        $this->display();
    }

    /**
     * Change customer for contact.
     * 
     * @param  string $objectType 
     * @param  int    $objectID 
     * @access public
     * @return void
     */
    public function create($objectType, $objectID)
    {
        if($_POST)
        {
            $this->address->create($objectType, $objectID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));

            /* Update customer info. */
            if($objectType == 'customer') $this->loadModel('customer')->updateEditedDate($objectID);
            if($objectType == 'contact')
            {
                $contact = $this->loadModel('contact')->getByID($objectID);
                if(isset($contact->customer)) $this->loadModel('customer')->updateEditedDate($contact->customer);
            }

            $this->loadModel('action')->create($objectType, $objectID, "createAddress", '',  $this->post->title);
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse', "objectType=$objectType&objectID=$objectID")));
        }

        $this->view->title      = $this->lang->address->create;
        $this->view->objectID   = $objectID;
        $this->view->objectType = $objectType;
        $this->view->areas      = $this->loadModel('tree')->getOptionMenu('area');
        $this->display();
    }

    /**
     * Edit address.
     * 
     * @param  int    $addressID 
     * @access public
     * @return void
     */
    public function edit($addressID)
    {
        $address = $this->address->getByID($addressID);
        if($_POST)
        {
            $changes = $this->address->update($addressID);
            if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));

            /* Update customer info. */
            if($address->objectType == 'customer') $this->loadModel('customer')->updateEditedDate($address->objectID);
            if($address->objectType == 'contact')
            {
                $contact = $this->loadModel('contact')->getByID($address->objectID);
                if(isset($contact->customer)) $this->loadModel('customer')->updateEditedDate($contact->customer);
            }

            if($changes)
            {
                $actionID = $this->loadModel('action')->create($address->objectType, $address->objectID, 'editAddress');
                $this->action->logHistory($actionID, $changes);
            }
            $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse', "objectType=$address->objectType&objectID=$address->objectID")));
        }

        $this->view->title   = $this->lang->address->edit;
        $this->view->areas   = $this->loadModel('tree')->getOptionMenu('area');
        $this->view->address = $address;
        $this->display();
    }

    /**
     * Delete address.
     * 
     * @param  int    $addressID 
     * @access public
     * @return void
     */
    public function delete($addressID)
    {
        $address = $this->address->getByID($addressID);

        $this->address->delete($addressID);
        if(dao::isError()) $this->send(array('result' => 'fail', 'message' => dao::getError()));
        $this->loadModel('action')->create($address->objectType, $address->objectID, "deleteAddress", '',  $address->title);
        $this->send(array('result' => 'success'));
    }
}

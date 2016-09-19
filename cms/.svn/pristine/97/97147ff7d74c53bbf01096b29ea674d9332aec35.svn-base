<?php
/**
 * The model file of order module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     order
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class orderModel extends model
{
    /**
     * Get order by id.
     * 
     * @param  int    $id 
     * @access public
     * @return object|bool
     */
    public function getByID($id)
    {
        $customerIdList = $this->loadModel('customer', 'crm')->getCustomersSawByMe();
        if(empty($customerIdList)) return null;

        $order = $this->dao->select('*')->from(TABLE_ORDER)->where('id')->eq($id)->andWhere('customer')->in($customerIdList)->fetch(); 
        if(!$order) return false;

        $products = $this->dao->select('*')->from(TABLE_PRODUCT)->where('id')->in($order->product)->orderBy('id_desc')->fetchAll();

        $order->products = $products;

        return $order;
    }

    /**
     * Get my order id list.
     * 
     * @param  string $type        view|edit
     * @param  array  $orderIdList 
     * @access public
     * @return array
     */
    public function getOrdersSawByMe($type = 'view', $orderIdList = array())
    {
        $customerIdList = $this->loadModel('customer')->getCustomersSawByMe($type);
        $orderList = $this->dao->select('*')->from(TABLE_ORDER)
            ->where('deleted')->eq(0)
            ->beginIF(!empty($orderIdList))->andWhere('id')->in($orderIdList)->fi()
            ->beginIF(!isset($this->app->user->rights['crm']['manageall']) and ($this->app->user->admin != 'super'))
            ->andWhere('customer')->in($customerIdList)
            ->fi()
            ->fetchAll('id');

        return array_keys($orderList);
    }

    /** 
     * Get order list.
     * 
     * @param  string  $mode 
     * @param  mix     $param 
     * @param  string  $orderBy 
     * @param  object  $pager 
     * @access public
     * @return array
     */
    public function getList($mode = 'all', $param = null, $orderBy = 'id_desc', $pager = null)
    {
        $customerIdList = $this->loadModel('customer')->getCustomersSawByMe();
        if(empty($customerIdList)) return array();

        $products = $this->loadModel('product')->getPairs();

        $this->app->loadClass('date', $static = true);
        $thisMonth = date::getThisMonth();
        $thisWeek  = date::getThisWeek();

        /* Process search condition. */
        if($this->session->orderQuery == false) $this->session->set('orderQuery', ' 1 = 1');
        $orderQuery = $this->loadModel('search', 'sys')->replaceDynamic($this->session->orderQuery);

        if(strpos($orderBy, 'status') !== false) $orderBy .= ', closedReason';
        if(strpos($orderBy, 'id') === false) $orderBy .= ', id_desc';

        $orders = $this->dao->select('o.*, c.name as customerName, c.level as level')->from(TABLE_ORDER)->alias('o')
            ->leftJoin(TABLE_CUSTOMER)->alias('c')->on("o.customer=c.id")
            ->where('o.deleted')->eq(0)
            ->beginIF($mode == 'past')->andWhere('o.nextDate')->andWhere('o.nextDate')->lt(helper::today())->fi()
            ->beginIF($mode == 'today')->andWhere('o.nextDate')->eq(helper::today())->fi()
            ->beginIF($mode == 'tomorrow')->andWhere('o.nextDate')->eq(formattime(date::tomorrow(), DT_DATE1))->fi()
            ->beginIF($mode == 'thisweek')->andWhere('o.nextDate')->between($thisWeek['begin'], $thisWeek['end'])->fi()
            ->beginIF($mode == 'thismonth')->andWhere('o.nextDate')->between($thisMonth['begin'], $thisMonth['end'])->fi()
            ->beginIF($mode == 'public')->andWhere('public')->eq('1')->fi()
            ->beginIF($mode == 'assignedtome')->andWhere('o.assignedTo')->eq($this->app->user->account)->fi()
            ->beginIF($mode == 'query')->andWhere($param)->fi()
            ->beginIF($mode == 'bysearch')->andWhere($orderQuery)->fi()
            ->andWhere('o.customer')->in($customerIdList)
            ->orderBy($orderBy)->page($pager)->fetchAll('id');

        foreach($orders as $order)
        {
            $order->products = array();
            $productList = explode(',', $order->product);
            foreach($productList as $product) if(isset($products[$product])) $order->products[] = $products[$product];
        }

        foreach($orders as $order)
        {
            $productName = count($order->products) > 1 ? current($order->products) . $this->lang->etc : current($order->products);
            $order->title = sprintf($this->lang->order->titleLBL, $order->customerName, $productName, date('Y-m-d', strtotime($order->createdDate))); 
        }

        return $orders;
    }

    /** 
     * Get order list By idList.
     * 
     * @param  array   $idList 
     * @access public
     * @return array
     */
    public function getByIdList($idList)
    {
        $orders = $this->dao->select('o.*, c.name as customerName')->from(TABLE_ORDER)->alias('o')
            ->leftJoin(TABLE_CUSTOMER)->alias('c')->on("o.customer=c.id")
            ->where('o.id')->in($idList)
            ->fetchAll('id');

        $this->setProductsForOrders($orders);

        foreach($orders as $order)
        {
            $productName = count($order->products) > 1 ? current($order->products) . $this->lang->etc : current($order->products);
            $order->title = sprintf($this->lang->order->titleLBL, $order->customerName, $productName, date('Y-m-d', strtotime($order->createdDate))); 
        }

        return $orders;
    }

    /** 
     * Get order pairs.
     * 
     * @param  int      $customer 
     * @param  string   $status 
     * @access public
     * @return array
     */
    public function getPairs($customer, $status = '')
    {
        $customerIdList = $this->loadModel('customer')->getCustomersSawByMe();
        if(empty($customerIdList)) return array();

        $orders = $this->dao->select('o.id, o.createdDate, o.product, c.name as customerName')->from(TABLE_ORDER)->alias('o')
            ->leftJoin(TABLE_CUSTOMER)->alias('c')->on("o.customer=c.id")
            ->where(1)
            ->beginIF($customer)->andWhere('customer')->eq($customer)->fi()
            ->beginIF($status)->andWhere('status')->eq($status)->fi()
            ->andWhere('o.customer')->in($customerIdList)
            ->fetchAll('id');

        $this->setProductsForOrders($orders);

        foreach($orders as $key => $order)
        {
            $productName = count($order->products) > 1 ? current($order->products) . $this->lang->etc : current($order->products);
            $orders[$key] = sprintf($this->lang->order->titleLBL, $order->customerName, $productName, date('Y-m-d', strtotime($order->createdDate))); 
        }

        return $orders;
    }

    /**
     * Get orders of the customer for create contract.
     * 
     * @param  int      $customerID 
     * @param  string   $status 
     * @access public
     * @return array
     */
    public function getOrderForCustomer($customerID, $status = '')
    {
        $orders = $this->dao->select('id, `plan`, customer, product, createdDate, currency, editedDate')->from(TABLE_ORDER)
            ->where(1)
            ->beginIF($customerID)->andWhere('customer')->eq($customerID)->fi()
            ->beginIF($status)->andWhere('status')->eq($status)->fi()
            ->fetchAll('id');

        $customers = $this->loadModel('customer', 'crm')->getPairs('client');

        $this->setProductsForOrders($orders);

        foreach($orders as $order)
        {
            $productName  = count($order->products) > 1 ? current($order->products) . $this->lang->etc : current($order->products);
            $order->title = sprintf($this->lang->order->titleLBL, $customers[$order->customer], $productName, date('Y-m-d', strtotime($order->createdDate))); 
        }

        return array('0' => '') + $orders;
    }

    /**
     * Get amount.
     * 
     * @param  int|string|array    $idList 
     * @access public
     * @return float
     */
    public function getAmount($idList)
    {
        $orders = $this->dao->select('*')->from(TABLE_ORDER)->where('id')->in($idList)->fetchAll();

        $amount = 0;
        foreach($orders as $order)
        {
            $amount += $order->real == '0.00' ? $order->plan : $order->real;
        }

        return $amount;
    }

    /**
     * Get contract of an order.
     * 
     * @param  int    $orderID 
     * @access public
     * @return object
     */
    public function getContract($orderID)
    {
        return $this->dao->select('*')
            ->from(TABLE_CONTRACTORDER)->alias('t1')
            ->leftJoin(TABLE_CONTRACT)->alias('t2')->on('t1.contract=t2.id')
            ->where('`order`')->eq($orderID)
            ->fetch();
    }

    /**
     * Create an order.
     * 
     * @access public
     * @return int
     */
    public function create()
    {

        $now = helper::now();
        $order = fixer::input('post')
            ->add('createdBy', $this->app->user->account)
            ->add('createdDate', $now)
            ->setDefault('status', 'normal')
            ->setDefault('assignedBy', $this->app->user->account)
            ->setDefault('assignedTo', $this->app->user->account)
            ->setDefault('assignedDate', $now)
            ->setDefault('customer', 0)
            ->join('product', ',')
            ->remove('createCustomer, name, contact, phone, email, qq, continue, createProduct, productName, line, type, status')
            ->get();

        /* Check data. */
        if($this->post->createProduct)
        {
            if($this->post->productName == '') return array('result' => 'fail', 'message' => array('productName' => sprintf($this->lang->error->notempty, $this->lang->customer->name)));
            if(!$this->post->continue) 
            {
                $result = $this->loadModel('product')->checkUnique($this->post->productName);
                if($result['result'] == 'fail') return $result;
            }
        }
        if(!$this->post->createCustomer and $this->post->createProduct)
        {
            $this->dao->insert(TABLE_ORDER)->data($order)->autoCheck()->check('customer', 'notempty');
            if(dao::isError()) return array('result' => 'fail', 'message' => dao::getError());
        }
        if($this->post->createCustomer and !$this->post->createProduct)
        {
            $this->dao->insert(TABLE_ORDER)->data($order)->autoCheck()->check('product', 'notempty');
            if(dao::isError()) return array('result' => 'fail', 'message' => dao::getError());
        }

        if($this->post->createCustomer)
        {
            $customer = new stdclass();
            $customer->name        = $this->post->name ? $this->post->name : $this->post->contact;
            $customer->contact     = $this->post->contact; 
            $customer->phone       = $this->post->phone; 
            $customer->email       = $this->post->email; 
            $customer->qq          = $this->post->qq; 
            $customer->relation    = 'client'; 
            $customer->assignedTo  = $this->app->user->account;
            $customer->createdBy   = $this->app->user->account;
            $customer->createdDate = helper::now();

            $return = $this->loadModel('customer')->create($customer);
            if($return['result'] == 'fail') return $return;
            $customerID = $return['customerID'];
            $order->customer = isset($customerID) ? $customerID : '';
        }

        if($this->post->createProduct)
        {
            $product = new stdclass();
            $product->name        = $this->post->productName;
            $product->line        = $this->post->line;
            $product->type        = $this->post->type;
            $product->status      = $this->post->status;
            $product->createdBy   = $this->app->user->account;
            $product->createdDate = helper::now();
            $product->editedDate  = helper::now();

            $this->dao->insert(TABLE_PRODUCT)
                ->data($product)
                ->autoCheck()
                ->exec();

            if(dao::isError()) return array('result' => 'fail', 'message' => dao::getError());
            $order->product = $this->dao->lastInsertID(); 
        }

        $order->product  = !empty($order->product) ? ',' . $order->product . ',' : '';

        $this->dao->insert(TABLE_ORDER)
            ->data($order)
            ->autoCheck()
            ->batchCheck($this->config->order->require->create, 'notempty')
            ->exec();

        if(dao::isError()) return array('result' => 'fail', 'message' => dao::getError());

        $orderID = $this->dao->lastInsertID();
        $this->loadModel('action')->create('order', $orderID, 'Created', '');
        $this->loadModel('action')->create('customer', $this->post->customer, 'createOrder', '', html::a(helper::createLink('order', 'view', "orderID=$orderID"), $orderID));

        return array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => helper::createLink('order', 'browse'));
    }

    /**
     * Update an order.
     * 
     * @param  int $orderID 
     * @access public
     * @return void
     */
    public function update($orderID)
    {
        $oldOrder = $this->getByID($orderID);
        $now      = helper::now();

        $order = fixer::input('post')
            ->setDefault('nextDate', '0000-00-00')
            ->setDefault('signedDate', '0000-00-00')
            ->setDefault('closedDate', '0000-00-00 00:00:00')
            ->join('product', ',')

            ->setIF($this->post->signedBy, 'status', 'signed')
            ->setIF($this->post->closedBy, 'status', 'closed')

            ->setIF($this->post->status == 'closed' and !$this->post->closedBy, 'closedBy', $this->app->user->account)
            ->setIF($this->post->status == 'closed' and !$this->post->closedDate, 'closedDate', $now)

            ->setIF($this->post->status == 'signed' and !$this->post->signedBy, 'signedBy', $this->app->user->account)
            ->setIF($this->post->status == 'signed' and !$this->post->signedDate, 'signedDate', substr($now, 0, 10))

            ->add('editedBy',   $this->app->user->account)
            ->add('editedDate', $now)

            ->get();

        $order->product = $order->product ? ',' . $order->product . ',' : '';

        $this->dao->update(TABLE_ORDER)
            ->data($order, $skip = 'referer')
            ->autoCheck()
            ->batchCheck($this->config->order->require->edit, 'notempty')
            ->where('id')->eq($orderID)
            ->exec();

        if(dao::isError()) return false;

        return commonModel::createChanges($oldOrder, $order);
    }

    /**
     * Close an order.
     * 
     * @param  int    $orderID 
     * @access public
     * @return bool
     */
    public function close($orderID)
    {
        $now   = helper::now();
        $order = fixer::input('post')
            ->add('closedDate', $now)
            ->add('closedBy', $this->app->user->account)
            ->add('status', 'closed')
            ->add('assignedTo', 'closed')
            ->add('editedBy', $this->app->user->account)
            ->add('editedDate', $now)
            ->get();

        $this->dao->update(TABLE_ORDER)->data($order, $skip = 'uid, closedNote')
            ->autoCheck()
            ->where('id')->eq($orderID)
            ->exec();

        return !dao::isError();
    }

    /**
     * Activate an order.
     * 
     * @param  int    $orderID 
     * @access public
     * @return bool
     */
    public function activate($orderID)
    {
        $now = helper::now();
        $order = fixer::input('post')
            ->add('activatedDate', $now)
            ->add('activatedBy', $this->app->user->account)
            ->setDefault('closedBy,closedReason,signedBy', '')
            ->setDefault('signedDate', '0000-00-00')
            ->setDefault('closedDate', '0000-00-00 00:00:00')
            ->setDefault('status', 'normal')
            ->add('editedBy', $this->app->user->account)
            ->add('editedDate', $now)
            ->get();

        $this->dao->update(TABLE_ORDER)->data($order, $skip='uid, comment')->autoCheck()->where('id')->eq($orderID)->exec();

        return !dao::isError();
    }

    /**
     * Assign an order to a member again.
     * 
     * @param  int    $orderID 
     * @access public
     * @return void
     */
    public function assign($orderID)
    {
        $now = helper::now();
        $order = fixer::input('post')
            ->setDefault('assignedBy', $this->app->user->account)
            ->setDefault('assignedDate', $now)
            ->add('editedBy', $this->app->user->account)
            ->add('editedDate', $now)
            ->get();

        $this->dao->update(TABLE_ORDER)
            ->data($order, $skip = 'uid, comment')
            ->autoCheck()
            ->where('id')->eq($orderID)
            ->exec();

        return !dao::isError();
    }

    /**
     * Build operate menu of an order.
     * 
     * @param  object    $order 
     * @access public
     * @return string
     */
    public function buildOperateMenu($order)
    {
        $menu = '';
        $menu .= commonModel::printLink('order', 'view', "orderID=$order->id", $this->lang->view, '', false);
        $menu .= commonModel::printLink('action', 'createRecord', "objectType=order&objectID={$order->id}&customer={$order->customer}", $this->lang->order->record, "data-toggle='modal' data-type='iframe'", false);

        if($order->status == 'normal') $menu .= commonModel::printLink('contract', 'create', "customerID={$order->customer}&orderID={$order->id}", $this->lang->order->sign, '', false);
        if($order->status != 'normal') $menu .= html::a('###', $this->lang->order->sign, "disabled='disabled' class='disabled'");

        $menu .= commonModel::printLink('order', 'edit', "orderID=$order->id", $this->lang->edit, '', false);
        $menu .="<div class='dropdown'><a data-toggle='dropdown' href='javascript:;'>" . $this->lang->more . "<span class='caret'></span> </a><ul class='dropdown-menu pull-right'>";
        $menu .= commonModel::printLink('order', 'assign', "orderID=$order->id", $this->lang->assign, "data-toggle='modal'", false, '', 'li');

        if($order->status != 'closed')
        {
            $menu .= commonModel::printLink('order', 'close', "orderID=$order->id", $this->lang->close, "data-toggle='modal'", false, '', 'li');
            $menu .= "<li disabled='disabled' class='disabled'>" . html::a('###', $this->lang->activate) . "</li>";
        }
        else
        {
            if($order->closedReason == 'payed') $menu .= "<li disabled='disabled' class='disabled'>" . html::a('###', $this->lang->close) . "</li>";
            if($order->closedReason == 'payed') $menu .= "<li disabled='disabled' class='disabled'>" . html::a('###', $this->lang->activate) . "</li>";
            if($order->closedReason != 'payed') $menu .= commonModel::printLink('order', 'activate', "orderID=$order->id", $this->lang->activate, "data-toggle='modal'", false, '', 'li');
        }
        if($order->status == 'normal' or $order->closedReason == 'failed')
        {
            $menu .= commonModel::printLink('order', 'delete', "orderID=$order->id", $this->lang->delete, "class='deleter'", false, '', 'li');
        }
        $menu .= '</ul></div>';

        return $menu;
    }

    /**
     * Count amount.
     * 
     * @param  array  $orders 
     * @param  string $type 
     * @access public
     * @return array
     */
    public function countAmount($orders)
    {
        $totalAmount  = array();
        $currencyList = $this->loadModel('common', 'sys')->getCurrencyList();
        $currencySign = $this->common->getCurrencySign();

        foreach($orders as $order)
        {
            if($order->status == 'closed' and $order->closedReason != 'payed') continue;
            foreach($currencyList as $key => $currency)
            {
                if($order->currency == $key)
                {
                   if(!isset($totalAmount['plan'][$key])) $totalAmount['plan'][$key] = 0;
                   if(!isset($totalAmount['real'][$key])) $totalAmount['real'][$key] = 0;

                    $totalAmount['plan'][$key] += $order->plan;
                    $totalAmount['real'][$key] += $order->real;
                }
            }
        }

        foreach($totalAmount as $type => $currencyAmount) foreach($currencyAmount as $currency => $amount) $totalAmount[$type][$currency] = "<span title='$amount'>" . $currencySign[$currency] . commonModel::tidyMOney($amount) . "</span>";

        return $totalAmount;
    }

    /**
     * Set pruducts for orders.
     * 
     * @param  array  $orders 
     * @access public
     * @return void
     */
    public function setProductsForOrders($orders)
    {
        $products = $this->loadModel('product', 'crm')->getPairs();

        foreach($orders as $order)
        {
            $order->products = array();
            $productList = explode(',', $order->product);
            foreach($productList as $product) if(isset($products[$product])) $order->products[] = $products[$product];
        }
    }
}

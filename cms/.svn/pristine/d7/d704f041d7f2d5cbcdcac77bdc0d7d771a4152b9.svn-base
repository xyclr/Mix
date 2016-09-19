<?php
/**
 * The model file of product module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     product
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
class productModel extends model
{
    /**
     * Get produt by id.
     * 
     * @param  int    $id 
     * @access public
     * @return object 
     */
    public function getByID($id)
    {
        return $this->dao->select('*')->from(TABLE_PRODUCT)->where('id')->eq($id)->fetch();
    }

    /** 
     * Get product list.
     * 
     * @param  string  $orderBy 
     * @param  object  $pager 
     * @access public
     * @return array
     */
    public function getList($mode, $orderBy = 'id_desc', $pager = null)
    {
        if(strpos($orderBy, 'id') === false) $orderBy .= ', id_desc';

        return $this->dao->select('*')->from(TABLE_PRODUCT)
            ->where('deleted')->eq(0)
            ->beginIF($mode == 'developing')->andWhere('status')->eq('developing')
            ->beginIF($mode == 'normal')->andWhere('status')->eq('normal')
            ->beginIF($mode == 'offline')->andWhere('status')->eq('offline')
            ->orderBy($orderBy)
            ->page($pager)
            ->fetchAll('id');
    }

    /** 
     * Get product pairs.
     * 
     * @param  string  $orderBy 
     * @access public
     * @return array
     */
    public function getPairs($orderBy = 'id_desc')
    {
        return $this->dao->select('id, name')->from(TABLE_PRODUCT)->where('deleted')->eq(0)->orderBy($orderBy)->fetchPairs('id');
    }

    /**
     * Create a product.
     * 
     * @access public
     * @return int|bool
     */
    public function create()
    {
        $now = helper::now();
        $product = fixer::input('post')
            ->add('createdBy', $this->app->user->account)
            ->add('createdDate', $now)
            ->add('editedDate', $now)
            ->get();

        $this->dao->insert(TABLE_PRODUCT)
            ->data($product)
            ->autoCheck()
            ->batchCheck($this->config->product->require->create, 'notempty')
            ->exec();

        return $this->dao->lastInsertID();
    }

    /**
     * Update a product.
     * 
     * @param  int $productID 
     * @access public
     * @return void
     */
    public function update($productID)
    {
        $oldProduct = $this->getByID($productID);

        $product = fixer::input('post')
            ->add('editedBy', $this->app->user->account)
            ->add('editedDate', helper::now())
            ->get();

        $this->dao->update(TABLE_PRODUCT)
            ->data($product)
            ->autoCheck()
            ->batchCheck($this->config->product->require->edit, 'notempty')
            ->where('id')->eq($productID)
            ->exec();

        if(dao::isError()) return false;

        return commonModel::createChanges($oldProduct, $product);
    }

    /**
     * Check product is unique.
     * 
     * @param  string  $name
     * @access public
     * @return array
     */
    public function checkUnique($name)
    {
        if($name) $data = $this->dao->select('*')->from(TABLE_PRODUCT)->where('name')->eq($name)->fetch();
        if(!empty($data))
        {
            $error = sprintf($this->lang->error->unique, $this->lang->product->name, html::a(helper::createLink('product', 'view', "productID={$data->id}"), $data->name, "target='_blank'"));
            return array('result' => 'fail', 'error' => $error);
        }

        return array('result' => 'success');
    }
}

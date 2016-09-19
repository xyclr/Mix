<?php
/**
 * The control file of error module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <gunaxiying@xirangit.com>
 * @package     error 
 * @version     $Id: control.php 7417 2013-12-23 07:51:50Z wwccss $
 * @link        http://www.ranzhico.com
 */
class error extends control
{
    /**
     * The error page.
     * 
     * @access public
     * @return void
     */
    public function index($type, $locate = '')
    {
        $this->view->title   = $this->lang->error->common;
        $this->view->message = isset($this->lang->error->typeList[$type]) ? $this->lang->error->typeList[$type] : $this->lang->error->typeList['notFound'];
        $this->view->locate  = helper::safe64Decode($locate);

        $this->display();
    }
}

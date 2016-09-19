<?php
/**
 * The control file of report module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     report
 * @version     $Id: control.php 4622 2013-03-28 01:09:02Z chencongzhi520@gmail.com $
 * @link        http://www.ranzhico.com
 */
class report extends control
{
    /**
     * browse report.
     * 
     * @param  tring $module 
     * @access public
     * @return void
     */
    public function browse($module)
    {
        if(!isset($this->config->report->moduleList[$module])) die('no this module.');
        $tableName     = $this->config->report->moduleList[$module];
        $checkedCharts = array();
        $charts        = array();
        $datas         = array();
        $tips          = array();

        /* Set menu. */
        $this->lang->report->menu = $this->lang->{$module}->menu;
        $this->lang->menuGroups->report = $module;

        if($_POST)
        {
            $checkedCharts = $this->post->charts;
            foreach($checkedCharts as $chart)
            {
                if(!isset($this->config->report->{$module}->chartList[$chart])) continue;
                $groupBy = $this->config->report->{$module}->chartList[$chart];

                /* merge options. */
                $chartOption = clone $this->lang->report->options;
                $chartOption->item = $this->lang->report->{$module}->item[$chart];
                if(isset($this->lang->report->{$module}->xAxisName[$chart])) $chartOption->graph->xAxisName = $this->lang->report->{$module}->xAxisName[$chart];
                if(isset($this->lang->report->{$module}->chartList[$chart])) $chartOption->graph->caption   = $this->lang->report->{$module}->chartList[$chart];

                /* add charts for multi currency. */
                $currencyList = $this->loadModel('common', 'sys')->getCurrencyList();
                if(strpos($groupBy, '`real`') !== false or strpos($groupBy, 'amount') !== false or strpos($groupBy, 'money') !== false)
                {
                    $caption = $chartOption->graph->caption;
                    foreach($currencyList as $key => $currency)
                    {
                        $chartOption->graph->caption = $caption . "($currency)";
                        $chartData = $this->report->getChartData($module, $chart, $tableName, $groupBy, $key);
                        $sum       = $this->report->computeSum($chartData);
                        if(empty($chartData) or $sum == 0) continue;

                        $charts["$chart$key"] = $chartOption;
                        $datas["$chart$key"]  = $this->report->computePercent($chartData);

                        $tips['caption']["$chart$key"] = $chartOption->graph->caption;
                        $tips['item']["$chart$key"]    = $this->lang->report->{$module}->item[$chart];
                        $tips['value']["$chart$key"]   = $this->lang->report->{$module}->value[$chart];
                    }
                }
                else
                {
                    $chartData = $this->report->getChartData($module, $chart, $tableName, $groupBy);
                    $charts[$chart] = $chartOption;
                    $datas[$chart]  = $this->report->computePercent($chartData);

                    $tips['caption'][$chart] = $chartOption->graph->caption;
                    $tips['item'][$chart]    = $this->lang->report->{$module}->item[$chart];
                    $tips['value'][$chart]   = $this->lang->report->{$module}->value[$chart];
                }
            }
        }

        $this->view->title         = $this->lang->report->common . '#' . $this->lang->report->{$module}->common;
        $this->view->module        = $module;
        $this->view->chartList     = $this->lang->report->{$module}->chartList;
        $this->view->checkedCharts = $checkedCharts;
        $this->view->charts        = $charts;
        $this->view->datas         = $datas;
        $this->view->tips          = $tips;
        $this->display();
    }
}

<?php
/**
 * The report view file of report module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     report
 * @version     $Id: report.html.php 1594 2011-03-13 07:27:55Z wwccss $
 * @link        http://www.ranzhico.com
 */
?>
<?php include $app->getModuleRoot() . 'common/view/header.html.php';?>
<?php include '../../common/view/chart.html.php';?>
<div class='row'>
  <div class='col-md-3 col-lg-2'>
    <div class='panel panel-sm'>
      <div class='panel-heading'><strong><?php echo $lang->report->select;?></strong></div>
      <div class='panel-body'>
        <form method='post'>
          <?php echo html::checkBox('charts', $lang->report->{$module}->chartList, $checkedCharts, '', 'block');?>
          <p><?php echo html::selectButton();?></p>
          <p><?php echo html::submitButton($lang->report->create);?></p>
        </form>
      </div>
    </div>
  </div>
  <div class='col-md-9 col-lg-10'>
    <div class='panel panel-sm'>
      <div class='panel-heading'><strong><?php echo $lang->report->common;?></strong></div>
      <table class='table active-disabled'>
        <?php foreach($charts as $chartType => $chartOption):?>
        <tr class='text-top'>
          <td>
            <div class='chart-wrapper text-center'>
              <h5><?php echo $tips['caption'][$chartType];?></h5>
              <div class='chart-canvas'><canvas id='chart-<?php echo $chartType ?>' width='<?php echo $chartOption->width;?>' height='<?php echo $chartOption->height;?>' data-responsive='true'></canvas></div>
            </div>
          </td>
          <td style='width: 320px'>
            <div style="overflow:auto;" class='table-wrapper'>
              <table class='table table-condensed table-hover table-striped table-bordered table-chart' data-chart='<?php echo $chartOption->type; ?>' data-target='#chart-<?php echo $chartType ?>' data-animation='false'>
                <caption class='text-left'><?php echo $tips['caption'][$chartType];?></caption>
                <thead>
                  <tr>
                    <th class='w-20px'></th>
                    <th><?php echo $tips['item'][$chartType];?></th>
                    <th><?php echo $tips['value'][$chartType];?></th>
                    <th><?php echo $lang->report->percent;?></th>
                  </tr>
                </thead>
                <tbody>
                <?php foreach($datas[$chartType] as $key => $data):?>
                <tr class='text-center'>
                  <td class='chart-color'><i class='chart-color-dot icon-circle'></i></td>
                  <td class='chart-label'><?php echo $data->name;?></td>
                  <td class='chart-value'><?php echo $data->value;?></td>
                  <td><?php echo ($data->percent * 100) . '%';?></td>
                </tr>
                <?php endforeach;?>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <?php endforeach;?>
      </table>
    </div>
  </div>
</div>
<?php include $app->getModuleRoot() . 'common/view/footer.html.php';?>

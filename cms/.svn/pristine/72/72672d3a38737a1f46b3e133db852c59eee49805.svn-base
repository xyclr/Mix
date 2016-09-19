<?php
/**
 * The admin view of entry module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     entry 
 * @version     $Id: html.php 7488 2013-12-26 07:26:10Z zhujinyong $
 * @link        http://www.ranzhico.com
 */
?>
<?php
$webRoot   = $config->webRoot;
$jsRoot    = $webRoot . "js/";
$themeRoot = $webRoot . "theme/";
include "../../common/view/chosen.html.php";
?>
<form method='post' id='blockForm' class='form form-horizontal' action='<?php echo $this->createLink('block', 'set', "index=$index&type=system")?>'>
  <table class='table table-form'>
    <tbody>
      <tr>
        <th class='w-100px'><?php echo $lang->block->name;?></th>
        <td>
        <?php
        echo html::input('title', isset($block->title) ? $block->title : '', "class='form-control'");
        echo html::hidden('block', $blockID) . html::hidden('source', $entryID);
        ?>
        </td>
      </tr>
      <tr>
        <th><?php echo $lang->block->style;?></th>
        <td>
          <div class='w-240px'>
            <div class='input-group'>
              <span class='input-group-addon'><?php echo $lang->block->grid;?></span>
              <?php echo html::select('grid', $config->block->gridOptions, $block ? $block->grid : 4, "class='form-control'")?>
              <div class='input-group-btn block'>
                <?php $btn = isset($block->params->color) ? 'btn-' . $block->params->color : 'btn-default'?>
                <button type='button' class="btn <?php echo $btn;?> dropdown-toggle" data-toggle='dropdown'>
                  <?php echo $lang->block->color;?> <span class='caret'></span>
                </button>
                <?php echo html::hidden('params[color]', isset($block->params->color) ? $block->params->color : 'default');?>
                <div class='dropdown-menu buttons'>
                  <li><button type='button' data-id='default' class='btn btn-block btn-default'>&nbsp;</button></li>
                  <li><button type='button' data-id='primary' class='btn btn-block btn-primary'>&nbsp;</button></li>
                  <li><button type='button' data-id='warning' class='btn btn-block btn-warning'>&nbsp;</button></li>
                  <li><button type='button' data-id='danger' class='btn btn-block btn-danger'>&nbsp;</button></li>
                  <li><button type='button' data-id='success' class='btn btn-block btn-success'>&nbsp;</button></li>
                  <li><button type='button' data-id='info' class='btn btn-block btn-info'>&nbsp;</button></li>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <?php foreach($params as $key => $param):?>
      <tr>
        <th><?php echo $param['name']?></th>
        <td>
        <?php
          if(!isset($param['control'])) $param['control'] = 'input';
          if(!method_exists('html', $param['control'])) $param['control'] = 'input';

          $control = $param['control'];
          $attr    = empty($param['attr']) ? '' : $param['attr'];
          $default = $block ? (isset($block->params->$key) ? $block->params->$key : '') : (isset($param['default']) ? $param['default'] : '');
          $options  = isset($param['options']) ? $param['options'] : array();
          if($control == 'select' or $control == 'radio' or $control == 'checkbox')
          {
              $chosen = $control == 'select' ? 'chosen' : '';
              if(strpos($attr, 'multiple') !== false)
              {
                  echo html::$control("params[$key][]", $options, $default, "class='form-control " . $chosen . "' $attr");
              }
              else
              {
                  echo html::$control("params[$key]", $options, $default, "class='form-control " . $chosen . "' $attr");
              }
          }
          else
          {
              echo html::$control("params[$key]", $default, "class='form-control' $attr");
          }
        ?>
        </td>
      </tr>
      <?php endforeach;?>
    </tbody>
    <tfoot>
      <tr><th></th><td><?php echo html::submitButton()?></td></tr>
    </tfoot>
  </table>
</form>
<?php if(!isset($block->name)):?>
<script>
$(function()
{
    options = $('#entryBlock').find("option").text();
    if(options.indexOf($('#title').val()) >= 0) $('#title').val($('#entryBlock').find("option:selected").text());
})
</script>
<?php endif;?>

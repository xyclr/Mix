<?php
/**
 * The view view file of webapp module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     webapp
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.modal.html.php';?>
<div class='main'>
  <table class='table table-data table-condensed table-borderless'>
    <?php if($type == 'local'):?>
    <tr>
      <th><?php echo $lang->webapp->module?></th>
      <td><?php echo $modules[$webapp->module]?></td>
    </tr>
    <?php endif;?>
    <tr>
      <th class='w-100px'><?php echo $lang->webapp->name?></th>
      <td><?php echo $webapp->name?></td>
    </tr>
    <tr>
      <th><?php echo $lang->webapp->url?></th>
      <td><?php echo $webapp->url?></td>
    </tr>
    <tr>
      <th><?php echo $lang->webapp->author?></th>
      <td><?php echo $webapp->author?></td>
    </tr>
    <tr>
      <th><?php echo $lang->webapp->target?></th>
      <td><?php echo $lang->webapp->targetList[$webapp->target]?></td>
    </tr>
    <?php if($webapp->target == 'popup'):?>
    <?php
    if(!array_key_exists($webapp->size, $lang->webapp->sizeList))
    {
        $size = $webapp->size;
        $webapp->size = 'custom';
    }
    ?>
    <tr>
      <th><?php echo $lang->webapp->size?></th>
      <td>
        <?php
        echo $lang->webapp->sizeList[$webapp->size];
        if(isset($size)) echo ' ： ' . $size;
        ?>
      </td>
    </tr>
    <?php endif;?>
    <tr>
      <th><?php echo $lang->webapp->abstract?></th>
      <td><?php echo $webapp->abstract?></td>
    </tr>
    <tr>
      <th><?php echo $lang->webapp->desc?></th>
      <td><?php echo $webapp->desc?></td>
    </tr>
    <?php if($type == 'local'):?>
    <tr>
      <th><?php echo $lang->webapp->addType?></th>
      <td><?php echo $lang->webapp->addTypeList[$webapp->addType]?></td>
    </tr>
    <tr>
      <th><?php echo $lang->webapp->addedBy?></th>
      <td><?php echo $users[$webapp->addedBy]?></td>
    </tr>
    <tr>
      <th><?php echo $lang->webapp->addedDate?></th>
      <td><?php echo $webapp->addedDate?></td>
    </tr>
    <?php endif;?>
    <?php if($type == 'api'):?>
    <tr>
      <th><?php echo $lang->webapp->downloads?></th>
      <td><?php echo $webapp->downloads?></td>
    </tr>
    <?php endif;?>
  </table>
</div>
<?php include '../../common/view/footer.modal.html.php';?>


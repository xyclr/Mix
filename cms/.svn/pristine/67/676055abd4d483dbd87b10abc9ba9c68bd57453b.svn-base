<?php
/**
 * The manage privilege by group view of group module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     group
 * @version     $Id: managepriv.html.php 1517 2011-03-07 10:02:57Z wwccss $
 * @link        http://www.ranzhico.com
 */
?>
<div class='list'>
<form class='form-inline' id='ajaxForm' method='post'>
  <?php foreach($lang->appModule as $app => $modules):?>
  <?php if($app != 'sys' and !isset($groupPrivs['apppriv'][$app])) continue;?>
  <div class='item'>
    <div class='item-content'>
      <table class='table table-hover table-bordered table-priv'> 
        <?php $i = 1;?>
        <?php foreach($lang->resource as $moduleName => $moduleActions):?>
        <?php if(!in_array($moduleName, $modules)) continue;?>
        <?php if(!$this->group->checkMenuModule($menu, $moduleName)) continue;?>
        <?php
        $this->app->loadLang($moduleName, $app);
        /* Check method in select version. */
        if($version)
        {
            $hasMethod = false;
            foreach($moduleActions as $action => $actionLabel)
            {
                if(strpos($changelogs, ",$moduleName-$actionLabel,") !== false)
                {
                    $hasMethod = true;
                    break;
                }
            }
            if(!$hasMethod) continue;
        }
        ?>
        <tr>
          <?php if($i == 1):?>
          <?php $rowspan = $app == 'crm' ? count($lang->appModule->$app) + 1 : count($lang->appModule->$app);?>
          <th rowspan="<?php echo $rowspan;?>" class='w-70px'>
            <label class="checkbox">
              <?php echo $lang->apps->$app;?>
              <input type="checkbox" class='checkApp' /> 
            </label>
          </th>
          <?php endif;?>
          <th class='text-right w-120px'>
            <label class="checkbox">
              <?php
              if($moduleName == 'user')
              {
                  echo $this->lang->user->colleagueMenu;
              }
              else
              {
                  echo isset($this->lang->$moduleName->common) ? $this->lang->$moduleName->common : $moduleName;
              }
              ?>
              <input type="checkbox" class='checkModule' /> 
            </label>
          </th>
          <td id='<?php echo $moduleName;?>'>
            <?php
            $options = array();
            foreach($moduleActions as $action => $actionLabel)
            {
                if(!empty($version) and strpos($changelogs, ",$moduleName-$actionLabel,") === false) continue;
                $options[$action] = $lang->$moduleName->$actionLabel;
            }
            echo html::checkbox("actions[$moduleName]", $options, isset($groupPrivs[$moduleName]) ? $groupPrivs[$moduleName] : '');
            ?>
          </td>
        </tr>
        <?php $i++;?>
        <?php endforeach;?>
        <?php if($app == 'crm'):?>
        <tr>
          <th class='text-right'><?php echo $lang->group->extent;?></th>
          <td>
            <label class='checkbox'>
              <?php $checked = isset($groupPrivs['crm']['manageAll']) ? 'checked' : '';?>
              <input type='checkbox' name='actions[crm][]' value='manageAll' class='manageAll' <?php echo $checked?> />
              <?php echo $lang->group->manageAll;?>
            </label>
          </td>
        </tr>
        <?php endif;?>
      </table>
    </div>
  </div>
  <?php endforeach;?>
  <div class='panel'>
    <div class='panel-footer text-center'>
    <?php 
    echo html::submitButton($lang->save);
    echo html::linkButton($lang->goback, $this->createLink('group', 'browse'));
    echo html::hidden('foo'); // Just a hidden var, to make sure $_POST is not empty.
    echo html::hidden('noChecked'); // Save the value of no checked.
    ?>
    </div>
  </div>
</form>
<script type='text/javascript'>
var groupID = <?php echo $groupID?>;
var menu    = "<?php echo $menu?>";
</script>

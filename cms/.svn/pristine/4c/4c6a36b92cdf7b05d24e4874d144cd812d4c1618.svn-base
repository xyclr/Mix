<?php include '../../common/view/header.html.php'; ?>
<div class='panel'>
  <div class='panel-heading'><strong><i class="icon-comments-alt"></i> <?php echo $lang->forum->threadList;?></strong></div>
  <table class='table table-hover table-striped tablesorter' id='threadList'>
    <?php if($threads):?>
    <thead>
      <tr class='text-center'>
        <?php $vars = "boardID=$boardID&orderBy=%s&recTotal={$pager->recTotal}&recPerPage={$pager->recPerPage}";?>
        <th class='text-center w-60px'><?php commonModel::printOrderLink('id', $orderBy, $vars, $lang->thread->id);?></th>
        <th><?php echo $lang->thread->title;?></th>
        <th class='w-120px'><?php commonModel::printOrderLink('author', $orderBy, $vars, $lang->thread->author);?></th>
        <th class='w-100px'><?php commonModel::printOrderLink('createdDate', $orderBy, $vars, $lang->thread->postedDate);?></th>
        <th class='w-60px'><?php commonModel::printOrderLink('views', $orderBy, $vars, $lang->thread->views);?></th>
        <th class='w-60px'><?php commonModel::printOrderLink('replies', $orderBy, $vars, $lang->thread->replies);?></th>
        <th class='w-200px'><?php commonModel::printOrderLink('repliedDate', $orderBy, $vars, $lang->thread->lastReply);?></th>
        <th class='w-80px'><?php commonModel::printOrderLink('hidden', $orderBy, $vars, $lang->thread->status);?></th>
        <th class='w-120px'><?php echo $lang->actions;?></th>
      </tr>  
    </thead>
    <?php endif;?>
    <tbody>
      <?php foreach($threads as $thread):?>
      <tr class='text-center'>
        <td><?php echo $thread->id;?></td>
        <td class='text-left'>
          <?php
          $iconRoot = $themeRoot . 'default/images/forum/';
          echo $thread->isNew ? "<span class='new-board'>&nbsp;</span>" : "<span class='common-board'>&nbsp;</span>";
          echo html::a(commonModel::createFrontLink('thread', 'view', "threadID=$thread->id"), $thread->title, "target='_blank'");
          ?>
        </td>
        <td><?php echo $thread->authorRealname;?></td>
        <td><?php echo substr($thread->createdDate, 5, -3);?></td>
        <td><?php echo $thread->views;?></td>
        <td><?php echo $thread->replies;?></td>
        <td class='text-left'><?php if($thread->replies) echo substr($thread->repliedDate, 5, -3) . ' ' . $thread->repliedByRealname;?></td>  
        <td class='text-left'><?php echo $thread->hidden ? '<span class="text-warning"><i class="icon-eye-close"></i> ' . $lang->thread->statusList['hidden'] .'</span>' : '<span class="text-success"><i class="icon-ok-sign"></i> ' . $lang->thread->statusList['normal'] . '</span>';?></td>
        <td>
        <?php echo html::a($this->createLink('thread', 'delete', "threadID=$thread->id"), $lang->delete, "class='reload'"); ?>
        <?php 
        if($thread->hidden)
        {
            echo html::a($this->createLink('thread', 'switchStatus', "threadID=$thread->id"), $lang->thread->show, "class='reload'"); 
        }
        else
        {
            echo html::a($this->createLink('thread', 'switchStatus', "threadID=$thread->id"), $lang->thread->hide, "class='reload'"); 
        }
        ?>
        <?php echo html::a($this->createLink('thread', 'transfer', "threadID=$thread->id"), $lang->thread->transfer, "data-toggle='modal'"); ?>
        </td>
      </tr>  
      <?php endforeach;?>
    </tbody>
    <tfoot><tr><td colspan='9'><?php $pager->show();?></td></tr></tfoot>
  </table>
</div>
<?php include '../../common/view/footer.html.php'; ?>

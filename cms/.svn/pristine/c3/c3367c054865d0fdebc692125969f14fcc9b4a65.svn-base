<?php
/**
 * The view file of view function of announce module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com> 
 * @package     announce 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<div class='article'>
  <header>
    <h3><?php echo $announce->title;?></h3>
    <dl class='dl-inline'>
      <dd data-toggle='tooltip' data-placement='top' data-original-title='<?php printf($lang->article->lblAuthor, $author->realname);?>'><i class='icon-user icon-large'></i> <?php echo $author->realname;?></dd>
      <dd data-toggle='tooltip' data-placement='top' data-original-title='<?php printf($lang->article->lblAddedDate, $announce->createdDate);?>'><i class='icon-time icon-large'></i> <?php echo $announce->createdDate;?></dd>
      <dd><span data-toggle='tooltip' data-placement='top' data-original-title='<?php printf($lang->article->lblViews, $announce->views);?>'><i class='icon-eye-open icon-large'></i> <?php echo $announce->views;?></span></dd>
    </dl>
  </header>
  <section class='announce-content'><?php echo $announce->content;?></section>
  <footer>
    <?php extract($prevAndNext);?>
    <ul class='pager pager-justify'>
      <?php if($prev):?>
      <li class='previous'><?php echo html::a(inlink('view', "id=$prev->id"), '<i class="icon-arrow-left"></i> ' . $prev->title);?></li>
      <?php else:?>
      <li class='preious disabled'><a href='###'><i class='icon-arrow-left'></i> <?php print($lang->article->none);?></a></li>
      <?php endif;?>
      <?php if($next):?>
      <li class='next'><?php echo html::a(inlink('view', "id=$next->id"), $next->title . ' <i class="icon-arrow-right"></i>');?></li>
      <?php else:?>
      <li class='next disabled'><a href='###'> <?php print($lang->article->none);?><i class='icon-arrow-right'></i></a></li>
      <?php endif;?>
    </ul>
  </footer>
</div>
<?php include '../../../sys/common/view/footer.modal.html.php';?>

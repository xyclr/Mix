<?php 
include '../../common/view/header.html.php'; 
include '../../common/view/treeview.html.php'; 

/* set categoryPath for topNav highlight. */
js::set('path',  json_encode($article->path));
js::set('articleID', $article->id);
?>
<?php $common->printPositionBar($category, $article);?>
<div class='row'>
  <div class='col-md-9'>
    <div class="article">
      <header>
        <h1><?php echo $article->title;?></h1>
        <dl class="dl-inline">
            <dd data-toggle="tooltip" data-placement="top" data-original-title="<?php printf($lang->article->lblAddedDate, $article->createdDate);?>"><i class="icon-time icon-large"></i> <?php echo $article->createdDate; ?></dd>
            <dd data-toggle="tooltip" data-placement="top" data-original-title="<?php printf($lang->article->lblAuthor, $article->author);?>"><i class="icon-user icon-large"></i> <?php echo $article->author; ?></dd>
            <?php if(!$article->original):?>
            <dt><?php echo $lang->article->lblSource; ?></dt>
            <dd><?php $article->copyURL ? print(html::a($article->copyURL, $article->copySite, "target='_blank'")) : print($article->copySite); ?></dd>
            <?php endif; ?>
            <dd class="pull-right">
              <?php if($article->original):?>
              <span class="label label-success"><?php echo $lang->article->originalList[$article->original]; ?></span>
              <?php endif;?>
              <span class="label label-warning" data-toggle="tooltip" data-placement="top" data-original-title="<?php printf($lang->article->lblViews, $article->views);?>"><i class="icon-eye-open"></i> <?php echo $article->views; ?></span>
              <a href="#commentBox" class="label label-info"><i class="icon-comment"></i> 0</a>
            </dd>
        </dl>
        <?php if($article->summary):?>
        <section class='abstract'><strong><?php echo $lang->article->summary;?></strong><?php echo $lang->colon . $article->summary;?></section>
        <?php endif; ?>
      </header>
      <section class="article-content">
        <?php echo $article->content;?>
      </section>
      <section>
        <?php $this->article->printFiles($article->files);?>
      </section>
      <footer>
        <?php if($article->keywords):?>
        <p class='small'><strong class="text-muted"><?php echo $lang->article->keywords;?></strong><span class="article-keywords"><?php echo $lang->colon . $article->keywords;?></span></p>
        <?php endif; ?>
        <?php extract($prevAndNext);?>
        <ul class="pager pager-justify">
          <?php if($prev): ?>
          <li class="previous"><?php echo html::a(inlink('view', "id=$prev->id", "category={$category->alias}&name={$prev->alias}"), '<i class="icon-arrow-left"></i> ' . $lang->article->prev . $lang->colon . $prev->title); ?></li>
          <?php else: ?>
          <li class="preious disabled"><a href="###"><i class="icon-arrow-left"></i> <?php print($lang->article->none); ?></a></li>
          <?php endif; ?>
          <?php if($next):?>
          <li class="next"><?php echo html::a(inlink('view', "id=$next->id", "category={$category->alias}&name={$next->alias}"), $lang->article->next . $lang->colon . $next->title . ' <i class="icon-arrow-right"></i>'); ?></li>
          <?php else:?>
          <li class="next disabled"><a href="###"> <?php print($lang->article->none); ?><i class="icon-arrow-right"></i></a></li>
          <?php endif; ?>
        </ul>
      </footer>
    </div>
    <div id='commentBox'><?php echo $this->fetch('message', 'comment', "objectType=article&objectID={$article->id}");?></div>
    <?php echo html::a('', '', "name='comment'");?>
  </div>
  <div class='col-md-3'><?php $this->block->printRegion($layouts, 'article_view', 'side');?></div>
</div>
<?php include '../../common/view/footer.html.php'; ?>

<?php include '../../common/view/header.html.php';?>
<?php js::set('articleID', $article->id)?>
<?php $common->printPositionBar($article->origins);?>
<div class='article'>
  <header>
    <h2><?php echo $article->title;?></h2>
    <dl class='dl-inline'>
      <dd data-toggle='tooltip' data-placement='top' data-original-title='<?php printf($lang->article->lblAddedDate, $article->createdDate);?>'><i class='icon-time icon-large'></i> <?php echo $article->createdDate; ?></dd>
      <dd data-toggle='tooltip' data-placement='top' data-original-title='<?php printf($lang->article->lblAuthor, $article->author);?>'><i class='icon-user icon-large'></i> <?php echo $article->author; ?></dd>
      <dd data-toggle='tooltip' data-placement='top' data-original-title='<?php printf($lang->article->lblViews, $article->views);?>'><i class='icon-eye-open'></i> <?php echo $article->views; ?></dd>
    </dl>
    <?php if($article->summary):?>
    <section class='abstract'><strong><?php echo $lang->book->summary;?></strong><?php echo $lang->colon . $article->summary;?></section>
    <?php endif; ?>
  </header>
  <section class='article-content'>
    <?php echo $content;;?>
  </section>
  <section>
    <?php $this->book->printFiles($article->files);?>
  </section>
  <footer>
    <?php if($article->keywords):?>
    <p class='small'><strong class='text-muted'><?php echo $lang->book->keywords;?></strong><span class='article-keywords'><?php echo $lang->colon . $article->keywords;?></span></p>
    <?php endif; ?>
    <?php extract($prevAndNext);?>
    <ul class='pager pager-justify'>
      <?php if($prev): ?>
      <li class='previous'><?php echo html::a(inlink('read', "articleID=$prev->id", "book={$book->alias}&node={$prev->alias}"), "<i class='icon-arrow-left'></i> " . $lang->book->prev . $lang->colon . $prev->title); ?></li>
      <?php else: ?>
      <li class='preious disabled'><a href='###'><i class='icon-arrow-left'></i> <?php print($lang->book->none); ?></a></li>
      <?php endif; ?>
      <li><?php echo html::a(inlink('browse', "bookID={$parent->id}", "book={$book->alias}&title={$parent->alias}"), "<i class='icon-list-ul'></i> " . $lang->book->chapter);?></li>
      <?php if($next):?>
      <li class='next'><?php echo html::a(inlink('read', "articleID=$next->id", "book={$book->alias}&node={$next->alias}"), $lang->book->next . $lang->colon . $next->title . " <i class='icon-arrow-right'></i>"); ?></li>
      <?php else:?>
      <li class='next disabled'><a href='###'> <?php print($lang->book->none); ?><i class='icon-arrow-right'></i></a></li>
      <?php endif; ?>
    </ul>
  </footer>
</div>
<div id='commentBox'><?php echo $this->fetch('message', 'comment', "objectType=book&objectID=$article->id");?></div>
<?php include '../../common/view/footer.html.php'; ?>

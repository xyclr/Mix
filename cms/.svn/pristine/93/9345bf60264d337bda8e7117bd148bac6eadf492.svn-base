<?php
/**
 * The ajaxGetMatchedItems view file of project module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     project 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php if(!$projects) echo sprintf($lang->project->noMatched, $keywords);?>
<ul>
<?php
foreach($projects as $project)
{
    echo "<li>" . html::a(sprintf($link, $project->id), $project->name). "</li>";
}
?>
</ul>

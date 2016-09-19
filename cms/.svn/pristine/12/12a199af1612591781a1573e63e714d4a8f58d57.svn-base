<?php
/**
 * The export view file of file module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     file 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../../sys/common/view/header.lite.html.php';?>
<script>
function setDownloading()
{
    if(/opera/.test(navigator.userAgent.toLowerCase())) return true;   // Opera don't support, omit it.

    $.cookie('downloading', 0);
    time = setInterval("closeWindow()", 300);
    return true;
}

function closeWindow()
{
    if($.cookie('downloading') == 1)
    {
        parent.$.zui.closeModal();
        $.cookie('downloading', null);
        clearInterval(time);
    }
}
</script>
<form class='form-condensed' method='post' target='hiddenwin' onsubmit='setDownloading();' style='padding: 0 5% 30px'>
  <table class='w-p100'>
    <tr>
      <td>
        <div class='input-group'>
          <span class='input-group-addon'><?php echo $lang->setFileName;?></span>
          <?php echo html::input('fileName', isset($fileName) ? $fileName : '', 'class=form-control');?>
        </div>
      </td>
      <td class='w-90px'><?php echo html::select('encode', $config->charsets[$this->cookie->lang], 'utf-8', "class='form-control'");?></td>
      <td><?php echo html::submitButton($lang->export);?></td>
    </tr>
  </table>
</form>
<iframe id='hiddenwin' name='hiddenwin' class='hidden'></iframe>
<?php include '../../../sys/common/view/footer.html.php';?>

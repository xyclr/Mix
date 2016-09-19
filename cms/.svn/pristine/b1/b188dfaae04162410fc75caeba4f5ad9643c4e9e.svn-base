<?php
/**
 * The chosen view of common module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     common 
 * @version     $Id: chosen.html.php 7417 2013-12-23 07:51:50Z wwccss $
 * @link        http://www.ranzhico.com
 */
if($extView = $this->getExtViewFile(__FILE__)){include $extView; return helper::cd();}
css::import($jsRoot . 'jquery/chosen/min.css');
js::import($jsRoot . 'jquery/chosen/min.js');
?>
<script language='javascript'> 
$(document).ready(function()
{
    $(".chosen").chosen({no_results_text: '<?php echo $lang->noResultsMatch;?>', placeholder_text:' ', disable_search_threshold: 10, width: '100%'});
});
</script>

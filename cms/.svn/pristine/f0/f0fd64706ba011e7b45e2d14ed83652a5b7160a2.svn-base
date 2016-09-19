<?php
/**
 * The export2csv view file of file module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     file 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php
echo '"'. implode('","', $fields) . '"' . "\n";
foreach($rows as $row)
{
    echo '"';
    foreach($fields as $fieldName => $fieldLabel)
    {
        isset($row->$fieldName) ? print(strip_tags($row->$fieldName)) : print('');
        echo '","';
    }
    echo '"' . "\n";
}

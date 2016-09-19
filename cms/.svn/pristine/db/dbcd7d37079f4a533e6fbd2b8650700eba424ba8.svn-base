<?php 
/**
 * The contact List block file of contact module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Xiying Guan <guanxiying@xirangit.com>
 * @package     common 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php foreach($contacts as $contact):?>
<div class='panel' <?php if($contact->left) echo "title='" . sprintf($lang->contact->leftAt, $contact->left) . "'";?>>
  <table class='table table-bordered table-contact'>
    <tr>
      <th class='w-120px text-center alert v-middle'>
        <?php $class = $contact->maker ? "class='text-red'" : "";?>
        <?php $class = $contact->left ? "class='text-strike'" : "";?>
        <span class='lead'><?php echo html::a($this->createLink('contact', 'view', "contactID=$contact->id"), $contact->realname, $class);?></span>
        <div><?php echo $contact->dept . ' ' . $contact->title;?></div>
      </th>
      <td>
        <div class='row'>
        <div class='col-sm-10'>
        <div class='contact-info'>
          <?php $companyName = isset($config->company->name) ? $config->company->name : '';?>
          <?php if($contact->phone or $contact->mobile) echo "<div><i class='icon-phone-sign'></i> $contact->phone $contact->mobile</div>";?>
          <?php if($contact->qq) echo "<div class='f-14'><i class='icon-qq'></i> " . html::a("http://wpa.qq.com/msgrd?v=3&uin={$contact->qq}&site={$companyName}&menu=yes", $contact->qq, "target='_blank'") . "</div>";?>
          <?php if($contact->email) echo "<div class='f-14'><i class='icon-envelope-alt'></i> " . html::mailto($contact->email, $contact->email) . "</div>";?>
        </div>
        <p class='vcard text-center'><?php echo html::image(helper::createLink('contact', 'vcard', "contactID={$contact->id}"), "style='height:120px'");?></p>
        </div>
        <div class='col-sm-2'>
        <div class='text-right'><i class='btn-vcard icon icon-qrcode icon-large'> </i></div>
        </div>
        </div>
      </td>
    </tr>
  </table>
</div>
<?php endforeach;?>
<?php if(isset($pageJS)) js::execute($pageJS);?>

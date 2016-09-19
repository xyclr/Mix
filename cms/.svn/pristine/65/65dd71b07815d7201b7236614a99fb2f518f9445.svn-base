<?php 
/**
 * The view file of view method in provider module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     provider 
 * @version     $Id$
 * @link        http://www.ranzhico.com
 */
?>
<?php include '../../common/view/header.html.php';?>
<div class='row'>
  <div class='col-md-8'>
    <div class='panel'>
      <div class='panel-heading'>
        <strong><i class="icon-list-info"></i> <?php echo $provider->name . $lang->provider->desc;?></strong>
      </div>
      <div class='panel-body'><?php echo $provider->desc;?></div>
    </div>
    <?php echo $this->fetch('action', 'history', "objectType=customer&objectID={$provider->id}")?>
    <div class='page-actions'>
      <?php
      echo "<div class='btn-group'>";
      commonModel::printLink('provider', 'edit', "providerID=$provider->id", $lang->edit, "class='btn'");
      commonModel::printLink('provider', 'delete', "providerID=$provider->id", $lang->delete, "class='deleter btn'");
      echo '</div>';

      $browseLink = $this->session->providerList ? $this->session->providerList : inlink('browse');
      echo html::a($browseLink, $lang->goback, "class='btn btn-default'");
      ?>
    </div>
  </div>
  <div class='col-md-4'>  
    <div class='panel'>
      <div class='panel-heading'><strong><i class="icon-list-info"></i> <?php echo $lang->provider->basicInfo;?></strong></div>
      <table class='table table-info'>
        <tr>
          <th class='w-50px'><?php echo $lang->provider->size;?></th>
          <td><?php echo $lang->provider->sizeList[$provider->size];?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->type;?></th>
          <td><?php echo $lang->provider->typeList[$provider->type];?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->industry;?></th>
          <td><?php echo zget($industries, $provider->industry);?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->area;?></th>
          <td><?php echo zget($areas, $provider->area);?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->weibo;?></th>
          <td><?php echo html::a("$provider->weibo", $provider->weibo, "target='_blank'");?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->weixin;?></th>
          <td><?php echo $provider->weixin;?></td>
        </tr>
        <tr>
          <th><?php echo $lang->provider->site;?></th>
          <td><?php echo html::a("$provider->site", $provider->site, "target='_blank'");?></td>
        </tr>
      </table>
    </div>
    <?php foreach($contacts as $contact):?>
    <div class='panel' <?php if($contact->left) echo "title='" . sprintf($lang->contact->leftAt, $contact->left) . "'";?>>
      <table class='table table-bordered table-contact'>
        <tr>
          <th class='w-120px text-center alert v-middle'>
            <?php $class = $contact->maker ? "class='text-red'" : "";?>
            <span class='lead'><?php echo html::a('###', $contact->realname, "id={$contact->id} {$class}");?></span>
            <?php if($contact->left):?>
            <span><i class='icon-lock text-muted'></i></span>
            <?php endif;?>
            <div><?php echo $contact->dept . ' ' . $contact->title;?></div>
          </th>
          <td>
            <div class='col-sm-10'>
              <div class='contact-info'>
                <?php if($contact->phone or $contact->mobile) echo "<div><i class='icon-phone-sign'></i> $contact->phone $contact->mobile</div>";?>
                <?php if($contact->qq) echo "<div class='f-14'><i class='icon-qq'></i> $contact->qq</div>";?>
                <?php if($contact->email) echo "<div class='f-14'><i class='icon-envelope-alt'></i> $contact->email </div>";?>
              </div>
              <p class='vcard text-center'><?php echo html::image(helper::createLink('crm.contact', 'vcard', "contactID={$contact->id}"), "style='height:120px'");?></p>
            </div>
            <div class='text-right col-sm-2'>
              <i class='btn-vcard icon icon-qrcode icon-2x text-info'> </i>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <?php endforeach;?>
  </div>
</div>
<?php include '../../common/view/footer.html.php';?>

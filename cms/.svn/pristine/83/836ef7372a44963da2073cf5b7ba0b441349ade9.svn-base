<div class='modal-dialog w-600px'>
  <div class='modal-content'>
    <div class='modal-header'>
      <?php echo html::closeButton();?>
      <h4 class='modal-title' id='myModalLabel'><i class='icon-mail-reply'></i> <?php echo $lang->message->reply . ':' . $message->from;?></h4>
    </div>
    <div class='modal-body'>
      <form id='replyForm' method='post' action="<?php echo inlink('reply', "messageID={$message->id}");?>">
        <table class='table table-form'>
          <tr>
            <th class='w-80px'><?php echo $lang->message->from;?></th>
            <td>
              <div class='required required-wrapper'></div>
              <?php echo html::input('from', $app->user->realname, "class='form-control'");?>
            </td>
          </tr>
          <tr>
            <th><?php echo $lang->message->content;?></th>
            <td>
              <div class='required required-wrapper'></div>
              <?php echo html::textarea('content', '', "class='form-control' rows='5'");?>
            </td>
          </tr>
          <tr><td></td><td><?php echo html::submitButton();?></td></tr>
        </table>
      </form>
    </div>
  </div>
</div>
<?php if(isset($pageJS)) js::execute($pageJS);?>

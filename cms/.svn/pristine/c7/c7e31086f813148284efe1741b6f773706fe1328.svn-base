<?php
/**
 * The calendar view file of todo module of ZenTaoPMS.
 *
 * @copyright   Copyright 2009-2010 QingDao Nature Easy Soft Network Technology Co,LTD (www.cnezsoft.com)
 * @license     ZPL
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     todo
 * @version     $Id$
 * @link        http://www.zentao.net
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../../sys/common/view/datepicker.html.php';?>
<?php include '../../../sys/common/view/calendar.html.php';?>
<?php js::set('settings', new stdclass());?>
<?php js::set('settings.startDate', $date == 'future' ? date('Y-m-d') : date('Y-m-d', strtotime($date)));?>
<?php js::set('settings.data', $data);?>
<div class='with-side <?php echo $this->cookie->todoCalendarSide == 'hide' ? 'hide-side' : ''?>'>
  <div class='side'>
    <div class='side-handle'>
      <?php $class = $this->cookie->todoCalendarSide == 'hide' ? 'icon-collapse-full' : 'icon-expand-full'?>
      <?php echo html::a('###', "<i class='$class'></i>", "title='{$lang->todo->periods['future']}' class='btn'")?>
    </div>
    <ul id="myTab" class="nav nav-tabs">
      <li class="active"><a href="#tab_custom" data-toggle="tab"><?php echo $lang->todo->periods['future']?></a></li>
      <li><a href="#tab_task" data-toggle="tab"><?php echo $lang->task->common;?></a></li>
      <li><a href="#tab_order" data-toggle="tab"><?php echo $lang->order->common;?></a></li>
      <li><a href="#tab_customer" data-toggle="tab"><?php echo $lang->customer->common;?></a></li>
    </ul>
    <div class='tab-content'>
      <?php foreach($todoList as $type => $todos):?>
      <div class='tab-pane fade in <?php echo $type == 'custom' ? 'active' : ''?>' id='tab_<?php echo $type;?>'>
        <?php foreach($todos as $id => $todo):?>
        <?php if($type == 'custom'):?>
        <div class='board-item' data-id='<?php echo $todo->id?>' data-name='<?php echo $todo->name?>' data-type='<?php echo $todo->type?>' data-begin='<?php echo $todo->begin?>' data-end='<?php echo $todo->end?>' data-action='edit' data-toggle="droppable" data-target=".day">
          <?php echo html::a($this->createLink('oa.todo', 'view', "id=$todo->id"), $todo->name, "data-toggle='modal'")?>
        </div>
        <?php endif;?>
        <?php endforeach;?>
      </div>
      <?php endforeach;?>
    </div>
  </div>
  <div class='calendar main'>
    <div class='day trash' data-date='1970-01-01' title='<?php echo $lang->delete?>'><i class="icon icon-trash"></i></div>
  </div>
</div>
<script>
function updateCalendar()
{
    var calendar = $('.calendar').data('zui.calendar');
    var date = calendar.date.format('yyyyMMdd');
    $.get(createLink('oa.todo', 'calendar', 'date=' + date, 'json'), function(response)
    {
        if(response.status == 'success')
        {
            var data = JSON.parse(response.data);
            for(e in data.data.events) 
            {
                data.data.events[e]['start'] = new Date(data.data.events[e]['start']);
                data.data.events[e]['end']   = new Date(data.data.events[e]['end']);
            }
            calendar.events = data.data.events;
            v.settings.data.events = data.data.events;
            calendar.display();
        }
    }, 'json');
}

/* Finish a todo. */
function finishTodo(id)
{
    $.get(createLink('oa.todo', 'finish', 'todoId=' + id, 'json'),function(response)
    {
        if(response.result == 'success')
        {
            if(response.confirm)
            {
                if(confirm(response.confirm.note))
                {   
                    $.openEntry(response.confirm.entry, response.confirm.url);
                }   
            }
            if(response.message) $.zui.messager.success(response.message);
        }
        updateCalendar();
        return false;
    }, 'json');
}

/* Adjust calendar width. */
function adjustWidth()
{
    var weekendEvents = 0;
    var width = 80;
    $('.calendar tbody.month-days tr.week-days').each(function()
    {
        weekendEvents += $(this).find('td').eq(5).find('.event').size();
        weekendEvents += $(this).find('td').eq(6).find('.event').size();
    });
    if(weekendEvents == 0)
    {
        $('.calendar tr.week-head th').width('auto');
        $('.calendar tr.week-head th').eq(5).width(width);
        $('.calendar tr.week-head th').eq(6).width(width - 10);
        $('.calendar tbody.month-days tr.week-days').each(function()
        {
            $(this).find('td').width('auto');
            $(this).find('td').eq(5).width(width);
            $(this).find('td').eq(6).width(width - 10);
        });
    }
    else
    {
        $('.calendar tr.week-head th').removeAttr('style');
        $('.calendar tbody.month-days tr.week-days').each(function()
        {
            $(this).find('td').removeAttr('style');
        });
    }
}

/* Add +. */
function appendAddLink()
{
    $('.calendar tbody.month-days tr.week-days td.cell-day div.day div.heading .number').each(function()
    {
        var $this = $(this);
        $this.parent().find('.icon-plus').remove();

        thisDate = new Date($this.parents('div.day').attr('data-date'));
        year     = thisDate.getFullYear();
        month    = thisDate.getMonth();
        day      = thisDate.getDate();
        if(year > v.y || (year == v.y && month > v.m) || (year == v.y && month == v.m && day >= v.d))
        {
            $this.after(" <span class='text-muted icon-plus'>&nbsp;<\/span>")
        }
    });
}

/* Add calendar event handler. */
v.date = new Date();
v.d    = v.date.getDate();
v.m    = v.date.getMonth();
v.y    = v.date.getFullYear();

if(typeof(v.settings) == 'undefined') v.settings = {};
if(typeof(v.settings.data) == 'undefined') v.settings.data = {};
v.settings.clickCell = function(event)
{
    if(event.view == 'month')
    {
        var date = event.date;
        var year   = date.getFullYear();
        var month  = date.getMonth();
        var day    = date.getDate();
        if(year > v.y || (year == v.y && month > v.m) || (year == v.y && month == v.m && day >= v.d))
        {
            month = month + 1;
            if(day <= 9) day = '0' + day;
            if(month <= 9) month = '0' + month;
            var todourl = createLink('todo', 'batchCreate', "date=" + year + '' + month + '' + day, '', true);

            $.zui.modalTrigger.show({width: '85%', url: todourl});
        }
    }
};

v.settings.beforeChange = function(event)
{
    if(event.change == 'start')
    {
        var data = {
            'date': event.to.format('yyyy-MM-dd'),
            'name': event.event.title,
            'type': event.event.calendar
        }
        if(!event.event.allDay)
        {
            data.begin = event.event.start.format('hh:mm');
            data.end = event.event.end.format('hh:mm');
        }
        if(data.date == '1970-01-01')
        {
            /* Delete. */
            var link = createLink('oa.todo', 'delete', 'id=' + event.event.id);
        }
        else
        {
            /* Edit. */
            var link = createLink('oa.todo', 'edit', 'id=' + event.event.id);
        }

        $.post(link, data, function(response)
        {
            if(response.result == 'success' && response.message)
            {
                $.zui.messager.success(response.message);
            }
            updateCalendar();
        }, 'json');
    }
};

v.settings.display = function(event)
{
    for(key in v.settings.data.events)
    {
        var e = v.settings.data.events[key];
        if(e.data.status != 'done')
        {
            $('.events .event[data-id=' + e.id + ']').append("<div class='action'><a href='javascript:;' class='finish'><?php echo $lang->todo->finish?><\/a>\n<\/span>").addClass('with-action');
            $('.events .event[data-id=' + e.id + '] .action .finish').click(function()
            {
                var id = $(this).closest('.event').data('id');
                finishTodo(id);
                return false;
            });
        }
        if(e.data.status == 'done')
        {
            $('.events .event[data-id=' + e.id + ']').css('background-color', '#38B03F');
        }
    }
    adjustWidth();
    appendAddLink();
}

v.settings.clickNextBtn  = updateCalendar;
v.settings.clickPrevBtn  = updateCalendar;
v.settings.clickTodayBtn = updateCalendar;
</script>
<?php include '../../common/view/footer.html.php';?>

<?php
/**
 * The calendar view of common module of RanZhi.
 *
 * @copyright   Copyright 2009-2015 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv11.html)
 * @author      chujilu <chujilu@cnezsoft.com>
 * @package     common 
 * @version     $Id: calendar.html.php 2508 2015-01-26 08:32:52Z chujilu $
 * @link        http://www.ranzhico.com
 */
if($extView = $this->getExtViewFile(__FILE__)){include $extView; return helper::cd();}
$clientLang = $this->app->getClientLang();
$jsRoot     = $config->webRoot . "js/";
css::import($jsRoot . 'calendar/zui.calendar.min.css');
js::import($jsRoot  . 'calendar/zui.calendar.min.js'); 
?>
<script language='javascript'>
$(function()
{
    $('div.calendar').each(function()
    {
        var calendarObj = $(this);
        var settings    = {};
        if(typeof v.settings != 'undefined') settings = v.settings;

        /* Get setting from div. */
        var divData = calendarObj.data();
        for(key in divData) settings[key] = divData[key];

        /* Get data from table. */
        var calendars = new Array();
        calendarObj.find(".calendar-data .calendar-calendar").each(function()
        {
            var rowObj = $(this);
            var calendar = new Array();
            if(rowObj.find('.name').length)  calendar['name']  = rowObj.find('.name').text();
            if(rowObj.find('.title').length) calendar['title'] = rowObj.find('.title').text();
            if(rowObj.find('.desc').length)  calendar['desc']  = rowObj.find('.desc').text();
            if(rowObj.find('.color').length) calendar['color'] = rowObj.find('.color').text();
            calendars.push(calendar);
        });
        var events = new Array();
        calendarObj.find(".calendar-data .calendar-row").each(function()
        {
            var rowObj = $(this);
            var event = new Array();
            event['data'] = rowObj.data();
            if(rowObj.find('.title').length)    event['title']      = rowObj.find('.title').text();
            if(rowObj.find('.desc').length)     event['desc']       = rowObj.find('.desc').text();
            if(rowObj.find('.allDay').length)   event['allDay']     = rowObj.find('.allDay').text();
            if(rowObj.find('.start').length)    event['start']      = rowObj.find('.start').text();
            if(rowObj.find('.end').length)      event['end']        = rowObj.find('.end').text();
            if(rowObj.find('.calendar').length) event['calendar']   = rowObj.find('.calendar').text();
            if(rowObj.find('.click').length)    event['click']      = rowObj.find('.click').data();
            events.push(event);
        });
        if(calendarObj.find(".calendar-data").length) settings.data = {'calendars':calendars, 'events':events};
        calendarObj.find(".calendar-data").remove();

        /* Add default click event. */
        settings.clickEvent = function(event)
        {
            if(event.event.click != undefined)
            {
                $.zui.modalTrigger.show(event.event.click);
            }
        }

        /* init calendar. */
        calendarObj.calendar(settings);
    });
});
</script>

$(function()
{
    /* Set ajaxform for create and edit. */
    $.setAjaxForm('#resumeForm', function(data)
    {   
        if(data.result == 'success')
        {
            if(data.locate == 'reload') return location.href = location.href;
            $.reloadAjaxModal(1500);
        }
    });
})

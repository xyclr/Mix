$(function()
{
    /* Set ajaxform for create and edit. */
    $.setAjaxForm('#addressForm', function(data)
    {   
        if(data.result == 'success') $.reloadAjaxModal(1500);
    });

    /* Reload modal. */
    $('.reloadModal').click(function(){$.reloadAjaxModal()});
})

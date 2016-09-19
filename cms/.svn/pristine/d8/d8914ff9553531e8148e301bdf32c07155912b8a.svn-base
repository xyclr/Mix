$(document).ready(function()
{
    $.setAjaxForm('#uploadForm', function(response) 
    {
        if(response.result == 'success')
        {
            setTimeout(function()
            {
                $('#ajaxModal').attr('rel', response.locate).load(response.locate, function()
                {
                    $.zui.ajustModalPosition();
                });
            }, 2000);
        }
    });
});


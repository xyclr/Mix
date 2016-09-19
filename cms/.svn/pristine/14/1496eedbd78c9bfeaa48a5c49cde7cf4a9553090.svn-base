$(document).ready(function()
{
    if($('body.body-modal').length)
    {
        $.setAjaxForm('#editRecord',function() { $.reloadIframeModal(); });
    }
    else
    {
        $.setAjaxForm('#editRecord', function(response){location.href = response.locate});
    }
});

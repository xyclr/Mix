$(document).ready(function()
{
    $.setAjaxForm('#startForm', function(response)
    {
        if(response.confirm)
        {
            if(confirm(response.confirm))
            {
                $('#doStart').val('yes');
                $('#startForm').submit();
            }
            return false;
        }
        else(response.result == 'success')
        {
            setTimeout(function(){location.href = response.locate;}, 1200);
        }
    })
})

$(document).ready(function()
{
    /* Compute request type. */
    $.get('sys/misc-pathinfo.php', function(result)
    {
        pos = result.indexOf('Fatal error');
        if(pos > 0) $('#requestType').val('PATH_INFO');
    });
});     

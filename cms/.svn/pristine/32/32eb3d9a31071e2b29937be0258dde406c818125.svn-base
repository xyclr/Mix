$(function()
{
    $.setAjaxJSONER('.backup', function(response)
    {
         if(response.message)
         {
             bootbox.alert(response.message, function()
             {
                 /* If the response has locate param, locate the browse. */
                 if(response.locate) return location.href = response.locate;
             });
         }
    });

    $(document).on('click', '.restore', function()
    {
        if(confirm(v.backup.confirmRestore))
        {
            var restore = $(this);
            restore.text(v.backup.waitting);

            $.getJSON(restore.attr('href'), function(response) 
            {
                 bootbox.alert(response.message, function()
                 {
                     /* If the response has locate param, locate the browse. */
                     if(response.locate) return location.href = response.locate;
                 });
            });
        }
        return false;
    });
})

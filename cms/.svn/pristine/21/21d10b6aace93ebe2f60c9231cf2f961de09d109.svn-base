$(document).ready(function()
{
    $.setAjaxJSONER('.review', function(response)
    {
        if(response.message)
        {
            bootbox.alert(response.message);
        }

        /* If the response has locate param, locate the browse. */
        if(response.locate == 'reload') return location.href = location.href;
        if(response.locate) return location.href = response.locate;
    });

    /* expand active tree. */
    $('.tree li.active .hitarea').click();
});

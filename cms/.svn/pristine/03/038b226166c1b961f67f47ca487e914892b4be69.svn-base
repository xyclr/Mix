function updatePrivTab()
{
    /* Hide all li and active tab. */
    $('#privTab').find('li').hide();
    $("div[id*=privs_]").removeClass('active');

    /* Show checked li and tab. */
    var first = true;
    $("input[name*=users]:checkbox").each(function()
    {
        if($(this).prop('checked') == true)
        {
            $("[href=#privs_" + $(this).attr('value') + "]").parent('li').show();
            if(first)
            {
                $("[href=#privs_" + $(this).attr('value') + "]").click();
                $("div[id*=privs_" + $(this).attr('value') + "]").addClass('active');
                first = false;
            }
        }
    });
}

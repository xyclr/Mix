/* Disabled user who selected. */
function updateMember()
{
    $('[name^=member]').find('option').prop('disabled', '');
    $('[name^=member]').find('[value=' + v.manager + ']').prop('disabled', 'disabled');
    $('[name^=member]').each(function()
    {
        var value = $(this).val();
        if(value != '')
        {
            $('[name^=member]').each(function()
            {
                if($(this).val() == '')
                {
                    $(this).find('[value=' + value + ']').prop('disabled', 'disabled');
                }
            });
        }
    });
    $('.chosen').trigger("chosen:updated");
}

$(document).ready(function()
{
    updateMember();
});

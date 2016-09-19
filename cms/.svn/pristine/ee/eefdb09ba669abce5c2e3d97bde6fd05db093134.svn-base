$(document).ready(function()
{
    /* show team menu. */
    $('[name^=multiple]').change(function()
    {
        var checkboxObj = $(this);
        var checked = checkboxObj.prop('checked');
        if(checked)
        {
            checkboxObj.parents('td').next('td').find('select').addClass('hidden');
            checkboxObj.parents('td').next('td').find('a').removeClass('hidden');
            checkboxObj.parents('tr').find('[id*=estimate]').attr('readonly', true);
        }
        else
        {
            checkboxObj.parents('td').next('td').find('select').removeClass('hidden');
            checkboxObj.parents('td').next('td').find('a').addClass('hidden');
            checkboxObj.parents('tr').find('[id*=estimate]').attr('readonly', false);
        }
    });

    /* update team title. */
    $('select[name^=team]').change(function()
    {
        var modal = $(this).closest('.modal');
        var title = '';
        modal.find('select[name^=team]').each(function()
        {
            if($(this).val() != '') title += ' ' + $(this).find('option[value=' + $(this).val() + ']').text();
        })
        modal.closest('td').next('td').find('a[class*=btn]').prop('title', title);
    });
});

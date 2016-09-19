$(document).ready(function()
{
    $(document).on('change', '.type', function()
    {
        var type = $(this).val();
        $(this).parents('tr').find('.in, .out').hide().attr('disabled', true).find('*').attr('disabled', true);
        $(this).parents('tr').find('.' + type).show().attr('disabled', false).find('*').attr('disabled', false);
        $(this).parents('tr').find('div.' + type).find('[id*=trader][id*=_chosen]').show();
        $(this).parents('tr').find('div.' + type).find('select').hide();
    })

    $('.type').change();
});

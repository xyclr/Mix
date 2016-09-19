$(document).ready(function()
{
    $(document).on('change', '.type', function()
    {
        var type = $(this).val();
        if(type == 'fee') type = $(this).next('input:hidden').val();
        $(this).parents('tr').find('.in, .out').hide().attr('disabled', true).find('*').attr('disabled', true);
        $(this).parents('tr').find('.' + type).show().attr('disabled', false).find('*').attr('disabled', false);
    })
    $('.type').change();

    $('[name*=createTrader]').each(function()
    {
        if($(this).prop('checked')) $(this).parents('.out').find('[id*=trader][id*=_chosen]').hide();
    })

    $('[name*=createCustomer]').each(function()
    {
        if($(this).prop('checked')) $(this).parents('.in').find('[id*=trader][id*=_chosen]').hide();
    })

    $('[name*=createCustomer]').change(function()
    {
        if($(this).prop('checked')) 
        {
            $(this).parents('.input-group').find('select').hide();
            $(this).parents('.input-group').find('[id*=trader][id*=_chosen]').hide();
            $(this).parents('.input-group').find('input[type=text][id*=customerName]').show().focus();
            $(this).parents('.input-group-addon').find('.icon-question').hide();
        }
        else
        {
            $(this).parents('.input-group').find('[id*=trader][id*=_chosen]').show();
            $(this).parents('.input-group').find('input[type=text][id*=customerName]').hide();
        }
    })
});

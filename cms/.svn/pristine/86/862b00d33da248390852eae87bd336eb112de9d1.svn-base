$(document).ready(function()
{
    /* Show real of an order and compute amount of the contract. */
    $(document).on('change', 'select.select-order', function()
    {
        $(this).parent().next('span').find(':input').val($(this).find('option:selected').attr('data-real'));
        $(this).parent().next('span').find('.order-currency').html(v.currencySign[$(this).find('option:selected').attr('data-currency')]);
        $(this).parent().next('span').find(':input').change();
    });

    /* Recompute amount when change real of an order.  */
    $(document).on('change', '.order-real', function()
    {
        var amount = 0;
        $('.order-real').each(function(){if($(this).val()) amount += parseFloat($(this).val()); });
        $('#amount').val(amount);
        $('#currency').val($('.order-real:first').parent().parent().prev('span').find('select').find('option:selected').attr('data-currency'));
    });

    $('#menu li').removeClass('active').find('[href*=' + v.mode + ']').parent().addClass('active');
    /* fix submenu active class if v.mode equal expire. */
    if(v.mode == 'expire') $('#menu li').find('[href*=expired]').parent().removeClass('active');
})

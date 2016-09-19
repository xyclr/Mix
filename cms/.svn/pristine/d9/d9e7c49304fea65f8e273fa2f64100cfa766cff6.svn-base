$(document).ready(function()
{
    $(document).on('change', '.amount', function()
    {
        if($('#receipt').find('option:selected').data('currency') != $('#payment').find('option:selected').data('currency'))
        {
            $('.transfer').show().find('input').attr('disabled', false);
            $('.money').hide().find('input').attr('disabled', true);
        }

        if($('#receipt').find('option:selected').data('currency') == $('#payment').find('option:selected').attr('data-currency'))
        {
            $('.money').show().find('input').attr('disabled', false);
            $('.transfer').hide().find('input').attr('disabled', true);
        }
    })

    $('.amount').change();
})

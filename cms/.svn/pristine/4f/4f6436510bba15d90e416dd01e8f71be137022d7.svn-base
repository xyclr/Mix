$(document).ready(function()
{
    $(document).on('change', '#feeRow1', function()
    {
        $(this).prop('checked') ? $('#fee').attr('disabled', 'disabled') : $('#fee').removeAttr('disabled');
    });

    $(document).on('change', '#diffCol1', function()
    {
        if($(this).prop('checked'))
        {
            $('.out,.in').show();
            $('#type,#money').attr('disabled', 'disabled');
        }
        else
        {
            $('.out,.in').hide();
            $('#type,#money').removeAttr('disabled', 'disabled');
        }
    });
    $('#diffCol1').change();
    $('#feeRow1').change();


    var menu =  $('#menu .nav li').size() == 0 ? '.nav li' : '#menu .nav li';
    $(menu + " a[href*='schema']").parent().addClass('active');
})

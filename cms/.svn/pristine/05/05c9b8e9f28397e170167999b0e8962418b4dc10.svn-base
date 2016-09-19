$(document).ready(function()
{
    $(document).on('change', '#type', function()
    {
        if($(this).find('option:selected').val() == 'bank')
        {
            $('.form-online').hide().find('input, select').attr('disabled', true);
            $('.form-bank').show().find('input, select').attr('disabled', false);
        }

        if($(this).find('option:selected').val() == 'online')
        {
            $('.form-bank').hide().find('input, select').attr('disabled', true);
            $('.form-online').show().find('input, select').attr('disabled', false);
        }

        if($(this).find('option:selected').val() == 'cash')
        {
            $('.form-bank, .form-online').hide().find('input, select').attr('disabled', true);
        }

        $.zui.ajustModalPosition();
    })

    $('#type').change();
})

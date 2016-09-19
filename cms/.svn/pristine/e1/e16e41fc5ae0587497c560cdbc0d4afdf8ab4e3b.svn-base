$(function()
{
    $.setAjaxForm('#linkContactForm', function(data)
    {
        if(data.result == 'success')
        {
            $.reloadAjaxModal(1500);
        }
        else
        {
            if(data.error && data.error.length)
            {
                $('#duplicateError').html($('.errorMessage').html());
                $('#duplicateError .alert').prepend(data.error).show();

                $(document).on('click', '#duplicateError #continueSubmit', function()
                {
                    $('#duplicateError').append("<input value='1' name='continue' class='hide'>");
                    $('#submit').attr('type', 'button');
                })
            }
        }
    })

    $('#selectContact').change(function()
    {
        if($(this).prop('checked'))
        {
            $('#contact_chosen').show();
            $(this).parents('.input-group').find('input[type=text][id=realname]').hide();

            $('#contact').trigger("chosen:updated");
            $('#contactInfo').addClass('hidden');
        }
        else
        {
            $(this).parents('.input-group').find('select').hide();
            $('#contact_chosen').hide();
            $(this).parents('.input-group').find('input[type=text][id=realname]').show();

            $('#contact').trigger("chosen:updated");
            $('#contactInfo').removeClass('hidden');
        }
    });
    $('#selectContact').change();
})

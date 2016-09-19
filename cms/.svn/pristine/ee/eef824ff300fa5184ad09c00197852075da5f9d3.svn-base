$(function()
{
    /* set style of avatar uploader in form */
    $('form #files').change(function(){$('form .avatar span').text($(this).val());});
    $('form .avatar span').click(function(){$('form #files').click();});

    $('.btn-vcard').hover(function()
    {
        $(this).parents('td').find('.contact-info, p.vcard').toggle();
        $(this).toggleClass('icon-qrcode');
        $(this).toggleClass('icon-list');
    });
    $('.btn-vcard').blur(function()
    {
        $(this).parents('td').find('.contact-info, p.vcard').toggle();
        $(this).toggleClass('icon-qrcode');
        $(this).toggleClass('icon-list');
    });

    $('p.vcard').hide();

    $('#menu .nav li').removeClass('active').find('[href*=' + v.mode + ']').parent().addClass('active');

    $.setAjaxForm('#contactForm', function(response)
    {
        if(response.result == 'fail')
        {
            if(response.error && response.error.length)
            {
                $('#duplicateError').html($('.errorMessage').html());
                $('#duplicateError .alert').prepend(response.error).show();

                $(document).on('click', '#duplicateError #continueSubmit', function()
                {
                    $('#duplicateError').append("<input value='1' name='continue' class='hide'>");
                    $('#submit').attr('type', 'button');
                })
            }
        }
        else
        {
            if(response.locate == 'reload')
            {
                $.reloadAjaxModal(1500);
            }
            else
            {
                setTimeout(function(){location.href = response.locate;}, 1200);
            }
        }
    });
});

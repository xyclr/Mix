$(document).ready(function()
{
    $('.nav-system-message').addClass('active');
    $.setAjaxForm('#commentForm', function(response)
    {
        if(response.result == 'success')
        {
            setTimeout(function(){location.reload();}, 2000);   
        }
        else
        {
            if(response.reason == 'needChecking')
            {
                $('#captchaBox').html(response.captcha).show();
            }
            else
            {
                bootbox.alert(response.info);
            }
        }
    });
});

$(document).ready(function()
{
    $.setAjaxForm('#commentForm', function(response)
    {
        if(response.result == 'success')
        {
            setTimeout(function()
            {
                var link = createLink('message', 'comment', 'objecType=' + v.objectType + '&objectID=' + v.objectID);
                 $('#commentForm').closest('#commentBox').load(link, location.href="#first");
            },  
            1000);   
        }
        else
        {
            if(response.reason == 'needChecking')
            {
                $('#captchaBox').html(response.captcha).show();
            }
        }
    });

    $('#pager').find('a').click(function()
    {
        $('#commentBox').load($(this).attr('href'));
        return false;
    });
});

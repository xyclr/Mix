$(document).ready(function()
{
    $('#account').focus();

    $("#langs li > a").click(function() 
    {
        selectLang($(this).data('value'));
    });
})

/* Keep session random valid. */
$('#submit').click(function()
{
    var password    = md5(md5(md5($('#password').val()) + $('#account').val()) + v.random);
    var rawPassword = md5($('#password').val());

    loginURL = createLink('user', 'login');
    $.ajax(
    {
        type: "POST",
        data:"account=" + $('#account').val() + '&password=' + password + '&referer=' + encodeURIComponent($('#referer').val()) + '&rawPassword=' + rawPassword + '&keepLogin=' + $('#keepLogin1').is(':checked'),
        url:$('#ajaxForm').attr('action'),
        dataType:'json',
        success:function(data)
        {
            if(data.result == 'fail') return  bootbox.alert(data.message);
            if(data.result == 'success') return location.href=data.locate;
            if(typeof(data) != 'object') return bootbox.alert(data);
        },
        error:function(data){bootbox.alert(data.responseText)}
    })
    return false;
})

$(document).ready(function()
{
    $('#original').change();
});

$('.draft').click(function()
{
    $(this).parent().find('#status').remove();
    $(this).after("<input type='hidden' name='status' id='status' value='draft' />");
    $('#submit').attr('type', 'button');
    $(this).attr('type', 'submit');
    $('#ajaxForm').submit();
    return false;
});

$("#submit").click(function()
{
    $(this).parent().find('#status').remove();
    $('.draft').attr('type', 'button');
    $(this).attr('type', 'submit');
    $('#ajaxForm').submit();
    return false;
});

$(document).ready(function()
{
    $('#files').change(function(){$('#avatarForm').submit();});

    $.setAjaxForm('#avatarForm', function(response)
    {
        if(response.result == 'success')
        {
            $('.btn-avatar').popover({trigger:'manual', content:response.message, placement:'right'}).popover('show');
            $('.btn-avatar').next('.popover').addClass('popover-success');
            var distroy = function()
            {
                $('btn-avatar').popover('destroy');
                $('#ajaxModal').load(response.locate);
            }
            setTimeout(distroy,800);
        }
    });
});

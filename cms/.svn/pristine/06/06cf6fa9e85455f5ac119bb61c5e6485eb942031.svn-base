$(function()
{
    $.setAjaxJSONER('.resume-leave', function(data)
    {
        var selecter = $('.resume-leave');
        if(data.result == 'success')
        {
            if(selecter.parents('#ajaxModal').size()) return $.reloadAjaxModal(1200);
            if(data.locate) return location.href = data.locate;
            return location.reload();
        }
        else
        {
            alert(data.message);
            return location.reload();
        }
    });
});

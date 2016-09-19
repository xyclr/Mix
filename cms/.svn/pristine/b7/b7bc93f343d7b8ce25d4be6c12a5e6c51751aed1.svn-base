$(document).ready(function()
{
    $(document).on('click', '.pass', function()
    {
        if(confirm(v.confirmReview.pass))
        {
            var selecter = $(this);

            $.getJSON(selecter.attr('href'), function(data) 
            {
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
        }
        return false;
    });

    $(document).on('click', '.reject', function()
    {
        if(confirm(v.confirmReview.reject))
        {
            var selecter = $(this);

            $.getJSON(selecter.attr('href'), function(data) 
            {
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
        }
        return false;
    });
});

$(document).ready(function()
{
    /* Add a trade detail item. */
    $(document).on('click', '.icon-plus', function()
    {
        $(this).parents('tr').after($('#memberTpl').html().replace(/key/g, v.key));
        $(this).parents('tr').next().find("[name^='member']").chosen();
        v.key ++;
        return false;
    });

    /* Remove a trade detail item. */
    $(document).on('click', '.icon-minus', function()
    {
        if($('#ajaxForm table .icon-minus').size() > 1)
        {
            $(this).parents('tr').remove();
        }
        else
        {
            $(this).parents('tr').find('input,select').val('');
        }
        return false;
    });
});

$(document).ready(function()
{
   /* Sort up. */
    $(document).on('click', '.icon-arrow-up', function()
    {
        $(this).parents('tr').prev().before($(this).parents('tr')); 
        $('tr .order').each(function(index,obj){$(this).val(index + 1);});
    });

    /* Sort down. */
    $(document).on('click', '.icon-arrow-down', function()
    { 
        var hasNext = $(this).parents('tr').next().find('.icon-arrow-down').size() > 0;
        if(hasNext)
        {
            $(this).parents('tr').next().after($(this).parents('tr')); 
            $('tr .order').each(function(index,obj){$(this).val(index + 1);});
        }
    });

    $('tr .order').each(function(index,obj){$(this).val(index + 1);});
});

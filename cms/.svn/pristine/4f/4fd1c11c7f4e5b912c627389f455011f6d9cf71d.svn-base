$(document).ready(function()
{
    /* Set current active moduleMenu. */
    if(typeof(v.path) != 'undefined')
    {
        $('#menu li.active').removeClass('active');
        $.each(eval(v.path), function(index, bookID) 
        { 
            $("#menu a[href$='book=" + bookID + "']").parent().addClass('active');
        })
    }
});

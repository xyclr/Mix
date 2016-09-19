$(function()
{
    /* Set style of priority options in form */
    $('form .pri[data-value="' + $('form #pri').val() + '"]').addClass('active');
    $('form .pri').click(function()
    {
        $('form .pri.active').removeClass('active');
        $('form #pri').val($(this).addClass('active').data('value'));
    });

    $('#menu li[data-group="' + v.groupBy + '"]').addClass('active');

    $('.task-toogle').click(function()
    {
        var obj = $(this).find('i');
        if(obj.hasClass('icon-plus'))
        {
           obj.parents('tr').next('tr').show();
           obj.removeClass('icon-plus').addClass('icon-minus');
        }
        else if(obj.hasClass('icon-minus'))
        {
           obj.parents('tr').next('tr').hide();
           obj.removeClass('icon-minus').addClass('icon-plus');
        }
        return false;
    });

    /* Add parent task link to menu. */
    if($('.addonMenu').length)
    {
        $('#menu .nav li:first').after($('.addonMenu').html());
        $('.addonMenu').remove();
    }
});

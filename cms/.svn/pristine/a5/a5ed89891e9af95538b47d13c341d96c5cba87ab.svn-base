$(function()
{
    /* Highlight current nav. */
    /* eg set the role of user. */
    var menu =  $('.leftmenu .nav li').size() == 0 ? '.nav li' : '.leftmenu .nav li';
    if(v.module == 'user' && v.field == 'roleList') menu = '';
    $(menu).removeClass('active');
    if(menu)$(menu + " a[href*='" + v.module + "'][href*='" + v.field + "']").parent().addClass('active');

    /* Add an item. */
    $(document).on('click', '.add', function()
    {
        $(this).parent().parent().after(v.itemRow);
        value = $(this).parent().prev().find('.input-group').html();
        $(this).parent().parent().next().find('.input-group').html(value);
        $(this).parent().parent().next().find('.input-group input').val('');
        $(this).parent().parent().next().find('.input-group input').eq(0).attr('placeholder', v.valueplaceholder);
        $(this).parent().parent().next().find('.input-group input').eq(1).attr('placeholder', v.infoplaceholder);
    })

    /* Remove an item. */
    $(document).on('click', '.remove', function()
    {
        $(this).parent().parent().remove();
    })
})

$(function()
{
    $('.lead a').click(function()
    {
        contactID = $(this).attr('id');
        $.openEntry('crm', createLink('crm.contact', 'view', 'contactID=' + contactID));
    });

    $('.btn-vcard').hover(function()
    {
        $(this).parents('td').find('.contact-info, p.vcard').toggle();
        $(this).toggleClass('icon-qrcode');
        $(this).toggleClass('icon-list');
    });

    $('.btn-vcard').blur(function()
    {
        $(this).parents('td').find('.contact-info, p.vcard').toggle();
        $(this).toggleClass('icon-qrcode');
        $(this).toggleClass('icon-list');
    });

    $('p.vcard').hide();
    return false;
});

$(function()
{
    $('#fsBtn').click(function()
    {
        var mm = $('#mindmapPanel');
        mm.toggleClass('fullscreen');
        ajustMinderSize();
    });

    function ajustMinderSize()
    {
        var $mm = $('#mindmap');
        $mm.css('height', $(window).height() - $mm.offset().top - ($('#mindmapPanel').hasClass('fullscreen') ? 1 : 21));
    }

    $(window).resize(ajustMinderSize);
    ajustMinderSize();
});

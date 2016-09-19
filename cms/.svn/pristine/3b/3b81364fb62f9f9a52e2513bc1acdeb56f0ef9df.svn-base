$(function()
{
    $('#blocks').change(function()
    {
        $('#ajaxModal').load(createLink('block', 'admin', "index=" + v.index + "&blockID=" + $(this).val()), function(){$.zui.ajustModalPosition()});
    });

    $(document).on('click', '.dropdown-menu.buttons .btn', function()
    {
        var $this = $(this);
        var group = $this.closest('.input-group-btn');
        group.find('.dropdown-toggle').removeClass().addClass('btn dropdown-toggle btn-' + $this.data('id'));
        group.find('input[name^="params[color]"]').val($this.data('id'));
    });
})


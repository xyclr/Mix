$(document).ready(function()
{
    $.setAjaxForm('#editForm', function()
    {
        /* After the form posted, refresh the treeMenuBox content. */
        source = createLink('tree', 'browse', 'type=' + v.type + '&startModule=0&root=' + v.root) + ' #treeMenuBox';
        $('#treeMenuBox').parent().load(source, function()
        {
            /* Rebuild the tree menu after treeMenuBox refreshed. */
            $(".tree").treeview({collapsed: false, unique: false});    
        });
    });

    $('.ke-container').css('width','90%');
});

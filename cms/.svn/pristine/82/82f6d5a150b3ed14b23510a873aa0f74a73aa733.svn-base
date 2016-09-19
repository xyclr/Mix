$(function()
{
    var resetBoards = function()
    {
        $('.boards').boards(
        {
            drop: function(e)
            {
                var fromBoard = e.element.closest('.board'),
                    toBoard = e.target.closest('.board');

                if(fromBoard.data('id') === toBoard.data('id')) return;

                if(toBoard.data('group') == 'status')
                {
                    var button = null;
                    if(toBoard.data('key') == 'done')   button = e.element.find('a[href*=finish]');
                    if(toBoard.data('key') == 'closed') button = e.element.find('a[href*=close]');
                    if(toBoard.data('key') == 'doing')  button = e.element.find('a[href*=start]');
                    if(!button || !button.length || button.prop('disabled')) 
                    {
                        $.zui.messager.danger(v.notAllowed);
                        reloadDataTable();
                    }

                    if(button) button.click();
                    return;
                }

                if(toBoard.data('group') != 'status' && fromBoard.data('id') != toBoard.data('id'))
                {
                    var change = 
                    {
                        field    : toBoard.data('group'),
                        id       : e.element.data('id'),
                        oldValue : fromBoard.data('key'),
                        value    : toBoard.data('key')
                    }
                    
                    $.post(
                        createLink('task', 'kanban'),
                        change,
                        function(response)
                        {
                            if(response.result == 'success') $.zui.messager.success(response.message);
                        },
                        'json'
                    )
                }
            }
        });

        $('[data-toggle="popover"]').popover();
    }

    window.reloadDataTable = function()
    {
        var $list = $('#taskKanban');
        $list.load(document.location.href + ' #taskKanban', function()
        {
            $list.find('[data-toggle="modal"]').modalTrigger();
            resetBoards();
        });
        return false;
    };

    resetBoards();

    $(document).on('hidden.zui.modal', '#ajaxModal', function()
    {
        reloadDataTable();
    });

    $('#taskKanban').on('click', '.btn-info-toggle', function()
    {
        $btn = $(this);
        $btn.find('i').toggleClass('icon-angle-down').toggleClass('icon-angle-up');
        $btn.closest('.task').toggleClass('show-info');
    });
});

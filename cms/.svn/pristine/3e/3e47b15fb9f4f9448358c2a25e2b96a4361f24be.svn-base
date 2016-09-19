/* Finish a todo. */
function finishTodo(id)
{
    $.get(createLink('oa.todo', 'finish', 'todoId=' + id, 'json'),function(response)
    {
        if(response.result == 'success')
        {
            if(response.confirm)
            {
                if(confirm(response.confirm.note))
                {   
                    $.openEntry(response.confirm.entry, response.confirm.url);
                }   
            }
            if(response.message) $.zui.messager.success(response.message);
        }
        updateCalendar();
        return false;
    }, 'json');
}

$(document).ready(function()
{
    $.setAjaxLoader('#triggerModal .ajaxEdit', '#triggerModal');
    $.setAjaxLoader('#ajaxModal .ajaxEdit', '#ajaxModal');
    $('.ajaxFinish').click(function()
    {
        $(this).prop('href', '');
        finishTodo($(this).data('id'));
        $.zui.modalTrigger.close();
        return false;
    });

    /* Adjust default deleter. */
    $.setAjaxDeleter('.todoDeleter', function(data)
    {
        if(data.result == 'success')
        {
            if(data.locate) return location.href = data.locate;
            if(deleter.parents('#ajaxModal').size()) return $.reloadAjaxModal(1200);
            return location.reload();
        }
        else
        {
            alert(data.message);
            return location.reload();
        }
    });
});

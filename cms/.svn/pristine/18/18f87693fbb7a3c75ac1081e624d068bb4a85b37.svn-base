$(document).ready(function()
{
    /* Set forbid link options. */
    $('td.operate a.forbider').click(function()
    {
        $.getJSON($(this).attr('href'),function(data)
        {
            if(data.result == 'success') return location.href = data.locate;
            bootbox.alert(data.message + '');
        });
        return false;
    });
});

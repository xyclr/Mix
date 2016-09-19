$(document).ready(function()
{
    $('.sort').click(function()
    {
        $.getJSON($(this).attr('href'), function(data) 
        {
            if(data.result=='success')
            {
                location.reload();
            }
            else
            {
                alert(data.message);
            }
        });

        return false;
    });
});

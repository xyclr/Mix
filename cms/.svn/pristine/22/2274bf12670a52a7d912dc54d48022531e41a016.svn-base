$(document).ready(function()
{
    $(document).on('click', '.ajax', function()
    {
        $.getJSON($(this).attr('href'), function(data) 
        {
            if(data.result == 'success')
            {
              if(data.locate) return location.href = data.locate;
              return location.reload();
            }
            else
            {
              alert(data.message);
              return location.reload();
            }
        });
        return false;
    });
})

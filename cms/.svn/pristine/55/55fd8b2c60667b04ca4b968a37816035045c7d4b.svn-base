$(document).ready(function()
{
    /* Prevent duplicate bindings */
    if($('body').data('commonjs')) return;
    $('body').data('commonjs', true);

    if(typeof(v.projectID) != undefined && v.projectID != 0)
    {
        $('.menu .nav li').removeClass('active');
        $('#menu li').removeClass('active').find('[href*=' + v.status + ']').parent().addClass('active');
    }

    $("#createButton").modalTrigger({width:800});

    $('.switcher').on('click', function()
    {
        var url = $(this).attr('href');
        bootbox.confirm($(this).data('confirm'),  function(result)
        {
            if(result)
            {
                $.getJSON(url, function(response)
                {
                    if(response.result == 'success')
                    {
                        bootbox.alert(response.message, function(){location.reload()});
                    }
                    else
                    {
                        bootbox.alert(response.message);
                    }
                })
            }
        })
        return false;
    });

    var $leftmenu = $('#menu');
    $leftmenu .next('a').css('margin-top', '10px').appendTo($leftmenu);
})

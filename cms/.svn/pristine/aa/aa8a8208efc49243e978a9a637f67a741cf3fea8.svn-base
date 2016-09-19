$(document).ready(function()
{
    $.setAjaxJSONER('.jsoner', function(response){ bootbox.alert(response.message, function(){location.href = response.locate; return true;});});
    $.setAjaxJSONER('.switcher', function(response){ bootbox.alert(response.message, function(){location.href = response.locate; return false;});});

    /* remove empty element */
    $('.speaker > ul > li > span:empty').closest('li').remove();
});

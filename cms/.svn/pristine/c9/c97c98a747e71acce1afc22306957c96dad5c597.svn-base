$(document).ready(function()
{
    $('#chanzhi').change(function()
    {
        if($(this).prop('checked')) 
        {
            $('#integration').prop('checked', true);
            $('#integration').change();
            $('#login').attr('placeholder', v.chanzhiPlaceholder);
            $('#login').parents('tr').find('th').text(v.chanzhiURL);
            $('#logout').parents('tr').hide();
            $('#block').parents('tr').hide();
        }
        else
        {
            $('#logout').parents('tr').show();
            $('#block').parents('tr').show();
        }
    });

    $('#zentao').change(function()
    {
        if($(this).prop('checked')) 
        {
            $('#integration').prop('checked', true);
            $('#integration').change();
            $('#login').attr('placeholder', v.zentaoPlaceholder);
            $('#login').parents('tr').find('th').text(v.zentaoURL);
            $('#adminAccount').parents('tr').show();
            $('#key').parents('tr').hide();
            $('#logout').parents('tr').hide();
            $('#block').parents('tr').hide();
            /* Set default data and hide. */
            $('#name').val(v.zentaoName);
            $('#visible').prop('checked', 'checked');
            $('#files').parents('tr').hide();
            $('#code').val('zentao');
            $('#open').val('iframe').parents('tr').hide();
            $('#ip').parents('tr').hide();
            $('#control').val('full').parents('tr').hide();
            $('#size').val('max').parents('tr').hide();
            $('#position').val('default').parents('tr').hide();
        }
        else
        {
            $('#login').attr('placeholder', v.loginPlaceholder);
            $('#login').parents('tr').find('th').text(v.loginUrl);
            $('#adminAccount').parents('tr').hide();
            $('#key').parents('tr').show();
            $('#logout').parents('tr').show();
            $('#block').parents('tr').show();
            /* Remove default data and show. */
            $('#name').val('');
            $('#visible').prop('checked', '');
            $('#files').parents('tr').show();
            $('#code').val('');
            $('#open').parents('tr').show();
            $('#ip').parents('tr').show();
            $('#control').parents('tr').show();
            $('#size').parents('tr').show();
            $('#position').parents('tr').show();
        }
    });
});

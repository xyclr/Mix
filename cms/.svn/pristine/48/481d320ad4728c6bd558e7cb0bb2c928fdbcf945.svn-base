$(document).ready(function()
{
    $(document).on('change', '#type', function()
    {
        var type = $(this).val();
        if(type == 'redeem')
        {
            $('tr.category').show();
            $('tr.trader').hide();
        }
        else
        {
            $('tr.category').hide();
            $('tr.trader').show();
        }

    })

    $('#type').change();
});

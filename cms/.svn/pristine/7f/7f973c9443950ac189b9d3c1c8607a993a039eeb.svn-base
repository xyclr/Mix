$(document).ready(function()
{
    /* show or hide detail. */
    $(document).on('click', '.detail', function()
    {
        if($(this).find('i').hasClass('icon-double-angle-down'))
        {
            $('#refund-detail').removeClass('hidden');
            $('#money').prop('readonly', 'readonly');
            $('#refund-date').addClass('hidden');
            $('#refund-related').addClass('hidden');
            $(this).find('i').removeClass('icon-double-angle-down');
            $(this).find('i').addClass('icon-double-angle-up');
        }
        else
        {
            $('input[name^=moneyList]').val('');
            $('#refund-detail').addClass('hidden');
            $('#money').prop('readonly', '');
            $('#refund-date').removeClass('hidden');
            $('#refund-related').removeClass('hidden');
            $(this).find('i').removeClass('icon-double-angle-up');
            $(this).find('i').addClass('icon-double-angle-down');
        }
        return false;
    });

    /* update money. */
    function updateMoney()
    {
        var money = 0;
        $('input[name^=moneyList]').each(function()
        {
            if($(this).val() != '')
            {
                var value = parseFloat($(this).val());
                if(isNaN(value))
                {
                  $(this).val('');
                  $.zui.messager.show('money must a number.');
                }
                else money += value;
            }
        });
        $('#money').val(money);
        return false;
    }
    $('input[name^=moneyList]').change(updateMoney);

    /* Add a trade detail item. */
    $(document).on('click', '.icon-plus', function()
    {
        $(this).closest('tr').after($('#detailTpl').html().replace(/key/g, v.key));
        $(this).closest('tr').next().find("select").chosen();
        var options = window.datetimepickerDefaultOptions;
        $.extend(options, {startView: 2, minView: 2, maxView: 1, format: 'yyyy-mm-dd'})
        $(this).closest('tr').next().find("[name^='dateList']").fixedDate().datetimepicker(options);
        $('input[name^=moneyList]').change(updateMoney);
        v.key++;
        return false;
    });

    /* Remove a trade detail item. */
    $(document).on('click', '.icon-minus', function()
    {
        if($('#detailBox tr').size() > 1)
        {
            $(this).closest('tr').remove();
        }
        else
        {
            $(this).closest('tr').find('input,select').val('');
        }
        $('input[name^=moneyList]').change();
        return false;
    });

    if($('#detailBox tr').size() > 1)
    {
        $('.detail').click();
    }
});

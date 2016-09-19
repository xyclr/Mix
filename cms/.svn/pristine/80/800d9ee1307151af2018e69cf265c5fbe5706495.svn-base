/**
 * Get orders of a customer. 
 * 
 * @param  int $customerID 
 * @access public
 * @return void
 */
function getOrder(customerID)
{
    $('#orderTD').empty();

    if(customerID == '') return false;
    if(customerID == 'create') return true;

    $('.contactTD select').load(createLink('contact', 'getOptionMenu', 'customerID=' + customerID));

    $('.orderInfo td').load(createLink('contract', 'getOrder', 'customerID=' + customerID + '&status=normal'));

    $('#orderTD').load(createLink('contract', 'getOrder', 'customerID=' + customerID + '&status=normal'), function()
    {
        $('#orderTR').removeClass('hide');
        if($('.select-order').length > 1) $('.select-order').parents('tr').not('#orderTR, #tmpData, .orderInfo').remove();
    })
}

$(document).ready(function()
{
    if(v.customer)
    {
        $('.contactTD select').load(createLink('contact', 'getOptionMenu', 'customerID=' + v.customer));
        $('#orderTD').load(createLink('contract', 'getOrder', 'customerID=' + v.customer));
        $('.orderInfo td').load(createLink('contract', 'getOrder', 'customerID=' + v.customer + '&status=normal'));
    }

    $(document).on('change', 'select.select-order:first', function()
    {
        $('#name').val($(this).find('option:selected').text());
    });

    $(document).on('focus', '.select-order', function()
    {
        $('#tmpData td').html($('.orderInfo td').html());

        indexValue = $(this).find('option:selected').val();

        $('select.select-order').not('#tmpData select, .orderInfo select').each(function()
        {
            selectedValue = $(this).find('option:selected').val();

            if(selectedValue && selectedValue != indexValue)
            {
                $('#tmpData').find("option[value='" + selectedValue + "']").remove();
            }
        });

        $(this).html($('#tmpData select').html());
    })

    $(document).on('click', '.plus', function()
    {
        $(this).parents('tr').after("<tr><th></th><td>" + $('#orderTD').html() + "</td></tr>");
    });
  
    $(document).on('click', '.minus', function()
    {
        if($(this).parents('table').find('.order-real').not('tr.hide .order-real').size() == 1)
        {
            $(this).parents('td').html($('#order td').html());
            $(this).parents('td').find('select').val('').change();
            $('.order-real').change();
            return false;
        }
        $(this).parents('tr').remove();
        $('.order-real').change();
    });
    $('select.select-order:first').change();
})

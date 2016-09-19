$(document).ready(function()
{
    /* Create customer when create an order. */
    $('#createCustomer').change(function()
    {
        if($(this).prop('checked')) 
        {
            $('#customer').parents('td').find('.required').hide();
            $(this).parents('.input-group').find('select').hide();
            $('#customer_chosen').hide();
            $(this).parents('.input-group').find('input[type=text][id=name]').show().focus();
            $('.customerInfo').show();
        }
        else
        {
            $('#customer').parents('td').find('.required').show();
            $('#customer_chosen').show();
            $(this).parents('.input-group').find('input[type=text][id=name]').hide();
            $('.customerInfo').hide();
        }
    })

    /* Create product when create an order. */
    $('#createProduct').change(function()
    {
        if($(this).prop('checked')) 
        {
            $(this).parents('.input-group').find('select').hide();
            $('#product_chosen').hide();
            $(this).parents('.input-group').find('input[type=text][id=productName]').show().focus();
            $('.productInfo').show();
        }
        else
        {
            $('#product_chosen').show();
            $(this).parents('.input-group').find('input[type=text][id=productName]').hide();
            $('.productInfo').hide();
        }
    })

    $.setAjaxForm('#orderForm', function(response)
    {
        if(response.result == 'fail')
        {
            if(response.error && response.error.length)
            {
                $('#duplicateError').html($('.errorMessage').html());
                $('#duplicateError .alert').prepend(response.error).show();

                $(document).on('click', '#duplicateError #continueSubmit', function()
                {
                    $('#duplicateError').append("<input value='1' name='continue' class='hide'>");
                    $('#submit').attr('type', 'button');
                })
            }
        }
        else
        {
            setTimeout(function(){location.href = response.locate;}, 1200);
        }
    });
})

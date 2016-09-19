$(document).ready(function()
{
    if(v.detail)
    {
        $('.all-pass').click(function()
        {
            $('input[id^=status][id$=1]').each(function(){$(this).prop('checked', 'checked')});
            $('.reviewMoney').show();
            $('.reason').hide();
        })

        $('.all-reject').click(function()
        {
            $('input[id^=status][id$=2]').each(function(){$(this).prop('checked', 'checked')});
            $('.reviewMoney').hide();
            $('.reason').show();
        })

        $('input[name^=status]').click(function()
        {
            var reviewStatus = 'reject';

            $('input[name^=status]').each(function()
            {
                if($(this).prop('checked'))
                {
                    if(reviewStatus != $(this).val())
                    {
                        reviewStatus = $(this).val();
                        return false;
                    }
                }

            })

            if(reviewStatus == 'reject')
            {
                $('.reviewMoney').hide();
                $('.reason').show();
            }
            else
            {
                $('.reviewMoney').show();
                $('.reason').hide();
            }
        })

        $('input[name^=status]').click(function()
        {
            var money = 0;
            $('input[name^=status]').each(function()
            {
                if($(this).prop('checked'))
                {
                    if($(this).val() == 'pass')
                    {
                        money += parseInt($(this).parents('tr').find('.detailMoney').html());
                    }
                }
            })

            $('#money').val(money);
        })
    }
    else
    {
        $('input[name=status]').click(function()
        {
            if($('#status1').prop('checked'))
            {
                $('.reviewMoney').show();
                $('.reason').hide();
            }
            else
            {
                $('.reviewMoney').hide();
                $('.reason').show();
            }
        })
    }

    $('#submit').click(function()
    {
        $('input[name^=status]').each(function()
        {
            if($(this).prop('checked'))
            {
                if(typeof(status) == 'undefined' || status == '')
                {
                    if($(this).val() == 'pass')
                    {
                      $('#allPass').val('1');
                      $('#allReject').val('0');
                    }
                    else
                    {
                        $('#allPass').val('0');
                        $('#allReject').val('1');
                    }
                }

                if(typeof(status) != 'undefined' && status != '' && status != $(this).val())
                {
                    $('#allPass').val('0');
                    $('#allReject').val('0');
                }

                status = $(this).val();
            }
        })
        
        status = '';
    })
})

$(document).ready(function()
{
     $.setAjaxJSONER('.refund', function(response)
     {
        if(response.result == 'success')
        {
            bootbox.dialog(
            {  
                message: v.createTradeTip,  
                buttons:
                {  
                    back:
                    {  
                        label: v.lang.no,
                        className: 'btn-primary',  
                        callback:  function(){location.reload();}  
                    },
                    trade:
                    {  
                        label: v.lang.yes,
                        className: 'btn-primary',  
                        callback:  function()
                        {
                            $('.modal').load($('.createTrade').prop('href'), '', function()
                            {
                                $('.modal').modal('ajustPosition', 'fit');
                            });
                            return false;
                        }

                    }  
                }  
            });
         }

         return false;
    })
})

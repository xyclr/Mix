$(document).ready(function()
{
   if(window.opener)
   {
       $.setAjaxForm('#customerForm', function(response)
       {
          if(response.result == 'success')
          {
               url = createLink('customer', 'getoptionmenu', 'current=' + response.customerID);
               $('.select-customer', window.opener.document).load(url, function(){ window.close(); });
          }
       });
   }
   else
   {
       $.setAjaxForm('#customerForm', function(response)
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
   }
})

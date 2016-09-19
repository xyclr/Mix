$(document).ready(function()
{
     /* Toggle one comment. */
     $('.toggle').click(function()
     {
          $(this).toggleClass('change-show').toggleClass('change-hide');
          if($(this).parent().next().find('.changes').size())
          {
              $(this).parent().next().find('.changes').toggle();
          }
          else
          {
              $(this).parent().next().toggle().find('.changes').show();
          }
     });

     /* Toggle all comment. */
     $('.toggle-all').click(function()
     {
          $(this).toggleClass('change-show').toggleClass('change-hide');
          $('.toggle').click();
     });
    
     /* Sort records. */
     $('.sorter').click(function()
     {
          var orderClass = $(this).find('span').attr('class');

          if(orderClass == 'log-asc')
          {
              $(this).find('span').attr('class', 'log-desc');
              $.cookie('historyOrder', 'log-desc', {path: v.webRoot});
          }
          else
          {
              $(this).find('span').attr('class', 'log-asc');
              $.cookie('historyOrder', 'log-asc', {path: v.webRoot});
          }

          $(this).parents('.panel').find('.panel-body li').reverseOrder();
     });
     customeHistoryOrder();
});

function customeHistoryOrder()
{
     var historyOrder = $.cookie('historyOrder');
     if(typeof(historyOrder) == 'undefined') return true;

     $('.panel-history').each(function()
     {
         if(historyOrder != $(this).find('.sorter').find('span').attr('class'))
         {
             $(this).find('.sorter').click();
         }
     });
}

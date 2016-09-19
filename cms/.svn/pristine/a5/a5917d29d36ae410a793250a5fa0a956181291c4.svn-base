$(document).ready(function()
{
     if(v.from == 'admin')
     {
          $.setAjaxForm('#editForm', function(response)
          { 
              if(response.result == 'success')location.reload()
          });
     }
     else
     {
          $.setAjaxForm('#editForm',function(response) 
          {
              if(response.result == 'success') $.reloadAjaxModal(0);
          });
     }
});

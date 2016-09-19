$(document).ready(function()
{
    $.setAjaxForm('#createRecordForm', function(response)
    {
        if(response.result == 'success')
        {
            if(response.locate == '' || response.locate == 'reload')
            {
                location.reload(); 
            }
            else if(response.locate == 'parent.reload')
            {
                parent.location.reload();
            }
            else
            {
                location = response.locate;
            }
        }
        else
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
    });

    $('[name*=objectType]').change(function()
    {
        $('#order, #contract').attr('disabled', true).parents('tr').hide();
        if($(this).prop('checked')) 
        {
            $('[name*=objectType]').not(this).attr('checked', false);
            $('#' + $(this).val()).attr('disabled', false).parents('tr').show();
        }
    });
    $('#ajaxModal .sorter').click();
  
    $('[name*=createContact]').change(function()
    {   
        if($(this).prop('checked')) 
        {   
            $(this).parents('.input-group').find('select').hide();
            $(this).parents('.input-group').find('input[type=text]').show().focus();
        }   
        else
        {   
            $(this).parents('.input-group').find('select').show();
            $(this).parents('.input-group').find('input[type=text]').hide();
        }   
    });
});

/**
 * Compute the next contact date for action.
 * 
 * @param  int    $delta 
 * @access public
 * @return void
 */
function computeNextDate(delta)
{
    today = new Date();
    today = today.toString('yyyy-M-dd');
    if(!today) return;

    nextDate = convertStringToDate(today).addDays(parseInt(delta));
    nextDate = nextDate.toString('yyyy-M-dd');

    if(delta == 365000)
    {
      $('#nextDate').val('').attr('disabled', true);
    }
    else
    {
        $('#nextDate').val(nextDate).attr('disabled', false);
    }
}

/**
 * Convert a date string like 2011-11-11 to date object in js.
 * 
 * @param  string $date 
 * @access public
 * @return date
 */
function convertStringToDate(dateString)
{
    dateString = dateString.split('-');
    return new Date(dateString[0], dateString[1] - 1, dateString[2]);
}

$(document).ready(function()
{
    $('[name*=objectType]').change(function()
    {
        if($(this).prop('checked'))$('[name*=objectType]').not(this).prop('checked', false).change();
        $('#' + $(this).val()).parents('tr').toggle($(this).prop('checked'))
    })
    $('[name*=objectType]').change();

    /* Toggle create trader items. */
    $('[name*=createTrader]').change(function()
    {
        if($(this).prop('checked')) 
        {
            $(this).parents('.input-group').find('select').hide();
            $(this).parents('.input-group').find('[id*=trader][id*=_chosen]').hide();
            $(this).parents('.input-group').find('input[type=text][id*=traderName]').show().focus();
            $(this).parents('.input-group-addon').find('.icon-question').hide();
        }
        else
        {
            $(this).parents('.input-group').find('[id*=trader][id*=_chosen]').show();
            $(this).parents('.input-group').find('input[type=text][id*=traderName]').hide();
        }
    })

    /* Highlight submenu. */
    if(config.requestType == 'GET')
    {
        $('#menu li').removeClass('active').find("[href*='=" + v.mode + "']").parent().addClass('active');
    }
    else
    {
        $('#menu li').removeClass('active');
        if(v.mode == 'in')
        {
            $('#menu li').find("[href*='trade-browse-in.html']").parent().addClass('active');
        }
        else
        {
            $('#menu li').find('[href*=' + v.mode + ']').parent().addClass('active');
        }
    }
})

/**
 * Get contract of a trader. 
 * 
 * @param  int    $traderID 
 * @access public
 * @return void
 */
function getContract(traderID)
{
    if(traderID == '') return false;
    $('.contractTD select').empty().load(createLink('crm.contract', 'getOptionMenu', 'traderID=' + traderID));
}

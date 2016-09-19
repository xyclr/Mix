$(document).ready(function()
{
    $("a[id='board" + v.boardID + "']").parent().addClass('active');
})

/* Init search form. */
$(document).ready(function()
{
    $('#searchInput').focus(function()
    {
        if($('#querybox').html() != '') return false;
        ajaxGetSearchForm();
    });
    /* init search form if mode is bysearch. */
    if(v.mode == 'bysearch')
    {
        ajaxGetSearchForm('', function()
        {
            $('#searchInput').val($('#querybox').find('#value1').val());
        });
    }
});

/* set search form fields. */
$(document).ready(function()
{
    $('#searchButton').click(function()
    {
        if($('#querybox').html() == '' || $('#searchInput').val() == '')
        {
            $('#searchInput').focus();
            return false;
        }

        $('#field1').val('t1.title');
        $('#operator1').val('include');
        $('#value1').val($('#searchInput').val());
        $('#groupAndOr').val('or');
        $('#field4').val('t1.content');
        $('#operator4').val('include');
        $('#value4').val($('#searchInput').val());
        $('#searchform').find('#submit').click();
    });
});

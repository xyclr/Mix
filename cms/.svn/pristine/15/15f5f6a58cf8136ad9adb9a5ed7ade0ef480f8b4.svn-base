$(document).ready(function()
{
    /* Toggle options. */
    $(document).on('change', '.unit', function()
    {
        $(this).closest('.input-cell').toggleClass('input-group', $(this).val() == 'fix');
    });

    /* Add a unit. */
    $(document).on('click', '.icon-plus', function()
    {
        $(this).closest('.input-row').after($('#unitItem').html());
    });

    /* Delete a option. */
    $(document).on('click', '.icon-remove', function()
    {
        $(this).closest('.input-row').remove();
    });
});

$(document).ready(function() 
{
    setRequiredFields();

    /* Enable default ajax options. */
    $.setAjaxForm('#ajaxForm');
    $.setAjaxDeleter('.deleter');
    $.setReload('.reload');
    $.setReloadDeleter('.reloadDeleter');
    $.setAjaxLoader('.loadInModal', '#ajaxModal');

    /* Set ping keep online. */
    setInterval('ping()', 1000 * 360);

    /* Enable tooltip */
    $('body').tooltip({html: true,selector: "[data-toggle='tooltip']",container: "body"});

    fixTableHeader();
    condensedForm();
    setPageActions();

    /* Reload modal. */
    $(document).on('click', '.reloadModal', function(){$.reloadAjaxModal()});

    /* Support iframe modal shortcut */
    $(document).on('click', 'a.iframe', function(e)
    {
        var $this = $(this);
        if (!$this.data('zui.modaltrigger'))
        {
            var modalWidth  = '';
            var modalHeight = '';
            if($this.attr('width') != 'undefined')  modalWidth = $this.attr('width');
            if($this.attr('height') != 'undefined') modalHeight = $this.attr('width');

            $this.modalTrigger(
            {
                width: modalWidth,
                height: modalHeight,
                show: true
            });
        }
        else
        {
            $this.trigger('.toggle.' + 'zui.modaltrigger');
        }
        e.preventDefault();
    });

    setMenu();
    initSearch();
});

$(document).on('keyup', function(e)
{
    if(e.keyCode == '37')
    {
        /* left, go to pre object. */
        if($('#ajaxModal').css('display') == 'block') return false;
        preLink = ($('#pre').attr("href"));
        if(typeof(preLink) != 'undefined') location.href = preLink;
    }
    if(e.keyCode == '39')
    {
        /* right, go to next object. */
        if($('#ajaxModal').css('display') == 'block') return false;
        nextLink = ($('#next').attr("href"));
        if(typeof(nextLink) != 'undefined') location.href = nextLink;
    }
});

/**
 * Show or hide more items. 
 * 
 * @access public
 * @return void
 */
function switchMore()
{
    $('#search').width($('#search').width()).focus();
    $('#moreMenu').width($('#defaultMenu').outerWidth());
    $('#searchResult').toggleClass('show-more');
}

/**
 * Init search form 
 * 
 * @access public
 * @return void
 */
function initSearch()
{
    $searchTab = $('#bysearchTab');
    if($searchTab.data('initSearch')) return;

    if(!$searchTab.closest('#menu').length)
    {
        $('#menu > ul:first').append($searchTab);
    }

    var $queryBox = $('#querybox');
    if(!$queryBox.length)
    {
        $queryBox = $("<div id='querybox' class='hidden'/>").insertAfter($('#menu'));
    }

    if(v && v.mode == 'bysearch')
    {
        $('#menu > ul > li.active').removeClass('active');
        ajaxGetSearchForm($queryBox);
        $searchTab.addClass('active').find('a').attr('href', '#bysearch');
        $queryBox.removeClass('hidden');
    }

    $searchTab.on('click', function()
    {
        if($searchTab.hasClass('active'))
        {
            var $oldTab = $searchTab.data('oldTab');
            $searchTab.removeClass('active');
            if($oldTab)
            {
                $oldTab.addClass('active');
            }
            else
            {
                $searchTab.addClass('selected');
            }
            $queryBox.addClass('hidden');
        }
        else
        {
            $searchTab.data('oldTab', $('#menu > ul > li.active').removeClass('active')).addClass('active');
            ajaxGetSearchForm($queryBox);
            $queryBox.removeClass('hidden');
        }
    });

    $searchTab.data('initSearch', true);
}

/**
 * Ajax get search form 
 * 
 * @param  string   $queryBox 
 * @param  callback $callback 
 * @access public
 * @return void
 */
function ajaxGetSearchForm($queryBox, callback)
{
    if(!$queryBox) $queryBox = $('#querybox');
    if($queryBox.html() == '')
    {
        $.get(createLink('search', 'buildForm'), function(data)
        {
            $queryBox.html(data);
            callback && callback();
        });
    }
}

/**
 * Set menu
 * 
 * @access public
 * @return void
 */
function setMenu()
{
    $menuTitle = $('#menuTitle');
    $menu = $('#menu');
    if($menu.length && $menuTitle.length)
    {
        $menu.children('ul.nav:not(.pull-right)').hide();
        $menu.prepend($menuTitle.addClass('nav'));
    }
}

/**
 * Start cron.
 * 
 * @access public
 * @return void
 */
function startCron()
{
    $.ajax({type:"GET", timeout:100, url:createLink('cron', 'ajaxExec')});
}

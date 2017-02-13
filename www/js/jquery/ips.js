/* Ips lib */
+function($, window, document, Math)
{
    "use strict";

    /* Global variables */
    var desktopPos       = {x: 40, y: 0},
        fullscreenMode   = false,
        windowIdSeed     = 0,
        windowIdTeamplate= 'wid-{0}',
        windowZIndexSeed = 100,
        defaultWindowPos = {x: 110, y: 20},
        entries          = null,
        desktop          = null,
        superadmin       = false,
        windows          = null,
        theLoadingFrame  = null;

    /* Save the index configs */
    var indexUrl         = window.location.href;
    var indexTitle       = document.title;
    var indexTone        = '#145ccd';

    /* The default global settings */
    var defaults =
    {
        autoHideMenu          : false,
        webRoot               : '/',
        animateSpeed          : 200,
        entryIconRoot         : config.webRoot + 'theme/default/images/ips/',
        windowHeadheight      : 30, // the height of window head bar
        bottomBarHeight       : 36, // the height of desk bottom bar
        defaultWinPosOffset   : 30,
        defaultWindowSize     : {width:700,height:538},
        windowidstrTemplate   : 'win-{0}',
        windowTplt            : "<div id='{idstr}' class='window{cssclass}' style='width:{width}px;height:{height}px;left:{left}px;top:{top}px;z-index:{zindex};' data-id='{id}' data-url='{url}'><div class='window-head'>{iconhtml}<strong title='{desc}'>{name}</strong><ul><li><button class='reload-win'><i class='icon-repeat'></i></button></li><li><button class='min-win'><i class='icon-minus'></i></button></li><li><button class='max-win'><i class='icon-resize-full'></i></button></li><li><button class='close-win'><i class='icon-remove'></i></button></li></ul></div><div class='window-cover'></div><div class='window-content'></div></div>",
        frameTplt             : "<iframe id='iframe-{id}' name='iframe-{id}' src='{url}' frameborder='no' allowtransparency='true' scrolling='auto' hidefocus='' style='width: 100%; height: 100%; left: 0px;'></iframe>",
        leftBarShortcutTplt   : '<li id="s-menu-{id}"><button data-toggle="tooltip" data-tip-class="s-menu-tooltip" data-placement="right" data-btn-type="menu" class="app-btn s-menu-btn" title="{name}" data-id="{id}">{iconhtml}</button></li>',
        taskBarShortcutTplt   : '<li id="s-task-{id}"><button class="app-btn s-task-btn" title="{desc}" data-btn-type="task" data-id="{id}">{iconhtml}{name}</button></li>',
        taskBarMenuTplt       : "<ul class='dropdown-menu fade' id='taskMenu'><li><a href='javascript:;' class='open-win'><i class='icon-bolt icon'></i> &nbsp;{openText}</a></li><li><a href='javascript:;' class='reload-win'><i class='icon-repeat icon'></i> &nbsp;{reloadText}</a></li><li><a href='javascript:;' class='fix-entry'><i class='icon-pushpin icon'></i> &nbsp;{fixToMenuText}</a></li><li><a href='javascript:;' class='remove-entry'><i class='icon-pushpin icon-rotate-90 icon'></i> &nbsp;<span>{removeFromMenuText}</span></a></li><li><a href='javascript:;' class='close-win'><i class='icon-remove icon'></i> &nbsp;{closeText}</a></li><li><a href='javascript:;' class='delete-entry'><i class='icon-trash icon'></i> &nbsp;{deleteEntryText}</a></li></ul>",
        entryListShortcutTplt : '<li id="s-applist-{id}"><a href="javascript:;" class="app-btn menu-{hasMenu} s-list-btn" data-menu={hasMenu} data-btn-type="list" data-id="{id}" data-code={code}>{iconhtml}{name}</a></li>',

        init: function() // init the default
        {
            this.entryIconRoot = this.webRoot + this.entryIconRoot;
            this.taskBarMenuTplt = this.taskBarMenuTplt.format(this);
        }
    };

    /* Global setting */
    var settings = {};

    /* Initialize the settings
     *
     * @param  object options
     * @retrun void
     */
    function initSettings(options)
    {
        $.extend(settings, defaults, options);
        settings.init();
    }

    /*
     * Initialize the entries options
     *
     * @param  array entriesOptions
     * @return void
     */
    function initEntries(entriesOptions)
    {
        entries = [];
        $.each(entriesOptions, function(idx, option)
        {
            entries.push(new entry(option));
            if(!superadmin && option.id == 'superadmin') superadmin = true;
        });

        entries.sort(function(a, b){return a.order - b.order;});
    }

    /**
     * Refresh entries
     * @param  {array} entriesOptions
     * @param  {bool}  reset
     * @return {void}
     */
    function refreshEntries(entriesOptions, reset)
    {
        var DEL = 'delete';
        if(reset)
        {
            $.each(entries, function(idx, et)
            {
                if(et.id != 'allapps' && et.id != 'superadmin') et[DEL] = true;
            });
        }
        var et, deleted;
        $.each(entriesOptions || [], function(idx, option)
        {
            et = getEntry(option.id);
            if(et)
            {
                if(!option[DEL])
                {
                    if(reset) et[DEL] = false;
                    if(et.uuid === option.uuid) et = option;
                    else et.init(option, true);
                }
                else
                {
                    et[DEL] = true;
                    deleted = true;
                }
            }
            else
            {
                entries.push(new entry(option));
            }
        });

        if(deleted || reset)
        {
            for(var i = entries.length - 1; i >= 0; --i)
            {
                if(entries[i][DEL])
                {
                    entries.splice(i, 1);
                }
            }
        }

        entries.sort(function(a, b){return a.order - b.order;});
    }

    /**
     * Get entry by id or code
     * @param  {string} id
     * @return {object}
     */
    function getEntry(id)
    {
        if(id && entries)
        {
            var et;
            for(var i = entries.length - 1; i >= 0; --i)
            {
                et = entries[i];
                if(id == et.id || id == et.code) return et;
            }
        }
        return null;
    }

    /**
     * The entry object
     *
     * Create a entry object, example: 'var et = new entry({});'
     * A entry object stored the entry options and has a method to create a window object
     * 
     * @param object options
     */
    var entry = function(options)
    {
        this.uuid = $.zui.uuid();
        this.init(options);
    }

    /* Get default options */
    entry.prototype.getDefaults = function(entryId)
    {
        var d =
        {
            url      : '',
            control  : 'simple',
            id       : entryId || windowIdTeamplate.format(windowIdSeed++),
            name     : 'No name entry',
            open     : 'iframe',
            desc     : '',
            order    : 0,
            display  : 'fixed', // "sizeable" | "fixed" | "fullscreen" | "modal"
            size     : 'max',
            position : 'default',
            icon     : '',
            cssclass : '',
            opened   : false,
            menu     : 'all' // wethear show in left menu bar
        };

        return d;
    };

    /* Reset the postion and size after initialized */
    entry.prototype.resetPosSize = function()
    {
        /* Init size setting */
        if(typeof this.size === 'string' && this.size.indexOf('}') > 0) // convert size data like "{"width":1024,"height":600}"
        {
            this.size = $.parseJSON(this.size);
        }

        if(this.size == 'default')
        {
            this.width  = settings.defaultWindowSize.width;
            this.height = settings.defaultWindowSize.height;
            if(this.cssclass.indexOf(' window-movable') < 0) this.cssclass += ' window-movable';
        }
        else if(this.size.width !== undefined && this.size.height !== undefined)
        {
            this.width  = Math.min(this.size.width, desktop.width);
            this.height = Math.min(this.size.height, desktop.height);
            if(this.cssclass.indexOf(' window-movable') < 0) this.cssclass += ' window-movable';
        }
        else
        {
            this.width  = desktop.width;
            this.height = desktop.height;
            this.size = 'max';
            this.position  = {x: desktop.x, y: desktop.y};
            if(this.cssclass.indexOf(' window-max') < 0) this.cssclass += ' window-max';
        }

        /* Init position setting */
        if(this.position == 'center')
        {
            this.left = Math.max(desktop.x, desktop.x + (desktop.width - this.width)/2);
            this.top  = Math.max(desktop.y, desktop.y + (desktop.height - this.height)/2);
        }
        else if(this.position.x !== undefined && this.position.y !== undefined)
        {
            this.left = Math.max(desktop.x, this.position.x);
            this.top  = Math.max(desktop.y, this.position.y);
        }
        else
        {
            defaultWindowPos = {x: defaultWindowPos.x + settings.defaultWinPosOffset, y: defaultWindowPos.y + settings.defaultWinPosOffset};
            this.left = defaultWindowPos.x;
            this.top  = defaultWindowPos.y;
        }

        /* Determine the window whether be movable */
        if(this.display != 'fixed' && this.size != 'max' && this.cssclass.indexOf(' window-movable') < 0) this.cssclass += ' window-movable';
    };

    /* Recaculate the postion and size before create window */
    entry.prototype.reCalPosSize = function()
    {
        if(this.size.width !== undefined && this.size.height !== undefined)
        {
            this.width  = Math.min(this.size.width, desktop.width);
            this.height = Math.min(this.size.height, desktop.height);
        }
        else if(this.size == 'max')
        {
            this.width     = desktop.width;
            this.height    = desktop.height;
            this.left      = desktop.x;
            this.top       = desktop.y;
            this.position  = desktop.position;
        }

        if(this.position == 'center')
        {
            this.left = Math.max(desktop.x, desktop.x + (desktop.width - this.width)/2);
            this.top  = Math.max(desktop.y, desktop.y + (desktop.height - this.height)/2);
        }
    };

    /* Transform the entry to window html tags from template */
    entry.prototype.toWindowHtml = function()
    {
        this.reCalPosSize();
        return settings.windowTplt.format(this);
    };

    /* Transform to shortcut html tag show in left bar from teamplte */
    entry.prototype.toLeftBarShortcutHtml = function()
    {
        return settings.leftBarShortcutTplt.format(this);
    };

    /* Transform to shortcut html tag show in task bar form template */
    entry.prototype.toTaskBarShortcutHtml = function()
    {
        if(this.display != 'modal') return settings.taskBarShortcutTplt.format(this);
    };

    /* Transform to shortcut html tag in entry list form template */
    entry.prototype.toEntryListShortcutHtml = function()
    {
        return settings.entryListShortcutTplt.format(this);
    };

    /* Create a window object */
    entry.prototype.createWindow = function()
    {
        if(this.display == 'modal') $('#modalContainer').append(this.toWindowHtml());
        else $('#deskContainer').append(this.toWindowHtml());
        $('#taskbar .bar-menu').append(this.toTaskBarShortcutHtml());
        $('.app-btn[data-id="'+this.id+'"]').addClass('open');

        this.opened = true;
        return new windowx(this);
    };

    /* Initialize */
    entry.prototype.init = function(options, ignoreDefault)
    {
        if(!desktop)
        {
            var w = $(window);
            desktop = {x: desktopPos.x, y: desktopPos.y, width: w.width() - desktopPos.x, height: w.height() - desktopPos.y};
        }

        /* extend options from params */
        $.extend(this, ignoreDefault ? null : this.getDefaults(options.id), this, options);

        this.sys        = this.sys && this.sys !== '0';
        this.hasMenu    = this.menu == 'menu' || this.menu == 'all';
        this.idstr      = settings.windowidstrTemplate.format(this.id);
        this.cssclass   = '';

        /* you can use icon font name or an image url */
        if(this.icon.indexOf('icon-') == 0) this.iconhtml = '<i class="icon ' + this.icon + '"></i>';
        else if(this.icon.length > 0) this.iconhtml = '<img src="' + this.icon + '" alt="" />';
        else
        {
            var name = this.abbr || this.name;
            var nameL = name.length;
            this.iconhtml = '<i class="icon icon-default" style="background-color: hsl(' + (this.id*47%360) + ', 100%, 40%)"><span>' + (nameL > 0 ? name.slice(0, 1).toUpperCase() : '') + '</span><span class="text-extra">' + (nameL > 1 ? name.slice(1, 2).toUpperCase() : '') + '</span></i>';
        }

        /* mark modal with css class */
        if(this.display == 'modal')
        {
            this.cssclass += ' window-modal';
            this.position  = 'center';
        }

        /* window open type */
        if(this.open == 'iframe' || this.open == 'json')
        {
            this.cssclass += ' window-' + this.open;
        }

        /* init display setting */
        if(this.display == 'fixed' || this.display == 'modal')
        {
            this.cssclass += ' window-fixed';
        }

        /* init control bar setting */
        switch(this.control)
        {
            case '':
            case 'simple':
                this.cssclass += ' window-control-simple';
                break;
            case 'none':
                this.cssclass += ' window-control-none';
                break;
            case 'full':
                this.cssclass += ' window-control-full';
                break;
        }

        this.resetPosSize();
    };

    /**
     * The desktop Manager Object
     *
     * Manage the windows, menu, shortcuts and fullscreen apps
     */
    var desktopManager = function()
    {
        this.init();
        this.bindEvents();
    }

    /* Turn off the fullscreen mode */
    desktopManager.prototype.cancelFullscreenMode = function()
    {
        this.$.removeClass('fullscreen-mode');
        $('.fullscreen-active').removeClass('fullscreen-active');
        this.isFullscreenMode = false;
        $('.fullscreen-btn').each(function(){$(this).removeClass($(this).attr('data-toggle-class'))});
    }

    /* Turn on the fullscreen mode */
    desktopManager.prototype.turnOnFullscreenMode = function()
    {
        this.$.addClass('fullscreen-mode');
        this.isFullscreenMode = true;
        $('.fullscreen-active').removeClass('fullscreen-active');
        $('.fullscreen-btn, .app-btn').each(function(){$(this).removeClass($(this).attr('data-toggle-class')).removeClass('active')});
    }

    /* Turn on the modal mode */
    desktopManager.prototype.turnOnModalMode = function()
    {
        this.$.addClass('modal-mode');
    }

    desktopManager.prototype.toggleDropmenuMode = function(name, on)
    {
        $('body').toggleClass('dropdown-mode-' + name, on);
    }

    /* Determine wheather has entry window opened*/
    desktopManager.prototype.hasTask = function()
    {
        return $('#taskbar .bar-menu li').length > 0;
    }

    /* Initialize */
    desktopManager.prototype.init = function()
    {
        this.$                = $('#desktop');
        this.$menu            = $('#apps-menu');
        this.$bottombar       = $('#bottomBar');
        this.isFullscreenMode = this.$.hasClass('fullscreen-mode');
        
        this.menu      = new menu();
        this.position  = desktopPos;
        this.x         = desktopPos.x;
        this.y         = desktopPos.y;

        this.shortcuts      = new shortcuts();
        this.startMenu      = new startMenu();
        this.fullScreenApps = new fullScreenApps();
        windows             = new windowsManager();

        this.updateBrowserUrl(indexUrl, true, 'index', {tag: 'index'});
    }

    /* Refresh the desktop */
    desktopManager.prototype.refreshShortcuts = function()
    {
        this.shortcuts.render();
    };

    /* Bind events */
    desktopManager.prototype.bindEvents = function()
    {
        $(window).resize($.proxy(function() // handle varables when window size changed
        {
            /* refresh desktop size */
            this.size   = {width: this.$.width() - this.x, height: this.$.height() - this.y - settings.bottomBarHeight};
            this.width  = this.size.width;
            this.height = this.size.height;

            /* refresh app menu size */
            this.refreshMenuSize()

            /* refresh entry window size */
            windows.afterBrowserResized();
            this.fullScreenApps.afterBrowserResized();
        }, this)).resize();

        $(document).on('click', '[data-toggle-class]', function()
        {
            var $e = $(this);
            var target = $e.attr('data-target');
            if(target !== undefined) target = $(target); else target = $e;
            target.toggleClass($e.attr('data-toggle-class'));
            $e.toggleClass('toggle-on');
        });
    };

    desktopManager.prototype.refreshMenuSize = function()
    {
        var $menu      = this.$menu;
        var $icons     = $menu.children('.bar-menu:not(#moreOptionMenu)').find('li:not(#s-menu-allapps)');
        var iconHeight = $icons.height();
        var iconsCount = $icons.length;
        var maxHeight  = $menu.height();
        var moreOption = (iconsCount + 1) * iconHeight > maxHeight;
        var $btn       = $('#moreOptionBtn');

        $menu.toggleClass('more-option', moreOption);
        if(moreOption)
        {
            var start = Math.floor((maxHeight - (2 * iconHeight)) / iconHeight);
            if($btn.data('icons-count') != (iconsCount - start))
            {
                var $moreIcons = $icons.removeClass('option')
                .slice(start)
                .addClass('option').clone().removeClass('option');
                $moreIcons.children('.app-btn').attr('data-btn-type', 'list').attr('data-placement', 'bottom').attr('data-tip-class', '');

                $btn.addClass('active').data('icons-count', $moreIcons.length)
                    .data('icons', $moreIcons)
                    .attr('data-original-title', settings.moreOptionTip.format($moreIcons.length));
                setTimeout(function(){$btn.removeClass('active')}, 200);
                this.menu.tryLayoutMenu();            
            }
        }
        else
        {
            this.menu.hideMoreMenu();
        }
    }

    /* Update browser url in address bar by change browser history */
    desktopManager.prototype.updateBrowserUrl = function(url, isForcePush, title, state)
    {
        url = url || indexUrl;
        state = state || {};
        try
        {
            if(isForcePush) window.history.pushState(state, title, url);
            else window.history.replaceState(state, title, url);
        }
        catch(e){}
    };

    /* Update browser title */
    desktopManager.prototype.updateBrowserTitle = function(title)
    {
        document.title = title || indexTitle;
    };

    /**
     * The Windows Manager Object
     *
     * Manage all windows displayed on desktop
     */
    var windowsManager = function()
    {
        this.init();
        this.bindEvents();
    };

    /* Initialize */
    windowsManager.prototype.init = function()
    {
        this.movingWindow     = null;
        this.activedWindow    = null;
        this.lastActiveWindow = null;
        this.opens            = {};
        this.shows            = []; // work as stack
    };

    /* Query window object, the query id can be window id or entry id */
    windowsManager.prototype.query = function(q)
    {
        return this.opens[q] || this.opens[settings.windowidstrTemplate.format(q)] || this.activedWindow;
    };

    /* Active a window with query id*/
    windowsManager.prototype.active = function(q)
    {
        var win = this.query(q);
        if(win == undefined)
        {
            this.activeLastWindow();
        }
        else
        {
            win.active();
        }
    };

    /* Re-active the last actived window */
    windowsManager.prototype.activeLastWindow = function(toUnActive)
    {
        if(toUnActive) this.unActiveWindow(toUnActive);
        if(this.shows.length)
        {
            this.query(this.shows[this.shows.length - 1]).active();
        }
        else
        {
            desktop.fullScreenApps.toggle('home');
        }
    };

    /* Close a window */
    windowsManager.prototype.close = function(q)
    {
        var win = this.query(q);
        if(win == undefined) return;
        win.close();
        delete this.opens[win.idstr];
    };

    /* Reload the actived window */
    windowsManager.prototype.reload = function()
    {
        if(this.activedWindow) this.activedWindow.reload();
    };

    /* Open a entry window */
    windowsManager.prototype.openEntry = function(et, url, go2index)
    {
        if(typeof et == 'string')
        {
            et = getEntry(et);
        }

        if(!et)
        {
            bootbox.alert(settings.entryNotFindTip);
            return;
        }
        else if(et.display == 'fullscreen' && desktop.fullScreenApps)
        {
            desktop.fullScreenApps.show(et.id);
            return;
        }

        if(url && url.indexOf('javascript:') >= 0 ) url = null;

        var win = this.opens[et.idstr];

        if(!win)
        {
            if(et.open == 'blank')
            {
                window.open(et.url);
                return;
            }

            win = et.createWindow();
            this.opens[et.idstr] = win;
            win.reload(url);
        }
        else if((go2index && !win.isIndex()) || (url != null && url != '' && url != win.url))
        {
            win.reload(url, go2index);
        }

        win.show();

        if(et.display != 'modal') desktop.cancelFullscreenMode();
        else desktop.turnOnModalMode();
    };

    /* Open a temporary entry window, entry options required */
    windowsManager.prototype.open = function(options)
    {
        var config = $.extend(
        {
            id      : windowIdTeamplate.format(windowIdSeed++),
            name    : '',
            open    : 'iframe',
            display : 'modal',
            size    : 'default',
            menu    : false,
            control : 'full'
        }, options);
        var et = new entry(config);
        this.openEntry(et);
    };

    /* Unactive a window */
    windowsManager.prototype.unActiveWindow = function(win)
    {
        for(var i = this.shows.length - 1; i >= 0; i--)
        {
            if(this.shows[i] == win.id)
            {
                this.shows.splice(i, 1);
                win.$.removeClass('window-active');
                return true;
            }
        }
        return false;
    };

    /* active a window */
    windowsManager.prototype.activeWindow = function(win)
    {
        if(this.shows.length) this.opens[settings.windowidstrTemplate.format(this.shows[this.shows.length - 1])].$.removeClass('window-active');
        this.unActiveWindow(win);
        win.$.css('z-index', windowZIndexSeed++).addClass('window-active');
        this.shows.push(win.id);
    };

    /* Bind events */
    windowsManager.prototype.bindEvents = function()
    {
        $('#desktop').on('click', '.window', function() // active by click a non actived window
        {
            windows.active($(this).attr('id'));
        }).on('mousedown', '.movable,.window-movable .window-head', function(e) // make the window movable with class '.movable' or '.window-movable'
        {
            var win = $(this).closest('.window:not(.window-max)');
            if(win.length < 1) return;

            windows.movingWindow = windows.opens[win.attr('id')];

            var mwPos = win.position();
            win.data('mouseOffset', {x: e.pageX - mwPos.left, y: e.pageY - mwPos.top}).addClass('window-moving');
            $(document).bind('mousemove',mouseMove).bind('mouseup',mouseUp)
            e.preventDefault();

            function mouseUp()
            {
                $('.window.window-moving').removeClass('window-moving');
                windows.movingWindow = null;
                $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp)
            }

            function mouseMove(event)
            {
                if(windows.movingWindow && windows.movingWindow.hasClass('window-moving'))
                {
                    var offset = windows.movingWindow.$.data('mouseOffset');
                    windows.movingWindow.$.css(
                    {
                        left : event.pageX-offset.x,
                        top : event.pageY-offset.y
                    });
                }
            }
        }).keydown(this.handleWindowKeydown) // listen the keydown events
        .on('click', '.max-win', function(event) // max-win
        {
            windows.opens[$(this).closest('.window').attr('id')].toggleSize();
            stopEvent(event);
        }).on('dblclick', '.window-head', function(event) // double click for max-win
        {
            windows.opens[$(this).closest('.window').attr('id')].toggleSize();
            stopEvent(event);
        }).on('click', '.close-win', function(event) // close-win
        {
            var q = $(this).closest('.window').attr('data-id');
            if(!q) q = $(this).closest('.app-btn').attr('data-id');
            if(!q) q = $('#taskMenu.show').data('id');
            windows.close(q);
        }).on('click', '.min-win', function(event) // min-win
        {
            windows.opens[$(this).closest('.window').attr('id')].hide();
            stopEvent(event);
        }).on('click', '.reload-win', function() // reload window content
        {
            var q = $(this).closest('.window').attr('data-id');
            if(!q) q = $(this).closest('.app-btn').attr('data-id');
            if(!q) q = $('#taskMenu.show').data('id');

            var win = windows.query(q);
            win.reload();
            win.show();
        }).on('click', '.open-win', function()
        {
            var id = $(this).closest('.dropdown-menu').data('id');
            windows.openEntry(id);
        }).on('click', '.delete-entry', function()
        {
            if(!$.isFunction(settings.onDeleteEntry)) return;
            var id = $(this).closest('.dropdown-menu').data('id');
            var et = getEntry(id);
            if(et && confirm(settings.confirmRemoveEntry.format(et.name)))
            {
                settings.onDeleteEntry(et, function(result)
                {
                    if(result)
                    {
                        $.zui.messager.info(settings.removedEntry.format(et.name));
                        var option = {id: et.id};
                        option['delete'] = true;
                        $.refreshDesktop([option]);
                    }
                });
            }
        }).on('click', '.remove-entry', function()
        {
            if(!$.isFunction(settings.onUpdateEntryMenu)) return;
            var id = $(this).closest('.dropdown-menu').data('id');
            var et = getEntry(id);
            if(et && (et.menu == 'all' || et.menu == 'menu'))
            {
                var menu = (et.menu == 'menu') ? 'none' : 'list';
                settings.onUpdateEntryMenu({id: id, menu: menu}, function(result)
                {
                    if(result)
                    {
                        et.menu = menu;
                        et.hasMenu = false;
                        $.refreshDesktop([et]);
                    }
                });
            }
        }).on('click', '.fix-entry', function()
        {
            if(!$.isFunction(settings.onUpdateEntryMenu)) return;
            var id = $(this).closest('.dropdown-menu').data('id');
            var et = getEntry(id);
            if(et && et.menu != 'menu' && et.menu != 'all')
            {
                var menu = (et.menu != 'list') ? 'menu' : 'all';
                settings.onUpdateEntryMenu({id: id, menu: menu}, function(result)
                {
                    if(result)
                    {
                        et.menu = menu;
                        et.hasMenu = true;
                        $.refreshDesktop([et]);
                    }
                });
            }
        });

        try
        {
            window.addEventListener('popstate', function(e)
            {
                if (history.state)
                {
                    var state = e.state;
                }
            }, false);
        }
        catch(e){}
    };

    /* Handle window key down event */
    windowsManager.prototype.handleWindowKeydown = function(event)
    {
        if(event.keyCode == 116 || (event.ctrlKey && event.keyCode == 82)) // F5 or Ctrl+R
        {
            windows.reload();

            try{window.event.keyCode = 0;}catch(e){} // for IEs  
            try{window.frames[theLoadingFrame].event.keyCode = 0;}catch(e){} // for IEs  
            event.cancelBubble = true;
            event.returnValue  = false;
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    };

    /* Handle the status after browser size changed */
    windowsManager.prototype.afterBrowserResized = function()
    {
        for(var i in this.opens)
        {
            this.opens[i].afterResized();
        }
    };

    /**
     * The Window Object
     *
     * A window object to manage the window behavior and store the window status
     * Be deleted after closed
     *
     * @param object entry
     */
    var windowx = function(et)
    {
        this.init(et);
    };

    /* Initialize */
    windowx.prototype.init = function(et)
    {
        this.$ = $('#' + et.idstr);

        if(this.$.length < 1) throw new Error('Can not find the window: ' + et.idstr + ' when init it.');

        this.firstLoad = true;
        this.idstr     = this.$.attr('id');
        this.id        = this.$.attr('data-id');
        this.isModal   = this.$.hasClass('window-modal');
        this.entry     = et;
        this.indexUrl  = et.url;
        this.getUrl();

        this.afterResized(true);
    };

    /* Determine whether has the given class */
    windowx.prototype.hasClass = function(c)
    {
        return this.$.hasClass(c);
    };

    /* Determine whether the window is hiding(Mminimized) */
    windowx.prototype.isHide = function()
    {
        return this.hasClass('window-min');
    };

    /* Determine whether the window is loading content */
    windowx.prototype.isLoading = function()
    {
        return this.hasClass('window-loading');
    };

    /* Determine whether the window is fullscreen */
    windowx.prototype.isFullscreen = function()
    {
        return this.hasClass('window-fullscreen');
    };

    /* Determine whether the window is maximized */
    windowx.prototype.isMax = function()
    {
        return this.hasClass('window-max');
    };

    /* Determine whether the window is fixed size */
    windowx.prototype.isFixed = function()
    {
        return this.hasClass('window-fixed');
    };

    /* Determine whether the window is actived */
    windowx.prototype.isActive = function()
    {
        return this.hasClass('window-active');
    };

    /* Get the current content url */
    windowx.prototype.getUrl = function()
    {
        this.url = this.$.attr('data-url') || this.entry.url;
        return this.url;
    };

    windowx.prototype.getTitle = function()
    {
        this.title = this.title || this.$.attr('data-title') || this.entry.name;
        return this.title;
    };

    windowx.prototype.setTitle = function(title)
    {
        this.title = title || this.entry.name;
        this.$.attr('data-title', this.title);
    };

    windowx.prototype.setUrl = function(url)
    {
        this.url = url || this.indexUrl;
        this.$.attr('data-url', this.url);
    };

    windowx.prototype.isIndex = function()
    {
        return this.url == this.indexUrl;
    };

    /* Show or hide the window */
    windowx.prototype.toggle = function()
    {
        if(this.isHide()) this.show();
        else this.hide();
    };

    /* Hide the window by miximized */
    windowx.prototype.hide = function(silence)
    {
        if(!this.isHide())
        {
            this.$.fadeOut(settings.animateSpeed).addClass('window-min');
            if(!silence)
                windows.activeLastWindow(this);
        }
    };

    /* Show the window */
    windowx.prototype.show = function()
    {
        if(this.isHide())
        {
            this.$.fadeIn(settings.animateSpeed).removeClass('window-min');
        }
        this.active();
    };

    /* Reload the content */
    windowx.prototype.reload = function(url, go2index)
    {
        if(!this.isLoading())
        {
            if(go2index) this.setUrl();
            else if(url) this.setUrl(url);

            this.$.addClass('window-loading').removeClass('window-error').find('.reload-win i').addClass('icon-spin');

            if(this.firstLoad) this.$.addClass('window-first');

            switch(this.entry.open)
            {
                case 'iframe':
                    this.loadIframe(go2index);
                    break;
                case 'html':
                    this.loadHtml();
                    break;
            }
        }
        else
        {
            messager.warning(settings.busyTip);
        }
    };

    /* Load content with ajax */
    windowx.prototype.loadHtml = function()
    {
        var content = this.$.find('.window-content').html('');
        $.ajax(
        {
            url: this.getUrl(),
            dataType: 'html',
        })
        .done(function(data)
        {
            content.html(data);
        })
        .fail(function()
        {
            this.$.addClass('window-error');
        })
        .always(function()
        {
            this.$.removeClass('window-loading').removeClass('window-first');
            this.$.find('.reload-win i').removeClass('icon-spin');

            this.firstLoad = false;
        });
    };

    /* Load content with iframe */
    windowx.prototype.loadIframe = function(go2index)
    {
        var fName = 'iframe-' + this.id;
        theLoadingFrame = fName;
        var frame = document.getElementById(fName);
        var win = this;

        if(frame)
        {
            try
            {
                if(go2index) frame.contentWindow.location.replace(this.indexUrl);
                else frame.contentWindow.location.replace(this.getUrl());
            }
            catch(e)
            {
                document.getElementById(fName).src = (go2index ? this.indexUrl : this.getUrl());
            }
        }
        else
        {
            this.$.find('.window-content').html(settings.frameTplt.format(this));
            frame = document.getElementById(fName);
        }

        frame.onload = frame.onreadystatechange = function()
        {
            if (this.readyState && this.readyState != 'complete') return;

            win.$.removeClass('window-loading').removeClass('window-first').find('.reload-win i').removeClass('icon-spin');

            try
            {
                var $frame = $(window.frames[fName].document);

                if($frame.length)
                {
                    var url = $frame.context.URL;
                    win.setUrl(url);
                    win.setTitle($frame.find('head > title').text());
                    if(win.entry) win.entry.currentUrl = url;

                    if(win.firstLoad)
                    {
                        win.indexUrl = url;
                        var colorTone = $frame.find('.navbar-inverse');
                        if(colorTone.length)
                        {
                            win.tone = colorTone.css('background-color');
                            $('body').css('background-color', win.tone);
                        }
                    }

                    $frame.unbind('keydown', windows.handleWindowKeydown).keydown(windows.handleWindowKeydown).data('data-id', win.idStr);
                }

                var iframe$ = window.frames[fName].$;
                if(iframe$)
                {
                    iframe$.extend({refreshDesktop: $.refreshDesktop, openEntry: $.openEntry});
                }
            }
            catch(e){}

            win.updateEntryUrl(win.firstLoad);
            win.firstLoad = false;
        }
    };

    /* Update address bar when content url changed */
    windowx.prototype.updateEntryUrl = function(isForcePush)
    {
        desktop.updateBrowserUrl(this.url || this.indexUrl, isForcePush);
        desktop.updateBrowserTitle(this.getTitle());
    };

    /* Close the window */
    windowx.prototype.close = function()
    {
        var win = this.$;
        if(win.hasClass('window-safeclose') && (!confirm(settings.confirmClose.format(win.find('.window-head strong').text()))))
            return;

        /* save the last position and size */
        if(this.entry)
        {
            this.entry.left   = Math.max(desktopPos.x, win.position().left);
            this.entry.top    = Math.max(desktopPos.y, win.position().top);
            this.entry.width  = win.width();
            this.entry.height = win.height();
            this.entry.opened = false;
        }

        win.fadeOut(settings.animateSpeed, $.proxy(function()
        {
            $('.app-btn[data-id="' + this.id + '"]').removeClass('open').removeClass('active');
            $('#s-task-' + this.id).remove();
            win.remove();
            if(this.isModal) $('#desktop').removeClass('modal-mode');

            if(!desktop.hasTask() && !desktop.isFullscreenMode)
            {
                desktop.updateBrowserUrl();
                desktop.updateBrowserTitle();
                $('#showDesk').click();
            }
        }, this));

        $('.tooltip').remove();
        if(!this.isModal) windows.activeLastWindow(this);
    };

    /* Change the window status to maximized or normal */
    windowx.prototype.toggleSize = function(forceMax)
    {
        var win = this.$;
        if(this.isFixed()) return;

        if(forceMax === undefined) forceMax = !this.isMax();

        if(forceMax)
        {
            var dSize = desktop.size;
            win.data('orginLoc', 
            {
                left   : win.css('left'),
                top    : win.css('top'),
                width  : win.css('width'),
                height : win.css('height')
            }).addClass('window-max').css(
            {
                left   : desktop.position.x,
                top    : desktop.position.y,
                width  : dSize.width,
                height : dSize.height
            }).find('.icon-resize-full').removeClass('icon-resize-full').addClass('icon-resize-small');
        }
        else
        {
            var orginLoc = win.data('orginLoc');
            win.removeClass('window-max').css(
            {
                left   : orginLoc.left,
                top    : orginLoc.top,
                width  : orginLoc.width,
                height : orginLoc.height
            }).find('.icon-resize-small').removeClass('icon-resize-small').addClass('icon-resize-full');
        }
        this.afterResized(true);
    };

    /* Handle status after window size changed */
    windowx.prototype.afterResized = function(onlyAppSize)
    {
        if(!onlyAppSize)
        {
            if(this.isMax())
            {
                this.$.width(desktop.width)
                    .height(desktop.height)
                    .css(
                    {
                        left : desktop.x,
                        right: desktop.y
                    });
            }
        }

        var offset = this.$.hasClass('window-control-full') ? settings.windowHeadheight : 0;
        this.$.find('.window-content').height(this.$.height() - offset);
    };

    /* Active the window */
    windowx.prototype.active = function()
    {
        $('.app-btn.active, .fullscreen-btn.active').removeClass('active');
        $('.app-btn[data-id="' + this.id + '"]').addClass('active');
        $('body').css('background-color',this.tone ? this.tone : indexTone);

        windows.activeWindow(this);
        if(this.isActive())
        {
            if(this.isHide())
            {
                this.show();
            }
            this.updateEntryUrl();
            return;
        }

        this.updateEntryUrl();
        debugger;
    };

    /**
     * The start menu Object
     */
    var startMenu = function()
    {
        /* Initialize */
        this.init = function()
        {
            var menu = $('#startMenu');

            $(document).click(function()
            {
                menu.removeClass('in');
                setTimeout(function(){menu.removeClass('show');}, 100);
                desktop.toggleDropmenuMode('startmenu', false);
            });

            $('#start').click(function(e)
            {
                var isShowed = menu.hasClass('show');
                if(isShowed)
                {
                    menu.removeClass('in');
                    setTimeout(function(){menu.removeClass('show');}, 100);
                }
                else
                {
                    desktop.menu.hideMoreMenu();
                    menu.addClass('show');
                    setTimeout(function(){menu.addClass('in')}, 0);
                }
                desktop.toggleDropmenuMode('startmenu', !isShowed);
                e.stopPropagation();
            });
        }

        this.init();
    };

    /**
     * The fullscreen manager
     */
    function fullScreenApps()
    {
        /* Initialize */
        this.init = function()
        {
            this.$fullscreens = $('.fullscreen');
            this.$search = $('#search');

            this.handleAllApps();
            this.handleHomeBlocks();
        };

        /* Bind events */
        this.bindEvents = function()
        {
            $('.fullscreen-btn').click(function()
            {
                /* replace function 'show()' with 'toggle()' to change the behavoir */
                desktop.fullScreenApps.toggle($(this).attr('data-id'));
            });
        };

        /* Handle the app: all app list */
        this.handleAllApps = function()
        {
            var that = this;
            $('#appSearchNav').on('click', '.app-search', function()
            {
                var $btn = $(this);
                var $li = $btn.closest('li');
                if(!$li.hasClass('active'))
                {
                    $('#appSearchNav > li.active').removeClass('active');
                    $li.addClass('active');
                    that.searchApps($btn.data('key'));
                }
            });

            that.$search.on('keyup paste input change', function(e)
            {
                var $selected = $('#allAppsList .app-btn.search-selected');
                if(e.which == 27) // pressed esc
                {
                    that.searchApps();
                    return;
                }
                else if(e.which == 13) // pressed enter
                {
                    $selected.click();
                }
                else if(e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) // pressed left, up, down, right
                {
                    var $next = $selected.closest('li')[e.which > 38 ? 'nextAll' : 'prevAll']().not('.search-hide');
                    if($next.length)
                    {
                        $selected.removeClass('search-selected');
                        $next.first().find('.app-btn').addClass('search-selected');
                    }
                    return;
                }

                var $search = that.$search;
                var val = $search.val().toLowerCase();

                if(val === $search.data('search')) return;
                $search.data('search', val);

                $selected.removeClass('search-selected');
                var searchCount = 0;
                if(val.length > 0)
                {
                    var keys = val.split(' ');
                    var first = true;
                    $('#allAppsList .app-btn').each(function()
                    {
                        var btn = $(this);
                        var r = true, et = getEntry(btn.attr('data-id'));
                        var idkey = '#' + et.id.toLowerCase(),
                            codeKey = et.code ? et.code.toLowerCase() : false,
                            nameKey = et.name.toLowerCase();
                        for(var ki in keys)
                        {
                            var k = keys[ki];
                            r = r && (k=='' || (k == ':open' && btn.hasClass('open')) || ((k == ':menu' && et.hasMenu)) || ((k == ':!menu' && !et.hasMenu)) || (nameKey.indexOf(k) > -1) || (codeKey && codeKey.indexOf(k) > -1) || idkey == k);
                            if(!r) break;
                        }

                        if(r) searchCount++;
                        btn.closest('li').toggleClass('search-hide', !r);

                        if(r && first)
                        {
                            first = false;
                            btn.addClass('search-selected');
                        }
                    });

                    $('#cancelSearch').fadeIn('fast');
                }
                else
                {
                    $('.search-hide').removeClass('search-hide');
                    $('#cancelSearch').fadeOut('fast');
                }

                $('#appSearchNav > li.active').removeClass('active');
                $('#appSearchNav .app-search[data-key="' + val + '"]').closest('li').addClass('active').find('.search-count').text(searchCount || '');
            });

            $('#cancelSearch').click(function(){that.searchApps('');});
        };

        this.searchApps = function(key, focus)
        {
            if(key === undefined || key === false) key = this.$search.val();
            this.$search.data('search', false).val(key).change();
            if(focus) this.$search.focus();
        };

        /* Handle the app: home blocks, usex  dashboard control in zui */
        this.handleHomeBlocks = function()
        {
            $('#home .dashboard').dashboard(
            {
                height            : 240,
                draggable         : true,
                afterOrdered      : afterOrdered,
                shadowType        : false,
                sensitive         : true,
                panelRemovingTip  : settings.confirmRemoveBlock,
                afterPanelRemoved : afterPanelRemoved
            });
            $('#home .refresh-all-panel').click(function()
            {
                var $icon = $(this).find('.icon-repeat').addClass('icon-spin');
                $('#home .dashboard .refresh-panel').click();
                setTimeout(checkDone, 500);

                function checkDone()
                {
                    if($('#home .dashboard .panel-loading').length) setTimeout(checkDone, 500);
                    else $icon.removeClass('icon-spin');
                }
            });

            function afterPanelRemoved(index)
            {
                if(settings.onDeleteBlock && $.isFunction(settings.onDeleteBlock))
                {
                    settings.onDeleteBlock(index);
                    $.zui.messager.info(settings.removedBlock);
                }
            }

            function afterOrdered(newOrders)
            {
                if(settings.onBlocksOrdered && $.isFunction(settings.onBlocksOrdered))
                {
                    settings.onBlocksOrdered(newOrders);
                }

                $.zui.messager.success(settings.orderdBlocksSaved);
            }
        };

        /* Show a fullscreen app window */
        this.show = function(id)
        {
            desktop.turnOnFullscreenMode();

            $('#' + id).addClass('fullscreen-active');
            $('.fullscreen-btn[data-id="' + id + '"],.app-btn[data-id="' + id + '"]').addClass('active');
            desktop.updateBrowserUrl();
            var et = getEntry(id);
            desktop.updateBrowserTitle(et ? et.name : null);

            if(id == 'allapps') this.searchApps(false, true);

            $('body').css('background-color', indexTone);
        };

        /* Hide a fullscreen app window */
        this.hide = function(id)
        {
            $('.fullscreen-btn[data-id="' + id + '"],.app-btn[data-id="' + id + '"]').removeClass('active');
            desktop.cancelFullscreenMode();
            windows.active();
        };

        /* Show or hide a fullscreen app window */
        this.toggle = function(id)
        {
            if($('#' + id).hasClass('fullscreen-active')) this.hide(id);
            else this.show(id);
        };

        /* Handle status after browser size changed */
        this.afterBrowserResized = function()
        {
            this.$fullscreens.width(desktop.width).css({left: desktop.x, top: desktop.y, bottom: settings.bottomBarHeight});;
        };

        this.init();
        this.bindEvents();
    };

    /**
     * Manage the shortcuts
     */
    function shortcuts()
    {
        /* Initialize */
        this.init = function()
        {
            this.$leftBar     = $('#leftBar');
            this.$taskBar     = $('#taskbar');
            this.$appsMenu    = $('#apps-menu .bar-menu');
            this.$allAppsList = $("#allAppsList .bar-menu");
            this.firstRender = true;

            this.render();
            this.bindEvents();
        };

        /* Render the shortcuts */
        this.render = function()
        {
            this.$appsMenu.empty();
            this.$allAppsList.empty();
            this.showAll();

            if(this.firstRender)
            {
                this.firstRender = false;
                this.$appsMenu.sortable({trigger: '.app-btn', selector: 'li', start: function()
                {
                    $('body').addClass('mute-tooltip');
                }, always: function()
                {
                    setTimeout(function(){$('.tooltip').remove(); $('body').removeClass('mute-tooltip');}, 500);
                }, finish: function(data)
                {
                    if(!$.isFunction(settings.onSortEntries)) return;

                    var orders = {};
                    var orderNext = 1;
                    data.list.each(function()
                    {
                        orders[$(this).find('.app-btn').data('id') + ''] = orderNext++;
                    });

                    $.each(entries, function(idx, et)
                    {
                        if(et.id == 'allapps')
                        {
                            orders[et.id] = et.order;
                        }
                        else if(orders[et.id])
                        {
                            et.order = orders[et.id];
                        }
                        else
                        {
                            et.order = orderNext++;
                            orders[et.id] = et.order;
                        }
                    });

                    settings.onSortEntries(orders, function(result)
                    {
                        if(result)
                        {
                            $.refreshDesktop();
                        }
                    });
                }});
            }
            else
            {
                this.$appsMenu.sortable('reset');
            }
        };

        /* Show all shortcuts */
        this.showAll = function()
        {
            for(var index in entries)
            {
                this.show(entries[index]);
            }

            $('.entries-count').text(entries.length - 1);

            if(desktop && desktop.isFullscreenMode && $('#search').val() !== '')
            {
                desktop.fullScreenApps.searchApps(false);
            }
        };

        /* show a shortcut */
        this.show = function(entry)
        {
            var $shortcut;
            var activedId = (windows && windows.shows.length) ? windows.shows[windows.shows.length - 1] : null;
            if(entry.hasMenu)
            {
                $shortcut = $(entry.toLeftBarShortcutHtml());
                if(activedId && entry.id === activedId)
                {
                    $shortcut.find('.app-btn').addClass('active');
                }
                this.$appsMenu.append($shortcut);
            }
            if(entry.menu == 'all' || entry.menu == 'list')
            {
                $shortcut = $(entry.toEntryListShortcutHtml());
                if(entry.opened)
                {
                    $shortcut.find('.app-btn').addClass('open');
                }
                this.$allAppsList.append($shortcut);
            }
        };

        /* Bind events */
        this.bindEvents = function()
        {
            $(document).on('click', '.window-btn', function(event)
            {
                var btn = $(this);
                windows.open(
                {
                    url  : btn.attr('href') || btn.attr('data-url'),
                    open : btn.attr('data-open') || 'iframe', 
                    icon : btn.attr('data-icon'), 
                    name : btn.attr('data-name')
                });
                stopEvent(event);
                return false;
            }).on('click', '.app-btn', function(event)
            {
                var $this = $(this);
                var et = getEntry($this.attr('data-id'));
                if(et)
                {
                    if(et.display == 'fullscreen' && desktop.fullScreenApps) desktop.fullScreenApps.toggle(et.id);
                    else windows.openEntry(et, $this.data('url') || $this.attr('href'));
                }
                else
                {
                    bootbox.alert(settings.entryNotFindTip);
                }

                desktop.menu.hideMoreMenu();
                event.preventDefault();
                if(et && et.id != 'superadmin')
                {
                    event.stopPropagation();
                    return false;
                }
            });

            this.$leftBar.bind('contextmenu', nocontextmenu);
            this.$taskBar.bind('contextmenu', nocontextmenu);
            this.$allAppsList.bind('contextmenu', nocontextmenu);

            $(document).on('mousedown', '.app-btn', function(e)
            {
                if(e.which == 3)
                {
                    var btn = $(this),
                        menu = $('#taskMenu');
                    if(!menu.length) menu = $(settings.taskBarMenuTplt).appendTo('#desktop');
                    if(menu.hasClass('show') && menu.data('id') == btn.data('id'))
                    {
                        menu.removeClass('in');
                        setTimeout(function(){menu.removeClass('show');}, 100);
                        return;
                    }
                    var et = getEntry(btn.data('id'));
                    var btnType = btn.data('btnType');
                    var offset = btn.offset();
                    var isListBtn = btnType === 'list',
                        isTaskBtn = btnType === 'task';

                    menu.find('.reload-win').toggle(!isListBtn && et.opened);
                    menu.find('.fix-entry').toggle(!isTaskBtn && !et.hasMenu);
                    menu.find('.remove-entry').toggle(!isTaskBtn && et.hasMenu && !et.forceMenu).find('span').text(settings[isListBtn ? 'removeFromMenuText' : 'removeText']);
                    menu.find('.close-win').toggle(!isListBtn && et.opened);
                    menu.find('.delete-entry').toggle(superadmin && !et.sys && isListBtn);

                    if(btnType == 'menu')
                    {
                        menu.css({left: desktopPos.x + 2, top: offset.top, bottom: 'inherit'});
                    }
                    else if(isListBtn)
                    {
                        var menuHeight = menu.outerHeight();
                        menu.css({left: e.clientX - 2, top: (menuHeight + e.clientY > desktop.height) ? (e.clientY - menuHeight - 2) : e.clientY, bottom: 'inherit'});
                    }
                    else if(btnType == 'task')
                    {
                        menu.css({left: offset.left, top: 'inherit', bottom: settings.bottomBarHeight + 2});
                        desktop.menu.hideMoreMenu();
                    }

                    desktop.toggleDropmenuMode('taskmenu', true);
                    menu.addClass('show in').data('id', et.id);
                }
            });

            $(document).click(function(e)
            {
                if($(e.target).hasClass('app-btn')) return false;
                var menu = $('#taskMenu');
                menu.removeClass('in');
                setTimeout(function(){menu.removeClass('show');}, 100);
                desktop.toggleDropmenuMode('taskmenu', false);
            });

            function nocontextmenu(event)
            {
                event.cancelBubble = true
                event.returnValue = false;
                return false;
            }

            function norightclick(e) 
            {
                if (window.Event)
                {
                    if (e.which == 2 || e.which == 3)
                    return false;
                }
                else if (event.button == 2 || event.button == 3)
                {
                    event.cancelBubble = true
                    event.returnValue  = false;
                    return false;
                }
            }
        };

        this.init();
    };

    /**
     * The menu object
     */
    function menu()
    {
        /* Initialize */
        this.init = function()
        {
            this.$leftBar = $('#leftBar');
            this.$menu = $('#moreOptionMenu');
            this.$btn = $('#moreOptionBtn');

            if(settings.autoHideMenu)
            {
                var $desktop = $('#desktop');
                $desktop.addClass('menu-auto');
                desktopPos.x = 2;
                setTimeout(this.hide, 2000);

                this.$leftBar.mouseover(this.show).mouseout(this.hide);;
            }

            this.bindEvents();
        };

        /* Hide the menu */
        this.hide = function()
        {
            var $leftBar = desktop.menu.$leftBar;
            $leftBar.removeClass('menu-show');
            setTimeout(function()
            {
                if(!$leftBar.hasClass('menu-show'))
                {
                    $leftBar.addClass('menu-hide');
                    $('#apps-menu .app-btn[data-toggle="tooltip"]').removeAttr('data-toggle');
                }
            }, 1000);
        };

        /* Show the menu */
        this.show = function()
        {
            desktop.menu.$leftBar.removeClass('menu-hide').addClass('menu-show');
            setTimeout(function(){$('#apps-menu .app-btn').attr('data-toggle', 'tooltip');}, 500);
        };

        /* Bind events */
        this.bindEvents = function()
        {
            // Handle more option btn
            var that = this;
            that.$btn.on('click', function(e)
            {
                that.toggleMoreMenu();
                e.stopPropagation();
            });
            
            $(document).click(function(e)
            {
                if($(e.target).is(that.$btn)) return;
                that.hideMoreMenu();
            });
        };

        this.toggleMoreMenu = function()
        {           
            if(this.$menu.hasClass('show')) this.hideMoreMenu();
            else this.showMoreMenu();
        };

        this.layoutMenu = function()
        {
            var $btn = this.$btn, $menu = this.$menu;
            var data = $btn.data('icons');
            if(data)
            {
                $menu.children().remove();
                $menu.append(data);
                $btn.data('icons', false);
                $menu.width(Math.ceil(Math.sqrt(data.length)) * 40);
            }
        };

        this.tryLayoutMenu = function()
        {
            if(this.$menu.hasClass('show')) this.layoutMenu();
        };

        this.showMoreMenu = function()
        {
            var $menu = this.$menu;
            this.layoutMenu();
            this.$btn.addClass('hover');
            $menu.css('background-color', $('body').css('background-color'));
            $menu.addClass('show');
            setTimeout(function(){$menu.addClass('in');}, 10);
            if(desktop.toggleDropmenuMode) desktop.toggleDropmenuMode('more-option', true);
        };

        this.hideMoreMenu = function()
        {
            var $menu = this.$menu;
            if($menu.hasClass('show'))
            {
                this.$btn.removeClass('hover');
                $menu.removeClass('in');
                setTimeout(function(){$menu.removeClass('show');}, 200);
                if(desktop.toggleDropmenuMode) desktop.toggleDropmenuMode('more-option', false);
            }
       };

        this.init();
    };

    /**
     * Stop propagation and prevent default behaviors
     */
    function stopEvent(event)
    {
        event.preventDefault();
        event.stopPropagation();
    }

    /* Open an entry by given id and url(optional) */
    function openEntry(id, url)
    {
        windows.openEntry(id, url, null);
    }

    /* 
     * Start ips
     *
     * @param  array  entiresOptions
     * @param  object options
     * @return void 
     */
    function start(entriesOptions, options)
    {
        initSettings(options);
        initEntries(entriesOptions);

        desktop = new desktopManager();

        var entryId = getQueryString('entryId');
        if(entryId)
        {
            openEntry(entryId, getQueryString('entryUrl'));
        }
    }

    /* 
     * Refresh desktop shortcuts
     *
     * @param  array  entiresOptions
     * @param  bool   reset
     * @return void
     */
    function refreshDesktop(entriesOptions, reset)
    {
        refreshEntries(entriesOptions, reset);
        desktop.refreshShortcuts();
        desktop.refreshMenuSize();
    }

    /*
     * Close modal window opened in desktop
     *
     * @return void
     */
    function closeModal()
    {
        windows.close($('#modalContainer .window').attr('id'));
    }

    /**
     * Get query string value
     * 
     * @access public
     * @return string
     */
    function getQueryString(name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]); return null;
    }

    /* make jquery object call the ips interface manager */
    $.extend({ipsStart: start, closeModal: closeModal, openEntry: openEntry, getQueryString: getQueryString, refreshDesktop: refreshDesktop});
}(jQuery, window, document, Math);

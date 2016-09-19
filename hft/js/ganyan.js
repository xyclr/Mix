/* * Created by Smohan on 14-3-28.*/
$(document).ready(function(){
  //用户感言
  var _tbox = $('textarea#message_texts'),
      _tip = '至少要输入5个字哦',
      _maxWords = 200; //最多可输入
      _tbox.focus(function(){
          if($.trim(_tbox.val()) == _tip){
             _tbox.val('').css({color:'#505050'});
          }
      });
     _tbox.blur(function(){
        if($.trim(_tbox.val()) == '' || $.trim(_tbox.val()) == _tip){
            _tbox.val(_tip).css({color:'#cccccc'});
        }
     });
  //字数统计
  var _countWords = function(){
      var _show = $('.count strong');
      _show.text(_maxWords);
      _tbox.bind('keyup kewdown change focus',function(){
         var _nowLen = parseInt($.trim(_tbox.val()).length),
             _inputnum = _maxWords - _nowLen;
             if(_inputnum >= 0){
                 _show.text(_inputnum);
             }else{
                 _tbox.val(_tbox.val().substring(0,_maxWords));
                 alert("已经超过字数限制!");
                 return false;
             }
      });
      _tbox.val(_tbox.val().substring(0,_maxWords));
  };
  _countWords();
  //弹出
    function getPageSizeWithScroll(){
        if (window.innerHeight && window.scrollMaxY) {// Firefox
            yWithScroll = window.innerHeight + window.scrollMaxY;
            xWithScroll = window.innerWidth + window.scrollMaxX;
        } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
            yWithScroll = document.body.scrollHeight;
            xWithScroll = document.body.scrollWidth;
        } else { // works in Explorer 6 Strict, Mozilla (not FF) and Safari
            yWithScroll = document.body.offsetHeight;
            xWithScroll = document.body.offsetWidth;
        }
        return [xWithScroll, yWithScroll];
    };
    function SuperMan()
    {
        var de = document.documentElement;
        return {
            show_bg: function(){
                var size = getPageSizeWithScroll();
                $("#mask").css({left:0, top:0, width:'100%', height:size[1]}).show();
            },
            hide_bg: function(){
                $("#mask").hide();
            }
        }
    };
    function SuperMan()
    {
        var _select_cache;
        return {
            show_bg: function(hide_select){
                var size = getPageSizeWithScroll();
                $("#mask").css({left:0, top:0, width:'100%', height:size[1]}).show();
                if(hide_select)
                {
                    _select_cache = $('select:visible');
                    _select_cache.css('visibility', 'hidden');
                }
            },
            hide_bg: function(){
                $("#mask").hide();
                if( _select_cache )
                {
                    _select_cache.css('visibility', 'visible');
                    _select_cache = false;
                }
            }
        }
    };
    window.superman = SuperMan();
    var dlg = dui.Dialog({
        content: '<div class="f-tac" style="margin:30px auto 50px auto;"><h4>亲，需要登录才能发表评论哦~</h4><span>已有帐号？</span><a href="" target="_blank" class="c-blue f-fwb f-tdu">点此登录&gt;&gt;</a><span style="margin-left:30px;">没有帐号？</span><a href="" target="_blank" class="c-blue f-fwb f-tdu">点此注册&gt;&gt;</a></div>',
        width: 400
    });
    $("#message_texts").on('focus',function(e){
        superman.show_bg();
        dlg.open();
    });

});
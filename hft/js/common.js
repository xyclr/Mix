$(document).ready(function(){
    //导航
    $(".m-nav>li:has(ul)").hover(function(){
        $(this).addClass('cur').children("ul").stop(true,true).slideDown(200);
    },function(){
        $(this).removeClass('cur').children("ul").stop(true,true).slideUp(100);
    });
    //设置导航当前项
    var thisTLoc = top.location.href,
        thisTLocArr = thisTLoc.split('/'),
        oNavLi = $(".m-nav>li");
    var curDir = thisTLocArr[thisTLocArr.length - 2];
    oNavLi.each(function(i){
        ($(this).attr("name") == curDir) && $(this).find("a").addClass("c-orange");
    });
    //m-nav-2
    $(".m-nav-2 li.cur").prev().addClass("f-bgn");
    $(".m-nav-2 li,.down_navbar li").bind('click',function(){
        $(this).siblings().removeClass("f-bgn").end().prev().addClass("f-bgn");
    });
});
//滚动
function scrollNews(obj){
    var $self = obj.find("ul:first");
    var lineHeight = $self.find("li:first").height();
    $self.animate({ "marginTop" : -lineHeight +"px" }, 600 , function(){
        $self.css({marginTop:0}).find("li:first").appendTo($self);
    })
};
$(document).ready(function(){
  //返回顶部
  var _backtop = '<a id="backtop" title="返回顶部">返回顶部</a>';
  $('body').append(_backtop);
  var $backtop = $('a#backtop');
  $(window).scroll(function() {
        $(window).scrollTop() >= ($(window).height()*0.6) ? $backtop.fadeIn()  : $backtop.fadeOut();
  });
  $backtop.click(function(){
        $("html,body").animate({ scrollTop: 0},660)
  });
  //在线客服
  var $kefu,$kefubar,_kefu,_kefubar;
  _kefubar = '<a href="javascript:void(0)" class="kefu_bar" title="展开窗口">在线客服</a>';
   _kefu   = '<div id="fixed_kefu">';
   _kefu  += '<div class="title" title="收缩窗口"></div>';
   _kefu  += '<p><strong class="tel">400-000-1490</strong></p>';
   _kefu  += '<p>工作日 9:00-21:00<br>周&nbsp;&nbsp;&nbsp;末 9:00-18:00</p>';
   _kefu  += '<p><a href="javascript:void(0);" class="qq" id="web_qq_chat" title="QQ交谈"></a></p>';
   _kefu  += '<div class="ewm"><h3>好房通官方微信</h3><div class="ico" data-value="官方微信图标"></div></div>';
   _kefu  += '</div>';
   $('body').append(_kefu,_kefubar);
   $kefubar = $('a.kefu_bar');
   $kefu  = $('#fixed_kefu');
   var $kefu_def_bar = $kefu.find('div.title');
   $kefu_def_bar.bind('click',function(){
      $kefu.hide();
      $kefubar.show();
   });
    $kefubar.bind('click',function(){
      $(this).hide();
      $kefu.show();
   });
    $kefu.find('a#web_qq_chat').attr('href','tencent://message/?Menu=yes&amp;uin=938075902&amp;Service=58&amp;SigT=A7F6FEA02730C988B37E1B95C2E6B7CEE05C17F2B5D951C49FB002C6856F789FF9E7C1800A4A69BF6224BCA669EB00CE235028976C6C575F236E4568F1DFC1ACA8E434A7E3DC488D8A1EEA33D03AB852AC403F5DD7B6A98519B9A5DCEB5210DD2912A711AA505C3582DB5317A3B4AA98ECD0E8A266942F42&amp;SigU=30E5D5233A443AB2C0F2472A9C72E7CE451CB2599F83050626763DB789A743EEFE8B9F9F8828A76F')
});
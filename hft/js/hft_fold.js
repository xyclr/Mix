/** Created by Smohan on 14-3-19.*/
;(function($,undefined){
    "use strict";
    var pluginName = 'hftjs_fold';
    $.fn[pluginName] = function(options){
        var defaults = {
          event : 'click',
          tbar  : 'h3',  //标题栏
          content : 'p', //内容区
          oneopen : true, //开启一个，关闭同级
          init   :  -1, //初始化显示索引，-1表示全部关闭
          delay  : 300
        },
        o = $.extend({},defaults,options);
        if(o.init !== -1){
            $(this).eq(o.init).children(o.tbar).addClass('active').parent().siblings().children(o.tbar).removeClass('active');
            $(this).eq(o.init).children(o.content).stop(1,1).slideDown().parent().siblings().children(o.content).stop(1,1).slideUp();
        }
        $(this).each(function(i,event){
            var self = $(this),
                $bar = self.children(o.tbar),
                $wrap = self.children(o.content);
            $bar.on(o.event,function(){
               if(o.oneopen){
                   if(!$(this).hasClass('active')){
                       $(this).addClass('active').parent().siblings().children(o.tbar).removeClass('active');
                       $wrap.stop(1,1).slideDown(o.delay).parent().siblings().children(o.content).stop(1,1).slideUp(o.delay);
                   }else{
                       $bar.removeClass('active');
                       $wrap.stop(1,1).slideUp();
                   }
               }else{
                   $(this).stop(1,1).toggleClass('active')
                   $wrap.stop(1,1).slideToggle(o.delay);
               }
            })
         });
    }
})(jQuery);
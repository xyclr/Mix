;(function($){
    var sliderConfig = [[-30,18,0,80],[0,83,0,85],[0,50,0,90],[0,80,0,88]];
    $.fn.hft_slider = function(options){
        var defaults = {
            event : 'click', //事件  click || mouseover
            speed : 600, //执行速度
            autoplay : true, //自动播放
            autotime : 5000, //自动播放延迟时间
            prevbtn : '.prev',
            nextbtn : '.next',
            contaier : ['ul','li'],
            dots : true,
            keys : true //键盘监听
        };
        var o = $.extend(defaults,options,{});
        var self = $(this).eq(0),
            waper = self.find(o.contaier[0]),
            items = waper.children(o.contaier[1]),
            len = items.length,
            index = 0,
            play;
        var $prev = self.find(o.prevbtn) || self.find('.prev'),
            $next = self.find(o.nextbtn) || self.find('.next');
        items.css({float:'none',display:'block'})
        if(o.dots == true) {
            var _dots = '<div class="dots">';
            for(var i=0; i<len;i++){
                _dots += '<a data-no="'+i+'" style="cursor:pointer;">'+parseInt(i+1)+'</a>';
            }
            _dots += '</div>';
            self.append(_dots);
        }
        var dotsnav = self.find('.dots');
        move(0);
        dotsnav.find('a').each(function(i){
            $(this).bind(''+o.event+'',function(){
                move(i)
            });
        })
        function move(_index){
            if(_index < 0 ) _index = index;
            if(_index >= len) _index = 0;
            var target = items.eq(_index),dot = dotsnav.children('a');
            if(!waper.queue('fx').length){
                items.eq(_index).fadeIn(o.speed,function(){
                    var left,right;
                    left = sliderConfig[_index][1];right = sliderConfig[_index][3];
                   $(this).find('.pic').animate({left:left},o.speed).addClass('current');
                   $(this).find('.txt').animate({right:right},o.speed).addClass('current');
                   $(this).find('.btns').animate({right:right},o.speed);
                   if(_index === 2) $(this).find('.pic_3_2').animate({top:0}, o.speed);
                }).siblings().stop().fadeOut(o.speed,function(){
                   var left,right;
                   left = sliderConfig[_index][0];right = sliderConfig[_index][2];
                   $(this).find('.pic').addClass('current').animate({left:left},o.speed);
                   $(this).find('.txt').addClass('current').animate({right:right},o.speed);
                   $(this).find('.btns').animate({right:right},o.speed);
                });
               /* items.each(function(i){
                    var left,right;
                    left = sliderConfig[i][0];right = sliderConfig[i][2];
                    $(this).find('.pic').addClass('current').animate({left:left},o.speed);
                    $(this).find('.txt').addClass('current').animate({right:right},o.speed);
                    $(this).find('.btns').animate({right:right},o.speed);
                });*/
                items.eq(2).find('.pic_3_2').animate({top:-180}, o.speed,function(){
                    $(this).animate({top:0}, o.speed);
                });
                index = _index;
            }
        };
        if(o.autoplay){
            setTimeout(function(){
                autoplay();
                waper.on('mouseover mouseout', function(e) { //鼠标位于waper之上时，禁止自动滚动
                    stopplay();
                    e.type == 'mouseout' && autoplay();
                });
            },o.autotime);
        }
        function autoplay(){
            play = setInterval(function(){
                move(index+1);
            },o.autotime);
        };
        function stopplay(){
            play = clearInterval(play);
        };
        function prev(){
            stopplay();
            var i = (index == 0) ? len : index;
            move(i-1);
        };
        function next(){
            stopplay();
            var i = (index == len) ? 0 : index;
            move(i+1);
        };
        $prev.click(function(){ prev();});
        $next.click(function(){ next();});
        if(o.keys){
            $(document).keydown(function(event){
                if(event.keyCode == 37) prev();
                if(event.keyCode == 39) next();
            });
        }
    };
})(jQuery)
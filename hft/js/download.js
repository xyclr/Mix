/* Created by Smohan on 14-3-28.*/
$(document).ready(function(){
    //根据URL初始化选项卡
    var _url = location.href,_sId;
    _urlArr = _url.split('#');
    if(_urlArr.length > 1){
        _sId = _urlArr[1];
        $('.down_navbar li').each(function(index){
            var thisID = $(this).find('a').attr('href');
            thisID = thisID.substring(1,thisID.length);
            if(thisID == _sId){
                $(this).find('a').addClass('cur').parent().siblings().children('a').removeClass('cur');
                $('.down_wraper .item').removeClass('cur').hide();
                $('.down_wraper .item#w_'+_sId).addClass('cur').show();
            }
        });
    }
    $('.down_navbar li a').on('click',function(){
        $(this).addClass('cur').parent().siblings().children('a').removeClass('cur');
        var _id = $(this).attr('href');
        _id = _id.substring(1,_id.length);
        $('.down_wraper .item').removeClass('cur').hide();
        $('.down_wraper .item#w_'+_id).addClass('cur').show();
    });
    //当前页面主导航兼容
    $('.m-nav-inner li a').on('click',function(){
        var _url = $(this).attr('href');
        var _urlArr = _url.split('#');
        var _id = _urlArr[1].substring(0,_urlArr[1].length);
        $('.down_navbar li').each(function(index){
            var thisID = $(this).find('a').attr('href');
            thisID = thisID.substring(1,thisID.length);
            if(thisID == _id){
                $(this).find('a').addClass('cur').parent().siblings().children('a').removeClass('cur');
                $('.down_wraper .item').removeClass('cur').hide();
                $('.down_wraper .item#w_'+_id).addClass('cur').show();
            }
        });
    });
});
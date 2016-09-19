/** Created by Smohan on 14-3-29.*/
$(document).ready(function(){
    var slidey = $('#login_slider').unslider({dots: false}),
        data = slidey.data('unslider');
    $('a.prev').click(function(){ data.prev(); });
    $('a.next').click(function(){ data.next(); });
    //提交验证
    $('form#user_login_form').submit(function(){
        var _utel = $('input#login_tel'),
            _pass = $('input#login_pass'),
            _code = $('input#login_code')
            _regTel = /^1[3|4|5|8][0-9]\d{4,8}$/;
        if($.trim(_utel.val()) == '' || $.trim(_utel.val()).length != 11 || $.trim(_utel.val()).match(_regTel)==null){
            _utel.focus();
            $('.tips#tips_tel').text("请输入正确的手机号码");
            return false;
        }else{
            $('.tips#tips_tel').text('');
        }
        if($.trim(_pass.val()) == ''){
            _pass.focus();
            $('.tips#tips_pass').text("请输入登录密码");
            return false;
        }else{$('.tips#tips_pass').text('')}
        if($.trim(_code.val()) ==''){
            _code.focus();
            $('.tips#tips_code').text("请输入正确的验证码");
            return false;
        }else{$('.tips#tips_code').text('')}
    });
    //手机框只能输入数字
    $("input#login_tel").keyup(function(){
        $(this).val($(this).val().replace(/\D|^0/g,''));
    }).bind("paste",function(){//处理复制粘贴
            $(this).val($(this).val().replace(/\D|^0/g,''));
    }).css("ime-mode", "disabled");
    //输入状态时，隐藏提示文字
    $('input').bind('keyup kewdown change',function(){
       $('.tips').text('');
    });
});
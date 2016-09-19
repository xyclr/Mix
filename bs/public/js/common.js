var settings = {
    stServer : "http://st.sd188.cn",
    Server : "http://bs.sd188.cn"
}

var extendBootstrap = (function(){
    $(".dropdown").each(function(item){
        var _this = $(this);
        _this.find(".dropdown-menu li a").click(function(){
            $(this).parents(".dropdown-menu").prev().text($(this).text()).attr({"data-type" : $(this).attr("data-type")});
        })
    })
})();

/*判断对象为空*/
var isEmptyValue = function(value) {
    var type;
    if(value == null) { // 等同于 value === undefined || value === null
        return true;
    }
    type = Object.prototype.toString.call(value).slice(8, -1);
    switch(type) {
        case 'String':
            return !$.trim(value);
        case 'Array':
            return !value.length;
        case 'Object':
            return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
        default:
            return false; // 其他对象均视作非空
    }
};


// cross-domain; exec iframe function
var exec_iframe = function(url){
    if(typeof(exec_obj)=='undefined'){
        exec_obj = document.createElement('iframe');
        exec_obj.name = 'tmp_frame';
        exec_obj.src = url;
        exec_obj.style.display = 'none';
        document.body.appendChild(exec_obj);
    }else{
        exec_obj.src = url/* +"?" + Math.random()*/;
    }
};

//upload callback
function submitCb(type,msg,path){
    var alert =  $("#fileUploadForm .modal-body");
    if(type ==  "eror") {
        toastr.error('Upload Fail!');
    }
    else {
        toastr.success('Upload Success!');
    };
};

function fileDelCb(url){
    $.ajax({
        url: settings.Server + "/fileDel?" + url ,
        type: 'POST',
        success: function(data){
            toastr.success('Del Success!');
        },
        error: function(error){
            toastr.error('Del Error!');
        }
    })
    return false;
};

var throttle = function (fn,delay, immediate, debounce) {
    var curr = +new Date(),//当前事件
        last_call = 0,
        last_exec = 0,
        timer = null,
        diff, //时间差
        context,//上下文
        args,
        exec = function () {
            last_exec = curr;
            fn.apply(context, args);
        };
    return function () {
        curr= +new Date();
        context = this,
            args = arguments,
            diff = curr - (debounce ? last_call : last_exec) - delay;
        clearTimeout(timer);
        if (debounce) {
            if (immediate) {
                timer = setTimeout(exec, delay);
            } else if (diff >= 0) {
                exec();
            }
        } else {
            if (diff >= 0) {
                exec();
            } else if (immediate) {
                timer = setTimeout(exec, -diff);
            }
        }
        last_call = curr;
    }
};

/*
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 * @param fn {function}  要调用的函数
 * @param delay   {number}    空闲时间
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */

var debounce = function (fn, delay, immediate) {
    return throttle(fn, delay, immediate, true);
};
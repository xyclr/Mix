var Post = {

    init : function(){
        this.event();
    },

    event : function(){
        //上传图片
        $("#post").delegate(".btn-upload","click",function(){
            $("#fileBrower").modal();
            $(this).parent().prev().addClass("cur");
            return false;
        });
    },
    fileSelectCb : function(obj,path){
        $("#" + obj).find(".cur").val(path);
        $("#fileBrower").modal("hide");
    }
};

Post.init();

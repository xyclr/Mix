function refreshIframe() {
    window.location.reload();
}

function uploadCb() {
    $('#fileUpload').modal('hide');
    window.location.reload();
}

$(function(){

    //upload file form
    var formHtml = '<input type="hidden" name="src" value="' + $("#filepath").html() +'"/> <div class="alert alert-warning alert-dismissable"> <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button> <span>x支持JPG,JPEG,GIF,BMP,SWF,RMVB,RM,AVI文件的上传,文件小于10MB</span> </div> <div class="form-group"><label>File Select</label> <input type="file" name="file" placeholder="File name" class="form-control"></div> ';
    $('#fileUpload').on('show.bs.modal', function (e) {
        $(this).find(".modal-body").html(formHtml);
    });

    $("#refresh").click(function(){
        window.location.reload();
    });

    //del file
    $("#btn-file-del").click(function(){
        var delList = [],path = $("#filepath").html();
        $(".file-list li").each(function(){
            if($(this).find(".cke input:checked").length != 0) {
                delList.push($.trim($(this).find(".name").text()));
            };
        });

        if(delList.length == 0) {
            //toastr.warning("Please Select Files");
            return;
        };
        exec_iframe(settings.Server + "/proxy/proxy_file_del.html?path=" + path.replace(/\//ig,"|") +"&list=" + delList.join("|") );

        return false;
    });

    $("#btn-select-all").click(function(){
        $(".file-list li .cke input").each(function(){
            $(this).prop("checked",true);
        });
    });
    $("#btn-select-cancel").click(function(){
        $(".file-list li .cke input").each(function(){
            $(this).removeAttr("checked");
        });
    });
    $(".btn-view").click(function(){
        var path = $(this).parents("li").attr("path");
        window.open(path);
    });
    $(".btn-select").click(function(){
        var path = $(this).parents("li").attr("path");
        exec_iframe(settings.Server + "/proxy/proxy_file_select.html?path=" + path);
    });

})
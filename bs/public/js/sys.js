var Sys = {

    init : function(){
        this.addItem();
        this.updateItem();
        this.removeItem();
        this.event();
    },

    event : function(){
        //上传图片
        $("#sys").delegate(".btn-upload","click",function(){
            $("#fileBrower").modal();
            $(this).parent().prev().addClass("cur");
            return false;
        })
    },

    //更新item
    updateItem : function(){
        var saveSys = $("#saveSys");
        saveSys.click(function(){
            var $btn = $(this).button('loading');
            debounce(function(){
                $.post("/sys",{settingArr : Sys.getDomData()},function(result){
                    $btn.button('reset');
                    Sys.showTip("succ","保存成功!","sys");
                });
            },1000,true)();
        })
    },

    //删除item
    removeItem : function() {
        //绑定删除元素事件
        $("#sys").delegate('.del-item', 'click', function() {
            $(this).parents(".form-group").remove();
        });
    },

    addItem : function(){
        var addItemBtn = $("#addItemBtn"),
            saveNewItem =  $("#saveNewItem"),
            addItemModal = $("#addItemModal");
        //绑定模态框弹出事件
        addItemBtn.click(function(){
            $("#addItemModal").modal();
        })

        saveNewItem.click(function(){
            var data =  [addItemModal.find('input[name=cfg_name]').val(),addItemModal.find('input[name=cfg_field]').val(),addItemModal.find('input[name=cfg_value]').val(),$("#dropdownMenuType").attr("data-type")];

           // return true;
            $.each(data,function(i,v){
                data[i] = $.trim(v);
            })

            //更新页面item
            var html = '<div class="form-group">'+
                '<label for="message-text" class="control-label">' + data[0] + '</label>'+
                '<div class="input-group" data-type="'+ data[3] +'">'+
                '<input type="text" class="form-control" name="'+ data[1] +'"  value="'+ data[2] +'">';

            if(data[3] == "file") html += '<span class="input-group-btn"> <a class="btn btn-default btn-upload"  data-toggle="modal" data-target="#fileUpload">选择</a> </span>' ;
            html += '<span class="input-group-btn"> <span class="btn btn-default del-item" >删除</span> </span></div></div>'
            $(html).insertBefore(".form-actions");
            $("#addItemModal").modal("hide");
        })
    },

    getDomData : function(){
        var data = [];
        $("#sys .form-group").each(function(){
            var  _this = $(this);
            data.push([_this.find(".form-control").attr("name"),_this.find(".control-label").text(),_this.find(".form-control").val(),_this.find(".input-group").attr("data-type")]);
        });
        return data;
    },

    showTip : function(type, str,target){
        if(type == "succ") {
            toastr.success(str);
        } else if (type == "warning") {
            toastr.error(str);
        };
    },


    fileSelectCb : function(obj,path){
        $("#" + obj).find(".cur").val(path);
        $("#fileBrower").modal("hide");
    }
};

Sys.init();

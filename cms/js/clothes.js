/**
 * Created by Alex on 16/1/9.
 */
(function($){
    var clothes = clothes || {};
    clothes = {

        ClothesType : [],

        orderTpl : '<tr class="tr-order"> <td class="o-id">0</td> <td class="o-ty"><span class="edit-area J-clothes-sel">--</span></td> <td class="o-color"><span class="edit-area J-color-sel">--</span></td> <td class="o-xc"><span class="edit-area J-xc-sel">--</span></td> <td class="o-brand"><span class="edit-area J-brand-sel">--</span></td> <td class="o-ywcl"><span class="edit-area">--</span></td> <td class="o-tscl"><span class="edit-area J-tscl-sel">--</span></td> <td class="o-xhxg"><span class="edit-area J-xhxg-sel">--</span></td> <td class="o-off"><span class="edit-area J-off-sel">--</span></td> <td class="o-price"><span class="edit-area">--</span></td> <td class="o-num"><input type="text" class="form-control num"/></td> <td><button class="btn btn-mini mr5 J-tr-copy f-dn" type="button">复制</button><button class="btn btn-mini J-tr-del" type="button">删除</button></td> </tr>',

        init : function(){
            var that = this;

            //绑定事件
            this.event();

            //初始化会员卡信息
            this.LoadCardInfo(_Card,$('.J_ct-cart-info'));

            //初始化衣物分类
            $.each(_Clothes,function(i,v){
                that.ClothesType.push([i,v.name,v.thumb]);
            });

            //初始化订单列表，10条数据
            var tpl = '';
            for(var i = 0;i < 10; i ++) {
                tpl += that.orderTpl;
            };
            $('.J-order-table tbody').append(tpl).find("tr:first").addClass("cur");


        },

        event : function(){
            var that = this;
            var $selModal = $("#selModal");
            var $selModalClose = $selModal.find(".close");
            var $clothesSelModal = $("#clothesSelModal");
            var $clothesSelModalClose = $clothesSelModal.find(".close");
            var $checkOutModal = $("#checkOutModal");
            var $orderTable = $(".J-order-table");

            //衣服类型选择弹出框
            $orderTable.delegate(".J-clothes-sel","click",function(){
                $clothesSelModal.modal('show', 'fit');
            });

            $clothesSelModal.on('show.zui.modal', function() {
                //分类和衣服名称初始化
                var ret = '';
                that.ClothesType.forEach(function(v){
                    ret += '<span class="item"><span class="thumb"><img src="' + v[2] + '" alt=""/></span><span class="lab mr5">' + v[1] + '</span><input type="radio" hidden value="'+ v[0] +'" name="ty" /> </span>';
                });
                $(this).find(".J-clothes-ty").html(ret);
                $clothesSelModal.find(".tr-clothes-ty").show();
                $clothesSelModal.find(".tr-clothes-name,.tr-clothes-btns").hide();
            });

            $clothesSelModal.find(".J-clothes-ty").delegate('.item','click',function(){
                var val = $(this).find(":radio").val();
                var ret = '';
                $clothesSelModal.find(".J-clothes-ty").data("clothes-ty",val);
                that.GetClothesName(val).forEach(function(v){
                    ret += '<span class="item"><span class="thumb"><img src="' + v[2] + '" alt=""/></span><span class="lab mr5">' + v[1] + '</span><input type="radio" hidden value="'+ v[0] +'" name="ty" /> </span>';;
                });
                $clothesSelModal.find(".J-clothes-name").html(ret);
                $clothesSelModal.find(".tr-clothes-ty").hide();
                $clothesSelModal.find(".tr-clothes-name").show();
            });

            $clothesSelModal.find(".J-clothes-name").delegate('.item','click',function(){
                var val = $(this).find(":radio").val();
                $clothesSelModal.find(".J-clothes-name").data("clothes-name",val);

                var valTy = $clothesSelModal.find(".J-clothes-ty").data("clothes-ty");
                var valName = $clothesSelModal.find(".J-clothes-name").data("clothes-name");
                var clotheInfo = that.GetClotheInfo(valTy,valName);
                that.InsertOrderData(clotheInfo,$(".J-order-table tr.cur"));
                $clothesSelModalClose.click();
                return false;
            });

            //颜色选择
            $orderTable.delegate(".J-color-sel","click",function(){
                var ret = '<tr> <td> <div class="J-clothes-color">';
                _Color.forEach(function(v){
                    ret += '<span class="item"><span class="lab mr5">' + v[1] + '</span><input type="radio" value="'+ v[0] +'" name="color" /> </span>';
                });
                ret += '</div> </td> </tr>';
                $selModal.find('.modal-title').html('颜色选择');
                $selModal.find('.modal-content tbody').html(ret);
                $selModal.modal('show', 'fit');
            });

            $selModal.delegate('.J-clothes-color :radio','click',function(){
                $selModalClose.click();
                $(".J-order-table tr.cur").find(".J-color-sel").text($(this).prev().text());
            });

            //瑕疵选择
            $orderTable.delegate(".J-xc-sel","click",function(){
                var ret = '<tr> <td> <div class="J-clothes-xc">';
                _Xc.forEach(function(v){
                    ret += '<span class="item"><span class="lab mr5">' + v[1] + '</span><input type="checkbox" value="'+ v[0] +'" name="xc" /> </span>';
                });
                ret += '</div> </td> </tr><tr><tr class="f-tac"> <td> <button class="btn btn-primary J-btn-submit" data-dismiss="modal" type="button">确定</button> </td> </tr></tr>';
                $selModal.find('.modal-title').html('瑕疵选择');
                $selModal.find('.modal-content tbody').html(ret);
                $selModal.modal('show', 'fit');
            });

            $selModal.delegate('.J-clothes-xc :checkbox','click',function(){
                var cur = $selModal.find(".J-clothes-xc").data("clothes-xc");
                if(!cur) {
                    cur = "";
                } else {
                    cur = " " + cur;
                }
                $selModal.find(".J-clothes-xc").data("clothes-xc",$(this).prev().text() + cur);
            });

            $selModal.delegate('.J-btn-submit','click',function(){
                $selModalClose.click();
                $(".J-order-table tr.cur").find(".J-xc-sel").text($selModal.find(".J-clothes-xc").data("clothes-xc"));
            });


            //品牌选择
            $orderTable.delegate(".J-brand-sel","click",function(){
                that.GenerateSingleSelMod(_Brand,"J-clothes-brand",'品牌选择');
            });
            $selModal.delegate('.J-clothes-brand :radio','click',function(){
                $selModalClose.click();
                $(".J-order-table tr.cur").find(".J-brand-sel").text($(this).prev().text());
            });

            //特殊处理
            $orderTable.delegate(".J-tscl-sel","click",function(){
                that.GenerateSingleSelMod(_Tscl,"J-clothes-tscl",'特殊处理');
            });
            $selModal.delegate('.J-clothes-tscl :radio','click',function(){
                $selModalClose.click();
                $(".J-order-table tr.cur").find(".J-tscl-sel").text($(this).prev().text());
            });

            //洗后效果
            $orderTable.delegate(".J-xhxg-sel","click",function(){
                that.GenerateSingleSelMod(_Xhxg,"J-clothes-xhxg",'洗后效果');
            });
            $selModal.delegate('.J-clothes-xhxg :radio','click',function(){
                $selModalClose.click();
                $(".J-order-table tr.cur").find(".J-xhxg-sel").text($(this).prev().text());
            });

            //优惠种类
            $orderTable.delegate(".J-off-sel","click",function(){
                that.GenerateSingleSelMod(_OffCat,"J-clothes-off",'优惠种类');
            });
            $selModal.delegate('.J-clothes-off :radio','click',function(){
                var me = $(this);
                $selModalClose.click();
                $(".J-order-table tr.cur").find(".J-off-sel").attr({"val":me.val()}).text(me.prev().text());
            });

            //订单管理表格
            $orderTable.delegate('tbody tr','click',function(){
                var me = $(this);
                if(!me.hasClass('cur')) {
                    me.addClass('cur');
                    me.siblings().removeClass("cur");
                }
            });
            $orderTable.delegate('.J-tr-copy','click',function(){
                var $tr = $(this).parents("tr");
                var $orderInfo = $tr.data("order");
                if(!$orderTable.find('.tr-order').not(".hasData").length)  $(".J-tr-add").trigger('click');
                var $target = $(".J-order-table tr.tr-order").not(".hasData").eq(0);
                $target.addClass("hasData").html($tr.html());
                $target.data("order",$orderInfo);
                $orderTable.find("tr").removeClass("cur");
                $target.addClass("cur");
            });
            $orderTable.delegate('.J-tr-del','click',function(){
                var $tr = $(this).parents("tr");
                if($tr.hasClass("cur")) $(".J-order-table tr.tr-order").eq(0).addClass("cur");
                $tr.remove();
            });

            //新增一条空白订单
            $(".J-tr-add").click(function(){
                var tmp = that.orderTpl;
                $(".J-order-table tbody").append(tmp);
                if($orderTable.find(".tr-order").length == 1) $orderTable.find(".tr-order:first").addClass("cur");
            });

            //去结算
            $(".J-btn-checkout").click(function(){

                var total = 0;
                var $orderList = $orderTable.find("tr.hasData");
                var discount =  1;//折扣 默认为1
                var price = 0;//单价
                var num = 1;//数量
                var offValue = "1";//折扣分类
                var offMath = false;
                $("#card_number").text(_Card.id);
                $("#offsale").text(_Card.discount);

                if($orderList.length) {
                    $orderList.each(function(i,v){
                        var me = $(this);
                        price = parseFloat(me.find(".o-price").text());
                        num = parseInt(me.find(".o-num input").val());
                        offValue = parseInt(me.find(".J-off-sel").attr("val"));
                        //如果会员卡和优惠匹配 否则为1 不打折
                        if(_Card.discountMatch[offValue]) discount = parseFloat(_Card.discount);
                        total += price*discount*num;
                    })
                };
                total = total.toFixed(2);
                console.info(total);
                $("#order-total").text(total);
                $checkOutModal.modal('show', 'fit');
            });
        },

        //初始化会员卡信息
        LoadCardInfo : function(data,obj){
            var ret = '<input type="hidden"  />' +
                '<span class="mr10"> 住址：' + (data.address || "--") + '</span> ' +
                '<span class="mr10"> 电话：' + (data.tel || "--")  + '</span> ' +
                '<span class="mr10"> 姓名：' + (data.username || "--")  + '</span> ' +
                '<span class="mr10"> 次数：' + (data.num || "--")  + '</span> ' +
                '<span class="mr10"> 总额：' + (data.total || "--")  + '</span> ' +
                '<span class="mr10"> 卡号：' + (data.id || "--")  + '</span>';
            obj.html(ret);
        },

        GetClothesName : function(data){
            var arr = [];
            $.each(_Clothes[data].sub,function(i,v){
                arr.push([i, v.name,v.thumb]);
            });
            return arr;
        },

        GetClotheInfo : function(valTy,valName){
            var obj = {};
            $.each(_Clothes[valTy].sub[valName],function(i,v){
                obj[i] = v;
            });
            return obj;
        },

        InsertOrderData : function(clotheInfo,target){
            target.data("order",clotheInfo);
            target.addClass("hasData");
            target.find(".o-id").text(clotheInfo.id);
            target.find(".o-ty .edit-area").text(clotheInfo.name);
            target.find(".o-ywcl .edit-area").text(clotheInfo.cat);
            target.find(".o-num").html('<input type="text" value="1" class="form-control  f-tac"/>');
            target.find(".o-price").text(clotheInfo.normal);
        },


        //单选弹窗
        GenerateSingleSelMod : function(ret,target,name){
            var $selModal = $("#selModal");
            var $selModalClose = $selModal.find(".close");
            var arr = '<tr> <td> <div class="'+ target +'">';
            ret.forEach(function(v){
                arr += '<span class="item"><span class="lab mr5">' + v[1] + '</span><input type="radio" value="'+ v[0] +'" name="color" /> </span>';
            });
            arr += '</div> </td> </tr>';
            $selModal.find('.modal-title').html(name);
            $selModal.find('.modal-content tbody').html(arr);
            $selModal.modal('show', 'fit');
        },

        //计算折扣信息
        CacOffSale : function(){

        }
    };
    clothes.init();
})(jQuery);


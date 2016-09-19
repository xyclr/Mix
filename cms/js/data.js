var _Card = {
    id : "123342342",
    typename : "定制卡",
    catname : "定制卡10000",
    address : "地址",
    tel : "1388888888",
    username : "张三",
    num : "1000",
    total : "1000",
    //折扣信息 (折扣值,标准,特种1,特种2,熨烫,团购,团购价)
    discount : 0.7,
    //折扣匹配
    discountMatch : [true, true, true, true, false]
};

//优惠种类
var _OffCat = [
    [00,"普通"],
    [01,"特种1"],
    [02,"特种2"],
    [03,"单烫类"],
    [04,"团购类"]
];
var _Clothes = {
    //外套
    loosecoat : {
        type : 1,
        name : "外套",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {
            //羊毛衫
            cardigan : {
                cat : "外套",
                thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
                id : "1046",
                type :"1",
                name : "羊毛衫",
                normal : 48,
                tz1 : 180,
                tz2 : null,
                dt : 28,
                tg : null,
                days : 3,
                safekeep : 99,
                series : "C"
            },

            //羊绒裤
            cashmereants : {
                cat : "外套",
                thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
                id : "1047",
                type :"2",
                name : "羊绒裤",
                normal : 48,
                tz1 : 180,
                tz2 : null,
                dt : 28,
                tg : null,
                days : 3,
                safekeep : 99,
                series : "B"
            },

            //风衣
            windbreaker : {
                cat : "外套",
                thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
                id : "1048",
                type :"3",
                name : "风衣",
                normal : 78,
                tz1 : 180,
                tz2 : null,
                dt : 48,
                tg : null,
                days : 3,
                safekeep : 99,
                series : "A"
            }
        }
    },

    //裤子
    trousers : {
        type : 2,
        name : "裤子",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {
            //休闲裤
            xxk : {
                cat : "裤子",
                thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
                id : "1062",
                name : "休闲裤",
                normal : 26,
                tz1 : null,
                tz2 : null,
                dt : null,
                tg : 8,
                days : 3,
                safekeep : 99,
                series : "A"
            }
        }
    },

    //裙子
    skirt : {
        type : 3,
        name : "裙子",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {
            //羊毛衫
            cardigan : {
                cat : "裙子",
                thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
                id : "1062",
                name : "裤子3",
                normal : 48,
                tz1 : 180,
                tz2 : null,
                dt : 28,
                tg : null,
                days : 3,
                safekeep : 99,
                series : "C"
            },

            //羊绒裤
            cashmereants : {
                cat : "裙子",
                thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
                id : "1062",
                name : "羊绒裤",
                normal : 48,
                tz1 : 180,
                tz2 : null,
                dt : 28,
                tg : null,
                days : 3,
                safekeep : 99,
                series : "C"
            }
        }
    },

    //上衣
    jacket : {
        type : 4,
        name : "上衣",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {

        }
    },

    //小件
    small : {
        type : 5,
        name : "小件",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {

        }
    },

    //卧卫
    ww : {
        type : 6,
        name : "卧卫",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {

        }
    },

    //家具
    furniture : {
        type : 7,
        name : "家具",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {

        }
    },

    //皮上衣
    leaclothing : {
        type : 8,
        name : "皮上衣",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {

        }
    },

    //皮包
    leabag : {
        type : 9,
        name : "皮包",
        thumb : "http://img0.imgtn.bdimg.com/it/u=325674098,3100268926&fm=21&gp=0.jpg",
        sub : {

        }
    }
};

var _Color = [
    [00,"黄绿"],
    [01,"黑色"],
    [02,"灰色"],
    [03,"白色"],
    [04,"红色"],
    [05,"粉色"],
    [06,"棕色"],
    [07,"黄色"],
    [08,"蓝色"],
    [09,"水蓝"],
    [10,"深绿"],
    [11,"绿色"],
    [12,"紫色"],
    [13,"条纹"],
    [14,"紫彩"],
    [15,"紫拼"],
    [16,"紫格"],
    [17,"紫竖条"]
];

var _Xc = [
    [00,"口红印"],
    [01,"有咖啡"],
    [02,"咬色"],
    [03,"有围巾"],
    [04,"并丝"],
    [05,"脱线"],
    [06,"果汁"],
    [07,"皮革发硬"],
    [08,"有涂层"],
    [09,"不保虫蛀"],
    [10,"白点"],
    [11,"冰激凌"],
    [12,"并丝较多"],
    [13,"口红印"],
    [14,"有咖啡"]
];

var _Brand = [
    [00,"BOSS"],
    [01,"GH"],
    [02,"M"],
    [03,"mm"],
    [04,"阿山"],
    [05,"李宁"],
    [06,"果"]
];

var _Xhxg = [
    [00,"不整形"],
    [01,"不整型"],
    [02,"光泽减退"],
    [03,"合成各系后发硬，干裂"]
];

var _Tscl = [
    [00,"60"],
    [01,"zhibu"],
    [02,"织补"],
    [03,"清洗"],
    [04,"特殊服务费"],
    [05,"50"],
    [06,"撑长"],
    [06,"饰品处理50"]
];


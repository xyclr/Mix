/* 柱图组件对象 */
var H5ComponentPolyline = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    var w = cfg.width,
        h = cfg.height,
        step = 10,
        dataLen = cfg.data.length;

    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var row_w = w / (dataLen + 1);
    for(var i = 0; i < dataLen; i++){
        var item = cfg.data[i];

        if(cfg.data[i]) {
            var text = $('<div class="text">');
            text.text(item[0]);
            text.css({
                'width': row_w/2,
                'left': row_w*i/2 + + row_w/4  + 'px',
            })

            component.append(text);
        }
    }


    /**
     * 绘制折现,阴影,及对应的数据
     * @param {float} per 0-1之间数据
     * @returns {Dom} component
     */
    var  draw = function(per){
        //情况画布
        ctx.clearRect(0, 0, w, h);
        //绘制网格
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ccc';

        //x轴
        for(var i = 0; i < step + 1; i++){
            var y = h/step*i;
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);

        }

        //y轴
        var xLen = dataLen + 1
        for(var i = 0; i < xLen +1; i++){
            var x = w/xLen*i;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);

        }
        ctx.stroke();


        //绘制折点
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff8899';

        //画点

        for(var i = 0; i < dataLen; i++){
            var item = cfg.data[i];
            var x = row_w * (i + 1);
            var y = (1 - item[1]*per) * h;
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);

            //if(cfg.data[i]) {
            //    var text = $('<div class="text">');
            //    text.text(item[0]);
            //    text.css({
            //        'width': row_w/2,
            //        'left': row_w*i/2 + + row_w/4  + 'px',
            //    })
            //
            //    component.append(text);
            //}
        }

        //画折线
        ctx.moveTo(row_w, (1 - cfg.data[0][1]*per) * h);

        for(var i = 0; i < dataLen; i++){
            var x = row_w * (i + 1);
            var y = (1 - cfg.data[i][1]*per) * h;
            ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0)';
        ctx.lineTo(x,h);
        ctx.lineTo(row_w,h);
        ctx.fillStyle = 'rgba(255,188,188,0.2)';
        ctx.fill();

        //写数据
        //ctx.moveTo(row_w, (1 - cfg.data[0][1]*per) * h);

        for(var i = 0; i < dataLen; i++){
            var item = cfg.data[i];
            var x = row_w * (i + 1);
            var y = (1 - item[1]*per) * h;
            ctx.fillStyle = item[2] ? item[2] : '#f9f9f9';
            ctx.fillText(item[1] * 100 + '%', x - 10 ,y -10);
        }

        ctx.stroke();
    };

    component.on('onLoad', function(){
        var s = 0;
        for(var i = 0; i < 100; i++) {
            setTimeout(function(){

                s += 0.01
                draw(s);
            },i*10 + 500);
        }
    });

    component.on('onLeave', function(){
        var s = 1;
        for(var i = 0; i < 100; i++) {
            setTimeout(function(){
                s -= 0.01
                draw(s);
            },i*10);
        }
    });


    return component;
}

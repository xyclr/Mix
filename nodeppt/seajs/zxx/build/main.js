/**
 * 黑色半透明遮罩层
 */
 
define('overlay',['elementCreate'],function(require, exports, module) {
    var elementCreate = require('elementCreate');
    var overlay = (function() {
        var element = elementCreate.create("div", {
            styles: {
                display: "none",
                width: "100%",
                backgroundColor: "#000",
                opacity: 0.35,
                position: "absolute",
                zIndex: 1,
                left: 0,
                top: 0,
                bottom: 0    
            }
        });
        document.body.appendChild(element);
        
        return {
            display: false, 
            show: function() {
                element.style.display = "block";
                this.display = true;
                return this;
            },
            hide: function() {
                element.style.display = "none";    
                this.display = false;
                return this;
            }
        };    
    })();    
    
    exports.overlay = overlay;
});
 
 
 
 
/**
 * ajax方法
 */

define('ajax',function(require, exports) {
    exports.get = function(url, succCall) {
        if (url == undefined) {
            console.log("请求地址缺失！");
            return;    
        }
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200 && typeof succCall === "function") {
                succCall.call(xhr, xhr.responseText);
            }
        };
        
        xhr.open("GET", url, true);
        xhr.send();
    };
});
/**
 * 创建元素
 */
 
define('elementCreate',function(require, exports) {
    exports.create = function(tagName, attr) {
        var element = null;
        if (typeof tagName === "string") {
            element = document.createElement(tagName);    
            
            if (typeof attr === "object") {
                var keyAttr, keyStyle;
                for (keyAttr in attr) {
                    if (keyAttr === "styles" && typeof attr[keyAttr] === "object") {
                        // 样式们
                        for (keyStyle in attr[keyAttr]) {
                            element.style[keyStyle]    = attr[keyAttr][keyStyle];
                            
                            if (keyStyle === "opacity" && window.innerWidth + "" == "undefined") {
                                element.style.filter = "alpha(opacity="+ (attr[keyAttr][keyStyle] * 100) +")";
                            }
                        }
                    } else {
                        if (keyAttr === "class") {
                            keyAttr = "className";
                        }
                        element[keyAttr] = attr[keyAttr];
                    }
                    
                }
            }
        }
        return element;
    };
});





/**
 * 简易弹框
 */

define('flbox',['elementCreate','ajax','overlay'],function(require, exports) {
    var funCreate = require('elementCreate')
        , funAjax = require('ajax')
        , overlay = require('overlay');
        
    var eleWin = funCreate.create("div", {
            styles: {
                display: "none",
                position: "fixed",
                left: "50%",
                zIndex: 2    
            }    
        })
        , eleBar = funCreate.create("div", {
            styles: {
                fontSize: "12px",
                padding: "8px",
                backgroundColor: "#eee"
            }    
        })
        , eleClose = funCreate.create("a", {
            href: "javascript:",
            styles: {
                fontSize: "12px",
                color: "#34538b",
                textDecoration: "none",
                position: "absolute",
                margin: "-22px 0 0 85%"    
            }    
        })
        , eleBody = funCreate.create("div", {
            styles: {
                backgroundColor: "#fff",
                borderTop: "1px solid #ddd"
            }    
        })
        , eleOverlay = overlay.overlay;
    
    eleWin.appendChild(eleBar);
    eleWin.appendChild(eleClose);
    eleWin.appendChild(eleBody);
    
    document.body.appendChild(eleWin);
    
    eleBar.innerHTML = "弹出框";
    
    eleClose.innerHTML = "[关闭]";
    eleClose.onclick = function() {
        flbox.close();    
        return false;
    };
    
    var flbox = {
        loading: function() {
            eleBody.innerHTML = '<div style="width:200px;height:100px;padding:10px;">加载中...</div>';    
            this.position();
        },
        open: function(url) {
            var self = flbox;
            funAjax.get(url, function(html) {
                eleBody.innerHTML = html;
                self.position();
            });
        },
        position: function() {
            eleWin.style.display = "block";
            eleOverlay.show();
            var widthWin = eleWin.clientWidth
              , heightWin = eleWin.clientHeight;
                  
            // 定位
            eleWin.style.marginLeft =  "-" + widthWin / 2 + "px";
            eleWin.style.top = (screen.availHeight - heightWin - 100) / 2 + "px";
        },
        close: function() {
            eleOverlay.hide();
            eleWin.style.display = "none";
            eleBody.innerHTML = "";    
        }
    }
    
    exports.open = flbox.open;
});


/**
 * URL地址后面增加随机参数
 */
define('queryRandom',function(require, exports, module) {
    exports.queryRandom = function(url) {
        var strQueryRandom = "random=" + Math.random();
        var arrQuery = url.split("?");
        if (arrQuery[1] != undefined) {
            // 含查询字符串
            if (url.slice(-1) === "&") {
                url = url + strQueryRandom;        
            } else {
                url = url + "&" + strQueryRandom;
            }
        } else {
            // 不含查询字符串
            url = url + "?" + strQueryRandom;    
        }
        return url;
    };
});
/** 
 * 主线js 
 * 点击小图查看大图测试
*/
define('main',['queryRandom','flbox'],function(require, exports) {
    var query = require('queryRandom')
      , flbox = require('flbox');
    
    exports.bind = function(element) {
        element.onclick = function() {
            var href = this.href;
            flbox.open(query.queryRandom(href));    
            return false;
        };
    };
});

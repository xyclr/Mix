define('a_gulp-seajs-cmobo_8',['b_gulp-seajs-cmobo_5'],function( require, exports, module ){
    var b = require('b_gulp-seajs-cmobo_5');
    module.exports = 'a' + ' ' + b;
});
seajs.use(['a'],function(a){
    console.info(a);
})
define('b_gulp-seajs-cmobo_6',function(){
    return 'index-b';
});

define('b_gulp-seajs-cmobo_5',function(){
    return 'index-b';
});

define('a_gulp-seajs-cmobo_4',['b_gulp-seajs-cmobo_5'],function( require, exports, module ){
    var b = require('b_gulp-seajs-cmobo_5');
    module.exports = 'a' + ' ' + b;
});
//seajs.use('a');
seajs.use(['a'],function(a){
    console.info(a);
})
define('b_gulp-seajs-cmobo_6',function(){
    return 'b';
});

define('b_gulp-seajs-cmobo_5',function(){
    return 'b';
});

define('a_gulp-seajs-cmobo_4',['b_gulp-seajs-cmobo_5'],function( require, exports, module ){
    var b = require('b_gulp-seajs-cmobo_5');
    console.info("a");
    module.exports = 'a' + ' ' + b;
});

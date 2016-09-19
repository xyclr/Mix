define('b_gulp-seajs-cmobo_2',function(){
    return 'b';
});

define('b',function(){
    return 'b';
});

define('a',['b'],function( require, exports, module ){
    var b = require('b');
    console.info("a");
    module.exports = 'a' + ' ' + b;
});

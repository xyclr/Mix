define('b',function(){
    return 'b';
});

define('a',['b'],function( require, exports, module ){
    var b = require('b');
    console.info("a");
    module.exports = 'a' + ' ' + b;
});

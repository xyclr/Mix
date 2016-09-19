define(function(require,exports,module) {
    var a = require('./a');
    a.fn();
    console.log("hello module b")

    console.log("b finished")
});
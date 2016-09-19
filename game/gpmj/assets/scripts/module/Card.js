var Suit = cc.Enum({
    cylinder: 1,   // 筒
    strip: 2,   // 条
    wan: 3,    //万
});

var ALLTYPE = '1,2,3,4,5,6,7,8,9'.split(',');

/**
 * 扑克牌类，只用来表示牌的基本属性，不包含游戏逻辑，所有属性只读，
 * 因此全局只需要有 52 个实例（去掉大小王），不论有多少副牌
 * @class Card
 * @constructor
 * @param {Number} point - 可能的值为 1 到 13
 * @param {Suit} suit
 */
function Card (point, suit, counter) {
    Object.defineProperties(this, {
        point: {
            value: point,
            writable: false
        },
        suit: {
            value: suit,
            writable: false
        },
        /**
         * @property {Number} id - 可能的值为 0 到 107
         */
        id: {
            value: (suit - 1) * 9 + (point - 1),
            writable: false
        },
        counter: {
            value: counter,
            writable: false
        },
        //
        pointName: {
            get: function () {
                return ALLTYPE[this.point];
            }
        },
        suitName: {
            get: function () {
                return Suit[this.suit];
            }
        }
    });
}

Card.prototype.toString = function () {
    return this.suitName + ' ' + this.pointName;
};

// 存放 108 张牌实例
var cards = new Array(108);

/**
 * 返回指定 id 的实例
 * @param {Number} id - 0 到 107
 */
Card.fromId = function (id) {
    return cards[id];
};


// 初始化所有牌
(function createCards () {
    var counter = 0;
    for (var s = 1; s <= 3; s++) {
        for (var p = 1; p <= 9; p++) {
            for (var k = 1; k <= 4; k++) {
                var card = new Card(p, s, counter);
                cards[counter] = card;
                counter = counter + 1;
            }
        }
    }
})();



module.exports = Card;
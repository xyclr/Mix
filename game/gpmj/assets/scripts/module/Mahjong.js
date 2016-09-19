var Card = require('Card');

/**
 * 麻将管理类
 * @class Decks
 * @constructor
 * @param {number} numberOfDecks - 总共几副牌
 */
function Mahjong () {
    // 还没发出去的牌
    this._cardIds = new Array(108);
    this.reset();
}

/**
 * 发牌
 * @method 
 */


/**
 * 重置所有牌
 * @method reset
 */
Mahjong.prototype.reset = function () {
    this._cardIds.length = 108;
    var index = 0;
    var fromId = Card.fromId;
    for (var cardId = 0; cardId < 108; ++cardId) {
        this._cardIds[index] = fromId(cardId);
        ++index;
    }
};

/**
 * 随机抽一张牌，如果已经没牌了，将返回 null
 * @method draw
 * @return {Card}
 */
Mahjong.prototype.draw = function () {
    var cardIds = this._cardIds;
    var len = cardIds.length;
    if (len === 0) {
        return null;
    }

    var random = Math.random();
    var index = (random * len) | 0;
    var result = cardIds[index];

    // 保持数组紧凑
    var last = cardIds[len - 1];
    cardIds[index] = last;
    cardIds.length = len - 1;

    return result;
};


module.exports = Mahjong;
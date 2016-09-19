cc.Class({
    extends: cc.Component,

    properties: {
        cardType: {
            default: [],
            type: cc.SpriteFrame
        },
        mainPic:cc.Sprite,
    },

    // use this for initialization
    init: function (card) {
         this.mainPic.spriteFrame = this.cardType[card.id];
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        panelRule: cc.Node,
    },

    // use this for initialization
    init: function (betDuration) {
        this.panelRule.active = false;
    },

    toggleRule: function () {
        this.panelRule.active = !this.panelRule.active;
    },

});
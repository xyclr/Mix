var Mahjong = require('Mahjong');

if (!window.io) {
    window.io = require('socket-io');
}

require('pomelo-cocos2d-js');


cc.Class({
    extends: cc.Component,

    properties: {

        cardPrefab: cc.Prefab,
        pengPrefab: cc.Prefab,
        gangMinPrefab: cc.Prefab,
        gangAnPrefab: cc.Prefab,
        playerCards1: cc.Node,
        playerCards2: cc.Node,
        playerCards3: cc.Node,
        playerCards4: cc.Node,
        playerCardsPlayed1: cc.Node,
        playerGetCardAchor1: cc.Node,
        playerCardOpAchor1: cc.Node,
        getCard: cc.Node,
        gangMing: cc.Node,
        gangAn: cc.Node,
        peng: cc.Node,

    },

    // use this for initialization
    onLoad: function () {
        var that = this;
        this.mahjong = new Mahjong();
        this.players = {
            player1: {
                isDealer: true,
                isOwn: true,
                cards: []
            },
            player2: {
                isDealer: false,
                isOwn: false,
                cards: []
            },
            player3: {
                isDealer: false,
                isOwn: false,
                cards: []
            },
            player4: {
                isDealer: false,
                isOwn: false,
                cards: []
            },
        };


        var pomelo = window.pomelo;

        var route = 'gate.gateHandler.queryEntry';
        var uid = "alex";
        var rid = "1";
        var username = "username3";

        pomelo.init({
            host: "127.0.0.1",
            port: 3014,
            log: true
        }, function() {
            pomelo.request(route, {
                uid: uid
            }, function(data) {
                pomelo.disconnect();
                pomelo.init({
                    host: data.host,
                    port: data.port,
                    log: true
                }, function() {
                    var route = "connector.entryHandler.enter";
                    pomelo.request(route, {
                        username: username,
                        rid: rid
                    }, function(data) {
                        cc.log(JSON.stringify(data));
                        chatSend();
                        getUsers();
                    });
                });
            });
        });

        function chatSend() {
            var route = "room.roomHandler.send";
            var target = "*";
            var msg = "msg"
            pomelo.request(route, {
                rid: rid,
                content: msg,
                from: username,
                target: target
            }, function(data) {
                cc.log(JSON.stringify(data));
            });
        }


        function getUsers() {
            var route = "room.roomHandler.getUser";
            var target = "*";
            var msg = "msg"
            pomelo.request(route, {
                rid: rid,
                content: msg,
                from: username,
                target: target
            }, function(data) {
                cc.log(JSON.stringify(data));
            });
        }




        this._deal();

        this.getCard.on(cc.Node.EventType.TOUCH_START, function (event) {
            var newCard = that._genrateCardInstance(that.mahjong.draw());
            var newInstance = that.players.player1.cards.push(newCard);
            that._generateCardNode(newCard, that.players.player1.cards.length, 1, function(instance){
                that['playerGetCardAchor1'].addChild(instance);
            });
        }, this);

        this.peng.on(cc.Node.EventType.TOUCH_START, function (event) {
            var instance = cc.instantiate(that.pengPrefab);
            that['playerCardOpAchor1'].addChild(instance);
        }, this);

        this.gangMing.on(cc.Node.EventType.TOUCH_START, function (event) {
            var instance = cc.instantiate(that.gangMinPrefab);
            that['playerCardOpAchor1'].addChild(instance);
        }, this);

        this.gangAn.on(cc.Node.EventType.TOUCH_START, function (event) {
            var instance = cc.instantiate(that.gangAnPrefab);
            that['playerCardOpAchor1'].addChild(instance);
        }, this);
    },

    //发牌每人13张，庄家14张
    _deal: function () {
        var player = null;
        var that = this;
        for (var i = 1; i < 5; i++) {

            player = this.players['player' + i];

            if (player.isDealer) {
                player.cards.push(that._genrateCardInstance(that.mahjong.draw()));
            }

            for (var j = 1; j < 14; j++) {
                player.cards.push(that._genrateCardInstance(that.mahjong.draw()));
            }
        }

        this._initPlayerCard();
    },

    _initPlayerCard: function () {
        var that = this;
        var player = null;
        for (var i = 1; i < 5; i++) {
            player = this.players['player' + i];
            player.cards = player.cards.sort(keysrt('asc', 'typeId'));
            player.cards.forEach(function (v, idx) {
                that._generateCardNode(v, idx, i, function(instance){
                    that['playerCards' + i].addChild(instance);
                });
            });
        }

        function keysrt(order, sortBy) {
            var ordAlpah = (order == 'asc') ? '>' : '<';
            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
            return sortFun;
        }

    },

    _genrateCardInstance: function(cardObj){
        var that = this;
        var newCard = cc.instantiate(that.cardPrefab).getComponent('CardCtrl');
        newCard.node.typeId = cardObj.id;
        newCard.node.point = cardObj.point;
        newCard.node.suit = cardObj.suit;
        newCard.init(cardObj);
        return newCard.node;
    },

    _generateCardNode: function(instance, cardsIdx, playerIdx,  cb){
        var that = this;
        instance.selected = false;
        var action = null;
        switch (playerIdx) {
            case 1:
                action = cc.spawn(cc.rotateTo(0, 180, 0));
                break;
            case 2:
                action = cc.spawn(cc.rotateTo(0, 90, 0));
                break;
            case 3:
                action = cc.spawn(cc.rotateTo(0, 0, 0));
                break;
            case 4:
                action = cc.spawn(cc.rotateTo(0, -90, 0));
                break;
            default:
                break
        }

        instance.runAction(action);
        //instance.width = instance.width*1.5;
        //instance.height = instance.height*1.5;

        instance.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.log('onTouchBegan');
            if (instance.selected) {
                var node = cc.instantiate(instance);
                node.width = node.width * 0.5;
                node.height = node.height * 0.5;
                that['playerCardsPlayed' + playerIdx].addChild(node);
                instance.destroy();
                //that._delPlayersCard(newCard);

            } else {

                instance.parent.children.forEach(function (node) {
                    node.getComponent('CardCtrl').selected = false;
                    node.runAction(cc.moveTo(0.1, 0, 0));
                });

                instance.selected = true;
                instance.runAction(cc.moveTo(0.1, 0, 20));
            }
            event.stopPropagation();
        }, this);

        cb && cb(instance);
    },

    _delPlayersCard: function(instance){
        this.players['player' + instance.playerIdx].cards.splice(instance.playerCardsIdx, 1);
    },


    update: function (dt) {
        //cc.log(this.players.player1.cards.length)
        //this['playerCards1'].children = [];
        //this._initPlayerCard();
    },
});

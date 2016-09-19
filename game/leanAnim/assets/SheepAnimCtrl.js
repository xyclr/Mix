cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation
    },
    
    playRun: function(){
        this.anim.play('sheep-run-clip');
    },
    
    playJump: function(){
        this.anim.play('sheep-jump-clip');
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

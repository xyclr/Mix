var H5_loading = function(images, firstPage){

    var id = this.id;

    if(this._images === undefined) {//第一次进入
        this._images = (images || []).length;
        this._loaded = 0;

        window[id] = this;

        for(var s in images) {
            var item = images[s];
            var img = new Image;
            img.onload = function(){
                console.info(id);
                window[id].loader();
            };
            img.src = item;
        }

        $('#rate').text('0%');
        return this;
    } else {

        this._loaded ++;

        $('#rate').text(parseInt(this._loaded / this._images * 100,10) + '%');

        if(this._loaded < this._images) {

            return this;
        }
    }

    window[id] = null;

    this.el.fullpage({
        onLeave:function( index, nextIndex, direction) {
            $(this).find('.h5_component').trigger('onLeave');
        },
        afterLoad:function( anchorLink, index ) {
            $(this).find('.h5_component').trigger('onLoad');
        }
    });
    this.page[0].find('.h5_component').trigger('onLoad');
    this.el.show();
    if(firstPage){
        $.fn.fullpage.moveTo( firstPage );
    }

    return this
};
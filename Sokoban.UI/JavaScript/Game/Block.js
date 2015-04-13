﻿(function (ns) {
    ns.Block = skui.extend(function () {
    }, {
        initBlock:function(){
            this.blockSize = 60;
            this.left = -1;
            this.top = -1;
            this.domElement = null;
        },
        setType: function (value) {
            this.type = value;
        },
        getType: function () {
            return this.type;
        }, getLeft: function () {
            return this.left;
        }, getTop: function () {
            return this.top;
        },
        draw: function (left, top) {
            this.left = left;
            this.top = top;
            this.domElement = $('<div class="block ' + this.type + '"></div>');
            this.domElement.css('left', this.blockSize * left).css('top', this.blockSize * top);
            $('body').append(this.domElement);
        }
    });
})(skui.resolve('app.ui'));
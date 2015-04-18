(function (ns) {
    ns.Block = skui.extend(function () {
    }, {
        initBlock: function () {
            this.blockSize = 60;
            //todo: refactor to position object
            this.left = -1;
            this.top = -1;
            this.domElement = null;
            this.guid = guid();
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
            $('body .gameContainer').append(this.domElement);

            switch (this.type) {
                case ObjectTypes.box:
                    $(window).trigger('box.' + this.guid + '.created');
                    break;
                case ObjectTypes.floor:
                    $(window).trigger('floor.' + this.guid + '.created');
                    break;
                case ObjectTypes.target:
                    $(window).trigger('target.' + this.guid + '.created');
                    break;
                case ObjectTypes.player:
                    $(window).trigger('player.' + this.guid + '.created');
                    break;
            }
            $(window).trigger('block.created', [this]);
        },
        setPosition: function (left, top) {
            this.left = left;
            this.top = top;
            var me = this;
            $(window).trigger('setAnimationStatus', true);
            this.domElement.animate({ 'left': this.blockSize * left, 'top': this.blockSize * top }, 'fast', 'linear', function () {
                if (me.type == ObjectTypes.player) {
                    $(window).trigger('setAnimationStatus',false);
                    $(window).trigger('checkInputQueue');
                }
            });
        }
    });
})(skui.resolve('app.ui'));
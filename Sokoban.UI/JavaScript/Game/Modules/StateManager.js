(function (ns) {
    ns.StateManager = skui.extend(function () {
    }, {
        init: function () {
            this.allBlocks = [];
            this.player = null;
            $(window).on('block.created', this.addBlockToArray.bind(this));
        },
        addBlockToArray: function (e, data) {
            if (data.type == ObjectTypes.player) {
                this.player = data;
            } else {
                this.allBlocks[this.allBlocks.length] = data;
            }
        }
    });
})(skui.resolve('app.ui'));
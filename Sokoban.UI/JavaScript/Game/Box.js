(function (ns) {
    ns.Box = skui.extend(app.ui.Block,function (obj) {
        this.setType('box');
        this.initBlock();
    }, {
        setTarget: function (isOnTarget) {
            if (isOnTarget) {
                this.domElement.addClass('onTarget');
            }else
            {
                this.domElement.removeClass('onTarget');
            }
        }
    });
})(skui.resolve('app.ui'));
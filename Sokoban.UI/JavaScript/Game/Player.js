(function (ns) {
    ns.Player = skui.extend(app.ui.Block,function (obj) {
        this.setType('player');
        this.initBlock();
    }, {
        
    });
})(skui.resolve('app.ui'));
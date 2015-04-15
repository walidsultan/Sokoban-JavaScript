(function (ns) {
    ns.Floor = skui.extend(app.ui.Block,function (obj) {
        this.setType('floor');
        this.initBlock();
    }, {
        
    });
})(skui.resolve('app.ui'));
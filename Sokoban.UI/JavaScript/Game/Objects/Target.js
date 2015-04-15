(function (ns) {
    ns.Target = skui.extend(app.ui.Block,function (obj) {
        this.setType('target');
        this.initBlock();
    }, {
        
    });
})(skui.resolve('app.ui'));
(function (ns) {
    ns.PathFinder = skui.extend(app.ui.StateManager, function () {
        $(window).on('findPath',this.findPath.bind(this));
        this.init();
    }, {
        findPath: function (e,targetBox) {
            debugger;
        }
    });
})(skui.resolve('app.ui'));
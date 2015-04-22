(function (ns) {
    ns.ModalsHandler = skui.extend(function () {
        $(window).on('levelSolved', this.showLevelSolvedDialog.bind(this));
    }, {
        showLevelSolvedDialog: function (e,data) {
            $('.dialog').prop('title', 'Level Solved');
            $('.dialog').html('Congratulations! Level Solved in ' + data.movesCount + ' moves and ' + data.pushesCount + ' pushes');
            $('.dialog').dialog({
                minWidth: 420,
                close: function () {
                    $(window).trigger('loadNextLevel');
                }
            });
        }
    });
})(skui.resolve('app.ui'));
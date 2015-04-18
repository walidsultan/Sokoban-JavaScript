(function (ns) {
    ns.ModalsHandler = skui.extend(function () {
        $(window).on('dialog.setLevelStatus', this.setLevelStatus.bind(this));
    }, {
        showLevelSolvedDialog: function () {
            $('.dialog').prop('title', 'Level Solved');
            $('.dialog').html('Congratulations! Level Solved in '+this.movesCount +' moves');
            $('.dialog').dialog({
                minWidth: 420,
                close: function () {
                    $(window).trigger('loadNextLevel');
                }
            });
        },
        setLevelStatus: function (e,data) {
            this.movesCount = data.movesCount;

            this.showLevelSolvedDialog();
        }
    });
})(skui.resolve('app.ui'));
(function (ns) {
    ns.LevelSelector = skui.extend(function () {
        this.loadLevelSelector();
    }, {
        loadLevelSelector: function (e, data) {
            $('body').prop('class', 'levelSelector');
            $('body .levelSelectorContainer').load('Views/LevelSelector.html', this.levelSelectorLoaded.bind(this));
        },
        levelSelectorLoaded: function () {
            $('body .levelSelectorContainer .title').click(function () {
                if ($(this).hasClass('unlocked')) {
                    $(this).parents('.levelGroup').find('.content').appendTo('body .levelSelectorContainer');
                    $('body .levelSelectorContainer .levelGroup').remove();
                }
            });
        }
    });
})(skui.resolve('app.ui'));
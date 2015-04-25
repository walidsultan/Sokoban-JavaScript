(function (ns) {
    ns.Game = skui.extend(function () {
        $(window).on('updateLevelName', this.updateLevelName.bind(this));
        $(window).on('setGameIndex', this.setGameIndex.bind(this));
        $(window).on('setFF', this.setFF.bind(this));
        $(window).on('levelSolved', this.onLevelSolved.bind(this));

        this.gameTime = 1;

        this.loadGame();
    }, {
        updateLevelName: function (e, levelId) {
            $('body .gameStatusContainer .levelId').text(levelId);
        },
        loadGame: function () {
            $('body .gameStatusContainer').load('/Views/Game.html', this.gameViewLoaded.bind(this));
        },
        gameViewLoaded: function () {
            InitializeView('app.ui.KeyboardHandler');
            InitializeView('app.ui.ModalsHandler');
            InitializeView('app.ui.StateManager');
            InitializeView('app.ui.PathFinder');
            InitializeView('app.ui.CollisionDetector');
            InitializeView('app.ui.LevelLoader');

            $(window).trigger('setLevelIndex', this.levelIndex);
        },
        setGameIndex: function (e,levelIndex) {
            this.levelIndex = levelIndex;
        },
        setFF: function (e, isSFF) {
            this.isSFF = isSFF;
            if (!this.isSFF && this.intervalId==null) {
              this.intervalId=  setInterval(this.setTimer.bind(this), 1000);
            }
        },
        setTimer: function () {
            $('body .gameStatusContainer .time').text(this.gameTime);

            this.gameTime++;
        },
        onLevelSolved: function () {
            this.gameTime = 1;
            clearInterval(this.intervalId);
        }
    });
})(skui.resolve('app.ui'));
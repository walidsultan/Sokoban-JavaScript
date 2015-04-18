(function (ns) {
    ns.DimensionsHandler = skui.extend(function () {
        $(window).resize(this.setBlocksDimensions.bind(this));
        this.backgroundRatio = 1280 / 1024;
        this.contentHeightRatio = 7 / 12.6;
        this.contentWidthRatio = 15 / 19;
        $(window).on('setLevelDimensions', this.setLevelDimensions.bind(this))
    }, {
        setBlocksDimensions: function () {
            //Background adjustment
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var windowSize = 0;
            if (windowWidth >= windowHeight * this.backgroundRatio) {
                windowSize = windowHeight * this.backgroundRatio;
            } else {
                windowSize = windowWidth ;
            }
            $('body').css({ 'background-size': windowSize });

            //Top and left margin adjustment
            var zoomFactor = windowHeight / this.levelHeight;
            var leftMargin = (windowWidth - windowSize * this.contentWidthRatio) / 2;
            var topMargin = 0;
            if (windowWidth >= windowHeight * this.backgroundRatio) {
                topMargin = (windowHeight - windowSize * this.contentHeightRatio) / 2;
            } else {
                topMargin = (windowWidth / this.backgroundRatio - windowSize * this.contentHeightRatio) / 2;
            }
            $('body .gameContainer').css({ 'margin-left': leftMargin, 'margin-top': topMargin });
        },
        setLevelDimensions: function (e,data) {
            this.levelWidth = data.width;
            this.levelHeight= data.height;
            this.setBlocksDimensions();
        }
    });
})(skui.resolve('app.ui'));
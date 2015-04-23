(function (ns) {
    ns.DimensionsHandler = skui.extend(function () {
        $(window).resize(this.setBlocksDimensions.bind(this));
        this.SFFWidth = 900;
        this.SFFHeight = 600;
        $(window).on('setLevelDimensions', this.setLevelDimensions.bind(this));
    }, {
        setBlocksDimensions: function () {
            //Background adjustment
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var windowSize = 0;

            if (windowWidth <= this.SFFWidth || windowHeight <= this.SFFHeight) {
                this.contentHeightRatio = .9;
                this.contentWidthRatio = .9;
                this.backgroundRatio = this.levelWidth / this.levelHeight;
            } else {
                this.contentHeightRatio = 7 / 12.6;
                this.contentWidthRatio = 15 / 19;
                this.backgroundRatio = 1280 / 1024;
            }

            if (windowWidth >= windowHeight * this.backgroundRatio) {
                windowSize = windowHeight * this.backgroundRatio;
            } else {
                windowSize = windowWidth ;
            }
            $('body').css({ 'background-size': windowSize });

            //Top and left margin adjustment
            var leftMargin = 0;
            var topMargin = 0;
            var zoomFactorWidth=windowSize *this.contentHeightRatio / this.levelHeight;
            var zoomFactorHeight = windowSize *this.contentWidthRatio / this.levelWidth;
            var zoomFactor = Math.min(zoomFactorWidth,zoomFactorHeight);
            
            if (windowWidth >= windowHeight * this.backgroundRatio) {
                leftMargin = (windowWidth - this.levelWidth * zoomFactor) / 2
                topMargin = (windowHeight - this.levelHeight * zoomFactor) / 2;
            } else {
                leftMargin = (windowWidth - this.levelWidth * zoomFactor) / 2;
                topMargin = (windowWidth / this.backgroundRatio - this.levelHeight * zoomFactor) / 2;
            }
            $('body .gameContainer').css({ 'margin-left': leftMargin, 'margin-top': topMargin });

            //Update all game blocks
            $('body .gameContainer .block').each(function(){
                $(this).css('left', zoomFactor * $(this).prop('data-left'))
                                                .css('top', zoomFactor * $(this).prop('data-top'))
                                                .css('background-size', zoomFactor)
                                                .css('height', zoomFactor)
                                               .css('width', zoomFactor);
            });
            skui.zoomFactor = zoomFactor;
            $(window).trigger('drawLevel');
        },
        setLevelDimensions: function (e,data) {
            this.levelWidth = data.width;
            this.levelHeight= data.height;
            this.setBlocksDimensions();
        }
    });
})(skui.resolve('app.ui'));
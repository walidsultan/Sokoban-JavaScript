(function (ns) {
    ns.DimensionsHandler = skui.extend(function () {
        $(window).resize(this.setBlocksDimensions.bind(this));
        this.SFFWidth = 900;
        this.SFFHeight = 680;
        $(window).on('setLevelDimensions', this.setLevelDimensions.bind(this));
    }, {
        setBlocksDimensions: function () {
            //Background adjustment
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var windowSize = 0;
            var isSFF=windowWidth <= this.SFFWidth || windowHeight <= this.SFFHeight;
            if (isSFF) {
                this.contentHeightRatio = .95;
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
            var zoomFactorHeight = windowSize * this.contentWidthRatio / this.levelWidth;

            var zoomFactorMax = Math.max(zoomFactorWidth, zoomFactorHeight);
            var zoomFactor = 0;

            if (zoomFactorMax * this.levelWidth <= windowWidth * this.contentWidthRatio && zoomFactorMax * this.levelHeight <= windowHeight * this.contentHeightRatio) {
                zoomFactor = zoomFactorMax;
            } else {
                zoomFactor = Math.min(zoomFactorWidth, zoomFactorHeight);
            }

            if (windowWidth >= windowHeight * this.backgroundRatio) {
                leftMargin = (windowWidth - this.levelWidth * zoomFactor) / 2
                topMargin = (windowHeight - this.levelHeight * zoomFactor) / 2;
            } else {
                leftMargin = (windowWidth - this.levelWidth * zoomFactor) / 2;
                if (isSFF) {
                    topMargin = (windowHeight - this.levelHeight * zoomFactor) / 2;
                } else {
                    topMargin = (windowWidth / this.backgroundRatio - this.levelHeight * zoomFactor) / 2;
                }
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
            this.levelWidth = parseInt(data.width);
            this.levelHeight = parseInt(data.height);
            this.setBlocksDimensions();
        }
    });
})(skui.resolve('app.ui'));
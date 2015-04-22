(function (ns) {
    ns.KeyboardHandler = skui.extend(function () {
        $(window).keydown(this.handleKeyDownEvent.bind(this));
        this.inputQueue = [];
        $(window).on('addInputToQueue', this.addInputToQueue.bind(this));
        $(window).on('checkInputQueue', this.checkInputQueue.bind(this));
        $(window).on('setAnimationStatus', this.setAnimationStatus.bind(this));
        $(window).on('clearInputQueue', this.clearInputQueue.bind(this));
        $(window).on('levelSolved', this.getLevelStatus.bind(this));
        $(window).on('incrementPushes', this.incrementPushes.bind(this));
        $(window).on('reloadLevel', this.clearhistory.bind(this));
        this.isAnimating = false;
        this.inputHistory=[];
        this.pushesCount = 0;
    }, {
        handleKeyDownEvent: function (e) {
            e.preventDefault();
            var direction = null;
            switch (e.keyCode) {
                case 37: //left
                    direction = Direction.left;
                    break;
                case 38: //top
                    direction = Direction.top;
                    break;
                case 39: //right
                    direction = Direction.right;
                    break;
                case 40: //down
                    direction = Direction.down;
                    break;
                case 8://Undo
                    break;
                case 82://Reload
                    $(window).trigger('reloadLevel');
                    break;
            }
            if (this.isAnimating) {
                this.addInputToQueue(e, { direction: direction });
            } else {
                this.inputHistory[this.inputHistory.length] = direction;
                $(window).trigger('handleInput', { direction: direction });
            }
        },
        addInputToQueue: function (e, input) {
            this.inputQueue[this.inputQueue.length] = input;
        },
        checkInputQueue: function () {
            if (this.inputQueue.length > 0) {
                this.inputHistory[this.inputHistory.length] = this.inputQueue[0].direction;
                $(window).trigger('handleInput', this.inputQueue[0]);
                this.inputQueue.splice(0, 1);
            }
        },
        setAnimationStatus: function (e, data) {
            this.isAnimating = data;
        },
        clearInputQueue: function (e) {
            this.inputQueue.length = 0;
            this.isAnimating = false;
        },
        getLevelStatus: function () {
            $(window).trigger('dialog.setLevelStatus', { movesCount: this.inputHistory.length, pushesCount: this.pushesCount });
        },
        incrementPushes: function () {
            this.pushesCount++;
        },
        clearhistory: function () {
            this.pushesCount = 0;
            this.inputHistory.length = 0;
        }
    });
})(skui.resolve('app.ui'));
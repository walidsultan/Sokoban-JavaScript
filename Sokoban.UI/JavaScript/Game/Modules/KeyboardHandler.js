(function (ns) {
    ns.KeyboardHandler = skui.extend(function () {
        $(window).keydown(this.handleKeyEvent.bind(this));
        this.inputQueue = [];
        $(window).on('addInputToQueue', this.addInputToQueue.bind(this));
        $(window).on('checkInputQueue', this.checkInputQueue.bind(this));
        $(window).on('setAnimationStatus', this.setAnimationStatus.bind(this));
        this.isAnimating = false;
    }, {
        handleKeyEvent: function (e) {
            e.preventDefault();
            var direction = null;
            switch (e.keyCode) {
                case 37: //left
                    direction = Direction.left ;
                    break;
                case 38: //top
                    direction = Direction.top ;
                    break;
                case 39: //right
                    direction = Direction.right ;
                    break;
                case 40: //down
                    direction = Direction.down ;
                    break;
            }
            if (this.isAnimating) {
                this.addInputToQueue(e, { direction: direction });
            } else {
                $(window).trigger('handleInput', { direction: direction });
            }
        },
        addInputToQueue: function (e, input) {
            this.inputQueue[this.inputQueue.length] = input;
        },
        checkInputQueue: function () {
            if (this.inputQueue.length > 0) {
                $(window).trigger('handleInput', this.inputQueue[0]);
                this.inputQueue.splice(0, 1);
            }
        },
        setAnimationStatus: function (e, data) {
            this.isAnimating = data;
        }
    });
})(skui.resolve('app.ui'));
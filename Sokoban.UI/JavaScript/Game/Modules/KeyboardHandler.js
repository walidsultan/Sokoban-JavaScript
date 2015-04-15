(function (ns) {
    ns.KeyboardHandler = skui.extend(function () {
        $(window).keydown(this.handleKeyEvent);
    }, {
        handleKeyEvent: function (e) {
            e.preventDefault();
            switch (e.keyCode) {
                case 37: //left
                    $(window).trigger('handleInput', { direction: Directions.left });
                    break;
                case 38: //top
                    $(window).trigger('handleInput', { direction: Directions.top });
                    break;
                case 39: //right
                    $(window).trigger('handleInput', { direction: Directions.right });
                    break;
                case 40: //down
                    $(window).trigger('handleInput', { direction: Directions.down });
                    break;
            }
        }
    });
})(skui.resolve('app.ui'));
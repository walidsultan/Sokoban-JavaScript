(function (ns) {
    ns.CollisionDetector = skui.extend(app.ui.StateManager, function () {
        $(window).on('handleInput', this.handleMovement.bind(this));
        $(window).on('boxToTargetPathFound', this.animatePlayerPath.bind(this));
        this.init();
        $(window).on('reloadLevel', this.clearBlocks.bind(this));
    }, {
        handleMovement: function (e, data) {
            var targetLeft = this.player.left;
            var targetTop = this.player.top;

            switch (data.direction) {
                case Direction.left:
                    targetLeft--;
                    break;
                case Direction.top:
                    targetTop--;
                    break;
                case Direction.right:
                    targetLeft++;
                    break;
                case Direction.down:
                    targetTop++;
                    break;
            }

            var targetBlock = this.getBlockByPosition(targetLeft, targetTop);
            if (targetBlock.type == ObjectTypes.floor || targetBlock.type == ObjectTypes.target) {
                this.player.setPosition(targetLeft, targetTop);
            } else if (targetBlock.type == ObjectTypes.box) {
                var oppositePosition = this.getOppositeBlockPosition(this.player, targetBlock);
                var adjacentBlock = this.getBlockByPosition(oppositePosition.left, oppositePosition.top);
                if (adjacentBlock.type == ObjectTypes.floor || adjacentBlock.type == ObjectTypes.target) {
                    targetBlock.setPosition(oppositePosition.left, oppositePosition.top);
                    this.player.setPosition(targetLeft, targetTop);
                    if (adjacentBlock.type == ObjectTypes.target) {
                        if (!targetBlock.isOnTarget) {
                            targetBlock.setTarget(true);
                        }
                        this.isLevelSolved();
                    } else {
                        if (targetBlock.isOnTarget) {
                            targetBlock.setTarget(false);
                        }
                    }
                } else {
                    //Player blocked, so clear input queue
                    $(window).trigger('clearInputQueue');
                }
            } else {
                //Player blocked, so clear input queue
                $(window).trigger('clearInputQueue');
            }
        },
        animatePlayerPath: function (e, data) {
            for (directionIndex in data) {
                $(window).trigger('addInputToQueue', { direction: data[directionIndex] });
            }
            $(window).trigger('checkInputQueue');
        },
        isLevelSolved: function () {
            var boxes = this.allBlocks.filter(function (block) { return block.type == ObjectTypes.box && !block.isOnTarget; });
            if (boxes.length == 0) {
                $(window).trigger('levelSolved');
            }
        },
        clearBlocks: function () {
            this.allBlocks.length = 0;
            this.player = null;
            $(window).trigger('initLevel');
        }
    });
})(skui.resolve('app.ui'));
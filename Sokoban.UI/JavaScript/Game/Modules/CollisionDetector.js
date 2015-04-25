﻿(function (ns) {
    ns.CollisionDetector = skui.extend(app.ui.StateManager, function () {
        $(window).on('handleInput', this.handleMovement.bind(this));
        $(window).on('boxToTargetPathFound', this.animatePlayerPath.bind(this));
        $(window).on('reloadLevel', this.clearBlocks.bind(this));
        $(window).on('addMovementIncident', this.addMovementIncident.bind(this));
        $(window).on('undoLastMovement', this.undoLastMovement.bind(this));
        this.init();
        this.historyStack = [];
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
            if (targetBlock.type == ObjectType.floor || targetBlock.type == ObjectType.target) {
                this.player.setPosition(targetLeft, targetTop);
            } else if (targetBlock.type == ObjectType.box) {
                var oppositePosition = this.getOppositeBlockPosition(this.player, targetBlock);
                var adjacentBlock = this.getBlockByPosition(oppositePosition.left, oppositePosition.top);
                if (adjacentBlock.type == ObjectType.floor || adjacentBlock.type == ObjectType.target) {
                    this.player.setPosition(targetLeft, targetTop);
                    targetBlock.setPosition(oppositePosition.left, oppositePosition.top);
                    if (adjacentBlock.type == ObjectType.target) {
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
            var boxes = this.allBlocks.filter(function (block) { return block.type == ObjectType.box && !block.isOnTarget; });
            if (boxes.length == 0) {
                //Get moves and pushes count
                var movesCount = this.historyStack.filter(function (data) { return data.block.type == ObjectType.player; }).length;
                var pushesCount = this.historyStack.filter(function (data) { return data.block.type == ObjectType.box; }).length;

                $(window).trigger('levelSolved', { movesCount: movesCount, pushesCount: pushesCount });
            }
        },
        clearBlocks: function () {
            this.allBlocks.length = 0;
            this.historyStack.length = 0;
            this.player = null;
            $(window).trigger('initLevel');
        },
        addMovementIncident: function (e,data) {
            this.historyStack.push(data);
        },
        undoLastMovement: function () {
            if (this.historyStack.length > 0) {
                var lastIncident = this.historyStack.pop();
                lastIncident.block.setPosition(lastIncident.left, lastIncident.top, true);
                if (lastIncident.block.type == ObjectType.box) {
                    lastIncident.block.setTarget(lastIncident.isOnTarget);
                    $(window).trigger('pushesDecremented');

                    lastIncident = this.historyStack.pop();
                    lastIncident.block.setPosition(lastIncident.left, lastIncident.top, true);
                    $(window).trigger('movesDecremented');
                } else {
                    $(window).trigger('movesDecremented');
                }
            }
        }
    });
})(skui.resolve('app.ui'));
(function (ns) {
    ns.CollisionDetector = skui.extend(app.ui.StateManager, function () {
        $(window).on('handleInput', this.handleMovement.bind(this));
        this.init();
    }, {
        handleMovement: function (e, data) {
            var targetLeft = this.player.left;
            var targetTop = this.player.top;

            switch (data.direction) {
                case Directions.left:
                    targetLeft--;
                    break;
                case Directions.top :
                    targetTop--;
                    break;
                case Directions.right:
                    targetLeft++;
                    break;
                case Directions.down:
                    targetTop++;
                    break;
            }

            var targetBlock = this.getBlockByPosition(targetLeft, targetTop);
            if (targetBlock.type == ObjectTypes.floor || targetBlock.type == ObjectTypes.target ) {
                this.player.setPosition(targetLeft, targetTop);
            } else if (targetBlock.type ==  ObjectTypes.box) {
                var oppositePosition = this.getOppositePosition(targetBlock);
                var adjacentBlock = this.getBlockByPosition(oppositePosition.left, oppositePosition.top);
                if (adjacentBlock.type ==ObjectTypes.floor || adjacentBlock.type == ObjectTypes.target) {
                    targetBlock.setPosition(oppositePosition.left, oppositePosition.top);
                    this.player.setPosition(targetLeft, targetTop);
                    if (adjacentBlock.type == ObjectTypes.target) {
                        if (!targetBlock.isOnTarget) {
                            targetBlock.setTarget(true);
                        }
                    } else
                    {
                        if (targetBlock.isOnTarget) {
                            targetBlock.setTarget(false);
                        }
                    }
                }
            }
        }
    });
})(skui.resolve('app.ui'));
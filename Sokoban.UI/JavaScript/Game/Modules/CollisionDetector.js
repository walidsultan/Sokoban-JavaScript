(function (ns) {
    ns.CollisionDetector = skui.extend(function () {
        this.allBlocks = [];
        this.player = null;
        $(window).on('block.created', this.addBlockToArray.bind(this));
        $(window).on('handleInput', this.handleMovement.bind(this))
    }, {
        addBlockToArray: function (e, data) {
            if (data.type == 'player') {
                this.player = data;
            } else {
                this.allBlocks[this.allBlocks.length] = data;
            }
        },
        handleMovement: function (e, data) {
            var targetLeft = this.player.left;
            var targetTop = this.player.top;

            switch (data.direction) {
                case 'left':
                    targetLeft--;
                    break;
                case 'top':
                    targetTop--;
                    break;
                case 'right':
                    targetLeft++;
                    break;
                case 'down':
                    targetTop++;
                    break;
            }

            var targetBlock = this.getBlockByPosition(targetLeft, targetTop);
            if (targetBlock.type == 'floor' || targetBlock.type == 'target') {
                this.player.setPosition(targetLeft, targetTop);
            } else if (targetBlock.type == 'box') {
                var oppositePosition = this.getOppositePosition(targetBlock);
                var adjacentBlock = this.getBlockByPosition(oppositePosition.left, oppositePosition.top);
                if (adjacentBlock.type == 'floor' || adjacentBlock.type == 'target') {
                    targetBlock.setPosition(oppositePosition.left, oppositePosition.top);
                    this.player.setPosition(targetLeft, targetTop);
                    if (adjacentBlock.type == 'target') {
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
        },
        getBlockByPosition: function (left, top) {
            var block = null;
            for (blockIndex in this.allBlocks) {
                if (this.allBlocks[blockIndex].left == left && this.allBlocks[blockIndex].top == top) {
                    if (this.allBlocks[blockIndex].type != 'floor' && this.allBlocks[blockIndex].type != 'target') {
                        return this.allBlocks[blockIndex];
                    }else
                    {
                        block=this.allBlocks[blockIndex];
                    }
                }
            }
            return block;
        },
        getOppositePosition: function (targetBlock) {
            var oppositeLeft = null;
            var oppositeTop = null;
            if (targetBlock.left == this.player.left) {
                oppositeLeft = targetBlock.left;
                if (targetBlock.top > this.player.top) {
                    oppositeTop = targetBlock.top +1;
                } else {
                    oppositeTop = targetBlock.top - 1;
                }
            } else if (targetBlock.top == this.player.top) {
                oppositeTop = targetBlock.top;
                if (targetBlock.left > this.player.left) {
                    oppositeLeft = targetBlock.left + 1;
                } else {
                    oppositeLeft = targetBlock.left - 1;
                }
            }

            return { left: oppositeLeft, top: oppositeTop };
        }
    });
})(skui.resolve('app.ui'));
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
            }
        },
        getBlockByPosition: function (left, top) {
            for (blockIndex in this.allBlocks) {
                if (this.allBlocks[blockIndex].left == left && this.allBlocks[blockIndex].top == top) {
                    return this.allBlocks[blockIndex];
                }
            }
            return null;
        }
    });
})(skui.resolve('app.ui'));
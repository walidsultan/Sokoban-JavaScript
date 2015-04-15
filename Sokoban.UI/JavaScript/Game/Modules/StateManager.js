(function (ns) {
    ns.StateManager = skui.extend(function () {
    }, {
        init: function () {
            this.allBlocks = [];
            this.player = null;
            $(window).on('block.created', this.addBlockToArray.bind(this));
        },
        addBlockToArray: function (e, data) {
            if (data.type == ObjectTypes.player) {
                this.player = data;
            } else {
                this.allBlocks[this.allBlocks.length] = data;
            }
        },
        getBlockByPosition: function (left, top) {
            var block = null;
            for (blockIndex in this.allBlocks) {
                if (this.allBlocks[blockIndex].left == left && this.allBlocks[blockIndex].top == top) {
                    if (this.allBlocks[blockIndex].type != ObjectTypes.floor && this.allBlocks[blockIndex].type != ObjectTypes.target) {
                        return this.allBlocks[blockIndex];
                    } else {
                        block = this.allBlocks[blockIndex];
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
                    oppositeTop = targetBlock.top + 1;
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
        },
        getSelectedBox: function () {
            for (blockIndex in this.allBlocks) {
                if (this.allBlocks[blockIndex].isSelected) {
                    return this.allBlocks[blockIndex];
                }
            }
            return null;
        }
    });
})(skui.resolve('app.ui'));
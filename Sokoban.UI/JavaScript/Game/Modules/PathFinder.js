(function (ns) {
    ns.PathFinder = skui.extend(app.ui.StateManager, function () {
        $(window).on('findPath', this.findPath.bind(this));
        this.init();
    }, {
        findPath: function (e, targetBlock) {
            var selectedBox = this.getSelectedBox();
            if (selectedBox != null) {
                var solution = null;
                var lstRecursiveSolutions = [];
                lstRecursiveSolutions.concat(this.getRecursiveSolutions(selectedBox));
            }
        },
        getRecursiveSolutions: function (selectedBox) {
            var lstRecursiveSolutions = [];
            var lstAdjacentBlocks = this.getAdjacentBlocksWithRelativeDirections(selectedBox);
            for (blockIndex in lstAdjacentBlocks) {
                var blockPath = lstAdjacentBlocks[blockIndex];
                if (blockPath.block.type == ObjectTypes.floor || blockPath.block.type == ObjectTypes.target) {
                    var path = this.getDirectPath(this.player, blockPath.block);
                }
            }
            return lstRecursiveSolutions;
        },
        getAdjacentBlocksWithRelativeDirections: function (selectedBox) {
            var lstBlockPaths = [];
            var adjacentBlock = null;
            //Left Block
            adjacentBlock = this.getBlockByPosition(selectedBox.left - 1, selectedBox.top);
            lstBlockPaths[0] = { block: adjacentBlock, directions: [Directions.left] };
            //Right Block
            adjacentBlock = this.getBlockByPosition(selectedBox.left + 1, selectedBox.top);
            lstBlockPaths[1] = { block: adjacentBlock, directions: [Directions.right] };
            //Up Block
            adjacentBlock = this.getBlockByPosition(selectedBox.left, selectedBox.top - 1);
            lstBlockPaths[2] = { block: adjacentBlock, directions: [Directions.top] };
            //Down Block
            adjacentBlock = this.getBlockByPosition(selectedBox.left, selectedBox.top + 1);
            lstBlockPaths[3] = { block: adjacentBlock, directions: [Directions.down] };

            return lstBlockPaths;
        },
        getDirectPath: function (startBlock, targetBlock) {
            var lstRecursiveBlocks = this.getAdjacentBlocksWithRelativeDirections(startBlock);
            var lstRepeatedBlocks = [];
            var directPath = null;

            //check if the startblock is the same as the target block
            if (startBlock.left == targetBlock.left && startBlock.top == targetBlock.top) {
                return [];
            }

            while (lstRecursiveBlocks.length > 0) {
                //Remove walls and boxes
                lstRecursiveBlocks = lstRecursiveBlocks.filter(function (blockPath) {
                    return blockPath.block.type != ObjectTypes.wall && blockPath.block.type != ObjectTypes.box;
                });

                //Remove any blocks that have been checked already
                var lstRecursiveBlocks = lstRecursiveBlocks.filter(function (blockPath) {
                    return lstRepeatedBlocks.indexOf(blockPath) === -1;
                });
                lstRepeatedBlocks=lstRepeatedBlocks.concat(lstRecursiveBlocks);

                //if there are no more blocks to search then break
                if (lstRecursiveBlocks.length == 0) break;

                //check if any of the recursive blocks is the target
                var lstNewBlocks = [];
                for (blockIndex in lstRecursiveBlocks) {
                    var blockPath = lstRecursiveBlocks[blockIndex];
                    if (blockPath.block == targetBlock) {
                        //Target found
                        directPath = blockPath.directions;
                        break;
                    }

                    var lstAdjacentBlocks = this.getAdjacentBlocksWithRelativeDirections(blockPath.block);
                    //Add current path to the adjacent block as their root path 
                    for (adjacentBlockIndex in lstAdjacentBlocks) {
                        var adjacentBlock= lstAdjacentBlocks[adjacentBlockIndex];
                        var existingBlocks =lstNewBlocks.filter(function (blockPath) { return blockPath.block.left == adjacentBlock.block.left && blockPath.block.top == adjacentBlock.block.top; });
                        if (existingBlocks.length == 0) {
                            adjacentBlock.directions = blockPath.directions.concat(adjacentBlock.directions);
                            lstNewBlocks[lstNewBlocks.length] = adjacentBlock;
                        }
                    }
                }

                if (directPath != null) {
                    break;
                }
                lstRecursiveBlocks.length = 0;
                lstRecursiveBlocks=lstRecursiveBlocks.concat(lstNewBlocks);
            }

            return directPath;
        }
    });
})(skui.resolve('app.ui'));
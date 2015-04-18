(function (ns) {
    ns.LevelLoader = skui.extend(function () {
        this.levelIndex = 1;
        this.levelRendered = false;
        $(window).on('drawLevel',this.drawLevel.bind(this));
        this.init();
    }, {
        init: function () {
            var levelPath = '../Levels/MicroCosmos/level' + this.levelIndex + '.xml';
            var levelDoc = loadXMLDoc(levelPath);
            this.levelRows = levelDoc.getElementsByTagName("L");

            var levelIdentifier = levelDoc.getElementsByTagName("Level");
            var levelWidth = levelIdentifier[0].attributes[1].value;
            var levelHeight = levelIdentifier[0].attributes[2].value;
            $(window).trigger('setLevelDimensions', { width: levelWidth, height: levelHeight });
        },
        drawLevel: function (e) {
            if (!this.levelRendered) {
                this.levelRendered = true;
                for (i = 0; i < this.levelRows.length; i++) {
                    var row = this.levelRows[i].childNodes[0].nodeValue;
                    var isWallDrawn = false;
                    for (var j = 0; j < row.length; j++) {
                        var block = null;
                        switch (row[j]) {
                            case '#':
                                block = InitializeView('app.ui.Wall');
                                isWallDrawn = true;
                                break;
                            case ' ':
                                if (isWallDrawn) {
                                    block = InitializeView('app.ui.Floor');
                                }
                                break;
                            case '$':
                                block = InitializeView('app.ui.Floor');
                                var box = InitializeView('app.ui.Box');
                                box.draw(j, i);
                                break;
                            case '.':
                                block = InitializeView('app.ui.Target');
                                break;
                            case '+':
                                block = InitializeView('app.ui.Target');
                                var player = InitializeView('app.ui.Player');
                                player.draw(j, i);
                                break;
                            case '@':
                                block = InitializeView('app.ui.Floor');
                                var player = InitializeView('app.ui.Player');
                                player.draw(j, i);
                                break;
                            case '*':
                                block = InitializeView('app.ui.Target');
                                var box = InitializeView('app.ui.Box');
                                box.draw(j, i);
                                box.setTarget(true);
                                break;
                        }
                        if (block) {
                            block.draw(j, i);
                        }
                    }
                }
            }
        }
    });
})(skui.resolve('app.ui'));
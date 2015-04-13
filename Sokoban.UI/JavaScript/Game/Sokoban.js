(function (ns) {
    ns.Sokoban = skui.extend(function () {
        this.player = null;
        this.initialize();
        $(window).on('handleInput', this.handleMovement.bind(this))
    }, {
        initialize: function () {
            var level1 = '../Levels/MicroCosmos/level0.xml';
            var levelDoc = loadXMLDoc(level1);
            var levelRows = levelDoc.getElementsByTagName("L");

            for (i = 0; i < levelRows.length; i++) {
                var row = levelRows[i].childNodes[0].nodeValue;
                for (var j = 0; j < row.length; j++) {
                    var block = null;
                    switch (row[j]) {
                        case '#':
                            block = InitializeView('app.ui.Wall');
                            break;
                        case ' ':
                            block = InitializeView('app.ui.Floor');
                            break;
                        case '$':
                            block = InitializeView('app.ui.Box');
                            break;
                        case '.':
                            block = InitializeView('app.ui.Target');
                            break;
                        case '+':
                            block = InitializeView('app.ui.Target');
                            this.player = InitializeView('app.ui.Player');
                            this.player.draw(j, i);
                            break;
                        case '@':
                            block = InitializeView('app.ui.Floor');
                            this.player = InitializeView('app.ui.Player');
                            this.player.draw(j, i);
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
        },
        handleMovement: function (e,data) {
            switch (data.direction) {
                case 'left':
                    this.player.setPosition(this.player.left - 1, this.player.top);
                    break;
                case 'top':
                    this.player.setPosition(this.player.left , this.player.top-1);
                    break;
                case 'right':
                    this.player.setPosition(this.player.left + 1, this.player.top);
                    break;
                case 'down':
                    this.player.setPosition(this.player.left, this.player.top +1);
                    break;
            }
        }
    });
})(skui.resolve('app.ui'));
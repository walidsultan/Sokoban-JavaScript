(function (ns) {
    ns.Sokoban = skui.extend(function () {

        this.initialize();
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
    });
})(skui.resolve('app.ui'));
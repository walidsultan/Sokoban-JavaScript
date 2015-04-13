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
                    $('body').append('<span>' + row[j] + '</span>');
                }
                $('body').append("<br>");
            }
        }
    });
})(skui.resolve('app.ui'));
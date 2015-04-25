(function (ns) {
    ns.UsersHandler = skui.extend(function () {
        this.levelIndex = 1;
        var userCookie = this.getCookie('sokobanUser');
        if (userCookie != '') {
            userCookie = JSON.parse(userCookie);
            this.levelIndex = userCookie.levelIndex;
        } else {
            var sokobanUser = {
                userId: guid(),
                levelIndex: 1
            };
            this.setCookie('sokobanUser', JSON.stringify(sokobanUser), 365);
        }
        $(window).on('levelSolved', this.saveUserLevelIndex.bind(this));

        $(window).trigger('loadMenu', { levelIndex: this.levelIndex });
    }, {
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        saveUserLevelIndex: function () {
            var userCookie = JSON.parse(this.getCookie('sokobanUser'));
            this.levelIndex++;
            if (userCookie != null) {
                userCookie.levelIndex = this.levelIndex;
                this.setCookie('sokobanUser', JSON.stringify(userCookie), 365);
            }
        }
    });
})(skui.resolve('app.ui'));
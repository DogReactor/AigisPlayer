window.addEvent("domready", function () {
    var tempSettingsStore = new Store("settings", {});
    i18n.setLanguageGetter(function () {
        return tempSettingsStore.get("language");
    });

    var manifest = getSettingsManifest(i18n);

    new FancySettings.initWithManifest(
        manifest, 
        function (settings) {
            settings.manifest.oneesama.addEvent("action", function () {
                var uri = "../../icons/active-64.png";
                $("favicon").set("href", uri);
                $("icon").set("src", uri);
            });

            settings.manifest.authenticate.addEvent("action", function () {
                chrome.runtime.sendMessage(
                    { type: "getUserIds" }, 
                    showAuthenticationDialog
                );
            });
        }
    );

    function showAuthenticationDialog (userIds) {
        if (typeof (userIds) === "string")
            userIds = JSON.parse(userIds);

        if (!userIds || userIds.length < 1) {
            alert("You must be logged into the game.");
            return;
        }

        var w = 960;
        var h = 540;
        var x = (screen.width - w) / 2;
        var y = (screen.height - h) / 2;

        var popup = window.open(
            "/content/authenticate.html#" + JSON.stringify(userIds), 
            "vm-authenticate", 
            "left=" + x +
            ",top=" + y + 
            ",width=950,height=520,location=no,titlebar=no,toolbar=no,resizable=no,scrollbars=no"
        );
    };
});

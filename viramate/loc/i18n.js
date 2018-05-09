//
// Copyright (c) 2011 Frank Kohlhepp
// https://github.com/frankkohlhepp/fancy-settings
// License: LGPL v2.1
//
(function () {
    var defaultLanguageGetter = function () { 
        var lang = navigator.language;
        lang = lang.toLowerCase();
        if (lang.indexOf("en-") === 0)
            lang = "en";
    };

    var languageGetter = defaultLanguageGetter;

    if (this.i18n === undefined) { 
        this.i18n = {}; 
    }

    this.i18n.setLanguageGetter = function (getLanguage) {
        if (!getLanguage) {
            languageGetter = defaultLanguageGetter;
        } else {
            languageGetter = function () {
                var result = getLanguage();
                if (!result)
                    result = defaultLanguageGetter();
                return result;
            };
        }
    };

    var isDebugMode = false;
    try {
        isDebugMode = !('update_url' in chrome.runtime.getManifest());
    } catch (exc) {
    }

    this.i18n.getExpand = function (key, expansions) {
        var result = this.get(key);

        for (var i = 0; i < expansions.length; i++) {
            var expansion = expansions[i];
            var toFind = "{" + i + "}", toReplace;

            if (typeof (expansion) === "string") {
                if (expansion[0] == "@")
                    toReplace = this.get(expansion.substr(1));
                else
                    toReplace = expansion;
            } else if (typeof (expansion) === "number")
                toReplace = String(expansion);
            else 
                throw new Error("Expected string or number");

            result = result.replace(toFind, toReplace);
        }

        return result;
    };

    this.i18n.get = function (value) {
        var lang = languageGetter();
        // HACK: We don't want to show garbage for system languages we 
        //  have no intent to support yet; show them english
        switch (lang) {
            // case "ko":
            case "ja":
            case "en":
            case "zh-cn":
                break;
            default:
                lang = "en";
                break;
        }

        if (value === "lang")
            return lang;

        var key = value;
        while (key) {
            if (this.hasOwnProperty(key)) {
                var dict = this[key];

                if (typeof (dict) === "string") {
                    if (key === dict)
                        break;

                    key = dict;
                    continue;
                }

                if (dict.hasOwnProperty(lang))
                    return dict[lang];

                if (dict.hasOwnProperty("en")) {
                    if (isDebugMode)
                        return value + " '" + dict["en"] + "'";
                    else
                        return dict["en"];
                }
            }

            key = null;
        }

        var placeholder = value + " (" + lang + ")";
        return placeholder;
    };
}());

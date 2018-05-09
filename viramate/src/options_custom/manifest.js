function getSettingsManifest (i18n) {
    return {

    "name": "Settings",
    "icon": "../../icons/inactive-64.png",
    "settings": [
        {
            "tab": i18n.get("category-extension"),
            "group": "",
            "name": "globalDisable",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-version"),
            "name": "enableAutomaticUpdates",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-version"),
            "name": "updateWidget",
            "type": "updateWidget"
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-language"),
            "name": "language",
            "type": "popupButton",
            "options": [
                {
                    text: i18n.get("system-default"),
                    value: ""
                },
                {
                    text: "English",
                    value: "en"
                },
                {
                    text: "日本語 (beta) by Ornstein & Menma",
                    value: "ja"
                },
                {
                    text: "简化字 (beta) by XinoAssassin",
                    value: "zh-cn"
                }
            ],
            "label": ""
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-notifications"),
            "name": "notifyOnFullAP",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-notifications"),
            "name": "notifyOnFullBP",
            "type": "checkbox",
            "label": i18n,
        },

        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-text"),
            "name": "betterEnglishFont",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-text"),
            "name": "fixJPFontRendering",
            "type": "checkbox",
            "label": i18n,
        },

        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-miscellaneous"),
            "name": "showPerformanceHud",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-miscellaneous"),
            "name": "lagWorkaround",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-miscellaneous"),
            "name": "imageSmoothingHack",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-miscellaneous"),
            "name": "showNetworkHud",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-miscellaneous"),
            "name": "keepSoundOnBlur",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-extension"),
            "group": i18n.get("group-miscellaneous"),
            "name": "webAPI",
            "type": "checkbox",
            "label": i18n
        },

        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "showBookmarks",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "horizontalBookmarks",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "openBookmarksOnClick",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "bookmarksSize",
            "type": "slider",
            "label": i18n,
            "min": 0.6,
            "max": 1.3,
            "step": 0.05
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "bookmarksMenuSize",
            "type": "slider",
            "label": i18n,
            "min": 0.5,
            "max": 1.25,
            "step": 0.05
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "bookmarksIconPadding",
            "type": "slider",
            "label": i18n,
            "min": 0,
            "max": 200,
            "step": 5
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "bookmarksInactiveIcon",
            "type": "imageFile",
            "label": i18n,
            "maxSize": 160 * 1024,
            "default": "/content/vira-small-smile.png",
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-bookmarks"),
            "name": "bookmarksActiveIcon",
            "type": "imageFile",
            "label": i18n,
            "maxSize": 160 * 1024,
            "default": "/content/vira-small.png",
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "clockBrightness",
            "type": "slider",
            "label": i18n,
            "min": 0,
            "max": 1.0,
            "step": 0.05
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "statusPanel",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "statusPanelBuffs",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "statusPanelExpiringBuffs",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "itemsPanel",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "largeItemsPanel",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "raidsPanel",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-sidebar"),
            "group": i18n.get("group-panels"),
            "name": "raidsPanelBpFilter",
            "type": "checkbox",
            "label": i18n,
        },

        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "preferredSummonElement",
            "type": "popupButton",
            "options": [
                {
                    text: i18n.get("element-none"),
                    value: ""
                },
                {
                    text: i18n.get("element-fire"),
                    value: "1"
                },
                {
                    text: i18n.get("element-water"),
                    value: "2"
                },
                {
                    text: i18n.get("element-earth"),
                    value: "3"
                },
                {
                    text: i18n.get("element-wind"),
                    value: "4"
                },
                {
                    text: i18n.get("element-light"),
                    value: "5"
                },
                {
                    text: i18n.get("element-dark"),
                    value: "6"
                },
                {
                    text: i18n.get("element-free"),
                    value: "7"
                }
            ],
            "label": i18n,

        },
        
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "smartSupports",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "defaultToSmartSupports",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "tinySupportSummons",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "preferNonFriendSummonsInFavorites",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "preferBahamut",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "preferBunny",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "preferFriendSummons",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "preferLimitBrokenSummons",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-summons"),
            "group": i18n.get("group-summons"),
            "name": "preferHighLevelSummons",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "mistakeGuard",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "hideMobageSidebar",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "arcarumFix",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "popupPositionFix",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "showItemWatchButtons",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "showPartyNames",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "showWeaponAttack",
            "type": "checkbox",
            "label": i18n
        },
        /*
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "allowDragSelect",
            "type": "checkbox",
            "label": i18n,
        },
        */
        /*
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "realtimeRaidList",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "hiddenTwitterRefills",
            "type": "checkbox",
            "label": i18n
        },
        */
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-bug-fixes"),
            "name": "disableMiddleRightClick",
            "type": "checkbox",
            "label": i18n,
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-bug-fixes"),
            "name": "dropdownFix",
            "type": "checkbox",
            "label": i18n
        },
        /*
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "touchInputSupport",
            "type": "checkbox",
            "label": i18n
        },
        */
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "moveCoOpFooter",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "enableCoOpEnhancements",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "autoHidePopups",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "minimumPopupWait",
            "type": "slider",
            "label": i18n,
            "min": 50,
            "max": 950,
            "step": 100
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "maximumPopupWait",
            "type": "slider",
            "label": i18n,
            "min": 750,
            "max": 5000,
            "step": 250
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "singlePageStickers",
            "type": "checkbox",
            "label": i18n,
        },
        /*
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "detailedUpgradePage",
            "type": "checkbox",
            "label": i18n
        },
        */
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "condensedUI",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-user-interface"),
            "group": i18n.get("group-miscellaneous"),
            "name": "submenuSize",
            "type": "slider",
            "label": i18n,
            "min": 0.3,
            "max": 1.5,
            "step": 0.05
        },
        {
            "tab": i18n.get("category-keyboard"),
            "group": i18n.get("group-hotkeys"),
            "name": "keyboardShortcuts2",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-keyboard"),
            "group": i18n.get("group-hotkeys"),
            "name": "focusQuickPanels",
            "type": "checkbox",
            "label": i18n
        },
        /*
        {
            "tab": i18n.get("category-keyboard"),
            "group": i18n.get("group-hotkeys"),
            "name": "keyBindings",
            "type": "keyBindingList",
            "defaults": __keyBindingNamesAndDefaults__
        },
        */
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "showSkillCooldowns",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "showSkillActivationIndicator",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "showQuickPanels",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "oneClickQuickSummons",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "largeQuickPanels",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "showGaugeOverlays",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "highPrecisionHP",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "showTransientMessages",
            "type": "checkbox",
            "label": i18n
        },
        /*
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "autofillBackupTweets",
            "type": "checkbox",
            "label": i18n
        },
        */
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-bug-fixes"),
            "name": "stuckButtonWorkaround2",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-bug-fixes"),
            "name": "buttonSwipeFix",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "showLastActionTimer",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "alwaysShowActionTimer",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "disablePhalanxSticker",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "permanentTurnCounter",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "disablePerCharacterOugiSkip",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-user-interface"),
            "name": "enableRaidSync",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-debuffs"),
            "name": "monitorRaidDebuffs",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-debuffs"),
            "name": "showDebuffTimers",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-buffs"),
            "name": "showBuffTimers",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-buffs"),
            "name": "showFieldEffectTimers",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-debuffs"),
            "name": "filterEnemyTimers",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-buffs"),
            "name": "showPartyHelp",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-results"),
            "name": "autoSkipToQuestResults",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-results"),
            "name": "autoSkipToRaidResults",
            "type": "checkbox",
            "label": i18n
        },
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-results"),
            "name": "showNextRankExp",
            "type": "checkbox",
            "label": i18n
        },
        /*
        {
            "tab": i18n.get("category-combat"),
            "group": i18n.get("group-skipping"),
            "name": "autoAdvancePreQuest",
            "type": "checkbox",
            "label": i18n
        },
        */
        {
            "tab": "",
            "group": "お姉さま...",
            "name": "oneesama",
            "type": "button",
            "text": "うふふふふ"
        },
        {
            "tab": "",
            "group": "",
            "name": "authenticate",
            "type": "button",
            "text": "Authenticate"
        },
        {
            "tab": "",
            "group": "",
            "name": "proxyHeartbeat",
            "type": "checkbox",
            "label": "Chrome HTTPS2.0 proxy bug workaround"
        },
        /*
        {
            "tab": "",
            "group": "",
            "name": "fastlaneDynamicPrefetch",
            "type": "checkbox",
            "label": "dynamic prefetch"
        },
        */
    ],
    "alignment": [
    ]

    };
};

var __SECTION__ = "<SECTION>";
var __keyBindingNamesAndDefaults__ = {
    "General": __SECTION__,
    "OK": "SPACE",
    "Cancel": ["ESCAPE", "`"],

    "Battle": __SECTION__,    
    "Empty Skill Queue": "ESCAPE",
    "Previous Target": ["F", "["],
    "Next Target": ["G", "]"],
    "Toggle Charge Attack": "C",
    "Open Healing Window": "H",

    "Battle Characters": __SECTION__,
    "Character Panel 1": "1",
    "Character Panel 2": "2",
    "Character Panel 3": "3",
    "Character Panel 4": "4",

    "Battle Abilities": __SECTION__,
    "Ability 1": "Q",
    "Ability 2": "W",
    "Ability 3": "E",
    "Ability 4": "R",

    "Battle Summons": __SECTION__,
    "Summons Panel": "5",
    "Main Summon": "Q",
    "Sub Summon 1": "W",
    "Sub Summon 2": "E",
    "Sub Summon 3": "R",
    "Sub Summon 4": "T",
    "Friend Summon": "Y",

    "Healing Window": __SECTION__,
    "Green Potion": "Q",
    "Blue Potion": "W",

    "Ability Target Selection": __SECTION__,
    "Target Character 1": "1",
    "Target Character 2": "2",
    "Target Character 3": "3",
    "Target Character 4": "4",
    "Target Character 5": "5",
    "Target Character 6": "6",
};
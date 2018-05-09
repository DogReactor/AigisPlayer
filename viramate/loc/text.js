(function () {
this.i18n = {
    /*
        Strings for japanese can be added like so:

        "name": {
            "en": "Romaji"
        },

        ->

        "name": {
            "en": "Romaji",
            "ja": "ローマ字"
        },

        Just make sure you keep the commas in the right places!
        If I screwed up and there's not a comma after the english string, 
         you'll need to add one.
        Making a mistake will probably break the options page.

        To preview your changes, just reload the settings window.
        You can switch between languages in the 'Extension' part of settings,
         then reload the settings window to apply the switch.

        Thanks!
    */

    "settings": {
        "en": "Settings",
        "ja": "設定",
        "ko": "설정",
        "zh-cn": "设置"
    },
    "search": {
        "en": "Search",
        "ja": "探索",
        "ko": "검색",
        "zh-cn": "搜索"
    },
    "nothing-found": {
        "en": "No matches were found.",
        "ja": "見つかりませんでした。",
        "ko": "검색결과가 없습니다.",
        "zh-cn": "没有找到匹配项"
    },
    "system-default": {
        "en": "System default",
        "ja": "システムディフォルト",
        "zh-cn": "系统默认值"
        // FIXME: ko
    },
    
    "category-extension": {
        "en": "General",
        "ja": "一般",
        "ko": "확장 프로그램",
        "zh-cn": "通用"
    },
    "category-sidebar": {
        "en": "Sidebar",
        "ja": "サイドバー",
        "zh-cn": "侧边栏"
        // FIXME: ko
    },    
    "category-user-interface": {
        "en": "User Interface",
        "ja": "UI設定",
        "ko": "UI인터페이스",
        "zh-cn": "UI 设置"
    },
    "category-summons": {
        "en": "Summons",
        "ja": "サポーター召喚石設定",
        "ko": "소환",
        "zh-cn": "召唤石页面"
    },    
    "category-keyboard": {
        "en": "Keyboard",
        "ja": "キーボード設定",
        "ko": "키보드",
        "zh-cn": "键盘设置"
    },
    "category-combat": {
        "en": "Combat",
        "ja": "戦闘設定",
        "ko": "배틀",
        "zh-cn": "战斗设置"
    },     

    "group-bug-fixes": {
        "en": "Bug Fixes & Workarounds",
        // FIXME
        "zh-cn": "Bug 修复 & 解决方案"
    },
    "group-language": {
        "en": "Language",
        "ja": "言語",
        "ko": "언어",
        "zh-cn": "语言"
    },    
    "group-notifications": {
        "en": "Notifications",
        "ja": "通知",
        "ko": "통지",
        "zh-cn": "通知"
    },
    "group-bookmarks": {
        "en": "Bookmarks",
        "ja": "ブックマーク",
        "ko": "북마크",
        "zh-cn": "书签"
    },
    "group-panels": {
        "en": "Panels",
        "ja": "パネル",
        "zh-cn": "面板"
        // FIXME: ko
    },
    "group-summons": {
        "en": "Summons",
        "ja": "サポーター召喚石",
        "ko": "소환",
        "zh-cn": "支援召唤石"
    },
    "group-miscellaneous": {
        "en": "Miscellaneous",
        "ja": "他の",
        "ko": "잡다한",
        "zh-cn": "其他"
    },
    "group-hotkeys": {
        "en": "Hotkeys",
        "ja": "キーバインド",
        "ko": "단축키",
        "zh-cn": "热键"
    },
    "group-user-interface": {
        "en": "User Interface",
        "ja": "UI設定",
        "ko": "UI인터페이스",
        "zh-cn": "UI 设置"
    },
    "group-skills": {
        "en": "Skills",
        "ja": "アビリティ",
        "ko": "어빌리티",
        "zh-cn": "技能"
    },
    "group-buffs": {
        "en": "Buffs",
        "ja": "バフ",
        "zh-cn": "Buffs"
    },
    "group-debuffs": {
        "en": "Debuffs",
        "ja": "デバフ",
        "ko": "디버프",
        "zh-cn": "Debuffs"
    },
    "group-skipping": {
        "en": "Skipping",
        "ja": "スキップ",
        "ko": "건너 뛰기",
        "zh-cn": "跳过"
    },
    "group-text": {
        "en": "Text",
        "ja": "フォント",
        // FIXME: ko
        // No Chinese Font settings
        "zh-cn": "文本"
    },
    "group-version": {
        "en": "Version",
    },
    "group-results": {
        "en": "Results",
    },

    "element-none": {
        "en": "None",
        "ja": "なし",
        "zh-cn": "无"
        // FIXME: ko
    },
    "element-fire": {
        "en": "Fire",
        "ja": "火属性",
        "ko": "불",
        "zh-cn": "火属性"
    },
    "element-water": {
        "en": "Water",
        "ja": "水属性",
        "ko": "물",
        "zh-cn": "水属性"        
    },
    "element-earth": {
        "en": "Earth",
        "ja": "土属性",
        "ko": "땅",
        "zh-cn": "土属性"
    },
    "element-wind": {
        "en": "Wind",
        "ja": "風属性",
        "ko": "바람",
        "zh-cn": "风属性"
    },
    "element-light": {
        "en": "Light",
        "ja": "光属性",
        "ko": "빛",
        "zh-cn": "光属性"
    },
    "element-dark": {
        "en": "Dark",
        "ja": "闇属性",
        "ko": "어둠",
        "zh-cn": "暗属性"
    },
    "element-free": {
        "en": "Misc.",
        "ja": "フリー",
        // FIXME: ko
        "zh-cn": "杂项"
    },

    "notifyOnFullAP": {
        "en": "Notify when AP is full",
        "ja": "AP全回復する時",
        "ko": "AP가득할때 통지하기",
        "zh-cn": "当 AP 回满时推送通知"
    },
    "notifyOnFullBP": {
        "en": "Notify when BP is full",
        "ja": "BP全回復する時",
        "ko": "BP가득할때 통지하기",
        "zh-cn": "当 BP 回满时推送通知" 
        // in English Version, the BP is called EP
    },
    "notifyBeforeDefendOrder": {
        "en": "Notify before a Defend Order",
        "ja": "DOが発生する直前",
        "zh-cn": "DO 开始前通知"
        // FIXME
    },
    "showBookmarks": {
        "en": "Show bookmarks menu",
        "ja": "ブックマークを表示する",
        "ko": "북마크보기",
        "zh-cn": "显示书签栏"
    },
    "bookmarksSize": {
        "en": "Bookmarks icon size",
        "ja": "アイコンサイズ",
        "ko": "북마크 아이콘 크기",
        "zh-cn": "书签栏图标大小"
    },
    "bookmarksMenuSize": {
        "en": "Bookmarks menu size",
        "ja": "ブックマークサイズ",
        "zh-cn": "书签栏菜单大小"
        // FIXME: ko
    },
    "openBookmarksOnClick": {
        "en": "Click to open bookmarks menu",
        "ja": "クリックしてブックマークの画面を表示する",
        "zh-cn": "点击打开书签栏菜单"
        // FIXME: ko
    },
    "clockBrightness": {
        "en": "JST clock brightness",
        "ja": "時計の明るさ",
        "zh-cn": "时钟的亮度（东京时区）"
        // FIXME: ko
    },
    "preferBahamut": {
        "en": "Prioritize Bahamut and Lucifer",
        "ja": "バハムート・ルシフェルを優先する",
        "ko": "바하·루시퍼 우선하기" ,
        "zh-cn": "优先显示路西法和巴哈姆特"
    },
    "preferBunny": {
        "en": "Prioritize Kaguya and Rabbit",
        "ja": "カグヤ・ホワイトラビット・ブラックラビットを優先する",
        "zh-cn": "优先显示輝夜和兔子"
        // FIXME: ko
    },
    "preferFriendSummons": {
        "en": "Prefer friend summons",
        "ja": "フレンド召喚石を優先する",
        "ko": "친구 소환을 우선하기",
        "zh-cn": "优先显示朋友的召唤石"
    },
    "preferNonFriendSummonsInFavorites": {
        "en": "Prefer non-friend summons in favorites list",
        // FIXME
    },
    "preferLimitBrokenSummons": {
        "en": "Prefer limit-broken summons",
        "ja": "最終上限解放召喚石を優先する",
        "ko": "최종 상한 해방 소환석을 우선하기",
        "zh-cn": "优先显示终破的召唤石"
    },
    "preferHighLevelSummons": {
        "en": "Prefer high-level summons",
        "ja": "レベル高い召喚石を優先する",
        "ko": "수준 높은 소환석을 우선하기",
        "zh-cn": "优先显示等级更高的召唤石"
    },
    "preferredSummonElement": {
        "en": "Default element",
        "ja": "メイン属性",
        "ko": "기본 소환석",
        "zh-cn": "默认属性"
    },
    "allowDragSelect": {
        "en": "EXPERIMENTAL: Allow drag-selecting items",
        "ja": "実験中：クリック&ドラッグを有効にする",
        "ko": "실험중:목록 클릭과드래그를 사용하기",
        "zh-cn": "实验中：允许拖放物品"
    },
    "submenuSize": {
        "en": "Submenu size",
        "ja": "サブメニューのサイズ",
        "ko": "서브메뉴의 크기",
        "zh-cn": "副菜单大小"
    },
    "fixJPFontRendering": {
        "en": "Improve Japanese font rendering",
        "ja": "フォンレンダリングを改善する",
        "zh-cn": "日文字体渲染改善"
        // FIXME: ko
    },
    "disableMiddleRightClick": {
        "en": "Prevent middle and right clicks from clicking buttons",
        "ja": "中・右マウスボタンをゲーム内にクルックしないようにする",
        "zh-cn": "防止按到中键和右键"
        // FIXME: ko
    },
    /*
    "hiddenTwitterRefills": {
        "en": "Send twitter refills as invisible direct messages",
        "ja": "ツイッター投稿をダイレクトメッセージで受け取る",
        "zh-cn": "用 Invisible DM 来补满 AP·BP"
        // FIXME: ko
    },
    */
    "showSkillCooldowns": {
        "en": "Show skill cooldowns in main view",
        "ja": "アビリティの再使用時間を指示する",
        "ko": "어빌리티CD를 메인뷰의 보여주기",
        "zh-cn": "在主视图中显示技能冷却"
    },
    "showQuickPanels": {
        "en": "EXPERIMENTAL: Show quick skill & summon buttons",
        "ja": "実験中：アビリティと召喚石のショートカットを指示する",
        "ko": "실험중:빠른 어빌리티와 소환 버튼를 보여주기",
        "zh-cn": "实验中：使用快速技能栏和召唤兽栏"
    },
    "showSkillQueue": {
        "en": "Show skill queue",
        "ja": "先行入力したアビリティを指示する",
        "ko": "어빌리티열를 보여주기",
        "zh-cn": "显示技能队列"
    },
    "showDebuffTimers": {
        "en": "Show enemy debuff timers",
        "ja": "敵のデバフ時間を指示する",
        "ko": "적의 디버프 시간을 보여주기",
        "zh-cn": "显示敌方 Debuff 计时"
    },
    "showBuffTimers": {
        "en": "Show enemy buff timers",
        "ja": "敵のバフ時間を指示する",
        "zh-cn": "显示敌方 Buff 计时"
        // FIXME: ko
    },
    "filterEnemyTimers": {
        "en": "Only show buff/debuff timers for current target",
        "ja": "選択中の敵のデバフとバフ時間のみを指示する",
        "zh-cn": "只对当前选中的敌人显示 Buff/Debuff 计时"
        // FIXME: ko
    },
    "showPartyHelp": {
        "en": "VERY EXPERIMENTAL: Show party buff summary",
        "ja": "味方のバフ時間を指示する",
        "zh-cn": "实验中：显示友方总的 Buff"
        // FIXME: ko
    },
    "showGaugeOverlays": {
        "en": "Show health and mode overlays",
        "ja": "敵のHPとモードゲージを指示する",
        "ko": "HP과MODE 오버레이 보여주기",
        "zh-cn": "覆盖显示血量和 mode 条"
    },
    "highPrecisionHP": {
        "en": "Precise health overlay numbers",
        "ja": "敵のHPとモードゲージを正確に指示する",
        "ko": "정확한HP 오버레이 보여주기",
        "zh-cn": "精确显示血量数字"
    },
    "queueSkills": {
        "en": "Queue skill activations",
        "ja": "アビリティを先行入力できる",
        "ko": "어빌리티열를 선행 입력 할 수",
        "zh-cn": "激活技能队列"
        
    },
    "retryQueuedSkills": {
        "en": "Retry queued skills if first activation fails",
        "ja": "アビリティの使用が失敗した場合は再使用する",
        "ko": "어빌리티 사용이 실패한 경우 다시 사용하기",
        "zh-cn": "如果首次使用技能失败则重试"
    },
    "monitorRaidDebuffs": {
        "en": "Re-check debuffs when other players act",
        "ja": "他の参加者の通知が出る時にデバフ時間を更新する",
        "ko": "다른 플레이어 통지가 나올때 디버프 시간을 업데이트",
        "zh-cn": "当其他参展者行动时重新检查 Debuff"
    },
    "autoSkipToQuestResults": {
        "en": "Automatically end quests",
        "ja": "クエストが終わると自動で次の画面へ",
        "ko": "퀘스트가 끝나면 자동으로 다음 화면으로가기",
        "zh-cn": "自动结束任务"
    },
    "autoSkipToRaidResults": {
        "en": "Automatically end raids",
        "ja": "マルチバトルが終わると自動で次の画面へ",
        "ko": "멀티 플레이어 배틀이 끝나면 자동으로 다음 화면으로가기",
        "zh-cn": "自动结束 Raid 战斗"
    },
    "autoAdvancePreQuest": {
        "en": "Automatically advance through pre-quest enemies",
        "ja": "クエスト道中を自動で進む",
        "ko": "퀘스트 도중 자동으로 진행",
        "zh-cn": "自动跳过任务前的敌人"
    },
    "touchInputSupport": {
        "en": "BROKEN: Enable touch input<br>" +
            "Only turn this on if you need it! It causes issues.",
        "ja": "破損: タッチ入力機能を使用する<br>" +
            "必要な場合にのみ使用してください。エラーが出る可能性があります。",
        "zh-cn": "损坏的功能：启用触摸输入<br>"+
           "只有当你需要它的时候启用这项功能！它会导致一些问题"
        // FIXME: ko
    },
    "condensedUI": {
        "en": "Condensed user interface<br>" +
            "<ul>" +
            "<li>Smaller supply icons</li>" +
            "<li>Smaller job list items</li>" +
            "<li>Smaller subskill list items</li>" +
            "</ul>",
        "ja": "UIを縮小する" +
            "<ul>" +
            "<li>回復アイテムのアイコンを縮小する</li>" +
            "<li>ジョブアイコンを縮小する</li>" +
            "<li>EXアビリティのアイコンを縮小する</li>" +
            "</ul>",
        "ko": "미니UI인터페이스" +
            "<ul>" +
            "<li>미니회복 아이템의 아이콘</li>" +
            "<li>미니직업 아이콘</li>" +
            "<li>미니EX어빌리티의 아이콘</li>" +
            "</ul>",
        "zh-cn": "精简 UI 界面" +
            "<ul>" +
            "<li>缩小补给图标</li>" +
            "<li>缩小职业图标</li>" +
            "<li>缩小 EX 技能列表图标</li>" +
            "</ul>",
    },
    "keyboardShortcuts2": {
        "en": "EXPERIMENTAL: Enable<br><hr>" +
            "Customizable shortcuts are coming <i>someday!</i><br>Until then - a quick reference:<br><br>" +
            "<b>General Shortcuts</b><br>" +
            "<ul>" + 
            "<li><b>Space</b> to select OK buttons.</li>" +
            "<li><b>`</b> or <b>Escape</b> to select cancel buttons.</li>" +
            "</ul>" +
            "<b>Combat Shortcuts</b><br>" + 
            "<ul>" + 
            "<li><b>1/2/3/4</b> to select characters.</li>" +
            "<li><b>Left/Right arrow</b> to cycle characters.</li>" +
            "<li><b>F/G</b> or <b>[</b>/<b>]</b> to cycle targets.</li>" +
            "<li><b>q/w/e/r</b> to use character abilities.</li>" +
            "<li><b>Arrow keys</b> to select ninja marks.</li>" +
            "<li><b>5</b> to select the summons panel.</li>" +
            "<li><b>q/w/e/r/t/y</b> to use summons.</li>" +
            "<li><b>`</b> to select Back or otherwise cancel out of things.</li>" +
            "<li><b>C</b> to toggle charge attack.</li>" +
            "<li><b>H</b> to open healing window.</li>" +
            "<li><b>Escape</b> to empty the skill queue.</li>" +
            "<li><b>K</b> to open the Stickers window.</li>" +
            "</ul>",
        "ja": "実験中：有効にする<br><hr>" +
            "カスタマイズ可能なキーバインドは実施する予定です。<br>現在の設定はこちら：<br><br>" +
            "<b>基準</b><br>" +
            "<ul>" + 
            "<li>「<b>SPACE</b>」= OK</li>" +
            "<li>「<b>`</b>」か「<b>ESC</b>」= キャンセル</li>" +
            "</ul>" +
            "<b>バトル</b><br>" + 
            "<ul>" + 
            "<li>「<b>1-4</b>」= キャラクターを選択する。</li>" +
            "<li>「<b>左/右 方向キー</b>」= キャラクターチェンジする。</li>" +
            "<li>「<b>F/G</b>」か「<b>[</b>/<b>]</b>」= ターゲットを循環する。</li>" +
            "<li>「<b>Q/W/E/R</b>」= キャラクターのアビリティを発動する。</li>" +
            "<li>「<b>方向キー</b>」= 忍者の印を選択する。</li>" +
            "<li>「<b>5</b>」= 召喚石を画面を表示する。</li>" +
            "<li>「<b>Q/W/E/R/T/Y</b>」= 召喚石を使用する。</li>" +
            "<li>「<b>`</b>」= キャンセルや戻る。</li>" +
            "<li>「<b>C</b>」= 奥義の発動。</li>" +
            "<li>「<b>H</b>」= 回復画面を表示する。</li>" +
            "<li>「<b>ESC</b>」= 先行入力したアビリティを解除する。</li>" +
            "<li>「<b>K</b>」= Stamp</li>" +
            "</ul>",
        "ko": "실험중:Enable<br><hr>" +
            "사용자정의 키바인딩이 곧 올 겁니다!<br>그때까지 - 현재설정:<br><br>" +
            "<b>General Shortcuts</b><br>" +
            "<ul>" + 
            "<li>「<b>SPACE</b>」= OK</li>" +
            "<li>「<b>`</b>」과「<b>ESC</b>」= 취소</li>" +
            "</ul>" +
            "<b>단축키</b><br>" + 
            "<ul>" + 
            "<li>「<b>1-4</b>」= 캐릭터 선택</li>" +
            "<li>「<b>왼쪽/오른쪽 화살표키</b>」= 캐릭터 체인지</li>" +
            "<li>「<b>F/G</b> or <b>[</b>/<b>]</b>」= cycle targets.</li>" +
            "<li>「<b>Q/W/E/R</b>」= 캐릭터의 어빌리티를 발동하기</li>" +
            "<li>「<b>화살표키</b>」= 닌자 표시를 선택</li>" +
            "<li>「<b>5</b>」= 소환 석을 화면보기</li>" +
            "<li>「<b>Q/W/E/R/T/Y</b>」= 소환 석을 사용하기</li>" +
            "<li>「<b>`</b>」= 취소나 돌아보기</li>" +
            "<li>「<b>C</b>」= 비밀</li>" +
            "<li>「<b>H</b>」= 복구 화면을 보여주기</li>" +
            "<li>「<b>ESC</b>」= 선행 입력 한 어빌리티를 해제</li>" +
            "<li>「<b>K</b>」= Stamp</li>" +
            "</ul>",
        // FIXME: ko
        "zh-cn": "实验中：启用<br><hr>" +
            "自定义快捷键正在开发中，未来<i>某日</i>会实装<br>现在的设定：<br><br>" +
             "<b>通用快捷键</b><br>" +
            "<ul>" + 
            "<li><b>空格</b> OK 按钮</li>" +
             "<li><b>`</b> or <b>ESC</b> cancel 按钮</li>" +
            "</ul>" +
            "<b>战斗中快捷键</b><br>" + 
            "<ul>" + 
            "<li><b>1/2/3/4</b> 选择人物。</li>" +
            "<li><b>左/右方向键</b> 切换人物。</li>" +
            "<li><b>F/G</b> or <b>[</b>/<b>]</b> 切换目标。</li>" +
            "<li><b>q/w/e/r</b> 使用人物技能。</li>" +
            "<li><b>方向键</b> 选择忍者的印记。</li>" +
            "<li><b>5</b> 打开召唤石栏</li>" +
            "<li><b>q/w/e/r/t/y</b> 使用召唤石</li>" +
            "<li><b>`</b> 返回或者取消。</li>" +
            "<li><b>C</b> 切换是否释放奥义。</li>" +
            "<li><b>H</b> 打开回复界面。</li>" +
            "<li><b>Escape</b> 清空技能队列。</li>" +
            "<li><b>K</b> 打开表情窗口</li>" +
            "</ul>",
    },
    "focusQuickPanels": {
        "en": "Highlight quick panels instead of opening character panels",
        "zh-cn": "以高亮快速选择面板的方式取代打开角色面板"
        // FIXME: ja, ko
    },
    "enableCoOpEnhancements": {
        "en": "Enhanced co-op UI",
        "ja": "共闘クエストのUIを改善する",
        "zh-cn": "改善共斗 UI "
        // FIXME: ko
    },
    "dropdownFix": {
        "en": "EXPERIMENTAL: Dropdown/textbox mouse fix",
        "ja": "実験中：マウスに関するのドロップダウンとテキストボックスのバグを治す",
        "zh-cn": "实验中： Dropdown/textbox mouse fix"
        // FIXME: ko
    },
    "oneClickQuickSummons": {
        "en": "One-click quick summons",
        "ja": "召喚石のショートカットを一クリックで発動する",
        "zh-cn": "单击发动召唤石"
        // FIXME: ko
    },
    "statusPanel": {
        "en": "Show status panel below bookmarks",
        "ja": "ブックマークの下にステータスを表示する",
        "zh-cn": "在书签栏下显示状态面板"
        // FIXME: ko
    },
    "statusPanelBuffs": {
        "en": "Show guild and personal buffs in status panel",
        "ja": "騎空団・よろず屋サポートのステータスを表示する",
        "zh-cn": "在状态栏显示骑空团和自己的 Buff"
        // FIXME: ko
    },
    "statusPanelExpiringBuffs": {
        "en": "Only show buffs that will expire soon",
        "ja": "もうじきなくなるのサポート効果のみを表示する",
        "zh-cn": "只有当 Buff 快要结束时才显示"
        // FIXME: ko
    },
    "raidsPanel": {
        "en": "Show raids panel below bookmarks",
        "ja": "ブックマークの下にマルチバトル一覧を表示する",
        "zh-cn": "在书签栏下以面板的形式显示当前刷新出的 Raids"
        // FIXME: ko
    },
    "raidsPanelBpFilter": {
        "en": "Only show raids panel if you have >= 3 BP",
        "ja": "3BP以上の場合のみマルチバトル一覧のパネルを表示する",
        "zh-cn": "只有当你有 3BP 以上时才显示 Raid 面板"
        // FIXME: ko
    },
    "realtimeRaidList": {
        "en": "Refresh list automatically when on raids page",
        "ja": "自動的にマルチバトル一覧を更新する",
        "zh-cn": "当位于 Raids 页面是自动刷新列表"
        // FIXME: ko
    },
    "bookmarksInactiveIcon": {
        "en": "Inactive icon",
        "ja": "閉じている時のアイコン",
        "zh-cn": "未激活时的图标"
        // FIXME:　ko
    },
    "bookmarksActiveIcon": {
        "en": "Active icon",
        "ja": "開いている時のアイコン",
        "zh-cn": "激活时的图标"
        // FIXME: ko
    },
    "bookmarksIconPadding": {
        "en": "Padding between icon and panels",
        "ja": "ブックマークとパネルの間の余白",
        "zh-cn": "图标和面板之间的空隙"
        // FIXME: ko
    },
    "horizontalBookmarks": {
        "en": "Show bookmarks & panels horizontally",
        "ja": "ブックマークとパネルを横に表示する",
        "zh-cn": "水平显示书签和各种面板"
        // FIXME: ko
    },
    "betterEnglishFont": {
        "en": "Superior English font",
        "ja": "英語の文字のフォントを改善する",
        "zh-cn": "改善英文字体的显示"
        // FIXME: ko
    },
    "showItemWatchButtons": {
        "en": "Enable 'show item on sidebar' buttons",
        "ja": "アイテムをサイドバーに表示するのボタンを表示する",
        "zh-cn": "启动“在侧边栏上显示物品”的按钮"
        // FIXME: ko
    },
    "showPartyNames": {
        "en": "Show names in party selector",
        "ja": "編成切り替えのボタンで編成の名前を表示する",
        "zh-cn": "在队伍选择器上显示各队名字"
        // FIXME: ko
    },
    "showPerformanceHud": {
        "en": "Show performance HUD",
        "ja": "パフォーマンスの統計を表示する",
        "zh-cn": "显示性能 HUD"
        // FIXME: ko
    },
    "lagWorkaround": {
        "en": "Compensate for lag and low refresh rates",
        "ja": "実験中：フレームレートを上げる",
        "zh-cn": "实验中： 启用卡顿的解决方法"
        // FIXME: ko
    },
    "imageSmoothingHack": {
        "en": "Disable image smoothing to reduce lag",
        // FIXME: ja, ko, zh-cn
    },
    "showNetworkHud": {
        "en": "Show network HUD",
        "ja": "ネットワークの統計を表示する",
        "zh-cn": "显示网络状况 HUD"
        // FIXME: ko
    },
    "keepSoundOnBlur": {
        "en": "Continue playing sound when browser loses focus",
        "ja": "ブラウザのフォーカスが外してもサウンドを再生し続けるようにする",
        "zh-cn": "浏览器失去焦点时继续播放音乐"
        // FIXME: ko
    },
    "showWeaponAttack": {
        "en": "Show weapon ATK in skill level view",
        "ja": "編成の武器のスキルを見る時、武器の攻撃力を表示する",
        "zh-cn": "在编成中查看武器的技能时同时显示武器的攻击力"
        // FIXME: ko
    },
    "showSkillActivationIndicator": {
        "en": "Show indicator when skills are activating",
        "ja": "発動中のアビリティのアイコンを強調する",
        "zh-cn": "在技能施放时显示计时"
        // FIXME: ko
    },
    "autofillBackupTweets": {
        "en": "Auto-fill Japanese name when requesting backup via Twitter",
        "ja": "ツイッターの救援依頼のテキスト入力で敵の名前を追加する",
        "zh-cn": "在放推时自动填入怪的日文名"
        // FIXME: ko
    },
    "moveCoOpFooter": {
        "en": "Move co-op room footer to the top of the window",
        "ja": "共闘クエストのルームのフッターをページの上に移動する",
        "zh-cn": "将共斗房的页脚移到窗口顶端"
        // FIXME: ko
    },
    "largeQuickPanels": {
        "en": "Show larger quick skill buttons",
        "ja": "アビリティのショートカットを大きくにする",
        "zh-cn": "在快速技能栏显示大图标"
        // FIXME: ko
    },
    "stuckButtonWorkaround2": {
        "en": "Stuck skill button workaround",
        // FIXME: ja, ko
        "zh-cn": "解决卡住的技能"
    },
    "showFieldEffectTimers": {
        "en": "EXPERIMENTAL: Show field effect timers",
        // FIXME: ja, ko
        "zh-cn": "实验性：显示场地效果计时器"
    },
    "showLastActionTimer": {
        "en": "Show action timer after reloading",
        "zh-cn": "在刷新后继续显示动作计时器"
        // FIXME: ja, ko
    },
    "smartSupports": {
        "en": "EXPERIMENTAL: Add favorite summons tab",
        "zh-cn": "实验性： 增加最爱召唤选项卡"
        // FIXME: ja, ko
    },
    "defaultToSmartSupports": {
        "en": "Default to favorite summons tab if available",
        "zh-cn": "当可用时，默认切换到最爱召唤选项卡"
        // FIXME: ja, ko
    },
    "disablePhalanxSticker": {
        "en": "Disable the Phalanx sticker if you don't have Phalanx",
        "zh-cn": "当你没有神盾技能时禁用神盾表情"
        // FIXME: ja, ko
    },
    "autoHidePopups": {
        "en": "VERY EXPERIMENTAL: Auto-hide popups",
        "zh-cn": "实验性： 自动隐藏弹出窗口"
        // FIXME: ja, ko
    },
    "minimumPopupWait": {
        "en": "Minimum delay before popups auto-hide",
        "zh-cn": "在自动隐藏弹出窗口前增加的最小延迟"
        // FIXME: ja, ko
    },
    "maximumPopupWait": {
        "en": "Maximum delay before popups auto-hide",
        "zh-cn": "在自动隐藏弹出窗口前增加的最大延迟"
        // FIXME: ja, ko
    },
    "singlePageStickers": {
        "en": "Enhanced sticker UI",
        "zh-cn": "增强表情 UI"
        // FIXME: ja, ko
    },
    "permanentTurnCounter": {
        "en": "Always show turn counter",
        "zh-cn": "总是显示回合计数器"
        // FIXME: ja, ko
    },
    "itemsPanel": {
        "en": "Show watched items panel on sidebar",
        "zh-cn": "在侧边栏上显示监视的物品面板"
        // FIXME: ja, ko
    },
    "largeItemsPanel": {
        "en": "Show large icons in items panel",
        // FIXME
    },
    "newSkillSystem": {
        "en": "EXPERIMENTAL: New skill system v2.0 (fixes cooldown resets and party shuffles)",
        "zh-cn": "实验性：新的技能系统（修复一些角色的重置技能，比如卡特比拉的重置等"
    },
    "buttonSwipeFix": {
        "en": "EXPERIMENTAL: Fix swipes not activating skill buttons",
        "zh-cn": "实验性：修正滑动无法激活技能按钮"
    },
    "arcarumFix": {
        "en": "Fix mouse clicks breaking in Arcarum stages"
    },
    "disablePerCharacterOugiSkip": {
        "en": "Disable toggling charge attack skip by clicking characters"
    },
    "webAPI": {
        "en": '<a href="/content/api.html">Web API</a>: Allow websites to communicate with Viramate'
    },
    "tinySupportSummons": {
        "en": "Compact summons list"
    },
    "detailedUpgradePage": {
        "en": "Always show skill levels on upgrade page"
    },
    "popupPositionFix": {
        "en": "Stop popups from appearing offscreen",
    },
    "enableRaidSync": {
        "en": "Synchronize status between raid windows",
    },
    "enableAutomaticUpdates": {
        "en": "Enable automatic updates",
    },
    "hideMobageSidebar": {
        "en": "EXPERIMENTAL: Hide Mobage sidebar",
    },
    "mistakeGuard": {
        "en": "Make stash/inventory mass sell buttons red"
    },
    "showTransientMessages": {
        "en": "Show popup messages at the top of the page"
    },
    "showNextRankExp": {
        "en": "Show RP until next rank"
    },
    "globalDisable": {
        "en": "Disable extension"
    },
    "alwaysShowActionTimer": {
        "en": "Always show action timer"
    },

    "name-tia": {
        "en": "Tiamat",
        "ja": "ティアマト",
        "zh-cn": "提亚马特(风妈)"
    },
    "name-colo": {
        "en": "Colossus",
        "ja": "コロッサス",
        "zh-cn": "克洛苏斯(高达)"
    },
    "name-levi": {
        "en": "Leviathan",
        "ja": "リヴァイアサン",
        "zh-cn": "利维坦(泥鳅)"
    },
    "name-yugu": {
        "en": "Yggdrasil",
        "ja": "ユグドラシル",
        "zh-cn": "鱼骨鱼骨(土妹)"
    },
    "name-chev": {
        "en": "Chevalier",
        "ja": "シュヴァリエ",
        "zh-cn": "修瓦利耶(光妈)"
    },
    "name-cel": {
        "en": "Celeste",
        "ja": "セレスト",
        "zh-cn": "塞雷斯特(暗船)"
    },


    "m-home": {
        "en": "Home",
        "ja": "マイページ",
        "zh-cn": "Home"
    },
    "m-party": {
        "en": "Party",
        "ja": "編成",
        "zh-cn": "编成"
    },

    "m-mystuff": {
        "en": "My Stuff",
        "ja": "リスト",
        "zh-cn": "我的物品"
    },
    "m-inventory": {
        "en": "Inventory",
        "ja": "リスト",
        "zh-cn": "列表"
    },
    "m-stash": {
        "en": "Stash",
        "ja": "倉庫",
        "zh-cn": "仓库"
    },
    "m-crate": {
        "en": "Crate",
        "ja": "プレセント",
        "zh-cn": "邮箱"
    },
    "m-supplies": {
        "en": "Supplies",
        "ja": "アイテム",
        "zh-cn": "补给"
    },

    "m-quest": {
        "en": "Quests",
        "ja": "クエスト",
        "zh-cn": "任务"
    },
    "m-quest-all": {
        "en": "Recommended",
        "ja": "クエスト",
        "zh-cn": "推荐"
    },
    "m-quest-special": {
        "en": "Special",
        "ja": "エクストラ",
        "zh-cn": "特殊"
    },
    "m-join-raid": {
        "en": "Join Raid",
        "ja": "マルチバトル",
        "zh-cn": "参加 Raid"
    },
    "m-pending-raids": {
        "en": "Pending Raids",
        "ja": "未確認バトル",
        "zh-cn": "未确认的 Raids"
    },
    "m-defend-order": {
        "en": "Defend Order",
        "ja": "DEFEND ORDER",
        // FIXME: ko
    },
    "m-event": {
        "en": "Event",
        "ja": "イベント",
        // FIXME: ko
    },
    "m-quest-repeat": {
        "en": "Repeat Quest",
        "ja": "クエストを繰り返す",
        "zh-cn": "重复上次任务"
    },

    "m-hard-raids": {
        "en": "Hard Raids",
        "ja": "HARD",
        "zh-cn": "Hard Raids"
    },
    "m-hard-tia":  "name-tia",
    "m-hard-colo": "name-colo",
    "m-hard-levi": "name-levi",
    "m-hard-yugu": "name-yugu",
    "m-hard-chev": "name-chev",
    "m-hard-cel":  "name-cel",

    "m-magna-raids": {
        "en": "Magna Raids",
        "ja": "マグナ",
        "zh-cn": "马格纳"
    },
    "m-magna-tia":  "name-tia",
    "m-magna-colo": "name-colo",
    "m-magna-levi": "name-levi",
    "m-magna-yugu": "name-yugu",
    "m-magna-chev": "name-chev",
    "m-magna-cel":  "name-cel",

    "m-hl-raids": {
        "en": "HL Raids",
        "ja": "HLマグナ",
        "zh-cn": "HL 马格纳"
    },
    "m-hl-tia":  "name-tia",
    "m-hl-colo": "name-colo",
    "m-hl-levi": "name-levi",
    "m-hl-yugu": "name-yugu",
    "m-hl-chev": "name-chev",
    "m-hl-cel":  "name-cel",
    "m-hl-rosequeen": {
        "en": "Rose Queen",
        "ja": "ローズクイーン",
        "zh-cn": "玫瑰女皇(BBA)",
    },

    "m-primal-raids": {
        "en": "Summon Raids",
        "ja": "星晶獣",
        "zh-cn": "星晶兽",
    },
    "m-nataku": {
        "en": "Nezha",
        "ja": "ナタク",
        "zh-cn": "哪吒",
    },
    "m-flame-glass": {
        "en": "Twin Elements",
        "ja": "フラム＝グラス",
        "zh-cn": "双生元素(黑皮)",
    },
    "m-macula-marius": {
        "en": "Macula Marius",
        "ja": "マキュラ・マリウス",
        "zh-cn": "马科拉·马里乌斯(冰皇)",
    },
    "m-medusa": {
        "en": "Medusa",
        "ja": "メドゥーサ",
        "zh-cn": "美杜莎",
    },
    "m-apollo": {
        "en": "Apollo",
        "ja": "アポロン",
        "zh-cn": "阿波罗",
    },
    "m-olivia": {
        "en": "D. Angel Olivia",
        "ja": "Dエンジェル・オリヴィエ",
        "zh-cn": "暗黑天使奥利维亚",
    },
    "m-athena": {
        "en": "Athena",
        "ja": "アテナ",
        "zh-cn": "雅典娜",
    },
    "m-odin": {
        "en": "Odin",
        "ja": "オーディン",
        "zh-cn": "奥丁",
    },

    "m-coop": {
        "en": "Co-op",
        "ja": "共闘",
        "zh-cn": "共斗"
    },
    "m-coop-host": {
        "en": "Host",
        "ja": "仲間を集める",
        "zh-cn": "召集同伴"
    },
    "m-coop-join": {
        "en": "Join",
        "ja": "参加する",
        "zh-cn": "参加"
    },
    "m-coop-shop": {
        "en": "Shop",
        "ja": "トレジャー交換",
        "zh-cn": "奸商"
    },

    "m-me": {
        "en": "Me",
        "ja": "プロフィール",
        "zh-cn": "我"
    },
    "m-profile": {
        "en": "My Profile",
        "ja": "プロフィール",
        "zh-cn": "我的个人资料"
    },
    "m-crew": {
        "en": "Crew",
        "ja": "騎空団",
        "zh-cn": "骑空团"
    },
    "m-friends": {
        "en": "Friends",
        "ja": "フレンド",
        "zh-cn": "好友"
    },
    "m-trophies": {
        "en": "Trophies",
        "ja": "称号",
        "zh-cn": "称号"
    },

    /*
    "m-get-stuff": {
        "en": "Get Stuff",
        "ja": "交換",
    },
    "m-gacha": {
        "en": "Draw",
        "ja": "ガチャ",
    },
    */

    "m-shop": {
        "en": "Shop",
        "ja": "ショップ",
        "zh-cn": "奸商"
    },
    "m-shop-mobacoins": {
        "en": "MobaCoins",
        "ja": "モバコイン",
        "zh-cn": "MobaCoins"
        // FIXME: ko
    },
    "m-shop-crystals": {
        "en": "Crystals",
        "ja": "宝晶石",
        "zh-cn": "宝晶石"
        // FIXME: ko
    },
    "m-shop-points": {
        "en": "Pendants",
        "ja": "武勲・栄誉の輝き",
        "zh-cn": "武勋、荣誉"
        // FIXME: ko
    },
    "m-shop-moon": {
        "en": "Moons",
        "ja": "ムーン",
        "zh-cn": "月亮"
        // FIXME: ko
    },
    "m-shop-treasure": {
        "en": "Treasure",
        "ja": "トレジャー",
        "zh-cn": "素材"
        // FIXME: ko
    },
    "m-shop-whale-tears": {
        "en": "Cerulean Stones",
        "ja": "蒼光の輝石",
        "zh-cn": "苍光之辉石"
        // FIXME: ko
    },
    "m-shop-trajectory": {
        "en": "Journey Drops",
        "ja": "軌跡の雫",
        "zh-cn": "轨迹之雫(水滴)"
        // FIXME: ko
    },
    "m-shop-defend-order": {
        "en": "Defend Order",
        "ja": "DEFEND ORDER",
        "zh-cn": "Defend Order"
        // FIXME: ko
    },
    "m-shop-weapon-series": {
        "en": "Weapon Series",
        "ja": "特殊武器",
        "zh-cn": "特殊武器"
        // FIXME: ko
    },

    "m-casino": {
        "en": "Casino",
        "ja": "カジノ",
        "zh-cn": "赌场"
        // FIXME: ko
    },
    "m-poker": {
        "en": "Poker",
        "ja": "ポーカ",
        "zh-cn": "Poker"        
        // FIXME: ko
    },
    "m-bingo": {
        "en": "Bingo",
        "ja": "ビンゴ",
        "zh-cn": "Bingo"
        // FIXME: ko
    },
    "m-casino-shop": {
        "en": "Shop",
        "ja": "景品交換",
        "zh-cn": "奖品交换"
        // FIXME: ko
    },

    "m-settings": {
        "en": "Settings",
        "ja": "設定",
        "zh-cn": "设置"
    },
    "m-update-notes": {
        "en": "Update Notes",
        "ja": "チェンジログ",
        "zh-cn": "升级日志"
    },

    "m-guild-war": {
        "en": "Unite And Fight",
        "ja": "決戦！星の古戦場",
        "zh-cn": "决战！星之古战场"
        // FIXME: ko
    },
    "m-guild-war-home": {
        "en": "Home",
        "ja": "イベントトップ",
        // FIXME: ko
    },
    "m-guild-war-gacha": {
        "en": "Token Draw",
        "ja": "戦貨ガチャ",
        // FIXME: ko
    },
    "m-guild-war-reward": {
        "en": "Loot",
        "ja": "報酬",
        // FIXME: ko
    },
    "m-guild-war-eye-vh": {
        "en": "Eye (Very Hard)",
        "ja": "目玉 (V. HARD)",
        // FIXME: ko
    },
    "m-guild-war-dog-vh": {
        "en": "Dog (Very Hard)",
        "ja": "犬 (V. HARD)",
        // FIXME: ko
    },
    "m-guild-war-dog-ex": {
        "en": "Dog (Extreme)",
        "ja": "犬 (EXTREME)",
        // FIXME: ko
    },
    "m-guild-war-dog-ex-plus": {
        "en": "Dog (Extreme+)",
        "ja": "犬 (EXTREME+)",
        // FIXME: ko
    },
    "m-guild-war-hell-90": {
        "en": "Nightmare 90",
        "ja": "Hell 90",
        // FIXME: ko
    },
    "m-guild-war-hell-95": {
        "en": "Nightmare 95",
        "ja": "Hell 95",
        // FIXME: ko
    },
    "m-trial-battles": {
        "en": "Trial Battles",
        "ja": "トライアルバトル",
        // FIXME: ko
    },
    "m-fate-episodes": {
        "en": "Fate Episodes",
        "ja": "フェイトエピソード",
        // FIXME: ko
    },
    "m-set-language": {
        "en": "Set game language",
        // FIXME: ja, ko
    },


    "coop-repeat-last": {
        "en": "Last Hosted",
        "ja": "繰り返す",
        "zh-cn": "上次开设"
        // FIXME
    },


    "p-ok": {
        "en": "OK",
        "ja": "OK",
        "zh-cn": "OK"
        // FIXME
    },
    "p-confirm": {
        "en": "Yes",
        "ja": "はい",
        "zh-cn": "Yes"
        // FIXME
    },
    "p-cancel": {
        "en": "No",
        "ja": "いいえ",
        "zh-cn": "No"
        // FIXME
    },
    "p-join": {
        "en": "Join",
        // FIXME
    },
    "p-joinRaid": {
        "en": "Join Raid",
        "ja": "参加する",
        "zh-cn": "加入 Raid"
        // FIXME
    },
    "p-joinRoom": {
        "en": "Join Room",
        // FIXME
    },
    "p-tabNotFound": {
        "en": "No game tab found.",
        "ja": "ゲームのタブは見つかりませんでした。",
        // FIXME
    },
    "p-pleaseReload": {
        "en": "Please reload the game.",
        "ja": "ゲームをリロードしてください。",
        "zh-cn": "请重载游戏(刷新)"
        // FIXME
    },
    "p-raidJoinFailed": {
        "en": "Failed to join raid.",
        "ja": "マルチバトルを参加できませんでした。",
        "zh-cn": "加入 Raid 失败"
        // FIXME
    },
    "p-bpRequired": {
        "en": "{0} BP required.",
        "ja": "{0}BPが必要です。",
        "zh-cn": "需要 {0} BP"
        // FIXME
    },
    "p-invalidRaidCode": {
        "en": "Invalid raid code.",
        "ja": "参戦IDは間違っています。",
        "zh-cn": "无效的参战码"
        // FIXME
    },
    "p-use": {
        "en": "Use {0}",
        "ja": "{0}を使用する",
        "zh-cn": "使用 {0}"
        // FIXME
    },
    "p-use-n": {
        "en": "Use {1}x {0}",
        "ja": "{0}を{1}個使用する",
        "zh-cn": "使用 {0} X {1}"
        // FIXME
    },
    "p-use-question": {
        "en": "Use {0}?",
        "ja": "{0}を使用しますか？",
        "zh-cn": "使用 {0} 个？"
        // FIXME
    },
    "p-use-n-question": {
        "en": "Use {drop|{1}|{2}|{3}}x {0}?",
        "ja": "{0}を{drop|{1}|{2}|{3}}個使用しますか？",
        "zh-cn": "使用 {drop|{1}|{2}|{3}} 个 {0}？"
        // FIXME
    },
    "p-copyRaidCode": {
        "en": "Copy",
        "ja": "コピー",
        "zh-cn": "复制"
        // FIXME
    },
    "p-xp": {
        "en": "Experience. Click to show the amount needed to level.",
        "ja": "Rankポイント。クリックで次のRankまでのポイントを表示します。",
        "zh-cn": "Rank Point. 点击显示离升级还需多少。"
        // FIXME
    },
    "p-status": {
        "en": "{0} people, {1}% HP",
        "ja": "{0}人、残り{1}% HP",
        "zh-cn": "{0} 人，剩余{1}%HP"
        // FIXME
    },
    "p-refill": {
        "en": "Refill with berries",
        "ja": "シードで回復",
        "zh-cn": "使用豆子回复"
        // FIXME
    },
    "p-incompatibleVersion": {
        "en": "Incompatible game version. Please update the extension.",
        "ja": "ヴィーラメイトをアップデートして下さい。",
        "zh-cn": "不适配的游戏版本，请升级维拉助手"
        // FIXME: ko
    },
    "p-notLoggedIn": {
        "en": "You don't seem to be logged in.",
    },
    "p-globalDisable": {
        "en": "Extension disabled",
    },
    "p-enable": {
        "en": "Enable",
    },
    "p-triedToEnable": {
        "en": "Setting changed. Reload the game.",
    },
    "p-triedToDisable": {
        "en": "Setting changed. Reload the game.",
    },

    "i-soulBerry": {
        "en": "Soul Berry",
        "ja": "ソウルシード",
        "zh-cn": "豆子"
        // FIXME: ko
    },
    "i-soulBalm": {
        "en": "Soul Balm",
        "ja": "ソウルパウダー",
        "zh-cn": "粉盒"
        // FIXME: ko
    },
    "i-halfElixir": {
        "en": "Half Elixir",
        "ja": "エリクシールハーフ",
        "zh-cn": "半红"
        // FIXME: ko
    },
    "i-fullElixir": {
        "en": "Full Elixir",
        "ja": "エリクシール",
        "zh-cn": "大红"
        // FIXME: ko
    },

    "treasure-raid-info": {
        "en": "{0}: -{1}/{2} {3},<br> -{4} AP",
        "ja": "{0}: -{1}/{2}{3}、<br> -{4}AP",
        // FIXME
    },
    "raid-info": {
        "en": "{0}:<br> -{1} AP",
        "ja": "{0}:<br> -{1}AP",
        // FIXME
    },

    "event-gacha-total": {
        "en": "Total",
        "ja": "総計",
        "zh-cn": "合计"
        // FIXME
    },
};
}());

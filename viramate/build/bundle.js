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
            "ko": "바하·루시퍼 우선하기",
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
            "zh-cn": "损坏的功能：启用触摸输入<br>" +
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
        "m-hard-tia": "name-tia",
        "m-hard-colo": "name-colo",
        "m-hard-levi": "name-levi",
        "m-hard-yugu": "name-yugu",
        "m-hard-chev": "name-chev",
        "m-hard-cel": "name-cel",

        "m-magna-raids": {
            "en": "Magna Raids",
            "ja": "マグナ",
            "zh-cn": "马格纳"
        },
        "m-magna-tia": "name-tia",
        "m-magna-colo": "name-colo",
        "m-magna-levi": "name-levi",
        "m-magna-yugu": "name-yugu",
        "m-magna-chev": "name-chev",
        "m-magna-cel": "name-cel",

        "m-hl-raids": {
            "en": "HL Raids",
            "ja": "HLマグナ",
            "zh-cn": "HL 马格纳"
        },
        "m-hl-tia": "name-tia",
        "m-hl-colo": "name-colo",
        "m-hl-levi": "name-levi",
        "m-hl-yugu": "name-yugu",
        "m-hl-chev": "name-chev",
        "m-hl-cel": "name-cel",
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

// hibino.js
(function () {
    window.hibino = {
        encodeNumber: encodeNumber,
        decodeNumber: decodeNumber,
        createUrl: createUrl
    };
    var arraySummon = [
        "none",
        "attribute",
        "character",
        "magna",
        "unknown",
        "zeus"
    ];
    var arrayType = [
        "off",
        "on0",
        "on1",
        "on2",
        "on3",
        "on6"
    ];
    var arraySkill = [
        "none",
        "kj1",
        "kj2",
        "kj3",
        "bw3",
        "mkj1",
        "mkj2",
        "mbw3",
        "bha",
        "bhah",
        "unk2",
        "unk3",
        "unk3",
        "kj4",
        "bw1",
        "bw2",
        "mbw1",
        "mbw2",
        "mkm1",
        "km1",
        "unk1",
        "ubw1",
        "ubw2",
        "ubw3",
        "ks",
    ];
    var arraySkillHTML = [
        "none",
        "kj1",
        "kj2",
        "kj3",
        "kj4",
        "bw1",
        "bw2",
        "bw3",
        "km1",
        "ks",
        "mkj1",
        "mkj2",
        "mbw1",
        "mbw2",
        "mbw3",
        "mkm1",
        "bha",
        "bhah",
        "unk1",
        "unk2",
        "unk3",
        "ubw1",
        "ubw2",
        "ubw3",
    ];
    function encodeNumber(digit, value) {
        if (value < 0)
            value = 0;
        var encodeSrting = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var encodeLength = encodeSrting.length;
        var ret = new String();
        var quotient = value;
        var surplus = 0;
        for (var i = 0; i < digit; i++) {
            surplus = quotient % encodeLength;
            quotient = quotient / encodeLength;
            ret = encodeSrting.charAt(surplus) + ret;
        }
        return ret;
    }
    ;
    function decodeNumber(digit) {
        var encodeSrting = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var encodeLength = encodeSrting.length;
        var value = 0;
        if (localUrl.length < digit)
            return 0;
        for (var i = 0; i < digit; i++) {
            value *= encodeLength;
            value += encodeSrting.indexOf(localUrl.substr(i, 1));
        }
        localUrl = localUrl.substr(digit);
        return value;
    }
    function createUrl(data) {
        var urlString = "";
        urlString += encodeNumber(2, 2000); // flag
        urlString += encodeNumber(2, 2); // Version
        urlString += encodeNumber(2, data.rank);
        urlString += encodeNumber(3, data.job_atk);
        urlString += encodeNumber(2, data.master_atk);
        urlString += encodeNumber(2, data.ship_bonus);
        urlString += encodeNumber(2, data.attribute_bonus);
        urlString += encodeNumber(2, data.hp_percent);
        for (var i = 0; i < 4; i++) {
            var summon_code = 0;
            var summon_num = 0;
            summon_code = arraySummon.indexOf(data.summon_type[i]);
            if (data.summon_percent[0] === null) {
                summon_num = 0;
            }
            else {
                summon_num = data.summon_percent[i];
            }
            urlString += encodeNumber(1, summon_code);
            urlString += encodeNumber(2, summon_num);
        }
        for (var i = 0; i < 10; i++) {
            urlString += encodeNumber(3, data.weapon_atk[i]);
            var type_num = arrayType.indexOf(data.type_bonus[i]);
            var skill_num1 = arraySkill.indexOf(data.skill_type1[i]);
            var skill_num2 = arraySkill.indexOf(data.skill_type2[i]);
            var level = data.skill_lv[i];
            urlString += encodeNumber(1, type_num);
            urlString += encodeNumber(1, skill_num1);
            urlString += encodeNumber(1, skill_num2);
            urlString += encodeNumber(1, level);
        }
        for (var i = 0; i < 5; i++)
            urlString += encodeNumber(3, data.summon_atk[i]);
        urlString += encodeNumber(2, data.buff_koujin);
        urlString += encodeNumber(2, data.buff_attribute);
        urlString += encodeNumber(2, data.buff_multiply);
        for (var i = 0; i < 10; i++)
            urlString += encodeNumber(1, data.cosmos[i] ? 1 : 0);
        return "http://hibin0.web.fc2.com/grbr_atk_calc/atk_calc.html?" + urlString;
    }
})()

    // hibino.js over

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

(function () {
    this.stampInfo = {
        1: "vii here goes ikuze",
        2: "lyria hurray hooray",
        3: "io awesome gujjobu good job",
        4: "rackam much obliged thanks yoroshikuna",
        5: "katalina reporting in", // todo
        6: "lyria come forth", // todo
        7: "jita pots potions please pls plz heals healing hirupurizu",
        8: "gran give up", // todo
        9: "gran thanks arigatou",
        10: "jita good work otsukaresama",
        11: "eugen asarutotaimudaze strike time",
        12: "rosetta lets do it chansune",
        13: "io wait up chotto", // todo
        14: "lyria sorry gomennasai",
        15: "katalina wait for backup", // todo
        16: "vii totally crushed yararechimattaze",
        17: "rackam go wild", // todo
        18: "walder ive got your back", // todo
        19: "farrah im on it yarussu",
        20: "mary gimme loot torehanchodai",
        21: "gran full arsenal ueponbasuto",
        22: "jita phalanx farankusu",
        23: "gran panacea hiruoru",
        24: "jita laser focus fokasu",
        25: "jita crack shot bureikuasashin",
        26: "gran gravity wave gurabiti",
        27: "jita pandemonium", // todo
        28: "gran bullseye run kirusutoriku",
        29: "eugen heave ho soiya",
        30: "jin heave ho soiya",
        31: "soriz yo heave ho seiya",
        32: "legend of rackam",
        33: "rackam rakamuuuu",
        34: "rackaaam rakamuuuu",
        35: "rackaaaaam rakamuuuu",
        36: "rackaaam rakamuuuu",
        37: "amazing hesuge",
        38: "there you have it toiuwakenanjyayo",
        39: "farrah im on it yarussu",
        40: "lyria drool gyun",
        41: "lyria hi ohayou",
        42: "lyria vii congrats omedetou",
        43: "katalina stare",
        44: "lyria ok hai",
        45: "siero hello there! irasshai" /* sierokarte shortened because of conflict with lyria */,
        46: "lyria let me help", // todo
        47: "sir yes sir saiesusa",
        48: "jita gotta run", // todo
        49: "rosetta teehee tehepero star kira",
        50: "rosetta !? shock",
        51: "sturm ??? confused sweating flustered",
        52: "drang ouch!", // todo
        53: "rosamia let me at em feeling madayarerudesho?" /* ok omitted because of conflict with lyria */,
        55: "vira bam bam plush",
        56: "vira it's a secret himitsu",
        57: "ferry whoa fuee huee",
        58: "pommern nightmare",
        60: "lyria gong jyan jan",
        63: "ferry sigh desuyoda",
        70: "sutera hey! stop it! kunanno",
        71: "lyria vii viicakes warabimochi",
        72: "lyria vii go",
        77: "siero about that", // todo
        78: "vii nice he",
        79: "vii zzz sleep",
        80: "rosetta for you kiss chuu",
        81: "drang aww... deredere",
        82: "sturm ...",
        83: "lyria chomp musha",
        84: "mary boom bun",
        85: "achoo hekushu", // todo
        86: "tada", // todo
        87: "stan whoops daradara", // todo
        88: "vii", // todo
        89: "vii alec oh no... gatagatagatagata",
        90: "rackam wobble fura",
        91: "katalina bop bogo",
        92: "lyria vii drip drop zaaaa",
        93: "sen nya meow",
        94: "jita kira star wink",
        96: "gran nailed it yatta",
        97: "katalina please tanomu",
        98: "lyria peace",
        99: "lyria yummy jyururia",
        100: "rackam uh bye", // todo
        101: "io be quiet urusaibakaa",
        102: "siero stare",
        103: "siero pffft puu",
        104: "rowain aw yeah", // todo
        105: "vira wiggle ufufuniginigi",
        106: "jin command me", // todo
        107: "sturm drang poke punipunipunipunipuni",
        108: "yuel whats up gacha",
        109: "yuel nope batan",
        110: "vii heyo zu",
        111: "charlotta box nooooo waaaaaaaaaa",
        112: "metera bad slap bakapan",
        113: "sutera fail", // todo
        // todo 114
        115: "katalina ten", // todo
        116: "seruel no can do", // todo
        117: "danua",
        118: "zeta wha-wha-what haa",
        119: "vaseraga ive said too much", // todo
        120: "eustace mission accomplished", // todo
        121: "beatrix why me kusookusoo",
        122: "bea thump kneel bow dogeza ban",
    };

    this.kanaToRomajiTable = {
        あ: 'a',
        い: 'i',
        う: 'u',
        え: 'e',
        お: 'o',
        ゔぁ: 'va',
        ゔぃ: 'vi',
        ゔ: 'vu',
        ゔぇ: 've',
        ゔぉ: 'vo',
        か: 'ka',
        き: 'ki',
        きゃ: 'kya',
        きぃ: 'kyi',
        きゅ: 'kyu',
        く: 'ku',
        け: 'ke',
        こ: 'ko',
        が: 'ga',
        ぎ: 'gi',
        ぐ: 'gu',
        げ: 'ge',
        ご: 'go',
        ぎゃ: 'gya',
        ぎぃ: 'gyi',
        ぎゅ: 'gyu',
        ぎぇ: 'gye',
        ぎょ: 'gyo',
        さ: 'sa',
        す: 'su',
        せ: 'se',
        そ: 'so',
        ざ: 'za',
        ず: 'zu',
        ぜ: 'ze',
        ぞ: 'zo',
        し: 'shi',
        しゃ: 'sha',
        しゅ: 'shu',
        しょ: 'sho',
        じ: 'ji',
        じゃ: 'ja',
        じゅ: 'ju',
        じょ: 'jo',
        た: 'ta',
        ち: 'chi',
        ちゃ: 'cha',
        ちゅ: 'chu',
        ちょ: 'cho',
        つ: 'tsu',
        て: 'te',
        と: 'to',
        だ: 'da',
        ぢ: 'di',
        づ: 'du',
        で: 'de',
        ど: 'do',
        な: 'na',
        に: 'ni',
        にゃ: 'nya',
        にゅ: 'nyu',
        にょ: 'nyo',
        ぬ: 'nu',
        ね: 'ne',
        の: 'no',
        は: 'ha',
        ひ: 'hi',
        ふ: 'fu',
        へ: 'he',
        ほ: 'ho',
        ひゃ: 'hya',
        ひゅ: 'hyu',
        ひょ: 'hyo',
        ふぁ: 'fa',
        ふぃ: 'fi',
        ふぇ: 'fe',
        ふぉ: 'fo',
        ば: 'ba',
        び: 'bi',
        ぶ: 'bu',
        べ: 'be',
        ぼ: 'bo',
        びゃ: 'bya',
        びゅ: 'byu',
        びょ: 'byo',
        ぱ: 'pa',
        ぴ: 'pi',
        ぷ: 'pu',
        ぺ: 'pe',
        ぽ: 'po',
        ぴゃ: 'pya',
        ぴゅ: 'pyu',
        ぴょ: 'pyo',
        ま: 'ma',
        み: 'mi',
        む: 'mu',
        め: 'me',
        も: 'mo',
        みゃ: 'mya',
        みゅ: 'myu',
        みょ: 'myo',
        や: 'ya',
        ゆ: 'yu',
        よ: 'yo',
        ら: 'ra',
        り: 'ri',
        る: 'ru',
        れ: 're',
        ろ: 'ro',
        りゃ: 'rya',
        りゅ: 'ryu',
        りょ: 'ryo',
        わ: 'wa',
        を: 'wo',
        ん: 'n',
        ゐ: 'wi',
        ゑ: 'we',
        きぇ: 'kye',
        きょ: 'kyo',
        じぃ: 'jyi',
        じぇ: 'jye',
        ちぃ: 'cyi',
        ちぇ: 'che',
        ひぃ: 'hyi',
        ひぇ: 'hye',
        びぃ: 'byi',
        びぇ: 'bye',
        ぴぃ: 'pyi',
        ぴぇ: 'pye',
        みぇ: 'mye',
        みぃ: 'myi',
        りぃ: 'ryi',
        りぇ: 'rye',
        にぃ: 'nyi',
        にぇ: 'nye',
        しぃ: 'syi',
        しぇ: 'she',
        いぇ: 'ye',
        うぁ: 'wha',
        うぉ: 'who',
        うぃ: 'wi',
        うぇ: 'we',
        ゔゃ: 'vya',
        ゔゅ: 'vyu',
        ゔょ: 'vyo',
        すぁ: 'swa',
        すぃ: 'swi',
        すぅ: 'swu',
        すぇ: 'swe',
        すぉ: 'swo',
        くゃ: 'qya',
        くゅ: 'qyu',
        くょ: 'qyo',
        くぁ: 'qwa',
        くぃ: 'qwi',
        くぅ: 'qwu',
        くぇ: 'qwe',
        くぉ: 'qwo',
        ぐぁ: 'gwa',
        ぐぃ: 'gwi',
        ぐぅ: 'gwu',
        ぐぇ: 'gwe',
        ぐぉ: 'gwo',
        つぁ: 'tsa',
        つぃ: 'tsi',
        つぇ: 'tse',
        つぉ: 'tso',
        てゃ: 'tha',
        てぃ: 'thi',
        てゅ: 'thu',
        てぇ: 'the',
        てょ: 'tho',
        とぁ: 'twa',
        とぃ: 'twi',
        とぅ: 'twu',
        とぇ: 'twe',
        とぉ: 'two',
        ぢゃ: 'dya',
        ぢぃ: 'dyi',
        ぢゅ: 'dyu',
        ぢぇ: 'dye',
        ぢょ: 'dyo',
        でゃ: 'dha',
        でぃ: 'dhi',
        でゅ: 'dhu',
        でぇ: 'dhe',
        でょ: 'dho',
        どぁ: 'dwa',
        どぃ: 'dwi',
        どぅ: 'dwu',
        どぇ: 'dwe',
        どぉ: 'dwo',
        ふぅ: 'fwu',
        ふゃ: 'fya',
        ふゅ: 'fyu',
        ふょ: 'fyo',
        ぁ: 'a',
        ぃ: 'i',
        ぇ: 'e',
        ぅ: 'u',
        ぉ: 'o',
        ゃ: 'ya',
        ゅ: 'yu',
        ょ: 'yo',
        っ: '',
        ゕ: 'ka',
        ゖ: 'ka',
        ゎ: 'wa',
        '　': ' ',
        んあ: 'n\'a',
        んい: 'n\'i',
        んう: 'n\'u',
        んえ: 'n\'e',
        んお: 'n\'o',
        んや: 'n\'ya',
        んゆ: 'n\'yu',
        んよ: 'n\'yo',
    };

}());

/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as
 * defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 * HMAC implementation as defined in FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2016
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnston
 */

/*jslint
	bitwise: true, multivar: true, for: true, this: true, sub: true, esversion: 3
*/

/**
 * SUPPORTED_ALGS is the stub for a compile flag that will cause pruning of
 * functions that are not needed when a limited number of SHA families are
 * selected
 *
 * @define {number} ORed value of SHA variants to be supported
 *   1 = SHA-1, 2 = SHA-224/SHA-256, 4 = SHA-384/SHA-512, 8 = SHA3
 */

var _loadShaScript = function (global) {
    "use strict";

    var SUPPORTED_ALGS = 8 | 4 | 2 | 1;

    /* Globals */
    var TWO_PWR_32 = (1 << 16) * (1 << 16);

	/**
	 * Int_64 is a object for 2 32-bit numbers emulating a 64-bit number
	 *
	 * @private
	 * @constructor
	 * @this {Int_64}
	 * @param {number} msint_32 The most significant 32-bits of a 64-bit number
	 * @param {number} lsint_32 The least significant 32-bits of a 64-bit number
	 */
    function Int_64(msint_32, lsint_32) {
        this.highOrder = msint_32;
        this.lowOrder = lsint_32;
    }

	/**
	 * Convert a string to an array of big-endian words
	 *
	 * There is a known bug with an odd number of existing bytes and using a
	 * UTF-16 encoding.  However, this function is used such that the existing
	 * bytes are always a result of a previous UTF-16 str2binb call and
	 * therefore there should never be an odd number of existing bytes
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {string} utfType The Unicode type, UTF8 or UTF16BE, UTF16LE, to
	 *   use to encode the source string
	 * @param {Array<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
    function str2binb(str, utfType, existingBin, existingBinLen) {
        var bin = [], codePnt, binArr = [], byteCnt = 0, i, j, existingByteLen,
            intOffset, byteOffset;

        bin = existingBin || [0];
        existingBinLen = existingBinLen || 0;
        existingByteLen = existingBinLen >>> 3;

        if ("UTF8" === utfType) {
            for (i = 0; i < str.length; i += 1) {
                codePnt = str.charCodeAt(i);
                binArr = [];

                if (0x80 > codePnt) {
                    binArr.push(codePnt);
                }
                else if (0x800 > codePnt) {
                    binArr.push(0xC0 | (codePnt >>> 6));
                    binArr.push(0x80 | (codePnt & 0x3F));
                }
                else if ((0xd800 > codePnt) || (0xe000 <= codePnt)) {
                    binArr.push(
                        0xe0 | (codePnt >>> 12),
                        0x80 | ((codePnt >>> 6) & 0x3f),
                        0x80 | (codePnt & 0x3f)
                    );
                }
                else {
                    i += 1;
                    codePnt = 0x10000 + (((codePnt & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
                    binArr.push(
                        0xf0 | (codePnt >>> 18),
                        0x80 | ((codePnt >>> 12) & 0x3f),
                        0x80 | ((codePnt >>> 6) & 0x3f),
                        0x80 | (codePnt & 0x3f)
                    );
                }

                for (j = 0; j < binArr.length; j += 1) {
                    byteOffset = byteCnt + existingByteLen;
                    intOffset = byteOffset >>> 2;
                    while (bin.length <= intOffset) {
                        bin.push(0);
                    }
                    /* Known bug kicks in here */
                    bin[intOffset] |= binArr[j] << (8 * (3 - (byteOffset % 4)));
                    byteCnt += 1;
                }
            }
        }
        else if (("UTF16BE" === utfType) || "UTF16LE" === utfType) {
            for (i = 0; i < str.length; i += 1) {
                codePnt = str.charCodeAt(i);
                /* Internally strings are UTF-16BE so only change if UTF-16LE */
                if ("UTF16LE" === utfType) {
                    j = codePnt & 0xFF;
                    codePnt = (j << 8) | (codePnt >>> 8);
                }

                byteOffset = byteCnt + existingByteLen;
                intOffset = byteOffset >>> 2;
                while (bin.length <= intOffset) {
                    bin.push(0);
                }
                bin[intOffset] |= codePnt << (8 * (2 - (byteOffset % 4)));
                byteCnt += 2;
            }
        }
        return { "value": bin, "binLen": byteCnt * 8 + existingBinLen };
    }

	/**
	 * Convert a hex string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {Array<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
    function hex2binb(str, existingBin, existingBinLen) {
        var bin, length = str.length, i, num, intOffset, byteOffset,
            existingByteLen;

        bin = existingBin || [0];
        existingBinLen = existingBinLen || 0;
        existingByteLen = existingBinLen >>> 3;

        if (0 !== (length % 2)) {
            throw new Error("String of HEX type must be in byte increments");
        }

        for (i = 0; i < length; i += 2) {
            num = parseInt(str.substr(i, 2), 16);
            if (!isNaN(num)) {
                byteOffset = (i >>> 1) + existingByteLen;
                intOffset = byteOffset >>> 2;
                while (bin.length <= intOffset) {
                    bin.push(0);
                }
                bin[intOffset] |= num << 8 * (3 - (byteOffset % 4));
            }
            else {
                throw new Error("String of HEX type contains invalid characters");
            }
        }

        return { "value": bin, "binLen": length * 4 + existingBinLen };
    }

	/**
	 * Convert a string of raw bytes to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String of raw bytes to be converted to binary representation
	 * @param {Array<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
    function bytes2binb(str, existingBin, existingBinLen) {
        var bin = [], codePnt, i, existingByteLen, intOffset,
            byteOffset;

        bin = existingBin || [0];
        existingBinLen = existingBinLen || 0;
        existingByteLen = existingBinLen >>> 3;

        for (i = 0; i < str.length; i += 1) {
            codePnt = str.charCodeAt(i);

            byteOffset = i + existingByteLen;
            intOffset = byteOffset >>> 2;
            if (bin.length <= intOffset) {
                bin.push(0);
            }
            bin[intOffset] |= codePnt << 8 * (3 - (byteOffset % 4));
        }

        return { "value": bin, "binLen": str.length * 8 + existingBinLen };
    }

	/**
	 * Convert a base-64 string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {Array<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
    function b642binb(str, existingBin, existingBinLen) {
        var bin = [], byteCnt = 0, index, i, j, tmpInt, strPart, firstEqual,
            b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            existingByteLen, intOffset, byteOffset;

        bin = existingBin || [0];
        existingBinLen = existingBinLen || 0;
        existingByteLen = existingBinLen >>> 3;

        if (-1 === str.search(/^[a-zA-Z0-9=+\/]+$/)) {
            throw new Error("Invalid character in base-64 string");
        }
        firstEqual = str.indexOf("=");
        str = str.replace(/\=/g, "");
        if ((-1 !== firstEqual) && (firstEqual < str.length)) {
            throw new Error("Invalid '=' found in base-64 string");
        }

        for (i = 0; i < str.length; i += 4) {
            strPart = str.substr(i, 4);
            tmpInt = 0;

            for (j = 0; j < strPart.length; j += 1) {
                index = b64Tab.indexOf(strPart[j]);
                tmpInt |= index << (18 - (6 * j));
            }

            for (j = 0; j < strPart.length - 1; j += 1) {
                byteOffset = byteCnt + existingByteLen;
                intOffset = byteOffset >>> 2;
                while (bin.length <= intOffset) {
                    bin.push(0);
                }
                bin[intOffset] |= ((tmpInt >>> (16 - (j * 8))) & 0xFF) <<
                    8 * (3 - (byteOffset % 4));
                byteCnt += 1;
            }
        }

        return { "value": bin, "binLen": byteCnt * 8 + existingBinLen };
    }

	/**
	 * Convert an ArrayBuffer to an array of big-endian words
	 *
	 * @private
	 * @param {ArrayBuffer} arr ArrayBuffer to be converted to binary
	 *   representation
	 * @param {Array<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
    function arraybuffer2binb(arr, existingBin, existingBinLen) {
        var bin = [], i, existingByteLen, intOffset, byteOffset;

        bin = existingBin || [0];
        existingBinLen = existingBinLen || 0;
        existingByteLen = existingBinLen >>> 3;

        for (i = 0; i < arr.byteLength; i += 1) {
            byteOffset = i + existingByteLen;
            intOffset = byteOffset >>> 2;
            if (bin.length <= intOffset) {
                bin.push(0);
            }
            bin[intOffset] |= arr[i] << 8 * (3 - (byteOffset % 4));
        }

        return { "value": bin, "binLen": arr.byteLength * 8 + existingBinLen };
    }

	/**
	 * Convert an array of big-endian words to a hex string.
	 *
	 * @private
	 * @param {Array<number>} binarray Array of integers to be converted to
	 *   hexidecimal representation
	 * @param {number} outputLength Length of output in bits
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Hexidecimal representation of the parameter in string
	 *   form
	 */
    function binb2hex(binarray, outputLength, formatOpts) {
        var hex_tab = "0123456789abcdef", str = "",
            length = outputLength / 8, i, srcByte;

        for (i = 0; i < length; i += 1) {
            /* The below is more than a byte but it gets taken care of later */
            srcByte = binarray[i >>> 2] >>> ((3 - (i % 4)) * 8);
            str += hex_tab.charAt((srcByte >>> 4) & 0xF) +
                hex_tab.charAt(srcByte & 0xF);
        }

        return (formatOpts["outputUpper"]) ? str.toUpperCase() : str;
    }

	/**
	 * Convert an array of big-endian words to a base-64 string
	 *
	 * @private
	 * @param {Array<number>} binarray Array of integers to be converted to
	 *   base-64 representation
	 * @param {number} outputLength Length of output in bits
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Base-64 encoded representation of the parameter in
	 *   string form
	 */
    function binb2b64(binarray, outputLength, formatOpts) {
        var str = "", length = outputLength / 8, i, j, triplet, int1, int2,
            b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        for (i = 0; i < length; i += 3) {
            int1 = ((i + 1) < length) ? binarray[(i + 1) >>> 2] : 0;
            int2 = ((i + 2) < length) ? binarray[(i + 2) >>> 2] : 0;
            triplet = (((binarray[i >>> 2] >>> 8 * (3 - i % 4)) & 0xFF) << 16) |
                (((int1 >>> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) |
                ((int2 >>> 8 * (3 - (i + 2) % 4)) & 0xFF);
            for (j = 0; j < 4; j += 1) {
                if (i * 8 + j * 6 <= outputLength) {
                    str += b64Tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
                else {
                    str += formatOpts["b64Pad"];
                }
            }
        }
        return str;
    }

	/**
	 * Convert an array of big-endian words to raw bytes string
	 *
	 * @private
	 * @param {Array<number>} binarray Array of integers to be converted to
	 *   a raw bytes string representation
	 * @param {number} outputLength Length of output in bits
	 * @return {string} Raw bytes representation of the parameter in string
	 *   form
	 */
    function binb2bytes(binarray, outputLength) {
        var str = "", length = outputLength / 8, i, srcByte;

        for (i = 0; i < length; i += 1) {
            srcByte = (binarray[i >>> 2] >>> ((3 - (i % 4)) * 8)) & 0xFF;
            str += String.fromCharCode(srcByte);
        }

        return str;
    }

	/**
	 * Convert an array of big-endian words to an ArrayBuffer
	 *
	 * @private
	 * @param {Array<number>} binarray Array of integers to be converted to
	 *   an ArrayBuffer
	 * @param {number} outputLength Length of output in bits
	 * @return {ArrayBuffer} Raw bytes representation of the parameter in an
	 *   ArrayBuffer
	 */
    function binb2arraybuffer(binarray, outputLength) {
        var length = outputLength / 8, i, retVal = new ArrayBuffer(length);

        for (i = 0; i < length; i += 1) {
            retVal[i] = (binarray[i >>> 2] >>> ((3 - (i % 4)) * 8)) & 0xFF;
        }

        return retVal;
    }

	/**
	 * Validate hash list containing output formatting options, ensuring
	 * presence of every option or adding the default value
	 *
	 * @private
	 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined),
	 *   shakeLen : (number|undefined)}=} options Hash list of output formatting options
	 * @return {{outputUpper : boolean, b64Pad : string, shakeLen : number}} Validated
	 *   hash list containing output formatting options
	 */
    function getOutputOpts(options) {
        var retVal = { "outputUpper": false, "b64Pad": "=", "shakeLen": -1 },
            outputOptions;
        outputOptions = options || {};

        retVal["outputUpper"] = outputOptions["outputUpper"] || false;

        if (true === outputOptions.hasOwnProperty("b64Pad")) {
            retVal["b64Pad"] = outputOptions["b64Pad"];
        }

        if ((true === outputOptions.hasOwnProperty("shakeLen")) && ((8 & SUPPORTED_ALGS) !== 0)) {
            if (outputOptions["shakeLen"] % 8 !== 0) {
                throw new Error("shakeLen must be a multiple of 8");
            }
            retVal["shakeLen"] = outputOptions["shakeLen"];
        }

        if ("boolean" !== typeof (retVal["outputUpper"])) {
            throw new Error("Invalid outputUpper formatting option");
        }

        if ("string" !== typeof (retVal["b64Pad"])) {
            throw new Error("Invalid b64Pad formatting option");
        }

        return retVal;
    }

	/**
	 * Function that takes an input format and UTF encoding and returns the
	 * appropriate function used to convert the input.
	 *
	 * @private
	 * @param {string} format The format of the string to be converted
	 * @param {string} utfType The string encoding to use (UTF8, UTF16BE,
	 *	UTF16LE)
	 * @return {function(string, Array<number>=, number=): {value :
	 *   Array<number>, binLen : number}} Function that will convert an input
	 *   string to a packed int array
	 */
    function getStrConverter(format, utfType) {
        var retVal;

        /* Validate encoding */
        switch (utfType) {
            case "UTF8":
            /* Fallthrough */
            case "UTF16BE":
            /* Fallthrough */
            case "UTF16LE":
                /* Fallthrough */
                break;
            default:
                throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
        }

        /* Map inputFormat to the appropriate converter */
        switch (format) {
            case "HEX":
                retVal = hex2binb;
                break;
            case "TEXT":
                retVal = function (str, existingBin, existingBinLen) {
                    return str2binb(str, utfType, existingBin, existingBinLen);
                };
                break;
            case "B64":
                retVal = b642binb;
                break;
            case "BYTES":
                retVal = bytes2binb;
                break;
            case "ARRAYBUFFER":
                try {
                    retVal = new ArrayBuffer(0);
                } catch (ignore) {
                    throw new Error("ARRAYBUFFER not supported by this environment");
                }
                retVal = arraybuffer2binb;
                break;
            default:
                throw new Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
        }

        return retVal;
    }

	/**
	 * The 32-bit implementation of circular rotate left
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
    function rotl_32(x, n) {
        return (x << n) | (x >>> (32 - n));
    }

    function rotl_64(x, n) {
        if (n > 32) {
            n = n - 32;
            return new Int_64(
                x.lowOrder << n | x.highOrder >>> (32 - n),
                x.highOrder << n | x.lowOrder >>> (32 - n)
            );
        }
        else if (0 !== n) {
            return new Int_64(
                x.highOrder << n | x.lowOrder >>> (32 - n),
                x.lowOrder << n | x.highOrder >>> (32 - n)
            );
        }
        else {
            return x;
        }
    }

	/**
	 * The 32-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
    function rotr_32(x, n) {
        return (x >>> n) | (x << (32 - n));
    }

	/**
	 * The 64-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted circularly by n bits
	 */
    function rotr_64(x, n) {
        var retVal = null, tmp = new Int_64(x.highOrder, x.lowOrder);

        if (32 >= n) {
            retVal = new Int_64(
                (tmp.highOrder >>> n) | ((tmp.lowOrder << (32 - n)) & 0xFFFFFFFF),
                (tmp.lowOrder >>> n) | ((tmp.highOrder << (32 - n)) & 0xFFFFFFFF)
            );
        }
        else {
            retVal = new Int_64(
                (tmp.lowOrder >>> (n - 32)) | ((tmp.highOrder << (64 - n)) & 0xFFFFFFFF),
                (tmp.highOrder >>> (n - 32)) | ((tmp.lowOrder << (64 - n)) & 0xFFFFFFFF)
            );
        }

        return retVal;
    }

	/**
	 * The 32-bit implementation of shift right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted by n bits
	 */
    function shr_32(x, n) {
        return x >>> n;
    }

	/**
	 * The 64-bit implementation of shift right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted by n bits
	 */
    function shr_64(x, n) {
        var retVal = null;

        if (32 >= n) {
            retVal = new Int_64(
                x.highOrder >>> n,
                x.lowOrder >>> n | ((x.highOrder << (32 - n)) & 0xFFFFFFFF)
            );
        }
        else {
            retVal = new Int_64(
                0,
                x.highOrder >>> (n - 32)
            );
        }

        return retVal;
    }

	/**
	 * The 32-bit implementation of the NIST specified Parity function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
    function parity_32(x, y, z) {
        return x ^ y ^ z;
    }

	/**
	 * The 32-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
    function ch_32(x, y, z) {
        return (x & y) ^ (~x & z);
    }

	/**
	 * The 64-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
    function ch_64(x, y, z) {
        return new Int_64(
            (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
        );
    }

	/**
	 * The 32-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
    function maj_32(x, y, z) {
        return (x & y) ^ (x & z) ^ (y & z);
    }

	/**
	 * The 64-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
    function maj_64(x, y, z) {
        return new Int_64(
            (x.highOrder & y.highOrder) ^
            (x.highOrder & z.highOrder) ^
            (y.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^
            (x.lowOrder & z.lowOrder) ^
            (y.lowOrder & z.lowOrder)
        );
    }

	/**
	 * The 32-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
    function sigma0_32(x) {
        return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22);
    }

	/**
	 * The 64-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
    function sigma0_64(x) {
        var rotr28 = rotr_64(x, 28), rotr34 = rotr_64(x, 34),
            rotr39 = rotr_64(x, 39);

        return new Int_64(
            rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
            rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder);
    }

	/**
	 * The 32-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
    function sigma1_32(x) {
        return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25);
    }

	/**
	 * The 64-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
    function sigma1_64(x) {
        var rotr14 = rotr_64(x, 14), rotr18 = rotr_64(x, 18),
            rotr41 = rotr_64(x, 41);

        return new Int_64(
            rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
            rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder);
    }

	/**
	 * The 32-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
    function gamma0_32(x) {
        return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3);
    }

	/**
	 * The 64-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
    function gamma0_64(x) {
        var rotr1 = rotr_64(x, 1), rotr8 = rotr_64(x, 8), shr7 = shr_64(x, 7);

        return new Int_64(
            rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
            rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
        );
    }

	/**
	 * The 32-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
    function gamma1_32(x) {
        return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10);
    }

	/**
	 * The 64-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
    function gamma1_64(x) {
        var rotr19 = rotr_64(x, 19), rotr61 = rotr_64(x, 61),
            shr6 = shr_64(x, 6);

        return new Int_64(
            rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
            rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
        );
    }

	/**
	 * Add two 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @return {number} The sum of a + b
	 */
    function safeAdd_32_2(a, b) {
        var lsw = (a & 0xFFFF) + (b & 0xFFFF),
            msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16);

        return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
    }

	/**
	 * Add four 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d
	 */
    function safeAdd_32_4(a, b, c, d) {
        var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF),
            msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
                (lsw >>> 16);

        return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
    }

	/**
	 * Add five 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @param {number} e The fifth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d + e
	 */
    function safeAdd_32_5(a, b, c, d, e) {
        var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) +
            (e & 0xFFFF),
            msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
                (e >>> 16) + (lsw >>> 16);

        return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
    }

	/**
	 * Add two 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument to be added
	 * @param {Int_64} y The second 64-bit integer argument to be added
	 * @return {Int_64} The sum of x + y
	 */
    function safeAdd_64_2(x, y) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
        msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new Int_64(highOrder, lowOrder);
    }

	/**
	 * Add four 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d
	 */
    function safeAdd_64_4(a, b, c, d) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
            (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
            (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
            (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
            (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new Int_64(highOrder, lowOrder);
    }

	/**
	 * Add five 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @param {Int_64} e The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d + e
	 */
    function safeAdd_64_5(a, b, c, d, e) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
            (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) +
            (e.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
            (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) +
            (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
            (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) +
            (e.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
            (c.highOrder >>> 16) + (d.highOrder >>> 16) +
            (e.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new Int_64(highOrder, lowOrder);
    }

	/**
	 * XORs all of the given arguments
	 *
	 * @private
	 * @param {...Int_64} var_args The arguments to be XORed
	 * @return {Int_64} The XOR of the arguments
	 */
    function xor_64(var_args) {
        /* Use the `arguments` object here, not `var_args` */
        var lowXor = 0, highXor = 0, i;

        for (i = 0; i < arguments.length; i += 1) {
            lowXor ^= arguments[i].lowOrder;
            highXor ^= arguments[i].highOrder;
        }
        return new Int_64(highXor, lowXor);
    }

	/**
	 * Returns a clone of the given SHA3 state
	 *
	 * @private
	 * @param {Array<Array<Int_64>>} state The state to be cloned
	 * @return {Array<Array<Int_64>>} The cloned state
	 */
    function cloneSHA3State(state) {
        var clone = [], i;
        for (i = 0; i < 5; i += 1) {
            clone[i] = state[i].slice();
        }

        return clone;
    }

	/**
	 * Gets the state values for the specified SHA variant
	 *
	 * @param {string} variant The SHA variant
	 * @return {Array<number|Int_64|Array<null>>} The initial state values
	 */
    function getNewState(variant) {
        var retVal = [], H_trunc, H_full, i;

        if (("SHA-1" === variant) && ((1 & SUPPORTED_ALGS) !== 0)) {
            retVal = [
                0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0
            ];
        }
        else if ((variant.lastIndexOf("SHA-", 0) === 0) && ((6 & SUPPORTED_ALGS) !== 0)) {
            H_trunc = [
                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
            ];
            H_full = [
                0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
                0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
            ];

            switch (variant) {
                case "SHA-224":
                    retVal = H_trunc;
                    break;
                case "SHA-256":
                    retVal = H_full;
                    break;
                case "SHA-384":
                    retVal = [
                        new Int_64(0xcbbb9d5d, H_trunc[0]),
                        new Int_64(0x0629a292a, H_trunc[1]),
                        new Int_64(0x9159015a, H_trunc[2]),
                        new Int_64(0x0152fecd8, H_trunc[3]),
                        new Int_64(0x67332667, H_trunc[4]),
                        new Int_64(0x98eb44a87, H_trunc[5]),
                        new Int_64(0xdb0c2e0d, H_trunc[6]),
                        new Int_64(0x047b5481d, H_trunc[7])
                    ];
                    break;
                case "SHA-512":
                    retVal = [
                        new Int_64(H_full[0], 0xf3bcc908),
                        new Int_64(H_full[1], 0x84caa73b),
                        new Int_64(H_full[2], 0xfe94f82b),
                        new Int_64(H_full[3], 0x5f1d36f1),
                        new Int_64(H_full[4], 0xade682d1),
                        new Int_64(H_full[5], 0x2b3e6c1f),
                        new Int_64(H_full[6], 0xfb41bd6b),
                        new Int_64(H_full[7], 0x137e2179)
                    ];
                    break;
                default:
                    throw new Error("Unknown SHA variant");
            }
        }
        else if (((variant.lastIndexOf("SHA3-", 0) === 0) || (variant.lastIndexOf("SHAKE", 0) === 0)) &&
            ((8 & SUPPORTED_ALGS) !== 0)) {
            for (i = 0; i < 5; i += 1) {
                retVal[i] = [new Int_64(0, 0), new Int_64(0, 0), new Int_64(0, 0), new Int_64(0, 0), new Int_64(0, 0)];
            }
        }
        else {
            throw new Error("No SHA variants supported");
        }

        return retVal;
    }

	/**
	 * Performs a round of SHA-1 hashing over a 512-byte block
	 *
	 * @private
	 * @param {Array<number>} block The binary array representation of the
	 *   block to hash
	 * @param {Array<number>} H The intermediate H values from a previous
	 *   round
	 * @return {Array<number>} The resulting H values
	 */
    function roundSHA1(block, H) {
        var W = [], a, b, c, d, e, T, ch = ch_32, parity = parity_32,
            maj = maj_32, rotl = rotl_32, safeAdd_2 = safeAdd_32_2, t,
            safeAdd_5 = safeAdd_32_5;

        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];

        for (t = 0; t < 80; t += 1) {
            if (t < 16) {
                W[t] = block[t];
            }
            else {
                W[t] = rotl(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
            }

            if (t < 20) {
                T = safeAdd_5(rotl(a, 5), ch(b, c, d), e, 0x5a827999, W[t]);
            }
            else if (t < 40) {
                T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0x6ed9eba1, W[t]);
            }
            else if (t < 60) {
                T = safeAdd_5(rotl(a, 5), maj(b, c, d), e, 0x8f1bbcdc, W[t]);
            } else {
                T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0xca62c1d6, W[t]);
            }

            e = d;
            d = c;
            c = rotl(b, 30);
            b = a;
            a = T;
        }

        H[0] = safeAdd_2(a, H[0]);
        H[1] = safeAdd_2(b, H[1]);
        H[2] = safeAdd_2(c, H[2]);
        H[3] = safeAdd_2(d, H[3]);
        H[4] = safeAdd_2(e, H[4]);

        return H;
    }

	/**
	 * Finalizes the SHA-1 hash
	 *
	 * @private
	 * @param {Array<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array<number>} H The intermediate H values from a previous
	 *   round
	 * @param {number} outputLen Unused for this variant
	 * @return {Array<number>} The array of integers representing the SHA-1
	 *   hash of message
	 */
    function finalizeSHA1(remainder, remainderBinLen, processedBinLen, H, outputLen) {
        var i, appendedMessageLength, offset, totalLen;

		/* The 65 addition is a hack but it works.  The correct number is
		   actually 72 (64 + 8) but the below math fails if
		   remainderBinLen + 72 % 512 = 0. Since remainderBinLen % 8 = 0,
		   "shorting" the addition is OK. */
        offset = (((remainderBinLen + 65) >>> 9) << 4) + 15;
        while (remainder.length <= offset) {
            remainder.push(0);
        }
        /* Append '1' at the end of the binary string */
        remainder[remainderBinLen >>> 5] |= 0x80 << (24 - (remainderBinLen % 32));
		/* Append length of binary string in the position such that the new
		 * length is a multiple of 512.  Logic does not work for even multiples
		 * of 512 but there can never be even multiples of 512. JavaScript
		 * numbers are limited to 2^53 so it's "safe" to treat the totalLen as
		 * a 64-bit integer. */
        totalLen = remainderBinLen + processedBinLen;
        remainder[offset] = totalLen & 0xFFFFFFFF;
		/* Bitwise operators treat the operand as a 32-bit number so need to
		 * use hacky division and round to get access to upper 32-ish bits */
        remainder[offset - 1] = (totalLen / TWO_PWR_32) | 0;

        appendedMessageLength = remainder.length;

        /* This will always be at least 1 full chunk */
        for (i = 0; i < appendedMessageLength; i += 16) {
            H = roundSHA1(remainder.slice(i, i + 16), H);
        }

        return H;
    }

    /* Put this here so the K arrays aren't put on the stack for every block */
    var K_sha2, K_sha512, r_sha3, rc_sha3;
    if ((6 & SUPPORTED_ALGS) !== 0) {
        K_sha2 = [
            0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
            0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
            0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
            0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
            0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
            0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
            0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
            0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
            0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
            0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
            0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
        ];

        if ((4 & SUPPORTED_ALGS) !== 0) {
            K_sha512 = [
                new Int_64(K_sha2[0], 0xd728ae22), new Int_64(K_sha2[1], 0x23ef65cd),
                new Int_64(K_sha2[2], 0xec4d3b2f), new Int_64(K_sha2[3], 0x8189dbbc),
                new Int_64(K_sha2[4], 0xf348b538), new Int_64(K_sha2[5], 0xb605d019),
                new Int_64(K_sha2[6], 0xaf194f9b), new Int_64(K_sha2[7], 0xda6d8118),
                new Int_64(K_sha2[8], 0xa3030242), new Int_64(K_sha2[9], 0x45706fbe),
                new Int_64(K_sha2[10], 0x4ee4b28c), new Int_64(K_sha2[11], 0xd5ffb4e2),
                new Int_64(K_sha2[12], 0xf27b896f), new Int_64(K_sha2[13], 0x3b1696b1),
                new Int_64(K_sha2[14], 0x25c71235), new Int_64(K_sha2[15], 0xcf692694),
                new Int_64(K_sha2[16], 0x9ef14ad2), new Int_64(K_sha2[17], 0x384f25e3),
                new Int_64(K_sha2[18], 0x8b8cd5b5), new Int_64(K_sha2[19], 0x77ac9c65),
                new Int_64(K_sha2[20], 0x592b0275), new Int_64(K_sha2[21], 0x6ea6e483),
                new Int_64(K_sha2[22], 0xbd41fbd4), new Int_64(K_sha2[23], 0x831153b5),
                new Int_64(K_sha2[24], 0xee66dfab), new Int_64(K_sha2[25], 0x2db43210),
                new Int_64(K_sha2[26], 0x98fb213f), new Int_64(K_sha2[27], 0xbeef0ee4),
                new Int_64(K_sha2[28], 0x3da88fc2), new Int_64(K_sha2[29], 0x930aa725),
                new Int_64(K_sha2[30], 0xe003826f), new Int_64(K_sha2[31], 0x0a0e6e70),
                new Int_64(K_sha2[32], 0x46d22ffc), new Int_64(K_sha2[33], 0x5c26c926),
                new Int_64(K_sha2[34], 0x5ac42aed), new Int_64(K_sha2[35], 0x9d95b3df),
                new Int_64(K_sha2[36], 0x8baf63de), new Int_64(K_sha2[37], 0x3c77b2a8),
                new Int_64(K_sha2[38], 0x47edaee6), new Int_64(K_sha2[39], 0x1482353b),
                new Int_64(K_sha2[40], 0x4cf10364), new Int_64(K_sha2[41], 0xbc423001),
                new Int_64(K_sha2[42], 0xd0f89791), new Int_64(K_sha2[43], 0x0654be30),
                new Int_64(K_sha2[44], 0xd6ef5218), new Int_64(K_sha2[45], 0x5565a910),
                new Int_64(K_sha2[46], 0x5771202a), new Int_64(K_sha2[47], 0x32bbd1b8),
                new Int_64(K_sha2[48], 0xb8d2d0c8), new Int_64(K_sha2[49], 0x5141ab53),
                new Int_64(K_sha2[50], 0xdf8eeb99), new Int_64(K_sha2[51], 0xe19b48a8),
                new Int_64(K_sha2[52], 0xc5c95a63), new Int_64(K_sha2[53], 0xe3418acb),
                new Int_64(K_sha2[54], 0x7763e373), new Int_64(K_sha2[55], 0xd6b2b8a3),
                new Int_64(K_sha2[56], 0x5defb2fc), new Int_64(K_sha2[57], 0x43172f60),
                new Int_64(K_sha2[58], 0xa1f0ab72), new Int_64(K_sha2[59], 0x1a6439ec),
                new Int_64(K_sha2[60], 0x23631e28), new Int_64(K_sha2[61], 0xde82bde9),
                new Int_64(K_sha2[62], 0xb2c67915), new Int_64(K_sha2[63], 0xe372532b),
                new Int_64(0xca273ece, 0xea26619c), new Int_64(0xd186b8c7, 0x21c0c207),
                new Int_64(0xeada7dd6, 0xcde0eb1e), new Int_64(0xf57d4f7f, 0xee6ed178),
                new Int_64(0x06f067aa, 0x72176fba), new Int_64(0x0a637dc5, 0xa2c898a6),
                new Int_64(0x113f9804, 0xbef90dae), new Int_64(0x1b710b35, 0x131c471b),
                new Int_64(0x28db77f5, 0x23047d84), new Int_64(0x32caab7b, 0x40c72493),
                new Int_64(0x3c9ebe0a, 0x15c9bebc), new Int_64(0x431d67c4, 0x9c100d4c),
                new Int_64(0x4cc5d4be, 0xcb3e42b6), new Int_64(0x597f299c, 0xfc657e2a),
                new Int_64(0x5fcb6fab, 0x3ad6faec), new Int_64(0x6c44198c, 0x4a475817)
            ];
        }
    }
    if ((8 & SUPPORTED_ALGS) !== 0) {
        rc_sha3 = [
            new Int_64(0x00000000, 0x00000001), new Int_64(0x00000000, 0x00008082),
            new Int_64(0x80000000, 0x0000808A), new Int_64(0x80000000, 0x80008000),
            new Int_64(0x00000000, 0x0000808B), new Int_64(0x00000000, 0x80000001),
            new Int_64(0x80000000, 0x80008081), new Int_64(0x80000000, 0x00008009),
            new Int_64(0x00000000, 0x0000008A), new Int_64(0x00000000, 0x00000088),
            new Int_64(0x00000000, 0x80008009), new Int_64(0x00000000, 0x8000000A),
            new Int_64(0x00000000, 0x8000808B), new Int_64(0x80000000, 0x0000008B),
            new Int_64(0x80000000, 0x00008089), new Int_64(0x80000000, 0x00008003),
            new Int_64(0x80000000, 0x00008002), new Int_64(0x80000000, 0x00000080),
            new Int_64(0x00000000, 0x0000800A), new Int_64(0x80000000, 0x8000000A),
            new Int_64(0x80000000, 0x80008081), new Int_64(0x80000000, 0x00008080),
            new Int_64(0x00000000, 0x80000001), new Int_64(0x80000000, 0x80008008)
        ];

        r_sha3 = [
            [0, 36, 3, 41, 18],
            [1, 44, 10, 45, 2],
            [62, 6, 43, 15, 61],
            [28, 55, 25, 21, 56],
            [27, 20, 39, 8, 14]
        ];
    }

	/**
	 * Performs a round of SHA-2 hashing over a block
	 *
	 * @private
	 * @param {Array<number>} block The binary array representation of the
	 *   block to hash
	 * @param {Array<number|Int_64>} H The intermediate H values from a previous
	 *   round
	 * @param {string} variant The desired SHA-2 variant
	 * @return {Array<number|Int_64>} The resulting H values
	 */
    function roundSHA2(block, H, variant) {
        var a, b, c, d, e, f, g, h, T1, T2, numRounds, t, binaryStringMult,
            safeAdd_2, safeAdd_4, safeAdd_5, gamma0, gamma1, sigma0, sigma1,
            ch, maj, Int, W = [], int1, int2, offset, K;

		/* Set up the various function handles and variable for the specific
		 * variant */
        if ((variant === "SHA-224" || variant === "SHA-256") &&
            ((2 & SUPPORTED_ALGS) !== 0)) {
            /* 32-bit variant */
            numRounds = 64;
            binaryStringMult = 1;
            Int = Number;
            safeAdd_2 = safeAdd_32_2;
            safeAdd_4 = safeAdd_32_4;
            safeAdd_5 = safeAdd_32_5;
            gamma0 = gamma0_32;
            gamma1 = gamma1_32;
            sigma0 = sigma0_32;
            sigma1 = sigma1_32;
            maj = maj_32;
            ch = ch_32;
            K = K_sha2;
        }
        else if ((variant === "SHA-384" || variant === "SHA-512") &&
            ((4 & SUPPORTED_ALGS) !== 0)) {
            /* 64-bit variant */
            numRounds = 80;
            binaryStringMult = 2;
            Int = Int_64;
            safeAdd_2 = safeAdd_64_2;
            safeAdd_4 = safeAdd_64_4;
            safeAdd_5 = safeAdd_64_5;
            gamma0 = gamma0_64;
            gamma1 = gamma1_64;
            sigma0 = sigma0_64;
            sigma1 = sigma1_64;
            maj = maj_64;
            ch = ch_64;
            K = K_sha512;
        }
        else {
            throw new Error("Unexpected error in SHA-2 implementation");
        }

        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        f = H[5];
        g = H[6];
        h = H[7];

        for (t = 0; t < numRounds; t += 1) {
            if (t < 16) {
                offset = t * binaryStringMult;
                int1 = (block.length <= offset) ? 0 : block[offset];
                int2 = (block.length <= offset + 1) ? 0 : block[offset + 1];
                /* Bit of a hack - for 32-bit, the second term is ignored */
                W[t] = new Int(int1, int2);
            }
            else {
                W[t] = safeAdd_4(
                    gamma1(W[t - 2]), W[t - 7],
                    gamma0(W[t - 15]), W[t - 16]
                );
            }

            T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]);
            T2 = safeAdd_2(sigma0(a), maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safeAdd_2(d, T1);
            d = c;
            c = b;
            b = a;
            a = safeAdd_2(T1, T2);
        }

        H[0] = safeAdd_2(a, H[0]);
        H[1] = safeAdd_2(b, H[1]);
        H[2] = safeAdd_2(c, H[2]);
        H[3] = safeAdd_2(d, H[3]);
        H[4] = safeAdd_2(e, H[4]);
        H[5] = safeAdd_2(f, H[5]);
        H[6] = safeAdd_2(g, H[6]);
        H[7] = safeAdd_2(h, H[7]);

        return H;
    }

	/**
	 * Finalizes the SHA-2 hash
	 *
	 * @private
	 * @param {Array<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array<number|Int_64>} H The intermediate H values from a previous
	 *   round
	 * @param {string} variant The desired SHA-2 variant
	 * @param {number} outputLen Unused for this variant
	 * @return {Array<number>} The array of integers representing the SHA-2
	 *   hash of message
	 */
    function finalizeSHA2(remainder, remainderBinLen, processedBinLen, H, variant, outputLen) {
        var i, appendedMessageLength, offset, retVal, binaryStringInc, totalLen;

        if ((variant === "SHA-224" || variant === "SHA-256") &&
            ((2 & SUPPORTED_ALGS) !== 0)) {
            /* 32-bit variant */
			/* The 65 addition is a hack but it works.  The correct number is
			   actually 72 (64 + 8) but the below math fails if
			   remainderBinLen + 72 % 512 = 0. Since remainderBinLen % 8 = 0,
			   "shorting" the addition is OK. */
            offset = (((remainderBinLen + 65) >>> 9) << 4) + 15;
            binaryStringInc = 16;
        }
        else if ((variant === "SHA-384" || variant === "SHA-512") &&
            ((4 & SUPPORTED_ALGS) !== 0)) {
            /* 64-bit variant */
			/* The 129 addition is a hack but it works.  The correct number is
			   actually 136 (128 + 8) but the below math fails if
			   remainderBinLen + 136 % 1024 = 0. Since remainderBinLen % 8 = 0,
			   "shorting" the addition is OK. */
            offset = (((remainderBinLen + 129) >>> 10) << 5) + 31;
            binaryStringInc = 32;
        }
        else {
            throw new Error("Unexpected error in SHA-2 implementation");
        }

        while (remainder.length <= offset) {
            remainder.push(0);
        }
        /* Append '1' at the end of the binary string */
        remainder[remainderBinLen >>> 5] |= 0x80 << (24 - remainderBinLen % 32);
		/* Append length of binary string in the position such that the new
		 * length is correct. JavaScript numbers are limited to 2^53 so it's
		 * "safe" to treat the totalLen as a 64-bit integer. */
        totalLen = remainderBinLen + processedBinLen;
        remainder[offset] = totalLen & 0xFFFFFFFF;
		/* Bitwise operators treat the operand as a 32-bit number so need to
		 * use hacky division and round to get access to upper 32-ish bits */
        remainder[offset - 1] = (totalLen / TWO_PWR_32) | 0;

        appendedMessageLength = remainder.length;

        /* This will always be at least 1 full chunk */
        for (i = 0; i < appendedMessageLength; i += binaryStringInc) {
            H = roundSHA2(remainder.slice(i, i + binaryStringInc), H, variant);
        }

        if (("SHA-224" === variant) && ((2 & SUPPORTED_ALGS) !== 0)) {
            retVal = [
                H[0], H[1], H[2], H[3],
                H[4], H[5], H[6]
            ];
        }
        else if (("SHA-256" === variant) && ((2 & SUPPORTED_ALGS) !== 0)) {
            retVal = H;
        }
        else if (("SHA-384" === variant) && ((4 & SUPPORTED_ALGS) !== 0)) {
            retVal = [
                H[0].highOrder, H[0].lowOrder,
                H[1].highOrder, H[1].lowOrder,
                H[2].highOrder, H[2].lowOrder,
                H[3].highOrder, H[3].lowOrder,
                H[4].highOrder, H[4].lowOrder,
                H[5].highOrder, H[5].lowOrder
            ];
        }
        else if (("SHA-512" === variant) && ((4 & SUPPORTED_ALGS) !== 0)) {
            retVal = [
                H[0].highOrder, H[0].lowOrder,
                H[1].highOrder, H[1].lowOrder,
                H[2].highOrder, H[2].lowOrder,
                H[3].highOrder, H[3].lowOrder,
                H[4].highOrder, H[4].lowOrder,
                H[5].highOrder, H[5].lowOrder,
                H[6].highOrder, H[6].lowOrder,
                H[7].highOrder, H[7].lowOrder
            ];
        }
        else /* This should never be reached */ {
            throw new Error("Unexpected error in SHA-2 implementation");
        }

        return retVal;
    }

	/**
	 * Performs a round of SHA-3 hashing over a block
	 *
	 * @private
	 * @param {Array<number>|null} block The binary array representation of the
	 *   block to hash
	 * @param {Array<Array<Int_64>>} state The binary array representation of the
	 *   block to hash
	 * @return {Array<Array<Int_64>>} The resulting state value
	 */
    function roundSHA3(block, state) {
        var round, x, y, B, C = [], D = [];

        if (null !== block) {
            for (x = 0; x < block.length; x += 2) {
                /* Transform pair of big-endian integers to little-endian Int_64 */
                state[(x >>> 1) % 5][((x >>> 1) / 5) | 0] = xor_64(
                    state[(x >>> 1) % 5][((x >>> 1) / 5) | 0],
                    new Int_64(
                        (block[x + 1] & 0xFF) << 24 | (block[x + 1] & 0xFF00) << 8 | (block[x + 1] & 0xFF0000) >>> 8 | block[x + 1] >>> 24,
                        (block[x] & 0xFF) << 24 | (block[x] & 0xFF00) << 8 | (block[x] & 0xFF0000) >>> 8 | block[x] >>> 24
                    )
                );
            }
        }

        for (round = 0; round < 24; round += 1) {
			/* getNewState doesn't care about variant beyond SHA3 so feed it a
			   value that triggers the getNewState "if" statement
			*/
            B = getNewState("SHA3-");

            /* Perform theta step */
            for (x = 0; x < 5; x += 1) {
                C[x] = xor_64(state[x][0], state[x][1], state[x][2],
                    state[x][3], state[x][4]);
            }
            for (x = 0; x < 5; x += 1) {
                D[x] = xor_64(C[(x + 4) % 5], rotl_64(C[(x + 1) % 5], 1));
            }
            for (x = 0; x < 5; x += 1) {
                for (y = 0; y < 5; y += 1) {
                    state[x][y] = xor_64(state[x][y], D[x]);
                }
            }

            /* Perform combined ro and pi steps */
            for (x = 0; x < 5; x += 1) {
                for (y = 0; y < 5; y += 1) {
                    B[y][(2 * x + 3 * y) % 5] = rotl_64(
                        state[x][y],
                        r_sha3[x][y]
                    );
                }
            }

            /* Perform chi step */
            for (x = 0; x < 5; x += 1) {
                for (y = 0; y < 5; y += 1) {
                    state[x][y] = xor_64(
                        B[x][y],
                        new Int_64(
                            ~(B[(x + 1) % 5][y].highOrder) & B[(x + 2) % 5][y].highOrder,
                            ~(B[(x + 1) % 5][y].lowOrder) & B[(x + 2) % 5][y].lowOrder
                        )
                    );
                }
            }

            /* Perform iota step */
            state[0][0] = xor_64(state[0][0], rc_sha3[round]);
        }

        return state;
    }

	/**
	 * Finalizes the SHA-3 hash
	 *
	 * @private
	 * @param {Array<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array<Array<Int_64>>} state The state from a previous round
	 * @param {number} blockSize The block size/rate of the variant in bits
	 * @param {number} delimiter The delimiter value for the variant
	 * @param {number} ouputLen The output length for the variant in bits
	 * @return {Array<number>} The array of integers representing the SHA-3
	 *   hash of message
	 */
    function finalizeSHA3(remainder, remainderBinLen, processedBinLen, state, blockSize, delimiter, ouputLen) {
        var i, retVal = [], binaryStringInc = blockSize >>> 5, state_offset = 0,
            remainderIntLen = remainderBinLen >>> 5, temp;


		/* Process as many blocks as possible, some may be here for multiple rounds
		   with SHAKE
		*/
        for (i = 0; i < remainderIntLen && remainderBinLen >= blockSize; i += binaryStringInc) {
            state = roundSHA3(remainder.slice(i, i + binaryStringInc), state);
            remainderBinLen -= blockSize;
        }

        remainder = remainder.slice(i);
        remainderBinLen = remainderBinLen % blockSize;

        /* Pad out the remainder to a full block */
        while (remainder.length < binaryStringInc) {
            remainder.push(0);
        }

        /* Find the next "empty" byte for the 0x80 and append it via an xor */
        i = remainderBinLen >>> 3;
        remainder[i >> 2] ^= delimiter << (24 - (8 * (i % 4)));

        remainder[binaryStringInc - 1] ^= 0x80;
        state = roundSHA3(remainder, state);

        while (retVal.length * 32 < ouputLen) {
            temp = state[state_offset % 5][(state_offset / 5) | 0];
            retVal.push((temp.lowOrder & 0xFF) << 24 | (temp.lowOrder & 0xFF00) << 8 | (temp.lowOrder & 0xFF0000) >> 8 | temp.lowOrder >>> 24);
            if (retVal.length * 32 >= ouputLen) {
                break;
            }
            retVal.push((temp.highOrder & 0xFF) << 24 | (temp.highOrder & 0xFF00) << 8 | (temp.highOrder & 0xFF0000) >> 8 | temp.highOrder >>> 24);
            state_offset += 1;

            if (0 === ((state_offset * 64) % blockSize)) {
                roundSHA3(null, state);
            }
        }

        return retVal;
    }

	/**
	 * jsSHA is the workhorse of the library.  Instantiate it with the string to
	 * be hashed as the parameter
	 *
	 * @constructor
	 * @this {jsSHA}
	 * @param {string} variant The desired SHA variant (SHA-1, SHA-224, SHA-256,
	 *   SHA-384, SHA-512, SHA3-224, SHA3-256, SHA3-384, or SHA3-512)
	 * @param {string} inputFormat The format of srcString: HEX, TEXT, B64,
	 *   BYTES, or ARRAYBUFFER
	 * @param {{encoding: (string|undefined), numRounds: (number|undefined)}=}
	 *   options Optional values
	 */
    var jsSHA = function (variant, inputFormat, options) {
        var processedLen = 0, remainder = [], remainderLen = 0, utfType,
            intermediateState, converterFunc, shaVariant = variant, outputBinLen,
            variantBlockSize, roundFunc, finalizeFunc, stateCloneFunc,
            hmacKeySet = false, keyWithIPad = [], keyWithOPad = [], numRounds,
            updatedCalled = false, inputOptions, isSHAKE = false;

        inputOptions = options || {};
        utfType = inputOptions["encoding"] || "UTF8";
        numRounds = inputOptions["numRounds"] || 1;

        converterFunc = getStrConverter(inputFormat, utfType);

        if ((numRounds !== parseInt(numRounds, 10)) || (1 > numRounds)) {
            throw new Error("numRounds must a integer >= 1");
        }

        if (("SHA-1" === shaVariant) && ((1 & SUPPORTED_ALGS) !== 0)) {
            variantBlockSize = 512;
            roundFunc = roundSHA1;
            finalizeFunc = finalizeSHA1;
            outputBinLen = 160;
            stateCloneFunc = function (state) { return state.slice(); };
        }
        else if ((shaVariant.lastIndexOf("SHA-", 0) === 0) && ((6 & SUPPORTED_ALGS) !== 0)) {
            roundFunc = function (block, H) {
                return roundSHA2(block, H, shaVariant);
            };
            finalizeFunc = function (remainder, remainderBinLen, processedBinLen, H, outputLen) {
                return finalizeSHA2(remainder, remainderBinLen, processedBinLen, H, shaVariant, outputLen);
            };
            stateCloneFunc = function (state) { return state.slice(); };

            if (("SHA-224" === shaVariant) && ((2 & SUPPORTED_ALGS) !== 0)) {
                variantBlockSize = 512;
                outputBinLen = 224;
            }
            else if (("SHA-256" === shaVariant) && ((2 & SUPPORTED_ALGS) !== 0)) {
                variantBlockSize = 512;
                outputBinLen = 256;
            }
            else if (("SHA-384" === shaVariant) && ((4 & SUPPORTED_ALGS) !== 0)) {
                variantBlockSize = 1024;
                outputBinLen = 384;
            }
            else if (("SHA-512" === shaVariant) && ((4 & SUPPORTED_ALGS) !== 0)) {
                variantBlockSize = 1024;
                outputBinLen = 512;
            }
            else {
                throw new Error("Chosen SHA variant is not supported");
            }
        }
        else if (((shaVariant.lastIndexOf("SHA3-", 0) === 0) || (shaVariant.lastIndexOf("SHAKE", 0) === 0)) &&
            ((8 & SUPPORTED_ALGS) !== 0)) {
            var delimiter = 0x06;

            roundFunc = roundSHA3;
            stateCloneFunc = function (state) { return cloneSHA3State(state); };
            if ("SHA3-224" === shaVariant) {
                variantBlockSize = 1152;
                outputBinLen = 224;

            }
            else if ("SHA3-256" === shaVariant) {
                variantBlockSize = 1088;
                outputBinLen = 256;
            }
            else if ("SHA3-384" === shaVariant) {
                variantBlockSize = 832;
                outputBinLen = 384;
            }
            else if ("SHA3-512" === shaVariant) {
                variantBlockSize = 576;
                outputBinLen = 512;
            }
            else if ("SHAKE128" === shaVariant) {
                variantBlockSize = 1344;
                outputBinLen = -1;
                delimiter = 0x1F;
                isSHAKE = true;
            }
            else if ("SHAKE256" === shaVariant) {
                variantBlockSize = 1088;
                outputBinLen = -1;
                delimiter = 0x1F;
                isSHAKE = true;
            }
            else {
                throw new Error("Chosen SHA variant is not supported");
            }
            finalizeFunc = function (remainder, remainderBinLen, processedBinLen, state, outputLen) {
                return finalizeSHA3(remainder, remainderBinLen, processedBinLen, state, variantBlockSize, delimiter, outputLen);
            };
        }
        else {
            throw new Error("Chosen SHA variant is not supported");
        }
        intermediateState = getNewState(shaVariant);

		/**
		 * Sets the HMAC key for an eventual getHMAC call.  Must be called
		 * immediately after jsSHA object instantiation
		 *
		 * @expose
		 * @param {string} key The key used to calculate the HMAC
		 * @param {string} inputFormat The format of key, HEX, TEXT, B64, BYTES,
		 *   or ARRAYBUFFER
		 * @param {{encoding : (string|undefined)}=} options Associative array
		 *   of input format options
		 */
        this.setHMACKey = function (key, inputFormat, options) {
            var keyConverterFunc, convertRet, keyBinLen, keyToUse, blockByteSize,
                i, lastArrayIndex, keyOptions;

            if (true === hmacKeySet) {
                throw new Error("HMAC key already set");
            }

            if (true === updatedCalled) {
                throw new Error("Cannot set HMAC key after calling update");
            }

            if ((isSHAKE === true) && ((8 & SUPPORTED_ALGS) !== 0)) {
                throw new Error("SHAKE is not supported for HMAC");
            }

            keyOptions = options || {};
            utfType = keyOptions["encoding"] || "UTF8";

            keyConverterFunc = getStrConverter(inputFormat, utfType);

            convertRet = keyConverterFunc(key);
            keyBinLen = convertRet["binLen"];
            keyToUse = convertRet["value"];

            blockByteSize = variantBlockSize >>> 3;

            /* These are used multiple times, calculate and store them */
            lastArrayIndex = (blockByteSize / 4) - 1;

			/* Figure out what to do with the key based on its size relative to
			 * the hash's block size */
            if (blockByteSize < (keyBinLen / 8)) {

                keyToUse = finalizeFunc(keyToUse, keyBinLen, 0, getNewState(shaVariant), outputBinLen);
				/* For all variants, the block size is bigger than the output
				 * size so there will never be a useful byte at the end of the
				 * string */
                while (keyToUse.length <= lastArrayIndex) {
                    keyToUse.push(0);
                }
                keyToUse[lastArrayIndex] &= 0xFFFFFF00;
            }
            else if (blockByteSize > (keyBinLen / 8)) {
				/* If the blockByteSize is greater than the key length, there
				 * will always be at LEAST one "useless" byte at the end of the
				 * string */
                while (keyToUse.length <= lastArrayIndex) {
                    keyToUse.push(0);
                }
                keyToUse[lastArrayIndex] &= 0xFFFFFF00;
            }

            /* Create ipad and opad */
            for (i = 0; i <= lastArrayIndex; i += 1) {
                keyWithIPad[i] = keyToUse[i] ^ 0x36363636;
                keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C;
            }

            intermediateState = roundFunc(keyWithIPad, intermediateState);
            processedLen = variantBlockSize;

            hmacKeySet = true;
        };

		/**
		 * Takes strString and hashes as many blocks as possible.  Stores the
		 * rest for either a future update or getHash call.
		 *
		 * @expose
		 * @param {string} srcString The string to be hashed
		 */
        this.update = function (srcString) {
            var convertRet, chunkBinLen, chunkIntLen, chunk, i, updateProcessedLen = 0,
                variantBlockIntInc = variantBlockSize >>> 5;

            convertRet = converterFunc(srcString, remainder, remainderLen);
            chunkBinLen = convertRet["binLen"];
            chunk = convertRet["value"];

            chunkIntLen = chunkBinLen >>> 5;
            for (i = 0; i < chunkIntLen; i += variantBlockIntInc) {
                if (updateProcessedLen + variantBlockSize <= chunkBinLen) {
                    intermediateState = roundFunc(
                        chunk.slice(i, i + variantBlockIntInc),
                        intermediateState
                    );
                    updateProcessedLen += variantBlockSize;
                }
            }
            processedLen += updateProcessedLen;
            remainder = chunk.slice(updateProcessedLen >>> 5);
            remainderLen = chunkBinLen % variantBlockSize;
            updatedCalled = true;

        };

		/**
		 * Returns the desired SHA hash of the string specified at instantiation
		 * using the specified parameters
		 *
		 * @expose
		 * @param {string} format The desired output formatting (B64, HEX,
		 *   BYTES, or ARRAYBUFFER)
		 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined),
		 *   shakeLen : (number|undefined)}=} options Hash list of output formatting options
		 * @return {string|ArrayBuffer} The string representation of the hash
		 *   in the format specified.
		 */
        this.getHash = function (format, options) {
            var formatFunc, i, outputOptions, finalizedState;

            if (true === hmacKeySet) {
                throw new Error("Cannot call getHash after setting HMAC key");
            }

            outputOptions = getOutputOpts(options);

            if ((isSHAKE === true) && ((8 & SUPPORTED_ALGS) !== 0)) {
                if (outputOptions["shakeLen"] === -1) {
                    throw new Error("shakeLen must be specified in options");
                }
                outputBinLen = outputOptions["shakeLen"];
            }

            /* Validate the output format selection */
            switch (format) {
                case "HEX":
                    formatFunc = function (binarray) { return binb2hex(binarray, outputBinLen, outputOptions); };
                    break;
                case "B64":
                    formatFunc = function (binarray) { return binb2b64(binarray, outputBinLen, outputOptions); };
                    break;
                case "BYTES":
                    formatFunc = function (binarray) { return binb2bytes(binarray, outputBinLen); };
                    break;
                case "ARRAYBUFFER":
                    try {
                        i = new ArrayBuffer(0);
                    } catch (ignore) {
                        throw new Error("ARRAYBUFFER not supported by this environment");
                    }
                    formatFunc = function (binarray) { return binb2arraybuffer(binarray, outputBinLen); };
                    break;
                default:
                    throw new Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
            }

            finalizedState = finalizeFunc(remainder.slice(), remainderLen, processedLen, stateCloneFunc(intermediateState), outputBinLen);
            for (i = 1; i < numRounds; i += 1) {
				/* This weird fix-up is only for the case of SHAKE algorithms
				 * and outputBinLen is not a multiple of 32.  In this case, the
				 * very last block of finalizedState has data that needs to be
				 * ignored because all the finalizeFunc calls need to have
				 * unneeded bits set to 0.
				 */
                if (((8 & SUPPORTED_ALGS) !== 0) && (isSHAKE === true) && (outputBinLen % 32 !== 0)) {
                    finalizedState[finalizedState.length - 1] &= 0xFFFFFF00 << 24 - (outputBinLen % 32);
                }
                finalizedState = finalizeFunc(finalizedState, outputBinLen, 0, getNewState(shaVariant), outputBinLen);
            }

            return formatFunc(finalizedState);
        };

		/**
		 * Returns the the HMAC in the specified format using the key given by
		 * a previous setHMACKey call.
		 *
		 * @expose
		 * @param {string} format The desired output formatting
		 *   (B64, HEX, BYTES, or ARRAYBUFFER)
		 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined),
		 *   shakeLen : (number|undefined)}=} options associative array of output
		 *   formatting options
		 * @return {string|ArrayBuffer} The string representation of the hash in the
		 *   format specified.
		 */
        this.getHMAC = function (format, options) {
            var formatFunc, firstHash, outputOptions, finalizedState;

            if (false === hmacKeySet) {
                throw new Error("Cannot call getHMAC without first setting HMAC key");
            }

            outputOptions = getOutputOpts(options);

            /* Validate the output format selection */
            switch (format) {
                case "HEX":
                    formatFunc = function (binarray) { return binb2hex(binarray, outputBinLen, outputOptions); };
                    break;
                case "B64":
                    formatFunc = function (binarray) { return binb2b64(binarray, outputBinLen, outputOptions); };
                    break;
                case "BYTES":
                    formatFunc = function (binarray) { return binb2bytes(binarray, outputBinLen); };
                    break;
                case "ARRAYBUFFER":
                    try {
                        formatFunc = new ArrayBuffer(0);
                    } catch (ignore) {
                        throw new Error("ARRAYBUFFER not supported by this environment");
                    }
                    formatFunc = function (binarray) { return binb2arraybuffer(binarray, outputBinLen); };
                    break;
                default:
                    throw new Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
            }

            firstHash = finalizeFunc(remainder.slice(), remainderLen, processedLen, stateCloneFunc(intermediateState), outputBinLen);
            finalizedState = roundFunc(keyWithOPad, getNewState(shaVariant));
            finalizedState = finalizeFunc(firstHash, outputBinLen, variantBlockSize, finalizedState, outputBinLen);

            return formatFunc(finalizedState);
        };
    };

    global["jsSHA"] = jsSHA;
};
(function (context) {
    var validPasswords = [
        "a677fa7e9825854e65d50cacfcab6d4d7bb9a0531faa45b1d79198af49d7ff3e",
        "f72d601f63cc9a02c9a19b67622345d4d48e0533f91e3afd9932c829a9c27a38",
        "f45015f8d105ce0e8fb51808e9427146c672047ce38bcddc5db82c91376fe8c5",
        "3c4d1197b1796e5a0c5639b67151ea19a1fc57c0a5147a830b9305b18f91c973",
        "9f966baf1051cae5a334d9d90868439d59733677f05b1fed5dbb8ae16f8242cb",
        "1c90fb750c1f96e93def99e843d2e1fa9cc58b06bfe0e8032570df47b56ebcb5",
        "c16a0eec5392f583a032d4a2d7d8eff7a55b113499b7c951a27272dc0bb906fa",
        "8190f02550721a356241518113232b28ca9fa30569a0547f2a78e95d4fe84f99",
        "fe0b43894d2c096fa8d595ee3bdc66f2b300277ee0ea61a94fa386d2353cd70a",
        "653d66433db54fdb08ea1c0cab3cd7b6124668f3d6ddf6d79d4028b1dc3958e2",
        "4f00cef539277496e280b68ecab74c35d09e3fec9e01c6d19928fd9a8093e230",
        "f6ee73c756f4ddecdcc94d9a21cfd3f662d6ee4d21bf5b2f43a3d838cf4847ca",
        "40b4351edd845f2d31beadffa40c30f5a251c38519d493e825e3dab08c5d3754",
        "d75e80385dd96d5c767164f5c1897510198107656832e28bfbb130a24fb2b50f",
        "4ea1e70dfeca7fa86c79c085817e261587ee3a7b8733513b61cdd9d022976e2a",
        "2e748f437a9f290218718e0536fc5bd6a42485ec845353b1e740eb124bd967be",
        "5ad4c1bc039d826ee81ae474942651d77ff681645dc46a193687f8f113254660",
        "64058497f1e8a98b813778ec2cc12161b017e32078739198efbd464daa5a59ef",
        "c9d1adda22f5fbf19e76137ae450601fcc41d6acbd718dbbd3b9cdb2fd79866f",
        "372ee1863c451400423e83c9e190dbed40c72d24e91c9f51cefee683c44a12bc",
        "5e95ba44fe1c7ad1c698077b8ebb19ca7af59a7710bb83e38c666d5f82796705",
        "a8cdf6b9b2a53b220ddeaa9b03b19876c96168e8091019f6a08975aa82902033",
        "496b05b4cc973efa2294dcf623d1844cc5d32c7870f654acf0ca94e6699db238",
        "8b1fdd0442c4cf1858fe7db91a50358131989bd077536aecf9b50677e77e6cfe",
        "b0dd18a3e2c5abbc0cbc6676172e1238e9ae7ebaf3d8d8cbfb32fca64ce583ed",
        "06b479db0f6c8a7f2c37e3e88df516a2c82b61d7fe9e65f6cd97bf88d904c0af",
        "8ae2c3046b983f566d8f4aaa82df32cd8a87d4d45e6dd6a36b8badc081b24779",
        "56975f06db5e3c47dabe191b19fe9d0b5515c27ed2d8d2f22f6170708d982107",
        "02a1ec4ccd7508d500c6828344a05cdde677c45f657c6666a013103c65c92961",
        "e4f4181bf5454570c2c81e25ca0355185ce79d4571cd36375d3b1d4d3c60faae",
        "1d90237aa5fc9d4b56c1018ff2ba5785aadbdbffac74b90666b326809bdf3162",
        "f0605725bd1072de5a74c7a023292ad8902ae733caaf8a43fa83abf97cf6fc8d",
        "27e9dc666ef2e98efa326fbec17c0537ab5d0ad68d97fbe7498542d6ce5f4439",
        "7261a50fe0748dac509de21d409029add955df6945ac31c7f150ed8263a7af42",
        "a789c9996747c6deb154aafe52eb30eb0bf78722ccda109367a4bba6efd6b8fa",
        "d8a7d242452f9d06e3d43a68e1a3d5c588cb94e58ca9d0341e6ec185ae973194",
        "72c4c219fa9885118bce36ed17ee8c6c50717197ca92a0a4782490e954dc5a00",
        "f253281ec6aa30da9b2a688bb59441e800db1eeb122d11b3304aa17d0dafa73c",
        "7f6f8e53a859b819e8871a505d187365769ece3224dd9dae9125f79a07bd4000",
        "03b281359924154c853781602fbfe8e1086a1a49d4d6e9b8e384a20b76f1c4b3",
        "5bf6b5c7586e848c01452fd9ff3fdde45ba24c07dd0433356ae23283c6ce2168",
        "276c6646804201b4acacb2c8fc30730dcbdbe371eea3cb6cbc8945a601b66497",
    ];

    var revokedPasswords = [
    ];

    function getAuthenticationHash(password) {
        var hasher = new jsSHA("SHA-256", "TEXT");
        hasher.update("vira " + password.trim().toLowerCase() + " mate");
        return hasher.getHash("HEX");
    };

    function isValidPassword(password) {
        if (revokedPasswords.indexOf(hash) >= 0)
            return false;

        var hash = getAuthenticationHash(password);
        if (validPasswords.indexOf(hash) >= 0)
            return true;

        return false;
    };

    context.getAuthenticationHash = getAuthenticationHash;
    context.isValidPassword = isValidPassword;
})(window);

var settings = new Store("settings", {
    "preferFriendSummons": true,
    "preferNonFriendSummonsInFavorites": true,
    "preferLimitBrokenSummons": true,
    "preferHighLevelSummons": true,
    "notifyOnFullAP": false,
    "notifyOnFullBP": false,
    "showSkillCooldowns": true,
    "showDebuffTimers": true,
    "showBuffTimers": true,
    "monitorRaidDebuffs": true,
    "keyboardShortcuts": true,
    "showBookmarks": true,
    "preferredSummonElement": "",
    "submenuSize": 1.0,
    "bookmarksSize": 1.0,
    "bookmarksMenuSize": 1.0,
    "recentQuest": null,
    "showQuickPanels": true,
    "showGaugeOverlays": true,
    "openBookmarksOnClick": false,
    "fixJPFontRendering": true,
    "enableCoOpEnhancements": true,
    "dropdownFix": true,
    "disableMiddleRightClick": true,
    "statusPanel": true,
    "itemsPanel": true,
    "raidsPanel": false,
    "clockBrightness": 0.65,
    "oneClickQuickSummons": true,
    "bookmarksInactiveIcon": null,
    "bookmarksActiveIcon": null,
    "bookmarksIconPadding": 100,
    "horizontalBookmarks": false,
    "statusPanelBuffs": false,
    "statusPanelExpiringBuffs": true,
    "betterEnglishFont": false,
    "showItemWatchButtons": true,
    "showPartyNames": true,
    "filterEnemyTimers": true,
    "showPerformanceHud": false,
    "showNetworkHud": false,
    "showWeaponAttack": true,
    "showSkillActivationIndicator": true,
    "autofillBackupTweets": true,
    "moveCoOpFooter": true,
    "largeQuickPanels": false,
    "showPartyHelp": false,
    "keepSoundOnBlur": true,
    "stuckButtonWorkaround2": true,
    "showLastActionTimer": true,
    "smartSupports": true,
    "defaultToSmartSupports": false,
    "disablePhalanxSticker": true,
    "summonOrder": "{}",
    "password": "",
    "minimumPopupWait": 350,
    "maximumPopupWait": 1750,
    "focusQuickPanels": true,
    "newSkillSystem": true,
    "arcarumFix": true,
    "enableRaidSync": true,
    "enableAutomaticUpdates": true,
    "showGuildWarMenu": true,
    "mistakeGuard": true,
    "showNextRankExp": true,
    "globalDisable": false
});
var failedUpdateMinimumDelay = 10 * 1000;
var minimumUpdateDelay = 60 * 4 * 1000;
var minimumRaidUpdateDelay = 30 * 1000;
var minimumItemUpdateDelay = 60 * 30 * 1000;
var minimumHaloUpdateDelay = 60 * 30 * 1000;
var secretKeysByTabId = {};
var lastFailure = -1;
var users = {};
var lastRaidCodes = {};
var isDead = true;
var isShutdown = false;
var lastLocation = null;
var idleRedirectPending = false;
var lastRedirectTarget = null;
var minimumVersionJsonUpdateDelay = 2 * 60 * 60 * 1000;
var isFreshStart = true;
var isRemoteShutdown = JSON.parse(settings.get("isRemoteShutdown") || "false");
var remoteDisabledFeatures = JSON.parse(settings.get("remoteDisabledFeatures") || "[]");
var updateCheckDelay = Math.max(JSON.parse(settings.get("updateCheckDelay") || "0"), minimumVersionJsonUpdateDelay);
// chrome.runtime.onConnect.addListener(onPortConnect);
chrome.runtime.onMessage.addListener(onRuntimeMessage);
chrome.alarms.onAlarm.addListener(onAlarm);
chrome.runtime.onInstalled.addListener(function () {
    var dc = chrome.declarativeContent;
    dc.onPageChanged.removeRules(undefined, function () {
        dc.onPageChanged.addRules([
            {
                conditions: [
                    new dc.PageStateMatcher({
                        pageUrl: { hostEquals: 'game.granbluefantasy.jp', schemes: ["https", "http"] },
                    }),
                    new dc.PageStateMatcher({
                        pageUrl: { hostEquals: 'gbf.game.mbga.jp', schemes: ["https", "http"] },
                    })
                ],
                actions: [new dc.ShowPageAction()]
            }
        ]);
    });
});
log("Started");
try {
    if (isRemoteShutdown)
        log("Remote shutdown currently enabled.");
    if (remoteDisabledFeatures.length)
        log("Remote disabled features: " + JSON.stringify(remoteDisabledFeatures));
    var nextUpdateWhen = Number(settings.get("nextVersionJsonUpdate") || "0");
    if (nextUpdateWhen < Date.now())
        log("version.json update is due.");
    else
        log("Next version.json update in " + (((nextUpdateWhen - Date.now()) / 1000) / 60).toFixed(1) + " minute(s).");
}
catch (exc) {
    log(exc);
}
try {
    var openAtStartupUrl = settings.get("openAtStartupUrl");
    settings.set("openAtStartupUrl", null);
    if (openAtStartupUrl) {
        log("Opening at startup as configured:", openAtStartupUrl);
        chrome.tabs.create({ url: openAtStartupUrl });
    }
}
catch (exc) {
    log(exc);
}
function forceReloadExtension(reason) {
    log("Attempting to reload extension...", reason);
    var extensionManagerId = "oeckhkihaapneibcobhbegmgoaejfflc";
    chrome.runtime.sendMessage(extensionManagerId, { type: "reloadExtension", id: chrome.runtime.id, reason: reason }, {}, function (response) {
        if (chrome.runtime.lastError) {
            console.log("Viramate Extension Manager is not installed or is disabled.", chrome.runtime.lastError);
        }
        else
            log("Reload request sent and got response", response);
    });
}
;
function getAdjustedSettings() {
    var result = settings.toObject();
    result.allowDragSelect = false;
    // result.autoSkipToQuestResults = false;
    // result.oneClickQuickSummons = false;
    result.realtimeRaidList = false;
    // result.raidsPanel = false;
    // result.showQuickPanels = false;
    result.touchInputSupport = false;
    // Cygamesssssssssssssss
    result.autofillBackupTweets = false;
    // API changes broke this
    result.detailedUpgradePage = false;
    result.newSkillSystem = true;
    for (var i = 0; i < remoteDisabledFeatures.length; i++)
        result[remoteDisabledFeatures[i]] = false;
    if (isShutdown || isRemoteShutdown || result.globalDisable)
        result.isShutdown = true;
    // FIXME: Is this necessary?
    if (result.hideMobageSidebar)
        result.horizontalBookmarks = true;
    return result;
}
;
function log(...args) {
    args.unshift((new Date()).toLocaleString() + " |");
    console.log.apply(console, args);
}
;
function getWatchedItems() {
    var result = JSON.parse(settings.get("watchedItems") || "[]");
    if ((result.length === 1) && (result[0] === null))
        result = [];
    var targetCounts = JSON.parse(settings.get("targetItemCounts") || "{}");
    return {
        items: result,
        counts: targetCounts
    };
}
;
function setItemWatchTarget(id, count) {
    var targetCounts = JSON.parse(settings.get("targetItemCounts") || "{}");
    targetCounts[id] = count;
    settings.set("targetItemCounts", JSON.stringify(targetCounts));
}
;
function addWatchedItem(id) {
    var items = getWatchedItems().items;
    if (items.indexOf(id) >= 0)
        return items;
    if (!id)
        return items;
    items.push(id);
    settings.set("watchedItems", JSON.stringify(items));
    return items;
}
;
function removeWatchedItem(id) {
    var items = getWatchedItems().items;
    var index = items.indexOf(id);
    if (index < 0)
        return items;
    items.splice(index, 1);
    settings.set("watchedItems", JSON.stringify(items));
    return items;
}
;
function getFavedSummons() {
    var result = JSON.parse(settings.get("favedSummons") || "[]");
    if ((result.length === 1) && (result[0] === null))
        result = [];
    return result;
}
;
function addFavedSummon(id) {
    var items = getFavedSummons();
    if (items.indexOf(id) >= 0)
        return items;
    if (!id)
        return items;
    items.push(id);
    settings.set("favedSummons", JSON.stringify(items));
    return items;
}
;
function removeFavedSummon(id) {
    var items = getFavedSummons();
    var index = items.indexOf(id);
    if (index < 0)
        return items;
    items.splice(index, 1);
    settings.set("favedSummons", JSON.stringify(items));
    return items;
}
;
function getUserDict(uid) {
    var dict = users[uid];
    if (!dict)
        dict = users[uid] = { lastUpdate: [] };
    return dict;
}
;
function setUserData(uid, key, data) {
    var dict = getUserDict(uid);
    if (data) {
        dict.lastUpdate[key] = Date.now();
        dict[key] = data;
    }
    else {
        dict.lastUpdate[key] = 0;
        dict[key] = null;
    }
}
;
function getUserData(uid, key) {
    var dict = getUserDict(uid);
    return dict[key];
}
;
function getLastDataUpdate(uid, key) {
    var dict = getUserDict(uid);
    return dict.lastUpdate[key];
}
;
function formatItemCounters(uid) {
    var itemCounters = getUserDict(uid).itemCounters;
    if (!itemCounters)
        return null;
    var counterDict = {};
    for (var i = 0, l = itemCounters.length; i < l; i++) {
        var item = itemCounters[i];
        counterDict[item.item_id] = item;
    }
    return counterDict;
}
;
function onPortConnect(port) {
    port.onMessage.addListener(onPortMessage.bind(port));
}
;
function onPortMessage(msg) {
    var port = this;
    var didSendResponse = false;
    var id = msg.__messageId__;
    var expectsResponse = typeof (id) !== "undefined";
    var sendResponse;
    if (expectsResponse)
        sendResponse = function (response) {
            didSendResponse = true;
            port.postMessage({ type: "__result__", result: response, id: id });
        };
    else
        sendResponse = function (response) {
            log("sendResponse called on message not expecting a response", msg.type, response);
        };
    var result = onRuntimeMessage(msg, port.sender, sendResponse);
    var isSync = (result !== true);
    if (expectsResponse && isSync && !didSendResponse) {
        log("Message handler failed to send a response when one was expected", msg);
        port.postMessage({ type: "__result__", result: undefined, error: "response not sent" });
    }
}
;
function onRuntimeMessage(msg, sender, sendResponse) {
    if (chrome.runtime.lastError)
        log(chrome.runtime.lastError);
    var key = msg.type;
    var userDict;
    if (msg.uid)
        userDict = getUserDict(msg.uid);
    var tabId;
    if (sender.tab && sender.tab.id)
        tabId = sender.tab.id;
    else if (msg.tabId)
        tabId = msg.tabId;
    if (tabId <= 0) {
        log("Message has no tab id", key);
        return;
    }
    var newState;
    var senderUrl = sender.url || "";
    if ((senderUrl.indexOf("granbluefantasy.jp") >= 0) ||
        (senderUrl.indexOf("mbga.jp") >= 0)) {
    }
    else if ((senderUrl.indexOf("chrome-extension://") >= 0) &&
        (senderUrl.indexOf("api.html") >= 0)) {
        switch (key) {
            case "apiRequest":
            case "getSettings":
                break;
            default:
                log("Rejected disallowed API request", msg);
                return;
        }
    }
    switch (key) {
        case "apiRequest":
            if (!settings.get("webAPI")) {
                log("Rejected API request because API is disabled", msg);
                sendResponse(null);
                return;
            }
            log("Processing API request", msg.request.type);
            switch (msg.request.type) {
                case "getUserIds":
                    sendResponse(JSON.stringify(Object.keys(users)));
                    break;
                case "getVersion":
                    sendResponse(chrome.app.getDetails().version);
                    break;
                case "tryJoinCoOpRoom":
                case "tryJoinRaid":
                case "getCombatState":
                    log("Preparing to send api request", msg);
                    chrome.tabs.query({}, function (tabs) {
                        if (tabs.length === 0) {
                            log("Found no game tab");
                            sendResponse({ type: "result", error: "No game tab found" });
                            return;
                        }
                        for (var i = 0, l = tabs.length; i < l; i++) {
                            var tab = tabs[i];
                            var tabUrl = tab.url;
                            if (!tabUrl ||
                                ((tabUrl.indexOf("game.granbluefantasy.jp") < 0) &&
                                    (tabUrl.indexOf("gbf.game.mbga.jp") < 0))) {
                                continue;
                            }
                            log("Sending api request", msg);
                            actuallySendMessage(msg, tab.id, function (result) {
                                log("Got result for api request");
                                sendResponse(result);
                            });
                            return;
                        }
                        log("Found no granblue tab");
                        sendResponse({ type: "result", error: "No granblue tab found" });
                    });
                    return true;
                default:
                    sendResponse({ type: "result", error: "Unknown message" });
                    break;
            }
            break;
        case "reloadExtension":
            log("Reloading extension upon request");
            settings.set("openAtStartupUrl", msg.openAtStartupUrl);
            forceReloadExtension(msg.reason || "got reloadExtension message");
            break;
        case "getUserIds":
            sendResponse(JSON.stringify(Object.keys(users)));
            break;
        case "setPassword":
            settings.set("password", msg.password);
            break;
        case "pleaseInjectStylesheets":
            injectStylesheetsIntoTab(sender);
            sendResponse(tabId);
            break;
        case "heartbeat":
            isDead = false;
            break;
        case "cancelSuspend":
            if (userDict.isSuspended)
                log("Canceling idle/maintenance suspend for " + msg.uid);
            userDict.isSuspended = false;
            lastFailure = -1;
            break;
        case "isShutdown":
            sendResponse(isShutdown || isRemoteShutdown);
            break;
        case "setCompatibility":
            newState = (msg.state === false);
            if (newState !== isShutdown) {
                log("Compatibility shutdown state set to", newState);
                isShutdown = newState;
            }
            break;
        case "setGlobalDisable":
            newState = !!msg.state;
            if (newState !== !!(settings.get("globalDisable") || false)) {
                log("Global disable state set to", newState);
                settings.set("globalDisable", newState);
            }
            break;
        case "openNewTab":
            chrome.tabs.create({
                url: msg.url
            });
            break;
        case "getVersion":
            sendResponse(chrome.app.getDetails().version);
            break;
        case "setRecentCoOpHost":
            settings.set("recentCoOpHost", msg.data);
            break;
        case "getRecentCoOpHost":
            sendResponse(settings.get("recentCoOpHost") || null);
            break;
        case "setCurrentEvent":
            if (msg.href !== settings.get("currentEvent"))
                log("Event changed to '" + msg.href + "'");
            settings.set("currentEvent", msg.href);
            break;
        case "setCurrentGuildWar":
            if (msg.href !== settings.get("currentGuildWar"))
                log("Guild war changed to '" + msg.href + "'");
            settings.set("currentGuildWar", msg.href);
            if (!msg.href)
                settings.set("currentGuildWarRaidInfo", null);
            break;
        case "setCurrentGuildWarRaidInfo":
            if (msg.raids !== settings.get("currentGuildWarRaidInfo"))
                log("Guild war raid info changed to '" + msg.raids + "'");
            settings.set("currentGuildWarRaidInfo", msg.raids);
            break;
        case "getCurrentEvent":
            sendResponse(settings.get("currentEvent") || null);
            break;
        case "setRecentQuest":
            settings.set("recentQuest", msg.url);
            break;
        case "getRecentQuest":
            sendResponse(settings.get("recentQuest") || null);
            break;
        case "setLastLocation":
            // FIXME: Track per-tab
            lastLocation = msg.url;
            break;
        case "setIdleRedirectPending":
            // FIXME: Track per-tab
            idleRedirectPending = msg.state;
            if (msg.url)
                lastRedirectTarget = msg.url;
            break;
        case "getLastLocation":
            sendResponse(lastLocation || null);
            break;
        case "getIdleRedirectInfo":
            if (idleRedirectPending) {
                sendResponse({ pending: true, location: lastLocation, lastRedirectTarget: lastRedirectTarget });
            }
            else {
                sendResponse({ pending: false });
            }
            break;
        case "getSettings":
            var nextUpdate;
            if (!settings.get("alwaysUpdateVersionJson") &&
                !(isFreshStart && isRemoteShutdown)) {
                nextUpdate = settings.get("nextVersionJsonUpdate");
                if (typeof (nextUpdate) === "string")
                    nextUpdate = Number(nextUpdate);
                else
                    nextUpdate = 0;
            }
            else {
                log("Triggering automatic version.json update");
                nextUpdate = 0;
            }
            isFreshStart = false;
            return maybeDoUpdate(nextUpdate, updateCheckDelay, getAdjustedSettings, downloadLatestVersionJson, sendResponse, false, tabId, msg.uid);
        case "getRaidCode":
            sendResponse(lastRaidCodes[tabId]);
            break;
        case "updateRaidCode":
            lastRaidCodes[tabId] = msg.raidCode;
            break;
        case "getItemCounters":
            return maybeDoUpdate(userDict.nextCounterUpdate, minimumUpdateDelay, formatItemCounters, updateItemCounters, sendResponse, msg.force, tabId, msg.uid);
        case "updateItemCounters":
            userDict.nextCounterUpdate = Date.now() + minimumUpdateDelay;
            userDict.itemCounters = msg.counters;
            break;
        case "invalidateStatus":
            if (userDict.lastStatus)
                log("Status invalidated");
            userDict.nextStatusUpdate = 0;
            userDict.lastStatus = null;
            break;
        case "getStatus":
            var getLastStatus = function (uid) {
                var s = getUserDict(uid).lastStatus;
                if (s)
                    fixupStatus(s, uid);
                return s;
            };
            if (msg.lazy) {
                var lastStatus = getLastStatus(msg.uid);
                if (lastStatus) {
                    sendResponse(lastStatus);
                    return;
                }
                else {
                    // log("Lazy status update failed");
                }
            }
            return maybeDoUpdate(userDict.nextStatusUpdate, minimumUpdateDelay, getLastStatus, updateStatus, sendResponse, msg.force, tabId, msg.uid);
        case "updateStatus":
            handleNewStatus(msg.status, msg.uid);
            break;
        case "invalidateBuffs":
            userDict.nextGuildBuffUpdate = 0;
            userDict.nextPersonalBuffUpdate = 0;
            userDict.guildBuffs = null;
            userDict.personalBuffs = null;
            log("Buffs invalidated");
            break;
        case "updateGuildBuffs":
            userDict.lastGuildBuffUpdate = Date.now();
            userDict.nextGuildBuffUpdate = Date.now() + minimumUpdateDelay;
            userDict.guildBuffs = msg.buffs;
            break;
        case "updatePersonalBuffs":
            userDict.lastPersonalBuffUpdate = Date.now();
            userDict.nextPersonalBuffUpdate = Date.now() + minimumUpdateDelay;
            userDict.personalBuffs = msg.buffs;
            break;
        case "getNextRankRp":
            // if not force, don't actually update since this is a heavy call
            if (!msg.force) {
                if (userDict.nextNextRankRpUpdate) {
                    sendResponse(userDict.nextRankRp);
                    break;
                }
                sendResponse(null);
                break;
            }
            return maybeDoUpdate(userDict.nextNextRankRpUpdate, minimumUpdateDelay, function (uid) { return getUserDict(uid).nextRankRp; }, updateNextRankRp, sendResponse, msg.force, tabId, msg.uid);
        case "updateNextRankRp":
            userDict.nextNextRankRpUpdate = Date.now() + minimumUpdateDelay;
            userDict.nextRankRp = getRpToNextRank(msg.data);
            break;
        case "getRaids":
            return maybeDoUpdate(userDict.nextRaidUpdate, minimumRaidUpdateDelay, function (uid) { return getUserDict(uid).lastRaids; }, updateRaids, sendResponse, msg.force, tabId, msg.uid);
        case "invalidateRaids":
            if (msg.raids) {
                handleNewRaids(msg.raids, msg.uid);
            }
            else {
                if (userDict.lastRaids)
                    log("Raids invalidated");
                userDict.nextRaidUpdate = 0;
                userDict.lastRaids = null;
            }
            break;
        case "getItems":
            return maybeDoUpdate(userDict.nextItemUpdate, minimumItemUpdateDelay, function (uid) { return getUserDict(uid).lastItems; }, updateItems, sendResponse, msg.force, tabId, msg.uid);
        case "invalidateItems":
            if (msg.items) {
                handleNewItems(msg.items, msg.uid);
            }
            else {
                if (userDict.lastItems)
                    log("Items invalidated");
                userDict.nextItemUpdate = 0;
                userDict.lastItems = null;
            }
            break;
        case "getWatchedItems":
            sendResponse(getWatchedItems());
            break;
        case "setItemWatchState":
            if (msg.state)
                sendResponse(addWatchedItem(msg.id));
            else
                sendResponse(removeWatchedItem(msg.id));
            break;
        case "setItemWatchTarget":
            setItemWatchTarget(msg.id, msg.count);
            break;
        case "getFavedSummons":
            sendResponse(getFavedSummons());
            break;
        case "setSummonFaveState":
            if (msg.state)
                sendResponse(addFavedSummon(msg.id));
            else
                sendResponse(removeFavedSummon(msg.id));
            break;
        case "setSummonOrder":
            settings.set("summonOrder", msg.data);
            break;
        case "getIsDead":
            sendResponse(isDead);
            break;
        case "doGameAjax":
            doGameAjax(msg, tabId, msg.uid, sendResponse);
            // retain sendResponse
            return true;
        case "doGamePopup":
        case "doGameRedirect":
            actuallySendMessage(msg, tabId);
            break;
        case "tryJoinCoOpRoom":
        case "getUserId":
            actuallySendMessage(msg, tabId, sendResponse);
            return true;
        case "getIsSuspended":
            sendResponse(!!userDict.isSuspended);
            return true;
        case "recordRewards":
            handleQuestRewards(msg);
            break;
        case "recordRaidInfo":
            handleRaidInfo(msg);
            break;
        case "registerSecretKey":
            secretKeysByTabId[tabId] = msg.key;
            break;
        case "actionStarted":
            userDict.lastActionStartedWhen = msg.when;
            userDict.lastActionId = msg.actionId;
            broadcastActionTimestamps(msg.uid, userDict);
            break;
        case "actionEnded":
            if (msg.succeeded) {
                userDict.lastSuccessfulActionStartedWhen =
                    userDict.lastActionStartedWhen;
            }
            if (userDict.lastActionId === msg.actionId) {
                if (msg.succeeded) {
                    userDict.lastSuccessfulActionId =
                        userDict.lastActionId;
                }
                else {
                    userDict.lastActionId = null;
                }
            }
            userDict.lastActionEndedWhen = msg.when;
            broadcastActionTimestamps(msg.uid, userDict);
            break;
        case "actionCompletedAnimation":
            // When an action's animation is complete, we disable
            //  the timer since the lockout is definitely over
            if (msg.actionId === userDict.lastActionId) {
                userDict.lastActionStartedWhen =
                    userDict.lastActionId = null;
                broadcastActionTimestamps(msg.uid, userDict);
            }
            break;
        case "getLastActionTimestamps":
            sendResponse(makeActionTimestamps(userDict));
            break;
        default:
            log("Unknown message " + key);
            sendResponse({ error: true });
            break;
    }
}
;
function broadcastActionTimestamps(uid, userDict) {
    var obj = makeActionTimestamps(userDict);
    var msg = {
        type: "actionTimestampsChanged",
        data: obj,
        uid: uid
    };
    chrome.tabs.query(
        // FIXME: Can we narrow this to granblue tabs without the 'tabs' permission?
        {}, function (tabs) {
            if (!tabs)
                return;
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                chrome.tabs.sendMessage(tab.id, msg);
                if (chrome.runtime.lastError)
                    log(chrome.runtime.lastError);
            }
        });
}
;
function makeActionTimestamps(userDict) {
    return {
        actionId: userDict.lastActionId,
        successfulActionId: userDict.lastSuccessfulActionId,
        started: userDict.lastActionStartedWhen,
        successfulStarted: userDict.lastSuccessfulActionStartedWhen,
        ended: userDict.lastActionEndedWhen
    };
}
;
function handleQuestRewards(msg) {
    var userDict = getUserDict(msg.uid);
    if (!userDict.raids)
        return;
    var urlFragment = msg.url.substr(msg.url.lastIndexOf("/") + 1);
    urlFragment = urlFragment.substr(0, urlFragment.indexOf("?"));
    var raidId = parseInt(urlFragment);
    var questId = userDict.raids[raidId];
}
;
function handleRaidInfo(msg) {
    var userDict = getUserDict(msg.uid);
    if (!userDict.raids)
        userDict.raids = {};
    userDict.raids[msg.raidId] = msg.questId;
}
;
function parseTimeInMinutes(text) {
    var parts = text.split(/[\D]+/);
    var result = 0;
    for (var i = 0, len = Math.min(parts.length, 2); i < len; i++) {
        if (parts[i].length === 0) {
            break;
        }
        result = result * 60 + parseInt(parts[i]);
    }
    return result;
}
;
function estimateValue(truncated, maximum, timeRemaining, elapsedTimeMs, minutesPerUnit) {
    if (truncated >= maximum)
        return truncated;
    // HACK: Add 59 seconds to the remaining time since they round down the number of minutes
    timeRemaining += 59 / 60;
    var durationFromFull = maximum * minutesPerUnit;
    timeRemaining = Math.max(0, timeRemaining - (elapsedTimeMs / 60000));
    var fract = (timeRemaining / durationFromFull);
    fract = Math.max(0.0, Math.min(1.0, fract));
    var estimatedValue = maximum * (1.0 - fract);
    return estimatedValue;
}
;
function fixupStatus(status, uid) {
    if (!status)
        return status;
    var userDict = getUserDict(uid);
    // FIXME
    var lastUpdate = userDict.lastStatusUpdate;
    status._lastUpdate = lastUpdate;
    status._now = Date.now();
    var age = (status._now - status._lastUpdate);
    status._precise_ap = estimateValue(status.ap, parseInt(status.max_action_point), parseTimeInMinutes(status.action_point_remain), age, 5);
    status._precise_bp = estimateValue(status.bp, parseInt(status.max_battle_point), parseTimeInMinutes(status.battle_point_remain), age, 10);
    status.buffs = [];
    if (userDict.guildBuffs) {
        // FIXME
        age = (status._now - userDict.lastGuildBuffUpdate);
        for (var i = 0, l = userDict.guildBuffs.length; i < l; i++) {
            var gb = userDict.guildBuffs[i];
            var timeRemaining = (parseTimeInMinutes(gb.time) * 60 * 1000) - age;
            if (timeRemaining <= 0)
                continue;
            status.buffs.push({
                comment: gb.comment,
                timeRemaining: timeRemaining,
                imageUrl: "http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/item/support/support_" +
                    gb.image + "_" + gb.level + ".png"
            });
        }
    }
    if (userDict.personalBuffs) {
        // FIXME
        age = (status._now - userDict.lastPersonalBuffUpdate);
        for (var k in userDict.personalBuffs) {
            if (!userDict.personalBuffs.hasOwnProperty(k))
                continue;
            var pb = userDict.personalBuffs[k];
            var timeRemaining = (parseTimeInMinutes(pb.remain_time) * 60 * 1000) - age;
            if (timeRemaining <= 0)
                continue;
            status.buffs.push({
                comment: pb.name,
                timeRemaining: timeRemaining,
                imageUrl: "http://game-a.granbluefantasy.jp/assets_en/img/sp/assets/item/support/" +
                    pb.image_path + "_" + pb.level + ".png"
            });
        }
    }
    return status;
}
;
function handleNewStatus(status, uid) {
    if (!status) {
        log("Failed status update");
        return;
    }
    getUserDict(uid).lastStatus = status;
    getUserDict(uid).lastStatusUpdate = Date.now();
    getUserDict(uid).nextStatusUpdate = Date.now() + minimumUpdateDelay;
    var minutesUntilApRefill = parseTimeInMinutes(status.action_point_remain);
    var minutesUntilBpRefill = parseTimeInMinutes(status.battle_point_remain);
    if ((minutesUntilApRefill > 1) && settings.get("notifyOnFullAP"))
        chrome.alarms.create("apFull", { delayInMinutes: minutesUntilApRefill + 1 });
    else
        chrome.alarms.clear("apFull");
    if ((minutesUntilBpRefill > 1) && settings.get("notifyOnFullBP"))
        chrome.alarms.create("bpFull", { delayInMinutes: minutesUntilBpRefill + 1 });
    else
        chrome.alarms.clear("bpFull");
    // log("ap time", minutesUntilApRefill, "bp time", minutesUntilBpRefill);
}
;
function maybeDoUpdate(nextTime, minimumUpdateDelay, getValue, doUpdate, sendResponse, force, tabId, uid) {
    var shouldUpdate = false;
    var userDict = getUserDict(uid);
    var now = Date.now();
    if (!nextTime)
        shouldUpdate = true;
    else if (now >= nextTime)
        shouldUpdate = true;
    else if (force)
        shouldUpdate = true;
    if ((now - lastFailure) < failedUpdateMinimumDelay) {
        log("Rate-limiting update due to failure");
        shouldUpdate = false;
    }
    if (userDict.isSuspended &&
        shouldUpdate) {
        log("Rejecting update request due to idle timeout");
        sendResponse(null);
        return false;
    }
    if (!userDict.inFlightRequests)
        userDict.inFlightRequests = {};
    var requestName = doUpdate.name;
    var ifr = userDict.inFlightRequests[requestName];
    if (ifr) {
        var elapsed = now - ifr.startedWhen.getTime();
        if (elapsed >= 30000) {
            log("Request of type '" + requestName + "' in-flight since " + ifr.startedWhen.toLocaleString() + "; that's too long, so we're going again anyway.");
        }
        else {
            log("Request of type '" + requestName + "' in-flight since " + ifr.startedWhen.toLocaleString() + "; waiting for it.");
            ifr.then(function (result) {
                log("In-flight '" + requestName + "' request completed with value", result);
                sendResponse(result);
            });
            return true;
        }
    }
    if (shouldUpdate) {
        var pr = new PromiseResolver();
        pr.promise.startedWhen = new Date();
        userDict.inFlightRequests[requestName] = pr.promise;
        doUpdate(tabId, uid, function (_uid) {
            var response = getValue(_uid);
            delete userDict.inFlightRequests[requestName];
            sendResponse(response);
            pr.resolve(response);
        });
        return true;
    }
    else {
        sendResponse(getValue(uid));
        return false;
    }
}
;
function doGameAjax(msg, tabId, uid, callback) {
    /*
    if (Math.random() < 0.33) {
        console.log("Injecting error for request", msg);
        callback(null, "fake error");
        return;
    }
    */
    actuallySendMessage(msg, tabId, function (bundle) {
        if (!bundle) {
            callback({ error: true }, "no response");
            return;
        }
        var response = bundle[0];
        var error = bundle[1];
        var url = bundle[2];
        if (chrome.runtime.lastError) {
            isDead = true;
            log(chrome.runtime.lastError);
        }
        else {
            isDead = false;
        }
        if (error) {
            if (error.indexOf("-- abort") >= 0) {
                log("xhr aborted", url);
            }
            else {
                log("Error from server", error, url);
                lastFailure = Date.now();
            }
        }
        if (typeof (response) === "string") {
            try {
                response = JSON.parse(response);
            }
            catch (exc) {
            }
        }
        if (isIdleTimeoutRedirect(response)) {
            handleIdleTimeout(uid);
            callback({ idleTimeout: true }, error);
        }
        else if (isMaintenanceRedirect(response)) {
            handleMaintenance(uid);
            callback({ maintenance: true }, error);
        }
        else {
            callback(response, error);
        }
    });
}
;
function isIdleTimeoutRedirect(jsonBody) {
    if (jsonBody &&
        jsonBody.redirect &&
        (jsonBody.redirect.indexOf("top") >= 0))
        return true;
    return false;
}
;
function isMaintenanceRedirect(jsonBody) {
    if (jsonBody &&
        jsonBody.redirect &&
        (jsonBody.redirect.indexOf("maintenance") >= 0))
        return true;
    return false;
}
;
function handleIdleTimeout(uid) {
    log("Idle timeout");
    getUserDict(uid).isSuspended = true;
    lastFailure = Date.now() + 5000;
}
;
function handleMaintenance(uid) {
    log("Maintenance");
    getUserDict(uid).isSuspended = true;
    lastFailure = Date.now() + 5000;
}
;
function updateStatus(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/user/status"
    };
    // log("Triggering status update");
    doGameAjax(msg, tabId, uid, function (result) {
        getUserDict(uid).nextStatusUpdate = Date.now() + minimumUpdateDelay;
        if (!result) {
            log("Status update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Status update failed: idle timeout");
            callback(uid);
        }
        else if (result.maintenance) {
            log("Status update failed: maintenance");
            callback(uid);
        }
        else {
            getUserDict(uid).lastStatusUpdate = Date.now();
            getUserDict(uid).lastStatus = result.status;
            // log("Status updated -> ", lastStatus);
            callback(uid);
        }
    });
}
;
function getRpToNextRank(data) {
    data = decodeURIComponent(data);
    /*
        Data is of the following form:
        [garbage]
        <div class="txt-next-value">Next ###Rankポイント</div>
        
        OR (depending on language)
        
        <div class="txt-next-value">Next lvl in ### Rank Points</div>
        [garbage]
    */
    var result = parseInt(data.replace(/^[^]*txt-next-value[\D]+([\d]+)[^]*$/, "$1"));
    // in case of something unexpected being passed in
    if (isNaN(result)) {
        return "?";
    }
    return result;
}
function updateNextRankRp(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/profile/content/index/" + uid
    };
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("RP to next rank update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("RP to next rank update failed: idle timeout");
            callback(uid);
        }
        else {
            getUserDict(uid).lastNextRankRpUpdate = Date.now();
            getUserDict(uid).nextNextRankRpUpdate = Date.now() + minimumUpdateDelay;
            getUserDict(uid).nextRankRp = getRpToNextRank(result.data);
            callback(uid);
        }
    });
}
;
function getStrikeTime(data) {
    data = decodeURIComponent(data);
    /*
        Data is of the following form:
        [garbage]
        <div class="txt-next-value">Next ###Rankポイント</div>
        
        OR (depending on language)
        
        <div class="txt-next-value">Next lvl in ### Rank Points</div>
        [garbage]
    */
    /*
    var strikeTimes = [];
    var re = /\<div class="prt\-assault\-guildinfo"\>.*?\<div class="prt\-item\-status"\>(.*?)\<\/div/gms
    var m;
    while (m = re.exec(data)) {
        strikeTimes.push(m[1]);
    }

    log(strikeTimes);
    return strikeTimes;
    */
}
function updateStrikeTime(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/guild_main/content/index/"
    };
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Strike time update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Strike time update failed: idle timeout");
            callback(uid);
        }
        else {
            getUserDict(uid).lastStrikeTimeUpdate = Date.now();
            getUserDict(uid).nextStrikeTimeUpdate = Date.now() + minimumUpdateDelay;
            getUserDict(uid).strikeTime = getStrikeTime(result.data);
            callback(uid);
        }
    });
}
;
function updateItemCounters(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/item/normal_item_list/1"
    };
    // log("Triggering counter update");
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Counter update failed");
            getUserDict(uid).nextCounterUpdate = Date.now() + minimumUpdateDelay;
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Counter update failed: idle timeout");
            getUserDict(uid).nextCounterUpdate = Date.now() + minimumUpdateDelay;
            callback(uid);
        }
        else {
            getUserDict(uid).lastCounterUpdate = Date.now();
            getUserDict(uid).nextCounterUpdate = Date.now() + minimumItemUpdateDelay;
            getUserDict(uid).itemCounters = result;
            // log("Counters updated -> ", itemCounters);
            callback(uid);
        }
    });
}
;
function onAlarm(alarm) {
    log("Alarm '" + alarm.name + "' fired");
    if (alarm.name.indexOf("Full") >= 0) {
        var resourceName = alarm.name.replace("Full", "").toUpperCase();
        chrome.notifications.create({
            type: "basic",
            iconUrl: "../../icons/active-256.png",
            title: resourceName + " full",
            message: "Your " + resourceName + " is full."
        });
        return;
    }
}
;
function actuallySendMessage(message, tabId, callback) {
    // *$!@)%KAKLMRSJ chrome garbage APIs
    if (tabId) {
        chrome.tabs.sendMessage(tabId, message, callback);
    }
    else {
        log("No granblue tab found as target for message", message, tabId);
    }
}
;
function handleNewRaids(raids, uid) {
    if (!raids) {
        log("Failed raid update");
        return;
    }
    getUserDict(uid).lastRaids = raids;
    getUserDict(uid).lastRaidUpdate = Date.now();
    getUserDict(uid).nextRaidUpdate = Date.now() + minimumRaidUpdateDelay;
    // log("ap time", minutesUntilApRefill, "bp time", minutesUntilBpRefill);
}
;
function handleNewItems(items, uid) {
    if (!items) {
        log("Failed item update");
        return;
    }
    getUserDict(uid).lastItems = items;
    getUserDict(uid).lastItemUpdate = Date.now();
    getUserDict(uid).nextItemUpdate = Date.now() + minimumItemUpdateDelay;
    // log("ap time", minutesUntilApRefill, "bp time", minutesUntilBpRefill);
}
;
function updateRaids(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/rest/quest/assist_list/0"
    };
    // log("Triggering status update");
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Raid update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Raid update failed: idle timeout");
            lastFailure = Date.now() + 5000;
            callback(uid);
        }
        else if (result.maintenance) {
            log("Raid update failed: maintenance");
            lastFailure = Date.now() + 15000;
            callback(uid);
        }
        else {
            handleNewRaids(result, uid);
            callback(uid);
        }
    });
}
;
function updateItems(tabId, uid, callback) {
    var msg = {
        type: "doGameAjax",
        url: "/item/article_list"
    };
    // log("Triggering status update");
    doGameAjax(msg, tabId, uid, function (result) {
        if (!result) {
            log("Item update failed");
            callback(uid);
        }
        else if (result.idleTimeout) {
            log("Item update failed: idle timeout");
            lastFailure = Date.now() + 5000;
            callback(uid);
        }
        else if (result.maintenance) {
            log("Item update failed: maintenance");
            lastFailure = Date.now() + 15000;
            callback(uid);
        }
        else {
            handleNewItems(result, uid);
            callback(uid);
        }
    });
}
;
function checkVersionMatch(version, matchAgainst) {
    if (matchAgainst === "*")
        return true;
    var matchLower = false;
    if (matchAgainst[0] === "<") {
        matchLower = true;
        matchAgainst = matchAgainst.substr(1);
    }
    var versionParts = version.split(".");
    var patternParts = matchAgainst.split(".");
    for (var i = 0, l = patternParts.length; i < l; i++) {
        if (patternParts[i] === "*")
            continue;
        var lhs = parseInt(versionParts[i]);
        var rhs = parseInt(patternParts[i]);
        if (matchLower) {
            if (lhs < rhs)
                return true;
            else if (lhs > rhs)
                return false;
        }
        else {
            if (lhs !== rhs)
                return false;
        }
    }
    return !matchLower;
}
;
function downloadLatestVersionJson(tabId, uid, callback) {
    var scheduleNext = function () {
        var nextVersionJsonUpdate = Date.now() + updateCheckDelay;
        settings.set("nextVersionJsonUpdate", nextVersionJsonUpdate.toFixed(0));
        log("Next version check scheduled for " + (updateCheckDelay / 60 / 1000) + " minute(s) from now.");
    };
    var doAutoUpdate = JSON.parse(settings.get("enableAutomaticUpdates") || "false");
    var gotResponse = function (ok, data) {
        try {
            if (ok)
                parseVersionJson(data);
            else
                log("Failed to get latest version data.", data);
        }
        catch (exc) {
            log(exc);
        }
        if (callback)
            callback(uid);
        if (doAutoUpdate) {
            sendInstallerCommand("installUpdate", function (result, error) {
                if (error) {
                    log("Automatic update attempt failed", error);
                    return;
                }
                if (result && result.result === "Updated") {
                    if (result.installedVersion.trim().toLowerCase() !==
                        chrome.app.getDetails().version.trim().toLowerCase()) {
                        log("Automatic update installed v" + result.installedVersion + ", restarting extension.");
                        window.setTimeout(function () { forceReloadExtension("automatic update to " + result.installedVersion); }, 1000);
                    }
                    else {
                        log("Automatic update installed but version is the same so not force reloading");
                    }
                }
                else {
                    log("Automatic update completed without updating.", result, error);
                }
            });
        }
        scheduleNext();
    };
    try {
        log("Downloading latest version data...");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://viramate.luminance.org/version.json?_=" + Date.now(), true);
        xhr.timeout = 15 * 1000;
        xhr.onload = function () {
            if (xhr.status === 200)
                gotResponse(true, xhr.responseText);
            else
                gotResponse(false, xhr.status + " " + xhr.statusText);
        };
        xhr.ontimeout = function (evt) {
            gotResponse(false, "timed out");
        };
        xhr.onerror = function (evt) {
            gotResponse(false, evt.error);
        };
        xhr.send();
    }
    catch (exc) {
        log(exc);
        gotResponse(false, "unknown error");
        scheduleNext();
    }
}
;
function parseVersionJson(json) {
    try {
        var dict = JSON.parse(json);
        var currentVersion = chrome.app.getDetails().version;
        log("Processing latest version.json.");
        isRemoteShutdown = false;
        for (var i = 0, l = dict.shutdown_versions.length; i < l; i++) {
            var pattern = dict.shutdown_versions[i];
            if (checkVersionMatch(currentVersion, pattern)) {
                log("Remote shutdown activated for version(s) " + pattern);
                isRemoteShutdown = true;
            }
        }
        settings.set("isRemoteShutdown", JSON.stringify(isRemoteShutdown));
        remoteDisabledFeatures.length = 0;
        for (var k in dict.disabled_features) {
            if (!dict.disabled_features.hasOwnProperty(k))
                continue;
            if (!checkVersionMatch(currentVersion, k))
                continue;
            var featureList = dict.disabled_features[k];
            if (!Array.isArray(featureList))
                featureList = [featureList];
            log("Features remotely disabled for version(s) " + k + ":", JSON.stringify(featureList));
            for (var i = 0, l = featureList.length; i < l; i++)
                remoteDisabledFeatures.push(featureList[i]);
        }
        settings.set("remoteDisabledFeatures", JSON.stringify(remoteDisabledFeatures));
        settings.set("updateCheckDelay", JSON.stringify(dict.updateCheckDelay));
        return true;
    }
    catch (exc) {
        log("Failed to parse version.json", exc);
        return false;
    }
}
;
function injectStylesheetsIntoTab(sender) {
    var injectStylesheet = function (uri) {
        var cb = function () { };
        chrome.tabs.insertCSS(sender.tab.id, { file: uri, runAt: "document_start" }, cb);
    };
    // log(sender.tab.id, sender.url);
    var currentSettings = getAdjustedSettings();
    if (isRemoteShutdown || currentSettings.isShutdown)
        return;
    injectStylesheet("/content/viramate.css");
    injectStylesheet("/css/watch-button.css");
    if (currentSettings.condensedUI)
        injectStylesheet("/css/condensed-ui.css");
    if ((navigator.userAgent.indexOf("Chrome/53.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/54.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/55.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/56.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/57.0") >= 0) ||
        (navigator.userAgent.indexOf("Chrome/58.0") >= 0))
        injectStylesheet("/css/chrome-53.css");
    if (currentSettings.betterEnglishFont) {
        injectStylesheet("/content/lato-woff.css");
        injectStylesheet("/css/lato.css");
    }
    if (currentSettings.showGaugeOverlays)
        injectStylesheet("/content/gauge-overlays.css");
    if (currentSettings.showQuickPanels)
        injectStylesheet("/css/quick-panels.css");
    if (currentSettings.moveCoOpFooter)
        injectStylesheet("/css/move-coop-footer.css");
    if (currentSettings.enableCoOpEnhancements)
        injectStylesheet("/css/coop.css");
    if (currentSettings.smartSupports)
        injectStylesheet("/css/smart-supports.css");
    if (currentSettings.singlePageStickers)
        injectStylesheet("/css/single-page-stickers.css");
    if (currentSettings.keyboardShortcuts2)
        injectStylesheet("/css/keyboard.css");
    if (currentSettings.permanentTurnCounter)
        injectStylesheet("/css/permanent-turn-counter.css");
    if (currentSettings.disablePerCharacterOugiSkip)
        injectStylesheet("/css/per-character-ougi-skip.css");
    if (currentSettings.tinySupportSummons)
        injectStylesheet("/css/tiny-support-summons.css");
    if (currentSettings.popupPositionFix)
        injectStylesheet("/css/popup-position-fix.css");
    if (currentSettings.arcarumFix)
        injectStylesheet("/css/arcarum-fix.css");
    if (currentSettings.buttonSwipeFix)
        injectStylesheet("/css/skill-button-fix.css");
    if (currentSettings.hideMobageSidebar)
        injectStylesheet("/css/hide-mobage-sidebar.css");
    if (currentSettings.mistakeGuard)
        injectStylesheet("/css/mistake-guard.css");
    // chrome.tabs.insertCSS(tabId, {code: "body{border:1px solid red}"});
}

var stampInfo;
var kanaToRomajiTable;
var currentPointStandings = [];
var checkForTargetingAreaType = true;
var lastEnemyUIUpdate = -1, lastActionTimerUpdate = -1, lastBuffTimerUpdate = -1;
var targetingType = null;
var isPopupOpen = false;
var successfulAbilityCasts = [];
var raidBroadcastChannel = null;
var otherTabsOpen = false;
var loggedSuppressedSkipMessage = false;
var suppressedAutoSkipWhen = null;
var raidStateTimestamp = 0;
function processCombatPage() {
    if (!isCombatPage(window.location.hash))
        return;
    var turnHasChanged = combatState && (combatState.turn !== mostRecentTurn);
    if (combatState) {
        if (turnHasChanged)
            processTurnChange(combatState.turn);
        if (combatState.finish &&
            invalidateRaidList &&
            !hasInvalidatedRaidListAfterCombat) {
            hasInvalidatedRaidListAfterCombat = true;
            invalidateRaidList();
        }
        // force an update right after a battle finishes, since cooldowns tick once then too
        if (combatState.finish) {
            var current = combatState.attacking || combatState.usingAbility;
            updatePanels = updatePanels || (isAttackingLastUpdate && !current);
            isAttackingLastUpdate = current;
        }
    }
    // HACK: Sometimes the game tears down part of the raid UI, so we need to detect that
    //  and respond
    if (!raidContainer ||
        !document.body.contains(raidContainer)) {
        resetCachedElements();
        raidContainer = document.querySelector("div.cnt-raid");
        // Give it a frame to recover
        return;
    }
    if (!partyContainer)
        partyContainer = document.querySelector("div.prt-party");
    if (!partyContainer)
        return;
    if (!lisAbility)
        lisAbility = document.querySelector("div.lis-ability");
    if (!lisAbility)
        return;
    if (combatUIIsPrepared) {
        if (!partyIcons)
            partyIcons = partyContainer.querySelectorAll("div.btn-command-character");
        if (!skillContainers)
            skillContainers = document.querySelectorAll("div.prt-command-chara:not(.quick-panels)");
        if (partyStateIsDirty)
            refreshPartyUI(partyIcons, skillContainers);
        else
            tickPartyUI(partyIcons, skillContainers);
        if (raidBroadcastChannel == null)
            initRaidBroadcastChannel();
        processAutoAdvance();
        maybeUpdateConditions();
        var timeSinceLastUIUpdate = Date.now() - lastEnemyUIUpdate;
        var shouldUIUpdate = (timeSinceLastUIUpdate >= 250);
        if (shouldUIUpdate) {
            var popup = document.querySelector("div.pop-usual:not(.auto-hiding), div.btn-scroll, div.prt-command-end.retire");
            isPopupOpen = (popup && (popup.style.display === "block"));
        }
        if (turnHasChanged || shouldUIUpdate) {
            lastEnemyUIUpdate = Date.now();
            refreshEnemyUI();
            refreshButtonLocks();
        }
        var timeSinceLastActionTimerUpdate = Date.now() - lastActionTimerUpdate;
        if (timeSinceLastActionTimerUpdate >= 100)
            refreshActionTimer();
        var timeSinceLastDebuffTimerUpdate = Date.now() - lastDebuffTimerUpdate;
        if (timeSinceLastDebuffTimerUpdate >= 500)
            refreshConditionUI();
        var timeSinceLastBuffTimerUpdate = Date.now() - lastBuffTimerUpdate;
        if ((timeSinceLastBuffTimerUpdate >= 200) && areBuffTimersInvalid) {
            lastBuffTimerUpdate = Date.now();
            refreshPartyConditionUI();
        }
    }
}
;
function processTurnChange(turnIndex) {
    if (true) {
        var digits = String(turnIndex);
        var digitElements = document.querySelectorAll("div.prt-turn-info div.prt-number div");
        for (var i = 0, l = digitElements.length; i < l; i++) {
            var elt = digitElements[i];
            if (i < digits.length) {
                elt.className = "num-turn" + digits[i];
                elt.style.display = "";
            }
            else {
                elt.className = "";
                elt.style.display = "none";
            }
        }
    }
    // console.log("Turn #" + turnIndex);
    mostRecentTurn = turnIndex;
    // HACK: Otherwise we do it multiple times
    normalAttacking = false;
    partyStateIsDirty = true;
    pendingOneClickSummon = null;
    checkForTargetingAreaType = true;
    successfulAbilityCasts.length = 0;
    areBuffTimersInvalid = true;
    resetCachedElements();
    updateSettings();
    sendExtensionMessage({ type: "updateRaidCode", raidCode: combatState.raidCode });
}
;
function processAutoAdvance() {
    if (!combatState)
        return;
    if (!combatState.finish) {
        hasAutoAdvanced = false;
        return;
    }
    if (hasAutoAdvanced)
        return;
    if (luckyDay)
        return;
    if (!currentSettings.autoSkipToQuestResults)
        return;
    // A raid-triggered auto-skip is already on progress so we don't want to also click next
    if (autoSkipInProgress)
        return;
    if (suppressAutoSkip) {
        if (!loggedSuppressedSkipMessage) {
            log("Another window is already navigating to the results screen.");
            loggedSuppressedSkipMessage = true;
        }
        return;
    }
    var buttonContainer = document.querySelector("div.prt-command-end");
    var computedStyle = window.getComputedStyle(buttonContainer);
    if (computedStyle.getPropertyValue("display") !== "block")
        return;
    var button = buttonContainer.querySelector("div.btn-result");
    hasAutoAdvanced = true;
    // console.log("Wave finished, automatically advancing");
    window.setTimeout(function () {
        pulseElement(button);
        generateClick(button, true);
        generateClick(button, false);
    }, 600);
}
;
function prepareCombatUI() {
    getUserIdAndTabIdAsync(function (uid, tabId) {
        currentBattleUid = uid;
        currentBattleTabId = tabId;
    });
    waitForElementToExist(document, "div.cnt-raid-stage", function (stageWrapper) {
        var gameContainer = getGameContainer();
        var effectiveZoom = getEffectiveZoom(gameContainer);
        raidContainer = document.querySelector("div.cnt-raid");
        updateQuickPanelSize();
        if (raidContainer && currentSettings.largeQuickPanels) {
            if (raidContainer.className.indexOf("large-quick-panels") < 0)
                raidContainer.className += " large-quick-panels";
        }
        debuffTimerElement = getUiContainer().querySelector("div.debuff-timers");
        if (!debuffTimerElement || !document.body.contains(debuffTimerElement)) {
            debuffTimerElement = document.createElement("div");
            debuffTimerElement.className = "debuff-timers";
            debuffTimerElement.style.backgroundImage = "url('" + getResourceUrl("debuff-timers.png") + "')";
            debuffTimerElement.style.zoom = effectiveZoom.toFixed(3);
            injectElement(getUiContainer(), debuffTimerElement);
            lastDebuffTimerUpdate = -1;
        }
        else {
            debuffTimerElement.style.display = "block";
        }
        // HACK: A touch triggers both touch events and click events. When touching a party member
        // on the mobile site, the click is delayed enough to trigger after the skills are shown,
        // creating a pseudo double click and causing skills to be unintentionally clicked if the touch
        // is in the right place. Calling preventDefault() on a touchstart prevents the click events.
        if (isMobileSite()) {
            var party = document.querySelectorAll("div.prt-member > div.btn-command-character");
            for (var i = 0; i < party.length; i++) {
                party[i].addEventListener("touchstart", function (evt) {
                    evt.preventDefault();
                }, true);
            }
        }
        combatUIIsPrepared = true;
    }, false);
    var updatingStandings = false;
    waitForElementToExist(document, "div.pop-alliance-window", function (allianceWindow) {
        if (!currentPointStandings)
            return;
        if (updatingStandings)
            return;
        updatingStandings = true;
        window.setTimeout(function () {
            var entries = allianceWindow.querySelectorAll("div.lis-user");
            for (var i = 0, l = entries.length; i < l; i++) {
                var entry = entries[i];
                var pointText = "0";
                var id = entry.getAttribute("data-id");
                if (id) {
                    for (var j = 0, l2 = currentPointStandings.length; j < l2; j++) {
                        var ps = currentPointStandings[j];
                        if ((ps.user_id === id)) {
                            if (ps.is_dead) {
                                var nameText = entry.querySelector("div.txt-name");
                                nameText.className = "txt-name all-dead";
                            }
                            var roundedPoints = (Number(ps.point) / 1000).toFixed(0);
                            pointText = roundedPoints + "k";
                            break;
                        }
                    }
                }
                var rankText = entry.querySelector("div.txt-rank");
                rankText.appendChild(document.createElement("br"));
                rankText.appendChild(document.createTextNode(pointText));
            }
        }, 0);
        updatingStandings = false;
    }, true);
    waitForElementToExist(document, "textarea.frm-post-tweet", function (textbox) {
        if (!currentSettings.autofillBackupTweets)
            return;
        // HACK: The same selector will also find the AP refill dialog box
        var selectClass = document.querySelector("div.prt-select-tweet-text");
        if (selectClass)
            return;
        if (!combatState || !combatState.enemies.length)
            return;
        var prefilled = document.querySelector("div.txt-attention-comment");
        var prefilledText = prefilled.textContent.trim();
        var hp = -999999;
        for (var i = 0, l = combatState.enemies.length; i < l; i++) {
            var e = combatState.enemies[i];
            if (e.hpMax > hp) {
                hp = e.hpMax;
                if (prefilledText.indexOf(e.name.ja) >= 0)
                    textbox.textContent = e.name.en + " ";
                else
                    textbox.textContent = e.name.ja + " ";
            }
        }
    }, true);
    waitForElementToExist(document, "div.lis-stamp-slider", function (slider) {
        if (!currentSettings.disablePhalanxSticker)
            return;
        var hasPhalanx = isPhalanxAvailable();
        if (hasPhalanx)
            return;
        var phalanxStickers = slider.querySelectorAll('div.lis-stamp[chatid="22"]');
        for (var i = 0, l = phalanxStickers.length; i < l; i++) {
            var sticker = phalanxStickers[i];
            sticker.style.opacity = 0.4;
            sticker.style.pointerEvents = "none";
        }
    }, true);
    waitForElementToExist(document, "div.prt-battle-id", function (elt) {
        elt.addEventListener("mousedown", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            window.getSelection().selectAllChildren(elt);
        }, true);
        elt.addEventListener("click", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }, true);
        elt.addEventListener("mouseup", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }, true);
    }, true);
    if (currentSettings.singlePageStickers)
        setupStickerUI();
}
;
function kanaToRomaji(text) {
    var result = "";
    var tsu = false;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === "っ") {
            tsu = true;
            continue;
        }
        var ss = text.substr(i, 2);
        var romaji = null;
        if (ss.length === 2)
            romaji = kanaToRomajiTable[ss];
        if (!romaji) {
            romaji = kanaToRomajiTable[text[i]];
        }
        else {
            i += 1;
        }
        if (romaji) {
            if (tsu)
                romaji = romaji[0] + romaji;
            result += romaji;
        }
        else {
            if (tsu)
                ch += ch;
            result += ch;
        }
        tsu = false;
    }
    return result;
}
;
function setupStickerUI() {
    var searchField, body, allStamps;
    var filteredListElement = null;
    var lastFilterText = null;
    var updateStickerFilter = function () {
        var filterText = kanaToRomaji(searchField.value.toLowerCase());
        filterText = filterText
            .replace(/vyrn/g, "vii")
            .replace(/rakamu/g, "rackam")
            .replace(/eugen/g, "oigen")
            .replace(/['!\?\-\ー\’\！\？]/g, "")
            .trim();
        if (filterText === lastFilterText)
            return;
        lastFilterText = filterText;
        var desiredIndex = parseInt(filterText);
        if (!filteredListElement) {
            filteredListElement = document.createElement("div");
            body.querySelector("div.flex-viewport").appendChild(filteredListElement);
        }
        var isFiltering = (filterText && filterText.length);
        body.querySelector("div.prt-stamp-wrapper").style.display =
            isFiltering
                ? "none"
                : "block";
        filteredListElement.style.display =
            isFiltering
                ? "block"
                : "none";
        filteredListElement.innerHTML = "";
        if (!isFiltering)
            return;
        var row = null, k = 0;
        var keywords = filterText.split(" ");
        var matchingStamps = [];
        for (var i = 0, l = allStamps.length; i < l; i++) {
            var stamp = allStamps[i];
            var stampKeywords = stamp.getAttribute("keywords");
            if (!stampKeywords)
                continue;
            var failed = false;
            if (desiredIndex >= 0) {
                failed = desiredIndex !== parseInt(stamp.getAttribute("chatid"));
            }
            else {
                for (var j = 0, l2 = keywords.length; j < l2; j++) {
                    if (stampKeywords.indexOf(keywords[j]) < 0)
                        failed = true;
                }
            }
            if (failed)
                continue;
            var stampElement = stamp.cloneNode(true);
            stampElement.className += " show-number";
            if ((row === null) || ((k % 4) === 0)) {
                row = document.createElement("div");
                row.className = "lis-stamp-row";
                filteredListElement.appendChild(row);
            }
            if (k === 0)
                stampElement.className += " auto-selected";
            row.appendChild(stampElement);
            k++;
        }
    };
    waitForElementToExist(document, "div.pop-usual.pop-ready-stamp", function (popup) {
        filteredListElement = null;
        allStamps = null;
        lastFilterText = null;
        var notice = popup.querySelector("div.txt-notice");
        if (notice && !notice.title) {
            notice.title = notice.innerText.trim();
            notice.textContent = "";
        }
        searchField = popup.querySelector("input.stamp-filter");
        if (searchField)
            return;
        body = popup.querySelector("div.txt-popup-body");
        searchField = document.createElement("input");
        searchField.className = "stamp-filter";
        searchField.placeholder = "Search";
        searchField.incremental = true;
        searchField.type = "search";
        searchField.addEventListener("search", updateStickerFilter, true);
        body.insertBefore(searchField, body.firstChild);
        searchField.focus();
        allStamps = body.querySelectorAll("div.lis-stamp-row:not(.recent-stamps) div.lis-stamp");
        for (var i = 0, l = allStamps.length; i < l; i++) {
            var stamp = allStamps[i];
            stamp.setAttribute("displayIndex", i);
            var id = stamp.getAttribute("chatid");
            if (!id)
                continue;
            var keywords = stampInfo[id];
            if (!keywords)
                continue;
            stamp.setAttribute("keywords", keywords);
        }
        // popup.
    }, true);
}
;
function updateQuickPanelSize() {
    if (!raidContainer)
        return;
    var cn = "large-quick-panels";
    var masks = document.querySelectorAll("div.active-mask");
    if (currentSettings.largeQuickPanels) {
        raidContainer.classList.add(cn);
        for (var i = 0, l = masks.length; i < l; i++)
            masks[i].classList.add(cn);
    }
    else {
        raidContainer.classList.remove(cn);
        for (var i = 0, l = masks.length; i < l; i++)
            masks[i].classList.remove(cn);
    }
}
;
function scheduleGaugeTransplant(gauge, container) {
    var gameContainer = getGameContainer();
    var effectiveZoom = getEffectiveZoom(gameContainer);
    var tryTransplant;
    tryTransplant = function () {
        if (!container.parentNode)
            return;
        var parentCs = window.getComputedStyle(container.parentNode);
        if ((parentCs.display === "none")) {
            requestAnimationFrame(tryTransplant);
            return;
        }
        // We have to touch a property to force layout (???)
        var x = container.clientLeft;
        // HACK: Figure out where the numbers should go, then hoist them out
        //  so they are always visible
        var clientRect = container.getBoundingClientRect();
        var computedStyle = window.getComputedStyle(container);
        var fontSize = computedStyle.getPropertyValue("font-size");
        var raidBox = document.querySelector("div.cnt-raid-stage");
        var raidBoxRect = raidBox.getBoundingClientRect();
        var verticalOffset = gameContainer.parentNode.scrollTop / effectiveZoom;
        if (isHorizontalLayout())
            verticalOffset = (-48 / effectiveZoom);
        container.parentNode.removeChild(container);
        var left = (clientRect.left - raidBoxRect.left);
        var top = (clientRect.top + verticalOffset);
        /*
        // HACK: there is probably a better way to do this, and this'll probably break, needs testing
        // shifts up the number container by a few pixels to fix positioning on enemies with mode gauges in fights with multiple enemies
        if (combatState.enemies.length > 1 && container.querySelector("span.mode"))
            top -= 12;
        */
        container.style.position = "absolute";
        container.style.left = left.toFixed(1) + "px";
        container.style.top = top.toFixed(1) + "px";
        container.style.width = clientRect.width.toFixed(1) + "px";
        container.style.height = clientRect.height.toFixed(1) + "px";
        container.style.fontSize = fontSize;
        injectElement(getRaidUiContainer(), container);
        return true;
    };
    tryTransplant();
    // requestAnimationFrame(tryTransplant);
}
;
function refreshEnemyUI() {
    if (!combatState || !combatState.enemies)
        return;
    // HACK
    if (buffTimerElements) {
        var isPartyShown = commandTop && (commandTop.style.display !== "none");
        var hideBuffTimers = !isPartyShown ||
            combatState.attacking;
        for (var i = 0, l = buffTimerElements.length; i < l; i++) {
            if (hideBuffTimers ||
                (buffTimerElements[i].children.length === 0))
                buffTimerElements[i].style.opacity = "0.0";
            else
                buffTimerElements[i].style.opacity = "1.0";
        }
        if (hideBuffTimers)
            refreshBuffsButton.classList.add("hidden");
        else
            refreshBuffsButton.classList.remove("hidden");
    }
    var enemies = combatState.enemies;
    if (!enemyGauges)
        enemyGauges = document.querySelectorAll('div.btn-enemy-gauge:not(.prt-enemy-percent)');
    if (!enemyGauges)
        return;
    var gauges = enemyGauges;
    var sec = Math.floor(Date.now() / 1000);
    for (var i = 0, l = gauges.length; i < l; i++) {
        var gauge = gauges[i];
        var targetIndex = gauge.targetIndex;
        if (typeof (targetIndex) !== "number")
            gauge.targetIndex = targetIndex = parseInt(gauge.getAttribute("target"));
        var enemy = enemies[targetIndex - 1];
        var selector = "div.number-container[index='" + i + "']";
        var container = gauge.numberContainer;
        if (!container)
            container = document.querySelector(selector) ||
                getRaidUiContainer().querySelector(selector);
        if (!enemy ||
            (enemy.hp <= 0)) {
            if (container)
                container.style.display = "none";
            continue;
        }
        if (container &&
            combatState &&
            (typeof (combatState.turn) === "number")) {
            var computedStyle = window.getComputedStyle(gauge);
            if (
                // Why is this check necessary?
                (computedStyle.display === "block") &&
                ((container.turnIndex != combatState.turn) ||
                    (container.lastSecond != sec))) {
                container.parentNode.removeChild(container);
                container = null;
            }
        }
        if (!container) {
            if (!currentSettings.showGaugeOverlays)
                return;
            // HACK: The new percentage HP gauges have accurate padding for everything <3
            var paddingSource = gauges[i].paddingSource;
            if (!paddingSource) {
                gauges[i].paddingSource = paddingSource =
                    document.querySelector("div.btn-enemy-gauge.prt-enemy-percent[target='" + gauge.targetIndex + "']");
            }
            if (paddingSource) {
                var cs = window.getComputedStyle(paddingSource);
                var sourceTopPadding = parseFloat(cs.paddingTop.replace("px", ""));
                switch (enemies.length) {
                    case 1:
                        sourceTopPadding += 10;
                        break;
                    case 2:
                    case 3:
                        if (enemies[i].hasModeGauge)
                            sourceTopPadding -= 2.5;
                        else
                            sourceTopPadding += 1.5;
                        break;
                }
                gauge.style.paddingTop = sourceTopPadding.toFixed(1) + "px";
            }
            container = document.createElement("div");
            container.className = "number-container";
            container.turnIndex = combatState.turn;
            container.lastSecond = sec;
            container.setAttribute("index", i);
            gauge.numberContainer = container;
            gauge.appendChild(container);
            scheduleGaugeTransplant(gauge, container);
        }
        container.style.display = "block";
        var numeric = container.numeric;
        if (!numeric)
            container.numeric = numeric = container.querySelector("span.numeric");
        if (!numeric) {
            numeric = document.createElement("span");
            numeric.className = "numeric";
            if (currentSettings.highPrecisionHP) {
                numeric.setAttribute("type", "high-prec");
            }
            container.numeric = numeric;
            container.appendChild(numeric);
        }
        var percentage = container.percentage;
        if (!percentage)
            container.percentage = percentage = container.querySelector("span.percentage");
        if (!percentage) {
            percentage = document.createElement("span");
            percentage.className = "percentage";
            container.percentage = percentage;
            container.appendChild(percentage);
        }
        if (numeric.lastValue !== enemy.hp) {
            numeric.lastValue = enemy.hp;
            numeric.textContent = formatLargeNumber(enemy.hp, enemy.hpMax);
        }
        if (percentage.lastValue !== enemy.hp) {
            percentage.lastValue = enemy.hp;
            percentage.textContent = ((enemy.hp / enemy.hpMax) * 100)
                .toFixed(currentSettings.highPrecisionHP ? 2 : 1) + "%";
        }
        if (enemy.hasModeGauge) {
            var modeGauge = container.modeGauge;
            if (!modeGauge)
                container.modeGauge = modeGauge = container.querySelector("span.mode");
            if (!modeGauge) {
                modeGauge = document.createElement("span");
                modeGauge.className = "mode";
                container.modeGauge = modeGauge;
                container.appendChild(modeGauge);
            }
            if (modeGauge.lastValue !== enemy.gauge) {
                modeGauge.lastValue = enemy.gauge;
                modeGauge.textContent = enemy.gauge;
            }
        }
    }
    var shiftGauges = function () {
        if (targetingType === "m1" || targetingType.indexOf("2") >= 0 || targetingType.indexOf("3") >= 0) {
            for (var i = 0; i < gauges.length; i++) {
                if (!gauges[i].classList.contains("gauge-mode-override") && gauges[i].numberContainer) {
                    gauges[i].numberContainer.numeric.setAttribute("type", "high-prec-high");
                }
            }
        }
    };
    if (checkForTargetingAreaType) {
        if (currentSettings.highPrecisionHP) {
            targetingType = document.querySelector("div.prt-targeting-area").getAttribute("type");
            if (!targetingType) {
                // fix the shifting for high precision on some enemies since the css rules don't apply if shadowed
                // unfortunately, type isn't populated until later
                var areaObserver = new MutationObserver(function (mutations) {
                    // there should only ever be one mutation that applies
                    if (mutations.length !== 1) {
                        return;
                    }
                    areaObserver.disconnect();
                    var ga = mutations[0].target["getAttribute"];
                    if (ga)
                        targetingType = mutations[0].target["getAttribute"]("type");
                    shiftGauges();
                });
                areaObserver.observe(document.querySelector("div.prt-targeting-area"), { attributes: true, attributeFilter: ["type"] });
            }
        }
        checkForTargetingAreaType = false;
    }
    if (targetingType) {
        shiftGauges();
    }
}
;
function formatLargeNumber(value, maximum) {
    if (currentSettings.highPrecisionHP) {
        // add thousands separator for readability
        value = Math.floor(value).toLocaleString("en-US", { maximumFractionDigits: 0, useGrouping: true });
        maximum = (maximum / 1000).toLocaleString("en-US", { maximumFractionDigits: 1, useGrouping: true });
        return value + "/" + maximum + "k";
    }
    if (maximum >= 90000000) {
        return (value / 1000000).toFixed(2) + "m";
    }
    else if (maximum >= 10000000) {
        return (value / 1000000).toFixed(3) + "m";
    }
    else if (maximum >= 20000) {
        return (value / 1000).toFixed(1) + "k";
    }
    else {
        return Math.floor(value).toLocaleString();
    }
}
;
function canUseAbility() {
    if (!combatState)
        return false;
    if (combatState.btn_lock)
        return false;
    else if (combatState.attacking)
        return false;
    else if (combatState.usingAbility)
        return false;
    else if (combatState.finish)
        return false;
    return true;
}
;
function processQuestStagePage() {
}
;
function hideActionTimer() {
    if (actionTimerElement)
        actionTimerElement.style.opacity = 0.0;
}
;
function refreshActionTimer() {
    var now = Date.now();
    lastActionTimerUpdate = now;
    if (!currentSettings.showLastActionTimer)
        return hideActionTimer();
    if (!combatState)
        return hideActionTimer();
    if (combatState.finish)
        return hideActionTimer();
    /*
    if (isActionInProgress !== false)
        return hideActionTimer();
    */
    if (!currentBattleUid)
        return hideActionTimer();
    /*
    if (hasAnActionSucceeded)
        return hideActionTimer();
    */
    var cua = canUseAbility();
    if (isActionAnimating) {
        if (cua) {
            isActionAnimating = false;
            if (currentActionId) {
                sendExtensionMessage({
                    type: "actionCompletedAnimation",
                    uid: currentBattleUid,
                    actionId: currentActionId || previousActionId
                });
                previousActionId = currentActionId;
                currentActionId = null;
            }
        }
    }
    if (!lastActionTimestamps) {
        sendExtensionMessage({ type: "getLastActionTimestamps", uid: currentBattleUid }, function (result) {
            lastActionTimestamps = result;
            refreshActionTimer();
        });
        return hideActionTimer();
    }
    if (currentActionId &&
        ((lastActionTimestamps.successfulActionId === currentActionId) ||
            (lastActionTimestamps.actionId === currentActionId)) &&
        (!otherTabsOpen && !currentSettings.alwaysShowActionTimer))
        return hideActionTimer();
    if (!lastActionTimestamps.actionId && !lastActionTimestamps.successfulActionId)
        return hideActionTimer();
    var started = lastActionTimestamps.successfulStarted ||
        lastActionTimestamps.started;
    if (!started)
        return hideActionTimer();
    if (lastSuccessfulActionStartedWhen >= started) {
        if ((lastSuccessfulActionStartedWhen == started) && currentSettings.alwaysShowActionTimer) {
        }
        else
            return hideActionTimer();
    }
    var elapsed = now - started;
    if (elapsed >= 30 * 1000)
        return hideActionTimer();
    if (actionTimerElement && !getRaidUiContainer().contains(actionTimerElement))
        actionTimerElement = null;
    if (!actionTimerElement) {
        actionTimerElement = document.createElement("div");
        actionTimerElement.className = "action-timer";
        actionTimerElement.style.opacity = 1.0;
        injectElement(getRaidUiContainer(), actionTimerElement);
    }
    actionTimerElement.textContent = (elapsed / 1000).toFixed(2);
    actionTimerElement.style.opacity = 1.0;
}
;
var broadcastTabId;
function sendBroadcastMessage(msg) {
    if (!raidBroadcastChannel)
        initRaidBroadcastChannel();
    if (!raidBroadcastChannel)
        return;
    msg.senderId = broadcastTabId;
    raidBroadcastChannel.postMessage(msg);
}
;
function initRaidBroadcastChannel() {
    if (!combatState || !combatState.raid_id)
        return;
    if (typeof (BroadcastChannel) !== "function")
        return;
    broadcastTabId = Math.random() + ":" + Date.now();
    raidBroadcastChannel = new BroadcastChannel(combatState.raid_id);
    raidBroadcastChannel.addEventListener("message", onRaidBroadcastMessage, false);
    sendBroadcastMessage({ type: "ping" });
    refreshActionTimer();
}
;
function trySuppressAutoSkip() {
    if (suppressedAutoSkipWhen)
        return;
    suppressedAutoSkipWhen = Date.now();
    sendBroadcastMessage({ type: "suppressAutoSkip", ts: suppressedAutoSkipWhen });
}
;
function onRaidBroadcastMessage(evt) {
    if (evt.data.senderId === broadcastTabId)
        return;
    var type = evt.data.type;
    switch (type) {
        case "partyStateChanged":
            var data = evt.data;
            if (data.ts < raidStateTimestamp) {
                log("Discarded outdated raid state broadcast");
                return;
            }
            else {
                log("Processing raid state broadcast");
                raidStateTimestamp = data.ts;
            }
            var oldFormation = lastPartyFormation;
            var oldParam = lastPartyParam;
            lastPartyAbilityState = data.lastPartyAbilityState;
            lastPartyFormation = data.lastPartyFormation;
            lastPartyParam = data.lastPartyParam;
            parseServerPlayerState(false);
            partyStateIsDirty = true;
            window.setTimeout(function () {
                applyPartyParamToUi(oldFormation, oldParam, lastPartyFormation, lastPartyParam);
            }, 1);
            return;
        case "suppressAutoSkip":
            if ((!suppressedAutoSkipWhen) || (suppressedAutoSkipWhen > evt.data.ts)) {
                log("Lost the race to load raid results");
                suppressAutoSkip = true;
            }
            else {
                log("Ignoring spurious auto-skip suppression (won the race)");
            }
            return;
        case "ping":
            otherTabsOpen = true;
            return;
        default:
            log(evt.data);
    }
}
;
function applyPartyParamToUi(oldFormation, oldParam, newFormation, newParam) {
    for (var i = 0; i < 4; i++) {
        var characterIndex = newFormation[i];
        if (typeof (characterIndex) !== "string")
            continue;
        var index = parseInt(characterIndex);
        if ((index < 0) || (index >= newParam.length))
            continue;
        var param = newParam[index];
        var characterElement = document.querySelector("div.lis-character" + i);
        if (!characterElement)
            continue;
        var hp = param.hp;
        if (characterIndex !== oldFormation[i]) {
            // Dead or character in position changed
            hp = 0;
        }
        var hpText = characterElement.querySelector("div.txt-hp-value");
        hpText.textContent = hp;
        var hpBar = characterElement.querySelector("div.prt-gauge-hp-inner");
        hpBar.style.width = (hp / param.hpMax * 100).toFixed(1) + "%";
        var ougiText = characterElement.querySelector("span.txt-gauge-value");
        ougiText.textContent = param.recast;
        var ougiBar = characterElement.querySelector("div.prt-gauge-special-inner");
        ougiBar.style.width = Math.min(100, param.recast).toFixed(1) + "%";
        var ougiShine = characterElement.querySelector("div.prt-shine");
        ougiShine.style.display = (param.recast >= 100) ? "block" : "none";
    }
}

var previousConditions = null;
var previousConditionsTimestamps = null;
// If something seems to have changed (condition added/removed) we'll recheck this often at most
var fastConditionRefreshInterval = 4000;
// When it seems like buffs may expire soon we recheck to see if they were recast
var slowConditionRefreshInterval = 15000;
var isFieldEffectUpdatePending = false;
var currentFieldEffectsTimestamp = 0;
var currentFieldEffects = null;
var areBuffTimersInvalid = true;
function areTimersEnabled() {
    return currentSettings.showDebuffTimers ||
        currentSettings.showBuffTimers;
}
;
// Javascript is great
function areArraysEqual(lhs, rhs) {
    if (!lhs || !rhs)
        return (lhs === rhs);
    if (lhs.length !== rhs.length)
        return false;
    for (var i = 0; i < lhs.length; i++) {
        if (lhs[i] !== rhs[i])
            return false;
    }
    return true;
}
;
function maybeUpdateConditions() {
    if (!canUseAbility())
        return;
    // Don't start an update if debuff timers are disabled
    if (areTimersEnabled()) {
        maybeInvalidateEnemyConditions();
        if (combatState && combatState.enemies)
            for (var i = 0, l = Math.min(currentConditions.enemy.length, combatState.enemies.length); i < l; i++)
                currentConditions.enemy[i].tick(combatState.enemies[i].id);
    }
    if (combatState &&
        currentSettings.showPartyHelp)
        for (var i = 0, l = currentConditions.party.length | 0; i < l; i++)
            currentConditions.party[i].tick();
}
;
function ConditionRecord(category, index) {
    this.id = null;
    this.turn = null;
    this.category = category | 0;
    this.index = index | 0;
    this.emptySet = (category === 0) ? {} : [];
    this.state = this.emptySet;
    this.timestamp = null;
    this.updateRequested = false;
    this.slowUpdateRequested = false;
    this.pending = false;
    this.failureCount = 0;
    this.failedConditionUpdate = false;
}
;
ConditionRecord.prototype.reset = function (id) {
    this.turn = combatState.turn;
    this.id = id;
    this.state = this.emptySet;
    this.timestamp = Date.now();
    this.updateRequested = false;
    this.slowUpdateRequested = false;
};
ConditionRecord.prototype.getUrl = function () {
    var prefix;
    if (combatState.is_semi) {
        prefix = "rest/semiraid";
    }
    else if (combatState.is_multi) {
        prefix = "rest/multiraid";
    }
    else {
        prefix = "rest/raid";
    }
    var url;
    if (this.category === 0) {
        if (this.index >= combatState.party.length)
            return;
        // Player condition indexes are indexes into the full party, not the front row
        var fullPartyIndex = combatState.characterIds.indexOf(combatState.party[this.index].pid);
        if (fullPartyIndex < 0)
            return;
        url = prefix + "/condition/" + combatState.raid_id + "/" + this.category + "/" + fullPartyIndex + ".json";
    }
    else {
        // Enemy
        url = prefix + "/condition/" + combatState.raid_id + "/" + this.category + "/" + this.index + ".json";
    }
    return url;
};
ConditionRecord.prototype.isUpdateNeeded = function (id) {
    var now = Date.now();
    if (this.pending)
        return false;
    if (!this.timestamp)
        return true;
    var timeSinceLastUpdate = now - this.timestamp;
    if (timeSinceLastUpdate <= fastConditionRefreshInterval)
        return false;
    if ((timeSinceLastUpdate >= slowConditionRefreshInterval) &&
        this.slowUpdateRequested) {
        // log("Slow update triggered for conditions");
        return true;
    }
    if (this.updateRequested)
        return true;
    // FIXME: It's not really necessary to do this every turn... we could be smarter
    if (this.turn &&
        combatState &&
        (combatState.turn > this.turn))
        return true;
    if (this.id !== id)
        return true;
    return false;
};
ConditionRecord.prototype.maybeLogPartyConditions = function (result, error) {
    if (!result)
        log(error);
    else if (result.condition && result.condition.buff && false)
        log(this.index, result.condition.buff.map(function (e) {
            return e.detail;
        }));
};
var pendingPartyConditionUpdates = 0;
ConditionRecord.prototype.update = function (id) {
    if (this.pending)
        throw new Error("Duplicate update");
    var turn = combatState.turn;
    // This would be more correct, but we need backpressure for server lag
    // var timestamp = Date.now();
    var previousConditions = this.requestPreviousConditions;
    var pct = this.timestamp;
    var self = this;
    var url = this.getUrl();
    // console.log("Update " + url, this);
    if (!url) {
        if (!this.failedConditionUpdate)
            log("Can't perform condition update because character index could not be found");
        this.failedConditionUpdate = true;
        return;
    }
    this.requestPreviousConditions = null;
    this.updateRequested = false;
    this.slowUpdateRequested = false;
    this.pending = true;
    if (this.category === 0) {
        pendingPartyConditionUpdates += 1;
        refreshBuffsButtonAnimation();
        // log("Updating party conditions for " + this.index);
    }
    if (this.failureCount >= 2) {
        log("Failed too many condition updates. Giving up.");
        this.failedConditionUpdate = true;
        return;
    }
    doClientAjax(url, function (result, error, _url) {
        if (self.category === 0) {
            pendingPartyConditionUpdates -= 1;
            refreshBuffsButtonAnimation();
            self.maybeLogPartyConditions(result, error);
            areBuffTimersInvalid = true;
        }
        if (previousConditions) {
            previousConditions[self.id || id] = previousConditions;
            previousConditionsTimestamps[self.id || id] = pct;
        }
        self.timestamp = Date.now();
        self.pending = false;
        self.id = id;
        self.turn = turn;
        if (error) {
            self.failedConditionUpdate = true;
            self.failureCount += 1;
            log("Condition update failed", error);
        }
        // console.log("Update complete", result, error);
        if (result && !error) {
            self.state = result.condition;
            return;
        }
        self.state = self.emptySet;
    });
};
ConditionRecord.prototype.tick = function (id) {
    if (this.isUpdateNeeded(id))
        this.update(id);
};
function shouldBuffsButtonAnimate() {
    return (pendingPartyConditionUpdates > 0) ||
        currentConditions.party.some(function (e) {
            return e.updateRequested || e.slowUpdateRequested;
        });
}
;
function refreshBuffsButtonAnimation() {
    if (!refreshBuffsButton)
        return;
    var isAnimating = refreshBuffsButton.className.indexOf("spinning") >= 0;
    var shouldAnimate = shouldBuffsButtonAnimate();
    if (isAnimating === shouldAnimate)
        return;
    if (isAnimating) {
        refreshBuffsButton.addEventListener("animationiteration", function () {
            if (!shouldBuffsButtonAnimate())
                refreshBuffsButton.classList.remove("spinning");
        }, false);
    }
    else {
        refreshBuffsButton.classList.add("spinning");
    }
}
;
function maybeInvalidateEnemyConditions() {
    if (!combatState || !combatState.enemies)
        return;
    var enemies = combatState.enemies;
    var enemyCount = enemies.length;
    if (enemyCount <= 0)
        return;
    if (!previousConditions)
        previousConditions = {};
    if (!previousConditionsTimestamps)
        previousConditionsTimestamps = {};
    for (var i = 0, l = enemyCount; i < l; i++) {
        var enemy = enemies[i];
        var _previousConditions = previousConditions[enemy.id];
        var cce = currentConditions.enemy[i];
        if ((enemy.hp <= 0) || (enemy.conditions.length === 0)) {
            cce.reset(enemy.id);
            continue;
        }
        // FIXME: Unnecessarily slow
        enemy.conditions.sort();
        if (_previousConditions)
            _previousConditions.sort();
        var needsUpdate = false;
        if (!_previousConditions)
            needsUpdate = true;
        else if (!areArraysEqual(enemy.conditions, _previousConditions))
            needsUpdate = true;
        if (needsUpdate) {
            if (cce.updateRequested)
                continue;
            // HACK: Is this right?
            if (cce.pending) {
                cce.requestPreviousConditions = enemy.conditions;
                continue;
            }
            // HACK: Is this right either?
            if (areArraysEqual(enemy.conditions, cce.requestPreviousConditions))
                continue;
            /*
            log(
                "Requesting update because condition list changed\n",
                enemy.conditions.join(",") + "\n", _previousConditions ? _previousConditions.join(",") : "null"
            );
            */
            cce.requestPreviousConditions = enemy.conditions;
            cce.updateRequested = true;
        }
    }
}
;
function getExpiresWhen(timestamp, _remain) {
    var remainSeconds = 0;
    var remain = String(_remain);
    var colonOffset = remain.indexOf(":");
    if (colonOffset > 0) {
        var minutes = parseFloat(remain.substr(0, colonOffset));
        remainSeconds += minutes * 60;
        var seconds = parseFloat(remain.substr(colonOffset + 1));
        remainSeconds += seconds;
    }
    else {
        var seconds = parseFloat(remain);
        remainSeconds += seconds;
    }
    return timestamp + (remainSeconds * 1000);
}
;
function ConditionTableEntry(expiresWhen, name, status) {
    this.expiresWhen = expiresWhen;
    this.name = name;
    this.status = status;
    this.count = 1;
}
;
function _updateConditionDict(enemyIndex, enemyConditions, dict, now, dedupe, prefix) {
    var expiredCount = 0;
    for (var j = 0, l2 = enemyConditions.length; j < l2; j++) {
        var condition = enemyConditions[j];
        var key = prefix + condition.status;
        // Handle non-expiring buffs/debuffs like Treasure Hunt and ignore turn-based ones
        if (condition.remain <= 0 || condition.class !== "time")
            continue;
        var expiresWhen = getExpiresWhen(currentConditions.enemy[enemyIndex].timestamp, condition.remain);
        // Ignore expired debuffs
        if (expiresWhen <= now) {
            expiredCount++;
            continue;
        }
        var entry = new ConditionTableEntry(expiresWhen, condition.name, condition.status);
        if (dedupe) {
            var existing = dict.get(key);
            if (!existing || (existing.expiresWhen > expiresWhen)) {
                if (existing)
                    entry.count = existing.count + 1;
                dict.set(key, entry);
            }
            else if (existing)
                existing.count += 1;
        }
        else {
            dict.set(prefix + j, entry);
        }
    }
    return expiredCount;
}
;
function _updateConditionDictForEnemy(i, dict, now, dedupe) {
    var cc = currentConditions.enemy[i].state;
    if (!cc)
        return 0;
    var expiredCount = 0;
    if (cc.debuff && currentSettings.showDebuffTimers)
        expiredCount += _updateConditionDict(i, cc.debuff, dict, now, dedupe, "debuff");
    if (cc.buff && currentSettings.showBuffTimers)
        expiredCount += _updateConditionDict(i, cc.buff, dict, now, dedupe, "buff");
    return expiredCount;
}
;
var conditionDict = new Map();
var enemyPortrait = null;
function refreshConditionUI() {
    var now = Date.now();
    lastDebuffTimerUpdate = now;
    refreshFieldEffectUI();
    if (!areTimersEnabled() ||
        !combatState ||
        !combatState.enemies ||
        combatState.finish ||
        (currentConditions.enemy.length === 0)) {
        debuffTimerElement.style.opacity = 0.0;
        return;
    }
    var dict = conditionDict;
    dict.clear();
    var filter = (currentSettings.filterEnemyTimers &&
        (combatState.target > 0) &&
        (combatState.enemies[combatState.target - 1]) &&
        (combatState.enemies[combatState.target - 1].hp > 0));
    var targetEnemyIndex = combatState.target - 1;
    var remainingTargets = 0;
    var remainingTarget = 0;
    for (var i = 0; i < combatState.enemies.length; i++) {
        if (combatState.enemies[i] && combatState.enemies[i].hp > 0) {
            remainingTargets += 1;
            remainingTarget = i;
        }
    }
    if (remainingTargets === 1) {
        filter = true;
        targetEnemyIndex = remainingTarget;
    }
    var cce;
    var expiredCount;
    if (filter) {
        expiredCount = _updateConditionDictForEnemy(targetEnemyIndex, dict, now, false);
        cce = currentConditions.enemy[targetEnemyIndex];
        if (expiredCount && !cce.slowUpdateRequested) {
            // log("Requesting slow update because buffs have expired");
            cce.slowUpdateRequested = true;
        }
    }
    else {
        for (var i = 0, l = currentConditions.enemy.length; i < l; i++) {
            cce = currentConditions.enemy[i];
            expiredCount = _updateConditionDictForEnemy(i, dict, now, true);
            if (expiredCount && !cce.slowUpdateRequested) {
                // log("Requesting slow update because buffs have expired");
                cce.slowUpdateRequested = true;
            }
        }
    }
    if (dict.size <= 0) {
        debuffTimerElement.style.opacity = 0.0;
        if (debuffTimerElement.firstChild)
            debuffTimerElement.innerHTML = "";
        return;
    }
    else {
        debuffTimerElement.style.opacity = 1.0;
        // FIXME: Stop using innerHTML
        debuffTimerElement.innerHTML = "";
    }
    if (filter) {
        if (!enemyPortrait) {
            enemyPortrait = document.createElement("img");
            enemyPortrait.className = "enemy-portrait";
        }
        var newSrc = "http://game-a1.granbluefantasy.jp/assets_en/img/sp/assets/enemy/s/" +
            combatState.enemies[targetEnemyIndex].cjs.replace("enemy_", "") +
            ".png";
        if (newSrc != enemyPortrait.src)
            enemyPortrait.src = newSrc;
        debuffTimerElement.appendChild(enemyPortrait);
    }
    var entries = [];
    for (var _ of dict)
        entries.push(_[1]);
    entries.sort(function (lhs, rhs) {
        return lhs.expiresWhen - rhs.expiresWhen;
    });
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var debuffId = entry.status.trim();
        if (debuffId.length < 1)
            continue;
        var backgroundStyle = "url('http://game-a1.granbluefantasy.jp/assets_en/img/sp/ui/icon/status/x64/status_" +
            debuffId +
            ".png')";
        var elt = document.createElement("div");
        elt.className = "debuff-timer";
        elt.style.backgroundImage = backgroundStyle;
        var expiresWhen = entry.expiresWhen;
        var actualSecondsLeft = (expiresWhen - now) / 1000;
        elt.textContent = actualSecondsLeft.toFixed(0);
        elt.style.opacity = "1.0";
        if (entry.count > 1) {
            elt.title = entry.name + " (x" + entry.count + ")";
        }
        else {
            elt.title = entry.name;
        }
        debuffTimerElement.appendChild(elt);
    }
}
;
function requestBuffsRefresh() {
    areBuffTimersInvalid = true;
    var ccp = currentConditions.party;
    for (var i = 0; i < ccp.length; i++) {
        var cc = ccp[i];
        cc.updateRequested = true;
    }
    refreshBuffsButtonAnimation();
}
;
function refreshPartyConditionUI() {
    if (!currentSettings.showPartyHelp)
        return;
    if (!combatState || !combatState.party)
        return;
    areBuffTimersInvalid = false;
    // log("Buff timers updating");
    var bte;
    if (!buffTimerElements)
        buffTimerElements = [];
    if (!refreshBuffsButton) {
        refreshBuffsButton = document.createElement("img");
        refreshBuffsButton.className = "refresh-buffs";
        refreshBuffsButton.src = getResourceUrl("refresh.png");
        refreshBuffsButton.title = "Refresh buffs";
        refreshBuffsButton.addEventListener("click", requestBuffsRefresh, false);
        injectElement(getRaidUiContainer(), refreshBuffsButton);
        refreshBuffsButtonAnimation();
    }
    for (var i = 0; i < combatState.party.length; i++) {
        var alreadyProcessed = new Set();
        var player = combatState.party[i];
        if (!player) {
            areBuffTimersInvalid = true;
            continue;
        }
        bte = buffTimerElements[i];
        if (!bte)
            buffTimerElements[i] = bte = getRaidUiContainer().querySelector("div.buff-timers[index='" + i + "']");
        if (!bte) {
            buffTimerElements[i] = bte = document.createElement("div");
            bte.className = "buff-timers";
            bte.setAttribute("index", i);
            var charElement = document.querySelector("div.lis-character" + i);
            if (!charElement) {
                areBuffTimersInvalid = true;
                continue;
            }
            bte.style.opacity = "0.0";
            injectElement(getRaidUiContainer(), bte);
            /*
            var pn = <HTMLElement>(charElement.parentNode);
            var statusPanel = pn.querySelector(".prt-status.prt-condition");
            // Open when timers are clicked
            */
        }
        bte.innerHTML = "";
        if (!refreshPlayerBuffTimers(player, i, bte, alreadyProcessed))
            areBuffTimersInvalid = true;
    }
}
;
function sortByRemainAscending(lhs, rhs) {
    if (!lhs || !rhs)
        return 0;
    if (lhs.remain < rhs.remain)
        return -1;
    else if (lhs.remain > rhs.remain)
        return 1;
    if (lhs.status < rhs.status)
        return -1;
    else if (lhs.status > rhs.status)
        return 1;
    return 0;
}
;
function refreshPlayerBuffTimers(player, index, bte, alreadyProcessed) {
    if (!currentConditions || !currentConditions.party)
        return false;
    var cc = currentConditions.party[index];
    if (!cc)
        return false;
    cc = cc.state;
    if (cc.buff)
        cc.buff.sort(sortByRemainAscending);
    if (cc.debuff)
        cc.debuff.sort(sortByRemainAscending);
    if (cc.buff && false)
        log("refresh " + index, cc.buff.map(function (e) {
            return e.detail;
        }));
    processSpecialBuffs(player, cc, bte, alreadyProcessed);
    if (!cc.buff)
        return true;
    var previousStatus = null, previousRemain = null, previousElt = null;
    var n = bte.children.length;
    for (var i = 0, l = cc.buff.length; i < l; i++) {
        var buff = cc.buff[i];
        if (!buff.remain) {
            previousStatus = null;
            previousRemain = null;
            continue;
        }
        if (alreadyProcessed.has(buff))
            continue;
        var elt = makeBuffTimer(buff);
        if ((buff.status === previousStatus) &&
            (buff.remain === previousRemain)) {
            elt.title = previousElt.title + "\r\n" + elt.title;
            previousElt.className += " stacked";
            previousElt.title = "";
            previousElt.setAttribute("remain", "");
            n--;
        }
        previousStatus = buff.status;
        previousRemain = buff.remain;
        previousElt = elt;
        if (n < 4)
            bte.appendChild(elt);
        n++;
    }
    return true;
    // console.log(cc.buff.map(function (x) { return x.remain + " " + x.detail; }).join(","));
}
;
var characterSpecialBuffHandlers = {
    // Beatrix
    "3040070000": processSpecialBuffs_Beatrix
};
function processSpecialBuffs(player, cc, bte, alreadyProcessed) {
    processSpecialBuffs_Phalanx(player, cc, bte, alreadyProcessed);
    var handler = characterSpecialBuffHandlers[player.pid];
    if (handler)
        handler(player, cc, bte, alreadyProcessed);
}
;
function makeBuffTimer(obj, statusOverride) {
    var elt = document.createElement("div");
    elt.className = "buff-timer";
    elt.title = obj.detail;
    elt.style.backgroundImage = "url('" +
        "http://game-a1.granbluefantasy.jp/assets_en/img/sp/ui/icon/status/x64/status_" +
        (statusOverride || obj.status) + ".png')";
    elt.setAttribute("remain", obj.remain);
    return elt;
}
;
/* http://game-a.granbluefantasy.jp/assets_en/img/sp/ui/icon/ability/m/37_3.png?1475811018 */
function processSpecialBuffs_Phalanx(player, cc, bte, alreadyProcessed) {
    if (!cc.buff)
        return;
    var phalanx = cc.buff.find(function (elt) {
        return (elt.status === "1019_0_70") || (elt.status === "1019_0_100");
    });
    var athena = cc.buff.find(function (elt) {
        return (elt.status === "1019_0_30") || (elt.status === "1019_0_100");
    });
    if (!phalanx)
        return;
    alreadyProcessed.add(phalanx);
    if (athena && (athena !== phalanx))
        alreadyProcessed.add(athena);
    var icon = makeBuffTimer(phalanx, athena
        ? "1019_0_100"
        : null);
    icon.className += " phalanx";
    icon.title = athena ? "100% cut" : "70% cut";
    bte.appendChild(icon);
}
;
var beatrixClocks = {
    "14701": "Nayde Null",
    "14702": "Nayde Neli",
    "14703": "Nayde Seitse",
};
function processSpecialBuffs_Beatrix(player, cc, bte, alreadyProcessed) {
    if (!cc.buff)
        return;
    var currentClock = cc.buff.find(function (elt) {
        return (elt.remain === 0) &&
            !!beatrixClocks[elt.status];
    });
    if (!currentClock)
        return;
    alreadyProcessed.add(currentClock);
    var clockIcon = makeBuffTimer(currentClock);
    clockIcon.className += " special-buff";
    clockIcon.title = beatrixClocks[currentClock.status];
    cc.buff.forEach(function (elt) {
        if ((elt.status === currentClock.status) && (elt.remain === 1)) {
            alreadyProcessed.add(elt);
            clockIcon.title += "\r\n" + elt.detail;
        }
    });
    bte.appendChild(clockIcon);
}
;
var isFieldEffectUpdateInProgress = false;
var lastFieldEffectUpdateWhen = 0;
function getFieldEffectReadout(cfe, remainingMs, remainingText) {
    if ((cfe.status !== "5004") && (cfe.status !== "5004_02"))
        return "";
    var tiers;
    if (cfe.status === "5004_02") {
        tiers = [
            [120 + 45, 15],
            [120 + 35, 50],
            [120 + 15, 20],
            [120 + 5, 75],
            [60 + 50, 25],
            [60 + 36, 100],
            [60 + 20, 30],
            [60, 10],
            [45, 5],
            [30, 20],
            [20, 10],
            [5, 30]
        ];
    }
    else {
        tiers = [
            [120 + 45, 10],
            [120 + 35, 5],
            [120 + 15, 20],
            [120 + 5, 10],
            [60 + 50, 30],
            [60 + 35, 15],
            [60 + 20, 50],
            [60, 20],
            [45, 75],
            [30, 25],
            [20, 100],
            [5, 30]
        ];
    }
    var percentage = 10;
    var remainingSecs = remainingMs / 1000;
    for (var i = 0; i < tiers.length; i++) {
        if (remainingSecs >= tiers[i][0]) {
            percentage = tiers[i][1];
            break;
        }
    }
    return percentage + "%";
}
;
function refreshFieldEffectUI() {
    if (!currentSettings.showFieldEffectTimers)
        return;
    var now = Date.now();
    var canUpdateFieldEffects = (now - lastFieldEffectUpdateWhen) >= 12500;
    if (isFieldEffectUpdatePending &&
        !isFieldEffectUpdateInProgress &&
        canUpdateFieldEffects) {
        isFieldEffectUpdatePending = false;
        lastFieldEffectUpdateWhen = now;
        var prefix;
        if (combatState.is_semi) {
            prefix = "/rest/semiraid";
        }
        else if (combatState.is_multi) {
            prefix = "/rest/multiraid";
        }
        else {
            prefix = "/rest/raid";
        }
        isFieldEffectUpdateInProgress = true;
        var url = prefix + "/field_effect/" + combatState.raid_id;
        // log("Updating field effects");
        doClientAjax(url, function (result, error, _url) {
            isFieldEffectUpdateInProgress = false;
            refreshFieldEffectUI();
        });
        return;
    }
    if (!currentFieldEffects ||
        (currentFieldEffects.length === 0)) {
        if (fieldEffectsPanel)
            fieldEffectsPanel.style.display = "none";
        return;
    }
    if (!fieldEffectsPanel) {
        fieldEffectsPanel = document.createElement("div");
        fieldEffectsPanel.className = "field-effects";
        injectElement(getRaidUiContainer(), fieldEffectsPanel);
    }
    else {
        fieldEffectsPanel.style.display = "block";
    }
    fieldEffectsPanel.innerHTML = "";
    for (var i = 0, l = currentFieldEffects.length; i < l; i++) {
        var cfe = currentFieldEffects[i];
        if (!cfe)
            continue;
        var remaining = cfe.expiresWhen - now;
        if (remaining <= 0) {
            currentFieldEffects[i] = null;
            if (!isFieldEffectUpdatePending) {
                // log("Field effect expired so scheduling update");
                isFieldEffectUpdatePending = true;
            }
            continue;
        }
        var remainingText = Math.floor(remaining / 1000) + "s";
        var elt = document.createElement("div");
        elt.className = "field-effect";
        elt.title = cfe.detail + " (" + remainingText + ")";
        elt.setAttribute("readout", getFieldEffectReadout(cfe, remaining, remainingText));
        var icon = document.createElement("img");
        icon.className = "icon";
        icon.src = "http://game-a1.granbluefantasy.jp/assets_en/img/sp/ui/icon/field_effect/status_" + cfe.status + ".png";
        var fill = document.createElement("div");
        fill.className = "fill";
        fill.style.width = (remaining / cfe.originalDuration * 100).toFixed(2) + "%";
        elt.appendChild(fill);
        elt.appendChild(icon);
        fieldEffectsPanel.appendChild(elt);
    }
}

var encoding = Object.create(null);
encoding.UTF8 = Object.create(null);
encoding.Base64 = Object.create(null);
encoding.fromCharCode = function fixedFromCharCode(codePt) {
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/fromCharCode
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    }
    else {
        return String.fromCharCode(codePt);
    }
};
encoding.charCodeAt = function fixedCharCodeAt(str, idx) {
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charCodeAt
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;
    if (0xD800 <= code && code <= 0xDBFF) {
        // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)  
        hi = code;
        low = str.charCodeAt(idx + 1);
        if (isNaN(low))
            throw new Error("High surrogate not followed by low surrogate");
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
        // Low surrogate  
        // We return false to allow loops to skip this iteration since should have already handled high surrogate above in the previous iteration  
        return false;
    }
    return code;
};
/// makeByteWriter(Uint8Array buffer, offset)
///   getResult -> (Uint8Array view on used region of buffer)
/// makeByteWriter()
///   getResult -> (Uint8Array containing written bytes)
encoding.makeByteWriter = function (outputBytes, outputIndex) {
    if (arguments.length === 2) {
        var i = outputIndex | 0;
        var count = 0;
        return {
            write: function (byte) {
                if (i >= outputBytes.length)
                    throw new Error("End of buffer");
                outputBytes[i] = byte;
                i++;
                count++;
            },
            getPosition: function () {
                return count;
            },
            getResult: function () {
                return outputBytes.slice(outputIndex, outputIndex + count);
            }
        };
    }
    else {
        var resultBytes = new Array();
        return {
            write: function (byte) {
                resultBytes.push(byte);
            },
            getPosition: function () {
                return resultBytes.length;
            },
            getResult: function () {
                if (typeof (Uint8Array) !== "undefined")
                    return new Uint8Array(resultBytes);
                else
                    return resultBytes;
            }
        };
    }
};
encoding.makeByteReader = function (bytes, index, count) {
    var position = (typeof (index) === "number") ? index : 0;
    var endpoint;
    if (typeof (count) === "number")
        endpoint = (position + count);
    else
        endpoint = (bytes.length - position);
    var peek = function peek(offset) {
        offset |= 0;
        if (position + offset >= endpoint)
            return false;
        return bytes[position + offset];
    };
    var result = {
        peek: peek,
        read: function () {
            var result = peek(0);
            position += 1;
            return result;
        },
        getPosition: function () {
            return position;
        },
        skip: function (distance) {
            position += distance;
        }
    };
    Object.defineProperty(result, "eof", {
        get: function () {
            return (position >= endpoint);
        },
        configurable: true,
        enumerable: true
    });
    return result;
};
encoding.makeCharacterReader = function (str) {
    var position = 0, length = str.length;
    var cca = encoding.charCodeAt;
    var peek = function peek(offset) {
        offset |= 0;
        if (position + offset >= length)
            return false;
        return cca(str, position + offset);
    };
    var result = {
        peek: peek,
        read: function () {
            var result = peek(0);
            position += 1;
            return result;
        },
        getPosition: function () {
            return position;
        },
        skip: function (distance) {
            position += distance;
        }
    };
    Object.defineProperty(result, "eof", {
        get: function () {
            return (position >= length);
        },
        configurable: true,
        enumerable: true
    });
    return result;
};
/// encode(str, outputBytes, outputOffset) -> numBytesWritten
/// encode(str, outputWriter) -> numBytesWritten
/// encode(str) -> Uint8Array
encoding.UTF8.encode = function (string, output, outputIndex) {
    // http://tidy.sourceforge.net/cgi-bin/lxr/source/src/utf8.c
    var UTF8ByteSwapNotAChar = 0xFFFE;
    var UTF8NotAChar = 0xFFFF;
    var writer;
    if ((arguments.length === 3) && output.buffer) {
        writer = encoding.makeByteWriter(output, outputIndex);
    }
    else if (arguments.length === 2) {
        if (output && output.write && output.getResult)
            writer = output;
        else
            throw new Error("Expected 2nd arg to be a writer");
    }
    else if (arguments.length === 1) {
        writer = encoding.makeByteWriter();
    }
    if (typeof (string) !== "string")
        throw new Error("String expected");
    else if (!writer)
        throw new Error("No writer available");
    var reader = encoding.makeCharacterReader(string), ch;
    var hasError = false;
    while (!reader.eof) {
        ch = reader.read();
        if (ch === false)
            continue;
        if (ch <= 0x7F) {
            writer.write(ch);
        }
        else if (ch <= 0x7FF) {
            writer.write(0xC0 | (ch >> 6));
            writer.write(0x80 | (ch & 0x3F));
        }
        else if (ch <= 0xFFFF) {
            writer.write(0xE0 | (ch >> 12));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
        }
        else if (ch <= 0x1FFFF) {
            writer.write(0xF0 | (ch >> 18));
            writer.write(0x80 | ((ch >> 12) & 0x3F));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
            if ((ch === UTF8ByteSwapNotAChar) || (ch === UTF8NotAChar))
                hasError = true;
        }
        else if (ch <= 0x3FFFFFF) {
            writer.write(0xF0 | (ch >> 24));
            writer.write(0x80 | ((ch >> 18) & 0x3F));
            writer.write(0x80 | ((ch >> 12) & 0x3F));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
            hasError = true;
        }
        else if (ch <= 0x7FFFFFFF) {
            writer.write(0xF0 | (ch >> 30));
            writer.write(0x80 | ((ch >> 24) & 0x3F));
            writer.write(0x80 | ((ch >> 18) & 0x3F));
            writer.write(0x80 | ((ch >> 12) & 0x3F));
            writer.write(0x80 | ((ch >> 6) & 0x3F));
            writer.write(0x80 | (ch & 0x3F));
            hasError = true;
        }
        else {
            hasError = true;
        }
    }
    return writer.getResult();
};
encoding.UTF8.decode = function (bytes, index, count) {
    // http://tidy.sourceforge.net/cgi-bin/lxr/source/src/utf8.c
    var UTF8ByteSwapNotAChar = 0xFFFE;
    var UTF8NotAChar = 0xFFFF;
    var reader = encoding.makeByteReader(bytes, index, count), firstByte;
    var result = "";
    while (!reader.eof) {
        var accumulator = 0, extraBytes = 0, hasError = false;
        firstByte = reader.read();
        if (firstByte === false)
            continue;
        if (firstByte <= 0x7F) {
            accumulator = firstByte;
        }
        else if ((firstByte & 0xE0) === 0xC0) {
            accumulator = firstByte & 31;
            extraBytes = 1;
        }
        else if ((firstByte & 0xF0) === 0xE0) {
            accumulator = firstByte & 15;
            extraBytes = 2;
        }
        else if ((firstByte & 0xF8) === 0xF0) {
            accumulator = firstByte & 7;
            extraBytes = 3;
        }
        else if ((firstByte & 0xFC) === 0xF8) {
            accumulator = firstByte & 3;
            extraBytes = 4;
            hasError = true;
        }
        else if ((firstByte & 0xFE) === 0xFC) {
            accumulator = firstByte & 3;
            extraBytes = 5;
            hasError = true;
        }
        else {
            accumulator = firstByte;
            hasError = false;
        }
        while (extraBytes > 0) {
            var extraByte = reader.read();
            extraBytes--;
            if (extraByte === false) {
                hasError = true;
                break;
            }
            if ((extraByte & 0xC0) !== 0x80) {
                hasError = true;
                break;
            }
            accumulator = (accumulator << 6) | (extraByte & 0x3F);
        }
        if ((accumulator === UTF8ByteSwapNotAChar) || (accumulator === UTF8NotAChar))
            hasError = true;
        var characters;
        if (!hasError)
            characters = encoding.fromCharCode(accumulator);
        if (hasError || (characters === false)) {
            throw new Error("Invalid character in UTF8 text");
        }
        else
            result += characters;
    }
    return result;
};
encoding.Base64.IgnoredCodepoints = [
    9, 10, 13, 32
];
encoding.Base64.Table = [
    'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X',
    'Y', 'Z',
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
    'q', 'r', 's', 't',
    'u', 'v', 'w', 'x',
    'y', 'z',
    '0', '1', '2', '3',
    '4', '5', '6', '7',
    '8', '9',
    '+', '/'
];
encoding.Base64.CodeTable = new Uint8Array(encoding.Base64.Table.length);
for (var i = 0; i < encoding.Base64.Table.length; i++)
    encoding.Base64.CodeTable[i] = encoding.Base64.Table[i].charCodeAt(0);
encoding.Base64.arrayToString = function (inArray, offset, length) {
    var reader = encoding.makeByteReader(inArray, offset, length);
    var result = "";
    var ch1 = 0, ch2 = 0, ch3 = 0, bits = 0, equalsCount = 0, sum = 0;
    var mask1 = (1 << 24) - 1, mask2 = (1 << 18) - 1, mask3 = (1 << 12) - 1, mask4 = (1 << 6) - 1;
    var shift1 = 18, shift2 = 12, shift3 = 6, shift4 = 0;
    var table = encoding.Base64.Table;
    while (true) {
        ch1 = reader.read();
        ch2 = reader.read();
        ch3 = reader.read();
        if (ch1 === false)
            break;
        if (ch2 === false) {
            ch2 = 0;
            equalsCount += 1;
        }
        if (ch3 === false) {
            ch3 = 0;
            equalsCount += 1;
        }
        // Seems backwards, but is right!
        sum = (ch1 << 16) | (ch2 << 8) | (ch3 << 0);
        bits = (sum & mask1) >> shift1;
        result += table[bits];
        bits = (sum & mask2) >> shift2;
        result += table[bits];
        if (equalsCount < 2) {
            bits = (sum & mask3) >> shift3;
            result += table[bits];
        }
        if (equalsCount === 2) {
            result += "==";
        }
        else if (equalsCount === 1) {
            result += "=";
        }
        else {
            bits = (sum & mask4) >> shift4;
            result += table[bits];
        }
    }
    return result;
};
encoding.Base64.stringToArray = function (s) {
    var lengthErrorMessage = "Invalid length for a Base-64 char array.";
    var contentErrorMessage = "The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or a non-white space character among the padding characters.";
    var result = [];
    var reader = encoding.makeCharacterReader(s);
    var sum = 0;
    var ch0 = 0, ch1 = 0, ch2 = 0, ch3 = 0;
    var index0 = -1, index1 = -1, index2 = -1, index3 = -1;
    var equals = "=".charCodeAt(0);
    while (true) {
        ch0 = reader.read();
        if (ch0 === false)
            break;
        if (encoding.Base64.IgnoredCodepoints.indexOf(ch0) >= 0)
            continue;
        ch1 = reader.read();
        ch2 = reader.read();
        ch3 = reader.read();
        if ((ch1 === false) || (ch2 === false) || (ch3 === false))
            throw new Error(lengthErrorMessage);
        index0 = encoding.Base64.CodeTable.indexOf(ch0);
        index1 = encoding.Base64.CodeTable.indexOf(ch1);
        index2 = encoding.Base64.CodeTable.indexOf(ch2);
        index3 = encoding.Base64.CodeTable.indexOf(ch3);
        if ((index0 < 0) || (index0 > 63) ||
            (index1 < 0) || (index1 > 63))
            throw new Error(contentErrorMessage);
        sum = (index0 << 18) | (index1 << 12);
        if (index2 >= 0)
            sum |= (index2 << 6);
        else if (ch2 !== equals)
            throw new Error(contentErrorMessage);
        if (index3 >= 0)
            sum |= (index3 << 0);
        else if (ch3 !== equals)
            throw new Error(contentErrorMessage);
        result.push((sum >> 16) & 0xFF);
        if (index2 >= 0)
            result.push((sum >> 8) & 0xFF);
        if (index3 >= 0)
            result.push(sum & 0xFF);
    }
    return new Uint8Array(result);
};
encoding.Base64.stringToImageURL = function (s) {
    var buffer = encoding.Base64.stringToArray(s);
    var blob = new Blob([buffer]);
    var blobUrl = window.URL.createObjectURL(blob);
    return blobUrl;
}
var _loadExternalScript = function (window) {
    "use strict";
    var context = window.parent;
    var port = null;
    var channelSetup = null;
    var bhstatic = "//127.0.0.1/bhstatic";
    var console = window["console"];
    var moduleIds = [];
    var pendingMessages = [];
    var logRemotingActive = false;
    var isShutdown = false;
    var resignedToBloodshed = false;
    var secretToken;
    var sentHeartbeat = false;
    var flipsville = false;
    var NoSettings = Object.create(null), currentSettings = NoSettings;
    var waitingForSettings = [];
    var lastVmInput = 0;
    var inputWindow = 5000;
    var heartbeatToken = 0;
    var initialHeartbeatDelay = 400;
    var heartbeatDelayBackoffRate = 400;
    var currentHeartbeatDelay = initialHeartbeatDelay;
    var currentHeartbeatTimeout = null;
    var liveXhrs = new Set();
    var raidLoadStartObservedWhen = null, raidLoadEndObservedWhen = null;
    var raidLoadTimingInterval = null;
    var fastlane = null;
    var prefetchedRequests = [];
    (function () {
        var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
        var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
        var concat = Function.bind.call(Function.call, Array.prototype.concat);
        var keys = Reflect.ownKeys;
        if (!Object.values) {
            Object.values = function values(O) {
                return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
            };
        }
        if (!Object.entries) {
            Object.entries = function entries(O) {
                return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
            };
        }
    })();
    channelSetup = function (evt) {
        if (evt.data.type !== "vmInit")
            return;
        bhstatic = evt.data.bhstatic;
        moduleIds = evt.data.moduleIds;
        secretToken = (Math.random() * 1024000) | 0;
        port = evt.ports[0];
        port.onmessage = onWindowMessage;
        port.postMessage({ type: "vmHello", secretToken: secretToken });
        window.removeEventListener("message", channelSetup, true);
        for (var i = 0, l = pendingMessages.length; i < l; i++)
            port.postMessage(pendingMessages[i]);
        pendingMessages.length = 0;
        evt.preventDefault();
        evt.stopImmediatePropagation();
        log("External channel established");
    };
    window.addEventListener("message", channelSetup, true);
    function log(...args) {
        try {
            if (!logRemotingActive) {
                if (typeof (args[0]) === "string")
                    args[0] = "vms> " + args[0];
                else
                    args.unshift("vms>");
                return console.log.apply(console, args);
            }
            var evt = {
                type: "externalLog",
                args: args
            };
            for (var i = 0, l = args.length; i < l; i++) {
                switch (typeof args[i]) {
                    case "number":
                        break;
                    case "string":
                        args[i] = JSON.stringify(args[i]);
                        break;
                    default:
                        if (Array.isArray(args[i])) {
                            args[i] = "Array(" + String(args[i]) + ")";
                        }
                        else {
                            args[i] = "<" + String(args[i]) + ">";
                        }
                        break;
                }
            }
            sendMessage(evt);
        }
        catch (exc) {
            // :-(
        }
    }
    ;
    function sendMessage(msg) {
        if (port)
            port.postMessage(msg);
        else
            pendingMessages.push(msg);
    }
    ;
    var setTimeout_original = context.setTimeout;
    var setInterval_original = context.setInterval;
    var RAF_original = context.requestAnimationFrame;
    var isLagWorkaroundActive = false;
    var isPerformanceStatsActive = false;
    var targetFrameInterval = 1000 / 60;
    var resetThreshold = 100;
    var lastFrameTimestamp = null, lastFrameWallTimestamp = null;
    var queuedFrameCallbacks = [];
    var rafCallbackPending = false;
    var rafCallback = function (timestamp) {
        rafCallbackPending = false;
        if (isLagWorkaroundActive)
            return;
        try {
            frameDispatcher(timestamp);
        }
        catch (exc) {
        }
    };
    var lastFrameWhen = null;
    var frameIntervalHandle = null;
    var lagWorkaroundCallback = function () {
        if (!isLagWorkaroundActive) {
            if (frameIntervalHandle !== null) {
                clearInterval(frameIntervalHandle);
                frameIntervalHandle = null;
            }
            return;
        }
        var now = performance.now();
        var targetFrameTime, elapsed;
        try {
            if (lastFrameWhen == null) {
                lastFrameWhen = now;
                targetFrameTime = now;
            }
            else {
                targetFrameTime = lastFrameWhen + targetFrameInterval;
                elapsed = now - lastFrameWhen;
                if (elapsed < 0)
                    lastFrameWhen = now;
            }
            if (now >= targetFrameTime) {
                frameDispatcher(targetFrameTime);
                lastFrameWhen = targetFrameTime;
                now = performance.now();
            }
            if (elapsed >= resetThreshold)
                lastFrameWhen = now;
        }
        catch (exc) {
        }
        if (frameIntervalHandle === null)
            frameIntervalHandle = setInterval(lagWorkaroundCallback, 1);
    };
    lastFrameWhen = null;
    var frameDispatcher = function (timestamp) {
        var now = performance.now();
        var elapsed, elapsedWallClock;
        if (lastFrameTimestamp !== null) {
            elapsed = timestamp - lastFrameTimestamp;
            // Don't freak out if we stop getting frames for a while.
            if (elapsed > 2000)
                elapsed = targetFrameInterval;
        }
        else
            elapsed = targetFrameInterval;
        if (lastFrameWallTimestamp != null) {
            elapsedWallClock = now - lastFrameWallTimestamp;
            if (elapsedWallClock > 2000)
                elapsedWallClock = targetFrameInterval;
        }
        else
            elapsedWallClock = targetFrameInterval;
        // TODO: Frameskip
        var qfc = queuedFrameCallbacks;
        queuedFrameCallbacks = [];
        var callbacksStarted = performance.now();
        for (var i = 0, l = qfc.length; i < l; i++) {
            var callback = qfc[i];
            if (!callback)
                continue;
            try {
                callback(timestamp);
            }
            catch (exc) {
                log("Unhandled error in raf callback", exc.stack);
            }
        }
        var callbacksEnded = performance.now();
        if (isPushGameStatusEnabled)
            pushGameStatus();
        var pgsEnded = performance.now();
        var callbacksElapsed = callbacksEnded - callbacksStarted;
        var pgsElapsed = pgsEnded - callbacksEnded;
        if ((qfc.length > 0) || isPushGameStatusEnabled) {
            sendMessage({
                type: "frameStats",
                lastFrameTimestamp: lastFrameTimestamp,
                timestamp: timestamp,
                timeSinceLastFrame: elapsed,
                realTimeSinceLastFrame: elapsedWallClock,
                callbackDuration: callbacksElapsed,
                pgsDuration: pgsElapsed
            });
        }
        lastFrameTimestamp = timestamp;
        lastFrameWallTimestamp = now;
    };
    frameDispatcher.toString = function () { return ""; };
    var blacklistCache = new WeakMap();
    function isCallerBlacklisted(callback) {
        if (!callback)
            return true;
        var result = blacklistCache.get(callback);
        if (typeof (result) === "boolean")
            return result;
        var stack = (new Error()).stack;
        result = (stack.indexOf("platform.twitter.com") >= 0);
        blacklistCache.set(callback, result);
        return result;
    }
    ;
    var newRAF = function requestAnimationFrame(callback) {
        var result;
        if (isCallerBlacklisted(callback))
            return RAF_original.call(context, callback);
        if (!isPerformanceStatsActive && !isLagWorkaroundActive) {
            result = RAF_original.call(context, callback);
            if (isPushGameStatusEnabled)
                RAF_original.call(context, pushGameStatus);
            return result;
        }
        result = queuedFrameCallbacks.length;
        queuedFrameCallbacks.push(callback);
        if (isLagWorkaroundActive) {
            if (frameIntervalHandle === null)
                frameIntervalHandle = setInterval(lagWorkaroundCallback, 1);
        }
        else if (!rafCallbackPending) {
            if (frameIntervalHandle !== null) {
                clearInterval(frameIntervalHandle);
                frameIntervalHandle = null;
            }
            rafCallbackPending = true;
            RAF_original.call(context, rafCallback);
        }
        return result;
    };
    newRAF.toString = function toString() {
        return RAF_original.toString();
    };
    var isTickCache = new WeakMap();
    var wrappedCallbackCache = new WeakMap();
    function wrapCallbackWithPushGameStatus(callback) {
        var result = wrappedCallbackCache.get(callback);
        if (!result) {
            result = function () {
                callback.apply(this, arguments);
                if (isPushGameStatusEnabled)
                    pushGameStatus();
            };
            result.toString = function toString() {
                return callback.toString();
            };
            wrappedCallbackCache.set(callback, result);
        }
        return result;
    }
    ;
    var newSetTimeout = function setTimeout(callback, timeout) {
        var isTick = false;
        if (isPushGameStatusEnabled) {
            try {
                if ((timeout > 41) && (timeout < 42)) {
                    isTick = isTickCache.get(callback);
                    if (typeof (isTick) !== "boolean") {
                        var stack = (new Error()).stack;
                        isTick = stack.indexOf("._setupTick") >= 0;
                        isTickCache.set(callback, isTick);
                    }
                }
                if (isTick) {
                    var result = setTimeout_original.apply(context, arguments);
                    setTimeout_original.call(context, pushGameStatus, timeout);
                    return result;
                }
            }
            catch (exc) {
            }
        }
        return setTimeout_original.apply(context, arguments);
    };
    newSetTimeout.toString = function toString() {
        return setTimeout_original.toString();
    };
    var newSetInterval = function setInterval(callback, interval) {
        try {
            if (interval === 33) {
                var stack = (new Error()).stack;
                if ((stack.indexOf("raid/setup.js") >= 0) &&
                    (stack.indexOf("addEventListener") >= 0)) {
                    callback = wrapCallbackWithPushGameStatus(callback);
                }
            }
        }
        catch (exc) {
        }
        return setInterval_original.apply(context, arguments);
    };
    newSetInterval.toString = function toString() {
        return setInterval_original.toString();
    };
    context.requestAnimationFrame = newRAF;
    context.webkitRequestAnimationFrame = newRAF;
    context.setTimeout = newSetTimeout;
    context.setInterval = newSetInterval;
    var WebSocket_original = context.WebSocket;
    var nextWebSocketId = 1;
    // Intercept web socket construction so we can snoop on messages
    // This allows us to find out when other players do stuff in raids
    var newWebSocket = function WebSocket() {
        var gluedArguments = Array.prototype.concat.apply([null], arguments);
        var boundConstructor = Function.prototype.bind.apply(WebSocket_original, gluedArguments);
        var id = nextWebSocketId++;
        sendMessage({ type: 'webSocketCreated', id: id });
        var result = new boundConstructor();
        result.addEventListener("close", function (evt) {
            sendMessage({ type: 'webSocketClosed', data: evt.data, id: id });
        }, true);
        result.addEventListener("message", function (evt) {
            sendMessage({ type: 'webSocketMessageReceived', data: evt.data, id: id });
        }, true);
        result.addEventListener("error", function (evt) {
            log("WebSocket error occurred", evt, evt.error);
            sendMessage({ type: 'webSocketError', data: String(evt.error), id: id });
        }, true);
        return result;
    };
    for (var k in WebSocket_original) {
        if (!WebSocket_original.hasOwnProperty(k))
            continue;
        var v = WebSocket_original[k];
        // console.log(k, v);
        newWebSocket[k] = v;
    }
    newWebSocket.toString = function toString() {
        return WebSocket_original.toString();
    };
    newWebSocket.prototype = WebSocket_original.prototype;
    newWebSocket.prototype.constructor = newWebSocket;
    context.WebSocket = newWebSocket;
    var document_addEventListener = context.Document.prototype.addEventListener;
    var element_addEventListener = context.Element.prototype.addEventListener;
    var filterMouseEvents = false;
    var lastMouseDownEvent = null;
    var lastMouseDownEventIsFiltered = false;
    var snoopedEvents = [
        "mousedown", "mousemove", "mouseup", "click",
        "touchstart", "touchend", "touchmove", "touchcancel",
        "mouseover", "mouseout", "mouseleave", "mouseenter"
    ];
    var nonTransferableProperties = [
        "isTrusted", "path", "type", "which",
        "button", "buttons", "timeStamp", "returnValue",
        "eventPhase", "defaultPrevented",
        "target", "relatedTarget", "fromElement", "toElement"
    ];
    var swipeSuppressClasses = ["lis-ability"];
    function findElementAncestorWithClass(elt, classNames) {
        while (elt) {
            for (var i = 0, l = classNames.length; i < l; i++) {
                var className = classNames[i];
                if (elt.className.indexOf(className) >= 0)
                    return elt;
            }
            elt = elt.parentElement;
        }
        return null;
    }
    ;
    function transferProperty(src, dest, name) {
        if (nonTransferableProperties.indexOf(name) >= 0)
            return;
        Object.defineProperty(dest, name, {
            value: src[name]
        });
    }
    ;
    function looseElementComparison(a, b, classNames) {
        var aa = findElementAncestorWithClass(a, classNames);
        var ba = findElementAncestorWithClass(b, classNames);
        return aa && ba && (aa == ba);
    }
    ;
    function filteredMouseEventProxyHandler(originalEvent) {
        this.originalEvent = originalEvent;
        /*
        for (var k in lastMouseDownEvent)
            transferProperty(lastMouseDownEvent, evt, k);

        Object.defineProperty(evt, "movementX", { value: 0 });
        Object.defineProperty(evt, "movementY", { value: 0 });
        */
    }
    ;
    filteredMouseEventProxyHandler.prototype.get = function (target, property, receiver) {
        var result = target[property];
        switch (typeof (result)) {
            case "function":
                return result;
        }
        if (nonTransferableProperties.indexOf(property) < 0)
            result = this.originalEvent[property];
        return result;
    };
    function wrapMouseEventListener(type, listener) {
        if (!listener.apply) {
            // wtf cygames
            return listener;
        }
        switch (type) {
            /*
            case "touchstart":
                return function filterTouchStart (evt) {
                    // FIXME
                    if (filterMouseEvents)
                    try {
                        lastMouseDownEvent = evt;
                        lastMouseDownEventIsFiltered = !!findElementAncestorWithClass(evt.target, swipeSuppressClasses);
                        if (lastMouseDownEventIsFiltered)
                            return;
                    } catch (exc) {
                    }

                    return listener.apply(this, arguments);
                };

            case "touchmove":
            case "touchend":
            case "touchcancel":
                return function filterMouseMove (evt) {
                    try {
                        if (
                            lastMouseDownEvent &&
                            looseElementComparison(evt.target, lastMouseDownEvent.target, swipeSuppressClasses) &&
                            (
                                lastMouseDownEventIsFiltered ||
                                findElementAncestorWithClass(evt.target, swipeSuppressClasses)
                            )
                        ) {
                            return;
                        }
                    } catch (exc) {
                    }

                    return listener.apply(this, arguments);
                };
            */
            case "mouseover":
            case "mouseout":
            case "mouseleave":
            case "mouseenter":
                return function filterMisc(evt) {
                    if (filterMouseEvents) {
                        if (evt.buttons != 0)
                            return;
                    }
                    return listener.apply(this, arguments);
                };
            case "mousedown":
                return function filterMouseDown(evt) {
                    if (filterMouseEvents)
                        try {
                            lastMouseDownEvent = evt;
                            lastMouseDownEventIsFiltered = !!findElementAncestorWithClass(evt.target, swipeSuppressClasses);
                        }
                        catch (exc) {
                            log(exc);
                        }
                    return listener.apply(this, arguments);
                };
            case "mousemove":
                return function filterMouseMove(evt) {
                    if (filterMouseEvents)
                        try {
                            if ((evt.buttons !== 0) &&
                                lastMouseDownEvent &&
                                (lastMouseDownEventIsFiltered &&
                                    findElementAncestorWithClass(evt.target, swipeSuppressClasses))) {
                                // log("filtered mousemove");
                                // TODO: Instead, modify the coordinates and only update them if the event
                                //  leaves the button, so mouse-out works as expected
                                return;
                            }
                        }
                        catch (exc) {
                            log(exc);
                        }
                    return listener.apply(this, arguments);
                };
            case "mouseup":
                return function filterMouseUp(evt) {
                    if (filterMouseEvents)
                        try {
                            if (lastMouseDownEvent &&
                                looseElementComparison(evt.target, lastMouseDownEvent.target, swipeSuppressClasses) &&
                                (lastMouseDownEventIsFiltered &&
                                    findElementAncestorWithClass(evt.target, swipeSuppressClasses))) {
                                // log("filtered mouseup");
                                evt = new Proxy(evt, new filteredMouseEventProxyHandler(lastMouseDownEvent));
                            }
                        }
                        catch (exc) {
                            log(exc);
                        }
                    return listener.call(this, evt);
                };
        }
        return listener;
    }
    ;
    context.Document.prototype.addEventListener = function (type, _listener, options) {
        var listener = _listener;
        try {
            if (snoopedEvents.indexOf(type) >= 0)
                listener = wrapMouseEventListener(type, _listener);
        }
        catch (exc) {
        }
        var result = document_addEventListener.call(this, type, listener, options);
        // log("document", type, listener);
        return result;
    };
    context.Element.prototype.addEventListener = function (type, _listener, options) {
        var listener = _listener;
        try {
            if (snoopedEvents.indexOf(type) >= 0)
                listener = wrapMouseEventListener(type, _listener);
        }
        catch (exc) {
        }
        var result = element_addEventListener.call(this, type, listener, options);
        // log(name, type, listener);
        return result;
    };
    context.Document.prototype.addEventListener.toString = function () {
        return document_addEventListener.toString();
    };
    context.Element.prototype.addEventListener.toString = function () {
        return element_addEventListener.toString();
    };
    var XHR = context.XMLHttpRequest;
    var open_original = XHR.prototype.open;
    var send_original = XHR.prototype.send;
    var addEventListener_original = XHR.prototype.addEventListener;
    var setRequestHeader_original = XHR.prototype.setRequestHeader;
    var doResultFiltering = true;
    var xhrStateTable = new WeakMap();
    function getXhrState(xhr) {
        var result = xhrStateTable.get(xhr);
        if (!result) {
            result = {};
            xhrStateTable.set(xhr, result);
        }
        if (!result.readyStateListeners)
            result.readyStateListeners = [];
        return result;
    }
    ;
    function prefetchUrl(delay, url, requestBody, isVersionVerified, bodyVerifier) {
        var fullUrl = url;
        if (!fullUrl.endsWith("?"))
            fullUrl += "?";
        var ts = (new Date).getTime() + delay;
        fullUrl += "_=" + ((ts - (Math.random() * 50)) | 0);
        fullUrl += "&t=" + (ts | 0);
        fullUrl += "&uid=" + context.Game.userId;
        var method = !!requestBody ? "POST" : "GET";
        log("Prefetch requested:", method, fullUrl, requestBody);
        return;
        var record = {
            method: method,
            url: url,
            fullUrl: fullUrl,
            body: requestBody,
            xhr: null,
            objectUrl: null,
            listeners: [],
            verified: isVersionVerified,
            bodyVerifier: bodyVerifier
        };
        prefetchedRequests.push(record);
        var exec = function () {
            var instance = new XHR();
            record.xhr = instance;
            instance.responseType = "blob";
            addEventListener_original.call(instance, "error", function () {
                log("Prefetch failed for", url);
            });
            addEventListener_original.call(instance, "load", function () {
                record.objectUrl = context.URL.createObjectURL(record.xhr.response);
                for (var i = 0; i < record.listeners.length; i++)
                    record.listeners[i]();
            });
            open_original.call(instance, method, fullUrl, true);
            send_original.call(instance, requestBody);
        };
        if (isVersionVerified) {
            if (delay > 0)
                window.setTimeout(exec, delay);
            else
                exec();
        }
    }
    var validTableKeys = [1002, 1003, 4001];
    function tryPreprocessXhr(xhr, state) {
        if (state.url.indexOf(atob("L29iLw==")) >= 0) {
            var obj = JSON.parse(state.data);
            if (obj.c[4001] && !sentHeartbeat) {
                for (var key in obj.c) {
                    if (validTableKeys.indexOf(Number(key)) < 0) {
                        log("Removing " + key + " from ob");
                        delete obj.c[key];
                    }
                }
                state.data = JSON.stringify(obj);
                sentHeartbeat = true;
            }
            else {
                log("Squelched");
                state.overrideUrl = bhstatic;
                state.noHeaders = true;
                open_original.call(xhr, state.method, state.overrideUrl, state.async);
            }
        }
        else if (state.url.indexOf(atob("Z2MvZ2M=")) >= 0) {
            var obj = JSON.parse(state.data);
            for (var key in obj.c) {
                if (validTableKeys.indexOf(Number(key)) < 0) {
                    log("Removing " + key + " from gc/gc");
                    delete obj.c[key];
                }
            }
            state.data = JSON.stringify(obj);
        }
        else if (state.url.indexOf(atob("ZXJyb3IvanM=")) >= 0) {
            log("Squelched");
            state.overrideUrl = bhstatic;
            state.noHeaders = true;
            open_original.call(xhr, state.method, state.overrideUrl, state.async);
        }
    }
    ;
    var customOnReadyStateChange = function () {
        try {
            var state = getXhrState(this);
            if (this.readyState == XHR.HEADERS_RECEIVED)
                state.headersReceived = performance.now();
            else if ((this.readyState == XHR.LOADING) && (state.loadingStarted <= 0))
                state.loadingStarted = performance.now();
            else if (this.readyState == XHR.DONE) {
                // HACK: This *should* always happen before 'load' is fired,
                //  allowing us to replace the result
                state.onComplete.call(this, state);
            }
        }
        catch (exc) {
            log(exc);
        }
        try {
            if (doResultFiltering) {
                for (var i = 0, l = state.readyStateListeners.length; i < l; i++) {
                    try {
                        state.readyStateListeners[i].apply(this, arguments);
                    }
                    catch (exc) {
                        log(exc);
                    }
                }
            }
        }
        catch (exc) {
            log(exc);
        }
    };
    function customOnComplete(state) {
        if (state.done)
            return;
        liveXhrs.delete(state.url);
        state.done = performance.now();
        state.result = this.response || this.responseText;
        state.response = this.response;
        state.responseType = this.responseType;
        if ((state.responseType === "") || (state.responseType === "text"))
            state.responseText = this.responseText;
        state.status = this.status;
        state.statusText = this.statusText;
        state.contentType = this.getResponseHeader('content-type');
        if (state.noHeaders) {
            var grh_original = this.getResponseHeader;
            var grh = function () {
                return;
            };
            grh.toString = function () {
                return grh_original.toString();
            };
            // FIXME :(
            // Object.defineProperty(this, "getResponseHeader", { value: grh });
        }
        if (state.resultFilter) {
            var didFilter = false;
            try {
                didFilter = state.resultFilter.call(this, state);
            }
            catch (exc) {
            }
            if (didFilter) {
                Object.defineProperty(this, "response", { value: state.response });
                Object.defineProperty(this, "responseText", { value: state.responseText });
                Object.defineProperty(this, "responseType", { value: state.responseType });
                Object.defineProperty(this, "status", { value: state.status });
                Object.defineProperty(this, "statusText", { value: state.statusText });
            }
        }
        afterAjax(state);
    }
    ;
    XHR.prototype.open = function open(method, url, async, user, password) {
        try {
            var state = getXhrState(this);
            state.method = method;
            state.url = url;
            state.async = async;
            state.opened = performance.now();
            state.loadingStarted = 0;
            state.headersReceived = 0;
            state.custom = false;
            state.prefetchedRequest = null;
            state.overrideUrl = null;
            for (var i = 0, l = prefetchedRequests.length; i < l; i++) {
                var pf = prefetchedRequests[i];
                if (!pf)
                    break;
                if ((url.indexOf(pf.url) === 0) &&
                    (method === pf.method)) {
                    state.prefetchedRequest = pf;
                    break;
                }
            }
            // FIXME: state.targetXhr?
            addEventListener_original.call(this, "readystatechange", customOnReadyStateChange, false);
        }
        catch (exc) {
            log(exc);
        }
        var result = open_original.apply(this, arguments);
        return result;
    };
    XHR.prototype.addEventListener = function addEventListener(eventName, listener, useCapture) {
        try {
            var state = getXhrState(this);
            if (doResultFiltering &&
                (eventName === "readystatechange")) {
                state.readyStateListeners.push(listener);
                // console.log("xhr.addEventListener captured", eventName, listener);
                return true;
            }
        }
        catch (exc) {
            log(exc);
        }
        var result = addEventListener_original.apply(this, arguments);
        return result;
    };
    function handlePrefetchedRequest(xhr, pf, state, data) {
        if (!pf.xhr) {
            log("Recording prefetch observation for", state.url);
            pf.verified = true;
            if (prefetchedRequests.every(function (e) { return e.verified; })) {
                log("All prefetches verified. Enabling prefetch.");
                localStorage.setItem("lastVerifiedVersion", context.Game.version);
            }
        }
        else if (pf.xhr.readyState === 4) {
            if (pf.bodyVerifier) {
                if (!pf.bodyVerifier(data)) {
                    log("Request body did not match prefetched body", data);
                    localStorage.setItem("lastVerifiedVersion", null);
                    return false;
                }
            }
            log("Returning prefetched result for", state.url);
            state.overrideUrl = pf.objectUrl;
            state.method = "GET";
            state.noHeaders = true;
            open_original.call(xhr, state.method, state.overrideUrl, state.async);
        }
        else {
            log("Waiting on prefetched request...");
            pf.listeners.push(function () {
                XHR.prototype.send.call(xhr, data);
            });
            return true;
        }
        return false;
    }
    ;
    function issueXhrSend(xhr, state, data) {
        liveXhrs.add(state.url);
        if (state && state.custom) {
            try {
                send_original.call(xhr, state.data);
            }
            catch (exc) {
                log(exc);
            }
        }
        else if (state) {
            send_original.call(xhr, state.data);
        }
        else {
            send_original.call(xhr, data);
        }
        try {
            if (!state.async)
                customOnComplete.call(xhr, state);
        }
        catch (exc) {
            log(exc);
        }
        finally {
            if (!currentHeartbeatTimeout)
                currentHeartbeatTimeout = window.setTimeout(proxyHeartbeat, currentHeartbeatDelay);
        }
    }
    ;
    XHR.prototype.send = function send(data) {
        var state = null;
        try {
            state = getXhrState(this);
            if (state.url) {
                state.sent = performance.now();
                state.data = data;
                state.onComplete = customOnComplete;
                state.resultFilter = pickResultFilter(state);
                tryPreprocessXhr(this, state);
                if (state.prefetchedRequest) {
                    var pf = state.prefetchedRequest;
                    if (handlePrefetchedRequest(this, pf, state, data))
                        return;
                }
                beforeAjax(state.url, state.data, this, context.Game.userId);
            }
            else {
                // ???
                log("Xhr with no state", this);
            }
        }
        catch (exc) {
            log(exc);
        }
        issueXhrSend(this, state, data);
    };
    XHR.prototype.open.toString = function toString() {
        return open_original.toString();
    };
    XHR.prototype.setRequestHeader.toString = function toString() {
        return setRequestHeader_original.toString();
    };
    XHR.prototype.addEventListener.toString = function toString() {
        return addEventListener_original.toString();
    };
    XHR.prototype.send.toString = function toString() {
        return send_original.toString();
    };
    function pickResultFilter(state) {
        if ((state.url.indexOf("ability_result.json") >= 0) ||
            (state.url.indexOf("summon_result.json") >= 0) ||
            (state.url.indexOf("normal_attack_result.json") >= 0)) {
            if (flipsville)
                return filter_drop;
        }
        return null;
    }
    ;
    function removeDuplicates(list) {
        var previous = null;
        for (var i = 0, l = list.length; i < l; i++) {
            var item = list[i];
            // HACK :(
            var current = JSON.stringify(item);
            if (current === previous) {
                list.splice(i, 1);
                i--;
                l--;
            }
            previous = current;
        }
    }
    ;
    function filter_drop(state) {
        var original = JSON.parse(state.result);
        var result = null;
        var data = state.data;
        if (typeof (data) === "string")
            data = JSON.parse(data);
        var scenario = original.scenario;
        var changed = false;
        if (original && original.scenario) {
            for (var i = 0, l = scenario.length; i < l; i++) {
                var s = scenario[i];
                if (!s)
                    continue;
                switch (s.cmd) {
                    case "drop": {
                        if (flipsville) {
                            s.get = [10, 10, 10, 10, 10, 10, 10];
                            changed = true;
                        }
                        break;
                    }
                }
            }
            if (changed)
                result = original;
        }
        if (result) {
            state.response =
                state.responseText =
                JSON.stringify(result);
            return true;
        }
        return false;
    }
    ;
    function isCombatPage(hash) {
        // FIXME: More prefixes
        return hash.startsWith("#raid/") ||
            hash.startsWith("#raid_multi/") ||
            hash.startsWith("#raid_semi/");
    }
    ;
    var gameStatusMessage = {};
    var gameStatusEnemies = [];
    var gameStatusParty = [];
    var gameStatusCharacterIds = [];
    var isPushGameStatusEnabled = true;
    context.addEventListener("hashchange", schedulePushGameStatus, false);
    schedulePushGameStatus();
    function schedulePushGameStatus() {
        isPushGameStatusEnabled = true;
    }
    ;
    function pushGameStatusInner() {
        if (!context["stage"])
            return;
        var stage = context.stage;
        var gs = stage.gGameStatus;
        if (!gs)
            return;
        var enemies = gameStatusEnemies;
        var party = gameStatusParty;
        var characterIds = gameStatusCharacterIds;
        enemies.length = 0;
        party.length = 0;
        var conditions;
        for (var i = 0, l = gs.boss.param.length; i < l; i++) {
            var enemy = gs.boss.param[i];
            conditions = [];
            var cl = stage.gEnemyStatus[i].condition;
            if (cl)
                cl = cl.conditions;
            if (cl)
                for (var j = 0, l2 = cl.length; j < l2; j++)
                    conditions.push(cl[j].status);
            var enemyObj = {
                id: Number(enemy.enemy_id),
                name: enemy.name,
                cjs: enemy.cjs,
                hp: Number(enemy.hp),
                hpMax: Number(enemy.hpmax),
                recast: Number(enemy.recast),
                recastMax: Number(enemy.recastmax),
                conditions: conditions,
                mode: gs.bossmode.looks.mode[i],
                gauge: gs.bossmode.looks.gauge[i],
                hasModeGauge: enemy.modeflag
            };
            enemies.push(enemyObj);
        }
        for (var i = 0, l = gs.player.param.length; i < l; i++) {
            var player = gs.player.param[i];
            if (!player)
                continue;
            var buffs = [];
            var debuffs = [];
            var pc = player.condition;
            if (pc) {
                if (pc.buff)
                    for (var j = 0; j < pc.buff.length; j++)
                        buffs.push(pc.buff[j].status);
                if (pc.debuff)
                    for (var j = 0; j < pc.debuff.length; j++)
                        debuffs.push(pc.debuff[j].status);
            }
            var playerObj = {
                name: player.name,
                cjs: player.cjs,
                pid: player.pid,
                attr: Number(player.attr),
                alive: !!player.alive,
                leader: !!player.leader,
                hp: Number(player.hp),
                hpMax: Number(player.hpmax),
                ougi: Number(player.recast),
                ougiMax: Number(player.recastmax),
                buffs: buffs,
                debuffs: debuffs,
                condition: {},
                skillsAvailable: Object.values(pc.ability_available_list || {})
            };
            party.push(playerObj);
        }
        var state = gameStatusMessage;
        state.btn_lock = gs.btn_lock;
        state.lock = gs.lock;
        state.target = gs.target;
        state.attacking = gs.attacking;
        state.usingAbility = gs.usingAbility;
        state.finish = gs.finish;
        state.turn = gs.turn;
        state.auto_attack = gs.auto_attack;
        state.enemies = enemies;
        state.party = party;
        state.characterIds = characterIds;
        state.hasFieldEffect = gs.field.hasFieldEffect;
        if (stage && stage.gFieldCondition && stage.gFieldCondition.fieldConditionList)
            state.fieldEffectCount = stage.gFieldCondition.fieldConditionList.length;
        else
            state.fieldEffectCount = 0;
        state.attackButtonPushed = gs.attackQueue.attackButtonPushed;
        state.summonButtonPushed = gs.attackQueue.summonButtonPushed;
        state.skillQueue = gs.attackQueue.$useAbility.map(function (e) {
            if (typeof (e) === "string")
                return e;
            if (e[0] && (e[0].className.indexOf("btn-summon") >= 0))
                return "Summon";
            var elt = e[0].querySelector("div[ability-id]");
            if (elt)
                return "div." + elt.className.replace(/ /g, ".");
            // FIXME: ???
            return null;
        });
        if (stage.pJsnData) {
            var pjd = stage.pJsnData;
            state.summon_enable = pjd.summon_enable;
            state.raid_id = pjd.raid_id;
            state.is_multi = pjd.is_multi;
            state.is_semi = pjd.is_semi;
            state.is_defendorder = pjd.is_defendorder;
            state.is_coopraid = pjd.is_coopraid;
            if (pjd.twitter && pjd.is_allowed_to_requesting_assistance)
                state.raidCode = pjd.twitter.battle_id;
            if (pjd.multi_raid_member_info)
                state.player_count = pjd.multi_raid_member_info.length;
            var characterInfo = pjd.player.param;
            characterIds.length = characterInfo.length;
            for (var i = 0, l = characterInfo.length; i < l; i++) {
                var ci = characterInfo[i];
                characterIds[i] = ci.pid;
            }
        }
        sendMessage({
            type: 'stageTick',
            state: state
        });
    }
    ;
    function pushGameStatus() {
        try {
            if (isShutdown)
                return;
            var _isCombatPage = isCombatPage(context.location.hash);
            if (!_isCombatPage) {
                isPushGameStatusEnabled = false;
                return;
            }
            // HACK: Moving the body of the try block into a function lets v8 optimize it
            pushGameStatusInner();
        }
        catch (exc) {
            sendMessage({
                type: 'error',
                stack: exc.stack
            });
        }
    }
    ;
    function generateClick(target, asClick) {
        if (isShutdown)
            return;
        lastVmInput = Date.now();
        context.$(target).trigger(asClick ? "click" : "tap");
    }
    function manufactureEvent(currentTarget, target) {
        var evt = Object.create(null);
        evt.type = "tap";
        // FIXME
        evt.x = (Math.random() * 256) | 0;
        evt.y = (Math.random() * 256) | 0;
        evt.delegateTarget = context.document.querySelector("div.contents");
        evt.currentTarget = currentTarget;
        evt.target = target;
        evt.timestamp = Date.now();
        return evt;
    }
    function onWindowMessage(evt) {
        if (!evt.data.type)
            return;
        try {
            switch (evt.data.type) {
                case "click":
                    if (isShutdown)
                        return;
                    var name = evt.data.name;
                    var token = evt.data.token;
                    var tokenAttribute = evt.data.tokenAttribute;
                    var element = context.document.querySelector(name + "[" + tokenAttribute + "='" + token + "']");
                    if (element)
                        generateClick(element, evt.data.asClick);
                    return;
                case "trySelectSummon":
                    if (isShutdown)
                        return;
                    currentRaidView.CommandChangeSummon();
                    var pos = evt.data.pos;
                    var elt = context.document.querySelector('div.lis-summon[pos="' + pos + '"]');
                    if (!elt)
                        return;
                    var evt = manufactureEvent(elt, elt.querySelector("img"));
                    currentRaidView.popShowSummon(evt);
                    return;
                case "tryClickSummonUseButton":
                    if (isShutdown)
                        return;
                    var elt = context.document.querySelector('div.btn-usual-ok.btn-summon-use');
                    if (!elt)
                        return;
                    var evt = manufactureEvent(elt, elt);
                    currentRaidView.AddSummonAttackQueue(evt);
                    return;
                case "navigating":
                    if (remoteSocket)
                        remoteSocket.send(JSON.stringify(evt.data));
                    return;
                case "socketResult":
                    if (remoteSocket) {
                        evt.data.type = "result";
                        remoteSocket.send(JSON.stringify(evt.data));
                    }
                    return;
                case "sendToRemote":
                    if (remoteSocket)
                        remoteSocket.send(JSON.stringify(evt.data.data));
                    return;
                case "settingsChanged":
                    currentSettings = JSON.parse(evt.data.settings);
                    isLagWorkaroundActive = !!currentSettings.lagWorkaround;
                    isPerformanceStatsActive = (currentSettings.showPerformanceHud || currentSettings.lagWorkaround);
                    var wfs = waitingForSettings;
                    if (wfs.length) {
                        waitingForSettings = [];
                        for (var i = 0, l = wfs.length | 0; i < l; i++)
                            wfs[i](currentSettings);
                    }
                    filterMouseEvents = !!currentSettings.buttonSwipeFix;
                    return;
                case "it's my lucky day":
                    flipsville = true;
                    return;
                case "setResigned":
                    var wasResigned = resignedToBloodshed;
                    resignedToBloodshed = (evt.data.secretToken === secretToken);
                    if (resignedToBloodshed && !wasResigned)
                        maybeInitWebSocket();
                    return;
                case "tryConnect":
                    if (resignedToBloodshed)
                        maybeInitWebSocket();
                    return;
                case "enableLogRemoting":
                    logRemotingActive = true;
                    return;
                case "compatibilityShutdown":
                    doShutdown();
                    return;
                case "doAjax":
                    doAjaxInternal(evt.data);
                    return;
                case "doPopup":
                    var popupData = evt.data.data;
                    popupData.className = null;
                    popupData.okCallBackName = "popRemove";
                    popupData.cancelCallBackName = null;
                    popupData.exceptionFlag = false;
                    context.Game.view.trigger("popup_error", { data: popupData });
                    return;
                case "getUserId":
                    tryGetUserId(evt.data.token);
                    return;
                case "clearSkillQueue":
                    var queue = context.stage.gGameStatus.attackQueue;
                    if (queue.length <= 1) {
                        return;
                    }
                    var mappedQueue = queue.$useAbility.map(function (e) {
                        if (e === "NormalAttack") {
                            return e;
                        }
                        if (e[0] && (e[0].className.indexOf("summon") >= 0)) {
                            return "Summon";
                        }
                        return null;
                    });
                    // > 0 because we want to check whether they
                    //  are being cleared from the queue
                    if (mappedQueue.indexOf("NormalAttack") > 0) {
                        queue.attackButtonPushed = false;
                    }
                    if (mappedQueue.indexOf("Summon") > 0) {
                        queue.summonButtonPushed = false;
                    }
                    queue.$useAbility.splice(1);
                    queue.index.splice(1);
                    queue.param.splice(1);
                    queue.abilityRailUI.e.e.splice(2);
                    queue.abilityRailUI.gIconPaths.splice(1);
                    queue.abilityRailUI.icons.splice(1);
                    return;
            }
        }
        catch (exc) {
            sendMessage({
                type: 'error',
                stack: exc.stack
            });
        }
    }
    ;
    function doAjaxInternal(evtData) {
        if (isShutdown)
            return;
        var jquery = context["$"];
        if (!jquery) {
            setTimeout(function () {
                doAjaxInternal(evtData);
            }, 500);
            return;
        }
        var url = evtData.url;
        var token = evtData.token;
        var data = evtData.data;
        var callback = evtData.callback;
        if (!callback && !token)
            log("Invalid ajax request", evtData);
        var options = {
            cache: false,
            global: false
        };
        if (data) {
            options.data = data;
            options.method = "POST";
        }
        options.success = function (result) {
            if (callback)
                callback(url, result, null, false);
            else if (token)
                sendMessage({ type: 'doAjaxResult', url: url, token: token, result: result, error: null, failed: false });
        };
        options.error = function (jqXHR, exception) {
            if (callback)
                callback(url, null, jqXHR.status + " -- " + String(exception), true);
            else if (token)
                sendMessage({ type: 'doAjaxResult', url: url, token: token, error: jqXHR.status + " -- " + String(exception), failed: true });
        };
        jquery.ajax(url, options);
    }
    ;
    function beforeAjax(url, requestData, xhr, uid) {
        if (isShutdown)
            return;
        sendMessage({ type: 'ajaxBegin', url: url, requestData: requestData, uid });
    }
    ;
    function afterAjax(state) {
        if (isShutdown)
            return;
        // HACK: Don't forward response data for non-json bodies.
        // Otherwise, we end up sending a LOT of data over the message channel,
        //  which causes it to be cloned.
        var responseData = state.result;
        if (state.contentType &&
            (state.contentType.indexOf("application/json") < 0) &&
            (state.url.indexOf(".json") < 0)) {
            responseData = null;
        }
        else {
            // log("done", url, contentType, requestData);
        }
        sendMessage({
            type: 'ajaxComplete',
            url: state.url,
            requestData: state.data,
            responseData: responseData,
            contentType: state.contentType,
            status: state.status,
            duration: state.done - state.opened,
            delay: state.done - (state.loadingStarted || state.headersReceived || state.sent),
            uid: context.Game.userId
        });
    }
    ;
    function tryGetUserId(token) {
        if (!context.Game) {
            setTimeout(function () { tryGetUserId(token); }, 10);
            return;
        }
        sendMessage({
            type: "gotUserId",
            token: token,
            uid: context.Game.userId
        });
    }
    ;
    var moduleHooks = {};
    moduleHooks["view/raid/setup"] = function (name) {
        var vrs = context.require("view/raid/setup");
        hookRaidView(vrs);
    };
    moduleHooks["view/popup"] = function (name) {
        // console.log(name);
        getSettingsAsync(hookPopup);
    };
    var currentRaidView = null;
    var original_initialize_raidView;
    function hookRaidView(ctor) {
        var p = ctor.prototype;
        original_initialize_raidView = p.initialize;
        p.initialize = function () {
            var result = original_initialize_raidView.apply(this, arguments);
            currentRaidView = result || this;
            return result;
        };
        p.initialize.toString = function () {
            return original_initialize_raidView.toString();
        };
    }
    ;
    var original_popShow, original_popClose, original_onPushOk;
    function getSettingsAsync(callback) {
        if (currentSettings !== NoSettings)
            callback(currentSettings);
        else
            waitingForSettings.push(callback);
    }
    ;
    function hookPopup(currentSettings) {
        if (!currentSettings.autoHidePopups)
            return;
        var popup = context.require("view/popup");
        var api = popup.prototype;
        original_popShow = api.popShow;
        api.popShow = hook_popShow;
        original_popClose = api.popClose;
        api.popClose = hook_popClose;
        original_onPushOk = api.onPushOk;
        api.onPushOk = hook_onPushOk;
        hook_popShow.toString = function () {
            return original_popShow.toString();
        };
        hook_popClose.toString = function () {
            return original_popClose.toString();
        };
        hook_onPushOk.toString = function () {
            return original_onPushOk.toString();
        };
    }
    ;
    var isAutoCloseInProgress = false;
    var abortAutoClose = null;
    function doAutoClose(a, b) {
        isAutoCloseInProgress = true;
        // log("Auto-closing popup");
        var mask;
        if (this.options.maskSubMenu)
            mask = context.document.querySelector("div.mask_submenu");
        else
            mask = context.document.querySelector("div.mask");
        mask.style.display = "none";
        var elt = this.el.querySelector("div");
        elt.className += " auto-hiding";
        var footer = elt.querySelector(".prt-popup-footer");
        if (footer)
            footer.style.display = "none";
        var body = elt.querySelector(".prt-popup-body");
        if (body)
            body.style.paddingBottom = "20px";
        var btn = context.$(elt).find(".btn-usual-ok");
        var startedWhen = performance.now();
        var minimumWait = currentSettings.minimumPopupWait;
        var maximumWait = currentSettings.maximumPopupWait;
        if (!minimumWait)
            minimumWait = 350;
        if (!maximumWait)
            maximumWait = 1750;
        var holdDuration = ((elt.innerHTML.trim().length * 0.225) +
            (elt.textContent.trim().length * 6) +
            minimumWait);
        if (holdDuration > maximumWait)
            holdDuration = maximumWait;
        if (this.options.className === "pop-trialbattle-notice")
            holdDuration = 250;
        var fadeDuration = 150;
        var fadeInterval;
        abortAutoClose = function () {
            abortAutoClose = null;
            isAutoCloseInProgress = false;
            window.clearInterval(fadeInterval);
        };
        var completeAutoClose = (function () {
            // FIXME: Why???
            btn.trigger("tap");
            elt.style.opacity = "0.0";
            elt.style.pointerEvents = "none";
            elt.className = elt.className.replace("pop-show", "pop-hide");
            elt.style.display = "none";
            abortAutoClose = null;
            isAutoCloseInProgress = false;
            window.clearInterval(fadeInterval);
            fadeInterval = null;
        }).bind(this);
        elt.addEventListener("click", completeAutoClose, true);
        var onFadeTick = (function () {
            try {
                var elapsed = performance.now() - startedWhen;
                var opacity = 1.0;
                if (elapsed <= holdDuration) {
                }
                else {
                    elapsed -= holdDuration;
                    opacity = Math.max(1.0 - (elapsed / fadeDuration), 0);
                    if (elapsed > fadeDuration)
                        completeAutoClose();
                }
                elt.style.opacity = opacity.toFixed(3);
            }
            catch (exc) {
                log(exc);
            }
        }).bind(this);
        fadeInterval = window.setInterval(onFadeTick, 33);
    }
    ;
    function hook_popShow(a, b) {
        try {
            // HACK: Kill the previous auto-closing popup first.
            if (abortAutoClose) {
                // log("An auto-close is in progress, making room for new popup");
                abortAutoClose();
            }
        }
        catch (exc) {
            log(exc);
        }
        var result = original_popShow.apply(this, arguments);
        try {
            if (!currentSettings.autoHidePopups)
                return;
            var opts = this.options;
            if (opts.className === "pop-trialbattle-notice") {
            }
            else {
                // No OK button
                if (!opts.flagBtnOk)
                    return;
                // Has close or cancel button(s)
                if (opts.flagBtnClose || opts.flagBtnCancel)
                    return;
                var divs = this.el.querySelectorAll("div");
                for (var i = 0, l = divs.length; i < l; i++) {
                    var div = divs[i];
                    if (div.className.indexOf("btn-usual-ok") >= 0)
                        continue;
                    // Lyria
                    if (div.className.indexOf("lyria-deformed") >= 0)
                        return;
                    // Has a button other than OK
                    if (div.className.startsWith("btn-"))
                        return;
                    // Quest info box with favorite button
                    if (div.className.indexOf("prt-bookmark-register") >= 0)
                        return;
                }
                // No standard OK button
                if (!this.el.querySelector(".btn-usual-ok"))
                    return;
            }
            // If an auto-close is already in progress we don't
            //  auto-close the new popup, so that mashing doesn't
            //  make the game explode.
            if (isAutoCloseInProgress)
                return;
            doAutoClose.call(this, a, b);
        }
        catch (exc) {
            log(exc);
        }
        finally {
            return result;
        }
    }
    ;
    function hook_popClose() {
        isAutoCloseInProgress = false;
        return original_popClose.apply(this, arguments);
    }
    ;
    function hook_onPushOk() {
        isAutoCloseInProgress = false;
        return original_onPushOk.apply(this, arguments);
    }
    ;
    var remoteSocket = null;
    var tickIsPending = false;
    var retryCount = 2;
    function maybeInitWebSocket() {
        if (remoteSocket) {
            if ((remoteSocket.readyState === WebSocket.CLOSING) ||
                (remoteSocket.readyState === WebSocket.CLOSED))
                remoteSocket = null;
            else
                return;
        }
        var interval = -1, wasConnected = false;
        remoteSocket = new WebSocket("ws://vm:vm@127.0.0.1:8677/socket/viramate");
        remoteSocket.addEventListener("open", function () {
            log("ws connected");
            interval = setInterval(tickWebSocket, 200);
            wasConnected = true;
            sendMessage({ type: "connectionStatusChanged", connected: true });
        });
        remoteSocket.addEventListener("close", function () {
            tickIsPending = false;
            if (wasConnected)
                log("ws disconnected");
            clearInterval(interval);
            wasConnected = false;
            interval = -1;
            sendMessage({ type: "connectionStatusChanged", connected: false });
        });
        remoteSocket.addEventListener("message", handleWebSocketMessage);
        remoteSocket.addEventListener("error", function (e) {
            tickIsPending = false;
            if (retryCount > 0) {
                log("ws connection failed, retrying", e);
                retryCount--;
                setTimeout(maybeInitWebSocket, 2000);
            }
        });
    }
    ;
    function tickWebSocket() {
        if (tickIsPending)
            return;
        tickIsPending = true;
        remoteSocket.send(JSON.stringify({
            type: "tick",
            url: context.location.href
        }));
    }
    ;
    var nextSocketToken = 1;
    var previousWindowTitle = null;
    function handleWebSocketMessage(evt) {
        var msg = JSON.parse(evt.data);
        var response = undefined;
        switch (msg.type) {
            case "hello":
                log("ws handshake from " + msg.s);
                break;
            case "pushWindowTitle":
                if (previousWindowTitle === null)
                    previousWindowTitle = context.document.title;
                context.document.title = msg.title;
                response = true;
                break;
            case "popWindowTitle":
                if (previousWindowTitle !== null)
                    context.document.title = previousWindowTitle;
                previousWindowTitle = null;
                response = true;
                break;
            case "tickOk":
                tickIsPending = false;
                break;
            case "navigate":
                if (msg.url)
                    context.location.href = msg.url;
                if (msg.reload) {
                    window.setTimeout(function () {
                        context.location.reload();
                    }, 200);
                }
                response = true;
                break;
            case "getCombatState":
                response = getCombatState();
                break;
            case "querySelectorAll":
                response = [];
                var buildResponse = function (selector) {
                    var elements = context.document.querySelectorAll(selector);
                    for (var i = 0, l = elements.length; i < l; i++) {
                        var elt = elements[i];
                        var obj = {
                            tagName: elt.tagName,
                            id: elt.id,
                            name: elt.name,
                            text: elt.innerText,
                            attributes: {},
                            classNames: Array.from(elt.classList)
                        };
                        for (var a = elt.attributes, j = 0; j < a.length; j++)
                            obj.attributes[a[j].name] = a[j].value;
                        if (msg.mark) {
                            if (elt.hasAttribute("token"))
                                obj.token = elt.getAttribute("token");
                            else
                                elt.setAttribute("token", obj.token = (nextSocketToken++).toString(16));
                        }
                        response.push(obj);
                    }
                };
                if (typeof (msg.selector) === "string")
                    buildResponse(msg.selector);
                else {
                    for (var i = 0, l = msg.selector.length; i < l; i++)
                        buildResponse(msg.selector[i]);
                }
                break;
            case "getElementRect":
                var element = context.document.querySelector(msg.selector);
                if (element) {
                    // The game container's zoom needs to be applied to the client rect
                    var gc = context.document.querySelector("div.mobage-game-container") ||
                        context.document.querySelector("div.gree-game-container");
                    var computedStyle = context.getComputedStyle(gc);
                    var zoom = parseFloat(computedStyle.getPropertyValue("zoom"));
                    // Browser DPI also matters
                    var dpi = context.devicePixelRatio;
                    var ratio = zoom * dpi;
                    var pr = gc.getBoundingClientRect();
                    var cr = element.getBoundingClientRect();
                    // The client rect of the element has the container's native-res left/top added to it
                    // var offsetLeft = cr.left - pr.left;
                    // var offsetTop = cr.top - pr.top;                    
                    // Then we finally scale the element's (relative to container) size and offset by ratio
                    response = [
                        cr.left * ratio,
                        cr.top * ratio,
                        cr.width * ratio,
                        cr.height * ratio
                    ];
                }
                else {
                    response = [];
                }
                break;
            case "tryUseAbility":
                var className = "ability-character-num-" + msg.characterIndex + "-" + msg.abilityIndex;
                var icon = context.document.querySelector("div.prt-command-chara:not(.quick-panels) div." + className);
                if (!icon) {
                    response = "not found";
                    break;
                }
                var recast = icon.getAttribute("ability-recast");
                if (recast != 0) {
                    response = "on cooldown";
                    break;
                }
                if (icon.parentNode.className.indexOf("btn-ability-unavailable") >= 0) {
                    response = "disabled";
                    break;
                }
                generateClick(icon, false);
                response = "ok";
                break;
            case "tryClickElement":
                var element = context.document.querySelector(msg.selector);
                if (element) {
                    generateClick(element, false);
                    response = true;
                }
                else {
                    response = false;
                }
                break;
            case "trySetTarget":
                var element = context.document.querySelector("a.btn-targeting.enemy-" + msg.index);
                if (element && context.stage && context.stage.gGameStatus) {
                    if (context.stage.gGameStatus.target !== msg.index)
                        generateClick(element, false);
                    response = true;
                }
                else {
                    response = false;
                }
                break;
            case "trySetOugiStatus":
                var element = context.document.querySelector("div.btn-lock");
                if (element && context.stage && context.stage.gGameStatus) {
                    var isActive = context.stage.gGameStatus.lock === 0;
                    if (isActive !== msg.active)
                        generateClick(element, false);
                    response = true;
                }
                else {
                    response = false;
                }
                break;
            case "xhr":
                var xhrCallback = function (url, result, error, failed) {
                    remoteSocket.send(JSON.stringify({
                        type: "result",
                        id: msg.id,
                        result: {
                            url: url,
                            result: result,
                            error: error,
                            failed: failed
                        }
                    }));
                };
                doAjaxInternal({
                    url: msg.url,
                    data: msg.data,
                    callback: xhrCallback
                });
                break;
            case "waitForIdle":
                registerIdleWait(msg.id);
                break;
            default:
                sendMessage(msg);
                break;
        }
        if ((response !== undefined) && ("id" in msg)) {
            remoteSocket.send(JSON.stringify({
                type: "result",
                id: msg.id,
                result: response
            }));
        }
    }
    ;
    function canAct(gsm) {
        return !gsm.btn_lock &&
            !gsm.attacking &&
            !gsm.usingAbility &&
            !gsm.finish &&
            !!context.document.querySelector("div.btn-attack-start.display-on");
    }
    function getCombatState() {
        var response = gameStatusMessage;
        if (response) {
            response = JSON.parse(JSON.stringify(response));
            if (context.stage && context.stage.gGameStatus)
                response.skillQueue = context.stage.gGameStatus.attackQueue.$useAbility.map(function (e) {
                    if (typeof (e) === "string")
                        return e;
                    if (e[0] && (e[0].className.indexOf("btn-summon") >= 0))
                        return "Summon";
                    var elt = e[0].querySelector("div[ability-id]");
                    if (elt)
                        return elt.getAttribute("ability-id");
                    // FIXME: ???
                    return null;
                });
            else
                response.skillQueue = [];
            var elt = context.document.querySelector("div.prt-battle-num div.txt-info-num");
            if (elt && elt.firstChild) {
                response.currentBattle = parseInt(elt.firstChild.className.replace("num-info", ""));
                response.totalBattles = parseInt(elt.lastChild.className.replace("num-info", ""));
            }
            response.canAct = canAct(response);
        }
        return response;
    }
    function registerIdleWait(id) {
        var interval = -1;
        var initialUrl = context.location.href;
        var callback = function () {
            try {
                var cs = getCombatState();
                var isIdle = (cs.canAct ||
                    cs.finish) &&
                    ((cs.currentBattle === undefined) ||
                        (cs.currentBattle > 0)) &&
                    (cs.skillQueue.length < 1);
                if (!isCombatPage(context.location.hash))
                    isIdle = true;
                // HACK
                if (context.location.href !== initialUrl)
                    isIdle = true;
                if (isIdle && (interval >= 0)) {
                    clearInterval(interval);
                    interval = -1;
                    remoteSocket.send(JSON.stringify({
                        type: "result",
                        id: id,
                        result: gameStatusMessage.finish
                    }));
                }
            }
            catch (exc) {
                log(exc);
            }
        };
        interval = setInterval(callback, 50);
    }
    ;
    var actualDefine = undefined;
    var anonymousModule = null;
    function maybeHashModule(name, body) {
        if (!name)
            return;
        var moduleId = btoa(name.trim().toLowerCase());
        if (moduleIds.indexOf(moduleId) < 0)
            return;
        var hasher = new window.jsSHA("SHA-256", "TEXT");
        hasher.update(body);
        var hash = hasher.getHash("HEX");
        sendMessage({
            type: "moduleLoaded",
            id: moduleId,
            hash: hash
        });
    }
    ;
    var hook_onResourceLoad = function (context, map, depArray) {
        try {
            var name = map.name;
            var hook = moduleHooks[name];
            if (hook)
                hook(name);
        }
        catch (exc) {
        }
    };
    hook_onResourceLoad.toString = function () {
        return "function () {}";
    };
    var installRequireHook = function () {
        var rjs = context.requirejs;
        if (rjs.onResourceLoad)
            return;
        Object.defineProperty(rjs, "onResourceLoad", {
            enumerable: false,
            value: hook_onResourceLoad
        });
    };
    function processObjectModuleDefinition(name, dict) {
        var body = JSON.stringify(dict);
        maybeHashModule(name, body);
    }
    ;
    function processDependencyResolve(arr) {
    }
    ;
    function processFunctionModuleDefinition(name, fn) {
        var body = fn.toString();
        body = body.replace(/function \(/g, "function(");
        maybeHashModule(name, body);
    }
    ;
    function processModuleDefinition(args) {
        switch (args.length) {
            case 1:
                {
                    var arg = args[0];
                    var ta = typeof (arg);
                    if (ta === "object") {
                        if (Array.isArray(arg))
                            return processDependencyResolve(arg);
                        else
                            return processObjectModuleDefinition(null, arg);
                    }
                    else if (ta === "function") {
                        return processFunctionModuleDefinition(null, arg);
                    }
                }
                break;
            case 2:
                {
                    var arg0 = args[0];
                    var arg1 = args[1];
                    if (Array.isArray(arg0)) {
                        processDependencyResolve(arg0);
                        arg0 = anonymousModule;
                    }
                    if (typeof (arg1) === "function")
                        return processFunctionModuleDefinition(arg0, arg1);
                    else if (typeof (arg1) === "object")
                        return processObjectModuleDefinition(arg0, arg1);
                }
                break;
            case 3:
                {
                    var arg0 = args[0];
                    var arg1 = args[1];
                    var arg2 = args[2];
                    if (!arg0)
                        arg0 = anonymousModule;
                    if (Array.isArray(arg1))
                        processDependencyResolve(arg1);
                    if (typeof (arg2) === "function")
                        return processFunctionModuleDefinition(arg0, arg2);
                    else if (typeof (arg2) === "object")
                        return processObjectModuleDefinition(arg0, arg2);
                }
                break;
        }
    }
    ;
    var define = function define() {
        installRequireHook();
        var result = actualDefine.apply(this, arguments);
        try {
            if (!isShutdown)
                processModuleDefinition(Array.from(arguments));
        }
        catch (exc) {
            log("Error processing module definition", exc);
        }
        return result;
    };
    var set_define = function (value) {
        if (value)
            define.toString = value.toString.bind(value);
        actualDefine = value;
    };
    var get_define = function () {
        if (actualDefine)
            return define;
        else
            return actualDefine;
    };
    Object.defineProperty(context, "define", {
        enumerable: true,
        configurable: false,
        get: get_define,
        set: set_define
    });
    function doShutdown() {
        isShutdown = true;
        try {
            context.requestAnimationFrame = RAF_original;
            context.webkitRequestAnimationFrame = RAF_original;
            context.setTimeout = setTimeout_original;
            context.setInterval = setInterval_original;
            context.WebSocket = WebSocket_original;
            XHR.prototype.open = open_original;
            XHR.prototype.send = send_original;
            XHR.prototype.addEventListener = addEventListener_original;
            XHR.prototype.setRequestHeader = setRequestHeader_original;
            isLagWorkaroundActive = false;
            isPerformanceStatsActive = false;
            for (var i = 0, l = queuedFrameCallbacks.length; i < l; i++)
                context.requestAnimationFrame(queuedFrameCallbacks[i]);
        }
        catch (exc) {
            log("Error during shutdown", exc);
        }
        sendMessage({
            type: "shutdownOk"
        });
    }
    ;
    // Chrome's proxy implementation is broken such that XHRs will randomly 
    //  stall forever unless another request is issued through the proxy.
    // So, if any XHRs are in progress we fire off a garbage request to wake
    //  up the proxy.
    function proxyHeartbeat() {
        currentHeartbeatTimeout = null;
        if (!currentSettings.proxyHeartbeat)
            return;
        if (!resignedToBloodshed)
            return;
        if (liveXhrs.size < 1) {
            currentHeartbeatDelay = initialHeartbeatDelay;
            return;
        }
        var params = {
            method: "GET",
            mode: "cors",
            cache: "no-store",
            referrer: "no-referrer",
            credentials: "omit"
        };
        var req = new Request("http://luminance.org/hi?_=" + (heartbeatToken++));
        fetch(req);
        currentHeartbeatDelay += heartbeatDelayBackoffRate;
        currentHeartbeatTimeout = window.setTimeout(proxyHeartbeat, currentHeartbeatDelay);
    }
    ;
    var original_drawImage = context.CanvasRenderingContext2D.prototype.drawImage;
    context.CanvasRenderingContext2D.prototype.drawImage = function drawImage() {
        var wasEnabled = this.imageSmoothingEnabled;
        var result, started, ended;
        if (currentSettings && currentSettings.imageSmoothingHack)
            this.imageSmoothingEnabled = false;
        started = window.performance.now();
        try {
            result = original_drawImage.apply(this, arguments);
            ended = window.performance.now();
            var elapsed = (ended - started);
            /*
            if (elapsed > 3)
                log("drawImage took " + elapsed + " ms");
            */
        }
        finally {
            if (wasEnabled && currentSettings && currentSettings.imageSmoothingHack)
                this.imageSmoothingEnabled = wasEnabled;
            return result;
        }
    };
    context.CanvasRenderingContext2D.prototype.drawImage.toString = function toString() {
        return original_drawImage.toString();
    };
    context.CanvasRenderingContext2D.prototype.drawImage.toString.toString = function toString() {
        return original_drawImage.toString.toString();
    };
    function checkForFinishedRaidLoad() {
        var elt = context.document.querySelector("div#opaque-mask");
        if (!elt)
            return;
        if (elt.style.display !== "none")
            return;
        raidLoadEndObservedWhen = performance.now();
        window.clearInterval(raidLoadTimingInterval);
        raidLoadTimingInterval = null;
        log("Raid finished loading after " + ((raidLoadEndObservedWhen - raidLoadStartObservedWhen) / 1000).toFixed(2) + "secs.");
    }
    ;
    function startRaidLoadTimer() {
        if (context.location.host !== "game.granbluefantasy.jp")
            return;
        if (context.location.hash.indexOf("#raid/") < 0)
            return;
        if (!raidLoadTimingInterval) {
            raidLoadStartObservedWhen = performance.now();
            raidLoadTimingInterval = window.setInterval(checkForFinishedRaidLoad, 10);
        }
    }
    ;
    function doRaidPrefetch(settings, retryCount) {
        if (isShutdown)
            return;
        if (context.location.host !== "game.granbluefantasy.jp")
            return;
        if (context.location.hash.indexOf("#raid/") < 0)
            return;
        startRaidLoadTimer();
        retryCount = retryCount | 0;
        if (!context.Game || !context.Game.userId) {
            if (retryCount >= 100) {
                log("Game never loaded. Giving up on fastlane.");
                return;
            }
            window.setTimeout(function () {
                doRaidPrefetch(settings, retryCount + 1);
            }, 10);
            return;
        }
        var lastSeen = localStorage.getItem("pf-lastSeenVersion");
        var lastVerified = localStorage.getItem("pf-lastVerifiedVersion");
        var verified = (lastVerified === context.Game.version);
        if (!verified && settings.fastlaneDynamicPrefetch) {
            log("Unknown game version. Observing to see if prefetch is safe.");
            localStorage.setItem("pf-lastSeenVersion", context.Game.version);
        }
        else if (lastSeen !== context.Game.version) {
            localStorage.setItem("pf-lastSeenVersion", context.Game.version);
        }
        if (!settings.fastlaneDynamicPrefetch)
            return;
        var parts = context.location.hash.split("/");
        var raidId, indexFragment, startJson;
        if (parts.length === 3) {
            raidId = parts[1];
            indexFragment = parts[1];
            startJson = '{"special_token":null,"raid_id":"' + raidId + '","action":"start","reload_flg":true}';
        }
        else if (parts.length === 4) {
            raidId = parts[1];
            indexFragment = parts[1] + "/" + parts[2];
            startJson = '{"special_token":null,"raid_id":"' + parts[1] + '","action":"start","reload_flg":true,"speed":3}';
        }
        prefetchUrl(0, "http://game.granbluefantasy.jp/raid/content/index/" + raidId + "?", null, verified, null);
        prefetchUrl((Math.random() * 10) + 40, "http://game.granbluefantasy.jp/rest/raid/start.json?", startJson, verified, function (body) { return body.replace(/ /g, "").indexOf('"raid_id":"' + raidId + '"') > 0; });
    }
    ;
    getSettingsAsync(function (settings) {
        settings.fastlane = settings.fastlaneDynamicPrefetch;
        if (settings.fastlane)
            doRaidPrefetch(settings, 0);
        else
            startRaidLoadTimer();
    });
}

var nextInstallerMessageId = 1;
function sendInstallerNativeMessage(message, onResult) {
    var ple = chrome.runtime.lastError;
    chrome.runtime.sendNativeMessage("com.viramate.installer", message, function (result) {
        if (arguments.length === 0)
            onResult(null, chrome.runtime.lastError);
        else
            onResult(result, null);
    });
    var le = chrome.runtime.lastError;
    if (le && (le !== ple))
        onResult(null, le);
}
;
function sendInstallerCommand(name, onComplete) {
    var hasRetriedYet = false;
    var xhr;
    var id = nextInstallerMessageId++;
    var message = {
        type: name,
        id: id
    };
    if (!onComplete)
        onComplete = function (r, e) { };
    var onXhrError, onXhrLoad, attemptInit, attemptSend;
    attemptInit = function () {
        sendInstallerNativeMessage({ type: "init" }, function (result, error) {
            if (!result || error)
                console.log("Installer message send failed", error);
        });
    };
    attemptSend = function () {
        xhr = new XMLHttpRequest();
        xhr.addEventListener("error", onXhrError);
        xhr.addEventListener("load", onXhrLoad);
        xhr.responseType = "json";
        xhr.open("POST", "http://127.0.0.1:8678/vm", true);
        var json = JSON.stringify(message);
        xhr.send(json);
    };
    onXhrError = function (e) {
        if (hasRetriedYet) {
            console.log("Installer xhr failed, giving up", e);
            onComplete(null, "xhr failed twice");
        }
        else {
            console.log("Installer xhr failed, retrying", e);
            hasRetriedYet = true;
            window.setTimeout(attemptSend, 1000);
            attemptInit();
        }
    };
    onXhrLoad = function (e) {
        console.log("Installer xhr success", e, xhr.response);
        if (xhr.response && xhr.response.result)
            onComplete(xhr.response.result, null);
        else
            onComplete(xhr.response, null);
    };
    attemptSend();
}

var chatStampTable = null;
var isActionInProgress = false;
var isActionAnimating = false;
var hasAnActionSucceeded = false;
var lastActionStartedWhen = 0, lastSuccessfulActionStartedWhen = 0;
var nextActionId = Math.floor(Math.random() * 102400), currentActionId = null, previousActionId = null;
var lastEnhancementMaterials = {};
// 0-5 absolute party index
var lastPartyFormation = null;
// in start.json: 0-5 absolute party index
var lastPartyParam = null;
var lastPartyAbilityState = null;
var lastRaidStartData = null;
var isPartyStateRemote = false;
function onAjaxBegin(url, requestData, uid) {
    // console.log("ajax start", url, data);
    try {
        networkRequestCount++;
        networkRequestTotal++;
        updateNetworkHud();
    }
    catch (exc) {
        log(exc);
    }
    if (url.indexOf("/quest/create_quest") >= 0) {
        if (typeof (requestData) === "string")
            requestData = JSON.parse(requestData);
        var isCoOp = false;
        // HACK: This should stop us from recording co-op quests as recent quests
        if (requestData.quest_type === 7) {
            isCoOp = true;
        }
        if (!requestData.supporter_user_id) {
            // console.log("Not recording quest because it disallows support summons");
            return;
        }
        // hack for gw quests since they use the event hash prefix instead of quest
        var hash = window.location.hash;
        requestData.prefix = "/" + hash.split("/supporter")[0];
        if (isCoOp) {
            sendExtensionMessage({
                type: "setRecentCoOpHost",
                data: JSON.stringify(requestData)
            });
        }
        else {
            sendExtensionMessage({
                type: "setRecentQuest",
                url: JSON.stringify(requestData)
            });
        }
        return;
    }
    else if (url.indexOf("/normal_attack_result.json") >= 0) {
        onActionBegin(uid);
        onNormalAttackBegin();
        return;
    }
    else if (url.indexOf("/summon_result.json") >= 0) {
        onActionBegin(uid);
        onSummonBegin();
        return;
    }
    else if (url.indexOf("/ability_result.json") >= 0) {
        onActionBegin(uid);
        if (typeof (requestData) === "string")
            requestData = JSON.parse(requestData);
        if (!requestData.ability_id) {
            log("Skill activation has no ability id", requestData);
            return;
        }
        onAbilityCastStart(requestData.ability_id);
    }
    else if (url.indexOf("/user_recovery.json") >= 0) {
        onActionBegin(uid);
        return;
    }
    else if (url.indexOf("multiraid/start.json") >= 0) {
        // log("Raid started, invalidating raids list");
        if (invalidateRaidList)
            invalidateRaidList();
    }
    else if (url.indexOf("quest/decks_info/") >= 0) {
        lastDecksInfoUrl = url;
    }
    else if ((url.indexOf("result/data") >= 0) ||
        (url.indexOf("resultmulti/data") >= 0)) {
        // HACK
        hasLoadedQuestResults = true;
    }
}
;
function onAjaxComplete(bundle) {
    //console.log("ajax end  ", url);
    // on other pages /user/status is used to get the current status ->
    //  data.status
    // on the home page, it is bundled into /user/data_assets ->
    //  data.mydata.status
    var url = bundle.url;
    var requestData = bundle.requestData;
    var responseData = bundle.responseData;
    var uid = bundle.uid;
    try {
        var historyLength = 10;
        networkRequestCount--;
        networkDelayHistory.push(bundle.delay);
        networkDurationHistory.push(bundle.duration);
        if (networkDelayHistory.length > historyLength)
            networkDelayHistory.shift();
        if (networkDurationHistory.length > historyLength)
            networkDurationHistory.shift();
        updateNetworkHud();
    }
    catch (exc) {
        log(exc);
    }
    if ((typeof (requestData) === "string") && requestData) {
        try {
            requestData = JSON.parse(requestData);
        }
        catch (exc) {
        }
    }
    if ((typeof (responseData) === "string") && responseData) {
        try {
            responseData = JSON.parse(responseData);
        }
        catch (exc) {
        }
    }
    if (responseData && responseData.redirect) {
        log("Got redirect as response for " + url);
        return;
    }
    if (url.indexOf("/quest/create_quest") >= 0) {
        var questId = requestData.quest_id;
        var raidId = responseData.raid_id;
        sendExtensionMessage({ type: "recordRaidInfo", uid: uid, raidId: raidId, questId: questId });
        // HACK
        hasAnActionSucceeded = true;
        // console.log("create_quest", JSON.stringify(requestData), JSON.stringify(responseData));
    }
    else if (url.indexOf("/user/data_assets") >= 0) {
        if (responseData && responseData.mydata && responseData.mydata.status) {
            lastPlayerStatus = responseData.mydata.status;
            parseUserStatus(responseData.mydata.status, uid);
        }
    }
    else if (url.indexOf("/user/status") >= 0) {
        if (responseData) {
            lastPlayerStatus = responseData.status;
            parseUserStatus(responseData.status, uid);
        }
    }
    else if ((url.indexOf("/quest/content/newindex/") >= 0) ||
        (url.indexOf("/quest/content/newassist/") >= 0) ||
        (url.indexOf("/coopraid/content/index/") >= 0) ||
        (url.indexOf("/coopraid/content/room/") >= 0)) {
        if (responseData) {
            lastPlayerStatus = responseData.option.user_status;
            parseUserStatus(lastPlayerStatus, uid);
        }
    }
    else if (url.indexOf("/user/content/index") >= 0) {
        if (responseData) {
            lastPlayerStatus = responseData.option.mydata_assets.mydata.status;
            parseUserStatus(lastPlayerStatus, uid);
        }
    }
    else if (url.indexOf("/profile/content/index/" + uid) > 0) {
        if (responseData)
            parseProfile(responseData.data, uid);
    }
    else if (url.indexOf("item/normal_item_list/") > 0) {
        parseItemList(responseData, uid);
    }
    else if (url.indexOf("/normal_attack_result.json") >= 0) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        try {
            onActionResult(responseData, uid, failed);
        }
        finally {
            if ((typeof (responseData) === "object") && ("popup" in responseData)) {
                onNormalAttackFail();
            }
            else {
                onNormalAttackEnd();
            }
        }
        return;
    }
    else if (url.indexOf("/ability_result.json") >= 0) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        try {
            onActionResult(responseData, uid, failed);
        }
        finally {
            var abilityId = requestData.ability_id;
            if (!abilityId) {
                log("Skill activation has no ability id", requestData);
                return;
            }
            if (failed) {
                onAbilityCastFail(abilityId, responseData && responseData.popup ? responseData.popup.body : "unknown");
                return;
            }
            onAbilityCastEnd(abilityId);
        }
        return;
    }
    else if (url.indexOf("/summon_result.json") >= 0) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        onActionResult(responseData, uid, failed);
    }
    else if ((url.indexOf("/user_recovery.json") >= 0) ||
        (url.indexOf("/temporary_item_result.json") >= 0)) {
        var failed = (responseData && responseData.popup) ||
            (responseData && responseData.scenario &&
                responseData.scenario[0] && (responseData.scenario[0].cmd === "finished"));
        try {
            onActionResult(responseData, uid, failed);
        }
        finally {
            // HACK: If someone like bea is in front and then an elixir pushes her to the back,
            //  her clock buff would remain visible without this
            requestBuffsRefresh();
        }
    }
    else if (url.indexOf("quest/assist_list/0") >= 0) {
        if (invalidateRaidList)
            invalidateRaidList(responseData);
        if (doUpdateRaidsPanel)
            doUpdateRaidsPanel(responseData);
        return;
    }
    else if (url.indexOf("/guild_main/support_all_info/") >= 0) {
        if (doUpdateGuildSupportBuffs)
            doUpdateGuildSupportBuffs(responseData);
        return;
    }
    else if (url.indexOf("/shop_exchange/activated_personal_supports/") >= 0) {
        if (doUpdatePersonalSupportBuffs)
            doUpdatePersonalSupportBuffs(responseData);
        return;
    }
    else if (url.indexOf("/shop_exchange/activate_personal_support") >= 0) {
        if (invalidateSupportBuffs)
            invalidateSupportBuffs();
        return;
    }
    else if ((url.indexOf("item/article_list") >= 0) ||
        (url.indexOf("item/article_list_by_filter_mode") >= 0)) {
        mostRecentItems = responseData;
        if (invalidateItems)
            invalidateItems(responseData);
        if (doUpdateItemsPanel)
            doUpdateItemsPanel(responseData);
        if (showItemWatchButtons) {
            var siwb = showItemWatchButtons;
            showItemWatchButtons = null;
            siwb();
        }
        return;
    }
    else if ((url.indexOf("present/receive") >= 0) ||
        (url.indexOf("coopraid/exchange") >= 0) ||
        (url.indexOf("shop_exchange/purchase") >= 0) ||
        (url.indexOf("evolution_npc/item_evolution") >= 0) ||
        (url.indexOf("weapon_purchase") >= 0)) {
        if (invalidateItems)
            invalidateItems();
    }
    else if ((url.indexOf("result/data") >= 0) ||
        (url.indexOf("resultmulti/data") >= 0)) {
        parseQuestResult(url, responseData, uid);
    }
    else if (url.indexOf("quest/check_multi_start") >= 0) {
        // HACK: This always has both the quest and raid ID.
        // console.log("check_multi_start", requestData, responseData);
        sendExtensionMessage({ type: "recordRaidInfo", uid: uid, raidId: requestData.raid_id, questId: requestData.quest_id });
    }
    else if (url.indexOf("raid/start.json") >= 0) {
        serverSkillState = null;
        if (responseData) {
            // TODO: Timestamp of request start instead of end?
            raidStateTimestamp = Date.now();
            lastRaidStartData = responseData;
            lastPartyFormation = responseData.formation;
            lastPartyParam = responseData.player.param;
            lastPartyAbilityState = responseData.ability;
            currentFieldEffectsTimestamp = 0;
            currentFieldEffects = null;
            if (responseData.field_effect && responseData.field_effect.length) {
                if (!isFieldEffectUpdatePending)
                    log("Updating field effects because raid start said we have some");
                isFieldEffectUpdatePending = true;
            }
            if (responseData.chat)
                chatStampTable = responseData.chat[9999];
            parseServerPlayerState(true);
        }
        // console.log("Raid start", requestData, responseData);
    }
    else if (url.indexOf("/decks_info/") >= 0) {
        if (responseData && responseData.decks)
            showDeckNames(responseData.decks);
    }
    else if (url.indexOf("/deck_combination_list/") >= 0) {
        if (responseData && responseData.list)
            showDeckNames(responseData.list);
    }
    else if (url.indexOf("quest/extra_normal_quest") >= 0) {
        if (!responseData || !responseData.quest_list)
            return;
        sendExtensionMessage({ type: "updateExtraNormalQuests", uid: uid, quests: responseData.quest_list.group });
    }
    else if (url.indexOf("/multi_member_info") >= 0) {
        if (!responseData)
            return;
        currentPointStandings = responseData.mvp_info;
        if (isRemoteConnected)
            sendExternalMessage({
                type: "sendToRemote",
                data: {
                    type: "standingsChanged",
                    standings: responseData.mvp_info
                }
            });
    }
    else if (url.indexOf("/party/deck") >= 0) {
        if (responseData && responseData.deck)
            mostRecentDeck = responseData.deck;
        else
            mostRecentDeck = null;
    }
    else if (url.indexOf("raid/field_effect/") >= 0) {
        currentFieldEffectsTimestamp = Date.now();
        currentFieldEffects = responseData;
        if (!responseData)
            return;
        for (var i = 0; i < responseData.length; i++) {
            var cfe = responseData[i];
            if (cfe.class === "time") {
                cfe.originalDuration = getExpiresWhen(0, cfe.remain);
                // HACK
                var minDuration = (3 * 60 * 1000);
                if (cfe.originalDuration < minDuration)
                    cfe.originalDuration = minDuration;
                cfe.expiresWhen = getExpiresWhen(currentFieldEffectsTimestamp, cfe.remain);
            }
        }
    }
    else if (url.indexOf("/enhancement_materials/") >= 0) {
        if (!responseData || !responseData.options || !responseData.list)
            return;
        if (currentSettings.detailedUpgradePage)
            processUpgradeData(responseData.list, responseData.options.status_name);
    }
    else {
        // console.log("ajax", url, requestData, responseData);
    }
}
;
function onWebSocketMessage(data) {
    var offset = data.indexOf("[");
    if (offset < 0)
        return;
    var bundle = JSON.parse(data.substr(offset));
    if (bundle[0] !== "raid")
        return;
    var packets = bundle[1];
    for (var k in packets) {
        if (!packets.hasOwnProperty(k))
            continue;
        onRaidPacket(k, packets[k]);
    }
}
;
function onRaidPacket(name, packet) {
    switch (name) {
        case "battleFinish":
            if (luckyDay)
                return;
            if (!currentSettings.autoSkipToRaidResults)
                return;
            if (combatState) {
                log("Battle finished, checking for results...");
                // force an update to prevent the debuff panel/skill queue from sticking
                combatState.finish = true;
                refreshConditionUI();
                var raidId = combatState.raid_id;
                var url = window.location.href;
                if (suppressAutoSkip) {
                    log("Another window is already navigating to the results screen.");
                    return;
                }
                autoSkipInProgress = true;
                window.setTimeout(function () { checkForBattleResults(raidId, 1000, 0, url); }, 2900);
            }
            break;
        case "bossUpdate":
            // packet.param.bossN_mode_gauge
            break;
        case "bossKill":
            break;
        case "bossRecast":
            // Boss gauge changed?
            log("Got bossRecast packet", packet);
            break;
        case "memberJoin":
        // HACK: Fall-through because this also has an mvp list
        case "mvpUpdate":
        case "mvpReset":
            currentPointStandings = packet.mvpList;
            // FIXME: How are these different?
            if (isRemoteConnected)
                sendExternalMessage({
                    type: "sendToRemote",
                    data: {
                        type: "standingsChanged",
                        standings: packet.mvpList
                    }
                });
            break;
        case "chatAdd":
            parseChatMessage(packet);
            break;
        case "logAdd":
            parseLogMessage(packet);
            break;
        case "userCondition":
            parseUserConditionMessage(packet);
            break;
        case "userParam":
            log("got userParam packet");
            // Raid player HP update, apparently? Bizarre.
            /*
                {
                    timestamp: "n.n",
                    member: [obj, obj, obj, obj],
                    membersParams: {
                        user_id: [obj, obj, obj, ...],
                        user_id: [obj, obj, obj, ...]
                    }
                }

                member {
                    hp_ratio: [0-100],
                    nickname: "...",
                    pc_attribute: [0-6],
                    pc_image: "...",
                    pc_image_original: "...",
                    user_id: "n",
                    viewer_id: "m"
                }

                membersParamsElt {
                    num: [0-5],
                    param: {
                        hp: n,
                        hpmax: n
                    }
                }
            */
            break;
        case "logPop":
            // What is this?
            break;
        case "battleLose":
            // A player died
            break;
        case "battleRematch":
            // A player rejoined?
            break;
        case "summonUpdate":
            // Another player used a summon (that you can cross?)
            break;
        case "scenarioPlay":
            // Boss HP triggers??
            log("got scenarioPlay packet", packet);
            break;
        case "bgmPlay":
            // log(name, packet);
            break;
        case "fieldEffect":
            // Field effect changed?
            isFieldEffectUpdatePending = true;
            break;
        default:
            log(name, packet);
            break;
    }
}
;
var estimatedRpToNextRank = null;
function parseQuestResult(url, data, uid) {
    hasLoadedQuestResults = true;
    estimatedRpToNextRank = null;
    var searchItemId;
    var searchItemPredicate = function (item) {
        return item.item_id == searchItemId;
    };
    var addItem = function (id, count, name) {
        searchItemId = id;
        var itemInfo = findItemInfo(searchItemPredicate);
        if (!itemInfo) {
            log("Couldn't find item '" + id + "' in items table");
            return;
        }
        itemInfo.number = String(Number(itemInfo.number) +
            Number(count));
        log(name + " += " + count + " -> " + itemInfo.number);
    };
    if (mostRecentItems && data && data.rewards) {
        var rewards = data.rewards;
        for (var k in rewards.article_list) {
            var obj = rewards.article_list[k];
            addItem(obj.id, obj.count, obj.name);
        }
        for (var k in rewards.reward_list) {
            var sublist = rewards.reward_list[k];
            for (var k2 in sublist) {
                var obj = sublist[k2];
                if ((obj.type === "weapon") ||
                    (obj.type === "summon"))
                    continue;
                addItem(obj.id, obj.count || 1, obj.name);
            }
        }
        if (invalidateItems)
            invalidateItems(mostRecentItems);
    }
    else if (invalidateItems) {
        invalidateItems();
    }
    if (isRemoteConnected)
        sendExternalMessage({
            type: "sendToRemote",
            data: {
                type: "questResult",
                data: data
            }
        });
    var msg = {
        type: "recordRewards",
        uid: uid, url: url,
        response: data
    };
    sendExtensionMessage(msg);
    if (!(data && data.values && data.values.pc))
        return;
    if (!currentSettings.showNextRankExp)
        return;
    var param = data.values.pc.param;
    var gainedExp = (param.new.exp - Number(param.base.exp));
    estimatedRpToNextRank = param.remain_next_exp - gainedExp;
    var rankup = document.querySelector("div.prt-player-exp div.prt-rankup");
    if (!rankup)
        return;
    if (estimatedRpToNextRank <= 0)
        return;
    var textNode = document.createTextNode("Next in " + estimatedRpToNextRank);
    rankup.appendChild(textNode);
}
;
function onActionBegin(uid) {
    // HACK
    isActionInProgress = true;
    var now = Date.now();
    lastActionStartedWhen = now;
    currentActionId = currentBattleTabId + ":" + nextActionId++;
    sendExtensionMessage({
        type: "actionStarted", uid: uid,
        when: now, actionId: currentActionId
    });
}
;
function onActionResult(data, uid, failed) {
    isActionInProgress = false;
    if (!failed) {
        hasAnActionSucceeded = true;
        lastSuccessfulActionStartedWhen = lastActionStartedWhen;
        isActionAnimating = true;
    }
    else {
        isActionAnimating = false;
        if (isRemoteConnected)
            sendExternalMessage({
                type: "sendToRemote",
                data: {
                    type: (data && data.scenario &&
                        data.scenario[0] && (data.scenario[0].cmd === "finished"))
                        ? "battleEnded"
                        : "actionFailed",
                    data: data,
                    uid: uid
                }
            });
    }
    var now = Date.now();
    sendExtensionMessage({
        type: "actionEnded", succeeded: !failed,
        when: now, uid: uid,
        actionId: currentActionId
    });
    // HACK to ensure we update after reviving the party
    window.requestAnimationFrame(function () {
        partyStateIsDirty = true;
    });
    if (!data)
        return;
    var shouldPush = false;
    raidStateTimestamp = Date.now();
    if (data.status) {
        if (data.status.ability)
            lastPartyAbilityState = data.status.ability;
        if (data.status.formation)
            lastPartyFormation = data.status.formation;
        // TODO: Record summon status
        shouldPush = true;
    }
    if (!data.scenario) {
        if (shouldPush && !failed)
            parseServerPlayerState(true);
        return;
    }
    for (var i = 0, l = data.scenario.length; i < l; i++) {
        var cmd = data.scenario[i];
        switch (cmd.cmd) {
            case "condition":
                if (cmd.to === "field_effect") {
                    if ((cmd.condition.length > 0) && ((!currentFieldEffects) ||
                        (currentFieldEffects.length !== cmd.condition.length))) {
                        isFieldEffectUpdatePending = true;
                    }
                    continue;
                }
                break;
            case "super":
                showTransientMessage(cmd.name);
                if (isRemoteConnected)
                    sendExternalMessage({
                        type: "sendToRemote",
                        data: {
                            type: "enemyUsedSuper",
                            name: cmd.name,
                            kind: cmd.kind,
                            target: cmd.target,
                            pos: cmd.pos,
                            attr: cmd.attr
                        }
                    });
                break;
            case "replace":
                log("Party member replaced at position " + cmd.pos + " with party member #" + cmd.npc);
                break;
            case "damage":
            case "heal":
                if (cmd.to === "player") {
                    for (var j = 0; j < cmd.list.length; j++) {
                        var damage = cmd.list[j];
                        var pos = damage.pos;
                        var characterIndex = lastPartyFormation[pos];
                        if (!characterIndex)
                            continue;
                        var characterParam = lastPartyParam[characterIndex];
                        if (!characterParam)
                            continue;
                        characterParam.hp = damage.hp;
                    }
                    shouldPush = true;
                }
                break;
            case "recast":
                if (cmd.to === "player") {
                    var pos = cmd.pos;
                    var characterIndex = lastPartyFormation[pos];
                    if (!characterIndex)
                        continue;
                    var characterParam = lastPartyParam[characterIndex];
                    if (!characterParam)
                        continue;
                    characterParam.recast = cmd.value;
                    shouldPush = true;
                }
                break;
        }
        // TODO: Handle 'replace' and update front row params
        // TODO: Handle 'formchange' and update party params
        // TODO: Handle 'damage' and update party hp
        if (cmd.cmd !== "message")
            continue;
        if (!cmd.data)
            continue;
        for (var to in cmd.data) {
            if (!cmd.data.hasOwnProperty(to))
                continue;
            var list = cmd.data[to];
            for (var j = 0, l2 = list.length; j < l2; j++) {
                var group = list[j];
                for (var k = 0, l3 = group.length; k < l3; k++) {
                    var message = group[k];
                    if (!message.status)
                        continue;
                    if (!currentConditions)
                        return;
                    var cc = null;
                    switch (to) {
                        case "boss":
                            cc = currentConditions.enemy[message.pos];
                            break;
                        case "player":
                            cc = currentConditions.party[message.pos];
                            break;
                    }
                    if (!cc)
                        return;
                    if (cmd.to === "boss") {
                        if (!cc.updateRequested) {
                            // log("Requesting condition update because player action applied a condition");
                            cc.updateRequested = true;
                        }
                    }
                    else {
                        if (!cc.updateRequested) {
                            // log("Requesting condition update because player action applied a condition");
                            cc.updateRequested = true;
                            refreshBuffsButtonAnimation();
                        }
                    }
                }
            }
        }
    }
    if (shouldPush && !failed)
        parseServerPlayerState(true);
}
;
var networkRequestCount = 0;
var networkRequestTotal = 0;
var networkDelayHistory = [];
var networkDurationHistory = [];
var needToShowNetworkHud = true;
var hideNetworkHudTimeoutHandle = null;
var networkHudElement = null;
function updateNetworkHud() {
    if (!currentSettings.showNetworkHud) {
        networkDelayHistory.length = 0;
        networkDurationHistory.length = 0;
        return;
    }
    var now = performance.now();
    var uic = getUiContainer();
    if (!networkHudElement) {
        networkHudElement = document.createElement("div");
        networkHudElement.className = "network-hud";
        networkHudElement.style.opacity = 0.0;
        if (currentSettings.hideMobageSidebar)
            networkHudElement.style.right = "0px";
        else
            networkHudElement.style.left = "0px";
        injectElement(uic, networkHudElement);
        setTimeout(function () {
            networkHudElement.style.opacity = 1.0;
        }, 5);
    }
    else if (needToShowNetworkHud) {
        networkHudElement.style.opacity = 1.0;
        needToShowNetworkHud = false;
    }
    var minDelay = 999999, maxDelay = 0, delaySum = 0;
    var minDuration = 999999, maxDuration = 0, durationSum = 0;
    for (var i = 0, l = networkDelayHistory.length; i < l; i++) {
        var delay = networkDelayHistory[i];
        var duration = networkDurationHistory[i];
        minDelay = Math.min(minDelay, delay);
        maxDelay = Math.max(maxDelay, delay);
        delaySum += delay;
        minDuration = Math.min(minDuration, duration);
        maxDuration = Math.max(maxDuration, duration);
        durationSum += duration;
    }
    var avgDelay = delaySum / networkDelayHistory.length;
    var avgDuration = durationSum / networkDurationHistory.length;
    if (networkDelayHistory.length <= 0)
        avgDelay = 0;
    if (networkDurationHistory.length <= 0)
        avgDuration = 0;
    var html = "";
    var numDots = 9;
    for (var i = 0; i < numDots; i++) {
        if (i < networkRequestCount)
            html += "\u2022";
        else
            html += "&nbsp;";
    }
    html +=
        "<br>" +
        "wait " + (maxDelay / 1000).toFixed(2) + "<br>" +
        "&nbsp;avg " + (avgDelay / 1000).toFixed(2) + "<br>" +
        "dur &nbsp;" + (maxDuration / 1000).toFixed(2) + "<br>" +
        "&nbsp;avg " + (avgDuration / 1000).toFixed(2);
    networkHudElement.innerHTML = html;
    if (hideNetworkHudTimeoutHandle)
        clearTimeout(hideNetworkHudTimeoutHandle);
    hideNetworkHudTimeoutHandle = setTimeout(hideNetworkHud, 5000);
}
;
function hideNetworkHud() {
    if (!networkHudElement)
        return;
    // networkTimingHistory.length = 0;
    networkHudElement.style.opacity = 0.5;
    needToShowNetworkHud = true;
}
;
function parseChatMessage(packet) {
    if (packet && packet.commentData && packet.commentData.isStamp) {
        var stampImageName = packet.commentData.content;
        // HACK: Phalanx sticker
        if (stampImageName === "stamp19.png")
            schedulePartyBuffCheck("phalanx sticker");
    }
}
;
function parseLogMessage(packet) {
    // "{"timestamp":"1484328461.53431900","log":[{"viewer_id":"125380620","user_id":"10777899","comment":{"ja":"[02:27] Kateのパーティが攻撃<br><span class=\"red\">→117908ダメージを与えた！</span>","en":"[02:27] Kate's party attacked!<br><span class=\"red\">117908 damage!</span>"},"type":1}]}"
    for (var i = 0, l = packet.log.length; i < l; i++) {
        var entry = packet.log[i];
        if ((entry.comment.en && (entry.comment.en.indexOf("Phalanx") >= 0)) ||
            (entry.comment.ja && (entry.comment.ja.indexOf("ファランクス") >= 0))) {
            schedulePartyBuffCheck("phalanx message");
            return;
        }
    }
}
;
function parseUserConditionMessage(packet) {
    if (!packet || !packet.membersConditions)
        return;
    var conditions = packet.membersConditions[currentBattleUid];
    if (!conditions)
        return;
    window.setTimeout(function () {
        schedulePartyBuffCheck("raid event");
    }, 500);
}
;
function schedulePartyBuffCheck(reason) {
    if (!currentSettings.showPartyHelp)
        return;
    for (var i = 0; i < currentConditions.party.length; i++) {
        var cc = currentConditions.party[i];
        cc.updateRequested = true;
        refreshBuffsButtonAnimation();
    }
    if (reason)
        log("Scheduled party buff check because of " + reason);
}

var storedSupportsPage = null;
var lastDecksInfoUrl = null;
var mostRecentDeck = null;
function handleNewPage() {
    resetState();
    if (tryHandleIdleTimeout())
        return;
    // HACK: This can't be done in handleNewPage because of latency
    var isJobPage = location.hash.indexOf("party/job/") >= 0;
    var isIndexPage = location.hash.indexOf("party/index/") >= 0;
    // If we're supposed to bounce them back from a quick class/weapon change, do it now
    if ((isJobPage || isIndexPage) && storedSupportsPage) {
        var ssp = storedSupportsPage;
        storedSupportsPage = null;
        window.location.href = "/" + ssp;
    }
    sendExtensionMessage({ type: "heartbeat" });
    updateSettings(handleNewPageInner);
}
;
function tryHandleIdleTimeout() {
    if (window.location.hash === "#mypage") {
        // HACK: Flag idle timeout/maintenance as being suppressed
        getUserIdAndTabIdAsync(function (uid, tabId) {
            sendExtensionMessage({ type: "cancelSuspend", uid: uid });
        });
        sendExtensionMessage({ type: "getIdleRedirectInfo" }, function (info) {
            if (info &&
                info.pending) {
                sendExtensionMessage({ type: "setIdleRedirectPending", state: false, url: info.location });
                if (window.location.href === info.location) {
                    log("Not redirecting to " + info.location + " after idle timeout.");
                    return;
                }
                if (info.location === info.lastRedirectTarget) {
                    log("Last redirect to " + info.location + " didn't work... ignoring.");
                    return;
                }
                log("Redirecting to " + info.location + " after idle timeout.");
                window.location.href = info.location;
                window.setTimeout(function () {
                    window.location.reload();
                }, 333);
            }
        });
        return false;
    }
    if (window.location.hash === "#authentication") {
        // TODO: Handle idle logout
        log("Idle logout occurred.");
        return false;
    }
    if (window.location.hash !== "#top") {
        // HACK: Flag idle timeout/maintenance as being suppressed
        // TODO: Handle maintenance notice page?
        getUserIdAndTabIdAsync(function (uid, tabId) {
            sendExtensionMessage({ type: "cancelSuspend", uid: uid });
        });
        sendExtensionMessage({ type: "setLastLocation", url: window.location.href });
        return false;
    }
    sendExtensionMessage({ type: "getLastLocation" }, function (lastLocation) {
        if (lastLocation) {
            sendExtensionMessage({ type: "setIdleRedirectPending", state: true });
            log("Idle timeout bounced us from " + lastLocation + " to home screen.");
        }
    });
    if (chrome.runtime.lastError)
        log(chrome.runtime.lastError);
    return true;
}
;
function isCombatPage(hash) {
    // FIXME: More prefixes
    return hash.startsWith("#raid/") ||
        hash.startsWith("#raid_multi/") ||
        hash.startsWith("#raid_semi/");
}
;
function handleNewPageInner() {
    var hash = window.location.hash;
    resizeSubmenu();
    maybeInstallDropdownHack();
    if (shouldHandleTouchInput()) {
        removeTouchEndCanceler();
    }
    if (!isCombatPage(hash)) {
        var dt = getUiContainer().querySelector("div.debuff-timers");
        if (dt)
            getUiContainer().removeChild(dt);
    }
    window.setTimeout(function () {
        if (updateRaidsPanel && !pendingRaidUpdate)
            updateRaidsPanel();
        if (updateStatusPanel)
            updateStatusPanel(false, true);
        if (updateItemsPanel)
            updateItemsPanel();
    }, 500);
    if ((hash.indexOf("/supporter/") >= 0) ||
        (hash.indexOf("/supporter_raid/") >= 0) ||
        (hash.indexOf("/supporter_defend_order/") >= 0) ||
        (hash.indexOf("/supporter_raid_do/") >= 0) ||
        (hash.indexOf("/supporter_lobby/") >= 0)) {
        processSupporterPage();
    }
    else if (isCombatPage(hash)) {
        // FIXME: Do this less aggressively
        if (invalidateStatus)
            invalidateStatus();
        prepareCombatUI();
        processCombatPage();
        if (shouldHandleTouchInput()) {
            installTouchEndCanceler();
        }
        return;
    }
    else if (hash.indexOf("zenith/npc") >= 0) {
        processZenithPage();
    }
    else if (hash.indexOf("enhancement/") >= 0) {
        processEnhancementPage();
    }
    else if ((hash.indexOf("container/") >= 0) ||
        (hash.indexOf("list/move/") >= 0) ||
        (hash.indexOf("sell/") >= 0) ||
        (hash.indexOf("guild/airship/enhance") >= 0)) {
        enableDragSelect();
    }
    else if (hash.indexOf("/scene/") >= 0) {
        processScenePage();
    }
    else if (hash.indexOf("#party/") >= 0) {
        processPartyPage();
    }
    else if (hash.indexOf("#quest/stage") >= 0) {
        processQuestStagePage();
    }
    else if (hash.indexOf("#quest/assist") >= 0) {
        processRaidListPage();
    }
    else if (hash.indexOf("#quest/") >= 0) {
        processMiscellaneousQuestPage();
    }
    else if (hash.indexOf("#mypage") >= 0) {
        processMyPage();
    }
    else if (hash.indexOf("#setting/stamps") >= 0) {
        /*
        waitForElementToExist(
            document, "div.lis-stamp img",
            function (img) {
                img.parentNode.setAttribute("chatid", img.getAttribute("data-stamp-id"));
            }, true
        );
        */
    }
    else if ((hash.indexOf("#coopraid/offer") >= 0) ||
        (hash.indexOf("#coopraid/room") >= 0) ||
        (hash.indexOf("#lobby/room") >= 0)) {
        if (currentSettings.enableCoOpEnhancements) {
            processCoOpPage();
            if (shouldHandleTouchInput()) {
                installTouchEndCanceler();
            }
        }
    }
    else if (hash.indexOf("gacha/lineup") >= 0 ||
        hash.indexOf("gacha/result") >= 0 ||
        hash.search(/event\/teamraid[\d]+\/gacha\/index/) >= 0) {
        processEventGachaLineupPage();
    }
    else if (hash.indexOf("#item") >= 0) {
        processItemPage();
    }
    else if (hash.indexOf("archaic/") >= 0) {
        processWeaponShopPage();
    }
    else if (hash.indexOf("evolution/") >= 0) {
        processUncapPage();
    }
    else if (hash.indexOf("shop/exchange") >= 0) {
        processExchangeShopPage();
    }
    else if (hash.indexOf("result_") >= 0) {
        processResultPage();
    }
    else if (window.location.hash.search(/event\/teamraid[\d]+$/) >= 0) {
        processGuildWarPage();
    }
    else {
        // console.log("Unknown page");
    }
    resetRaidCode();
}
;
function triggerRaidListRefresh() {
}
;
function processRaidListPage() {
    if (currentSettings.realtimeRaidList)
        pollingInterval = window.setInterval(triggerRaidListRefresh, 30000);
}
;
function _showWatchButton(element, itemId, isActive) {
    if (!itemId)
        return;
    var onClick = function (evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        var newState = evt.target.className.indexOf("active") < 0;
        if (newState) {
            log("Adding watch on item " + itemId);
            evt.target.className = "watch-button active";
        }
        else {
            log("Removing watch on item " + itemId);
            evt.target.className = "watch-button";
        }
        sendExtensionMessage({ type: "setItemWatchState", id: itemId, state: newState });
        // FIXME: update instead of doUpdate?
        if (doUpdateItemsPanel)
            doUpdateItemsPanel();
    };
    var watchButton = document.createElement("div");
    watchButton.className = "watch-button" +
        (isActive ? " active" : "");
    watchButton.title = "Show item on sidebar";
    watchButton.setAttribute("itemId", itemId);
    watchButton.addEventListener("mouseup", onClick, true);
    injectElement(element, watchButton);
}
;
function showWatchButtons(containerSelector, itemSelector, getItemId) {
    if (!currentSettings.showItemWatchButtons)
        return;
    var watchedItems = {
        items: [],
        counts: {}
    };
    var showWatchButton = function (element) {
        var itemId = getItemId(element);
        if (itemId === null)
            return;
        var isActive = watchedItems.items.indexOf(itemId) >= 0;
        _showWatchButton(element, itemId, isActive);
    };
    sendExtensionMessage({ type: "getWatchedItems" }, function (_watchedItems) {
        watchedItems = _watchedItems;
        waitForElementToExist(document, containerSelector, function (container) {
            waitForElementToExist(container, itemSelector, showWatchButton, true);
        }, true);
    });
}
;
var showItemWatchButtons = null;
function processItemPage() {
    var parseRe = /item\/article\/s\/([0-9]+)\..+/;
    var getItemId = function (treasure) {
        var itemImage = treasure.querySelector("img").src;
        var m = parseRe.exec(itemImage);
        if (!m)
            return;
        var itemImageStem = m[1];
        if (!itemImageStem)
            return;
        var itemInfo = findItemInfo(function (item) {
            return item.image == itemImageStem;
        });
        if (!itemInfo)
            return;
        var itemId = parseInt(itemInfo.item_id);
        return itemId;
    };
    showItemWatchButtons = function () {
        showWatchButtons("div.prt-item-list div.prt-item-filter", "div.lis-item", getItemId);
    };
}
;
function processWeaponShopPage() {
    var getItemId = function (articleIcon) {
        var kind = parseInt(articleIcon.getAttribute("data-kind"));
        if (kind !== 10)
            return null;
        var itemId = parseInt(articleIcon.getAttribute("data-id"));
        return itemId;
    };
    showWatchButtons("div.cnt-item", "div.btn-article-icon", getItemId);
}
;
function processUncapPage() {
    var getItemId = function (articleIcon) {
        var kind = parseInt(articleIcon.getAttribute("data-item-kind"));
        if (kind !== 10)
            return null;
        var itemId = parseInt(articleIcon.getAttribute("data-material-id"));
        return itemId;
    };
    showWatchButtons("div.prt-module-evolution", "div.btn-material", getItemId);
}
;
function processExchangeShopPage() {
    var getItemId = function (itemIcon) {
        if (!itemIcon.hasAttribute("data-item-id"))
            return null;
        // HACK
        itemIcon.style.position = "relative";
        var itemId = parseInt(itemIcon.getAttribute("data-item-id"));
        return itemId;
    };
    showWatchButtons("div.cnt-exchange-list", "div.item-explain", getItemId);
}
;
function processCoOpPage() {
    waitForElementToExist(document, "div.pop-usual.pop-room-detail", function (joinPopup) {
        var joinButton = joinPopup.querySelector("div.btn-usual-join");
        if (!joinButton) {
            console.log("Room can't be joined");
            return;
        }
        console.log("Attempting to join room");
        pulseElement(joinButton);
        generateClick(joinButton);
    }, true);
    waitForElementToExist(document, "div.txt-room-id", function (elt) {
        elt.addEventListener("mousedown", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            window.getSelection().selectAllChildren(elt);
        }, true);
        elt.addEventListener("click", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }, true);
        elt.addEventListener("mouseup", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }, true);
    }, true);
}
;
function processGuildWarPage() {
    sendExtensionMessage({ type: "setCurrentGuildWar", href: window.location.hash.substr(1) });
    var parser = new DOMParser();
    var allRaidInfo = Object.create(null);
    waitForElementToExist(document, "script[type='text/template']", function (templateElement) {
        var templateFragment = parser.parseFromString(templateElement.textContent, "text/html");
        var buttons = templateFragment.querySelectorAll(".btn-multi-battle");
        for (var j = 0; j < buttons.length; j++) {
            var button = buttons[j];
            var cost = button.getAttribute("data-ap");
            if (!cost)
                continue;
            if (button.getAttribute("data-type") != "1")
                continue;
            var chapterId = button.getAttribute("data-chapter-id").trim();
            var chapterLastDigit = chapterId[chapterId.length - 1];
            // EX+ is 61, nm90 is 71, etc
            if (chapterLastDigit < "6")
                continue;
            var raidInfo = {
                name: button.getAttribute("data-chapter-name") || button.getAttribute("data-quest-name"),
                cost: cost,
                id: chapterId,
                // gross
                isHell: button.innerHTML.indexOf("_hell") >= 0
            };
            allRaidInfo[chapterId] = raidInfo;
            console.log(raidInfo);
            sendExtensionMessage({ type: "setCurrentGuildWarRaidInfo", raids: JSON.stringify(allRaidInfo) });
        }
    }, true);
}
;
function processMyPage() {
    // FIXME: Handle multiple events
    waitForElementToExist(document, "div.btn-banner.location-href", function (eventBanner) {
        // HACK: Scan all the visible events and pick the first one.
        //  Good enough? This still acts odd on guild wars
        var banners = document.querySelectorAll("div.btn-banner.location-href");
        var eventHref = null;
        var guildWarHref = null;
        for (var i = 0, l = banners.length; i < l; i++) {
            var href = banners[i].getAttribute("data-location-href");
            if (href && (href.indexOf("teamraid") >= 0)) {
                href = href.replace("/teaser", "")
                    .replace("/exchange", "")
                    .replace("/medal", "");
                guildWarHref = href;
            }
            else if (!eventHref)
                eventHref = href;
        }
        sendExtensionMessage({ type: "setCurrentEvent", href: eventHref });
        sendExtensionMessage({ type: "setCurrentGuildWar", href: guildWarHref });
    }, true);
    if (false)
        waitForElementToExist(document, "div.txt-twitter-name", function (twitterNameElement) {
            var twitterName = twitterNameElement.textContent
                .toLowerCase()
                .replace("verifying as", "")
                .replace("で認証中", "")
                .trim();
            // log("User's twitter handle is @" + twitterName);
            if (currentSettings.hiddenTwitterRefills) {
                var messageTextarea = document.querySelector("textarea#frm-post-tweet");
                if (messageTextarea)
                    messageTextarea["value"] = "d @" + twitterName + " ";
            }
        }, true);
    if (Math.random() <= (1 / 20000))
        window.setTimeout(mainpagerandom, 5000);
}
;
function processMiscellaneousQuestPage() {
}
;
function mainpagerandom() {
    waitForElementToExist(document, "div.prt-power-number", function (powerNumber) {
        powerNumber.title = "I\n" +
            " can\n" +
            "  see\n" +
            "   you";
        var x = '<span class="num-power6"></span>';
        var i = 0;
        var t = 400;
        powerNumber.innerHTML = "";
        var tick = function () {
            powerNumber.innerHTML += x;
            if (i >= 13)
                return;
            i++;
            t += 99 + (t * 0.05);
            window.setTimeout(tick, t);
        };
        var myimage = document.querySelector("img.img-myimage");
        myimage.style.opacity = "1.0";
        myimage.style.transition = "opacity 1s";
        window.setTimeout(function () {
            myimage.style.opacity = "0.0";
        }, 100);
        window.setTimeout(function () {
            myimage.src = "http://game-a1.granbluefantasy.jp/assets_en/img/sp/assets/npc/my/3040043000_03.png";
            myimage.style.opacity = "1.0";
        }, 1200);
        window.setTimeout(tick, 2500);
    }, true);
}
;
function processPartyPage() {
    waitForElementToExist(document, "div.prt-bottom", function (container) {
        var exportButton = document.createElement("div");
        exportButton.className = "btn-export-grid";
        exportButton.textContent = "Export (alpha)";
        injectElement(container, exportButton);
        exportButton.addEventListener("click", doGridExport, false);
    }, true);
    waitForElementToExist(document, "div.prt-party-detail.currentDeck > div.prt-party-detail-title", function (toSaveHeader) {
        toSaveHeader.textContent = "Slot being overwritten";
    }, true);
    waitForElementToExist(document, "div.prt-party-detail.newDeck > div.prt-party-detail-title", function (toOverwriteHeader) {
        toOverwriteHeader.textContent = "Overwrite with";
    }, true);
    waitForElementToExist(document, "img.img-pc", function (partyImage) {
        if (Math.random() < 0.9992)
            return;
        partyImage.style.transform = "scaleY(-1)";
    }, true);
    waitForElementToExist(document, "img.img-summon-sub", function (summonImage) {
        if (Math.random() < 0.9989)
            return;
        summonImage.style.transform = "scaleX(-1)";
    }, true);
    if (currentSettings.showWeaponAttack)
        waitForElementToExist(document, ["div.prt-weapon-main-status", "div.prt-weapon-sub-status"], function (weaponStatus) {
            var skillElement = weaponStatus.parentNode.querySelector("div.prt-weapon-main-status-skill") ||
                weaponStatus.parentNode.querySelector("div.prt-weapon-sub-status-skill");
            if (!skillElement)
                return;
            var atk = weaponStatus.querySelector("div.prt-attack");
            skillElement.appendChild(atk.cloneNode(true));
        }, true);
}
;
function splitQuestId(questId) {
    var questIdText = String(questId);
    var chapterId = parseInt(questIdText.substr(0, questIdText.length - 1));
    var suffix = questIdText[questIdText.length - 1];
    return [chapterId, suffix];
}
;
function selectPreferredSummonTab() {
    var preferredSelector = "div.icon-supporter-type-" + currentSettings.preferredSummonElement;
    waitForElementToExist(document, preferredSelector, function (tabButton) {
        generateClick(tabButton);
    }, true);
}
function processSupporterPage() {
    storedSupportsPage = null;
    waitForElementToExist(document, "div.txt-baloon", fillQuestInfoBalloon, true);
    waitForElementToExist(document, "div.prt-supporter-attribute", function (supporterList) {
        if (supporterList.className.indexOf("faved") >= 0)
            return;
        processSupporterList(currentSettings, supporterList);
    }, true);
    waitForElementToExist(document, "div.btn-type.selected div.prt-type-text", function (tabButton) {
        tabButton.style.color = "lightgreen";
    }, false);
    if (!currentSettings.smartSupports || !currentSettings.defaultToSmartSupports) {
        selectPreferredSummonTab();
    }
    var showError = function (message, extra) {
        showGamePopup({
            title: "Party management",
            body: message + (extra ? "<br>" + String(extra) : "")
        });
    };
    var doEditParty = function (deckId, callback) {
        /*
            /quest/edit_party/<supporter_user_id>/<quest_id>/<quest_type>/<deck_id>/<supporter_attribute_id>/<treasure_id>
            /quest/decks_info/<supporter_user_id>/<quest_id>/<quest_type>/0/<supporter_attribute_id>/<treasure_id>
        */
        var url = lastDecksInfoUrl.replace(window.location.origin, "");
        var parts = url.split("/");
        if (parts.length !== 9)
            return showError("Unexpected party url", lastDecksInfoUrl);
        // ["", "quest", "decks_info", "712873", "711141", "1", "0", "6", "0?_=1471048562884&t=1471048567375&uid=10777899"]
        var ajaxUrl = "/quest/edit_party/" +
            parts[3] + "/" +
            parts[4] + "/" +
            parts[5] + "/" +
            deckId + "/" +
            parts[6] + "/" +
            parts[7];
        doClientAjax(ajaxUrl, function () {
            callback();
        });
    };
    var changeClass = function (evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        var currentDeck = document.querySelector("div.lis-deck.flex-active-slide");
        var currentDeckId = parseInt(currentDeck.getAttribute("data-deck-id"));
        doEditParty(currentDeckId, function () {
            storedSupportsPage = window.location.hash;
            window.location.href = "/#party/list_job/" + currentDeckId;
        });
    };
    var changeWeapon = function (evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        var currentDeck = document.querySelector("div.lis-deck.flex-active-slide");
        var currentDeckId = parseInt(currentDeck.getAttribute("data-deck-id"));
        doClientAjax("/party/deck", function (response, error) {
            if (!response || !response.deck || !response.deck.pc || !response.deck.pc.weapons)
                return showError("Failed to get party info", error);
            var weaponId = response.deck.pc.weapons[1].param.id;
            doEditParty(currentDeckId, function () {
                storedSupportsPage = window.location.hash;
                window.location.href = "/#party/top/detail_weapon/" + currentDeckId + "/1/" + weaponId;
            });
        });
    };
    if (currentSettings.quickChangeButtons)
        waitForElementToExist(document, "div.prt-leader", function (leaderIcon) {
            var button = leaderIcon.querySelector("span.class-change-button");
            if (button)
                return;
            button = document.createElement("span");
            button.className = "class-change-button";
            button.textContent = "Class";
            button.addEventListener("click", changeClass, true);
            leaderIcon.appendChild(button);
            button = document.createElement("span");
            button.className = "weapon-change-button";
            button.textContent = "Weapon";
            button.addEventListener("click", changeWeapon, true);
            leaderIcon.appendChild(button);
        }, true);
    if (currentSettings.smartSupports)
        processSmartSupports();
}
;
function fillQuestInfoBalloon(balloon) {
    var pageUrl = window.location.hash;
    var parts = pageUrl.split("/");
    var isEvent = false;
    // HACK
    if (parts[0] === "#event") {
        isEvent = true;
        parts = pageUrl.replace("event/", "").split("/");
    }
    if (parts[1] !== "supporter") {
        log("Failed to parse supporter page URL", pageUrl);
        return;
    }
    var questId = parseInt(parts[2]);
    var questType = parseInt(parts[3]);
    var idParts = splitQuestId(questId);
    var chapterId = idParts[0];
    var suffix = idParts[1];
    // Treasure raid
    // Event raids use the regular start page. It appears that all story raids have the ID 3xxxxx
    if (parts.length > 4 && Math.floor(questId / 100000) === 3) {
        var mysteryNumber = parseInt(parts[4]);
        var itemId = parts[5];
        log((isEvent ? "Event treasure" : "Treasure") + " raid start page", questId, itemId);
        doClientAjax("/quest/treasure_raid/" + chapterId + "/" + questId, function (questInfo, error) {
            if (!questInfo) {
                log("Failed to get quest info", error);
                return;
            }
            var treasureIndex = questInfo.treasure_id.indexOf(itemId);
            var treasureName = questInfo.treasure_name[treasureIndex];
            var treasureCount = questInfo.consume[treasureIndex];
            var treasureRemaining = questInfo.num[treasureIndex];
            var apConsumed = parseInt(questInfo.action_point);
            var nextTreasureIndex = (treasureIndex + 1) % questInfo.treasure_id.length;
            var nextItemId = questInfo.treasure_id[nextTreasureIndex];
            var nextTreasureName = questInfo.treasure_name[nextTreasureIndex];
            var iconUrl = "//game-a.granbluefantasy.jp/assets_en/img/sp/assets/item/article/s/" + itemId + ".jpg";
            var iconDiv = document.createElement("div");
            iconDiv.className = "support-treasure-icon";
            var icon = document.createElement("img");
            icon.src = iconUrl;
            icon.title = treasureName;
            var count = document.createElement("div");
            count.textContent = treasureCount + "/" + treasureRemaining;
            iconDiv.appendChild(icon);
            iconDiv.appendChild(count);
            balloon.innerHTML = i18n.getExpand("raid-info", [questInfo.chapter_name, apConsumed]);
            balloon.className += " uses-treasure";
            if (nextTreasureIndex != treasureIndex) {
                icon.className += " clickable";
                icon.title += " (Click to switch to " + nextTreasureName + ")";
                iconDiv.addEventListener("click", function () {
                    var splitPoint = pageUrl.lastIndexOf("/");
                    var head = pageUrl.substr(0, splitPoint);
                    var tail = pageUrl.substr(splitPoint);
                    tail = tail.replace(String(itemId), String(nextItemId));
                    var newUrl = head + tail;
                    window.location.href = newUrl;
                });
            }
            balloon.appendChild(iconDiv);
        });
    }
    else {
        log((isEvent ? "Event" : "ordinary") + " raid start page", questId);
        doClientAjax("/quest/quest_data/" + questId + "/" + questType, function (questInfo, error) {
            if (!questInfo) {
                log("Failed to get quest info", error);
                return;
            }
            var apConsumed = parseInt(questInfo.action_point);
            balloon.innerHTML = i18n.getExpand("raid-info", [questInfo.chapter_name, apConsumed]);
        });
    }
}
;
function getSummonOrderTable() {
    var orderTable = currentSettings.summonOrder;
    if (!orderTable)
        orderTable = currentSettings.summonOrder = {};
    else if (typeof (orderTable) === "string")
        orderTable = currentSettings.summonOrder = JSON.parse(orderTable);
    return orderTable;
}
;
function processSmartSupports() {
    var favedButton = null;
    var favedView = null;
    var a = false, b = false;
    var favedSummons = null;
    var safetyCheck = function () {
        if (document.querySelector("div.prt-supporter-confirm")) {
            log("Verify prompt is up so no faved tab");
            return true;
        }
        var unknownElt = document.querySelector("div.prt-supporter-list div.prt-supporter-attribute:not(.faved) > :not(.lis-supporter)");
        if (unknownElt) {
            log("Unknown element in supporter list: ", unknownElt);
            return true;
        }
        return false;
    };
    var suppress = function (e) {
        // e.preventDefault();
        e.stopImmediatePropagation();
    };
    var onFavedClick = function (e) {
        if (e)
            suppress(e);
        var buttons = document.querySelectorAll("#prt-type .btn-type");
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            btn.className = btn.className.replace("unselected", "")
                .replace("selected", "")
                .trim() + " unselected";
        }
        favedButton.className = favedButton.className.replace("unselected", "selected");
        var views = document.querySelectorAll("div.prt-supporter-attribute");
        for (var i = 0; i < views.length; i++) {
            var view = views[i];
            if (view === favedView)
                continue;
            view.className = "prt-supporter-attribute disableView";
        }
        favedView.className = "prt-supporter-attribute faved";
    };
    var maybeChangeTab = function () {
        if (!currentSettings.defaultToSmartSupports)
            return;
        if (safetyCheck())
            return;
        if (!favedView.firstElementChild) {
            selectPreferredSummonTab();
            return;
        }
        if (favedView.firstElementChild.className === "no-faves-message") {
            selectPreferredSummonTab();
            return;
        }
        onFavedClick(null);
    };
    var onFavButtonClick = function (e) {
        suppress(e);
        var newState = this.className.indexOf("active") < 0;
        var summonId = this.getAttribute("summon-id");
        if (newState) {
            log("Adding summon to favorites " + summonId);
            this.className = "fav-summon-button active";
        }
        else {
            log("Removing summon from favorites " + summonId);
            this.className = "fav-summon-button";
        }
        var orderTable = getSummonOrderTable();
        orderTable[summonId] = 0;
        sendExtensionMessage({ type: "setSummonOrder", data: JSON.stringify(orderTable) });
        sendExtensionMessage({ type: "setSummonFaveState", id: summonId, state: newState }, function (newFaves) {
            if (!newFaves)
                return;
            favedSummons = newFaves;
            refreshFavedStates();
            refreshFavedView();
        });
    };
    var onOrderButtonClick = function (e) {
        suppress(e);
        var summonId = this.getAttribute("summon-id");
        var delta = parseInt(this.getAttribute("delta"));
        var orderTable = getSummonOrderTable();
        var currentOrder = orderTable[summonId];
        if (typeof (currentOrder) === "number")
            orderTable[summonId] = currentOrder + delta;
        else
            orderTable[summonId] = delta;
        sendExtensionMessage({ type: "setSummonOrder", data: JSON.stringify(orderTable) }, function (newFaves) {
            refreshFavedView();
        });
    };
    var refreshFavedStates = function () {
        var buttons = document.querySelectorAll("div.fav-summon-button");
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            var id = btn.getAttribute("summon-id");
            btn.className = "fav-summon-button" +
                ((favedSummons.indexOf(id) >= 0) ? " active" : "");
        }
    };
    var refreshFavedView = function () {
        var pn = favedView.parentNode;
        pn.removeChild(favedView);
        favedView.innerHTML = "";
        var items = document.querySelectorAll("div.btn-supporter.lis-supporter");
        // If every tab doesn't have at least 6 summons in it, I'm on to you, cygames
        if (items.length < (7 * 6)) {
            log("Suspiciously small number of support summons available...", items.length);
            return;
        }
        var parsedItems = [];
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            var parsed = parseSupporter(item);
            if (parsed === null)
                return;
            if (favedSummons.indexOf(parsed.id) < 0)
                continue;
            parsed.randomKey = Math.random();
            parsedItems.push(parsed);
        }
        var orderTable = getSummonOrderTable();
        // We sort the summons alphabetically (then by ID in the case of
        //  two summons sharing the same name, like Famitsu carbies),
        //  then sort based on MLB tier and friend status
        // After this the next pass will pick the first entry for each id
        parsedItems.sort(function (lhs, rhs) {
            var lhsOrder = orderTable[lhs.id];
            if (!lhsOrder)
                lhsOrder = 0;
            var rhsOrder = orderTable[rhs.id];
            if (!rhsOrder)
                rhsOrder = 0;
            if (rhsOrder > lhsOrder)
                return -1;
            else if (rhsOrder < lhsOrder)
                return 1;
            if (rhs.name > lhs.name)
                return -1;
            else if (rhs.name < lhs.name)
                return 1;
            if (rhs.id > lhs.id)
                return -1;
            else if (rhs.id < lhs.id)
                return 1;
            var result = 0;
            if (result === 0)
                result = rhs.tier - lhs.tier;
            if ((result === 0) && (rhs.isFriend !== lhs.isFriend)) {
                if (currentSettings.preferNonFriendSummonsInFavorites)
                    result = (rhs.isFriend ? 0 : 1) - (lhs.isFriend ? 0 : 1);
                else
                    result = (rhs.isFriend ? 1 : 0) - (lhs.isFriend ? 1 : 0);
            }
            // Shuffle summons within the same tier/friend status
            if (result === 0) {
                if (rhs.randomKey > lhs.randomKey)
                    result = -1;
                else if (rhs.randomKey < lhs.randomKey)
                    result = 1;
            }
            return result;
        });
        var lastId = null;
        for (var i = 0; i < parsedItems.length; i++) {
            let item = parsedItems[i];
            if (item.id === lastId)
                continue;
            lastId = item.id;
            var copy = item.element.cloneNode(true);
            copy.className += " faved";
            var favButton = copy.querySelector("div.fav-summon-button");
            if (favButton)
                favButton.parentNode.removeChild(favButton);
            var reorderWidget = document.createElement("div");
            reorderWidget.className = "reorder-widget";
            var currentOrder = orderTable[item.id] || 0;
            var orderUp = document.createElement("a");
            orderUp.textContent = "⇧";
            orderUp.title = "Move to position " + -(currentOrder - 1);
            orderUp.setAttribute("summon-id", item.id);
            orderUp.setAttribute("delta", "-1");
            orderUp.addEventListener("click", onOrderButtonClick, true);
            orderUp.addEventListener("mousedown", suppress, true);
            orderUp.addEventListener("mouseup", suppress, true);
            var orderDown = document.createElement("a");
            orderDown.textContent = "⇩";
            orderDown.title = "Move to position " + -(currentOrder + 1);
            orderDown.setAttribute("summon-id", item.id);
            orderDown.setAttribute("delta", "1");
            orderDown.addEventListener("click", onOrderButtonClick, true);
            orderDown.addEventListener("mousedown", suppress, true);
            orderDown.addEventListener("mouseup", suppress, true);
            reorderWidget.appendChild(orderUp);
            reorderWidget.appendChild(orderDown);
            copy.appendChild(reorderWidget);
            favedView.appendChild(copy);
        }
        if (parsedItems.length === 0) {
            var message = document.createElement("div");
            message.className = "no-faves-message";
            message.textContent = "No favorite summons available. Click the heart icon to add summons to your favorites!";
            favedView.appendChild(message);
        }
        pn.appendChild(favedView);
    };
    if (safetyCheck())
        return;
    sendExtensionMessage({ type: "getFavedSummons" }, function (_favedSummons) {
        favedSummons = _favedSummons;
        if (safetyCheck())
            return;
        waitForElementToExist(document, "div#prt-type", function (typeStrip) {
            if (safetyCheck())
                return;
            if (document.querySelector("div.icon-supporter-type-f"))
                return;
            var btn = favedButton = document.createElement("div");
            btn.className = "icon-supporter-type-f btn-type unselected";
            var text = document.createElement("div");
            text.className = "prt-type-text";
            text.textContent = "Faves";
            btn.appendChild(text);
            typeStrip.appendChild(btn);
            btn.addEventListener("mousedown", suppress, true);
            btn.addEventListener("mouseup", suppress, true);
            btn.addEventListener("click", onFavedClick, true);
            a = true;
            if (b)
                setTimeout(maybeChangeTab, 10);
        }, true);
        waitForElementToExist(document, "div.prt-supporter-list.prt-module", function (supporterList) {
            if (safetyCheck())
                return;
            var view = favedView = document.createElement("div");
            view.className = "prt-supporter-attribute disableView";
            supporterList.appendChild(view);
            refreshFavedView();
            b = true;
            if (a)
                setTimeout(maybeChangeTab, 10);
        }, true);
        waitForElementToExist(document, "div.btn-supporter.lis-supporter", function (item) {
            var btn = item.querySelector("div.fav-summon-button");
            if (btn)
                return;
            var id = item.querySelector("div.prt-summon-image").getAttribute("data-image");
            // FIXME
            var isActive = favedSummons.indexOf(id) >= 0;
            btn = document.createElement("div");
            btn.className = "fav-summon-button" +
                (isActive ? " active" : "");
            btn.setAttribute("summon-id", id);
            btn.title = "Add summon to favorites list";
            btn.addEventListener("mousedown", suppress, true);
            btn.addEventListener("mouseup", suppress, true);
            btn.addEventListener("click", onFavButtonClick.bind(btn), true);
            injectElement(item, btn);
        }, true);
    });
}
;
function processScenePage() {
}
;
function enableDragSelect() {
    waitForElementToExist(document, [
        "div.cnt-container-move div.prt-list-item",
        "div.cnt-list-move div.prt-list-item",
        "div.prt-module-enhancement > div.cnt-list-order",
        "div.cnt-list div.prt-list-weapon",
        "div.cnt-list div.prt-list-item"
    ], function (itemList) {
        if (itemList.getAttribute("evt-registered") === "1")
            return;
        itemList.addEventListener("mousedown", onItemListMouseDown, false);
        itemList.addEventListener("mousemove", onItemListMouseMove, false);
        itemList.addEventListener("mouseup", onItemListMouseUp, false);
        if (shouldHandleTouchInput()) {
            itemList.addEventListener("touchstart", onItemListMouseDown, false);
            itemList.addEventListener("touchmove", onItemListMouseMove, false);
            itemList.addEventListener("touchend", onItemListMouseUp, false);
        }
        itemList.setAttribute("evt-registered", "1");
    }, true);
}
;
var inventoryItemClickHistory = null;
function inventoryItemFromPoint(x, y) {
    var newControl = document.elementFromPoint(x, y);
    if (newControl.className.indexOf("img-list-thumbnail") >= 0)
        return newControl.parentNode;
    else if (newControl.className.indexOf("txt-list-status") >= 0) {
        var parent = newControl.parentNode;
        if (parent.className.indexOf("prt-status") >= 0) {
            return parent.parentNode;
        }
        else {
            return parent;
        }
    }
    else if (newControl.className.indexOf("btn-weapon") >= 0)
        return newControl;
    else if (newControl.className.indexOf("btn-summon") >= 0)
        return newControl;
    else if (newControl.className.indexOf("img-item") >= 0)
        return newControl;
    else
        return null;
}
;
function tryClickInventoryItem(elt) {
    if (!elt)
        return false;
    if (inventoryItemClickHistory.has(elt))
        return false;
    // console.log("Click " + elt.getAttribute("data-id"), elt);
    inventoryItemClickHistory.add(elt);
    pulseElement(elt);
    // generateClick(elt);
}
;
function onItemListMouseDown(evt) {
    if (!currentSettings.allowDragSelect)
        return;
    if (!evt.isTrusted)
        return;
    // let the touchmove select instead of scrolling the page
    if (evt.type === "touchstart") {
        document.addEventListener("touchmove", eventPreventDefault);
    }
    inventoryItemClickHistory = new Set();
    tryClickInventoryItem(inventoryItemFromPoint(evt.clientX || evt.touches[0].clientX, evt.clientY || evt.touches[0].clientY));
}
function onItemListMouseUp(evt) {
    if (!evt.isTrusted)
        return;
    // re-enable the drag scroll
    if (evt.type === "touchend") {
        document.removeEventListener("touchmove", eventPreventDefault);
    }
    inventoryItemClickHistory = null;
}
function onItemListMouseMove(evt) {
    if (!evt.isTrusted)
        return;
    else if (!currentSettings.allowDragSelect)
        return;
    else if (evt.buttons === 0) {
        inventoryItemClickHistory = null;
        return;
    }
    else if (!inventoryItemClickHistory)
        return;
    var newControl = inventoryItemFromPoint(evt.clientX || evt.touches[0].clientX, evt.clientY || evt.touches[0].clientY);
    tryClickInventoryItem(newControl);
}
;
function parseSupporter(elt) {
    var result = {
        element: elt
    };
    var skillTextElement = elt.querySelector("div.prt-summon-skill");
    if (skillTextElement.className.indexOf("bless-rank1") >= 0)
        result.tier = 1;
    else if (skillTextElement.className.indexOf("bless-rank2") >= 0)
        result.tier = 2;
    else if (skillTextElement.className.indexOf("bless-rank3") >= 0)
        result.tier = 3;
    else if (skillTextElement.className.indexOf("bless-rank4") >= 0)
        result.tier = 4;
    else if (skillTextElement.className.indexOf("bless-rank5") >= 0)
        result.tier = 5;
    else
        result.tier = 0;
    var userName = elt.querySelector("div.prt-supporter-name");
    result.isFriend = userName.className.indexOf("ico-friend") >= 0;
    var levelText = elt.querySelector("span.txt-summon-level").textContent;
    result.name = elt.querySelector("div.prt-supporter-summon").textContent.replace(levelText, "").trim();
    result.level = parseInt(levelText.replace(/[\D]+/, "").trim());
    result.effect = skillTextElement.textContent.trim();
    var icon = elt.querySelector("div.prt-summon-image");
    result.id = icon.getAttribute("data-image");
    result.userId = elt.getAttribute("data-supporter-user-id");
    var computedStyle = window.getComputedStyle(elt);
    if ((computedStyle.display === "none") ||
        (parseFloat(computedStyle.opacity) < 1) ||
        (computedStyle.pointerEvents === "none") ||
        (parseFloat(computedStyle.zoom) < 1)) {
        log("Suspiciously invisible support summon element", elt);
        return null;
    }
    return result;
}
;
var boostedSummons = [
    "2040003000",
    "2040056000",
];
var bunnies = [
    "2030079000",
    "2030026000",
    "2040114000",
];
function sortSupportList(settings, elements) {
    var parsedSupporters = new Array(elements.length);
    for (var i = 0; i < elements.length; i++) {
        parsedSupporters[i] = parseSupporter(elements[i]);
        if (parsedSupporters[i] === null)
            return;
    }
    parsedSupporters.sort(function (lhs, rhs) {
        var result = 0;
        if (settings.preferBahamut)
            result = ((boostedSummons.indexOf(rhs.id) >= 0) ? 1 : 0) - ((boostedSummons.indexOf(lhs.id) >= 0) ? 1 : 0);
        if ((result === 0) && settings.preferBunny)
            result = (bunnies.indexOf(rhs.id)) - (bunnies.indexOf(lhs.id));
        if (settings.preferFriendSummons && (rhs.isFriend !== lhs.isFriend))
            result = (rhs.isFriend ? 1 : 0) - (lhs.isFriend ? 1 : 0);
        if ((result === 0) && settings.preferLimitBrokenSummons)
            result = rhs.tier - lhs.tier;
        if ((result === 0) && settings.preferHighLevelSummons)
            result = rhs.level - lhs.level;
        return result;
    });
    return parsedSupporters;
}
;
function processSupporterList(settings, list) {
    var supporters = list.querySelectorAll("div.btn-supporter");
    if (supporters.length === 0)
        return;
    if (supporters[0].className.indexOf("faved") >= 0)
        return;
    var parsedSupporters = sortSupportList(settings, supporters);
    if (!parsedSupporters)
        return;
    for (var i = 0, l = parsedSupporters.length; i < l; i++) {
        var ps = parsedSupporters[i];
        list.removeChild(ps.element);
        list.appendChild(ps.element);
        if (ps.element.querySelector("a"))
            continue;
        var supporterName = ps.element.querySelector("span.txt-supporter-name");
        var link = document.createElement("a");
        link.href = "/#profile/" + ps.userId;
        supporterName.parentNode.replaceChild(link, supporterName);
        link.appendChild(supporterName);
        if (currentSettings.tinySupportSummons) {
            var supporterDetail = ps.element.querySelector("div.prt-supporter-detail");
            var summonSkill = supporterDetail.querySelector("div.prt-summon-skill");
            var summonLevel = supporterDetail.querySelector("div.prt-supporter-summon");
            summonLevel.className = "prt-supporter-summon " + summonSkill.className.replace("text-small", "");
        }
    }
}
;
function processEventGachaLineupPage() {
    // add a total to the top of the list
    waitForElementToExist(document.querySelector("div.contents"), ["div.prt-box-list"], function (list) {
        // simulate the div structure to reuse some css
        var lineup = document.createElement("div"), itemName = document.createElement("div"), itemCount = document.createElement("div");
        lineup.className = "prt-lineup event-total";
        itemName.className = "event-total-text";
        itemCount.className = "event-total-count";
        lineup.appendChild(itemName);
        lineup.appendChild(itemCount);
        // TODO: Shadow DOM
        list.insertBefore(lineup, list.firstElementChild);
        itemName.textContent = i18n.get("event-gacha-total");
        // iterate through all the item counts
        var counts = document.getElementsByClassName("txt-item-count");
        var remaining = 0;
        var total = 0;
        for (var i = 0; i < counts.length; i++) {
            var parts = counts[i].textContent.split("/");
            remaining += parseInt(parts[0]);
            total += parseInt(parts[1]);
        }
        itemCount.textContent = remaining + "/" + total;
    }, true);
}
function installTouchEndCanceler() {
    // do nothing on a touchend event if a touchmove is detected
    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("touchend", touchEndHandler, true);
}
function removeTouchEndCanceler() {
    // do nothing on a touchend event if a touchmove is detected
    document.removeEventListener("touchmove", touchMoveHandler);
    document.removeEventListener("touchend", touchEndHandler);
}
function touchMoveHandler(evt) {
    cancelTouch = true;
}
function touchEndHandler(evt) {
    if (cancelTouch) {
        suppressEvent(evt);
        cancelTouch = false;
    }
}
function eventPreventDefault(evt) {
    evt.preventDefault();
}
;
function showDeckNames(decks) {
    if (!currentSettings.showPartyNames)
        return;
    var elements = Array.from(document.querySelectorAll("div.prt-deck-slider ol.flex-control-paging a")).concat(Array.from(document.querySelectorAll("div.prt-deck-select-slider ol.flex-control-paging a")));
    for (var i = 0, l = elements.length; i < l; i++) {
        elements[i].setAttribute("deck-name", (decks[i].deck_name || decks[i].name));
    }
}
;
function processResultPage() {
    // TODO
}
;
function doGridExport() {
    var showError = function (text) {
        prompt("An error occurred. You can copy it from the box below to report it.", text);
    };
    if (!mostRecentDeck)
        return showError("Deck info not captured for some reason");
    try {
        var deck = mostRecentDeck;
        var pc = deck.pc, job = deck.pc.job;
        var data = {
            rank: 0,
            job_atk: 0,
            master_atk: 0,
            // fixme
            ship_bonus: 0,
            attribute_bonus: 0,
            hp_percent: 90,
            buff_koujin: 0,
            buff_attribute: 0,
            buff_multiply: 0,
            summon_atk: [0, 0, 0, 0, 0],
            // fixme
            summon_type: ["", "", "", ""],
            summon_percent: [0, 0, 0, 0],
            weapon_atk: [],
            skill_type1: [],
            skill_type2: [],
            skill_lv: [],
            // fixme: zenith bonus for weapon type
            type_bonus: [],
            cosmos: []
        };
        if (lastPlayerStatus)
            data.rank = Number(lastPlayerStatus.level);
        var sumAtkBonuses = function (bonuses) {
            var result = 0;
            for (var k in bonuses) {
                var v = bonuses[k];
                if (v.kind !== "bonus_1")
                    continue;
                if ((v.name || v.kind_jp).indexOf("ATK") < 0 && (v.name || v.kind_jp).indexOf("攻撃力") < 0)
                    continue;
                result += Number(v.param || v.value);
            }
            return result;
        };
        var level_up_atk = sumAtkBonuses(job.bonue.level_up_bonus);
        var master_atk_percent = sumAtkBonuses(job.bonue.master_bonus);
        data.master_atk = master_atk_percent;
        data.job_atk = level_up_atk;
        // HACK
        var player_attribute = pc.weapons["1"].master.attribute;
        var main_summon_attribute = pc.summons["1"].master.attribute;
        var cosmosType;
        var mapSkillType = function (weaponId, skillObj) {
            if (!skillObj)
                return "none";
            var parts = skillObj.image.split("_");
            var name = parts[1];
            var isMagna = parts[2] === "m";
            var isUnknown = parts[2] === "a";
            var attribute, tier, prefix;
            if (isMagna || isUnknown) {
                attribute = parts[3];
                tier = parts[4];
            }
            else {
                attribute = parts[2];
                tier = parts[3];
            }
            if ((name !== "baha" && name !== "cosmos") && (attribute !== player_attribute))
                return "none";
            switch (name) {
                case "baha":
                    // pre-4* baha sword/wand
                    if (weaponId === "1040004300" || weaponId === "1040403700") {
                        return "bhah";
                    }
                    return "bha";
                case "backwater":
                    if (isUnknown)
                        return "ubw" + tier;
                    else
                        return (isMagna ? "mbw" : "bw") + tier;
                case "atk":
                    if (isUnknown)
                        return "unk" + tier;
                    else
                        return (isMagna ? "mkj" : "kj") +
                            (isMagna ? tier - 1 : tier);
                case "whole":
                    return "ks";
                case "god":
                    return (isMagna ? "mkm" : "km");
                case "cosmos":
                    cosmosType = attribute;
                // fall through
                default:
                    // FIXME
                    return "none";
            }
        };
        for (var k in pc.weapons) {
            var i = Number(k) - 1;
            var weapon = pc.weapons[k];
            data.weapon_atk[i] = Number(weapon.param.attack);
            data.skill_lv[i] = Number(weapon.param.skill_level);
            data.skill_type1[i] = mapSkillType(weapon.master.id, weapon.skill1);
            data.skill_type2[i] = mapSkillType(weapon.master.id, weapon.skill2);
            if (weapon.master.kind === job.master.weapon_1 || weapon.master.kind === job.master.weapon_2) {
                data.type_bonus[i] = "on0";
            }
        }
        if (cosmosType) {
            for (var k in pc.weapons) {
                var i = Number(k) - 1;
                var weapon = pc.weapons[k];
                data.cosmos[i] = (weapon.master.kind === cosmosType);
            }
        }
        var elemental_regex = /([0-9]+)\%\s+(ATK|boost to (\w+|\w+ and \w+) ATK)/;
        var chara_regex = /([0-9]+)\%\s+(boost to (\w+|\w+ and \w+) allies' ATK)/;
        var magna_regex = /([0-9]+)\%\s+(boost to [\w']+ skills)/;
        var zeus_regex = /([0-9]+)\%\s+(boost to ([\w']+( and |, )*)+ skills)/;
        var grande_regex = /([0-9]+)\%\s+boost to ATK when at least 3 main allies' elements differ/;
        var elemental_regex_jp = /属性攻撃力?が?([0-9]+)\%[^/]*UP/;
        var chara_regex_jp = /属性キャラ.*攻撃力が([0-9]+)\%UP/;
        var magna_regex_jp = /スキル「.{2}方陣」の効果が([0-9]+)\%UP/;
        var zeus_regex_jp = /スキル｢.*｣｢.*｣｢.*｣の効果が([0-9]+)\%UP/;
        var grande_regex_jp = /バトルメンバーの属性が3つ以上異なるとき攻撃力([0-9]+)\%UP/;
        for (var k in pc.summons) {
            var i = Number(k) - 1;
            var summon = pc.summons[k];
            data.summon_atk[i] = Number(summon.param.attack);
            if (i > 0)
                continue;
            var description = summon.skill.comment;
            var elemental_atk = description.match(elemental_regex) || description.match(elemental_regex_jp);
            var chara_atk = description.match(chara_regex) || description.match(chara_regex_jp) || description.match(grande_regex) || description.match(grande_regex_jp);
            var magna_boost = description.match(magna_regex) || description.match(magna_regex_jp);
            var zeus_boost = description.match(zeus_regex) || description.match(zeus_regex_jp);
            var i1 = (i * 2);
            var i2 = (i * 2) + 1;
            if (elemental_atk) {
                data.summon_type[i1] = "attribute";
                data.summon_percent[i1] = Number(elemental_atk[1]);
            }
            else if (chara_atk) {
                data.summon_type[i1] = "character";
                data.summon_percent[i1] = Number(chara_atk[1]);
            }
            else if (magna_boost) {
                data.summon_type[i1] = "magna";
                data.summon_percent[i1] = Number(magna_boost[1]);
            }
            else if (magna_boost) {
                data.summon_type[i1] = "zeus";
                data.summon_percent[i1] = Number(zeus_boost[1]);
            }
        }
        var url = hibino.createUrl(data);
        window.open(url);
    }
    catch (exc) {
        showError(exc.stack || exc.message);
    }
}
;
function isPhalanxAvailable() {
    var phalanxIds = [71, 116];
    var buttons = document.querySelectorAll("div.lis-ability");
    for (var i = 0, l = buttons.length; i < l; i++) {
        var btn = buttons[i];
        var icon = btn.firstElementChild;
        if (!icon)
            continue;
        if (!icon.hasAttribute("ability-id"))
            continue;
        var id = parseInt(icon.getAttribute("ability-id"));
        if (phalanxIds.indexOf(id) >= 0)
            return true;
    }
    return false;
}
;
var badZeniths = [
    "/44.png",
    // Skill DMG
    "/5.png",
    // Mode cut
    "/6.png",
    // CA DMG
    "/21.png"
];
var badZenithElements = [];
var zenithOffsets = [];
function processZenithPage() {
    if (Math.random() >= (1 / 8192))
        return;
    badZenithElements.length = 0;
    zenithOffsets.length = 0;
    waitForElementToExist(document, "div.prt-main-frame-npc", function (container) {
        container.addEventListener("mousemove", onZenithMouseMove, true);
    }, true);
    waitForElementToExist(document, "div.prt-main-frame-npc div.prt-bonus-image img.img-bonus-type", function (elt) {
        if (!elt)
            return;
        var bad = false;
        for (var j = 0; j < badZeniths.length; j++) {
            if (elt.src.indexOf(badZeniths[j]) > 0)
                bad = true;
        }
        if (!bad)
            return;
        badZenithElements.push(elt.parentNode.parentNode);
        zenithOffsets.push({ x: 0, y: 0 });
        elt.style.transform = "";
    }, true);
}
;
function onZenithMouseMove(evt) {
    var gameContainer = getGameContainer();
    var effectiveZoom = getEffectiveZoom(gameContainer);
    var bounds = document.querySelector("div.prt-main-frame-npc").getBoundingClientRect();
    var bl = bounds.left * effectiveZoom;
    var br = bounds.right * effectiveZoom;
    var bt = bounds.top * effectiveZoom;
    var bb = bounds.bottom * effectiveZoom;
    var x = evt.clientX, y = evt.clientY;
    for (var i = 0, l = badZenithElements.length; i < l; i++) {
        var elt = badZenithElements[i];
        if (!elt)
            continue;
        var zo = zenithOffsets[i];
        var cr = elt.getBoundingClientRect();
        var l = (cr.left) * effectiveZoom;
        var r = (cr.right) * effectiveZoom;
        var t = (cr.top) * effectiveZoom;
        var b = (cr.bottom) * effectiveZoom;
        var outside = (x < l) ||
            (y < t) ||
            (x > r) ||
            (y > b);
        if (outside) {
        }
        else {
            var dx, dy;
            if (Math.abs(r - x) < Math.abs(l - x))
                dx = (x - r);
            else
                dx = x - l;
            if (Math.abs(b - y) < Math.abs(t - y))
                dy = (y - b);
            else
                dy = y - t;
            dx += 2 * Math.sign(dx);
            dy += 2 * Math.sign(dy);
            if (b + dy > bb)
                dy = Math.min(dy, bb - b);
            if (t + dy < bt)
                dy = Math.max(dy, t - bt);
            if (r + dx > br)
                dx = Math.min(dx, br - r);
            if (l + dx < bl)
                dx = Math.max(dx, l - bl);
            if ((Math.abs(dy) < Math.abs(dx)) && dy)
                zo.y += dy;
            else
                zo.x += dx;
            var zx = zo.x / effectiveZoom;
            var zy = zo.y / effectiveZoom;
            elt.style.transform = "translate(" + zx.toFixed(1) + "px, " + zy.toFixed(1) + "px)";
            elt.style.zIndex = "999999";
        }
    }
}
;
function processEnhancementPage() {
    enableDragSelect();
    if (currentSettings.detailedUpgradePage)
        detailedUpgradeDataWait = waitForElementToExist(document, "div.list div.txt-status", refreshItemStatus, true);
}
;
var statusKeys = {
    "Skill Lv": "skill_level",
    "スキルLv": "skill_level",
    "LEVEL": "level",
    "TOTAL": "total_stats"
};
var detailedUpgradeDataWait = null;
function refreshItemStatus(elt) {
    if (elt.updated)
        return;
    var listNode = elt.parentNode.parentNode;
    var obj = lastEnhancementMaterials[listNode.getAttribute("data-id")];
    if (!obj || !obj.skill_level)
        return;
    elt.updated = true;
    var span = document.createElement("span");
    span.textContent = obj.skill_level;
    if (elt.className.indexOf("txt-skill-level") >= 0) {
        elt.textContent = "SLv ";
        elt.appendChild(span);
        return;
    }
    elt.appendChild(document.createTextNode(" SLv "));
    elt.appendChild(span);
}
;
function refreshItemStatuses() {
    var elts = document.querySelectorAll("div.list div.txt-status");
    for (var i = 0, l = elts.length; i < l; i++)
        refreshItemStatus(elts[i]);
}
;
function processUpgradeData(list, statusFilter) {
    var sk = statusKeys[statusFilter];
    if (!sk)
        return;
    var ids = [];
    var haveSkillLevels = false;
    for (var i = 0, l = list.length; i < l; i++) {
        var obj = list[i];
        if (!obj)
            continue;
        obj.id = obj.param.id;
        var old_obj = lastEnhancementMaterials[obj.id];
        if (old_obj) {
            obj.level = old_obj.level;
            obj.skill_level = old_obj.skill_level;
            obj.total_stats = old_obj.total_stats;
        }
        obj[sk] = obj.param.status;
        if (obj.skill_level)
            haveSkillLevels = true;
        else
            ids.push(obj.id);
        lastEnhancementMaterials[obj.id] = obj;
    }
    if ((sk !== "skill_level") &&
        (window.location.hash.indexOf("/weapon/") >= 0) &&
        !haveSkillLevels) {
        log("Fetching item skill levels...");
        doClientAjax("/weapon/weapons_parameter", JSON.stringify({
            "parameter_name": "skill_level",
            "special_token": null,
            "weapon_ids": ids
        }), function (result) {
            log("Got item skill levels:", result);
            for (var k in result) {
                var obj = lastEnhancementMaterials[k];
                if (!obj)
                    continue;
                obj.skill_level = parseInt(result[k]);
            }
            refreshItemStatuses();
            // why??????????
            window.setTimeout(refreshItemStatuses, 25);
        });
    }
    else if (haveSkillLevels) {
        console.log("Already have skill levels");
        refreshItemStatuses();
        // why??????????
        window.setTimeout(refreshItemStatuses, 25);
    }
}

window.addEventListener("load", onLoad, false);
var lastStatus, lastCounters, lastRaidCode;
var activatorTab;
var log = console.log.bind(console);
function onLoad() {
    log("onLoad");
    chrome.runtime.sendMessage({ type: "getSettings" }, function (currentSettings) {
        log("got settings");
        applyLocalization(currentSettings);
        if (currentSettings.globalDisable) {
            showModal(i18n.get("p-globalDisable"), tryEnableExtension, false, i18n.get("p-enable"));
        }
        else {
            console.log("finding tabs");
            chrome.tabs.query({
                active: true, lastFocusedWindow: true
            }, function (tabs) {
                if (tabs.length === 0) {
                    showModal(i18n.get("p-tabNotFound"), false);
                    return;
                }
                // check the url
                if ((tabs[0].url.indexOf("game.granbluefantasy.jp") < 0) &&
                    (tabs[0].url.indexOf("gbf.game.mbga.jp") < 0)) {
                    showModal(i18n.get("p-tabNotFound"), false);
                    return;
                }
                log("found tabs", tabs);
                activatorTab = tabs[0];
                chrome.runtime.sendMessage({ type: "getRaidCode", tabId: activatorTab.id }, refreshRaidCode);
                log("Getting userid and tab id");
                chrome.runtime.sendMessage({ type: "getUserId", tabId: activatorTab.id }, function (uid) {
                    log("Got userid and tab id", uid);
                    // prevent doing extra work if not logged in
                    if (!uid) {
                        log("Not logged in");
                        showModal(i18n.get("p-notLoggedIn"), false);
                        return;
                    }
                    chrome.runtime.sendMessage({ type: "getStatus", tabId: activatorTab.id, uid: uid }, refreshStatus);
                    chrome.runtime.sendMessage({ type: "getNextRankRp", tabId: activatorTab.id, uid: uid }, refreshNextRankRp);
                    chrome.runtime.sendMessage({ type: "getItemCounters", tabId: activatorTab.id, uid: uid }, refreshItemCounts);
                    document.querySelector("#xp").addEventListener("mousedown", function (evt) {
                        if (evt.which === 1) {
                            chrome.runtime.sendMessage({ type: "getNextRankRp", tabId: activatorTab.id, uid: uid, force: true }, refreshNextRankRp);
                            document.querySelector("#xp > span.value").style.display = "inline";
                        }
                    });
                });
                maybeShowDeadMessage();
            });
            chrome.runtime.sendMessage({ type: "isShutdown" }, function (state) {
                log("Got isShutdown response");
                if (state) {
                    showModal(i18n.get("p-incompatibleVersion"), false);
                    var mt = document.querySelector("#modalText");
                    var img = document.createElement("img");
                    img.style.marginTop = "6px";
                    img.width = "160";
                    img.src = "update.png";
                    img.onload = centerModal;
                    mt.appendChild(img);
                }
            });
        }
    });
    var rc = autoPasteRaidCode();
    rc.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            doJoinRaid_popup();
        }
    }, false);
    addTextboxListeners();
    window.addEventListener("focus", function (e) { autoPasteRaidCode(); }, false);
    document.querySelector("#join").addEventListener("click", doJoinRaid_popup, false);
    document.querySelector("#fullElixir").addEventListener("click", useFullElixir, false);
    document.querySelector("#halfElixir").addEventListener("click", useHalfElixir, false);
    document.querySelector("#soulBalm").addEventListener("click", useSoulBalm, false);
    document.querySelector("#soulBerry").addEventListener("click", useSoulBerry, false);
    document.querySelector("#copyRaidCode").addEventListener("click", copyRaidCode, false);
    document.querySelector("#disableExtension").addEventListener("click", tryDisableExtension, false);
}
;
function tryDisableExtension() {
    chrome.runtime.sendMessage({ type: "setGlobalDisable", state: true });
    showModal(i18n.get("p-triedToDisable"), false);
}
;
function tryEnableExtension() {
    chrome.runtime.sendMessage({ type: "setGlobalDisable", state: false });
    showModal(i18n.get("p-triedToEnable"), false);
}
;
function addTextboxListeners() {
    var rc = document.querySelector("input#raidCode");
    var btn = document.querySelector("#join");
    var onChange = function () {
        var code = rc.value.trim();
        switch (code.length) {
            case 8:
                btn.removeAttribute("disabled");
                btn.textContent = i18n.get("p-joinRaid");
                break;
            case 5:
            case 6:
                btn.removeAttribute("disabled");
                btn.textContent = i18n.get("p-joinRoom");
                break;
            default:
                btn.setAttribute("disabled", "disabled");
                btn.textContent = i18n.get("p-join");
                break;
        }
    };
    rc.addEventListener("change", onChange);
    rc.addEventListener("keydown", onChange);
    rc.addEventListener("keyup", onChange);
    onChange();
    window.setTimeout(onChange, 100);
}
;
function autoPasteRaidCode() {
    var rc = document.querySelector("input#raidCode");
    var oldValue = rc.value;
    rc.focus();
    rc.value = "";
    document.execCommand("paste");
    rc.value = rc.value.trim();
    if ((rc.value.length < 5) || (rc.value.length > 8))
        rc.value = oldValue;
    return rc;
}
;
function applyLocalization(currentSettings) {
    i18n.setLanguageGetter(function () {
        return currentSettings.language;
    });
    var elts = document.querySelectorAll(".localized");
    for (var i = 0; i < elts.length; i++) {
        var elt = elts[i];
        var key = "p-" + elt.id;
        if (elt.className.indexOf("tooltip") >= 0) {
            elt.title = i18n.get(key);
        }
        else {
            elt.textContent = i18n.get(key);
        }
    }
    document.documentElement.lang = currentSettings.language;
}
;
function maybeShowDeadMessage() {
    chrome.runtime.sendMessage({ type: "getIsDead" }, function (isDead) {
        if (isDead)
            showModal(i18n.get("p-pleaseReload"), false);
    });
}
;
function refreshRaidCode(raidCode) {
    lastRaidCode = raidCode;
    if (raidCode) {
        document.querySelector("#raidCodePanel").style.display = "block";
        document.querySelector("#currentRaidCode").value = raidCode;
    }
    else {
        document.querySelector("#raidCodePanel").style.display = "none";
    }
    maybeShowDeadMessage();
}
;
function copyRaidCode() {
    var textbox = document.querySelector("#currentRaidCode");
    textbox.value = lastRaidCode;
    textbox.select();
    document.execCommand("copy", false, null);
}
;
function refreshStatus(status) {
    if (!status)
        return;
    lastStatus = status;
    var ap = status._precise_ap;
    var bp = status._precise_bp;
    var apFill = Math.min((ap / parseInt(status.max_action_point) * 100), 100).toFixed(1);
    var bpFill = Math.min(bp / status.max_battle_point * 100, 100).toFixed(1);
    document.querySelector("#xp > div.fill").style.width = status.levelGauge;
    document.querySelector("#ap > span.value").textContent = Math.floor(ap * 10) / 10;
    document.querySelector("#ap > div.fill").style.width = apFill + "%";
    document.querySelector("#bp > span.value").textContent = Math.floor(bp * 10) / 10;
    document.querySelector("#bp > div.fill").style.width = bpFill + "%";
    refreshButtonStates();
}
;
function refreshNextRankRp(toNextRank) {
    if (!toNextRank)
        return;
    document.querySelector("span#expValue").textContent = toNextRank;
    document.querySelector("#xp > span.value").style.display = "inline";
}
;
function refreshItemCounts(itemCounts) {
    if (!itemCounts)
        return;
    lastCounters = itemCounts;
    var buttons = document.querySelectorAll("button.item");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var itemId = button.getAttribute("index");
        if (!itemCounts[itemId]) {
            button.textContent = 0;
        }
        else {
            button.textContent = itemCounts[itemId].number;
        }
    }
    refreshButtonStates();
}
;
function refreshButtonStates() {
    if (!lastCounters)
        return;
    if (!lastStatus)
        return;
    var buttons = document.querySelectorAll("button.item");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var itemId = button.getAttribute("index");
        var isEnabled = (itemId === "1") ||
            (itemId === "2") ||
            Number(lastStatus.bp) < lastStatus.battle_point_limit;
        isEnabled = isEnabled && (Number(lastCounters[itemId].number) > 0);
        if (isEnabled)
            button.removeAttribute("disabled");
        else
            button.setAttribute("disabled", "disabled");
        button.title = i18n.getExpand("p-use", ["@i-" + button.id]);
    }
    maybeShowDeadMessage();
}
;
// showModal(text) -> text, OK button
// showModal(text, false) -> no OK button
// showModal(text, onConfirm) -> OK & cancel buttons; callback invoked if OK is clicked
// showModal(text, onConfirm, false) -> OK button; callback invoked if OK is clicked
// showModal(text, onConfirm, onCancel) -> OK & cancel buttons; callback invoked if OK is clicked
// if text contains {drop|#|#|#}, it will be replaced with a dropdown, the first number being the default, second the min, third the max
function showModal(text, onConfirm, onCancel, confirmText) {
    var done = false;
    var msg = document.querySelector("#modalText");
    msg.innerHTML = parseDrop(text);
    var dialog = document.querySelector("#modal");
    var unhookEvents;
    var confirmed = function () {
        if (done)
            return;
        done = true;
        unhookEvents();
        dialog.style.display = "none";
        if (onConfirm) {
            var dropdown = document.getElementById("item-dropdown");
            if (dropdown) {
                onConfirm(parseInt(dropdown.value));
            }
            else {
                onConfirm();
            }
        }
    };
    var cancelled = function () {
        if (done)
            return;
        done = true;
        unhookEvents();
        dialog.style.display = "none";
        if (onCancel)
            onCancel();
    };
    var confirmButton = document.querySelector("#confirm");
    var cancelButton = document.querySelector("#cancel");
    unhookEvents = function () {
        confirmButton.removeEventListener("click", confirmed, false);
        cancelButton.removeEventListener("click", cancelled, false);
    };
    confirmButton.addEventListener("click", confirmed, false);
    if (onConfirm === false) {
        confirmButton.style.display = "none";
        cancelButton.style.display = "none";
    }
    else if (onConfirm) {
        cancelButton.style.display = (onCancel !== false) ? "inline-block" : "none";
        cancelButton.addEventListener("click", cancelled, false);
        if (confirmText) {
            confirmButton.textContent = confirmText;
        }
        else {
            confirmButton.textContent = i18n.get("p-confirm");
        }
    }
    else {
        cancelButton.style.display = "none";
        confirmButton.textContent = i18n.get("p-ok");
    }
    dialog.style.display = "block";
    centerModal();
}
;
function centerModal() {
    var dialog = document.querySelector("#modal");
    var contentBox = document.querySelector("#modalContent");
    var contentHeight = contentBox.scrollHeight;
    var paddingTop = (dialog.scrollHeight - contentHeight) / 2.0;
    dialog.style.paddingTop = paddingTop.toFixed(1) + "px";
}
;
function useFullElixir() {
    var max = Math.min(Math.ceil((lastStatus.action_point_limit - lastStatus.ap) / lastStatus.elixir_recover_value), parseInt(lastCounters["1"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-fullElixir", 1, 1, max]), function (value) {
        useNormalItem(1, value);
    });
}
;
function useHalfElixir() {
    var max = Math.min(Math.ceil((lastStatus.action_point_limit - lastStatus.ap) / lastStatus.elixir_half_recover_value), parseInt(lastCounters["2"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-halfElixir", 1, 1, max]), function (value) {
        useNormalItem(2, value);
    });
}
;
function useSoulBalm() {
    var max = Math.min(Math.ceil((lastStatus.battle_point_limit - lastStatus.bp) / parseInt(lastStatus.soul_powder_recover_value)), parseInt(lastCounters["3"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-soulBalm", 1, 1, max]), function (value) {
        useNormalItem(3, value);
    });
}
;
function useSoulBerry() {
    var useCount = Math.min(lastStatus.battle_point_limit, lastStatus.max_battle_point - lastStatus.bp);
    if (useCount < 1)
        useCount = 5;
    var max = Math.min(Math.ceil((lastStatus.battle_point_limit - lastStatus.bp) / parseInt(lastStatus.soul_seed_recover_value)), parseInt(lastCounters["5"].number));
    showModal(i18n.getExpand("p-use-n-question", ["@i-soulBerry", useCount, 1, max]), function (value) {
        useNormalItem(5, value);
    });
}
;
function useNormalItem(itemId, count) {
    useNormalItemCallback(itemId, count, function (result) {
        chrome.runtime.sendMessage({ type: "getUserId", tabId: activatorTab.id }, function (uid) {
            chrome.runtime.sendMessage({ type: "getStatus", tabId: activatorTab.id, uid: uid, force: true }, refreshStatus);
            chrome.runtime.sendMessage({ type: "getItemCounters", tabId: activatorTab.id, uid: uid, force: true }, refreshItemCounts);
        });
    });
}
;
function useNormalItemCallback(itemId, count, successCallback) {
    var data = {
        item_id: String(itemId),
        num: count,
        special_token: null
    };
    console.log("Using item", data);
    doGameAjax("/item/use_normal_item", JSON.stringify(data), function (result) {
        console.log("Used item, response was", result);
        if (result &&
            (typeof (result.before) !== "undefined") &&
            (typeof (result.after) !== "undefined")) {
            successCallback(result);
        }
        else if (result && result.idleTimeout) {
            showModal("Idle timeout");
        }
        else {
            showModal("Failed to use item");
        }
    });
}
;
function parseDrop(text) {
    // if there is a match, this will result in an array with the matched text and the 3 numerical params
    var matches = text.match(/\{drop\|([\d]+)\|([\d]+)\|([\d]+)\}/);
    if (matches) {
        var defaultItem = parseInt(matches[1]);
        var min = parseInt(matches[2]);
        var max = parseInt(matches[3]);
        var select = document.createElement("select");
        select.id = "item-dropdown";
        for (var i = min; i <= max; i++) {
            var option = document.createElement("option");
            option.text = option.value = i;
            select.add(option);
            if (i === defaultItem) {
                option.setAttribute("selected", "selected");
            }
        }
        text = text.replace(matches[0], select.outerHTML);
    }
    return text;
}
function doGamePopup(data) {
    var msg = {
        type: "doGamePopup",
        data: data,
        tabId: activatorTab.id
    };
    chrome.runtime.sendMessage(msg);
    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
}
;
function doGameRedirect(url) {
    var msg = {
        type: "doGameRedirect",
        url: url,
        tabId: activatorTab.id
    };
    chrome.runtime.sendMessage(msg);
    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
}
;
function doGameAjax(url, data, callback) {
    var msg = {
        type: "doGameAjax",
        url: url,
        data: data,
        tabId: activatorTab.id
    };
    chrome.runtime.sendMessage(msg, callback);
    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
}
;
function doJoinRaid_popup(raidId) {
    // the type of the variable can be an event since this function is used as the callback of an event handler
    if (!raidId || typeof (raidId) !== "string") {
        raidId = document.querySelector("input#raidCode").value.trim();
    }
    if ((raidId.length == 5) || (raidId.length == 6)) {
        var msg = {
            type: "tryJoinCoOpRoom",
            code: raidId,
            tabId: activatorTab.id
        };
        chrome.runtime.sendMessage(msg, function (ok) {
            if (ok && ok.startsWith("popup"))
                return;
            showModal(ok || "unknown result", null, null, null);
        });
        if (chrome.runtime.lastError)
            showModal(chrome.runtime.lastError.toString());
        return;
    }
    if (raidId.length !== 8) {
        showModal(i18n.get("p-invalidRaidCode"));
        return;
    }
    var payload = { special_token: null, battle_key: raidId };
    doGameAjax("/quest/battle_key_check", JSON.stringify(payload), function (result) {
        console.log("Battle key check returned", result);
        if (result) {
            if (result.popup && result.popup.body) {
                doGamePopup(result.popup);
                window.close();
            }
            else if (result.redirect) {
                doGameRedirect(result.redirect);
                window.close();
            }
            else if ((typeof (result.current_battle_point) === "number") &&
                !result.battle_point_check) {
                var statusText = result.chapter_name + " @ ";
                statusText += i18n.getExpand("p-status", [result.member_count, result.boss_hp_width]);
                showModal(statusText + "<br />" + i18n.getExpand("p-bpRequired", [result.used_battle_point]), function () {
                    // force an update just to check that we're refilling the right amount
                    chrome.runtime.sendMessage({ type: "getUserId", tabId: activatorTab.id }, function (uid) {
                        chrome.runtime.sendMessage({ type: "getStatus", tabId: activatorTab.id, uid: uid, force: true }, function (status) {
                            var useCount = Math.min(result.used_battle_point, result.used_battle_point - status.bp);
                            useNormalItemCallback(5, useCount, function () {
                                // always use the current raid id in case it changes due to the focus changing
                                doJoinRaid_popup(raidId);
                            });
                        });
                    });
                }, null, i18n.get("p-refill"));
            }
            else if (result.idleTimeout) {
                showModal("Idle timeout");
            }
            else {
                showModal(i18n.get("p-raidJoinFailed"));
            }
        }
        else {
            showModal(i18n.get("p-raidJoinFailed"));
        }
    });
}

function PromiseResolver() {
    var self = this;
    this.startedWhen = null;
    this.resolve = null;
    this.reject = null;
    this.promise = new Promise(function (resolve, reject) {
        self.resolve = resolve;
        self.reject = reject;
    });
}

var raidListUpdateInterval = 30000;
var raidListUpdateBackoff = 1350;
var raidListUpdateCounter = 25;
var statusPanelUpdateIntervalSeconds = 30;
var minimumBuffUpdateIntervalSeconds = 70;
var currentRaidListUpdateInterval = raidListUpdateInterval;
var updateRaidsPanel = null, invalidateRaidList = null, doUpdateRaidsPanel = null, updateItemsPanel = null, invalidateItems = null, doUpdateItemsPanel = null;
var updateBuffsWhen = 0, isUpdatingBuffs = false;
var queuedRaidClick = null;
var pendingRaidUpdate = null;
var nextRaidUpdateWhen = null;
var menuIconSize = 0;
var menuLeftEdge = 0;
var subpanelOffset = 0;
var mostRecentItems = null;
var lastPlayerStatus = null;
var statusIntervalH, raidTimerIntervalH;
var allBookmarks = {};
function bookmarkNavigate(target, evt) {
    var inNewWindow = false;
    if (evt) {
        inNewWindow = (evt.button === 1) ||
            !!evt.shiftKey;
    }
    if (inNewWindow) {
        // HACK: Fully resolve the URL
        var elt = document.createElement("a");
        elt.href = target;
        sendExtensionMessage({ type: "openNewTab", url: elt.href });
    }
    else {
        sendExtensionMessage({ type: "setLastLocation", url: target });
        window.location.href = target;
    }
}
;
function repeatLastQuest(evt, callback) {
    sendExtensionMessage({ type: "getRecentQuest" }, function (recentQuestJson) {
        if (!recentQuestJson) {
            if (callback)
                callback(false, "No recent quest to attempt");
            else
                return showBookmarkError("No recent quest to attempt.");
        }
        var recentQuest;
        try {
            recentQuest = JSON.parse(recentQuestJson);
        }
        catch (exc) {
            if (callback)
                callback(false, "No recent quest to attempt");
            else
                return showBookmarkError("No recent quest to attempt.");
        }
        var parts = splitQuestId(recentQuest.quest_id);
        var chapterId = parts[0];
        var suffix = parts[1];
        var itemId = recentQuest.use_item_id;
        if (itemId)
            itemId = parseInt(itemId);
        else
            itemId = undefined;
        var data = makeBookmarkCore(chapterId, suffix, recentQuest.quest_type, itemId, recentQuest.prefix);
        checkQuestStart(data, function (ok, result, reason) {
            if (ok) {
                bookmarkNavigate(data.targetUrl, evt);
                setTimeout(function () {
                    if (callback)
                        callback(true);
                    window.location.reload();
                }, 50);
            }
            else {
                if (callback)
                    callback(false, reason);
                else
                    return showBookmarkError(reason);
            }
        });
    });
}
;
function makeBookmarkCore(chapterId, questSuffix, questType, useItemId, urlPrefix) {
    var questId = String(chapterId) + String(questSuffix);
    if (!urlPrefix) {
        urlPrefix = "/#quest";
    }
    var targetUrl = urlPrefix + "/supporter/" + questId + "/" + questType;
    if (useItemId)
        targetUrl += "/0/" + useItemId;
    var infoUrl = "/quest/treasure_raid/" + chapterId + "/" + questId;
    // FIXME: The /1/ here is the raid type
    var checkStartUrl = "/quest/check_quest_start/" + chapterId + "/1/" + questId;
    return {
        chapterId: chapterId,
        questId: questId,
        targetUrl: targetUrl,
        infoUrl: infoUrl,
        checkStartUrl: checkStartUrl
    };
}
;
function showBookmarkError(message, extra) {
    showGamePopup({
        title: "Bookmark",
        body: message + (extra ? "<br>" + String(extra) : "")
    });
}
;
function startRaid(data, evt) {
    log("Starting raid", data.targetUrl);
    bookmarkNavigate(data.targetUrl, evt);
}
;
function checkQuestStart_old(data, onSuccess) {
    checkQuestStart(data, function (ok, eligibility, reason) {
        if (ok)
            onSuccess(data, eligibility);
        else
            showBookmarkError(reason);
    });
}
function checkQuestStart(data, callback) {
    log("Checking eligibility", data.checkStartUrl);
    doClientAjax(data.checkStartUrl, function (eligibility, error) {
        if (!eligibility)
            return showBookmarkError("Failed to get information from server", error);
        switch (eligibility.result) {
            case "ok":
                callback(true, eligibility);
                return;
            case "error_cnt":
                callback(false, eligibility, "You have already attempted this raid the maximum number of times today.");
                return;
            case "other_quest_progress":
                callback(false, eligibility, "You cannot start this raid because another quest is in progress.");
                return;
            case "error_level":
                callback(false, eligibility, "Your rank is too low to start this raid.");
                return;
            default:
                try {
                    var blob = JSON.parse(eligibility);
                    if (blob.popup && blob.popup.body) {
                        callback(false, eligibility, blob.popup.body);
                        return;
                    }
                }
                catch (exc) {
                    callback(false, eligibility, "Unknown error");
                }
        }
    });
}
;
function makeRaidBookmark(chapterId, questSuffix) {
    var data = makeBookmarkCore(chapterId, questSuffix, 1);
    return function (evt) {
        checkQuestStart_old(data, function (data, eligibility) {
            startRaid(data, evt);
        });
    };
}
;
function getRaidInfo(data, onSuccess) {
    log("Requesting raid info", data.infoUrl);
    doClientAjax(data.infoUrl, function (raidInfo, error) {
        if (!raidInfo)
            return showBookmarkError("Failed to get information from server", error);
        onSuccess(data, raidInfo);
    });
}
;
function makeTreasureRaidBookmark(chapterId, questSuffix, itemId) {
    var data = makeBookmarkCore(chapterId, questSuffix, 1, itemId);
    return function (evt) {
        getRaidInfo(data, function (data, raidInfo) {
            var treasureIndex = raidInfo.treasure_id.indexOf(String(itemId));
            if (treasureIndex < 0)
                return showBookmarkError("Item not found in raid info");
            var itemsNeeded = parseInt(raidInfo.consume[treasureIndex]);
            var itemsHeld = raidInfo.num[treasureIndex];
            if (itemsHeld < itemsNeeded)
                return showBookmarkError(raidInfo.chapter_name + " requires " +
                    itemsNeeded + " of " +
                    raidInfo.treasure_name[treasureIndex] +
                    ", but you only have " + itemsHeld);
            checkQuestStart_old(data, function (data, eligibility) {
                startRaid(data, evt);
            });
        });
    };
    /*
    {
        "chapter_id":"30005",
        "quest_id":"300051",
        "type":"1",
        "action_point":"50",
        "chapter_name":"Tiamat Omega Showdown",
        "consume":["3"],
        "level":30,
        "treasure_id":["18"],
        "treasure_image_id":["18"],
        "treasure_name":["Tiamat Omega Anima"],
        "num":[26],
        "raid_name":"Lvl 50 Tiamat Omega",
        "limit":90
    }
    */
}
;
function visitCurrentEvent(evt, tail) {
    sendExtensionMessage({ type: "getCurrentEvent" }, function (currentEvent) {
        if (!currentEvent)
            showGamePopup({
                title: "Error",
                body: "No event stored. Try visiting the main page."
            });
        else if (tail)
            bookmarkNavigate("/#" + currentEvent + tail, evt);
        else
            bookmarkNavigate("/#" + currentEvent, evt);
    });
}
;
function makeGuildWarBookmark(tail) {
    return function (evt) {
        bookmarkNavigate("/#event/" + guildWarName + (tail || ""), evt);
    };
}
;
function makeGuildWarRaidBookmark(chapterId, questSuffix, checkItem) {
    var data = makeBookmarkCore(chapterId, questSuffix, 1);
    var checkItemFn, checkStartFn, visitSupporterPageFn, checkMultiStart;
    checkItemFn = function (evt, onComplete) {
        if (window.location.href.indexOf("event/" + guildWarName) < 0) {
            if (onComplete)
                onComplete(false);
            return bookmarkNavigate("#event/" + guildWarName, evt);
        }
        data.targetUrl = data.targetUrl.replace("#quest/", "#event/" + guildWarName + "/");
        if (!data.targetUrl.endsWith("/0"))
            data.targetUrl += "/0";
        var checkUrl = "/" + guildWarName + "/rest/top/check_item/" + data.questId;
        doClientAjax(checkUrl, function (checkResult) {
            if (checkResult && checkResult.result)
                return checkStartFn(evt, onComplete);
            else {
                if (onComplete)
                    onComplete(false);
                return showBookmarkError("You do not have the necessary items to start this quest.");
            }
        });
    };
    checkStartFn = function (evt, onComplete) {
        checkQuestStart_old(data, function (data, eligibility) {
            if (eligibility.result === "ok")
                checkMultiStart(evt, onComplete);
            else {
                if (onComplete)
                    onComplete(false);
                return showBookmarkError("You are not eligible to start this quest. " + eligibility.result);
            }
        });
    };
    checkMultiStart = function (evt, onComplete) {
        var checkUrl = "/quest/check_multi_start";
        doClientAjax(checkUrl, JSON.stringify({ quest_id: parseInt(data.questId) }), function (checkResult) {
            if (checkResult && checkResult.result === "ok")
                return visitSupporterPageFn(evt, onComplete);
            else {
                if (onComplete)
                    onComplete(false);
                return showBookmarkError("You cannot start a raid.");
            }
        });
    };
    visitSupporterPageFn = function (evt, onComplete) {
        if (window.location.href.indexOf("event/" + guildWarName) < 0) {
            if (onComplete)
                onComplete(false);
            return bookmarkNavigate("#event/" + guildWarName, evt);
        }
        else {
            if (onComplete)
                onComplete(true);
            startRaid(data, evt);
        }
    };
    if (!checkItem)
        return visitSupporterPageFn;
    return checkItemFn;
}
;
function makeEventTreasureRaidBookmark(chapterId, questSuffix) {
    return function (evt) {
        sendExtensionMessage({ type: "getCurrentEvent" }, function (currentEvent) {
            if (!currentEvent)
                showGamePopup({
                    title: "Error",
                    body: "No event stored. Try visiting the main page."
                });
            var data = makeBookmarkCore(chapterId, questSuffix, 1);
            data.targetUrl = data.targetUrl.replace("#quest/", "#" + currentEvent + "/");
            checkQuestStart_old(data, function (data, eligibility) {
                startRaid(data, evt);
            });
        });
    };
}
;
var guildWarName = null;
var guildWarSubmenu = {
    "guild-war-home": makeGuildWarBookmark(),
    "guild-war-gacha": makeGuildWarBookmark("/gacha/index"),
    "guild-war-reward": makeGuildWarBookmark("/reward"),
};
var menuItems = {
    "home": "/#mypage",
    "party": "/#party/index/0/npc/0",
    "mystuff": {
        "inventory": "/#list",
        "stash": "/#container",
        "crate": "/#present",
        "supplies": "/#item",
    },
    "quest": {
        "quest-all": "/#quest/index",
        "quest-special": "/#quest/extra",
        "join-raid": "/#quest/assist",
        "event": visitCurrentEvent,
        "trial-battles": "/#trial_battle",
        "pending-raids": "/#quest/assist/unclaimed",
    },
    "quest-repeat": repeatLastQuest,
    "guild-war": guildWarSubmenu,
    "hard-raids": {
        "hard-tia": makeRaidBookmark(30004, 1),
        "hard-colo": makeRaidBookmark(30009, 1),
        "hard-levi": makeRaidBookmark(30015, 1),
        "hard-yugu": makeRaidBookmark(30019, 1),
        "hard-chev": makeRaidBookmark(30022, 1),
        "hard-cel": makeRaidBookmark(30025, 1)
    },
    "magna-raids": {
        "magna-tia": makeTreasureRaidBookmark(30005, 1, 18),
        "magna-colo": makeTreasureRaidBookmark(30010, 1, 19),
        "magna-levi": makeTreasureRaidBookmark(30016, 1, 20),
        "magna-yugu": makeTreasureRaidBookmark(30026, 1, 21),
        "magna-chev": makeTreasureRaidBookmark(30027, 1, 26),
        "magna-cel": makeTreasureRaidBookmark(30028, 1, 31)
    },
    "hl-raids": {
        "hl-tia": makeTreasureRaidBookmark(30044, 1, 32),
        "hl-colo": makeTreasureRaidBookmark(30049, 1, 47),
        "hl-levi": makeTreasureRaidBookmark(30051, 1, 48),
        "hl-yugu": makeTreasureRaidBookmark(30053, 1, 49),
        "hl-chev": makeTreasureRaidBookmark(30056, 1, 50),
        "hl-cel": makeTreasureRaidBookmark(30058, 1, 51),
        "hl-rosequeen": makeTreasureRaidBookmark(30047, 1, 1204),
    },
    "primal-raids": {
        "nataku": makeTreasureRaidBookmark(30042, 1, 1343),
        "flame-glass": makeTreasureRaidBookmark(30041, 1, 1313),
        "macula-marius": makeTreasureRaidBookmark(30038, 1, 1323),
        "athena": makeTreasureRaidBookmark(30107, 1, 1313),
        "medusa": makeTreasureRaidBookmark(30039, 1, 1333),
        "apollo": makeTreasureRaidBookmark(30043, 1, 1353),
        "olivia": makeTreasureRaidBookmark(30040, 1, 1363),
        "odin": makeTreasureRaidBookmark(30046, 1, 1353),
    },
    "coop": {
        "coop": "/#coopraid",
        // This makes it impossible to return to an existing room
        // "coop-host": "/#coopraid/room/entry",
        "coop-join": "/#coopraid/offer",
        "coop-shop": "/#coopraid/lineup"
    },
    "me": {
        "profile": "/#profile",
        "crew": "/#guild",
        "friends": "/#friend",
        "trophies": "/#title"
    },
    "shop": {
        "shop-mobacoins": "#shop/moba/0",
        "shop-crystals": "#shop/lupi/0",
        "shop-points": "/#shop/exchange/points",
        "shop-trajectory": "#shop/exchange/trajectory",
        "shop-moon": "#shop/exchange/moon",
        "shop-treasure": "#shop/exchange/list",
        "shop-whale-tears": "#shop/exchange/ceiling",
        "shop-weapon-series": "#archaic",
    },
    "casino": {
        "poker": "/#casino/list/poker",
        "bingo": "/#casino/list/bingo",
        "casino-shop": "/#casino/exchange"
    },
};
var viramateMenuItems = {
    "settings": function () {
        var loc = chrome.extension.getURL("src/options_custom/index.html");
        var w = window.open(loc);
    },
    "update-notes": function () {
        var loc = chrome.extension.getURL("content/changelog.html");
        var w = window.open(loc);
    }
};
function isHorizontalLayout() {
    return (isMobileSite() ||
        !!currentSettings.horizontalBookmarks ||
        !!document.getElementById("gree-game-container"));
}
;
function makeMenuHandler(name, value, tryCloseMenu) {
    var result;
    if (typeof (value) === "string")
        result = function (evt) {
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            tryCloseMenu();
            bookmarkNavigate(value, evt);
        };
    else if (value && value.call && value.apply)
        result = function (evt) {
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            tryCloseMenu();
            value(evt);
        };
    else
        return null;
    allBookmarks[name] = result;
    return result;
}
;
function _updateIconSize(menuIcon) {
    if (isHorizontalLayout())
        menuIcon.style.left = menuLeftEdge.toFixed(0) + "px";
    else
        menuIcon.style.left = "-6px";
    var iconRect = menuIcon.getBoundingClientRect();
    if (isHorizontalLayout())
        menuIconSize = iconRect.width * getEffectiveZoom(menuIcon) * getEffectiveZoom(document.documentElement);
    else
        menuIconSize = iconRect.height * getEffectiveZoom(menuIcon);
}
;
function getColorForMenuItem(key) {
    switch (key) {
        case "hard-raids":
            return "#efc0ba";
        case "magna-raids":
            return "#e8e8f1";
        case "hl-raids":
            return "#efe0ba";
    }
    var dashPos = key.lastIndexOf("-");
    var suffix = key.substr(dashPos + 1);
    switch (suffix) {
        case "tia":
            return "#bfefbf";
        case "yugu":
            return "#efdfa0";
        case "colo":
            return "#efbfbf";
        case "levi":
            return "#bfcfef";
        case "cel":
            return "#d890df";
    }
    return null;
}
;
function showViraButton() {
    if (isShutdown)
        return;
    injectStylesheet("sidebar-shadow.css", getUiContainer());
    var outImg = getResourceUrl('vira-small-smile.png');
    var overImg = getResourceUrl('vira-small.png');
    var isCustomIcon = false;
    try {
        if (currentSettings.bookmarksInactiveIcon)
            outImg = encoding.Base64.stringToImageURL(currentSettings.bookmarksInactiveIcon);
        if (currentSettings.bookmarksActiveIcon)
            overImg = encoding.Base64.stringToImageURL(currentSettings.bookmarksActiveIcon);
        isCustomIcon = (currentSettings.bookmarksActiveIcon || currentSettings.bookmarksInactiveIcon);
    }
    catch (exc) {
        log("Error decoding custom bookmarks icons", exc);
    }
    var menuIcon = document.createElement("div");
    var mainMenu = document.createElement("div");
    menuIcon.className = "viramate-menu-icon";
    // HACK: Why is this necessary?
    menuIcon.style.backgroundRepeat = "no-repeat";
    menuIcon.style.backgroundImage = "url(" + outImg + ")";
    menuIcon.setAttribute("title", "DMCAmate");
    var maxIconWidth = isCustomIcon ? 64 : 56;
    // HACK: :after selectors don't work on img. html sucks.
    var tempImage = document.createElement("img");
    tempImage.style.opacity = "0.0";
    tempImage.onload = function () {
        var scale = 1.0;
        if (tempImage.naturalWidth > maxIconWidth)
            scale = maxIconWidth / tempImage.naturalWidth;
        menuIcon.style.width = (tempImage.naturalWidth * scale).toFixed(0) + "px";
        menuIcon.style.height = (tempImage.naturalHeight * scale).toFixed(0) + "px";
        uninjectElement(getUiContainer(), tempImage);
        _updateIconSize(menuIcon);
        _layoutPanels();
    };
    tempImage.src = outImg;
    injectElement(getUiContainer(), tempImage);
    var paddingSize = 100;
    if (typeof (currentSettings.bookmarksIconPadding) === "number")
        paddingSize = currentSettings.bookmarksIconPadding;
    if (isHorizontalLayout()) {
        menuIcon.style.paddingRight = Math.max(paddingSize - 12, 0).toFixed(0) + "px";
    }
    else {
        menuIcon.style.paddingBottom = Math.max(paddingSize - 12, 0).toFixed(0) + "px";
    }
    mainMenu.className = "viramate-menu";
    if (typeof (currentSettings.bookmarksSize) === "number")
        menuIcon.style.transform = "scale(" + currentSettings.bookmarksSize.toFixed(1) + ")";
    if (typeof (currentSettings.bookmarksMenuSize) === "number")
        mainMenu.style.transform = "scale(" + currentSettings.bookmarksMenuSize.toFixed(1) + ")";
    // mainMenu.style.zoom = menuIcon.style.zoom = (1 / getEffectiveZoom(document.documentElement)).toFixed(2);
    var mouseIsOverIcon = false;
    var mouseIsOverMenu = 0;
    var mouseIsOverSubmenu = 0;
    var menuIsVisible = false;
    var allMenus = [mainMenu];
    var updateTimeout = 0;
    var autoOpenDelay = isHorizontalLayout() ? 260 : 160;
    var autoCloseDelay = currentSettings.openBookmarksOnClick ? 500 : 250;
    var pamrklamr = function () {
        return 5 * 1000 + (Math.random() * 1600 * 1000);
    };
    var fmajrlialmsk;
    fmajrlialmsk = function () {
        if (isShutdown)
            return;
        if (isCustomIcon)
            return;
        if (!menuIsVisible) {
            menuIcon.style.backgroundImage = "url(" + getResourceUrl('hfgk/askpmr/vxgkql.png') + ")";
            window.setTimeout(function () {
                menuIcon.style.backgroundImage = "url(" + getResourceUrl('hfgk/qw3mkl/vqprlm.png') + ")";
            }, 60);
            window.setTimeout(function () {
                menuIcon.style.backgroundImage = "url(" + getResourceUrl('hfgk/askpmr/vxgkql.png') + ")";
            }, 950);
            window.setTimeout(function () {
                menuIcon.style.backgroundImage = "url(" + outImg + ")";
            }, 1060);
        }
        window.setTimeout(fmajrlialmsk, pamrklamr());
    };
    window.setTimeout(fmajrlialmsk, pamrklamr());
    var showMenu = function (menu) {
        if (menu.className.indexOf("viramate-menu") === 0)
            menu.style.left = menuLeftEdge.toFixed(0) + "px";
        else
            menu.style.left = "0px";
        menu.style.opacity = "1.0";
        menu.style.pointerEvents = "all";
        menuIsVisible = true;
    };
    var showMenus = function () {
        menuIcon.style.backgroundImage = "url(" + overImg + ")";
        if (menuIcon.className.indexOf("open") < 0)
            menuIcon.className += " open";
        for (var i = 0; i < allMenus.length; i++) {
            var elt = allMenus[i];
            showMenu(elt);
        }
    };
    var hideMenu = function (menu) {
        if (!isMobileSite()) {
            if (menu.className.indexOf("viramate-menu") === 0)
                menu.style.left = (menuLeftEdge - 32).toFixed(0) + "px";
            else
                menu.style.left = "-32px";
        }
        menu.style.opacity = "0.0";
        menu.style.pointerEvents = "none";
        menuIsVisible = false;
    };
    var hideMenus = function () {
        menuIcon.style.backgroundImage = "url(" + outImg + ")";
        menuIcon.className = menuIcon.className.replace(" open", "");
        closeSubmenus();
        hideMenu(allMenus[0]);
    };
    var closeSubmenus = function () {
        // Hide any other open submenus
        for (var i = 1; i < allMenus.length; i++) {
            var submenu = allMenus[i];
            if (submenu.owner)
                submenu.owner.className = submenu.owner.className.replace(" open", "");
            hideMenu(submenu);
        }
        // Pop them off the list
        allMenus.length = 1;
    };
    var openSubmenu = function (owner, submenu) {
        owner.className += " open";
        submenu.owner = owner;
        closeSubmenus();
        allMenus.push(submenu);
        showMenus();
    };
    var updateMenu = function () {
        if (isShutdown)
            return;
        if (mouseIsOverIcon || (mouseIsOverMenu > 0)) {
            if (mouseIsOverSubmenu <= 0)
                closeSubmenus();
            showMenus();
        }
        else
            hideMenus();
    };
    var scheduleUpdate = function (fast) {
        if (updateTimeout)
            window.clearTimeout(updateTimeout);
        updateTimeout = window.setTimeout(updateMenu, fast ? autoOpenDelay : autoCloseDelay);
    };
    var makeSubmenuOverHandler = function (item, submenu) {
        return function (evt) {
            mouseIsOverSubmenu += 1;
            openSubmenu(item, submenu);
        };
    };
    var makeSubmenuOutHandler = function (item, submenu) {
        return function (evt) {
            mouseIsOverSubmenu -= 1;
            // TODO: Anything?
            scheduleUpdate();
        };
    };
    var tryCloseMenu = function () {
        hideMenus();
        window.clearTimeout(updateTimeout);
    };
    menuIcon.addEventListener("click", function () {
        showMenus();
    }, false);
    menuIcon.addEventListener("mouseover", function () {
        mouseIsOverIcon = true;
        if (!isMobileSite() &&
            (currentSettings.openBookmarksOnClick !== true))
            scheduleUpdate(true);
    }, false);
    menuIcon.addEventListener("mouseout", function () {
        mouseIsOverIcon = false;
        scheduleUpdate();
    }, false);
    mainMenu.addEventListener("mouseover", function () {
        mouseIsOverMenu += 1;
    }, false);
    mainMenu.addEventListener("mouseout", function () {
        mouseIsOverMenu -= 1;
        scheduleUpdate();
    }, false);
    var isGuildWar = currentSettings.currentGuildWar &&
        (currentSettings.currentGuildWar.indexOf("event/teamraid") === 0);
    if (isGuildWar) {
        guildWarName = currentSettings.currentGuildWar.replace("event/", "");
        var raidJson = currentSettings.currentGuildWarRaidInfo;
        if (raidJson) {
            var raids = JSON.parse(raidJson);
            for (var k in raids) {
                var raidInfo = raids[k];
                var raidKey = "guild-war-" + (raidInfo.isHell ? "hell-" + raidInfo.cost : "dog");
                var mark = makeGuildWarRaidBookmark(raidInfo.id, 1, raidInfo.isHell);
                if (raidInfo.isHell)
                    mark.itemText = raidInfo.name + " " + raidInfo.cost + "AP";
                else
                    mark.itemText = raidInfo.name;
                guildWarSubmenu[raidKey] = mark;
            }
        }
    }
    allBookmarks = {};
    var populateSubmenu;
    populateSubmenu = function (container, items, isSubmenu, extraClassNames) {
        if (isSubmenu) {
            if (Object.keys(items).length > 4)
                container.style.columnCount = "2";
        }
        for (var k in items) {
            if (!items.hasOwnProperty(k))
                continue;
            var v = items[k];
            // HACK: Only show guild war submenu during guild war
            if ((v === guildWarSubmenu) &&
                (!isGuildWar || !currentSettings.showGuildWarMenu))
                continue;
            var elt = document.createElement("li");
            elt.className = "viramate-menu-item";
            if (extraClassNames)
                elt.className += " " + extraClassNames;
            elt.setAttribute("key", k);
            var label = v.itemText || i18n.get("m-" + k);
            elt.textContent = label;
            var color = getColorForMenuItem(k);
            if (color)
                elt.style.color = color;
            if (v && (typeof (v) === "object")) {
                // Submenu
                elt.className += " has-submenu";
                var submenu = document.createElement("ul");
                submenu.className = "viramate-submenu";
                submenu.addEventListener("mouseover", function () {
                    mouseIsOverSubmenu += 1;
                }, false);
                submenu.addEventListener("mouseout", function () {
                    mouseIsOverSubmenu -= 1;
                    scheduleUpdate();
                }, false);
                elt.addEventListener("mouseover", makeSubmenuOverHandler(elt, submenu), false);
                elt.addEventListener("mouseout", makeSubmenuOutHandler(elt, submenu), false);
                hideMenu(submenu);
                populateSubmenu(submenu, v, true);
                container.appendChild(submenu);
            }
            else {
                // Item
                elt.addEventListener("mouseup", makeMenuHandler(k, v, tryCloseMenu), true);
                elt.addEventListener("tap", makeMenuHandler(k, v, tryCloseMenu), false);
            }
            container.appendChild(elt);
        }
        ;
    };
    var ul = document.createElement("ul");
    mainMenu.appendChild(ul);
    populateSubmenu(ul, menuItems, false);
    var langSelectorEn = document.createElement("li");
    var langSelectorJp = document.createElement("li");
    langSelectorEn.className = "language-menu-item en";
    langSelectorJp.className = "language-menu-item jp";
    langSelectorEn.textContent = "English";
    langSelectorJp.textContent = "æ—¥æœ¬èªž";
    langSelectorEn.title = langSelectorJp.title = i18n.get("m-set-language");
    langSelectorEn.addEventListener("click", makeLanguageSetter(2), true);
    langSelectorJp.addEventListener("click", makeLanguageSetter(1), true);
    ul.appendChild(langSelectorEn);
    ul.appendChild(langSelectorJp);
    var versionText = document.createElement("span");
    versionText.className = "viramate-version";
    ul.appendChild(versionText);
    populateSubmenu(ul, viramateMenuItems, false, "small");
    hideMenus();
    if (isHorizontalLayout()) {
        menuIcon.className += " horizontal";
        mainMenu.className += " horizontal";
        var trySpawn = function () {
            if (isShutdown)
                return true;
            var gameContainer = getGameContainer();
            var wrapper = gameContainer.querySelector(".wrapper");
            if (!gameContainer || !wrapper)
                return false;
            var effectiveZoom = getEffectiveZoom(gameContainer);
            var documentZoom = getEffectiveZoom(document.documentElement);
            menuLeftEdge = parseFloat(wrapper.parentNode.getAttribute("data-show-menubar-width")) || 0;
            if ((wrapper.getBoundingClientRect().left === 0) || currentSettings.hideMobageSidebar)
                menuLeftEdge = 0;
            var effectiveSidebarHeight = 48;
            if (isMobileSite()) {
                effectiveSidebarHeight /= documentZoom;
                getOverlayContainer().style.zoom = (1 / documentZoom).toFixed(3);
            }
            wrapper.style.marginTop = (effectiveSidebarHeight / effectiveZoom).toFixed(0) + "px";
            // FIXME: prt-quest-header scene css selector:
            // .log .prt-quest-header has position 'fixed' so it slides under horizontal bar
            return true;
        };
        if (!trySpawn())
            window.setTimeout(trySpawn, 500);
    }
    injectElement(getUiContainer(), menuIcon);
    injectElement(getUiContainer(), mainMenu);
    sendExtensionMessage({ type: "getVersion" }, function (version) {
        var text = "DMCAmate " + version;
        if (isMobileSite())
            text += " (mobile)";
        versionText.textContent = text;
    });
    window.setTimeout(function () {
        if (isShutdown)
            return;
        _updateIconSize(menuIcon);
        getUserIdAndTabIdAsync(showStatusPanel);
    }, 25);
}
;
var primeHaloRequestIsPending = false;
var primeHaloStartsWhen = null, primeHaloStartsWhenText = null;
var needHaloPanelLayout = false;
function navigateToExtraQuests() {
    window.location.href = "/#quest/extra";
}
;
function updateClock(element) {
    var jstHourMinute = {
        timeZone: "Asia/Tokyo",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
    };
    var text = new Date().toLocaleString("ja-JP", jstHourMinute) + " JST";
    var timeText = element.time;
    if (!timeText) {
        element.time = timeText = document.createElement("span");
        element.appendChild(timeText);
    }
    var c = (currentSettings.clockBrightness * 255).toFixed(0);
    var ct = "rgb(" + c + ", " + c + ", " + c + ")";
    timeText.style.color = ct;
    timeText.textContent = text;
    /*

    var haloText = element.halo;
    if (!haloText) {
        element.appendChild(document.createElement("br"));

        element.halo = haloText = document.createElement("span");
        haloText.className = "halo-timer";
        element.appendChild(haloText);

        haloText.addEventListener("click", navigateToExtraQuests, false);
    }

    if (primeHaloStartsWhen) {
        var now = Date.now();

        if (!primeHaloStartsWhenText) {
            var temp = new Date(primeHaloStartsWhen);
            primeHaloStartsWhenText = temp.toLocaleString("ja-JP", jstHourMinute);
        }

        if (primeHaloStartsWhen < now) {
            // Prime halo is active
            c = (currentSettings.clockBrightness * 255).toFixed(0);
            var c2 = (currentSettings.clockBrightness * 210).toFixed(0);
            haloText.textContent = "\u2605 Halo"
            haloText.style.color = "rgb(" + c + ", " + c + ", " + c2 + ")";
            haloText.style.fontWeight = "bold";
        } else {
            // Prime halo starts soon
            c = (currentSettings.clockBrightness * 220).toFixed(0);
            haloText.textContent = "\u2605H " + primeHaloStartsWhenText;
            haloText.style.color = "rgb(" + c + ", " + c + ", " + c + ")";
            haloText.style.fontWeight = "normal";
        }
    } else {
        haloText.textContent = "";
    }

    */
    if (needHaloPanelLayout) {
        _layoutPanels();
        needHaloPanelLayout = false;
    }
}
;
function showStatusPanel(uid) {
    var panel = document.createElement("div");
    panel.className = "viramate-status-panel";
    // panel.style.zoom = (1 / getEffectiveZoom(document.documentElement)).toFixed(2);
    var clock = null;
    if (currentSettings.clockBrightness >= 0.05) {
        clock = document.createElement("span");
        clock.className = "time";
        panel.appendChild(clock);
    }
    if (currentSettings.statusPanel) {
        var meters = document.createElement("div");
        meters.className = "meters";
        var createMeter = function (name, withShadow) {
            var meter = document.createElement("div");
            meter.className = "meter " + name + "-meter";
            meter.title = name.toUpperCase();
            var fill = document.createElement("div");
            fill.className = "fill";
            meter.fill = fill;
            meter.appendChild(fill);
            if (withShadow) {
                var shadow = document.createElement("div");
                shadow.className = "fill shadow";
                meter.shadow = shadow;
                meter.appendChild(shadow);
            }
            panel[name + "Meter"] = meter;
            meters.appendChild(meter);
        };
        panel.appendChild(meters);
        createMeter("rp", false);
        createMeter("ap", true);
        createMeter("bp", true);
        if (currentSettings.statusPanelBuffs) {
            var buffsPanel = panel.buffs = document.createElement("div");
            buffsPanel.className = "buffs";
            panel.appendChild(buffsPanel);
        }
    }
    if (currentSettings.itemsPanel) {
        var itemsPanel = panel.items = document.createElement("div");
        itemsPanel.className = "items";
        if (currentSettings.largeItemsPanel)
            itemsPanel.className += " large-items";
        panel.appendChild(itemsPanel);
    }
    if (clock)
        window.setInterval(function () { updateClock(clock); }, 1000);
    if (isHorizontalLayout())
        panel.className += " horizontal";
    injectElement(getUiContainer(), panel);
    if (currentSettings.raidsPanel)
        showRaidsPanel(uid);
    _layoutPanels();
    invalidateStatus = function () {
        sendExtensionMessage({ type: "invalidateStatus", uid: uid });
    };
    if (currentSettings.itemsPanel) {
        invalidateItems = function (items) {
            _invalidateItems(panel, uid, items);
        };
        updateItemsPanel = function () {
            _updateItemsPanel(panel, uid);
        };
        doUpdateItemsPanel = function (items) {
            _doUpdateItemsPanel(panel, uid, items);
        };
    }
    if (currentSettings.statusPanel) {
        updateStatusPanel = function (force, lazy) {
            if (isCombatPage(window.location.hash))
                return;
            else if (window.location.hash.indexOf("result_") >= 0)
                return;
            else if (window.location.hash.indexOf("coopraid/room") >= 0)
                return;
            _updateStatusPanel(panel, uid, force, lazy);
        };
        doUpdateStatusPanel = function (status) {
            _doUpdateStatusPanel(panel, status);
        };
        doUpdateGuildSupportBuffs = function (buffs) {
            _doUpdateGuildSupportBuffs(panel, uid, buffs);
        };
        doUpdatePersonalSupportBuffs = function (buffs) {
            _doUpdatePersonalSupportBuffs(panel, uid, buffs);
        };
        invalidateSupportBuffs = function () {
            _invalidateSupportBuffs(panel, uid);
        };
        var lazyUpdate = function () {
            if (isShutdown) {
                window.clearInterval(statusIntervalH);
                return;
            }
            updateStatusPanel(false, true);
        };
        statusIntervalH = window.setInterval(lazyUpdate, statusPanelUpdateIntervalSeconds * 1000);
        // HACK: We need to delay this a bit so the page can finish loading
        window.setTimeout(lazyUpdate, 1250);
    }
    _layoutPanels();
}
;
function _layoutPanels() {
    var uic = getUiContainer();
    var statusPanel = uic.querySelector("div.viramate-status-panel");
    var raidsPanel = uic.querySelector("div.viramate-raids-panel");
    if (!statusPanel)
        return;
    if (isHorizontalLayout()) {
        subpanelOffset = menuIconSize + 4;
        statusPanel.style.left = (menuLeftEdge).toFixed(0) + "px";
        statusPanel.style.paddingLeft = subpanelOffset.toFixed(0) + "px";
        var meters = statusPanel.querySelector("div.meters");
        var buffs = statusPanel.querySelector("div.buffs");
        var items = statusPanel.querySelector("div.items");
        if (meters) {
            meters.style.left = (subpanelOffset + 64).toFixed(0) + "px";
        }
        if (buffs) {
            buffs.style.left = (subpanelOffset + 128 + 4).toFixed(0) + "px";
            if (items)
                items.style.left = (subpanelOffset + 128 + buffs.clientWidth + 8).toFixed(0) + "px";
        }
        else if (items) {
            items.style.left = (subpanelOffset + 128 + 4).toFixed(0) + "px";
        }
        if (raidsPanel) {
            var bw = 0, iw = 0;
            if (buffs)
                bw = buffs.clientWidth;
            if (items)
                iw = items.clientWidth;
            if (bw)
                bw += 2;
            if (iw)
                iw += 2;
            if (buffs)
                raidsPanel.style.left = (128 + bw + iw + menuLeftEdge + subpanelOffset + 8).toFixed(0) + "px";
            else if (meters)
                raidsPanel.style.left = (128 + iw + menuLeftEdge + subpanelOffset + 8).toFixed(0) + "px";
            else
                raidsPanel.style.left = (64 + menuLeftEdge + subpanelOffset + 8).toFixed(0) + "px";
        }
    }
    else {
        subpanelOffset = menuIconSize + 12;
        statusPanel.style.top = subpanelOffset.toFixed(0) + "px";
        if (raidsPanel)
            raidsPanel.style.top = (statusPanel.clientHeight + subpanelOffset).toFixed(0) + "px";
    }
}
;
function _roundDown(value, decimals) {
    var mult = Math.pow(10, decimals);
    value *= mult;
    value = Math.floor(value);
    value /= mult;
    return value.toFixed(decimals);
}
;
function _setWidth(elt, fraction) {
    if (fraction < 0)
        fraction = 0;
    else if (fraction > 1)
        fraction = 1;
    var newWidth = (fraction * 100).toFixed(2) + "%";
    if (elt.style.width !== newWidth)
        elt.style.width = newWidth;
}
;
function _invalidateSupportBuffs(panel, uid) {
    var msg = { type: "invalidateBuffs", uid: uid };
    sendExtensionMessage(msg);
    updateBuffsWhen = Date.now() + 2000;
}
;
function _doUpdatePersonalSupportBuffs(panel, uid, buffs) {
    if (isShutdown)
        return;
    var msg = { type: "updatePersonalBuffs", uid: uid, buffs: buffs };
    sendExtensionMessage(msg);
    window.setTimeout(function () {
        _updateStatusPanel(panel, uid, false, true);
    }, 1000);
}
;
function _doUpdateGuildSupportBuffs(panel, uid, buffs) {
    if (isShutdown)
        return;
    var msg = { type: "updateGuildBuffs", uid: uid, buffs: buffs };
    sendExtensionMessage(msg);
    window.setTimeout(function () {
        _updateStatusPanel(panel, uid, false, true);
    }, 1000);
}
;
function _doUpdateStatusPanel(panel, status) {
    lastPlayerStatus = status;
    var ap = status._precise_ap;
    var bp = status._precise_bp;
    panel.apMeter.setAttribute("text", _roundDown(ap, 1));
    _setWidth(panel.apMeter.fill, Math.floor(ap) / parseInt(status.max_action_point));
    _setWidth(panel.apMeter.shadow, ap / parseInt(status.max_action_point));
    panel.bpMeter.setAttribute("text", _roundDown(bp, 0));
    _setWidth(panel.bpMeter.fill, Math.floor(bp) / parseInt(status.max_battle_point));
    _setWidth(panel.bpMeter.shadow, bp / parseInt(status.max_battle_point));
    panel.rpMeter.setAttribute("text", status.levelGauge);
    panel.rpMeter.fill.style.width = status.levelGauge;
    if (currentSettings.statusPanelBuffs)
        _doUpdateBuffsPanel(panel, status);
    _layoutPanels();
}
;
function _doUpdateBuffsPanel(panel, status) {
    var buffsPanel = panel.buffs;
    buffsPanel.textContent = "";
    var buffs = status.buffs;
    if (!buffs || !buffs.length)
        return;
    var x = 0, y = 0;
    var count = 0;
    var nextBuffUpdateMinutes = null;
    for (var i = 0, l = buffs.length; i < l; i++) {
        var buff = buffs[i];
        var elt = document.createElement("div");
        elt.className = "viramate-buff";
        elt.style.backgroundImage = "url('" + buff.imageUrl + "')";
        elt.style.left = x.toFixed(0) + "px";
        elt.style.top = y.toFixed(0) + "px";
        var minutesLeft = ((buff.timeRemaining / 1000) / 60);
        if (nextBuffUpdateMinutes === null)
            nextBuffUpdateMinutes = minutesLeft;
        else
            nextBuffUpdateMinutes = Math.min(minutesLeft, nextBuffUpdateMinutes);
        if (minutesLeft < 90)
            elt.setAttribute("remaining", minutesLeft.toFixed(0));
        else if (currentSettings.statusPanelExpiringBuffs)
            continue;
        if (minutesLeft > 60) {
            elt.title = buff.comment + " - " +
                (minutesLeft / 60).toFixed(1) + " hour(s) remaining";
        }
        else {
            elt.title = buff.comment + " - " +
                minutesLeft.toFixed(0) + " minute(s) remaining";
        }
        if (isHorizontalLayout()) {
            if (y >= 24) {
                y = 0;
                x += 24;
            }
            else {
                y += 24;
            }
        }
        else {
            if (x >= 32) {
                x = 0;
                y += 32;
            }
            else {
                x += 32;
            }
        }
        count++;
        buffsPanel.appendChild(elt);
    }
    if (nextBuffUpdateMinutes) {
        updateBuffsWhen = Math.max(updateBuffsWhen, Date.now() + ((nextBuffUpdateMinutes * 60 * 1000) + (59 * 1000)));
        var nextUpdateSeconds = (updateBuffsWhen - Date.now()) / 1000;
        if (nextUpdateSeconds <= 120)
            log("Updating buffs in " + nextUpdateSeconds.toFixed(0) + " second(s)");
    }
    if (isHorizontalLayout()) {
        buffsPanel.style.width = (Math.ceil(count / 2) * 24).toFixed(0) + "px";
    }
    else {
        buffsPanel.style.height = (Math.ceil(count / 2) * 32).toFixed(0) + "px";
    }
}
;
function _maybeRequestBuffsFromServer() {
    if (!currentSettings.statusPanelBuffs)
        return;
    if (isUpdatingBuffs)
        return;
    var now = Date.now();
    var shouldUpdateBuffs = now > updateBuffsWhen;
    if (!shouldUpdateBuffs)
        return;
    isUpdatingBuffs = true;
    updateBuffsWhen = now + (minimumBuffUpdateIntervalSeconds * 1000);
    var updateCounter = 2;
    doClientAjax("/guild_main/support_all_info/", function () {
        updateCounter--;
        if (updateCounter <= 0)
            isUpdatingBuffs = false;
    });
    doClientAjax("/shop_exchange/activated_personal_supports/", function () {
        updateCounter--;
        if (updateCounter <= 0)
            isUpdatingBuffs = false;
    });
}
;
function _updateStatusPanel(panel, uid, force, lazy) {
    if (isShutdown)
        return;
    var msg = { type: "getStatus", uid: uid, force: !!force, lazy: !!lazy };
    sendExtensionMessage(msg, function (status) {
        if (status) {
            _doUpdateStatusPanel(panel, status);
            _maybeRequestBuffsFromServer();
            _updateItemsPanel(panel, uid);
        }
        else
            log("Failed to get status");
    });
}
;
function showRaidsPanel(uid) {
    if (isShutdown)
        return;
    var panel = document.createElement("div");
    panel.className = "viramate-raids-panel";
    // panel.style.zoom = (1 / getEffectiveZoom(document.documentElement)).toFixed(2);
    if (isHorizontalLayout())
        panel.className += " horizontal";
    var cdt = document.createElement("div");
    panel.countdownTimer = cdt;
    cdt.className = "countdown-timer";
    if (isHorizontalLayout()) {
        cdt.style.height = "0px";
    }
    else {
        cdt.style.width = "0px";
    }
    injectElement(getUiContainer(), panel);
    raidTimerIntervalH = window.setInterval(function () {
        if (isShutdown) {
            window.clearInterval(raidTimerIntervalH);
            return;
        }
        updateRaidTimer(panel);
    }, 750);
    updateRaidsPanel = function () {
        _updateRaidsPanel(panel, uid, false);
    };
    invalidateRaidList = function (raids) {
        _invalidateRaidList(panel, uid, raids);
    };
    doUpdateRaidsPanel = function (raids) {
        _doUpdateRaidsPanel(panel, raids);
    };
    if (!pendingRaidUpdate)
        window.setTimeout(updateRaidsPanel, 1000);
}
;
function maybeScheduleNextRaidUpdate(panel) {
    if (isShutdown)
        return;
    if (pendingRaidUpdate) {
        updateRaidTimer(panel);
        return;
    }
    nextRaidUpdateWhen = null;
    if (!lastPlayerStatus) {
        pendingRaidUpdate = window.setTimeout(updateRaidsPanel, 3000);
        nextRaidUpdateWhen = Date.now() + 3000;
    }
    else if (raidListUpdateCounter-- >= 0) {
        currentRaidListUpdateInterval += raidListUpdateBackoff;
        // console.log("raid list update; next in " + (currentRaidListUpdateInterval / 1000).toFixed(1) + "s");
        pendingRaidUpdate = window.setTimeout(updateRaidsPanel, currentRaidListUpdateInterval);
        nextRaidUpdateWhen = Date.now() + currentRaidListUpdateInterval;
    }
    else {
        log("raid list updates disabled because player is idle");
        _doUpdateRaidsPanel(panel, null);
    }
    updateRaidTimer(panel);
}
;
function shouldShowRaidsPanel() {
    // return true;
    return !isCombatPage(window.location.hash) &&
        (window.location.hash.indexOf("#coopraid/room") < 0) &&
        (window.location.hash.indexOf("#result_") < 0) &&
        (window.location.hash.indexOf("quest/supporter") < 0);
}
;
function updateRaidTimer(panel) {
    var ct = panel.countdownTimer;
    var remaining = nextRaidUpdateWhen - Date.now();
    if (shouldShowRaidsPanel() && nextRaidUpdateWhen && (raidListUpdateCounter > 0)) {
        var total = currentRaidListUpdateInterval;
        var fraction = 1.0 - Math.max(Math.min(remaining / total, 1.0), 0.0);
        if (isHorizontalLayout())
            ct.style.height = (fraction * 44).toFixed(1) + "px";
        else
            ct.style.width = (fraction * 60).toFixed(1) + "px";
        ct.title = "Next raid list update in " + (remaining / 1000).toFixed(1) + " second(s)";
    }
    else {
        if (isHorizontalLayout())
            ct.style.height = "0px";
        else
            ct.style.width = "0px";
    }
}
;
function isJoined(raid) {
    return raid["data-raid-type"] === 0;
}
;
function raidJoinHandler(evt) {
    doJoinRaid(evt, this);
    evt.preventDefault();
}
;
function _doUpdateRaidsPanel(panel, _raids) {
    if (!panel)
        return;
    panel.innerHTML = "";
    panel.appendChild(panel.countdownTimer);
    if (!_raids) {
        return;
    }
    var raids = _raids.assist_raids_data;
    if (!raids)
        return;
    for (var i = 0; i < raids.length; i++) {
        var raid = raids[i];
        if (!raid)
            continue;
        var elt = document.createElement("div");
        elt.className = "raid";
        elt.title = raid.chapter_name;
        if (isJoined(raid))
            elt.className += " joined";
        if (raid.boss_image) {
            var imageUrl = "http://game-a1.granbluefantasy.jp/";
            if (i18n.get("lang") === "en")
                imageUrl += "assets_en";
            else
                imageUrl += "assets";
            imageUrl += "/img/sp/assets/summon/qm/" + raid.boss_image + ".png";
            elt.style.backgroundImage = "url('" + imageUrl + "')";
        }
        else {
            elt.textContent = raid.chapter_name;
        }
        elt.addEventListener("mouseup", raidJoinHandler.bind(raid), false);
        var gauge = document.createElement("div");
        gauge.className = "gauge";
        var fill = document.createElement("div");
        fill.className = "fill";
        fill.style.width = raid.boss_hp_width + "%";
        var memberCount = document.createElement("span");
        memberCount.className = "member-count";
        memberCount.textContent = raid.member_count;
        gauge.appendChild(fill);
        elt.appendChild(gauge);
        elt.appendChild(memberCount);
        panel.appendChild(elt);
    }
}
;
function _updateRaidsPanel(panel, uid, force) {
    if (isShutdown)
        return;
    pendingRaidUpdate = null;
    maybeScheduleNextRaidUpdate(panel);
    // HACK
    if (!shouldShowRaidsPanel()) {
        _doUpdateRaidsPanel(panel, null);
        return;
    }
    if (!lastPlayerStatus)
        return;
    if (currentSettings.raidsPanelBpFilter) {
        if (lastPlayerStatus && (lastPlayerStatus._precise_bp < 3)) {
            log("Not updating raids list because player only has " + lastPlayerStatus._precise_bp.toFixed(1) + " BP");
            _doUpdateRaidsPanel(panel, null);
            return;
        }
    }
    var msg = { type: "getRaids", uid: uid, force: !!force };
    sendExtensionMessage(msg, function (raids) {
        if (raids)
            _doUpdateRaidsPanel(panel, raids);
        else
            log("Failed to get raids");
    });
}
;
function _invalidateRaidList(panel, uid, raids) {
    if (!raids ||
        (window.location.hash.indexOf("quest/assist") >= 0)) {
        if (pendingRaidUpdate) {
            window.clearTimeout(pendingRaidUpdate);
            pendingRaidUpdate = null;
        }
        raidListUpdateCounter = 45;
        currentRaidListUpdateInterval = raidListUpdateInterval;
        maybeScheduleNextRaidUpdate(panel);
    }
    var msg = { type: "invalidateRaids", uid: uid, raids: raids };
    sendExtensionMessage(msg);
}
;
function _invalidateItems(panel, uid, items) {
    if (isShutdown)
        return;
    var msg = { type: "invalidateItems", uid: uid, items: items };
    sendExtensionMessage(msg);
    if (items) {
        _doUpdateItemsPanel(panel, uid, items);
    }
    else {
        // HACK
        window.setTimeout(function () {
            _updateItemsPanel(panel, uid);
        }, 2000);
    }
}
;
function _updateItemsPanel(panel, uid) {
    // Only check for items if something is watched.
    sendExtensionMessage({ type: "getWatchedItems" }, function (watchedItems) {
        if (!currentSettings.itemsPanel)
            return;
        if (!watchedItems.items || !watchedItems.items.length)
            return;
        var msg = { type: "getItems", uid: uid, force: false };
        sendExtensionMessage(msg, function (items) {
            mostRecentItems = items;
            _doUpdateItemsPanel(panel, uid, items);
        });
    });
}
;
function _doUpdateItemsPanel(_panel, uid, items) {
    var panel = _panel.items;
    if (!items)
        items = mostRecentItems;
    if (!items) {
        panel.textContent = "";
        return;
    }
    var onWatchedItemIconContextMenu = function (evt) {
        evt.preventDefault();
    };
    var onWatchedItemIconMouseUp = function (evt) {
        evt.preventDefault();
        var itemId = parseInt(evt.target.getAttribute("item-id"));
        var targetCount = parseInt(evt.target.getAttribute("target-count"));
        switch (evt.button) {
            case 0:
                log("Toggling item target count", itemId);
                var target = -1;
                if ((targetCount <= 0) ||
                    (typeof (targetCount) !== "number") ||
                    Number.isNaN(targetCount))
                    targetCount = parseInt(prompt("Set target number of " + evt.target.title));
                else
                    targetCount = -1;
                if (Number.isNaN(targetCount))
                    targetCount = -1;
                sendExtensionMessage({
                    type: "setItemWatchTarget", id: itemId, count: targetCount
                });
                break;
            case 2:
                log("Removing watch on item", itemId);
                sendExtensionMessage({ type: "setItemWatchState", id: itemId, state: false });
                break;
        }
        if (doUpdateItemsPanel)
            doUpdateItemsPanel();
    };
    sendExtensionMessage({ type: "getWatchedItems" }, function (obj) {
        var watchedItems = obj.items;
        var targetCounts = obj.counts;
        var x = 0, y = 0;
        var count = 0;
        panel.textContent = "";
        for (var i = 0, l = watchedItems.length; i < l; i++) {
            var itemInfo = findItemInfo(function (item, id) {
                return item.item_id == id;
            }, watchedItems[i]);
            if (!itemInfo)
                continue;
            var elt = document.createElement("div");
            elt.className = "viramate-item";
            elt.style.backgroundImage = "url('http://game-a.granbluefantasy.jp/assets_en/" +
                "img/sp/assets/item/article/s/" + itemInfo.image + ".jpg')";
            elt.style.left = x.toFixed(0) + "px";
            elt.style.top = y.toFixed(0) + "px";
            elt.title = itemInfo.name + " (Left-click to set goal, right-click to hide)";
            elt.setAttribute("item-id", itemInfo.item_id);
            elt.addEventListener("contextmenu", onWatchedItemIconContextMenu, false);
            elt.addEventListener("mouseup", onWatchedItemIconMouseUp, false);
            var targetCount = targetCounts[itemInfo.item_id] || -1;
            var remaining = targetCount - itemInfo.number;
            if (targetCount > 0)
                elt.setAttribute("target-count", targetCount);
            if ((remaining > 0) && (targetCount > 0)) {
                elt.setAttribute("count", "-" + remaining);
            }
            else {
                elt.setAttribute("count", itemInfo.number);
            }
            count++;
            panel.appendChild(elt);
            if (isHorizontalLayout()) {
                if (currentSettings.largeItemsPanel) {
                    y = 0;
                    x += 48;
                }
                else if (y >= 24) {
                    y = 0;
                    x += 24;
                }
                else {
                    y += 24;
                }
            }
            else {
                if (currentSettings.largeItemsPanel) {
                    y += 64;
                    x = 0;
                }
                else if (x >= 32) {
                    x = 0;
                    y += 32;
                }
                else {
                    x += 32;
                }
            }
        }
        var iconSize, iconDivisor;
        if (isHorizontalLayout()) {
            iconDivisor = currentSettings.largeItemsPanel ? 1 : 2;
            iconSize = currentSettings.largeItemsPanel ? 48 : 24;
            panel.style.width = (Math.ceil(count / iconDivisor) * iconSize).toFixed(0) + "px";
        }
        else {
            iconDivisor = currentSettings.largeItemsPanel ? 1 : 2;
            iconSize = currentSettings.largeItemsPanel ? 64 : 32;
            panel.style.height = (Math.ceil(count / iconDivisor) * iconSize).toFixed(0) + "px";
        }
        _layoutPanels();
    });
}
;
function doJoinRaid(evt, raid) {
    var inNewWindow = false;
    if (evt) {
        inNewWindow = (evt.button === 1) ||
            !!evt.shiftKey;
    }
    if (inNewWindow) {
        // HACK: Fully resolve the URL
        var elt = document.createElement("a");
        elt.href = "/#quest/assist";
        sendExtensionMessage({ type: "openNewTab", url: elt.href });
    }
    else {
        window.location.href = "/#quest/assist";
    }
}
;
function findItemInfo(predicate, arg) {
    if (!mostRecentItems)
        return false;
    for (var i = 0, l = mostRecentItems.length; i < l; i++) {
        var item = mostRecentItems[i];
        if (predicate(item, arg))
            return item;
    }
    return false;
}
;
function makeLanguageSetter(languageId) {
    return function (e) {
        e.preventDefault();
        doClientAjax("/setting/save", JSON.stringify({ special_token: null, language_type: String(languageId) }), function (result, error) {
            if (error)
                showGamePopup("Failed to set language");
            else
                log("Language set successfully");
        });
    };
}

var abilityHotkeys = ["Q", "W", "E", "R", "T", "Y"];
var altAbilityHotkeys = [null, null, "A", "S"];
var focusedCharacterIndex = null;
var serverSkillState;
// { charIndex[1-4]: { ... }
var latestSkillState = {};
function isSkipActive() {
    if (!skipButton)
        skipButton = document.querySelector("div.prt-ability-skip");
    // WTF?
    if (!skipButton)
        return;
    // HACK: The state of this button is backwards for some reason
    var isSkipActive = skipButton.getAttribute("active") === "0";
    return isSkipActive;
}
;
function onNormalAttackBegin() {
    // console.log("Turn begun on server");
    activatingSkillId = null;
    normalAttacking = true;
    partyStateIsDirty = true;
    // combatState.isAttacking doesn't get set back to 0 if auto is on, so use this to force an update
    if (combatState && combatState.auto_attack) {
        updatePanels = true;
    }
    if (combatState &&
        (combatState.skillQueue.length === 2) &&
        (combatState.skillQueue[1] === "NormalAttack" || combatState.skillQueue[1] === "Summon")) {
        updatePanels = true;
    }
    if (pollingInterval) {
        window.clearInterval(pollingInterval);
        pollingInterval = null;
    }
}
;
function onNormalAttackEnd() {
    // console.log("Turn ended on server");
}
;
function onNormalAttackFail() {
    // console.log("Attack failed");
    normalAttacking = false;
}
;
function onSummonBegin() {
    activatingSkillId = null;
    usingSummon = true;
    partyStateIsDirty = true;
}
;
function findSkillButtons(id) {
    return document.querySelectorAll('div.lis-ability > div[ability-id="' + id + '"]');
}
;
function onAbilityCastStart(id) {
    activatingSkillId = null;
    currentSkillRequestId = parseInt(id);
    normalAttacking = false;
    usingSummon = false;
    partyStateIsDirty = true;
    if (combatState && combatState.usingAbility) {
        updatePanels = true;
    }
    if (pollingInterval) {
        window.clearInterval(pollingInterval);
        pollingInterval = null;
    }
    if (currentSettings.showSkillActivationIndicator)
        window.requestAnimationFrame(function () {
            var elts = findSkillButtons(id);
            for (var i = 0, l = elts.length; i < l; i++) {
                var elt = elts[i];
                var pe = (elt.parentElement);
                pe.classList.add("activating");
            }
        });
    // console.log("Skill cast started", id);
}
;
function onAbilityCastEnd(id) {
    // console.log("Skill cast ended on server", id);
    currentSkillRequestId = null;
    partyStateIsDirty = true;
    successfulAbilityCasts.push(parseInt(id));
    if (currentSettings.showSkillActivationIndicator)
        window.requestAnimationFrame(function () {
            var elts = findSkillButtons(id);
            for (var i = 0, l = elts.length; i < l; i++) {
                var elt = elts[i];
                var pe = (elt.parentElement);
                pe.classList.remove("activating");
            }
        });
}
;
function onAbilityCastFail(id, reason) {
    // console.log("Skill cast failed", id, reason);
    currentSkillRequestId = null;
    partyStateIsDirty = true;
    if (currentSettings.showSkillActivationIndicator)
        window.requestAnimationFrame(function () {
            var elts = findSkillButtons(id);
            for (var i = 0, l = elts.length; i < l; i++) {
                var elt = elts[i];
                var pe = (elt.parentElement);
                pe.classList.remove("activating");
            }
        });
}
;
function parseSkillInner(characterNumber, hasClass, getIconAttribute) {
    var id = parseInt(getIconAttribute("ability-id"));
    var name = getIconAttribute("ability-name");
    if (!name)
        return null;
    var recast = parseInt(getIconAttribute("ability-recast"));
    var cooldown = parseInt(getIconAttribute("recaset-default"));
    var description = getIconAttribute("text-data");
    var isPick = Number(getIconAttribute("ability-pick")) > 0;
    if (Number.isNaN(recast) || Number.isNaN(cooldown))
        throw new Error("wtf");
    // FIXME
    return {
        characterNumber: characterNumber,
        id: Number(id),
        index: -1,
        name: name,
        description: description.replace(/<br>/g, "\n").replace(/<.*?>/g, ""),
        recast: recast,
        cooldown: cooldown,
        isPick: isPick
    };
}
;
function parseSkill(button, icon) {
    var characterNumberRe = /ability-character-num-([0-9])-/;
    var m = characterNumberRe.exec(icon.className);
    if (!m)
        return null;
    var characterNumber = parseInt(m[1]);
    var characterState = combatState.party[characterNumber - 1];
    var result = parseSkillInner(characterNumber, function hc(className) {
        // TODO: classList?
        return button.className.indexOf(className) >= 0;
    }, function gia(attributeName) {
        return icon.getAttribute(attributeName);
    });
    if (result) {
        result.characterNumber = characterNumber;
        result.button = button;
        result.icon = icon;
        var iconImg = icon.querySelector("img");
        if (iconImg)
            result.iconUrl = iconImg.src;
    }
    return result;
}
;
function onQuickSkillClick(evt) {
    // TODO: Use evt.isTrusted here to detect synthesized clicks?
    // ignore clicks on the quick skill buttons when a popup is open
    if (isAnyPopupOpen()) {
        if (evt.stopImmediatePropagation)
            evt.stopImmediatePropagation();
        return false;
    }
    // start of the new stuff for the ingame skill queue
    if (!isSkillAvailable(this)) {
        if (evt.stopImmediatePropagation)
            evt.stopImmediatePropagation();
        return false;
    }
    if (combatState.skillQueue.includes("NormalAttack")) {
        if (evt.stopImmediatePropagation)
            evt.stopImmediatePropagation();
        return false;
    }
    // HACK: Maybe always do this?
    if (isPartyStateRemote) {
        var isLocked = refreshButtonLock(this.button, 0);
        if (isLocked) {
            log("Blocking skill activation because it was used in another tab (?)");
            if (evt.stopImmediatePropagation)
                evt.stopImmediatePropagation();
            return false;
        }
    }
    // When the player clicks a quick skill we need to make sure that the
    //  regular skill button becomes disabled as a result    
    if (!skillMap)
        return;
    var pe = evt.target.parentElement;
    var buttons = skillMap.get(this.id);
    if (this.cooldown > 0)
        window.setTimeout(function () {
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i] === pe) {
                    continue;
                }
                // having the class name there prevents it from queueing
                buttons[i].querySelector("div[class^='shine']").style.display = "block";
            }
        }, 10);
}
;
function onRailAbilityClick(evt) {
    var index = parseInt(evt.target.getAttribute("index"));
    if ((index === 0) ||
        (index > combatState.skillQueue.length) ||
        (combatState.skillQueue[index] === "NormalAttack") ||
        (combatState.skillQueue[index] === "Summon")) {
        return;
    }
    var icon = document.querySelector(combatState.skillQueue[index]);
    if (!icon)
        return;
    var button = icon.parentNode;
    // ???
    if (!skillMap)
        return;
    var buttons = skillMap.get(parseInt(icon.getAttribute("ability-id")));
    for (var i = 0; i < buttons.length; i++) {
        // remove the tmp-mask class from the buttons
        buttons[i].className = buttons[i].className.split(" ").filter(function (e) {
            return (e !== "tmp-mask");
        }).join(" ");
        buttons[i].querySelector("div[class^='shine']").style.display = "none";
    }
}
function scheduleOneClickSummon(summonElement, evt) {
    var container = document.querySelector("div.prt-list-top.btn-command-summon");
    if (!container)
        return "summon buttons not found";
    var isAvailable = (summonElement.className.indexOf("summon-unavailable") < 0);
    if (!isAvailable)
        return "summon unavailable";
    if (!combatState)
        return "not in combat";
    if (combatState.attacking && !combatState.usingAbility)
        return "attacking";
    /*
    generateClick(container);
    generateClick(summonElement);
    */
    sendExternalMessage({
        type: "trySelectSummon",
        pos: summonElement.getAttribute("pos")
    });
    if (!currentSettings.oneClickQuickSummons)
        return "quick summons disabled";
    var expectedSkillName = summonElement.getAttribute("summon-skill-name");
    if (!expectedSkillName) {
        return "summon has no skill name";
    }
    console.log("Scheduling one-click summon activation");
    pendingOneClickSummon = expectedSkillName;
    return "ok";
}
;
function tryPerformOneClickSummon(expectedSkillName) {
    if (!expectedSkillName)
        return false;
    var button = findVisibleElementWithSelector("div.btn-usual-ok.btn-summon-use");
    if (!button)
        return false;
    if (!canUseAbility() && !combatState.usingAbility)
        return false;
    var pendingId = pendingOneClickSummonId;
    pendingOneClickSummon = null;
    pendingOneClickSummonId = null;
    var actualSkillName = button.getAttribute("summon-skill-name");
    if (actualSkillName !== expectedSkillName) {
        console.log("Expected summon skill '" + expectedSkillName +
            "' but found '" + actualSkillName +
            "' instead, canceling one-click activation");
        if (pendingId)
            sendExternalMessage({ type: "socketResult", id: pendingId, result: "internal error" });
        return true;
    }
    else {
        console.log("Performing one-click summon activation '" + actualSkillName + "'");
    }
    pulseElement(button);
    sendExternalMessage({ type: "tryClickSummonUseButton" });
    if (pendingId)
        sendExternalMessage({ type: "socketResult", id: pendingId, result: "ok" });
    return true;
}
;
function getTargets() {
    var targets = Array.from(document.querySelectorAll("a.btn-targeting"));
    return targets.filter(isVisibleElement);
}
;
function getCurrentTarget() {
    var targets = getTargets();
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (!isVisibleElement(target))
            continue;
        if (target.className.indexOf("lock-on") >= 0)
            return { index: i, target: parseInt(target.getAttribute("target")) };
    }
    return null;
}
;
function tryCycleTarget(delta) {
    var targets = getTargets();
    if (targets.length === 0) {
        bufferedTargetSwitch = delta;
        return false;
    }
    var currentTarget = getCurrentTarget();
    var newIndex;
    if (currentTarget === null)
        newIndex = (delta < 0) ? -1 : 0;
    else
        newIndex = currentTarget.index + delta;
    if (newIndex < 0)
        newIndex = targets.length + newIndex;
    newIndex = newIndex % targets.length;
    var newTarget = targets[newIndex];
    bufferedTargetSwitch = null;
    pulseElement(newTarget);
    generateClick(newTarget);
    return true;
}
;
function processSkillHotkey(evt) {
    var keyText = evt.code.toUpperCase();
    switch (keyText) {
        case "BACKQUOTE":
            return tryPressBackButton(true);
        case "ESCAPE":
            return tryEmptySkillQueue();
        case "SPACE":
            return tryAttack();
        case "KEYK":
            var stickerButton = document.querySelector("div.btn-chat.display-on:not(.comment)");
            if (stickerButton) {
                pulseElement(stickerButton);
                generateClick(stickerButton);
            }
            return;
        case "KEYC":
            return tryToggleChargeAttack();
        case "KEYH":
            return tryOpenHealPanel();
        case "KEYF":
        case "BRACKETLEFT":
            return tryCycleTarget(-1);
        case "KEYG":
        case "BRACKETRIGHT":
            return tryCycleTarget(1);
    }
    var characterNumber = parseInt(keyText.replace("DIGIT", "").replace("NUMPAD", ""));
    if (!Number.isNaN(characterNumber) && (characterNumber >= 1) && (characterNumber <= 5)) {
        // console.log("Select character #" + characterNumber);
        return trySelectCharacterByNumber(characterNumber);
    }
    var abilityIndex = abilityHotkeys.indexOf(keyText.replace("KEY", ""));
    if (abilityIndex < 0)
        abilityIndex = altAbilityHotkeys.indexOf(keyText.replace("KEY", ""));
    if (abilityIndex >= 0 && !isAnyPopupOpen()) {
        var summonsAreVisible = document.querySelector("div.prt-command-summon").className.indexOf("summon-show") >= 0;
        if (summonsAreVisible)
            return tryActivateSummonByIndex(abilityIndex);
        else
            return tryActivateAbilityByIndex(abilityIndex);
    }
    if (keyText.indexOf("ARROW") >= 0) {
        if (isNinjaMarkPopupOpen()) {
            return trySelectNinjaMark(keyText);
        }
        if (keyText === "ARROWLEFT" || keyText === "ARROWRIGHT") {
            return tryCycleCharacter(keyText);
        }
    }
    console.log(keyText);
    return false;
}
;
function getSelectedCharacterNumber() {
    var characterPanels = document.querySelectorAll("div.prt-command-chara:not(.quick-panels)");
    for (var i = 0, l = characterPanels.length; i < l; i++) {
        var panel = characterPanels[i];
        var computedStyle = window.getComputedStyle(panel);
        var display = computedStyle.getPropertyValue("display");
        if (display === "block")
            return parseInt(panel.getAttribute("pos"));
    }
    if ((focusedCharacterIndex !== null) &&
        currentSettings.showQuickPanels &&
        currentSettings.focusQuickPanels)
        return focusedCharacterIndex + 1;
    return null;
}
;
function tryEmptySkillQueue() {
    sendExternalMessage({
        type: "clearSkillQueue"
    });
    return true;
}
;
function tryToggleChargeAttack() {
    // HACK
    var toggleButton = document.querySelector("div.btn-lock");
    if (toggleButton) {
        pulseElement(toggleButton);
        generateClick(toggleButton);
        return true;
    }
    return false;
}
function tryOpenHealPanel() {
    // prevent having two popups open
    if (isAnyPopupOpen()) {
        return false;
    }
    var healButton = document.querySelector("div.prt-sub-command > div.btn-temporary");
    if (healButton) {
        pulseElement(healButton);
        generateClick(healButton);
        return true;
    }
    return false;
}
function isMaskVisible() {
    var mask = findVisibleElementWithSelector("div.mask") ||
        findVisibleElementWithSelector("div.opaque-mask");
    return !!mask;
}
;
function tryAttack() {
    // HACK: We always want to return true so that spacebar presses are consumed in combat.
    var failResult = true;
    if (normalAttacking)
        return failResult;
    // HACK: If some sort of modal is open, don't perform an attack
    if (isMaskVisible())
        return failResult;
    // HACK
    var resultButton = document.querySelector("div.btn-result");
    if (resultButton && combatState && combatState.finish) {
        pulseElement(resultButton);
        generateClick(resultButton, false);
        generateClick(resultButton, true);
        return true;
    }
    // hit the confirm button if ninja mark/anki popup is open
    if (isNinjaMarkPopupOpen() || isAnkiPopupOpen()) {
        var confirmButton = findActiveUsualTextButton();
        pulseElement(confirmButton);
        generateClick(confirmButton);
        return true;
    }
    return failResult;
}
;
function tryPressBackButton(doPulse) {
    var backButton = document.querySelector("div.btn-command-back.display-on");
    if (backButton) {
        if (doPulse)
            pulseElement(backButton);
        generateClick(backButton);
        return true;
    }
}
;
function tryCycleCharacter(keyText) {
    // If the character panel isn't already open, clicking the arrows misbehaves
    var isCharPanelOpen = document.querySelector("div.prt-slide-icon.show-icon");
    if (!isCharPanelOpen)
        return;
    var button;
    if (keyText === "ARROWLEFT")
        button = document.querySelector("div.ico-pre");
    else
        button = document.querySelector("div.ico-next");
    if (!button)
        return false;
    pulseElement(button);
    generateClick(button);
    return true;
}
;
function tryUseItemByNumber(number) {
    var itemContainer = findVisibleElementWithSelector("div.prt-select-item");
    if (!itemContainer)
        return false;
    var items = itemContainer.querySelectorAll("div.lis-item");
    var item = items[(number - 1)];
    if (!item)
        return true;
    pulseElement(item);
    generateClick(item);
    return true;
}
;
function trySelectCharacterByNumber(number) {
    var waitingForCharacterSelection = !!findVisibleElementWithSelector("div.txt-select-chara");
    if (
        // HACK: If the 'tap a member to heal' text is visible, we actually want to pick characters
        //  with the number keys, so skip this
        !waitingForCharacterSelection &&
        // HACK: Some sort of modal is open, so let's try the possibilities...
        isMaskVisible()) {
        return tryUseItemByNumber(number) ||
            true;
    }
    if (number === 5) {
        var button = document.querySelector("div.btn-command-summon");
        if (button) {
            tryPressBackButton(false);
            pulseElement(button);
            generateClick(button);
            return true;
        }
    }
    var isAnyCommandPanelOpen = Array.from(document.querySelectorAll("div.prt-command-chara:not(.quick-panels)"))
        .some(function (e) { return e.style.display === "block"; }) ||
        (document.querySelector("div.prt-command-summon").className.indexOf("summon-show") >= 0);
    if (currentSettings.showQuickPanels &&
        currentSettings.focusQuickPanels &&
        !isAnyCommandPanelOpen) {
        setFocusedCharacterIndex(number - 1);
    }
    else {
        setFocusedCharacterIndex(null);
        var characterPortrait = document.querySelector('div.btn-command-character[pos="' + (number - 1) + '"]');
        if (!characterPortrait)
            return false;
        tryPressBackButton(false);
        pulseElement(characterPortrait);
        generateClick(characterPortrait);
    }
    return true;
}
;
function setFocusedCharacterIndex(index) {
    if (focusedCharacterIndex === index)
        return;
    focusedCharacterIndex = index;
    var quickPanels = document.querySelectorAll('div.quick-panel');
    for (var i = 0; i < quickPanels.length; i++)
        quickPanels[i].classList.remove("focused");
    if (index !== null) {
        var quickPanel = document.querySelector('div.quick-panel[index="' + index + '"]');
        // ????
        if (!quickPanel)
            throw new Error("Couldn't find quick panel");
        quickPanel.classList.add("focused");
    }
    // pulseElement(quickPanel);
}
;
function tryActivateSummonByIndex(index) {
    var selector = 'div.lis-summon[pos="' + (index + 1) + '"]';
    var icon = document.querySelector(selector);
    if (!icon) {
        console.log("No matching summon found");
        return false;
    }
    pulseElement(icon);
    generateClick(icon);
    return true;
}
;
function findSkillIcon(characterNumber, abilityNumber) {
    // FIXME: Only fetch icon for old skill system
    var className = "ability-character-num-" + characterNumber + "-" + abilityNumber;
    return document.querySelector("div." + className);
}
;
function tryGetParsedSkill(characterNumber, abilityNumber) {
    var result;
    if (!combatState)
        return null;
    if (!serverSkillState)
        return null;
    var absoluteCharacterIndex = combatState.characterIds.indexOf(combatState.party[characterNumber - 1].pid);
    var cs = serverSkillState[absoluteCharacterIndex];
    if (cs)
        result = cs[abilityNumber];
    if (result) {
        if (!result.button || !result.icon) {
            let icon = findSkillIcon(characterNumber, abilityNumber);
            result.button = icon.parentElement;
            result.icon = icon;
        }
        if (!result.iconUrl) {
            var iconImg = result.icon.querySelector("img");
            if (iconImg)
                result.iconUrl = iconImg.src;
        }
        result.index = abilityNumber;
    }
    return result;
}
;
function tryActivateAbilityByIndex(index) {
    var selectedCharacterNumber = getSelectedCharacterNumber();
    if (!selectedCharacterNumber) {
        log("No character selected");
        return false;
    }
    var parsed = tryGetParsedSkill(selectedCharacterNumber, index + 1);
    if (parsed) {
        pulseElement(parsed.icon);
        if (!normalAttacking) {
            var clickEvtResult = onQuickSkillClick.bind(parsed, { target: parsed.icon })();
            if (clickEvtResult !== false)
                generateClick(parsed.icon);
        }
        return true;
    }
    return false;
}
;
function updateQuickSummonPanel() {
    if (!currentSettings.showQuickPanels)
        return;
    if (!quickSummonPanel)
        quickSummonPanel = document.querySelector("div.quick-summon-panel");
    if (!quickSummonPanel) {
        quickSummonPanel = document.createElement("div");
        quickSummonPanel.className = "quick-summon-panel";
        // HACK: If we put this in the party panel, it auto-hides, but then it comes before
        //  the actual character panels in the query order and breaks things
        var commandPanel = document.querySelector("div.prt-command");
        injectElement(commandPanel, quickSummonPanel);
    }
    var summons = document.querySelectorAll("div.lis-summon");
    quickSummonPanel.innerHTML = "";
    for (var i = 0; i < summons.length; i++) {
        var summon = summons[i];
        var turnsLeft = parseInt(summon.getAttribute("summon-recast"));
        var isAvailable = (turnsLeft <= 0) && !!combatState.summon_enable;
        var image = summon.querySelector("img");
        var quickSummon = document.createElement("div");
        quickSummon.className = "quick-summon " + (isAvailable ? "available" : "unavailable");
        quickSummon.setAttribute("index", String(i));
        quickSummon.style.backgroundImage = 'url("' + image.src + '")';
        if (turnsLeft > 0)
            quickSummon.setAttribute("recast", String(turnsLeft));
        else
            quickSummon.setAttribute("recast", "");
        var tooltip = summon.getAttribute("summon-name") + "\n" + summon.getAttribute("summon-comment");
        tooltip = tooltip.replace(/<br>/g, "\n").replace(/<.*?>/g, "") +
            "\nCooldown: " +
            summon.getAttribute("summon-recast") +
            " turn(s)";
        quickSummon.title = tooltip;
        // HACK: Suppress mousedown events because maybe they confuse granblue's input library?
        quickSummon.addEventListener("mousedown", suppressEvent, true);
        quickSummon.addEventListener("mouseup", scheduleOneClickSummon.bind(null, summon), true);
        if (shouldHandleTouchInput())
            quickSummon.addEventListener("touchend", scheduleOneClickSummon.bind(null, summon), true);
        quickSummonPanel.appendChild(quickSummon);
    }
}
;
var currentSkillStatus = {};
var previousPartyPids = {};
function processPartyMember(index, partyIcon, skillContainer, updateQuickPanels, pid) {
    var buttons = skillContainer.querySelectorAll("div.lis-ability");
    var abilityStates = partyIcon.querySelectorAll("div.lis-ability-state");
    var className;
    if (previousPartyPids[index] !== pid) {
        previousPartyPids[index] = pid;
        updateQuickPanels = "reset";
    }
    if (updateQuickPanels) {
        if (!quickPanels)
            quickPanels = document.querySelector("div.quick-panels");
        if (!quickPanels) {
            quickPanels = document.createElement("div");
            className = "quick-panels " +
                // HACK: So some of the built-in styles apply
                "prt-command-chara";
            quickPanels.className = className;
            // HACK: If we put this in the party panel, it auto-hides, but then it comes before
            //  the actual character panels in the query order and breaks things
            var commandPanel = document.querySelector("div.prt-command");
            injectElement(commandPanel, quickPanels);
        }
        var quickPanel = document.querySelector('div.quick-panel[index="' + index + '"]');
        if (!quickPanel) {
            quickPanel = document.createElement("div");
            className = "quick-panel " +
                // HACK: So some of the built-in styles apply
                "prt-ability-list";
            quickPanel.className = className;
            quickPanel.setAttribute("index", index);
            var x = (index * 54);
            quickPanel.style.left = x.toFixed(0) + "px";
            quickPanels.appendChild(quickPanel);
        }
        updateQuickPanelSize();
    }
    var isDead = (combatState.party[index].alive === false);
    var existingButtons;
    if (quickPanel) {
        if ((updateQuickPanels === "reset") || isDead)
            quickPanel.innerHTML = "";
        else
            existingButtons = quickPanel.querySelectorAll("div.quick-button");
    }
    var css = currentSkillStatus[index + 1];
    if (!css)
        css = currentSkillStatus[index + 1] = [];
    css.length = 0;
    for (var i = 0, l = 4; i < l; i++) {
        var btn = buttons[i];
        if (!btn) {
            if (existingButtons && existingButtons[i])
                existingButtons[i].parentNode.removeChild(existingButtons[i]);
            continue;
        }
        var aState = abilityStates[i];
        var parsed = tryGetParsedSkill(index + 1, i + 1);
        if (!parsed) {
            aState.textContent = "";
            btn.firstElementChild.removeAttribute("hotkey-text");
        }
        css.push(parsed);
        if (isDead)
            continue;
        var effectiveRecast = 0;
        var isAbilityLocked = false;
        var tooltip;
        if (parsed) {
            var icon = parsed.icon;
            tooltip = parsed.name + "\n" + parsed.description + "\n" + "Cooldown: " + parsed.cooldown + " turn(s)";
            btn.title = tooltip;
            isAbilityLocked = combatState.party[index].skillsAvailable[i] === false;
            if (currentSettings.keyboardShortcuts2)
                icon.setAttribute("hotkey-text", abilityHotkeys[i]);
            if (isSkillAvailable(parsed) ||
                !currentSettings.showSkillCooldowns) {
                effectiveRecast = 0;
                aState.textContent = "";
            }
            else if (parsed.recast > 8000) {
                effectiveRecast = 0;
                aState.textContent = "Ã—";
            }
            else if (isAbilityLocked) {
                effectiveRecast = 0;
                aState.textContent = "Ã—";
            }
            else {
                effectiveRecast = parsed.recast;
                aState.textContent = parsed.recast;
            }
        }
        if (updateQuickPanels) {
            if (!skillMap) {
                skillMap = new Map();
                var railIcons = document.getElementsByClassName("rail-icon-over");
                for (var j = 0; j < railIcons.length; j++) {
                    railIcons[j].addEventListener("mouseup", onRailAbilityClick, true);
                    if (shouldHandleTouchInput()) {
                        railIcons[j].addEventListener("touchend", onRailAbilityClick, true);
                    }
                }
            }
            var quickButton = btn.cloneNode(true);
            quickButton.className += " quick-button";
            if (isAbilityLocked)
                quickButton.className += " ability-disable";
            quickButton.removeAttribute("evt-registered");
            if (parsed) {
                quickButton.setAttribute("title", tooltip);
            }
            else {
                quickButton.className += " empty";
            }
            var recastSpan = quickButton.querySelector("div.txt-recast span");
            if (recastSpan) {
                recastSpan.className = "num-recast-a" + effectiveRecast +
                    " ability-icon-num-" + (index + 1) + "-" + (i + 1);
                recastSpan.value = effectiveRecast;
            }
            var isFirst = (i == 0) ||
                ((i == 2) && currentSettings.largeQuickPanels);
            if (isFirst) {
                quickButton.style.marginLeft = "-3px";
            }
            if ((i == 2) && currentSettings.largeQuickPanels)
                quickPanel.appendChild(document.createElement("br"));
            if (existingButtons && existingButtons[i])
                quickPanel.replaceChild(quickButton, existingButtons[i]);
            else
                quickPanel.appendChild(quickButton);
            if (parsed) {
                // deal with the in-game skill queue and prevent the two different buttons from both queueing
                // FIXME: Is this broken if the parsed skill state changes and we register mouseup multiple times?
                skillMap.set(parsed.id, [btn, quickButton]);
                quickButton.addEventListener("mouseup", onQuickSkillClick.bind(parsed), true);
                if (shouldHandleTouchInput())
                    quickButton.addEventListener("touchend", onQuickSkillClick.bind(parsed), true);
                // HACK
                refreshButtonLock(quickButton, 99999);
            }
        }
    }
}
;
function trySelectNinjaMark(keyText) {
    var button = null;
    switch (keyText) {
        case "ARROWUP":
            button = document.querySelector("div.lis-ninja-mark.mark1");
            break;
        case "ARROWRIGHT":
            button = document.querySelector("div.lis-ninja-mark.mark2");
            break;
        case "ARROWLEFT":
            button = document.querySelector("div.lis-ninja-mark.mark3");
            break;
        case "ARROWDOWN":
            button = document.querySelector("div.lis-ninja-mark.mark4");
            break;
    }
    if (!button) {
        return false;
    }
    pulseElement(button);
    generateClick(button);
    return true;
}
function refreshPartyUI(partyIcons, skillContainers) {
    if (!combatState)
        return;
    var updateQuickPanels = updatePanels || canUseAbility();
    var failed = false;
    if (updateQuickPanels) {
        partyStateIsDirty = false;
        for (var i = 0, l = Math.min(combatState.party.length, partyIcons.length); i < l; i++) {
            var pi = partyIcons[i];
            var sc = skillContainers[i];
            var pid = combatState.party[i].pid;
            if (pi && sc)
                processPartyMember(i, pi, sc, currentSettings.showQuickPanels, pid);
            else
                failed = true;
        }
        updateQuickSummonPanel();
        if (!failed)
            updatePanels = false;
    }
    tickPartyUI(partyIcons, skillContainers);
}
function tickPartyUI(partyIcons, skillContainers) {
    if (!currentSettings.showQuickPanels)
        return;
    if (!quickPanels)
        quickPanels = document.querySelector("div.quick-panels");
    if (!quickPanels)
        return;
    if (!commandTop)
        commandTop = document.querySelector("div.prt-command-top");
    if (!commandTop)
        return;
    var className = "prt-command-chara quick-panels";
    if (commandTop.style.display !== "none")
        className += " visible";
    else
        className += " invisible";
    if (quickPanels.className !== className)
        quickPanels.className = className;
    if (quickSummonPanel)
        quickSummonPanel.style.display =
            commandTop.style.display;
    if (!summonDetailModal)
        summonDetailModal = document.querySelector("div.pop-summon-detail");
    if (!summonDetailModal)
        return;
    if (bufferedTargetSwitch)
        tryCycleTarget(bufferedTargetSwitch);
    if (pendingOneClickSummon)
        tryPerformOneClickSummon(pendingOneClickSummon);
}
;
function isNinjaMarkPopupOpen() {
    return (document.querySelector("div.pop-usual.pop-ability-mark").style.display === "block");
}
function isAnkiPopupOpen() {
    return (document.querySelector("div.pop-usual.pop-ability-hiddenweapon").style.display === "block");
}
function isAnyPopupOpen() {
    var popups = document.querySelectorAll("div.pop-usual");
    for (var i = 0; i < popups.length; i++) {
        if (popups[i].style.display === "block") {
            return true;
        }
    }
    return false;
}
function fixSkillTouch(evt) {
    // resets a skill button back to its regular state if a touchend event is suppressed
    if (evt.type !== "touchend") {
        return;
    }
    if (evt.target.className.indexOf("ico-ability") < 0) {
        return;
    }
    var button = evt.target.parentElement;
    button.className = button.className.split(" ").filter(function (e) {
        return (e !== "on");
    }).join(" ");
}
var lastButtonLockChangeWhen = null;
function refreshButtonLock(btn, sinceLastChange) {
    var icon = btn.firstElementChild;
    if (!icon)
        return true;
    if (!icon.hasAttribute("ability-id"))
        return true;
    var re = /ability-character-num-([0-9])-([0-9])/;
    var m = re.exec(icon.className);
    if (!m)
        return true;
    var characterNumber = parseInt(m[1]), abilityNumber = parseInt(m[2]);
    var parsed = tryGetParsedSkill(characterNumber, abilityNumber);
    if (!parsed)
        return true;
    var id = parsed.id;
    var isDisabled = !isSkillAvailable(parsed);
    var recast = parsed.recast;
    var defaultRecast = parsed.cooldown;
    var expected = "div." + icon.className.replace(/ /g, ".");
    var isQueued = combatState.skillQueue.indexOf(expected) >= 0;
    var shouldBeDisabled = (recast > 0) ||
        Number.isNaN(recast) ||
        isQueued ||
        (currentSkillRequestId === id) ||
        (combatState.party[characterNumber - 1].skillsAvailable[abilityNumber - 1] === false);
    var shouldBeDisabledClass = (recast > 0) ||
        (combatState.party[characterNumber - 1].skillsAvailable[abilityNumber - 1] === false);
    if (defaultRecast === 0)
        shouldBeDisabled = shouldBeDisabledClass = false;
    var isDisabledClass = parsed.button.className.indexOf("btn-ability-unavailable") >= 0;
    if (isDisabledClass !== shouldBeDisabledClass) {
        if (shouldBeDisabledClass)
            parsed.button.className = parsed.button.className.replace("btn-ability-available", "btn-ability-unavailable");
    }
    if (recast > 0) {
        var shineElement = btn.lastElementChild;
        var className = "shine" + recast + " ico-ability-shine";
        if (shineElement.className !== className)
            shineElement.className = className;
    }
    btn.lastElementChild.style.display =
        !shouldBeDisabled ? "none" : "block";
    if (shouldBeDisabled) {
        if (btn.className.indexOf("on") >= 0)
            btn.classList.remove("on");
    }
    if (isDisabled &&
        !shouldBeDisabled) {
        if (!parsed.isLocalState) {
            log("Not re-enabling skill button because we are not operating on local state");
            return shouldBeDisabled;
        }
        if (sinceLastChange < 250)
            return shouldBeDisabled;
        //log("Re-enabled skill button", btn);
        btn.classList.remove("tmp-mask");
        lastButtonLockChangeWhen = performance.now();
    }
    else if (!isDisabled && shouldBeDisabled) {
        if (sinceLastChange < 250)
            return shouldBeDisabled;
        //log("Disabled skill button", btn);
        btn.classList.add("tmp-mask");
        lastButtonLockChangeWhen = performance.now();
    }
    return shouldBeDisabled;
}
;
function refreshButtonLocks() {
    if (!currentSettings.stuckButtonWorkaround2)
        return;
    if (!combatState)
        return;
    if (!combatState.skillQueue)
        return;
    var isCommandTopVisible = document.querySelector("div.prt-command-top").style.display !== "none";
    for (var i = 0, l = skillContainers.length | 0; i < l; i++) {
        var skillContainer = skillContainers[i];
        if (skillContainer.style.display !== "none") {
            // Fix cases where the party view and command view are
            //  both visible because of a swipe on a quick skill
            if (isCommandTopVisible) {
                skillContainer.style.display = "none";
            }
        }
    }
    var sinceLastChange = 999999;
    if (lastButtonLockChangeWhen)
        sinceLastChange = performance.now() - lastButtonLockChangeWhen;
    var buttons = document.querySelectorAll("div.lis-ability");
    for (var i = 0, l = buttons.length; i < l; i++)
        refreshButtonLock(buttons[i], sinceLastChange);
}
;
function getSkillState() {
    return JSON.parse(JSON.stringify(currentSkillStatus));
}
;
function parseServerPlayerState(push) {
    var trace = false;
    if (!serverSkillState)
        serverSkillState = Object.create(null);
    if (trace)
        console.log("----");
    isPartyStateRemote = !push;
    for (var frontRowCharacterNumber in lastPartyAbilityState) {
        let frontRowAbilityState = lastPartyAbilityState[frontRowCharacterNumber];
        if (!frontRowAbilityState) {
            log("WARNING: Missing ability state for front row character #" + frontRowCharacterNumber);
            continue;
        }
        let absoluteCharacterIndex = frontRowAbilityState.pos; // 0-5
        let characterState = lastPartyParam[absoluteCharacterIndex];
        let newObj = serverSkillState[absoluteCharacterIndex] = {};
        if (!characterState) {
            log("WARNING: Missing entry for party member #" + absoluteCharacterIndex);
            continue;
        }
        for (var abilityNumber in frontRowAbilityState.list) {
            let rawSkill = frontRowAbilityState.list[abilityNumber];
            let skill = parseSkillInner(frontRowCharacterNumber, function hc(className) {
                return (rawSkill[0].class.indexOf(className) >= 0) ||
                    (rawSkill[1].class.indexOf(className) >= 0);
            }, function gia(attributeName) {
                var result = rawSkill[0][attributeName];
                if (result === undefined)
                    result = rawSkill[1][attributeName];
                return result;
            });
            newObj[abilityNumber] = skill;
            skill.isLocalState = push;
            if (trace)
                console.log("fr#" + frontRowCharacterNumber + " abi#" + abilityNumber + " = " + JSON.stringify(skill));
        }
    }
    partyStateIsDirty = true;
    refreshButtonLocks();
    if (push) {
        try {
            if (currentSettings.enableRaidSync)
                sendBroadcastMessage({
                    type: "partyStateChanged",
                    lastPartyAbilityState: lastPartyAbilityState,
                    lastPartyFormation: lastPartyFormation,
                    lastPartyParam: lastPartyParam,
                    ts: raidStateTimestamp
                });
        }
        catch (exc) {
            log(exc);
        }
    }
}
;
function isSkillAvailable(parsedSkill) {
    if (parsedSkill.recast > 0)
        return false;
    var ps = combatState.party[parsedSkill.characterNumber - 1];
    var aal = ps.condition.ability_available_list || [];
    if (aal[parsedSkill.index - 1] === false)
        return false;
    return true;
}

var isShutdown = false;
var externalChannel = null, isChannelReady = false;
var scriptSandbox = null, overlayContainer = null, raidOverlayContainer = null;
var pendingExternalMessages = [];
var areModulesOk = true;
var applyPassword = null;
var luckyDay = false;
var releaseMode = false;
try {
    releaseMode = ('update_url' in chrome.runtime.getManifest());
}
catch (exc) {
}
var secretKey = "?" + generateRandomText();
sendExtensionMessage({ type: "registerSecretKey", key: secretKey });
var actualShadowRoots = new WeakMap();
function generateRandomText() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
}
;
function log(...args) {
    var argc = args.length;
    if (argc <= 0)
        return;
    args.unshift((new Date()).toTimeString() + ">");
    console.log.apply(console, args);
}
;
// Naturally this shit is broken and deadlocks randomly because Chrome is trash
/*

var extensionMessagePort = null;
var nextExtensionMessageId = 1;
var extensionMessageResponseCallbacks = {};

function autoOpenExtensionPort () {
    if (isShutdown)
        return false;

    if (!extensionMessagePort) {
        extensionMessagePort = chrome.runtime.connect("fgpokpknehglcioijejfeebigdnbnokj");
        if (chrome.runtime.lastError) {
            log("Error while connecting extension port", chrome.runtime.lastError);
            return false;
        }

        if (extensionMessagePort) {
            extensionMessagePort.onMessage.addListener(onExtensionPortMessage);
            extensionMessagePort.onDisconnect.addListener(function (port) {
                extensionMessagePort = null;
                compatibilityShutdown();
            });
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
};

function onExtensionPortMessage (msg) {
    if (msg && msg.type == "__result__") {
        var callback = extensionMessageResponseCallbacks[msg.id];
        delete extensionMessageResponseCallbacks[msg.id];
        if (callback)
            callback(msg.result, msg.error);
        else
            log("Found no callback for extension message response with id", msg.id);

        if (msg.error)
            log("Error occurred processing extension message", msg.error);
    } else {
        log("Unhandled extension port message", msg);
    }
};

function sendExtensionMessage (msg, callback?) {
    if (isShutdown)
        return;

    try {
        if (autoOpenExtensionPort()) {
            if (callback) {
                msg.__messageId__ = nextExtensionMessageId++;
                extensionMessageResponseCallbacks[msg.__messageId__] = callback;
            }
            return extensionMessagePort.postMessage(msg) || true;
        } else {
            if (callback)
                callback(undefined, "Failed to connect to extension");
            return false;
        }
    } finally {
        if (chrome.runtime.lastError)
            log(chrome.runtime.lastError);
    }
};

*/
var extensionMessageFailureCount = 0;
function sendExtensionMessage(msg, callback) {
    if (isShutdown)
        return false;
    try {
        chrome.runtime.sendMessage(msg, callback);
        extensionMessageFailureCount--;
        if (extensionMessageFailureCount < 0)
            extensionMessageFailureCount = 0;
        return true;
    }
    catch (exc) {
        extensionMessageFailureCount++;
        if (extensionMessageFailureCount >= 3) {
            log("Failed to send extension message, shutting down", exc);
            compatibilityShutdown();
            return false;
        }
        else {
            log("Failed to send extension message");
            throw exc;
        }
    }
    finally {
        if (chrome.runtime.lastError)
            log(chrome.runtime.lastError);
    }
}
;
function getEffectiveZoom(element) {
    var computedStyle = window.getComputedStyle(element);
    return parseFloat(computedStyle.getPropertyValue("zoom"));
}
;
function getShadowRootForElement(elt) {
    if (isShutdown)
        return null;
    else if (!elt)
        throw new Error("Expected element");
    var result = actualShadowRoots.get(elt);
    if (!result) {
        if (elt.attachShadow) {
            result = elt.attachShadow({ mode: 'closed' });
        }
        else {
            // Fallback for old Chrome
            // FIXME: Mask it?
            log("Please upgrade Chrome ðŸ¤¢");
            result = elt.createShadowRoot();
        }
        actualShadowRoots.set(elt, result);
    }
    return result;
}
;
function initExternalSandbox(callback) {
    if (!scriptSandbox) {
        var sandboxParent = document.createElement("div");
        document.documentElement.appendChild(sandboxParent);
        var shadowRoot = getShadowRootForElement(sandboxParent);
        scriptSandbox = document.createElement("iframe");
        scriptSandbox.style = "display: none";
        shadowRoot.appendChild(scriptSandbox);
    }
    loadScriptInSandbox(_loadShaScript, "sha_dev.js", function () {
        loadScriptInSandbox(_loadExternalScript, "external.js", callback);
    });
}
;
function loadScriptInSandbox(constructor, url, callback) {
    var parent = scriptSandbox.contentDocument.documentElement;
    var elt = document.createElement("script");
    elt.type = "text/javascript";
    var js = '"use strict";\r\n(' + constructor.toString() + ')(this);';
    if (!releaseMode) {
        js = "//# sourceURL=chrome-extension://" + chrome.runtime.id + "/injected/" + url + "\r\n" + js;
    }
    // HACK: We can't use .src here because it creates an undocumented race condition
    //  where script loading/execution does not complete synchronously even if we
    //  are loading from a blob.
    elt.textContent = js;
    parent.appendChild(elt);
    callback();
    if (releaseMode) {
        window.setTimeout(function () {
            parent.removeChild(elt);
        }, 1);
    }
}
;
function getOverlayContainer() {
    if (isShutdown)
        return null;
    if (!overlayContainer) {
        var className = generateRandomText();
        overlayContainer = document.createElement("div");
        overlayContainer.className = className;
    }
    if (document.body && (overlayContainer.parentNode !== document.body))
        document.body.appendChild(overlayContainer);
    return overlayContainer;
}
;
function getUiContainer() {
    return getShadowRootForElement(getOverlayContainer());
}
;
function getRaidOverlayContainer() {
    if (isShutdown)
        return null;
    if (raidOverlayContainer && !document.contains(raidOverlayContainer))
        raidOverlayContainer = null;
    if (!raidOverlayContainer) {
        var raidContainer = document.querySelector("div.cnt-raid");
        if (!raidContainer)
            return null;
        var className = generateRandomText();
        raidOverlayContainer = document.createElement("div");
        raidOverlayContainer.className = className;
        raidOverlayContainer.style.zoom = 1;
        raidContainer.appendChild(raidOverlayContainer);
        // HACK: Inject our stylesheets on-demand so the overlay is ready
        injectStylesheetsIntoContainer(getShadowRootForElement(raidOverlayContainer));
    }
    return raidOverlayContainer;
}
;
function getRaidUiContainer() {
    return getShadowRootForElement(getRaidOverlayContainer());
}
;
function getResourceUrl(name) {
    return chrome.extension.getURL('content/' + name); // + secretKey;
}
;
function injectStylesheet(name, container) {
    if (isShutdown)
        return;
    // Content script CSS doesn't work right and is hell to debug, so
    var style = document.createElement("style");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getResourceUrl(name), true);
    xhr.onload = function () {
        var css = xhr.response;
        var markerRe = /(['"])chrome-extension\:\/\/__MSG_@@extension_id__\/([^'"]*)/g;
        css = css.replace(markerRe, function (m, prefix, path) {
            return prefix + chrome.extension.getURL(path);
        });
        if (!releaseMode)
            css = "/* " + name + " */\r\n" + css;
        style.textContent = css;
        (container || getOverlayContainer()).appendChild(style);
    };
    xhr.send();
}
;
function injectElement(container, element) {
    if (isShutdown)
        return;
    container.appendChild(element);
}
;
function uninjectElement(container, element) {
    if (!container)
        return;
    // Page navigate/reload race condition
    if (!container.contains(element))
        return;
    container.removeChild(element);
}
;
function initMessageChannel() {
    externalChannel = new MessageChannel();
    externalChannel.port1.onmessage = onWindowMessage;
    scriptSandbox.contentWindow.postMessage({
        type: "vmInit",
        bhstatic: getResourceUrl("bhstatic.json"),
        moduleIds: Object.keys(moduleIds)
    }, "*", [externalChannel.port2]);
}
;
function validateModule(id, hash) {
    var result = false;
    var hashes = moduleIds[id];
    if (hashes)
        result = (hashes.indexOf(hash) >= 0);
    if (!result) {
        log("module '" + id + "' failed hash check:", hash);
        areModulesOk = false;
        compatibilityShutdown();
    }
    else {
        sendExtensionMessage({ type: "setCompatibility", state: areModulesOk });
    }
}
;
function finishChannelSetup(secretToken) {
    isChannelReady = true;
    for (var i = 0, l = pendingExternalMessages.length; i < l; i++)
        externalChannel.port1.postMessage(pendingExternalMessages[i]);
    pendingExternalMessages.length = 0;
    _loadShaScript(window);
    applyPassword = function (password) {
        if (!password || password.trim().length === 0)
            return;
        var isValid = isValidPassword(password);
        sendExternalMessage({
            type: "setResigned",
            secretToken: isValid ? secretToken : 0
        });
        if (!isValid)
            log("Password verified");
    };
    areYouFeelingLucky();
    // FIXME: This causes the GC to eventually randomly collect things and
    //  everything breaks
    // if (releaseMode)
    //   detachScriptSandbox();
    // log("Sandbox initialized");
}
;
function sendExternalMessage(msg) {
    if (!externalChannel || !isChannelReady) {
        pendingExternalMessages.push(msg);
        return;
    }
    externalChannel.port1.postMessage(msg);
}
;
function isVisibleElement(element) {
    var computedStyle = window.getComputedStyle(element);
    if (computedStyle.getPropertyValue("display") === "none")
        return false;
    if (element.getClientRects().length)
        return true;
    return false;
}
;
function findVisibleElementWithSelector(selector) {
    var buttons = document.querySelectorAll(selector);
    for (var i = 0, l = buttons.length; i < l; i++) {
        var button = buttons[i];
        if (isVisibleElement(button))
            return button;
    }
    return null;
}
;
var AbstractMutationObserver = function AbstractMutationObserver(autoDispose) {
    this._callback = this.callback.bind(this);
    this._check = this.check.bind(this);
    this._maybeDispose = this.maybeDispose.bind(this);
    this.observer = new MutationObserver(this._callback);
    this.pendingCheck = false;
    this.checkFunctions = new Set();
    this.isDisposed = false;
    this.autoDispose = autoDispose !== false;
    this.trace = false;
};
AbstractMutationObserver.prototype.maybeDispose = function () {
    if (!this.autoDispose)
        return;
    if (this.checkFunctions.size === 0) {
        this.dispose(true);
        return true;
    }
    return false;
};
AbstractMutationObserver.prototype.observe = function (element, options) {
    if (this.isDisposed)
        throw new Error("Observer disposed");
    if (this.trace)
        log("Observing", element, options);
    this.observer.observe(element, options);
};
AbstractMutationObserver.prototype.register = function (callback) {
    var cfs = this.checkFunctions;
    var maybeDispose = this._maybeDispose;
    cfs.add(callback);
    return (function unregister() {
        cfs.delete(callback);
        maybeDispose();
    });
};
AbstractMutationObserver.prototype.dispose = function (wasAutomatic) {
    if (this.isDisposed)
        return;
    if (this.trace)
        log("Disposing abstract observer", wasAutomatic ? "automatically" : "manually", this);
    this.isDisposed = true;
    if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
    }
    this.checkFunctions.length = 0;
};
AbstractMutationObserver.prototype.callback = function (mutations) {
    if (this.isDisposed)
        return;
    if (!mutations)
        return;
    var needCheck = false;
    for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (!m.addedNodes || !m.addedNodes.length)
            continue;
        needCheck = true;
        break;
    }
    if (needCheck && !this.pendingCheck) {
        this.pendingCheck = true;
        window.requestAnimationFrame(this._check);
    }
};
AbstractMutationObserver.prototype.check = function () {
    if (this.isDisposed)
        return;
    this.pendingCheck = false;
    this.checkFunctions.forEach(function (cf) {
        cf();
    });
};
AbstractMutationObserver.cache = new WeakMap();
AbstractMutationObserver.forElement = function (element, options) {
    var result = null;
    var trace = false;
    var resultDict = AbstractMutationObserver.cache.get(element);
    var optionsText = JSON.stringify(options);
    if (resultDict) {
        result = resultDict[optionsText];
    }
    else {
        resultDict = Object.create(null);
        AbstractMutationObserver.cache.set(element, resultDict);
    }
    if (result && result.isDisposed)
        result = null;
    if (!result) {
        if (trace)
            log("Cache miss for", element, options);
        result = new AbstractMutationObserver(true);
        result.observe(element, options);
        resultDict[optionsText] = result;
    }
    else {
        if (trace)
            log("Cache hit for", element, options);
    }
    return result;
};
var ListPanel = function ListPanel(container, makeItem) {
    this.container = container;
    this.makeItem = makeItem;
    this.items = new Set();
};
ListPanel.prototype.clear = function () {
    this.container.innerHTML = "";
};
ListPanel.cache = new WeakMap();
ListPanel.forContainer = function (container, makeItem) {
    var result = ListPanel.cache.get(container);
    if (!result) {
        result = new ListPanel(container, makeItem);
        ListPanel.cache.set(container, result);
    }
    return result;
};
function compatibilityShutdown() {
    if (isShutdown)
        return;
    isShutdown = true;
    sendExtensionMessage({ type: "setCompatibility", state: false });
    sendExternalMessage({ type: "compatibilityShutdown" });
    log("Shutting down due to incompatible game version");
    // if (detachScriptSandbox)
    //    detachScriptSandbox();    
    // Finish shutdown happens after the OK message
}
;
function finishCompatibilityShutdown() {
    if (overlayContainer && overlayContainer.parentNode) {
        overlayContainer.parentNode.removeChild(overlayContainer);
        overlayContainer = null;
    }
    if (scriptSandbox && scriptSandbox.parentNode) {
        scriptSandbox.parentNode.removeChild(scriptSandbox);
    }
    log("Shutdown complete");
}
;
var moduleIds = {
    "dXRpbC9vYg==": [
        "12714651802a118e12b7f218d2733eda4408965a86a808ad6f61bdf01c4a8dbf",
        "7c486bcd0283f36059402adaf9ace031783f4b8e4afe22ece9ed421e4007ef44",
        "b08394ca1b72a8658361e641ee31f1d8479b9020f66fd8db66078c008e578f6c",
        "8aeb968c6033391acd38efe5dc0188ac86a3fa5d78a76c6ffc74052954c424fd",
        "d83c74b2ecc40421c7162fb839190104476f12334b044439f652ddef0f07103f",
        "1753d967d5787732bd5da19bfff8f1179aee68be9f3c14ec6963a445c5371f11",
        "af10fe0a97b1e4fe2830450bf3e99bf3977fa5b85708f97784d9715fc7b116b7"
    ]
};
function areYouFeelingLucky() {
    luckyDay = (Math.random() > 0.999915);
    if (luckyDay) {
        log("Hooray!");
        sendExternalMessage({ type: "it's my lucky day" });
    }
}

var combatState = null;
var currentSkillRequestId = null;
var debuffTimerElement = null, buffTimerElements = null;
var refreshBuffsButton = null;
var activatingSkillId = null;
var mostRecentTurn = -1;
var currentSettings = {};
var lastDebuffTimerUpdate = -1;
var currentConditions;
var hasAutoAdvanced = false;
var normalAttacking = false, usingSummon = false;
var autoSkipInProgress = false;
var suppressAutoSkip = false;
var partyStateIsDirty = true;
var combatUIIsPrepared = false;
var pendingOneClickSummon = null, pendingOneClickSummonId = null;
var bufferedTargetSwitch = null;
var hasInvalidatedRaidListAfterCombat = false;
var hasLoadedQuestResults = false;
var skillMap = null;
var currentBattleUid = null, currentBattleTabId = null;
var conditionUpdateIsPending = false, conditionUpdateInProgress = false;
var lastConditionUpdateTimestamp = null, lastSlowConditionUpdateTimestamp = null;
var recheckTimeout = null;
var resultCheckTimeout = null;
var pollingInterval = null;
var statusInterval = null;
var cancelTouch = false;
var updatePanels = false;
var isAttackingLastUpdate = false;
var lastActionTimestamps = null;
var isRemoteConnected = false;
// Callbacks for manipulating the status panel
var updateStatusPanel = null, doUpdateStatusPanel = null, invalidateStatus = null;
var doUpdateGuildSupportBuffs = null, doUpdatePersonalSupportBuffs = null, invalidateSupportBuffs = null;
var statusPanelUpdateIntervalMinutes = 5;
var partyIcons = null, skillContainers = null, partyContainer = null, lisAbility = null, quickPanels = null, commandTop = null, skipButton = null, enemyGauges = null, quickSummonPanel = null, summonDetailModal = null, raidContainer = null, fieldEffectsPanel = null, actionTimerElement = null;
var myTabId = null;
var activeWatches = [];
function resetState() {
    partyStateIsDirty = true;
    combatState = null;
    mostRecentTurn = -1;
    conditionUpdateIsPending = false;
    currentConditions = {};
    currentConditions.enemy = [
        new ConditionRecord(1, 0),
        new ConditionRecord(1, 1),
        new ConditionRecord(1, 2)
    ];
    currentConditions.party = [
        new ConditionRecord(0, 0),
        new ConditionRecord(0, 1),
        new ConditionRecord(0, 2),
        new ConditionRecord(0, 3)
    ];
    // Don't update conditions right away, to avoid the server shouting at us
    lastConditionUpdateTimestamp = Date.now();
    lastDebuffTimerUpdate = -1;
    activatingSkillId = null;
    normalAttacking = false;
    usingSummon = false;
    autoSkipInProgress = false;
    combatUIIsPrepared = false;
    previousConditions = null;
    previousConditionsTimestamps = null;
    bufferedTargetSwitch = null;
    raidListUpdateCounter = 25;
    currentRaidListUpdateInterval = raidListUpdateInterval;
    hasInvalidatedRaidListAfterCombat = false;
    cancelTouch = false;
    updatePanels = false;
    isAttackingLastUpdate = false;
    currentPointStandings = null;
    areBuffTimersInvalid = true;
    focusedCharacterIndex = null;
    lastEnhancementMaterials = {};
    if (buffTimerElements)
        for (var i = 0, l = buffTimerElements.length | 0; i < l; i++)
            buffTimerElements[i].parentNode.removeChild(buffTimerElements[i]);
    if (enemyGauges)
        for (var i = 0, l = enemyGauges.length | 0; i < l; i++)
            enemyGauges[i].parentNode.removeChild(enemyGauges[i]);
    buffTimerElements = null;
    enemyGauges = null;
    resetCachedElements();
    // Cancel any active element watches
    for (var i = 0, l = activeWatches.length | 0; i < l; i++)
        activeWatches[i]();
    activeWatches.length = 0;
    if (recheckTimeout) {
        window.clearTimeout(recheckTimeout);
        recheckTimeout = null;
    }
    if (resultCheckTimeout) {
        // HACK: Don't kill this timer on results pages
        if (window.location.href.indexOf("result") < 0) {
            window.clearTimeout(resultCheckTimeout);
            resultCheckTimeout = null;
        }
    }
    if (pollingInterval) {
        window.clearInterval(pollingInterval);
        pollingInterval = null;
    }
    if (debuffTimerElement)
        debuffTimerElement.style.display = "none";
    if (fieldEffectsPanel)
        fieldEffectsPanel.style.display = "none";
    if (actionTimerElement)
        actionTimerElement.style.opacity = 0.0;
}
;
function resetCachedElements() {
    partyIcons = skillContainers =
        partyContainer = lisAbility =
        quickPanels = commandTop =
        skipButton = enemyGauges =
        quickSummonPanel = summonDetailModal =
        skillMap = null;
}
;

function doInitialize() {
    sendExtensionMessage({ type: "pleaseInjectStylesheets" }, function (tabId) {
        myTabId = tabId;
    });
    var hasUpdatedSettings = false;
    var hasContentLoaded = false;
    var hasInitializedSandbox = false;
    window.addEventListener("hashchange", onHashChange, false);
    window.addEventListener("keydown", onKeyDown, false);
    var tick = function () {
        if (!hasUpdatedSettings)
            return;
        if (!hasContentLoaded && !document.querySelector("div.contents"))
            return;
        if (!hasInitializedSandbox)
            return;
        doInitialSetup();
    };
    document.addEventListener("DOMContentLoaded", function () {
        hasContentLoaded = true;
        tick();
    }, false);
    updateSettings(function () {
        hasUpdatedSettings = true;
        tick();
    });
    initExternalSandbox(function () {
        initMessageChannel();
        i18n.setLanguageGetter(function () {
            return currentSettings.language;
        });
        sendExtensionMessage({ type: "heartbeat" });
        hasInitializedSandbox = true;
        tick();
    });
}
;
var mobileViewportScale = 1.0, mobileElementScale = 1.0;
var scrollbarWidth;
var isCenterPending = false, centerHook = null;
function isMobileSite() {
    return (location.host === "gbf.game.mbga.jp") ||
        (document.body.className.indexOf("android4") >= 0);
}
;
function queueCenterPopups() {
    if (isCenterPending)
        return;
    isCenterPending = true;
    // window.requestAnimationFrame(centerMobilePopups);
}
;
function centerMobilePopups() {
    isCenterPending = false;
    // HACK
    if (isCombatPage(window.location.hash) ||
        (window.location.hash.indexOf("quest/scene") >= 0))
        return;
}
;
function registerMobileHooks() {
    waitForElementToExist(document, "div#pop", function (popContainer) {
        var observer = AbstractMutationObserver.forElement(popContainer, {
            childList: true, subtree: true, attributes: true
        });
        observer.register(queueCenterPopups);
    }, true);
}
;
function handleMobileSizeChange() {
    mobileViewportScale = parseFloat(document.documentElement.style.zoom);
    var gameContainer = getGameContainer();
    document.documentElement.style.marginLeft = Math.ceil(64 / mobileViewportScale).toFixed(0) + "px";
    var targetWidth = measureElementWidth(document.body) - 64;
    var extraZoomRatio = targetWidth / (320 * mobileViewportScale);
    gameContainer.style.transform = "scale(" + extraZoomRatio.toFixed(3) + ")";
    mobileElementScale = mobileViewportScale * extraZoomRatio;
    queueCenterPopups();
}
;
function isQuestMapPage() {
    return (location.hash === "#quest/island") ||
        (location.hash === "#quest/index");
}
;
function measureElementWidth(element) {
    var elt = document.createElement("div");
    elt.style = "position: fixed; left: 0px; right: 0px; top: 0px; bottom: 1px; margin: 0px; padding: 0px; display: block; zoom: reset;";
    element.appendChild(elt);
    var result = elt.clientWidth;
    element.removeChild(elt);
    return result;
}
;
function setupMobileGameContainer() {
    var scrollableElement = document.documentElement;
    // Force the scrollbars off, measure
    scrollableElement.style.overflowY = "hidden";
    var fullWidth = measureElementWidth(scrollableElement);
    // Force the scrollbars to appear, measure
    scrollableElement.style.overflowY = "scroll";
    var innerWidth = measureElementWidth(scrollableElement);
    // Hide the scrollbars again
    scrollableElement.style.overflowY = "";
    scrollbarWidth = (window.outerWidth - window.innerWidth) + (fullWidth - innerWidth);
    window.addEventListener("resize", handleMobileSizeChange, false);
    window.addEventListener("scroll", queueCenterPopups, false);
    handleMobileSizeChange();
    registerMobileHooks();
    // UGH
    window.setTimeout(handleMobileSizeChange, 1000);
    window.setTimeout(handleMobileSizeChange, 2000);
}
;
var hasDoneInitialSetup = false;
var hasDoneEarlySetup = false;
function doEarlyCssSetup() {
    if (hasDoneEarlySetup)
        return;
    hasDoneEarlySetup = true;
}
;
function injectStylesheetsIntoContainer(container) {
    if (isChromeHackNeeded)
        injectStylesheet("chrome-53-shadow.css", container);
    injectStylesheet("viramate.css", container);
    injectStylesheet("viramate-shadow.css", container);
    if (currentSettings.betterEnglishFont)
        injectStylesheet("lato-woff.css", container);
    if (currentSettings.showGaugeOverlays)
        injectStylesheet("gauge-overlays.css", container);
    if (isMobileSite())
        injectStylesheet("mobile.css", container);
}
;
var isChromeHackNeeded = false;
function doInitialSetup() {
    if (hasDoneInitialSetup)
        return;
    hasDoneInitialSetup = true;
    if (!isMobileSite() &&
        ((navigator.userAgent.indexOf("Chrome/53.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/54.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/55.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/56.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/57.0") >= 0) ||
            (navigator.userAgent.indexOf("Chrome/58.0") >= 0)))
        isChromeHackNeeded = true;
    injectStylesheetsIntoContainer(getUiContainer());
    if (currentSettings.fixJPFontRendering) {
        // fix the lang element since it's originally set to jp
        if (document.documentElement.lang === "jp") {
            document.documentElement.lang = "ja";
        }
        // no point doing this if lato is enabled since it's handled by the css
        if (!currentSettings.betterEnglishFont) {
            // fix fonts for <select> elements
            var fonts = window.getComputedStyle(document.body)["font-family"].split(", ");
            fonts.splice(-1, 0, '"Yu Gothic"', '"Meiryo"');
            document.body.style.fontFamily = fonts.join(", ");
        }
    }
    if (currentSettings.disableMiddleRightClick) {
        document.addEventListener("mousedown", suppressMouse, true);
        document.addEventListener("mouseup", suppressMouse, true);
    }
    if (currentSettings.keepSoundOnBlur) {
        window.addEventListener("blur", function (e) {
            e.stopImmediatePropagation();
        }, false);
    }
    // console.log("お姉さま。。。");
    if ((document.readyState === "complete") ||
        (document.readyState === "interactive")) {
        onPageReady();
    }
    else {
        document.addEventListener("readystatechange", function () {
            if (document.readyState === "complete")
                onPageReady();
        }, false);
    }
}
;
function showGamePopup(options) {
    if (typeof (options) !== "object")
        throw new Error("Expected options dictionary");
    var template = document.querySelector("script#popup");
    if (!template) {
        log("Could not find popup template");
        return;
    }
    var templateText = escape(template.textContent);
    var popupData = {
        "element_name": "pop",
        "title": options.title,
        "body": options.body,
        "className": null,
        "okCallBackName": "popRemove",
        "cancelCallBackName": null,
        "exceptionFlag": false,
        "url": null,
        "tpl": templateText
    };
    sendExternalMessage({ type: "doPopup", data: popupData });
}
;
function waitForElementToExist(container, selectors, callback,
    // If false, watch terminates after a match is found
    ongoing,
    // If true, the 'id' and 'class' attributes are watched in order to find a match
    //  that only appears after an element is added to the DOM
    watchAttributes) {
    if (!container)
        throw new Error("No container element");
    else if (!selectors)
        throw new Error("No selector");
    else if (!callback || !callback.call)
        throw new Error("No callback provided");
    if (container === document)
        container = document.body;
    var _container = container;
    if (typeof (selectors) === "string")
        selectors = [selectors];
    var trace = false;
    var hasCleanedUp = false, hasFired = false, checkPending = false;
    var observer = null, unregister = null;
    var seenElements = new WeakMap();
    var cleanup = function () {
        if (hasCleanedUp)
            return;
        if (trace)
            log("Cancelled element watch:", selectors);
        hasCleanedUp = true;
        if (unregister)
            unregister();
        unregister = observer = null;
        seenElements = null;
    };
    var matches = [];
    var checkForElement = function () {
        var result = false;
        var queue = [];
        checkPending = false;
        if (matches.length !== 0)
            throw new Error("Re-entrant element watch check");
        for (var j = 0, l2 = selectors.length; j < l2; j++) {
            var selector = selectors[j];
            var elts = _container.querySelectorAll(selector);
            for (var i = 0, l = elts.length; i < l; i++)
                matches.push(elts[i]);
        }
        for (var i = 0, l = matches.length; i < l; i++) {
            var elt = matches[i];
            if (!seenElements)
                continue;
            if (seenElements.get(elt) === 1)
                continue;
            if (trace)
                log("Found element", elt);
            seenElements.set(elt, 1);
            var cbresult = callback(elt);
            if (cbresult)
                queue.push(cbresult);
            result = true;
            if (!ongoing) {
                cleanup();
                matches.length = 0;
                return result;
            }
        }
        matches.length = 0;
        for (var i = 0, l = queue.length; i < l; i++)
            queue[i]();
        return result;
    };
    if (checkForElement() && !ongoing)
        return null;
    activeWatches.push(cleanup);
    var observerOptions = {
        childList: true, subtree: true,
        attributes: !!watchAttributes, characterData: false
    };
    if (observerOptions.attributes)
        observerOptions.attributeFilter = ["class", "id"];
    observer = AbstractMutationObserver.forElement(_container, observerOptions);
    if (trace)
        log("Started watching for selectors", selectors);
    unregister = observer.register(checkForElement);
    return cleanup;
}
;
function onKeyDown(evt) {
    if (isShutdown)
        return;
    if (!currentSettings.keyboardShortcuts2)
        return;
    if (evt.ctrlKey || evt.altKey)
        return;
    var keyText = evt.code.toUpperCase();
    var focused = document.activeElement;
    var isSpecialCased = false;
    // HACK: Sticker UI stuff
    if (focused && (focused.className === "stamp-filter")) {
        if (keyText === "ENTER") {
            var autoSelected = document.querySelector("div.lis-stamp.auto-selected");
            if (autoSelected) {
                pulseElement(autoSelected);
                generateClick(autoSelected);
            }
            return;
        }
        isSpecialCased = (keyText === "ESCAPE") || (keyText === "BACKQUOTE");
    }
    if (!isSpecialCased &&
        focused && ((focused.nodeName.toLowerCase() === "input") ||
            (focused.nodeName.toLowerCase() === "textarea"))) {
        return;
    }
    var okButton = findOkButton();
    var cancelButton = findCancelButton();
    var textButton = findActiveUsualTextButton();
    if (keyText === "SPACE") {
        if (okButton) {
            pulseElement(okButton);
            generateClick(okButton);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
        else if (cancelButton && !textButton) {
            // HACK: If they hit space while a modal is open that only has a cancel button,
            //  it's unlikely they meant to do anything other than click 'OK'
            // If there is a "usual text" button, then this is probably something different
            return;
        }
    }
    else if ((keyText === "ESCAPE") ||
        (keyText === "BACKQUOTE")) {
        if (cancelButton) {
            // FIXME: Why doesn't this work?
            pulseElement(cancelButton);
            generateClick(cancelButton);
            evt.preventDefault();
            evt.stopPropagation();
            // HACK: Ugh, what is wrong with this modal?
            var summonModal = document.querySelector("div.pop-summon-detail");
            if (summonModal)
                summonModal.style.display = "none";
            return;
        }
    }
    else if (keyText === "KEYL") {
        var btn = document.querySelector("div.btn-repeat-last");
        if (btn) {
            pulseElement(btn);
            generateClick(btn, true);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    else if (keyText === "KEYA") {
        var btn = document.querySelector("div.prt-recommend-buttons div.btn-recommend");
        if (btn) {
            pulseElement(btn);
            generateClick(btn, false);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    else if (keyText === "KEYR") {
        var btn = document.querySelector("div.prt-bonus-reset div.btn-bonus-reset") ||
            document.querySelector("div.pop-confirm-decompose.pop-show div.btn-decompose") ||
            document.querySelector("div.prt-button-decompose div.btn-decompose-confirm") ||
            document.querySelector("div.prt-decompose-button div.btn-decompose");
        if (btn) {
            pulseElement(btn);
            generateClick(btn, false);
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    if (combatState) {
        if (processSkillHotkey(evt)) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
    }
    else if (window.location.hash.indexOf("/opening/scene") >= 0 ||
        window.location.hash.indexOf("/scene/") >= 0 ||
        window.location.hash.indexOf("/scene_epilogue/") >= 0 ||
        window.location.hash.indexOf("archive/story/play_view") >= 0 ||
        window.location.hash.indexOf("archive/detail_npc") >= 0) {
        var choiceNumber = parseInt(keyText.replace("DIGIT", "").replace("NUMPAD", ""));
        var choiceElement;
        if (keyText === "SPACE") {
            // don't do anything if there's a choice available
            var selectionArea = document.querySelector("div.prt-sel-area");
            if (selectionArea && selectionArea.style.display === "block") {
                return;
            }
            var cursorTalk = document.querySelector("div.ico-cursor-talk");
            if (!cursorTalk) {
                return;
            }
            pulseElement(cursorTalk);
            generateClick(cursorTalk);
            evt.preventDefault();
            evt.stopPropagation();
        }
        else if (keyText === "KEYS") {
            var skipButton = document.querySelector("div.btn-skip");
            if (!skipButton) {
                return;
            }
            pulseElement(skipButton);
            generateClick(skipButton);
            evt.preventDefault();
            evt.stopPropagation();
        }
        else if (choiceElement = document.querySelector("div.txt-sel" + choiceNumber)) {
            pulseElement(choiceElement);
            generateClick(choiceElement);
            evt.preventDefault();
            evt.stopPropagation();
        }
    }
    else if (window.location.hash.indexOf("/stage") >= 0) {
        if (keyText === "SPACE") {
            var forwardButton = document.querySelector("div.btn-command-forward");
            pulseElement(forwardButton);
            generateClick(forwardButton);
            evt.preventDefault();
            evt.stopPropagation();
        }
    }
    else if (window.location.hash.indexOf("comic/") >= 0) {
        if (keyText === "ARROWLEFT" || keyText === "ARROWRIGHT") {
            var btn = document.querySelector("li.btn-" + ((keyText === "ARROWLEFT") ? "new" : "old"));
            if (btn) {
                pulseElement(btn);
                generateClick(btn);
                evt.preventDefault();
                evt.stopPropagation();
            }
        }
    }
}
;
function findOkButton() {
    if (
        // HACK: The stamina pop-up sometimes appears on top of an existing modal with an OK button.
        findVisibleElementWithSelector("div.pop-stamina") ||
        // The quest start button has special anticheat treatment like Attack
        findVisibleElementWithSelector("div.se-quest-start"))
        return null;
    var result = findVisibleElementWithSelector("div.btn-usual-ok") ||
        // Confirm join button when joining a public raid
        findVisibleElementWithSelector("div.btn-usual-join") ||
        // OK buttons on raid/quest results pages
        findVisibleElementWithSelector('div.btn-control[data-status="ok"]') ||
        findVisibleElementWithSelector('a.btn-control.location-href[data-location-href="quest"]') ||
        // Quest retreat 'Quests' button
        findVisibleElementWithSelector('div.btn-usual-questlist') ||
        // Co-op room 'leave' confirmation button
        findVisibleElementWithSelector('div.btn-leave') ||
        // Co-op room 'close room' confirmation button
        findVisibleElementWithSelector('div.btn-close') ||
        // Healing 'use' confirmation button
        findVisibleElementWithSelector('div.btn-usual-use') ||
        // Twitter reset tweet confirmation
        findVisibleElementWithSelector('div.btn-tweet-post') ||
        // Setting/removing wonders
        findVisibleElementWithSelector('div.btn-usual-set') ||
        findVisibleElementWithSelector('div.btn-usual-remove') ||
        // Upgrade page
        findVisibleElementWithSelector('div.btn-synthesis') ||
        findVisibleElementWithSelector('div.btn-settle') ||
        findVisibleElementWithSelector('div.prt-follow-button-enhance div.btn-follow-again') ||
        findVisibleElementWithSelector('div.cnt-confirm-material.prt-module-evolution div.btn-evolution.active') ||
        // DO
        findVisibleElementWithSelector('btn-location-island') ||
        findVisibleElementWithSelector('div.btn-start-battle') ||
        // Event new quest notification
        findVisibleElementWithSelector('div.btn-usual-close') ||
        // Casino/shop exchange
        findVisibleElementWithSelector('div.btn-usual-text.exchange') ||
        findVisibleElementWithSelector('div.btn-usual-text.buy') ||
        // Bonus reset
        findVisibleElementWithSelector('div.pop-bonus-reset div.btn-usual-exchange');
    return result;
}
;
function findCancelButton() {
    return findVisibleElementWithSelector("div.btn-usual-cancel") ||
        findVisibleElementWithSelector('div.btn-usual-close');
}
;
function findActiveUsualTextButton() {
    // to account for the assassin anki div having its own class name for some reason
    return findVisibleElementWithSelector("div[class*='btn-usual-']:not(.btn-usual-cancel):not(.disable)");
}
function onHashChange(evt) {
    if (isShutdown)
        return;
    handleNewPage();
}
;
var nextAjaxToken = 0;
var ajaxCallbacks = {};
var nextUidToken = 0;
var uidCallbacks = {};
function doClientAjax(...args) {
    if (isShutdown)
        return;
    var url, data, callback;
    if (args.length === 2) {
        url = args[0];
        data = undefined;
        callback = args[1];
    }
    else if (args.length === 3) {
        url = args[0];
        data = args[1];
        callback = args[2];
    }
    else
        throw new Error("Expected [url, callback] or [url, data, callback]");
    var token = ++nextAjaxToken;
    ajaxCallbacks[token] = callback;
    // console.log("ajax ", url, window.location.hash);
    sendExternalMessage({
        type: "doAjax",
        token: token,
        data: data,
        url: url
    });
}
;
function onWindowMessage(evt) {
    if (!evt.data.type)
        return;
    if (evt.data.type === "shutdownOk") {
        finishCompatibilityShutdown();
        return;
    }
    if (isShutdown)
        return;
    switch (evt.data.type) {
        case "vmHello":
            finishChannelSetup(evt.data.secretToken);
            return;
        case "externalLog":
            var args = evt.data.args;
            args.unshift("vms>");
            console.log.apply(console, args);
            return;
        case "moduleLoaded":
            validateModule(evt.data.id, evt.data.hash);
            return;
        case "ajaxBegin":
            onAjaxBegin(evt.data.url, evt.data.requestData, evt.data.uid);
            return;
        case "ajaxComplete":
            onAjaxComplete(evt.data);
            return;
        case "stageTick":
            // prevent finished combat state from being set back to unfinished in a raid
            if (combatState &&
                combatState.is_multi &&
                combatState.finish &&
                !evt.data.state.finish &&
                (combatState.raid_id == evt.data.state.raid_id)) {
                evt.data.state.finish = true;
            }
            combatState = evt.data.state;
            processCombatPage();
            return;
        case "doAjaxResult":
            var token = evt.data.token;
            var callback = ajaxCallbacks[token];
            delete ajaxCallbacks[token];
            callback(evt.data.result, evt.data.error, evt.data.url);
            return;
        case "webSocketCreated":
            return;
        case "webSocketMessageReceived":
            onWebSocketMessage(evt.data.data);
            return;
        case "gotUserId":
            var token = evt.data.token;
            var callback = uidCallbacks[token];
            delete uidCallbacks[token];
            callback(evt.data.uid);
            return;
        case "doAjax":
        case "doPopup":
        case "click":
        case "dispatchMouseEvent":
        case "getUserIdAndTabId":
            return;
        case "getSkillState":
            var skillState = getSkillState();
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: skillState
            });
            return;
        case "getExtensionVersion":
            sendExtensionMessage({ type: "getVersion" }, function (version) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: version
                });
            });
            return;
        case "getBookmarks":
            var keys = Object.keys(allBookmarks);
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: keys
            });
            return;
        case "visitBookmark":
            var handler = allBookmarks[evt.data.key];
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: !!handler
            });
            handler();
            return;
        case "tryStartGuildWarRaid":
            var bookmarkFn = makeGuildWarRaidBookmark(evt.data.chapterId, evt.data.questSuffix, evt.data.checkItem);
            bookmarkFn(null, function (ok) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: ok
                });
            });
            return;
        case "tryUseSummon":
            var elements = document.querySelectorAll("div.lis-summon[summon-name=\"" + evt.data.name + "\"]");
            if (!elements || elements.length == 0) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: "not found"
                });
                return;
            }
            for (var i = 0, l = elements.length; i < l; i++) {
                var element = elements[i];
                if (element.className.indexOf("btn-summon-available") >= 0) {
                    pendingOneClickSummonId = evt.data.id;
                    var scheduleResult = scheduleOneClickSummon(element, null);
                    if (scheduleResult !== "ok")
                        sendExternalMessage({
                            type: "socketResult",
                            id: evt.data.id,
                            result: scheduleResult
                        });
                    return;
                }
            }
            sendExternalMessage({
                type: "socketResult",
                id: evt.data.id,
                result: "on cooldown"
            });
            return;
        case "connectionStatusChanged":
            isRemoteConnected = evt.data.connected;
            var uic = getUiContainer();
            var icon = uic.querySelector("img.connection-status");
            if (!icon) {
                if (!evt.data.connected)
                    return;
                icon = document.createElement("img");
                icon.className = "connection-status";
                icon.style.opacity = 0.0;
                icon.addEventListener("click", function () { sendExternalMessage({ type: "tryConnect" }); }, false);
                injectElement(uic, icon);
            }
            var newSrc = getResourceUrl(evt.data.connected ? "connected.png" : "disconnected.png");
            icon.title = evt.data.connected ? "Connected." : "Disconnected. Click to connect.";
            if (currentSettings.hideMobageSidebar)
                icon.style.right = "0px";
            else
                icon.style.left = "0px";
            if (newSrc != icon.src) {
                icon.src = newSrc;
                window.setTimeout(function () { icon.style.opacity = 0.8; }, 25);
                window.setTimeout(function () { icon.style.opacity = 0.33; }, 2500);
            }
            return;
        case "error":
            log(evt.data.stack);
            return;
        case "frameStats":
            updatePerformanceHud(evt.data);
            return;
        case "tryRepeatLastQuest":
            repeatLastQuest(null, function (result, reason) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: result ? "ok" : reason
                });
            });
            return;
        case "tryJoinRaid":
            tryJoinRaid(evt.data.code, function (ok) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: ok
                });
            });
            return;
        case "tryJoinCoOpRoom":
            tryJoinCoOpRoom(evt.data.code, function (ok) {
                sendExternalMessage({
                    type: "socketResult",
                    id: evt.data.id,
                    result: ok
                });
            });
            return;
        default:
            log("Unknown window message " + evt.data.type);
            return;
    }
}
;
// FIXME: Duplicated from popup.js
function tryJoinRaid(raidId, onComplete) {
    var oc = function (x) {
        if (onComplete)
            onComplete(x);
        return x;
    };
    if (!raidId || (raidId.length !== 8))
        return oc("invalid id");
    if (combatState && combatState.raidCode == raidId) {
        return oc("already in this raid");
    }
    try {
        var payload = { special_token: null, battle_key: raidId };
        doClientAjax("/quest/battle_key_check", JSON.stringify(payload), function (result, error) {
            console.log("Battle key check returned", result, error);
            if (result) {
                if (typeof (result) === "string")
                    result = JSON.parse(result);
                if (result.popup && result.popup.body) {
                    showGamePopup(result.popup);
                    return oc("popup: " + result.popup.body);
                }
                else if (result.redirect) {
                    if (window.location.href != result.redirect) {
                        doNavigate(result.redirect);
                        window.setTimeout(function () {
                            // Work around stuck summon lists (pretty rare)
                            if (!document.querySelector("div.btn-supporter")) {
                                sendExternalMessage({ type: "navigating" });
                                window.location.reload();
                            }
                        }, 3000);
                    }
                    return oc("ok");
                }
                else if ((typeof (result.current_battle_point) === "number") &&
                    !result.battle_point_check) {
                    console.log("Refill required, need " + result.used_battle_point + "bp");
                    return oc("refill required");
                    /*
                    var useCount = Math.min(result.used_battle_point, result.used_battle_point - status.bp);
                    useNormalItemCallback(5, useCount, function () {
                        // always use the current raid id in case it changes due to the focus changing
                        doJoinRaid(raidId);
                    });
                    */
                }
                else if (result.idleTimeout) {
                    return oc("idle timeout");
                }
                else {
                    return oc("unknown response: " + JSON.stringify(result));
                }
            }
            else {
                return oc("no response from server");
            }
        });
    }
    catch (exc) {
        oc("unknown error: " + String(exc));
    }
}
;
function tryJoinCoOpRoom(roomId, onComplete) {
    var oc = function (x) {
        if (onComplete)
            onComplete(x);
        return x;
    };
    if (!roomId || (roomId.length < 5) || (roomId.length > 6))
        return oc("invalid id");
    try {
        var payload = { special_token: null, room_key: roomId };
        doClientAjax("/coopraid/room_key", JSON.stringify(payload), function (result, error) {
            console.log("Room key check returned", result, error);
            if (result) {
                if (typeof (result) === "string")
                    result = JSON.parse(result);
                if (result.popup && result.popup.body) {
                    showGamePopup(result.popup);
                    return oc("popup: " + result.popup.body);
                }
                else if (result.redirect) {
                    if (window.location.href != result.redirect)
                        doNavigate(result.redirect);
                    return oc("ok");
                }
                else if (result.idleTimeout) {
                    return oc("idle timeout");
                }
                else {
                    return oc("unknown response: " + JSON.stringify(result));
                }
            }
            else {
                return oc("no response from server");
            }
        });
    }
    catch (exc) {
        oc("unknown error: " + String(exc));
    }
}
;
function isCoOpRaid() {
    return combatState && combatState.is_coopraid;
}
;
function autoReloadIfResultsHung() {
    var elt = findVisibleElementWithSelector("div.prt-result-head");
    if (!elt && !hasLoadedQuestResults) {
        log("Raid results still haven't loaded. Force-reloading.");
        sendExternalMessage({ type: "navigating" });
        window.location.reload();
    }
}
;
function checkForBattleResults(raidId, nextDelay, retryCount, originalUrl) {
    if (suppressAutoSkip)
        return;
    trySuppressAutoSkip();
    if (retryCount >= 4) {
        log("Retried results check 4 times, stopping");
        return;
    }
    // HACK: Co-op raids never show up in unclaimed rewards under normal circumstances
    if (isCoOpRaid() && !suppressAutoSkip) {
        trySuppressAutoSkip();
        log("Co-op raid; reloading quickly");
        window.setTimeout(function () {
            if (window.location.href.indexOf("result") < 0) {
                sendExternalMessage({ type: "navigating" });
                if (!suppressAutoSkip)
                    window.location.reload();
            }
        }, 1100);
        return;
    }
    var scheduleRetry = function (offset) {
        window.setTimeout(function () { checkForBattleResults(raidId, nextDelay + 750 + offset, retryCount + 1, originalUrl); }, nextDelay + offset);
    };
    var url = "/quest/unclaimed_reward/1";
    doClientAjax(url, function (result, error) {
        if ((window.location.href !== originalUrl) ||
            (window.location.href.indexOf("#raid") < 0))
            return;
        if (error) {
            log("Failure checking unclaimed rewards", error);
            if (error.indexOf("abort") < 0) {
                scheduleRetry(1700);
            }
            return;
        }
        else if (!result ||
            (typeof (result) !== "object") ||
            (result.count < 0)) {
            // log("No unclaimed rewards yet");
            scheduleRetry(200);
            return;
        }
        var matchingResults = result.list.filter(function (e) {
            if (e.raid_id.trim() === String(raidId))
                return true;
            else
                return false;
        });
        if (!matchingResults.length) {
            log("This raid not in results list yet");
            scheduleRetry(200);
            return;
        }
        if ((window.location.href.indexOf("raid") < 0) ||
            (window.location.href.indexOf("" + combatState.raid_id) < 0)) {
            log("Got victory notification while not on raid page; ignoring");
            return;
        }
        hasLoadedQuestResults = false;
        var unclaimedResult = matchingResults[0];
        log("Found results for this raid", unclaimedResult);
        var url = "/#" + unclaimedResult.href;
        if (window.location.href.indexOf("result") < 0) {
            trySuppressAutoSkip();
            if (!suppressAutoSkip)
                doNavigate(url);
        }
        // HACK: We need to wait a bit to start this timer, otherwise handleNewPage clears it
        window.setTimeout(function () {
            // HACK: If the results dialog doesn't appear within 5 seconds, force reload
            resultCheckTimeout = window.setTimeout(autoReloadIfResultsHung, 5000);
        }, 600);
        autoSkipInProgress = false;
    });
}
;
var showButtonInterval = -1;
var hasFiredOnPageReady = false;
function onPageReady() {
    if (isShutdown)
        return;
    if (hasFiredOnPageReady)
        return;
    hasFiredOnPageReady = true;
    log("onPageReady");
    if (!maybeShowViraButton())
        showButtonInterval = window.setInterval(maybeShowViraButton, 50);
    handleNewPage();
}
;
function getGameContainer() {
    return document.getElementById("mobage-game-container") || document.getElementById("gree-game-container");
}
;
function maybeShowViraButton() {
    if (!currentSettings.showBookmarks)
        return true;
    var gameContainer = getGameContainer();
    if (!gameContainer) {
        log("Not showing vira because no game container");
        return false;
    }
    // don't show the sidebar stuff if we're on the top page and there is no sidebar yet
    if (isMobileSite() ||
        (gameContainer.parentNode !== document.body)) {
        log("Not showing vira because we're on the top page");
        window.clearInterval(showButtonInterval);
        showButtonInterval = -1;
        showViraButton();
        return true;
    }
    return false;
}
;
function parseItemList(itemList, uid) {
    // console.log("Item list updated:", itemList);
    sendExtensionMessage({ type: "updateItemCounters", counters: itemList, uid: uid });
}
;
function parseUserStatus(status, uid) {
    console.log("Captured status update from network");
    sendExtensionMessage({ type: "updateStatus", status: status, uid: uid });
    // We want to fetch the updated data from the background script since it annotates it
    if (updateStatusPanel)
        updateStatusPanel(false, true);
}
;
function parseProfile(data, uid) {
    if (!data)
        return;
    sendExtensionMessage({ type: "updateNextRankRp", data: data, uid: uid });
}
;
function resetRaidCode() {
    sendExtensionMessage({ type: "updateRaidCode", raidCode: null });
}
;
function resizeSubmenu() {
    var size = currentSettings.submenuSize;
    if (typeof (size) !== "number")
        return;
    var elt = document.querySelector("div#submenu");
    if (!elt)
        return;
    elt.style.transformOrigin = "0 0";
    elt.style.transform = "scale(" + size.toFixed(2) + ")";
}
;
function updateSettings(callback) {
    sendExtensionMessage({ type: "getSettings" }, function (settings) {
        if (!settings) {
            settings = {};
            throw new Error("No settings?");
        }
        else {
            currentSettings = settings;
        }
        if (settings.isShutdown) {
            log("Extension currently in shutdown state (remotely?)");
            if (!isShutdown)
                compatibilityShutdown();
            return;
        }
        if (applyPassword)
            applyPassword(settings.password);
        if (callback)
            callback(settings);
        sendExternalMessage({
            type: "settingsChanged",
            settings: JSON.stringify(currentSettings)
        });
    });
}
;
function maybeInstallDropdownHack() {
    if (!currentSettings.dropdownFix)
        return;
    // console.log("Dropdown fix enabled");
    var eventCanceller = function (evt) {
        // HACK: We stop propagation of the event without preventing the default
        //  action, so that the browser will properly open dropdowns or assign input
        //  focus without being hindered by granblue's event handlers
        evt.stopImmediatePropagation();
    };
    waitForElementToExist(document, ["select", "textarea"], function (element) {
        // HACK: Granblue installs a broken mousedown handler on the entire document that
        //  cancels events and breaks input controls
        // We register in capturing mode to run before bubbling event handlers
        // Luckily they don't use a capturing top-level handler - that would be harder to
        //  intercept.
        element.addEventListener("mousedown", eventCanceller, true);
        // We also cancel mouseup events so that their input handler library doesn't have
        //  a chance to be confused by unbalanced down/up events
        element.addEventListener("mouseup", eventCanceller, true);
    }, true);
}
;
function getUserIdAndTabIdAsync(callback) {
    var result = {
        userId: null,
        tabId: myTabId
    };
    var maybeInvokeCallback = function () {
        if (result.userId !== null)
            callback(result.userId, result.tabId);
    };
    var token = ++nextUidToken;
    uidCallbacks[token] = function (userId) {
        result.userId = userId;
        maybeInvokeCallback();
    };
    sendExternalMessage({
        type: "getUserId",
        token: token
    });
}
;
chrome.runtime.onMessage.addListener(function onBackgroundMessage(msg, sender, _sendResponse) {
    var sentResponse = false, sentValue = null;
    var sendResponse = function (value) {
        if (sentResponse)
            log("Already sent response", sentValue, "dropping second response", value);
        else {
            sentResponse = true;
            sentValue = value;
            _sendResponse(value);
        }
    };
    if (isShutdown) {
        if (msg.type === "doGameAjax")
            sendResponse([null, "compatibility shutdown", msg.url]);
        return;
    }
    var key = msg.type;
    switch (key) {
        case "myTabId":
            myTabId = msg.id;
            break;
        case "doGamePopup":
            sendExternalMessage({
                type: "doPopup",
                data: msg.data
            });
            break;
        case "doGameRedirect":
            window.location.href = msg.url;
            break;
        case "doGameAjax":
            // retain sendResponse
            doClientAjax(msg.url, msg.data, function (response, error, url) {
                sendResponse([response, error, url]);
            });
            return true;
        case "getUserId":
        case "getUserIdAndTabId":
            getUserIdAndTabIdAsync(sendResponse);
            return true;
        case "actionTimestampsChanged":
            if (!currentBattleUid)
                return;
            if (msg.uid !== currentBattleUid)
                return;
            lastActionTimestamps = msg.data;
            return;
        case "apiRequest":
            return handleApiRequest(msg.request, sendResponse);
        case "tryJoinRaid":
            tryJoinRaid(msg.code, function (ok) {
                sendResponse(ok);
            });
            return true;
        case "tryJoinCoOpRoom":
            tryJoinCoOpRoom(msg.code, function (ok) {
                sendResponse(ok);
            });
            return true;
        default:
            console.log("Unknown message " + key);
            break;
    }
});
function handleApiRequest(request, sendResponse) {
    console.log("Handling API request", request.type);
    switch (request.type) {
        case "tryJoinRaid":
            tryJoinRaid(request.raidCode, function (ok) {
                sendResponse(ok);
            });
            return true;
        case "tryCoOpRoom":
            tryJoinCoOpRoom(request.roomCode, function (ok) {
                sendResponse(ok);
            });
            return true;
        case "getCombatState":
            sendResponse(combatState);
            return;
        default:
            sendResponse("unknown request");
            return;
    }
}
;
function pulseElement(evt) {
    var pulse = document.createElement("div");
    var boundingBox = evt.getBoundingClientRect();
    var container = document.querySelector("div.contents");
    var containerBox = container.getBoundingClientRect();
    var padding = 1;
    pulse.style.left = (boundingBox.left - containerBox.left + padding) + "px";
    pulse.style.top = (boundingBox.top - containerBox.top + padding) + "px";
    pulse.style.width = (boundingBox.width - (padding * 2)) + "px";
    pulse.style.height = (boundingBox.height - (padding * 2)) + "px";
    pulse.className = "button-pulse pulse-animation";
    injectElement(container, pulse);
    window.setTimeout(function () {
        uninjectElement(container, pulse);
    }, 300);
}
;
var nextClickToken = 1;
var tokenAttribute;
function generateClick(target, asClick) {
    if (!tokenAttribute)
        tokenAttribute = generateRandomText();
    var token;
    if (!target.hasAttribute(tokenAttribute)) {
        token = String(nextClickToken++);
        target.setAttribute(tokenAttribute, token);
    }
    else {
        token = target.getAttribute(tokenAttribute);
    }
    sendExternalMessage({
        type: "click",
        name: target.nodeName,
        token: token,
        tokenAttribute: tokenAttribute,
        asClick: !!asClick
    });
}
;
function suppressMouse(evt) {
    // HACK: Viramate UI still wants to handle middle/right clicks
    if (evt.target === getOverlayContainer())
        return;
    if (evt.which !== 1)
        suppressEvent(evt);
}
function suppressEvent(evt) {
    // If the event is synthesized we don't want to mess with it
    if (!evt.isTrusted)
        return;
    evt.stopImmediatePropagation();
}
;
function shouldHandleTouchInput() {
    return currentSettings.touchInputSupport || isMobileSite();
}
;
var performanceHistory = [];
var needToShowPerformanceHud = true;
var hideHudTimeoutHandle = null;
var lastPerformanceHudUpdateWhen = null;
var performanceHudElement = null;
function updatePerformanceHud(frameStats) {
    if (!currentSettings.showPerformanceHud) {
        performanceHistory.length = 0;
        return;
    }
    var now = performance.now();
    performanceHistory.push(frameStats);
    if (performanceHistory.length > 75)
        performanceHistory.shift();
    // Wait for a few samples before showing the hud
    if (performanceHistory.length < 6)
        return;
    if ((lastPerformanceHudUpdateWhen !== null) &&
        (now - lastPerformanceHudUpdateWhen) <= 500)
        return;
    lastPerformanceHudUpdateWhen = now;
    var uic = getUiContainer();
    if (!performanceHudElement) {
        performanceHudElement = document.createElement("div");
        performanceHudElement.className = "performance-hud";
        injectElement(uic, performanceHudElement);
    }
    else if (needToShowPerformanceHud) {
        performanceHudElement.style.opacity = 1.0;
        needToShowPerformanceHud = false;
    }
    var minDelay = 999999, maxDelay = 0, delaySum = 0;
    for (var i = 0, l = performanceHistory.length; i < l; i++) {
        var fs = performanceHistory[i];
        minDelay = Math.min(minDelay, fs.realTimeSinceLastFrame);
        maxDelay = Math.max(maxDelay, fs.realTimeSinceLastFrame);
        delaySum += fs.realTimeSinceLastFrame;
    }
    var avgDelay = delaySum / performanceHistory.length;
    var estimatedFps = 1000 / avgDelay;
    performanceHudElement.textContent = estimatedFps.toFixed(0) + "fps " +
        "[" + minDelay.toFixed(1) + ", " + maxDelay.toFixed(1) + "] ms";
    if (hideHudTimeoutHandle)
        clearTimeout(hideHudTimeoutHandle);
    hideHudTimeoutHandle = setTimeout(hidePerformanceHud, 3000);
}
;
function hidePerformanceHud() {
    if (!performanceHudElement)
        return;
    performanceHistory.length = 0;
    performanceHudElement.style.opacity = 0.0;
    needToShowPerformanceHud = true;
}
;
function doNavigate(url) {
    sendExternalMessage({ type: "navigating", url: url });
    window.location.href = url;
}
;
var hideTransientMessageTimeoutHandle = null;
var transientMessageElement = null;
function showTransientMessage(text) {
    if (!currentSettings.showTransientMessages)
        return;
    var now = performance.now();
    var uic = getUiContainer();
    if (!transientMessageElement) {
        transientMessageElement = document.createElement("div");
        transientMessageElement.className = "transient-message";
        transientMessageElement.style.opacity = 0.0;
        transientMessageElement.style.top = isHorizontalLayout() ? "50px" : "2px";
        injectElement(uic, transientMessageElement);
        setTimeout(function () {
            transientMessageElement.style.opacity = 1.0;
        }, 5);
    }
    else {
        transientMessageElement.style.opacity = 1.0;
    }
    transientMessageElement.textContent = text;
    if (hideTransientMessageTimeoutHandle)
        clearTimeout(hideTransientMessageTimeoutHandle);
    hideTransientMessageTimeoutHandle = setTimeout(hideTransientMessage, 4000 + (text.length * 100));
}
;
function hideTransientMessage() {
    if (!transientMessageElement)
        return;
    transientMessageElement.style.opacity = 0.0;
}

doInitialize();
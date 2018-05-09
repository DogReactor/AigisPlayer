"use strict";
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
})();
//# sourceMappingURL=hibino.js.map
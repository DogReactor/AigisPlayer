// @ts-check
'use strict';

const http = require('http');
const request = require('request');
const express = require('express');
const Agent = require('socks5-http-client/lib/Agent');
const fs = require('fs');
const zlib = require('zlib');
const parseAL = require('./AL.js');
let FileList = {};
let ProxyHost = "127.0.0.1"
let ProxyPort = 1080;
let ProxyEnable = false;
let ProxyIsSocks5 = false;
let TranslateFileList = {
    'StatusText.atb': "StatusText.txt",
    'MainFont.aft': "MainFont.aft",
    'AbilityList.atb': "AbilityList.txt",
    'AbilityText.atb': "AbilityText.txt",
    'NameText.atb': "NameText.txt",
    'PlayerTitle.atb': "PlayerTitle.txt",
    'SkillList.atb': "SkillList.txt",
    'SkillText.atb': "SkillText.txt",
    'SystemText.atb': "SystemText.txt",
    "PlayerUnitTable.aar": "PlayerUnitTable",
    "BattleTalkEvent800001.aar": "BattleTalkEvent800001"
};

/**
 * 
 * @param {Buffer} buffer 
 * @param {Number} offset 
 */
function parse(buffer) {
    let result = parseAL(buffer,0);
    return result;
}


function mkdir(dirArray, max) {
    if (max === undefined) max = dirArray.length;
    let nowDir = ".";
    for (let i = 0; i < max; i++) {
        nowDir += "/" + dirArray[i];
        if (!fs.existsSync(nowDir)) {
            fs.mkdirSync(nowDir);
        }
    }
}

module.exports = {
    createServer: function () {
        let app = express();
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            next();
        })
        app.use(function (req, res) {
            let headers = req.headers;
            headers.host = "assets.millennium-war.net";
            //设置代理
            let options = {
                url: 'http://assets.millennium-war.net' + req.path,
                headers: headers,
                encoding: null
            };
            if (ProxyEnable === true && ProxyIsSocks5 === true) {
                options.agentClass = Agent;
                options.agentOptions = {
                    socksHost: ProxyHost,
                    socksPort: ProxyPort
                }
            }
            if (ProxyEnable === true && ProxyIsSocks5 === false) {
                options.proxy = `http://${ProxyHost}:${ProxyPort}`
            }
            //console.log(options);
            let fullPathList = ("cache" + req.path).split('/');
            let requestFileName = FileList[req.path];
            if (req.path.indexOf("18cbbe1a57873ab0047629f77cbbcf86") !== -1) {
                requestFileName = "MainFont.aft";
            }
            let translateFileName = TranslateFileList[requestFileName]
            //文件热封装
            let translateFilePath = "translate/" + translateFileName;
            if (fs.existsSync(translateFilePath)) {
                console.log(requestFileName, "modify by Server");
                //Font文件直接回传
                if (requestFileName === "MainFont.aft") {
                    res.send(fs.readFileSync(translateFilePath))
                    return;
                }
                let result;
                //检查是否有该文件

                if (!fs.existsSync("cache" + req.path)) {
                    mkdir(fullPathList, fullPathList.length - 1);
                    options.gzip = true;
                    request(options, (err, response, body) => {
                        result = parse(body);
                        //res.send(result.Package(translateFilePath));
                        fs.writeFileSync("cache/" + requestFileName, body);
                        res.send(body);
                    })
                    //.pipe(fs.createWriteStream("cache" + req.path));
                }
                else {
                    let rawBuffer = fs.readFileSync("cache" + req.path);
                    result = parse(rawBuffer);
                    res.send(result.Package(translateFilePath));
                }
            }
            else {
                request(options, (err, res, body) => {
                    if (body === undefined) console.log("Error on " + req.path);
                    //console.log(req.path,res.headers['content-encoding'],res.headers['content-length'],body.length);
                }).pipe(res);
            }
        });
        var server = http.createServer(app);
        server.on('error', (e) => {
            console.log(e);
        });
        server.listen('19980', function () {
            console.log('listen at 19980');
        });
    },
    setFileList: function (fileList) {
        FileList = fileList;
    },
    setProxy: function (enable, isSocks5, host, port) {
        ProxyEnable = enable;
        ProxyIsSocks5 = isSocks5;
        if (enable) {
            ProxyHost = host;
            ProxyPort = port;
        }
    }
}
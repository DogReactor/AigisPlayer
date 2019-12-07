"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
var electron_1 = require("electron");
var url = require("url");
var path = require("path");
var fs = require("fs");
var Config = require("electron-config");
var log = require("electron-log");
var aigis_fuel_1 = require("aigis-fuel");
var config = new Config();
var Rule = /** @class */ (function () {
    function Rule(options, callback) {
        this.Url = options.url;
        this.Method = options.method || 'ALL';
        this.Request = options.request || false;
        this.Callback = callback;
    }
    Rule.prototype.match = function (url, method) {
        function checkUrl(value) {
            if (url.indexOf(value) !== -1) {
                return true;
            }
            else {
                return false;
            }
        }
        if (this.Url.find(checkUrl) && (this.Method === 'ALL' || this.Method === method)) {
            return true;
        }
        return null;
    };
    return Rule;
}());
exports.Rule = Rule;
var subscription = [];
var FileList = {};
var mainFontPath = config.get('fontPath');
var browserWindow;
var RequestHandler = /** @class */ (function () {
    function RequestHandler() {
    }
    RequestHandler.setFileList = function (fileList) {
        FileList = fileList;
    };
    RequestHandler.setFontPath = function (path) {
        mainFontPath = path;
    };
    RequestHandler.Clear = function () {
        subscription = [];
    };
    RequestHandler.setWin = function (win) {
        browserWindow = win;
    };
    RequestHandler.Subscribe = function (options, callback) {
        subscription.push(new Rule(options, callback));
    };
    RequestHandler.handleData = function (req, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var requestSession, rule, readable, gameSession, cookies, ModifyFilePath, modifyFileName, reqPath, requestFileName, protoablePath, userDataPath, modPath, modifyFilePath, fileStream, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestSession = electron_1.session.fromPartition('persist:request');
                        if (browserWindow) {
                            browserWindow.webContents.send('request-incoming');
                        }
                        rule = subscription.find(function (value) { return value.match(req.url, req.method); });
                        readable = new stream.PassThrough();
                        gameSession = electron_1.session.fromPartition('persist:game');
                        return [4 /*yield*/, gameSession.cookies.get({
                                url: req.url
                            })];
                    case 1:
                        cookies = _a.sent();
                        cookies.forEach(function (cookie) {
                            requestSession.cookies.set(__assign({ url: req.url }, cookie));
                        });
                        ModifyFilePath = '';
                        if (req.url.indexOf('://assets.millennium-war.net/') !== -1) {
                            modifyFileName = '';
                            reqPath = url.parse(req.url).path;
                            requestFileName = FileList[reqPath];
                            if (reqPath.indexOf(mainFontPath) !== -1) {
                                requestFileName = 'MainFont.aft';
                            }
                            if (requestFileName) {
                                switch (path.extname(requestFileName)) {
                                    case '.atb':
                                        modifyFileName = requestFileName.replace('.atb', '.txt');
                                        break;
                                    case '.aar':
                                        modifyFileName = requestFileName.replace('.aar', '');
                                        break;
                                    default:
                                        modifyFileName = requestFileName;
                                }
                            }
                            protoablePath = process.env.PORTABLE_EXECUTABLE_DIR;
                            userDataPath = electron_1.app.getPath('userData');
                            modPath = protoablePath ? protoablePath + '/mods' : path.join(userDataPath, 'mods');
                            if (!fs.existsSync(modPath)) {
                                fs.mkdirSync(modPath);
                            }
                            modifyFilePath = path.join(modPath, modifyFileName);
                            if (modifyFileName !== '' && fs.existsSync(modifyFilePath)) {
                                log.info(requestFileName, 'modify by Server');
                                // AFT和PNG文件直接回传
                                if (modifyFileName === 'MainFont.aft' || path.extname(modifyFileName) === 'png') {
                                    fileStream = fs.createReadStream(modifyFilePath);
                                    cb({
                                        statusCode: 200,
                                        data: readable
                                    });
                                    fileStream.on('data', function (chunk) {
                                        readable.push(chunk);
                                    });
                                    fileStream.on('end', function () {
                                        readable.pause();
                                        readable.push(null);
                                        readable.resume();
                                        if (browserWindow) {
                                            browserWindow.webContents.send('response-incoming');
                                        }
                                    });
                                    return [2 /*return*/];
                                }
                                // 其他文件
                                ModifyFilePath = modifyFilePath;
                            }
                        }
                        request = electron_1.net.request({
                            method: req.method,
                            url: req.url,
                            session: requestSession,
                            redirect: 'manual'
                        });
                        // 允许分片
                        // request.chunkedEncoding = true;
                        // 写Header
                        if (req.referrer) {
                            request.setHeader('Referer', req.referrer);
                        }
                        Object.keys(req.headers).forEach(function (key) {
                            request.setHeader(key, req.headers[key]);
                        });
                        // 上传数据
                        if (req.uploadData) {
                            req.uploadData.forEach(function (v) {
                                if (v.bytes) {
                                    request.write(v.bytes);
                                }
                            });
                        }
                        // 处理301 302
                        request.on('redirect', function (statusCode, method, redirectUrl, responseHeaders) {
                            if (responseHeaders['content-type'] && responseHeaders['content-type'][0].indexOf('text/html') !== -1) {
                                cb({
                                    statusCode: 200,
                                    headers: responseHeaders,
                                    data: readable
                                });
                                readable.push("\n            <html>\n              <head>\n                <meta http-equiv=\"refresh\" content=\"0; url=" + redirectUrl + "\">\n              </head>\n            </html>\n            ");
                                readable.push(null);
                                if (browserWindow) {
                                    browserWindow.webContents.send('response-incoming');
                                }
                            }
                            else {
                                cb({
                                    statusCode: statusCode,
                                    headers: responseHeaders
                                });
                            }
                            // request.abort();
                        });
                        // 处理回复
                        request.on('response', function (response) {
                            var raws = [];
                            var length = 0;
                            var time = 10;
                            var timeout = setTimeout(function () {
                                time--;
                                if (time === 0) {
                                    console.log(req.url, 'Time out');
                                }
                            }, 1000);
                            cb({
                                statusCode: response.statusCode,
                                headers: response.headers,
                                data: readable
                            });
                            response.on('data', function (chunk) {
                                time = 10;
                                if (!ModifyFilePath) {
                                    readable.push(chunk);
                                }
                                if (rule || ModifyFilePath) {
                                    raws.push(chunk);
                                }
                                length += chunk.byteLength;
                            });
                            response.on('end', function () {
                                clearTimeout(timeout);
                                var raw = raws.length !== 0 ? Buffer.concat(raws) : null;
                                if (!ModifyFilePath) {
                                    // 直接回传
                                    readable.pause();
                                    readable.push(null);
                                    readable.resume();
                                    if (browserWindow) {
                                        browserWindow.webContents.send('response-incoming');
                                    }
                                }
                                else {
                                    // 魔改文件热封装
                                    var result = aigis_fuel_1.parseAL(raw);
                                    var packaged = result.Package(ModifyFilePath);
                                    readable.push(packaged);
                                    readable.pause();
                                    readable.push(null);
                                    readable.resume();
                                    if (browserWindow) {
                                        browserWindow.webContents.send('response-incoming');
                                    }
                                }
                                if (rule) {
                                    var _res = raw || Buffer.concat(raws);
                                    var _req = req.uploadData ? req.uploadData[0].bytes : null;
                                    rule.Callback(req.url, _res, _req);
                                }
                            });
                            response.on('error', function (err) {
                                clearTimeout(timeout);
                                readable.push(null);
                                if (browserWindow) {
                                    browserWindow.webContents.send('error-incoming', req.url, err);
                                }
                                log.error(req.url, err, response.statusCode);
                            });
                        });
                        // 处理错误
                        request.on('error', function (err) {
                            log.error(req.url, err);
                            if (browserWindow) {
                                browserWindow.webContents.send('error-incoming', req.url, err);
                            }
                        });
                        request.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RequestHandler;
}());
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=requestHandler.js.map
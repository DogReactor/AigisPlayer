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
};
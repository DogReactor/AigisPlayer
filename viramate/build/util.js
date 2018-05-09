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
            log("Please upgrade Chrome 🤢");
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
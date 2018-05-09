var isAPILoaded = false;
var isAPIDisabled = false;
var queuedRequests = [];

function onLoad() {
    console.log("Getting settings from extension");
    chrome.runtime.sendMessage({type: "getSettings"}, function (settings) {
        if (!settings) {
            settings = {};
            console.log("Failed to get settings from extension");
        } else {
            currentSettings = settings;
        }

        if (settings.webAPI && !settings.isShutdown) {
            console.log("API loaded");
            isAPILoaded = false;

            for (var i = 0, l = queuedRequests.length; i < l; i++)
                onMessage(queuedRequests[i]);
        } else {
            console.log("API disabled");
            isAPILoaded = true;
            isAPIDisabled = true;
        }
    });

    if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
};

function onMessage (evt) {
    var msg = evt.data;
    if (!msg)
        return;
    
    var id = msg.id;
    var sender = evt.source;

    if (!isAPILoaded)
        queuedRequests.push(evt);

    if (
        (evt.origin.indexOf("granbluefantasy.jp") >= 0) ||
        (evt.origin.indexOf("mbga.jp") >= 0)
    ) {
        console.log("Rejected message origin", evt.origin);
        return;
    }

    if (isAPIDisabled) {
        if (evt.data.id)
            sender.postMessage({
                type: "result",
                id: id,
                result: {error: "api disabled"}
            }, "*");

        return;
    }

    if (!msg) {
        console.log("Malformed message received");
        return;
    }

    // HACK: Suppress infinite loop
    if (msg.type === "result")
        return;

    console.log("Sending API request", msg);
    chrome.runtime.sendMessage({
        type: "apiRequest",
        request: msg
    }, function (result) {
        console.log("API request complete", result);

        if (id)
            sender.postMessage({
                type: "result",
                id: id,
                result: result
            }, "*");
    });
};

window.addEventListener("DOMContentLoaded", onLoad, false);
window.addEventListener("message", onMessage, false);
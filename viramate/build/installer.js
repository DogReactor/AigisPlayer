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
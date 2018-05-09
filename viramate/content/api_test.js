var apiUrl = "api.html";

// Use this url when connecting to the API from a website.
// var apiUrl = "chrome-extension://fgpokpknehglcioijejfeebigdnbnokj/content/api.html";

var isApiLoaded = false;
var apiHost = null;
var pendingRequests = {};
var nextRequestId = 1;

function onLoad () {
    window.addEventListener("message", onMessage, false);
    tryLoadApi();
    window.setInterval(tryRefreshCombatState, 1000);

    document.querySelector("button#join_raid").addEventListener("click", tryJoinRaid, false); 
};

function tryLoadApi () {
    console.log("Loading API");
    apiHost = document.querySelector("iframe#api_host");

    apiHost.addEventListener("load", onApiLoaded, false);
    apiHost.src = apiUrl;
};

function onApiLoaded () {
    document.querySelector("span#api_status").textContent = "Connected";
    console.log("API loaded");
    isApiLoaded = true;
};

function onMessage (evt) {
    if (evt.data.type !== "result")
        return;

    if (evt.data.result && evt.data.result.error) {
        console.log("Request failed", evt.data.result.error);
        document.querySelector("span#api_status").textContent = evt.data.result.error;
        return;
    } else {
        console.log("Got request response", evt.data);
        document.querySelector("span#api_status").textContent = "Connected";
    }

    var callback = pendingRequests[evt.data.id];
    if (!callback)
        return;

    callback(evt.data.result);
};

function sendApiRequest (request, callback) {
    if (!isApiLoaded) {
        console.log("API not loaded");
        callback({error: "api not loaded"});
        return;
    }

    console.log("Sending request", request);
    var id = nextRequestId++;
    request.id = id;
    pendingRequests[id] = callback;

    apiHost.contentWindow.postMessage(
        request, "*"
    );
};

function tryRefreshCombatState () {
    sendApiRequest({type: "getCombatState"}, function (combatState) {
        var raidCodeSpan = document.querySelector("span#current_raid_code");
        if (combatState) {
            raidCodeSpan.textContent = combatState.raidCode;
        } else {
            raidCodeSpan.textContent = "?";
        }
    });
};

function tryJoinRaid (evt) {
    var code = document.querySelector("input#raid_code_to_join").value;
    sendApiRequest({type: "tryJoinRaid", raidCode: code}, function (result) {
        alert("Join result: " + result);
    });
};

window.addEventListener("DOMContentLoaded", onLoad, false);
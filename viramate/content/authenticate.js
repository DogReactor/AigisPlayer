addEventListener("load", onLoad, false);

var confirmation, ui, password, textField, hashDisplay;

var successfulPasswords = [];

function onLoad () {
    _loadShaScript(window);

    confirmation = document.querySelector("#confirmation");
    ui = document.querySelector("#ui");
    password = document.querySelector("#password");
    textField = password.querySelector("#enteredText");
    hashDisplay = password.querySelector("#hash");

    textField.addEventListener("blur", function (e) {
        if (password.style.pointerEvents === "auto") {
            e.preventDefault();
            textField.focus();
        }
    }, true);

    textField.addEventListener("input", refreshPassword, false);

    confirmation.style.transform = "scale(1, 1)";
    confirmation.style.opacity = 1.0;
    confirmation.style.pointerEvents = "auto";

    confirmation.querySelector("#yes").addEventListener("click", showPasswordEntry, false);
    confirmation.querySelector("#no").addEventListener("click", shutdown, false);
}

function showPasswordEntry () {
    confirmation.style.transform = "scale(0, 1)";
    confirmation.style.opacity = 0.0;
    confirmation.style.pointerEvents = "none";

    refreshPassword();

    window.setTimeout(function () {
        password.style.opacity = 1.0;
        password.style.pointerEvents = "auto";
        textField.focus();
    }, 250);
};

function shutdown () {
    confirmation.style.transform = password.style.transform = "scale(0, 1)";
    confirmation.style.opacity = password.style.opacity = 0.0;

    ui.style.transform = "scale(0.02, 1)";
    ui.style.opacity = 0.4;

    chrome.runtime.sendMessage(
        {type: "setPassword", password: ""}
    );

    window.setTimeout(function () {
        ui.style.transform = "scale(0.0, 0.0)";
        ui.style.opacity = 0.0;
    }, 300);

    window.setTimeout(function () {
        window.close();
    }, 1250);
};

function refreshPassword () {
    var password = textField.textContent;

    var hash = getAuthenticationHash(password);
    hashDisplay.textContent = hash.substr(0, 40);

    chrome.runtime.sendMessage(
        {type: "setPassword", password: password}
    );

    if (isValidPassword(password)) {
        if (successfulPasswords.indexOf(password) < 0) {
            successfulPasswords.push(password);
            recordAuthentication(password, hash);
        }

        hashDisplay.className = "valid";
    } else {
        hashDisplay.className = "invalid";
    }
};

function recordAuthentication (password, hash) {
};
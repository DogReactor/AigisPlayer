const crypto = require('crypto');
class PluginHelper {
    constructor() {
        this.ipcRenderer = require('electron').ipcRenderer;
    }
    onMessage(callback) {
        const channel = `${this.plugin.id}`;
        this.ipcRenderer.on(channel, (event, msg) => {
            console.log("Get Message From Background", msg);
            const salt = msg.salt;
            const message = msg.message;
            const result = callback(message);
            const channel = `${this.plugin.id}-${salt}`;
            this.ipcRenderer.send(channel, result);
        });
    }
    sendMessage(message, callback) {
        const sendChannel = `${this.plugin.id}`;
        const salt = crypto.createHash("md5").update(Math.random().toString()).digest("hex");
        const obj = {
            salt: salt,
            message: message
        }

        const replyChannel = `${this.plugin.id}-${salt}`;
        if (callback) {
            this.ipcRenderer.once(replyChannel, (event, message) => {
                console.log("Get Response from Background", message);
                callback(message);
            });
        }

        this.ipcRenderer.send(sendChannel, obj);
    }
    sendMessageSync(message) {
        const channel = `${this.plugin.id}-sync`
        return this.ipcRenderer.sendSync(channel, message);
    }
}

global['PluginHelper'] = PluginHelper;
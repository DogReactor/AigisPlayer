"use strict";
function PromiseResolver() {
    var self = this;
    this.startedWhen = null;
    this.resolve = null;
    this.reject = null;
    this.promise = new Promise(function (resolve, reject) {
        self.resolve = resolve;
        self.reject = reject;
    });
}
;
//# sourceMappingURL=promises.js.map
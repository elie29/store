Object.defineProperty(exports, "__esModule", { value: true });
var clone_1 = require("./clone");
exports.DEFAULT_SETTINGS = {
    logChanges: false,
    cloneStrategy: function (value) { return clone_1.clone(value); }
};
//# sourceMappingURL=settings.js.map
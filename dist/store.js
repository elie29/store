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
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var settings_1 = require("./settings");
var Store = (function () {
    function Store(defaultState, settings) {
        if (settings === void 0) { settings = {}; }
        this.defaultState = defaultState;
        this.store$ = new rxjs_1.BehaviorSubject(this.defaultState);
        this.settings = __assign(__assign({}, settings_1.DEFAULT_SETTINGS), settings);
        this.log('DEFAULT_STATE');
    }
    Object.defineProperty(Store.prototype, "value", {
        get: function () {
            return this.settings.cloneStrategy(this.store$.value);
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.select = function (key) {
        var _this = this;
        return this.store$.pipe(operators_1.pluck(key), operators_1.distinctUntilChanged(), operators_1.map(function (item) { return _this.settings.cloneStrategy(item); }));
    };
    Store.prototype.watch = function () {
        var _this = this;
        return this.store$
            .asObservable()
            .pipe(operators_1.map(function (next) { return _this.settings.cloneStrategy(next); }));
    };
    Store.prototype.get = function (key) {
        return this.settings.cloneStrategy(this.value[key]);
    };
    Store.prototype.set = function (key, value) {
        var _a;
        this.store$.next(__assign(__assign({}, this.value), (_a = {}, _a[key] = this.settings.cloneStrategy(value), _a)));
        this.log(key);
    };
    Store.prototype.patch = function (state) {
        var slice = this.settings.cloneStrategy(state);
        this.store$.next(__assign(__assign({}, this.store$.value), slice));
        this.log('PATCH_STATE');
    };
    Store.prototype.reset = function () {
        this.store$.next(__assign({}, this.defaultState));
        this.log('DEFAULT_STATE');
    };
    Store.prototype.log = function (key) {
        if (this.settings.logChanges) {
            console.log('Key =>', key, ',', 'Value => ', this.value);
        }
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.js.map
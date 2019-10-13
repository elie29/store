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
var lodash_1 = require("lodash");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Store = (function () {
    function Store(defaultState, logChanges) {
        if (logChanges === void 0) { logChanges = false; }
        this.defaultState = defaultState;
        this.logChanges = logChanges;
        this.store$ = new rxjs_1.BehaviorSubject(this.defaultState);
        this.log('DEFAULT_STATE');
    }
    Object.defineProperty(Store.prototype, "value", {
        get: function () {
            return lodash_1.cloneDeep(this.store$.value);
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.select = function (key) {
        return this.store$.pipe(operators_1.pluck(key), operators_1.distinctUntilChanged(), operators_1.map(function (item) { return lodash_1.cloneDeep(item); }));
    };
    Store.prototype.watch = function () {
        return this.store$.asObservable();
    };
    Store.prototype.get = function (key) {
        return lodash_1.cloneDeep(this.value[key]);
    };
    Store.prototype.set = function (key, value) {
        var _a;
        this.store$.next(__assign(__assign({}, this.value), (_a = {}, _a[key] = lodash_1.cloneDeep(value), _a)));
        this.log(key);
    };
    Store.prototype.patch = function (state) {
        var slice = lodash_1.cloneDeep(state);
        this.store$.next(__assign(__assign({}, this.store$.value), slice));
        this.log('PATCH_STATE');
    };
    Store.prototype.reset = function () {
        this.store$.next(__assign({}, this.defaultState));
        this.log('DEFAULT_STATE');
    };
    Store.prototype.log = function (key) {
        if (this.logChanges) {
            console.log('Key =>', key, ',', 'Value => ', this.value);
        }
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=store.js.map
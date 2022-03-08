import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { DEFAULT_SETTINGS } from './settings';
export class Store {
    constructor(defaultState, settings = {}) {
        this.defaultState = defaultState;
        this.store$ = new BehaviorSubject(this.defaultState);
        this.settings = Object.assign(Object.assign({}, DEFAULT_SETTINGS), settings);
        this.log('DEFAULT_STATE');
    }
    get value() {
        return this.settings.cloneStrategy(this.store$.value);
    }
    select(key) {
        return this.store$.pipe(pluck(key), distinctUntilChanged(), map((item) => this.settings.cloneStrategy(item)));
    }
    watch() {
        return this.store$.pipe(map((next) => this.settings.cloneStrategy(next)));
    }
    get(key) {
        return this.settings.cloneStrategy(this.value[key]);
    }
    set(key, value) {
        this.store$.next(Object.assign(Object.assign({}, this.store$.value), { [key]: this.settings.cloneStrategy(value) }));
        this.log(key);
    }
    patch(state) {
        const slice = this.settings.cloneStrategy(state);
        this.store$.next(Object.assign(Object.assign({}, this.store$.value), slice));
        this.log('PATCH_STATE');
    }
    reset() {
        this.store$.next(Object.assign({}, this.defaultState));
        this.log('DEFAULT_STATE');
    }
    log(key) {
        if (this.settings.logChanges) {
            console.log('Key =>', key, ',', 'Value => ', this.value);
        }
    }
}
//# sourceMappingURL=store.js.map
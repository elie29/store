import { BehaviorSubject, Observable } from 'rxjs';
import { State, StoreSettings } from './settings';
export declare abstract class Store<S extends State> {
    protected defaultState: S;
    protected store$: BehaviorSubject<S>;
    protected settings: StoreSettings;
    constructor(defaultState: S, settings?: Partial<StoreSettings>);
    get value(): S;
    select<K extends keyof S>(key: K): Observable<S[K]>;
    watch(): Observable<S>;
    get<K extends keyof S>(key: K): S[K];
    set<K extends keyof S>(key: K, value: S[K]): void;
    patch(state: Partial<S>): void;
    reset(): void;
    protected log(key: keyof S | 'DEFAULT_STATE' | 'PATCH_STATE'): void;
}

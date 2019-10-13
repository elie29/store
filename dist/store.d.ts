import { BehaviorSubject, Observable } from 'rxjs';
export interface State {
}
export declare abstract class Store<S extends State> {
    protected defaultState: S;
    protected logChanges: boolean;
    protected store$: BehaviorSubject<S>;
    constructor(defaultState: S, logChanges?: boolean);
    readonly value: S;
    select<K extends keyof S>(key: K): Observable<S[K]>;
    watch(): Observable<S>;
    get<K extends keyof S>(key: K): S[K];
    set<K extends keyof S>(key: K, value: S[K]): void;
    patch(state: Partial<S>): void;
    reset(): void;
    protected log(key: keyof S | 'DEFAULT_STATE' | 'PATCH_STATE'): void;
}

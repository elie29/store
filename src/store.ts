import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

import { DEFAULT_SETTINGS, State, StoreSettings } from './settings';

export abstract class Store<S extends State> {
  protected store$ = new BehaviorSubject<S>(this.defaultState);
  protected settings: StoreSettings;

  constructor(
    protected defaultState: S,
    settings: Partial<StoreSettings> = {}
  ) {
    this.settings = { ...DEFAULT_SETTINGS, ...settings };
    // log store initialization
    this.log('DEFAULT_STATE');
  }

  /**
   * Get the current state
   */
  get value(): S {
    return this.settings.cloneStrategy(this.store$.value);
  }

  /**
   * Watch for a value change of a specific key in the store.
   * @param key specific key from the store. It must be defined in the application state.
   */
  select<K extends keyof S>(key: K): Observable<S[K]> {
    return this.store$.pipe(
      pluck(key),
      distinctUntilChanged<S[K]>(),
      map(item => this.settings.cloneStrategy(item))
    );
  }

  /**
   * Watch store changes.
   */
  watch(): Observable<S> {
    return this.store$
      .asObservable()
      .pipe(map(next => this.settings.cloneStrategy(next)));
  }

  /**
   * Get a value from the current state.
   *
   * @param key A defined key in the application state.
   */
  get<K extends keyof S>(key: K): S[K] {
    return this.settings.cloneStrategy(this.value[key]);
  }

  /**
   * Set a value in the store for a specific key defined in the application state.
   */
  set<K extends keyof S>(key: K, value: S[K]): void {
    // Shallow copy of the state to modify specific key
    this.store$.next({
      ...this.value,
      [key]: this.settings.cloneStrategy(value)
    });
    this.log(key);
  }

  /**
   * @param state State or slice of the state to patch.
   */
  patch(state: Partial<S>): void {
    const slice = this.settings.cloneStrategy(state);
    this.store$.next({ ...this.store$.value, ...slice });
    this.log('PATCH_STATE');
  }

  /**
   * Reset the store with the default state.
   */
  reset(): void {
    this.store$.next({ ...this.defaultState });
    this.log('DEFAULT_STATE');
  }

  protected log(key: keyof S | 'DEFAULT_STATE' | 'PATCH_STATE'): void {
    if (this.settings.logChanges) {
      console.log('Key =>', key, ',', 'Value => ', this.value);
    }
  }
}

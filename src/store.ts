import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

/**
 * A list of keys constituting the state of the application.
 */
export interface State {}

/**
 * Immutable abstract store : states are set or get by using cloneDeep. Changing data outside the store
 * does not affect the store
 */
export abstract class Store<S extends State> {
  protected store$ = new BehaviorSubject<S>(this.defaultState);

  constructor(protected defaultState: S, protected logChanges = false) {
    // log store initialization
    this.log('DEFAULT_STATE');
  }

  /**
   * Get the current state deep-cloned !
   */
  get value(): S {
    return cloneDeep(this.store$.value);
  }

  /**
   * Watch for a value change of a specific key in the store.
   * @param key specific key from the store. It must be defined in the application state.
   */
  select<K extends keyof S>(key: K): Observable<S[K]> {
    return this.store$.pipe(
      pluck(key),
      distinctUntilChanged<S[K]>(),
      map(item => cloneDeep(item))
    );
  }

  /**
   * Get a value from the current state.
   *
   * @param key A defined key in the application state.
   * @param deepClone if true, the value is deep-cloned
   */
  get<K extends keyof S>(key: K): S[K] {
    return cloneDeep(this.value[key]);
  }

  /**
   * Set a value in the store for a specific key defined in the application state.
   */
  set<K extends keyof S>(key: K, value: S[K]): void {
    // Immutable state change: shallow copy of the state and values
    this.store$.next({ ...this.value, [key]: cloneDeep(value) });
    this.log(key);
  }

  patch(state: Partial<S>): void {
    const slice = cloneDeep(state);
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
    if (this.logChanges) {
      console.log('Key =>', key, ',', 'Value => ', this.value);
    }
  }
}

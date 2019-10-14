/**
 * A list of keys constituting the state of the application.
 */
export interface State {}

export interface StoreSettings {
  logChanges: boolean;
  cloneStrategy: <T>(value: T) => T;
}

// Shallow clone by default
export const DEFAULT_SETTINGS: StoreSettings = {
  logChanges: false,
  cloneStrategy: <T>(value: T): T => ({ ...value })
};

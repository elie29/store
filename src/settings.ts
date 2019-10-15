import { clone } from './clone';

/**
 * A list of keys constituting the state (data model) of the application, module ot service.
 */
export interface State {}

export interface StoreSettings {
  logChanges: boolean;
  cloneStrategy: <T>(value: T) => T;
}

// Shallow clone by default
export const DEFAULT_SETTINGS: StoreSettings = {
  logChanges: false,
  cloneStrategy: <T>(value: T): T => clone(value)
};

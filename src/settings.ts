import { cloneDeep } from 'lodash';

/**
 * A list of keys constituting the state of the application.
 */
export interface State {}

export interface StoreSettings {
  logChanges: boolean;
  cloneStrategy: <T>(value: T) => T;
}

export const DEFAULT_SETTINGS: StoreSettings = {
  logChanges: false,
  cloneStrategy: cloneDeep
};

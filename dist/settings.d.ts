export interface State {
}
export interface StoreSettings {
    logChanges: boolean;
    cloneStrategy: <T>(value: T) => T;
}
export declare const DEFAULT_SETTINGS: StoreSettings;

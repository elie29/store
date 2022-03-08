import { clone } from './clone';
export const DEFAULT_SETTINGS = {
    logChanges: false,
    cloneStrategy: (value) => clone(value)
};
//# sourceMappingURL=settings.js.map
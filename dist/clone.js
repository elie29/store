export const clone = value => {
    if (!value || typeof value !== 'object') {
        return value;
    }
    return Array.isArray(value) ? [...value] : Object.assign({}, value);
};
//# sourceMappingURL=clone.js.map
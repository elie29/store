// Shallow clone, lodash cloneDeep is highly recommended
export const clone = value => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  return Array.isArray(value) ? [...value] : { ...value };
};

// Shallow clone, lodash cloneDeep is highly recommended
export const clone = <T>(value: T): T => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  return (Array.isArray(value) ? [...value] : { ...value }) as T;
};

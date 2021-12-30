import type { IDictionary } from '@/interfaces/UtilityInterface';

export interface DiffResultType<T> {
  key: string | undefined;
  before: T;
  after: T;
}

export const ERROR_KEYS_OF_TARGETS_DIFFERENT = Error('keys of {before} and {after} are different');

export const diffAny = <T>(before: T, after: T, key?: string): DiffResultType<any>[] => {
  // #region type checking utils
  const isFalsyType = (x: any) => typeof x === 'undefined' || x === null || x === undefined;
  const isObjectType = (x: any) => typeof x === 'object' && !Array.isArray(x);
  const isArrayType = (x: any) => Array.isArray(x);
  const isStringType = (x: any) => typeof x === 'string';
  const isNumberType = (x: any) => typeof x === 'number';
  const isBooleanType = (x: any) => typeof x === 'boolean';
  // #endregion

  const diffResults: DiffResultType<any>[] = [];

  const isSameValue = <P>(x: P, y: P) => x === y;
  const handler = <P>(beforeValue: P, afterValue: P) => {
    if (!isSameValue(beforeValue, afterValue)) {
      diffResults.push({ key, before: beforeValue, after: afterValue });
    }
  };

  if (isFalsyType(before) || isFalsyType(after)) {
    // {before} or {after} is falsy, or both are falsy
    if (isSameValue(before, after)) {
      // skip 'both are falsy'
    } else {
      diffResults.push({ key, before, after });
    }
  } else if (isObjectType(before) && isObjectType(after)) {
    const beforeKeys = Object.keys(before);
    const afterKeys = Object.keys(after);

    // expecting structure of {before} and {after} are the same
    if (
      beforeKeys.length === afterKeys.length &&
      beforeKeys.every((beforeKey) => afterKeys.includes(beforeKey))
    ) {
      // #region convert to a type that could be used with obj[key]
      const beforeObject = <IDictionary>before;
      const afterObject = <IDictionary>after;
      // #endregion

      // recursively calling diffAny for each property
      const results = beforeKeys
        .map((beforeKey) =>
          diffAny(
            beforeObject[beforeKey],
            afterObject[beforeKey],
            key ? `${key}.${beforeKey}` : beforeKey,
          ),
        )
        .flat();
      diffResults.push(...results);
    } else {
      throw ERROR_KEYS_OF_TARGETS_DIFFERENT;
    }
  } else if (isArrayType(before) && isArrayType(after)) {
    // #region convert to array
    const beforeArray = Array.isArray(before) ? <any[]>before : [];
    const afterArray = Array.isArray(after) ? <any[]>after : [];
    // #endregion

    if (beforeArray.length === afterArray.length) {
      // recursively calling diffAny for each item in arrays
      const results = beforeArray
        .map((beforeItem, index) => diffAny(beforeItem, afterArray[index], `${key}.${index}`))
        .flat();
      if (results.length > 0) {
        diffResults.push({ key, before: beforeArray, after: afterArray });
      }
    } else {
      // if array's length are different, consider as they are different arrays
      diffResults.push({ key, before, after });
    }
  } else if (
    (isStringType(before) && isStringType(after)) ||
    (isNumberType(before) && isNumberType(after)) ||
    (isBooleanType(before) && isBooleanType(after))
  ) {
    handler(before, after);
  }

  return diffResults;
};

import { IDictionary } from '@/interfaces/UtilityInterface';

/**
 * Check whether {value} includes in {enumMap}
 * @param enumMap An enum or a key value pair object
 * @param value  A value want to check
 * @returns `true` or `false`
 */
export const checkIsOneOfEnumMapItem = <T>(enumMap: T, value: any): boolean =>
  Object.keys(enumMap)
    .map((key) => (<IDictionary>enumMap)[key])
    .includes(value);

export default { checkIsOneOfEnumMapItem };

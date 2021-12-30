import { toRaw, isProxy } from 'vue';
import type { IDictionary } from '@/interfaces/UtilityInterface';

export const unwrapReactive = (data: any): any => {
  if ([undefined, null].includes(data)) {
    return data;
  }
  if (typeof data === 'object' && !Array.isArray(data)) {
    return Object.keys(data).reduce((prev, curr) => {
      // eslint-disable-next-line no-param-reassign
      prev[curr] = unwrapReactive(data[curr]);
      return prev;
    }, {} as IDictionary);
  }
  if (Array.isArray(data)) {
    return data.map((item) => unwrapReactive(item));
  }
  return isProxy(data) ? toRaw(data) : data;
};

export const log = (message: string, data?: any) => {
  if (import.meta.env.DEV) {
    const time = new Date().toLocaleTimeString('en-us');
    if (data !== undefined) {
      console.log(`[${time}]:${message}`, unwrapReactive(data));
    } else {
      console.log(`[${time}]:${message}`);
    }
  }
};

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Store } from 'vuex';
import type { RootState } from '@/store/declarations';
import type { DiffResultType } from '@/utils/differ';
import { IDictionary } from '@/interfaces/UtilityInterface';

export type SocketIOPluginOption = {
  uri: string;
  vuex: {
    store: Store<RootState>;
    namespace: string;
  };
  socketIOOptions: {
    path: string;
    forceNew: boolean;
    reconnectionAttempts: number;
    timeout: number;
    extraHeaders: IDictionary;
  };
};

export type Namespaced<T, N extends string> = {
  [P in keyof T & string as `updated:${N}`]: {
    target: T;
    diffResults: DiffResultType<T>[];
  };
};

export type NamespacedWithFields<T, N extends string> = {
  [P in keyof T & string as `updated:${N}.${P}`]: {
    target: T;
    diffResult: DiffResultType<T[P]>;
  };
};

export type EventType = {};

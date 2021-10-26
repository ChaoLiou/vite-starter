/* eslint-disable no-unused-vars */
import { ActionContext as VuexActionContext, CommitOptions, DispatchOptions } from 'vuex';
import {
  ModuleName as FeatureModule,
  Store as FeatureStore,
  State as FeatureState,
  NamespacedActions as FeatureActions,
  NamespacedMutations as FeatureMutations,
  NamespacedGetters as FeatureGetters,
} from '@/store/feature/declarations';
import {
  ModuleName as SampleModule,
  Store as SampleStore,
  State as SampleState,
  NamespacedActions as SampleActions,
  NamespacedMutations as SampleMutations,
  NamespacedGetters as SampleGetters,
} from '@/store/sample/declarations';
import {
  ModuleName as WsqueueModule,
  Store as WsqueueStore,
  State as WsqueueState,
  NamespacedActions as WsqueueActions,
  NamespacedMutations as WsqueueMutations,
  NamespacedGetters as WsqueueGetters,
} from '@/store/wsqueue/declarations';

export type RootState = {
  feature: FeatureState;
  sample: SampleState;
  wsqueue: WsqueueState;
};

export type RootMutations = FeatureMutations & SampleMutations & WsqueueMutations;
export type RootActions = FeatureActions & SampleActions & WsqueueActions;
export type RootGetters = FeatureGetters & SampleGetters & WsqueueGetters;

export type Store = FeatureStore<Pick<RootState, FeatureModule>> &
  SampleStore<Pick<RootState, SampleModule>> &
  WsqueueStore<Pick<RootState, WsqueueModule>>;

/**
 * Define namespaced types of actions, mutations or getters
 * @param T Types of actions, mutations or getters
 * (P: Keys in T; T[P]: Types of P)
 * @param N Types of namespaced store (module)
 */
export type Namespaced<T, N extends string> = {
  [P in keyof T & string as `${N}/${P}`]: T[P];
};

export type ActionContext<S, G> = {
  commit<K extends keyof RootMutations>(
    type: K,
    payload: Parameters<RootMutations[K]>[1],
    options: { root: true } | CommitOptions,
  ): ReturnType<RootMutations[K]>;
  dispatch<K extends keyof RootActions>(
    type: K,
    payload: Parameters<RootActions[K]>[1],
    options: { root: true } | DispatchOptions,
  ): ReturnType<RootActions[K]>;
  state: S;
  rootState: RootState;
  getters: G;
  rootGetters: RootGetters;
} & Omit<
  VuexActionContext<S, RootState>,
  'commit' | 'dispatch' | 'state' | 'rootState' | 'getters' | 'rootGetters'
>;

export type GetterContext<S, G> = [S, G, RootState, RootGetters];

import {
  Store as FeatureStore,
  State as FeatureState,
  NamespacedActions as FeatureActions,
  NamespacedGetters as FeatureGetters,
} from '@/store/feature/declarations';

export type RootState = {
  feature: FeatureState;
};

export type RootActions = FeatureActions ;
export type RootGetters = FeatureGetters ;

export type Store = FeatureStore<Pick<RootState, 'feature'>> ;

/**
 * Define namespaced types of actions, mutations or getters
 * @param T Types of actions, mutations or getters
 * (P: Keys in T; T[P]: Types of P)
 * @param N Types of namespaced store (module)
 */
export type Namespaced<T, N extends string> = {
  [P in keyof T & string as `${N}/${P}`]: T[P];
};

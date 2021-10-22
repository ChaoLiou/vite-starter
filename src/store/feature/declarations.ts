import type {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext as VuexActionContext,
} from 'vuex';
import type { Getters } from './getters';
import type { Mutations } from './mutations';
import type { Actions } from './actions';
import type { State } from './state';
import type { RootState, RootActions, RootGetters, Namespaced } from '@/store/declarations';

type ModuleName = 'feature';

export type ActionContext = {
  commit<K extends keyof Mutations>(
    type: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
  dispatch<K extends keyof RootActions>(
    type: K,
    payload: Parameters<RootActions[K]>[1],
  ): ReturnType<RootActions[K]>;
  state: State;
  rootState: RootState;
  getters: Getters;
  rootGetters: RootGetters;
} & Omit<
  VuexActionContext<State, RootState>,
  'commit' | 'dispatch' | 'state' | 'rootState' | 'getters' | 'rootGetters'
>;

export type GetterContext = [State, RootState, Getters, RootGetters];

export type NamespacedGetters = Namespaced<Getters, ModuleName>;
export type NamespacedMutations = Namespaced<Mutations, ModuleName>;
export type NamespacedActions = Namespaced<Actions, ModuleName>;

export { State };

export type Store<S = State> = Omit<VuexStore<S>, 'commit' | 'dispatch' | 'getters'> & {
  commit<T extends keyof NamespacedMutations, P extends Parameters<NamespacedMutations[T]>[1]>(
    type: T,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<NamespacedMutations[T]>;
} & {
  dispatch<T extends keyof NamespacedActions, P extends Parameters<NamespacedActions[T]>[1]>(
    type: T,
    payload?: P,
    options?: DispatchOptions,
  ): ReturnType<NamespacedActions[T]>;
} & {
  getters: {
    [T in keyof NamespacedGetters]: ReturnType<NamespacedGetters[T]>;
  };
};

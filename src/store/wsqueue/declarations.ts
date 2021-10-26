/* eslint-disable no-unused-vars */
import type { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import type { State } from './state';
import type { Namespaced, GetterContext, ActionContext } from '@/store/declarations';
import { UnionTypes } from './types';
import { EventModel } from '@/models/EventModel';

export type Mutations<S = State> = {
  [UnionTypes.JOIN](state: S, payload: EventModel): void;
  [UnionTypes.GET_LIST](state: S, payload: EventModel): void;
  [UnionTypes.ACTION_RESULT](state: S, payload: EventModel): void;
  [UnionTypes.BOT_CONNECTION](state: S, payload: EventModel): void;
};

export type Getters = {};

export interface Actions {
  [UnionTypes.JOIN]({ commit }: ActionContext<State, Getters>, payload: EventModel): void;
  [UnionTypes.GET_LIST]({ commit }: ActionContext<State, Getters>, payload: EventModel): void;
  [UnionTypes.ACTION_RESULT]({ commit }: ActionContext<State, Getters>, payload: EventModel): void;
  [UnionTypes.BOT_CONNECTION]({ commit }: ActionContext<State, Getters>, payload: EventModel): void;
}

export type ModuleName = 'wsqueue';

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

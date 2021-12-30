/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import type { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import type { State } from './state';
import type { Namespaced, ActionContext } from '@/store/declarations';
import { UnionTypes } from './types';
import type { EventModel } from '@/models/EventModel';

export type Mutations<S = State> = {};

export type DeclareGetters = {};

export interface Actions {}

export type ModuleName = 'wsqueue';

export type NamespacedDeclareGetters = Namespaced<DeclareGetters, ModuleName>;
export type NamespacedMutations = Namespaced<Mutations, ModuleName>;
export type NamespacedActions = Namespaced<Actions, ModuleName>;

export type Getters = {
  [T in keyof DeclareGetters]: ReturnType<DeclareGetters[T]>;
};

export type NamespacedGetters = {
  [T in keyof NamespacedDeclareGetters]: ReturnType<NamespacedDeclareGetters[T]>;
};

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
  getters: NamespacedGetters;
};

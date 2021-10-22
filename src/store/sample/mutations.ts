import type { MutationTree } from 'vuex';
import { MutationTypes } from './types';
import type { State } from './state';

export type Mutations<S = State> = {
  [MutationTypes.SET_LIST](state: S, payload: string[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LIST](state, payload: string[]) {
    state.list = payload;
  },
};

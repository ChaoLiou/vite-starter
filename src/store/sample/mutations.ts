/* eslint-disable no-param-reassign */
import type { MutationTree } from 'vuex';
import { MutationTypes } from './types';
import type { State } from './state';
import { Mutations } from './declarations';

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LIST](state, payload: string[]) {
    state.list = payload;
  },
};

export default { mutations };

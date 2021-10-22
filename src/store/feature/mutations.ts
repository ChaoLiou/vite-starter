/* eslint-disable no-param-reassign */
import type { MutationTree } from 'vuex';
import { MutationTypes } from './types';
import type { State } from './state';
import { Mutations } from './declarations';
import type { FeatureModel } from '@/models/FeatureModel';

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LIST](state, payload: FeatureModel[]) {
    state.list = payload;
  },
};

export default { mutations };

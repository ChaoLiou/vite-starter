import type { MutationTree } from 'vuex';
import { MutationTypes } from './types';
import type { State } from './state';
import type { FeatureModel } from '@/models/FeatureModel';

export type Mutations<S = State> = {
  [MutationTypes.SET_LIST](state: S, payload: FeatureModel[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LIST](state, payload: FeatureModel[]) {
    state.list = payload;
  },
};

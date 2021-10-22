import type { ActionTree } from 'vuex';
import { ActionTypes } from './types';
import { defaultOptions } from '@/store/utils';
import type { State } from './state';
import type { Getters } from './getters';
import type { RootState, ActionContext } from '@/store/declarations';
import { getAll } from '@/services/FeatureService';

export interface Actions {
  [ActionTypes.GET_LIST]({ commit }: ActionContext<State, Getters>, payload: any): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_LIST]({ commit }) {
    const { data } = await getAll();
    commit('feature/SET_FEATURES', data, defaultOptions);
  },
};
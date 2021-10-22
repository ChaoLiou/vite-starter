import type { ActionTree } from 'vuex';
import { ActionTypes } from './types';
import { defaultOptions } from '@/store/utils';
import type { State } from './state';
import type { Getters } from './getters';
import type { RootState, ActionContext } from '@/store/declarations';

export interface Actions {
  [ActionTypes.GET_LIST]({ commit }: ActionContext<State, Getters>, payload: any): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_LIST]({ commit }) {
    const data = ['sample 1', 'sample 2', 'sample 3'];
    commit('sample/SET_LIST', data, defaultOptions);
  },
};

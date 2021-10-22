import type { ActionTree } from 'vuex';
import { ActionTypes } from './types';
import { defaultOptions } from '@/store/utils';
import type { State } from './state';
import type { RootState } from '@/store/declarations';
import { Actions } from './declarations';

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_LIST]({ commit }) {
    const data = ['sample 1', 'sample 2', 'sample 3'];
    commit('sample/SET_LIST', data, defaultOptions);
  },
};

export default { actions };

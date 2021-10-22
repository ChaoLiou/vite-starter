import type { ActionTree } from 'vuex';
import { ActionTypes } from './types';
import { defaultOptions } from '@/store/utils';
import type { State } from './state';
import type { RootState } from '@/store/declarations';
import { Actions } from './declarations';
import { getAll } from '@/services/FeatureService';

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_LIST]({ commit }) {
    const { data } = await getAll();
    commit('feature/SET_FEATURES', data, defaultOptions);
  },
};

export default { actions };

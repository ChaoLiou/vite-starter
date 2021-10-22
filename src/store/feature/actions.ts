import type { ActionTree } from 'vuex';
import { ActionTypes, MutationTypes } from './types';
import { getAll } from '@/services/FeatureService';
import type { State } from './state';
import type { RootState } from '@/store/declarations';
import type { ActionContext } from './declarations';

export interface Actions {
  [ActionTypes.GET_LIST]({ commit }: ActionContext, payload: any): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_LIST]({ commit }) {
    const { data } = await getAll();
    commit(MutationTypes.SET_LIST, data);
  },
};

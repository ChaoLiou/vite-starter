import type { Module } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import type { State } from './state';
import type { RootState } from '@/store/declarations';

export const store: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default { store };

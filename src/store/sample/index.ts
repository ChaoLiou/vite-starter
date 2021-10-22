import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import type { State } from './state';
import type { RootState } from '@/store/declarations';
import type { Module } from 'vuex';

export const store: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

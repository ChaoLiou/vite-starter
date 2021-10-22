import type { GetterTree } from 'vuex';
import type { RootState, GetterContext } from '@/store/declarations';
import type { State } from './state';

export type Getters = {
  lastSample(...context: GetterContext<State, Getters>): string;
};

export const getters: GetterTree<State, RootState> & Getters = {
  lastSample: (state) => {
    return state.list.length > 0 ? state.list[state.list.length - 1] : '';
  },
};

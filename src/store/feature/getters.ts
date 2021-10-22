import type { GetterTree } from 'vuex';
import type { RootState, GetterContext } from '@/store/declarations';
import type { State } from './state';

export type Getters = {
  allTags(...context: GetterContext<State, Getters>): string[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  allTags: (state) => {
    return state.list.map((item) => item.tags).flat();
  },
};

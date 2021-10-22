import type { GetterTree } from 'vuex';
import type { RootState } from '@/store/declarations';
import type { State } from './state';
import type { GetterContext } from './declarations';

export type Getters = {
  allTags(...context: GetterContext): string[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  allTags: (state) => {
    return state.list.map((item) => item.tags).flat();
  },
};

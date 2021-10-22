import type { GetterTree } from 'vuex';
import type { RootState } from '@/store/declarations';
import type { State } from './state';
import { Getters } from './declarations';

export const getters: GetterTree<State, RootState> & Getters = {
  lastSample: (state) => (state.list.length > 0 ? state.list[state.list.length - 1] : ''),
};

export default { getters };

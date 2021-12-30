import type { GetterTree } from 'vuex';
import type { RootState } from '@/store/declarations';
import type { State } from './state';
import type { DeclareGetters as Getters } from './declarations';

export const getters: GetterTree<State, RootState> & Getters = {};

export default { getters };

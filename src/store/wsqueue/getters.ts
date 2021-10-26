import type { GetterTree } from 'vuex';
import type { RootState } from '@/store/declarations';
import type { State } from './state';
import { Getters } from './declarations';

export const getters: GetterTree<State, RootState> & Getters = {};

export default { getters };

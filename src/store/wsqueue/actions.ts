import type { ActionTree } from 'vuex';
import type { State } from './state';
import type { RootState } from '@/store/declarations';
import type { Actions } from './declarations';

export const actions: ActionTree<State, RootState> & Actions = {};

export default { actions };

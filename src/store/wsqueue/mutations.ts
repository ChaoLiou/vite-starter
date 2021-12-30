/* eslint-disable no-param-reassign */
import type { MutationTree } from 'vuex';
import type { State } from './state';
import type { Mutations } from './declarations';

export const mutations: MutationTree<State> & Mutations = {};

export default { mutations };

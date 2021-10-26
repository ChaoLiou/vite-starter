/* eslint-disable no-param-reassign */
import type { MutationTree } from 'vuex';
import { UnionTypes } from './types';
import type { State } from './state';
import { Mutations } from './declarations';
import { EventModel } from '@/models/EventModel';

export const mutations: MutationTree<State> & Mutations = {
  [UnionTypes.MESSAGE](state, payload: EventModel) {
    state.events.push({ ...payload });
  },
  [UnionTypes.JOIN](state, payload: EventModel) {
    state.events.push({ ...payload });
  },
  [UnionTypes.GET_LIST](state, payload: EventModel) {
    state.events.push({ ...payload });
  },
  [UnionTypes.ACTION_RESULT](state, payload: EventModel) {
    state.events.push({ ...payload });
  },
  [UnionTypes.BOT_CONNECTION](state, payload: EventModel) {
    state.events.push({ ...payload });
  },
};

export default { mutations };

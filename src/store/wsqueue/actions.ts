import type { ActionTree } from 'vuex';
import { notification } from 'ant-design-vue';
import { UnionTypes } from './types';
import { defaultOptions } from '@/store/utils';
import type { State } from './state';
import type { RootState } from '@/store/declarations';
import { Actions } from './declarations';
import { EventModel } from '@/models/EventModel';

function notify(event: EventModel): void {
  notification.open({
    message: `[${event.name}] - ${event.timestamp}`,
    description: event.params,
    onClick: () => {},
  });
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [UnionTypes.MESSAGE]({ commit }, payload: EventModel) {
    notify(payload);
    commit('wsqueue/MESSAGE', payload, defaultOptions);
  },
  async [UnionTypes.JOIN]({ commit }, payload: EventModel) {
    notify(payload);
    commit('wsqueue/JOIN', payload, defaultOptions);
  },
  async [UnionTypes.GET_LIST]({ commit }, payload: EventModel) {
    notify(payload);
    commit('wsqueue/GET_LIST', payload, defaultOptions);
  },
  async [UnionTypes.ACTION_RESULT]({ commit }, payload: EventModel) {
    notify(payload);
    commit('wsqueue/ACTION_RESULT', payload, defaultOptions);
  },
  async [UnionTypes.BOT_CONNECTION]({ commit }, payload: EventModel) {
    notify(payload);
    commit('wsqueue/BOT_CONNECTION', payload, defaultOptions);
  },
};

export default { actions };

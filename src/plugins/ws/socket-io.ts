/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import type { App } from 'vue';
import io, { Manager } from 'socket.io-client';
import type { SocketIOPluginOption } from './declarations';

const defaultOptions = { root: true };

export enum EventKeys {}

export function parseEventName(rawEventName: string) {
  const result = /^([A-Z]+)\.([A-Z][a-z]+)$/.exec(rawEventName);
  if (result) {
    const [, targetType, actionType] = result;
    return { targetType, actionType, eventName: `${targetType}_${actionType}` };
  }
  return {};
}

export function formatStoreActionType(storeName: string, type: string) {
  return `${storeName}/${type.toUpperCase()}`;
}

const socketIOPlugin = {
  install: (app: App, options: SocketIOPluginOption) => {
    const {
      uri,
      socketIOOptions,
      vuex: { store, namespace: storeName },
    } = options;

    const manager = new Manager(uri, socketIOOptions);
    const globalSocket = manager.socket('/');
    const namespacedSocket = manager.socket('/');

    // const socket = io(uri, socketIOOptions);
    namespacedSocket.connect();

    namespacedSocket.on('connect', () => {
      if (namespacedSocket.connected) {
        store.dispatch(
          formatStoreActionType(storeName, 'connect'),
          { name: 'connect', timestamp: Date.now(), params: namespacedSocket },
          defaultOptions,
        );
      }
    });

    const eventHandler = (rawEventName: string, data: any) => {
      console.log({ rawEventName, data });
      const { eventName } = parseEventName(rawEventName);
      if (eventName) {
        store.dispatch(
          formatStoreActionType(storeName, eventName),
          { name: eventName, timestamp: Date.now(), params: data },
          defaultOptions,
        );
      }
    };

    globalSocket.onAny(eventHandler);
    namespacedSocket.onAny(eventHandler);
  },
};

export default socketIOPlugin;

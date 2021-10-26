import type { App } from 'vue';
import io from 'socket.io-client';
import type { SocketIOPluginOption } from './declarations';

const defaultOptions = { root: true };

const socketIOPlugin = {
  install: (app: App, options: SocketIOPluginOption) => {
    const {
      uri,
      socketIOOptions,
      vuex: { store, namespace },
    } = options;
    const typeFormatter = (type: string) => `${namespace}/${type.toUpperCase()}`;

    const socket = io(uri, socketIOOptions);
    socket.connect();

    socket.on('connect', () => {
      if (socket.connected) {
        socket.emit('join', (res: string) => {
          console.log(res);
          const timestamp = Date.now();
          store.dispatch(
            typeFormatter('join'),
            { name: 'join', timestamp, params: res },
            defaultOptions,
          );
        });
      }
    });

    socket.onAny((eventName: string, data: any) => {
      console.log(eventName, data);
      const timestamp = Date.now();
      store.dispatch(
        typeFormatter(eventName),
        { name: eventName, timestamp, params: data },
        defaultOptions,
      );
    });
  },
};

export default socketIOPlugin;

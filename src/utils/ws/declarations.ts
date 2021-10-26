/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import type { SocketOptions } from 'socket.io-client';
import { Store } from 'vuex';
import { RootState } from '@/store/declarations';

export type SocketIOPluginOption = {
  uri: string;
  vuex: {
    store: Store<RootState>;
    namespace: string;
  };
  socketIOOptions: SocketOptions;
};

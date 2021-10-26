import { createStore, createLogger } from 'vuex';
import { store as feature } from '@/store/feature';
import { store as sample } from '@/store/sample';
import { store as wsqueue } from '@/store/wsqueue';
import type { Store } from '@/store/declarations';

const plugins = [];
if (import.meta.env.DEV) {
  plugins.push(createLogger());
}

export const store = createStore({
  plugins,
  modules: {
    feature,
    sample,
    wsqueue,
  },
});

export function useStore(): Store {
  return store as Store;
}

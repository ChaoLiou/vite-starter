/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare const processEnv: any;

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_ENABLE_MOCK_SERVER: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

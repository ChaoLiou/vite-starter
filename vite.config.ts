import { defineConfig, ConfigEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import gzipPlugin from 'rollup-plugin-gzip';
import { injectHtml } from 'vite-plugin-html';
import { configStyleImportPlugin } from './build/styleImport';
import { generateModifyVars } from './build/generateModifyVars';

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  return {
    base: '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    plugins: [
      vue(),
      configStyleImportPlugin(isBuild),
      injectHtml({
        data: {
          timestamp: Date.now(),
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/styles/index.scss";',
        },
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    build: {
      rollupOptions: {
        plugins: [gzipPlugin()],
        output: {
          manualChunks(id) {
            const result = /[\\/]node_modules[\\/](.*?)([\\/]|$)/.exec(id);
            if (result) {
              const [, packageName] = result;
              return `npm.${packageName.replace('@', '')}`;
            }
            return 'others';
          },
        },
      },
    },
  };
});

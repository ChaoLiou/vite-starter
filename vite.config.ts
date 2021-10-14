import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { configStyleImportPlugin } from "./build/styleImport";
import { generateModifyVars } from "./build/generateModifyVars";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const isBuild = command === "build";
  console.log({ env });
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    plugins: [vue(), configStyleImportPlugin(isBuild)],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/index.scss";`,
        },
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
  };
});

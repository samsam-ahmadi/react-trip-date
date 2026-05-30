import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import type { Plugin, PluginOption } from "vite";

// Avoid __dirname / import.meta.url so this config loads under both
// the esbuild-register loader (Node 20 CJS) and Node's native TS
// stripping (Node 22+ ESM).
const ROOT = process.cwd();

const PROJECT_PLUGINS_TO_DROP = new Set([
  // vite-plugin-dts emits library .d.ts files — it should never run when
  // Storybook is the host (it would overwrite dist/index.d.ts and fights
  // with Storybook's own type handling).
  "vite:dts",
]);

const filterProjectPlugins = (
  plugins: PluginOption[] | undefined,
): PluginOption[] =>
  (plugins ?? []).filter(plugin => {
    if (!plugin || Array.isArray(plugin)) return true;
    const name = (plugin as Plugin).name;
    return !name || !PROJECT_PLUGINS_TO_DROP.has(name);
  });

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  docs: {
    autodocs: "tag",
    defaultName: "Docs",
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  async viteFinal(config) {
    config.plugins = filterProjectPlugins(config.plugins);
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      calendar: resolve(ROOT, "src/calendar"),
      components: resolve(ROOT, "src/components"),
      constant: resolve(ROOT, "src/constant"),
      datePicker: resolve(ROOT, "src/datePicker"),
      libs: resolve(ROOT, "src/libs"),
      rangePicker: resolve(ROOT, "src/rangePicker"),
    };
    return config;
  },
};

export default config;

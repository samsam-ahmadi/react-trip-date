import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import type { Plugin, PluginOption } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
      calendar: resolve(__dirname, "../src/calendar"),
      components: resolve(__dirname, "../src/components"),
      constant: resolve(__dirname, "../src/constant"),
      datePicker: resolve(__dirname, "../src/datePicker"),
      libs: resolve(__dirname, "../src/libs"),
      rangePicker: resolve(__dirname, "../src/rangePicker"),
    };
    return config;
  },
};

export default config;

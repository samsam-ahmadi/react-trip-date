import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

// Avoid __dirname / import.meta.url so this config loads under both
// Node's CJS and ESM resolvers (different Storybook loaders pick
// different ones depending on Node version).
const ROOT = process.cwd();

export default defineConfig({
  resolve: {
    alias: {
      calendar: resolve(ROOT, "src/calendar"),
      components: resolve(ROOT, "src/components"),
      constant: resolve(ROOT, "src/constant"),
      datePicker: resolve(ROOT, "src/datePicker"),
      libs: resolve(ROOT, "src/libs"),
      rangePicker: resolve(ROOT, "src/rangePicker"),
    },
  },
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    react(),
    dts({
      entryRoot: "src",
      include: ["src"],
      exclude: [
        "src/**/__tests__/**",
        "src/**/*.spec.ts",
        "src/**/*.spec.tsx",
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/**/*.stories.ts",
        "src/**/*.stories.tsx",
        "src/**/*.stories.mdx",
        "src/stories/**",
        "src/setupTests.ts",
        "src/libs/TestProviders.tsx",
      ],
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(ROOT, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: format => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "styled-components",
        /^dayjs($|\/)/,
        /^@zoomit\/dayjs-jalali-plugin($|\/)/,
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
          dayjs: "dayjs",
        },
      },
    },
  },
});

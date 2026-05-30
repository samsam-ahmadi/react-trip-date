import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      calendar: resolve(__dirname, "src/calendar"),
      components: resolve(__dirname, "src/components"),
      constant: resolve(__dirname, "src/constant"),
      datePicker: resolve(__dirname, "src/datePicker"),
      libs: resolve(__dirname, "src/libs"),
      rangePicker: resolve(__dirname, "src/rangePicker"),
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
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: format => (format === "es" ? "index.js" : "index.cjs"),
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

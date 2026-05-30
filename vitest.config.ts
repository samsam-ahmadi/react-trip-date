import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

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
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "**/*.stories.*",
        "**/node_modules/**",
        "**/dist/**",
        "**/docs-build/**",
        "src/setupTests.ts",
        "src/libs/TestProviders.tsx",
        "src/stories/**",
      ],
    },
  },
});

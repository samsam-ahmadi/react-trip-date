import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

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

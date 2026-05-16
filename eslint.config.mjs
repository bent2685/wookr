import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import eslint from "eslint-config-next";

/** @type {import('eslint').Linter.Config} */
export default [
  ...eslint,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base Next.js configuration
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Prettier integration
  ...compat.extends("prettier"),
  
  {
    plugins: {
      "simple-import-sort": (await import("eslint-plugin-simple-import-sort")).default,
    },
    rules: {
      // Import sorting rules
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Node.js builtins prefixed with `node:`
            ["^node:"],
            // Packages - React first, then other packages
            ["^react", "^@?\\w"],
            // Internal packages - paths starting with @/
            ["^@/"],
            // Side effect imports
            ["^\\u0000"],
            // Parent imports (../)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports (./)
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports
            ["^.+\\.?(css)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // Basic rules (not too strict)
      "no-unused-vars": "off", // Turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",

      // Disable some overly strict rules
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },

  // Ignore patterns
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "*.config.js",
      "*.config.mjs",
      "tailwind.config.ts",
      "postcss.config.mjs",
    ],
  },
];

export default eslintConfig;

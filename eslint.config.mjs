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

  // Prettier integration (must be last)
  ...compat.extends("prettier"),

  {
    plugins: {
      "simple-import-sort": (await import("eslint-plugin-simple-import-sort"))
        .default,
    },
    rules: {
      // Import sorting rules
      "simple-import-sort/imports": [
        "off",
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
      "simple-import-sort/exports": "off",

      // Basic TypeScript rules (not too strict)
      "no-unused-vars": "off", // Turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "off",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      // Removed invalid @typescript-eslint/prefer-const rule

      // React/Next.js specific rules
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react-hooks/exhaustive-deps": "off",

      // General rules
      "no-console": ["off", { allow: ["warn", "off"] }],
      "prefer-const": "off",

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
      "src/components/ui/**", // Exclude shadcn/ui components
    ],
  },
];

export default eslintConfig;

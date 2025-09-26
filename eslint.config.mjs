import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["coverage/**", "dist/**", "*.config.js"],
  },
  {
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
  },
];

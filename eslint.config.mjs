import js from "@eslint/js";
import ts from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off", // Next.js ไม่จำเป็นต้อง import React
      "react/prop-types": "off", // ใช้ TypeScript แทน
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "off", // สำหรับภาษาไทยที่มีเครื่องหมายพิเศษ
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "public/**",
      "scripts/**",
      "*.config.js",
      "*.config.mjs",
    ],
  }
);

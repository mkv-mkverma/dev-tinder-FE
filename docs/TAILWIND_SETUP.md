# Tailwind CSS Setup

Tailwind v4 with a Sass entry file. Uses the PostCSS plugin, not `@tailwindcss/vite` — the Vite plugin only processes `.css` files and would skip `.scss`.

## 1. Install

```bash
npm install tailwindcss
npm install --save-dev @tailwindcss/postcss
```

## 2. `postcss.config.js`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## 3. `vite.config.ts`

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
```

## 4. `src/index.scss`

```scss
@import url("tailwindcss");
```

Use `url(...)` so Sass passes it through as a plain CSS import instead of inlining it.

## 5. `src/main.tsx`

```tsx
import "./index.scss";
```

## Verify

```bash
npm run build
```

Then check the output CSS contains compiled utilities, not raw directives:

```bash
grep -oE "\.bg-blue-500\{[^}]*\}" dist/assets/*.css
```

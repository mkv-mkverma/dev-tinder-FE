# daisyUI Setup

Component library layered on top of Tailwind v4. Assumes Tailwind is already wired up — see [TAILWIND_SETUP.md](TAILWIND_SETUP.md).

## 1. Install

```bash
npm i -D daisyui@latest
```

No `postcss.config.js` or `vite.config.ts` change is needed. In Tailwind v4 daisyUI is loaded from the CSS entry point, not from a JS config.

## 2. `src/index.scss`

```scss
@import url("tailwindcss");
@plugin "daisyui";
```

`@plugin` must sit in the same file as the Tailwind import, after it. Sass does not recognise `@plugin`, but it passes unknown at-rules through untouched, so `@tailwindcss/postcss` still sees it once Sass has compiled.

## Verify

```bash
npm run build
```

The build log prints a daisyUI banner (`/*! 🌼 daisyUI 5.x.x */`), and the output CSS contains the theme variables:

```bash
grep -oE ":root,\[data-theme\]" dist/assets/*.css
```

Component classes are generated on demand, like any Tailwind utility — they only appear in the output once something in `src/` uses them:

```tsx
<button className="btn btn-primary">Send request</button>
```

```bash
grep -oE "\.btn\{" dist/assets/*.css
```

## Themes

daisyUI ships `light` and `dark` enabled by default, switched by `data-theme` on `<html>`. To pick a different set, list them on the plugin:

```scss
@plugin "daisyui" {
  themes: cupcake --default, dracula --prefersdark;
}
```

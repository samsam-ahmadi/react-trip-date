## [2.1.1](https://github.com/samsam-ahmadi/react-trip-date/compare/v2.1.0...v2.1.1) (2026-05-31)

### Bug Fixes

- **jalali:** preserve plugin's jmonths augmentation of the fa locale ([4d98e80](https://github.com/samsam-ahmadi/react-trip-date/commit/4d98e800384d320ba9f5999642e831a9025c0160))

# Changelog

## 2.0.0 — 2026-05-30

A modernization release. Most app code will not need to change, but peer-dependency
and packaging changes mean this is a major bump.

### Breaking

- **React 18 / 19 only.** Dropped React 16 and 17 from `peerDependencies`.
- **`styled-components@^6` is now a peer dependency.** Install it explicitly.
- **ESM-first packaging.** New `exports` map. Deep imports from `dist/` are no longer supported — import from the public entry only.
- **Build toolchain swapped to Vite (lib mode).** No effect on consumers, but `dist/` layout and filenames changed (`index.js` / `index.cjs` / `index.d.ts`).
- **`Calendar` no longer shifts the source date forward by 1 day when today is Sunday.** If you relied on that bug, you may see a different first row.
- **Internal styled-components use [transient props](https://styled-components.com/docs/api#transient-props)** (`$jalali`, `$numberOfMonths`, ...). This removes stray non-standard DOM attributes that v1 emitted.

### Added

- **Full keyboard navigation** on all interactive day cells:
  - `←` `→` move by ±1 day
  - `↑` `↓` move by ±1 week
  - `Home` / `End` jump to the week edges
  - `PageUp` / `PageDown` jump by ±1 month
  - `Shift + PageUp` / `Shift + PageDown` jump by ±1 year
  - `Enter` / `Space` selects the focused day
- **ARIA grid semantics**: `role="grid"`, `role="row"`, `role="gridcell"`, `aria-selected`, `aria-disabled`, `aria-current="date"`.
- **Roving tabindex** within the visible month for natural focus management.
- **Descriptive ARIA labels** on header navigation buttons.
- **Storybook 8** + Vite builder, autodocs from TS types + curated MDX guides (Getting Started, Theming, Localization, Accessibility, Recipes, Migration).
- **`@storybook/addon-a11y`** axe checks on every story.
- **`@storybook/addon-themes`** for light/Indigo/Pink theme switching in the Storybook toolbar.

### Changed

- **Shared `useCalendarController` hook** powers both `DatePicker` and `RangePicker`. The two components are now thin wrappers — smaller bundle, fewer effects, identical public API.
- **Responsive layout uses `ResizeObserver`** on the picker's own container instead of a `window.resize` listener. Reacts to parent layout changes (drawers, splits) you previously had to refresh manually.
- **Controlled / uncontrolled state** is now handled by a `useControlled` helper instead of effects that fight controlled props.
- **`onRangeDateInScreen`** payload's `end` date now respects the active calendar (Gregorian or Jalali) — previously was always Gregorian.

### Fixed

- Resize effect no longer re-binds the listener on every resize (stale-deps loop).
- Two `useEffect`s that synced prop → state with `// eslint-disable react-hooks/exhaustive-deps` have been replaced by a controlled-pattern hook.
- Range picker's hover preview now correctly respects all `disabled*` props.
- Calendar grid keys are stable and unique across months and across multi-month layouts (removes React duplicate-key warnings).

### Removed

- `react-scripts` (CRA) — replaced by Vite for both dev and build.
- Rollup config and its plugins — Vite handles library bundling.
- `@storybook/addon-knobs` — replaced by Storybook controls / args.
- `.stories.mdx` (MDX1) — replaced by MDX2 docs pages.
- `import-sort` / `.importsortrc` — replaced by ESLint `import/order`.
- `src/react-app-env.d.ts` — was a CRA artifact.

### Tooling

- TypeScript 4.9 → 5.6.
- Husky 7 → 9, commitlint 16 → 19, lint-staged 12 → 15, prettier 2 → 3.
- Vitest replaces Jest. RTL v16 + `@testing-library/jest-dom@^6`.
- New CI workflow (`.github/workflows/ci.yml`): type-check, lint, test (coverage), build library, build Storybook. Storybook deploy moved to `actions/deploy-pages`.

### Migration

See the [Migration v1 → v2 guide](./src/stories/docs/MigrationV1V2.mdx) in Storybook.

---

## 1.13.1

- Re-export locales (`fix: import the locales`).

## 1.13.0

- Update packages.

## 1.12.x

- `fix: leap year` (#54)
- `fix: locale` (#56)

(For older history, see [GitHub Releases](https://github.com/samsam-ahmadi/react-trip-date/releases).)

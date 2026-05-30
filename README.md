# react-trip-date

[![npm](https://img.shields.io/npm/v/react-trip-date.svg)](https://www.npmjs.com/package/react-trip-date)
![downloads](https://img.shields.io/npm/dt/react-trip-date.svg)

> Accessible, fully customizable date and range picker for React 18 / 19.

![Demo for React Trip Date](demo.gif)

- 📅 `DatePicker`, `RangePicker`, headless `Calendar` primitive
- 🌍 Gregorian + **Jalali** (Persian) calendars, 10 built-in locales via Day.js
- 🎨 Themable via `styled-components` v6 — drop-in Material-UI shape
- ♿ Full keyboard navigation + ARIA `grid` semantics
- 📐 Auto-responsive multi-month layout (via `ResizeObserver`)
- 🪶 ESM-first, tree-shakable, sourcemaps included

[Storybook & live docs →](https://killthejs.com/react-trip-date/)

## Install

```bash
yarn add react-trip-date styled-components dayjs
# or
npm install react-trip-date styled-components dayjs
```

`react@^18 || ^19`, `react-dom`, and `styled-components@^6` are peer dependencies.

## Quick start

```tsx
import { DatePicker } from "react-trip-date";

export function Example() {
  return <DatePicker onChange={dates => console.log(dates)} />;
}
```

Range picker:

```tsx
import { useState } from "react";
import { RangePicker } from "react-trip-date";

export function Booking() {
  const [range, setRange] = useState({ from: "", to: "" });
  return <RangePicker selectedDays={range} onChange={setRange} />;
}
```

Headless calendar:

```tsx
import { Calendar } from "react-trip-date";

<Calendar jalali={false} startOfWeek={1}>
  {weeks =>
    weeks.map((week, i) => (
      <div key={i} className="row">
        {week.map(day => (
          <span key={day.format("YYYY-MM-DD")}>{day.format("DD")}</span>
        ))}
      </div>
    ))
  }
</Calendar>;
```

## API

Full prop tables and live examples in Storybook:

- [DatePicker](https://killthejs.com/react-trip-date/?path=/docs/components-datepicker--docs)
- [RangePicker](https://killthejs.com/react-trip-date/?path=/docs/components-rangepicker--docs)
- [Calendar](https://killthejs.com/react-trip-date/?path=/docs/components-calendar--docs)
- [Theming](https://killthejs.com/react-trip-date/?path=/docs/docs-theming--docs)
- [Localization](https://killthejs.com/react-trip-date/?path=/docs/docs-localization--docs)
- [Accessibility & keyboard nav](https://killthejs.com/react-trip-date/?path=/docs/docs-accessibility--docs)
- [Recipes](https://killthejs.com/react-trip-date/?path=/docs/docs-recipes--docs)
- [Migration v1 → v2](https://killthejs.com/react-trip-date/?path=/docs/docs-migration-v1-%E2%86%92-v2--docs)

## Develop

```bash
git clone https://github.com/samsam-ahmadi/react-trip-date.git
cd react-trip-date
yarn install
yarn storybook   # http://localhost:9009
yarn test
yarn build
```

## Credits

Originally created by [Samsam Ahmadi](https://github.com/samsam-ahmadi). With thanks to:

- [@amiiiirhassan](https://github.com/amiiiirhassan)
- [@mpourismaiel](https://github.com/mpourismaiel)
- [@salehbud](https://dribbble.com/salehbud)

## License

[GNU GPLv3](./LICENSE)

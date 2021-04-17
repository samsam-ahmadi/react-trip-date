# React-Trip-Date &middot; [![npm](https://img.shields.io/npm/v/react-trip-date.svg)](https://www.npmjs.com/package/react-trip-date) ![downloads](https://img.shields.io/npm/dt/react-trip-date.svg)

![Demo for React Trip Date](demo.gif)

A fully customizable Date/Range picker for your React applications.

- Theme (Compatible with your Material-UI theme ), Multiple Month, Auto Responsive
- Support Jalali & Gregorian
- Using `Day.js` (2KB immutable date and NO more need `moment.js`)

## Demo

[Online demo](https://killthejs.com/react-trip-date/) is also available! you can run demo on your local with:

- `git clone https://github.com/samsam-ahmadi/react-trip-date.git`
- `cd react-trip-date`
- `yarn && yarn storybook`
- Visit http://localhost:9009/

## Getting started

### Compatibility

Your project needs to use React 16 or later. If you use older version of React.

### Installation

`npm install react-trip-date`

`yarn add react-trip-date`

## User guide

### DatePicker

#### Props

| Prop name              | Description                                                                                      | Default value | Example values                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange               | this function return an array of days                                                            | n/a           | `(days:string[]) => console.log('selected days',days)`                                                                                                          |
| selectedDays           | the initial array of days                                                                        | `[]`          | `['2019-10-01','2019-11-06']`                                                                                                                                   |
| jalali                 | choice jalali or gregorian calendar                                                              | `false`       | `false`/`true`                                                                                                                                                  |
| numberOfMonths         | number of months you need to show                                                                | `1`           | `7`                                                                                                                                                             |
| initialMonthAndYear    | the initial month and year to start visible calendar on                                          | Current m/y   | `2020-02`                                                                                                                                                       |
| onRangeDateInScreen    | called whenever the visible dates change for any reason                                          | n/a           | `(window: {start: string, end: string}) => console.log(window)`                                                                                                 |
| numberOfSelectableDays | number of days you need                                                                          | 0/infinity    | `3`                                                                                                                                                             |
| disabledDays           | the disabled days that you don't want clickable to choice                                        | `[]`          | `['2019-11-04',2019-12-14]`                                                                                                                                     |
| autoResponsive         | makes your calendar responsive but you can handle it by your self by change the `numberOfMonths` | `true`        | `false/true`                                                                                                                                                    |
| disabledBeforeToday    | disabled days before today                                                                       | `false`       | `true`/`false`                                                                                                                                                  |
| disabledBeforeDate     | disabled before this day                                                                         | `undefined`   | `2019-03-04`                                                                                                                                                    |
| disabledAfterDate      | disabled after this day                                                                          | `undefined`   | `2019-11-04`                                                                                                                                                    |
| disabled               | disabled calendar                                                                                | `false`       | `true`/`false`                                                                                                                                                  |
| components             | update header title, week title and day component                                                | `undefined`   | `{days?: ElementType<{day:string;jalali: boolean;}>;header?: {format?: string;};titleOfWeek?:{titles?: string[];wrapper?: ElementType<{ jalali: boolean }>;};}` |

##

### RangePicker

#### Props

| Prop name           | Description                                                                                      | Default value     | Example values                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange            | this function return an array of days                                                            | n/a               | `(days:string[]) => console.log('selected days',days)`                                                                                                          |
| selectedDays        | the initial range date                                                                           | `{from:'',to:''}` | `{from:'2019-12-12',to:'2019-12-18'}`                                                                                                                           |
| jalali              | choice jalali or gregorian calendar                                                              | `false`           | `false`/`true`                                                                                                                                                  |
| numberOfMonths      | number of months you need to show                                                                | `1`               | `7`                                                                                                                                                             |
| initialMonthAndYear | the initial month and year to start visible calendar on                                          | Current m/y       | `2020-02`                                                                                                                                                       |
| onRangeDateInScreen | called whenever the visible dates change for any reason                                          | n/a               | `(window: {start: string, end: string}) => console.log(window)`                                                                                                 |
| disabledDays        | the disabled days that you don't want clickable to choice                                        | `[]`              | `['2019-11-04',2019-12-14]`                                                                                                                                     |
| autoResponsive      | makes your calendar responsive but you can handle it by your self by change the `numberOfMonths` | `true`            | `false/true`                                                                                                                                                    |
| disabledBeforeToday | disabled days before today                                                                       | `false`           | `true`/`false`                                                                                                                                                  |
| disabledBeforeDate  | disabled before this day                                                                         | `undefined`       | `2019-03-04`                                                                                                                                                    |
| disabledAfterDate   | disabled after this day                                                                          | `undefined`       | `2019-11-04`                                                                                                                                                    |
| disabled            | disabled calendar                                                                                | `false`           | `true`/`false`                                                                                                                                                  |
| components          | update header title, week title and day component                                                | `undefined`       | `{days?: ElementType<{day:string;jalali: boolean;}>;header?: {format?: string;};titleOfWeek?:{titles?: string[];wrapper?: ElementType<{ jalali: boolean }>;};}` |

#### special thanks to:

- [@amiiiirhassan](https://github.com/amiiiirhassan)
- [@mpourismaiel](https://github.com/mpourismaiel)
- [@salehbud](https://dribbble.com/salehbud)

## Contributors

feel free to contribute.

## License

The GNU GPLv3 License.


[![npm](https://img.shields.io/npm/v/react-trip-date.svg)](https://www.npmjs.com/package/react-trip-date) ![downloads](https://img.shields.io/npm/dt/react-trip-date.svg)	 ![dependencies](https://img.shields.io/david/samsam-ahmadi/react-trip-date.svg) ![dev dependencies](https://img.shields.io/david/dev/samsam-ahmadi/react-trip-date.svg)

# React-Trip-Date

A date/range picker for your React applications.
it was a package for `Tripema.com`

* Multiple Month, Custom Responsive, Number Of Selectable Days 
* Range Picker, Hoverable, Theme base
* Support Jalali & Gregorian
* Use Day.js (2KB immutable date and NO moment.js needed)
* Bundle size, 30kB (minified + GZipped  9.2 kB) 



## Demo


[Online demo](https://killthejs.com/react-trip-date/) is also available!

OR

To run that demo on your own computer:
* Clone this repository
* `yarn install`
* `yarn start`
* Visit http://localhost:6006/

## Getting started

### Compatibility

Your project needs to use React 16 or later. If you use older version of React, please refer to the table below to find suitable React-Trip-Date version.


### Installation

Add React-Trip-Date to your project by executing 
`npm install react-trip-date` or
`yarn add react-trip-date`

if you don't installed `styled-components` and `classnames`, you need to install them. 
`npm install styled-components classnames` or 
`yarn add styled-components classnames`


### Usage

Here's an example of basic usage:

```js
import React, { Component } from 'react';
import { DatePicker, RangePicker, theme } from 'react-trip-date';
import {ThemeProvider} from 'styled-components';
const  handleResponsive  =  setNumberOfMonth  =>  {
	let  width  =  document.querySelector('.tp-calendar').clientWidth;
	if  (width  >  900)  {
		setNumberOfMonth(3);
	}  else  if  (width  <  900  &&  width  >  580)  {
		setNumberOfMonth(2);
	}  else  if  (width  <  580)  {
		setNumberOfMonth(1);
	}
};

const  Day = ({  day  }) => {
	return  (
		<>
			<p  className="date">{day.format('DD')}</p>
			<p  className="date">7</p>
		</>
		);
	};
	
class MyApp extends Component {

  onChange = date => console.log(date)

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DatePicker
          handleChange={onChange}
		  selectedDays={['2019-11-06']} //initial selected days
		  jalali={false}
		  numberOfMonths={3}
		  numberOfSelectableDays={3} // number of days you need 
		  disabledDays={['2019-12-02']} //disabeld days
		  responsive={handleResponsive} // custom responsive, when using it, `numberOfMonths` props not working
		  disabledBeforToday={true} 
		  disabled={false} // disable calendar 
		  dayComponent={Day} //custom day component 
		  titleComponent={Title} // custom title of days
        />
      </ThemeProvider>
    );
  }
}
```

### Custom styling

If you don't want to use default React-Trip-Date styling to build upon it, you can import theme by using `import { theme } from 'react-trip-date` instead and custom it.

## User guide

### DatePicker


#### Props

|Prop name|Description|Default value|Example values|
|----|----|----|----|
|handleChange| is a function that return an array of days|n/a|`(days) => console.log('selected days',days)`|
|selectedDays|the initial array of days|`[]`|`['2019-10-01','2019-11-06']`|
|jalali|choice jalali or gregorian calendar|`false`|`false`/`true`|
|numberOfMonths|number of months you need|`1`|`2`|
|numberOfSelectableDays|number of days you need | 0/Infiniti| `3`
|disabledDays|the disabled days that you don't want clickable|`[]`|`['2019-11-04',2019-12-14]`|
|responsive|custom responsive is function and have a argument for change number of month, when using it, `numberOfMonths` props not working ||`(setNumberOfMonth => setNumberOfMonth(3))`|
|disabledBeforToday|disabled days before today|`true`|`true`/`false`|
|disabled|disabled date picker|`false`|`true`/`false`|
|dayComponent|custom day component|n/a| `Day  =  ({  day  })  =><p>{day.format('DD')}</p>`|
|titleComponent|custom title of days week|n/a|`const Title=({source  })=>{let  titleDay  =  ['Su',  'Mo',  'Tu',  'We',  'Th',  'Fr',  'Sa']return  ({titleDay.map(item=>(<p  key={Math.random()}>{item}</p>))})}`|

##

### RangePicker

#### Props
|Prop name|Description|Default value|Example values|
|----|----|----|----|
|handleChange| is a function that return an array of days|n/a|`(days) => console.log('selected days',days)`|
|selectedDays|the initial range date|`{from:'',to:''}`|`{from:'2019-12-12',to:'2019-12-18'}`|
|jalali|choice jalali or gregorian calendar|`false`|`false`/`true`|
|numberOfMonths|number of months you need|`1`|`2`|
|hoverable|change range date when user hover day |`true`|`true`/`false`
|disabledDays|the disabled days that you don't want clickable|`[]`|`['2019-11-04',2019-12-14]`|
|responsive|custom responsive is function and have a argument for change number of month, when using it, `numberOfMonths` props not working |n/a|(setNumberOfMonth => setNumberOfMonth(3))|
|disabledBeforToday|disabled days before today|`true`|`true`/`false`|
|disabled|disabled date picker|`false`|`true`/`false`|
|dayComponent|custom day component|n/a| `Day  =  ({  day  })  =><p>{day.format('DD')}</p>`|
|titleComponent|custom title of days week|n/a|`const Title=({source  })=>{let  titleDay  =  ['Su',  'Mo',  'Tu',  'We',  'Th',  'Fr',  'Sa']return  ({titleDay.map(item=>(<p  key={Math.random()}>{item}</p>))})}`|

#### special thanks to:

 - [@amiiiirhassan](https://github.com/amiiiirhassan)
 - [@mpourismaiel](https://github.com/mpourismaiel)

## Contributors
feel free to contribute.

## License

The GNU GPLv3 License.

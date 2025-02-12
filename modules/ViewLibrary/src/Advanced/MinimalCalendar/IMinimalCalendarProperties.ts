import { ILocale } from './ILocale.js';
import { CalendarTypes } from './CalendarTypes.js';
import { CalendarViews } from './CalendarViews.js';

export interface IMinimalCalendarProperties{
    name:string,
    landscape:boolean,
    yearsInMonthView:boolean,
    title:string
    subTitle:string
    todayBtn:boolean
    minimal:boolean
    locale: ILocale
    calendarType:CalendarTypes
    defaultYearMonth:string
    defaultView: CalendarViews
    options: Array<string> | void
    mutliple:boolean
    range:boolean
    dark:boolean
    disabled:boolean
}
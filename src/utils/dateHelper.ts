import dayjs, { OpUnitType } from 'dayjs';
import 'dayjs/locale/nb';
import LocalizedFormatPlugin from 'dayjs/plugin/localizedFormat';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

export type ParseableDate = string | number | Date | dayjs.Dayjs;
export type DateInput = ParseableDate | null;

dayjs.extend(isBetweenPlugin);
dayjs.extend(LocalizedFormatPlugin);
dayjs.locale('nb');

export interface ParserOptions {
  utc?: boolean;
  format?: string;
}

export class DateRangeValue {
  constructor(public readonly from: DateInput, public readonly to: DateInput) {}
  get valid() {
    return this.isValid();
  }

  isValid(allowNull = true, allowSame = true, unit: OpUnitType = 'day') {
    if (this.from === null || this.to === null) {
      return allowNull;
    }
    const dateFrom = dayjs(this.from);
    const dateTo = dayjs(this.to);
    if (dateFrom.isValid() && dateTo.isValid()) {
      return dateFrom.isSame(dateTo, unit)
        ? allowSame
        : dateTo.isAfter(dateFrom, unit);
    }
    return false;
  }

  compare({ from, to }: DateRangeValue, unit: OpUnitType = 'day') {
    return (
      dayjs(this.from || '').isSame(dayjs(from || ''), unit) &&
      dayjs(this.to || '').isSame(dayjs(to || ''), unit)
    );
  }
}

export const parseDate = (
  datetime: ParseableDate,
  { format, utc }: ParserOptions = { utc: true },
): dayjs.Dayjs => {
  datetime =
    typeof datetime === 'string'
      ? datetime
          .toString()
          // remove last digits, js only parse milliseconds
          .replace(/(^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})(\d*)$/, '$1')
      : datetime;
  return dayjs(datetime, { utc, format });
};

export const hasDateChanged = (a: DateInput, b: DateInput): boolean => {
  if (a === null || b === null) {
    return a !== b;
  }
  const date = dayjs(a);
  return date.isValid() && !date.isSame(b, 'day');
};

export const isDateValid = (date: DateInput, allowNull?: boolean): boolean =>
  !date ? !!allowNull : dayjs(date).isValid();

export const isSameOrBefore = (
  point: ParseableDate,
  match: ParseableDate,
  unit: OpUnitType = 'day',
): boolean => {
  const date = dayjs(point);
  return (
    (date.isValid() && date.isSame(match, unit)) || date.isBefore(match, unit)
  );
};

export const isSameOrAfter = (
  point: ParseableDate,
  match: ParseableDate,
  unit: OpUnitType = 'day',
): boolean => {
  const date = dayjs(point);
  return (
    (date.isValid() && date.isSame(match, unit)) || date.isAfter(match, unit)
  );
};

export const getShortDate = (
  datetime: string,
  options?: ParserOptions,
): string => parseDate(datetime, options).format('L');

export const getTime = (datetime: string, options?: ParserOptions): string =>
  parseDate(datetime, options).format('[kl.] LT');

export const getFullDate = (
  datetime: string,
  options?: ParserOptions,
): string => parseDate(datetime, options).format('LLL');

export const getExcelDateTime = (
  datetime: string,
  options?: ParserOptions,
): string => parseDate(datetime, options).format('L HH:mm');

export { dayjs as DateTime };
export default dayjs;

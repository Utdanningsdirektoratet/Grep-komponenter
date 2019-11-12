import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';

export type ParseableDate = string | number | Date | Dayjs;
export type DateInput = ParseableDate | null;

dayjs.extend(isBetweenPlugin);

export const hasDateChanged = (a: DateInput, b: DateInput) => {
    if (a === null || b === null) {
        return a !== b;
    }
    const date = dayjs(a);
    return date.isValid() && !date.isSame(b);
};

export const isDateValid = (date: DateInput, allowNull?: boolean) =>
    !date ? allowNull : dayjs(date).isValid();

export const getShortDate = (datetime: string) => dayjs(datetime).format('L');
export const getTime = (datetime: string) => dayjs(datetime).format('[kl.] LT');
export const getFullDate = (datetime: string) => dayjs(datetime).format('LLL');
export const getExcelDateTime = (datetime: string) => dayjs(datetime).format('L HH:mm');

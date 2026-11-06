import { useState } from 'react';

import DateTime, {
  hasDateChanged,
  parseDate,
  ParseableDate,
} from '../utils/dateHelper';

export type DateInput = ParseableDate | null;
export type DateState = DateTime.Dayjs | null;

export const defaultOptions = {
  utc: true,
  preserveTime: false,
};

export const useDate = (
  value: DateInput = null,
  options?: typeof defaultOptions,
): [DateState, (next: DateInput) => void] => {
  const { utc, preserveTime } = { ...options, ...defaultOptions };

  const getDate = (value: DateInput) => {
    if (value) {
      const date = DateTime(value);
      return preserveTime ? date : date.startOf('day');
    }
    return null;
  };

  const [date, setDate] = useState<DateState>(() =>
    getDate(value ? parseDate(value, { utc }) : null),
  );
  const [previousInput, setPreviousInput] = useState({ value, utc });

  const _setDate = (next: DateInput): void => {
    const nextDate = getDate(next);
    hasDateChanged(date, nextDate) && setDate(nextDate);
  };

  // Synchronize before children render so MUI does not reset partially entered dates.
  if (!Object.is(previousInput.value, value) || previousInput.utc !== utc) {
    setPreviousInput({ value, utc });
    _setDate(value ? parseDate(value, { utc }) : null);
  }
  return [date, _setDate];
};

export default useDate;

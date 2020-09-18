import { useState, useCallback, useMemo } from 'react';

import DateTime, { hasDateChanged, parseDate } from '../utils/dateHelper';

import { ParseableDate } from '../utils/dateHelper';

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

  const [date, _setDate] = useState<DateState>(null);

  const getDate = useCallback(
    (value: any) => {
      if (value) {
        const date = DateTime(value);
        return preserveTime ? date : date.startOf('day');
      }
      return null;
    },
    [preserveTime],
  );

  const setDate = (next: DateInput): void => {
    const nextDate = getDate(next);
    hasDateChanged(date, nextDate) && _setDate(nextDate);
  };

  useMemo(() => setDate(value ? parseDate(value, { utc }) : null), [
    value,
    utc,
  ]);
  return [date, setDate];
};

export default useDate;

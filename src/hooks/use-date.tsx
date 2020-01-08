import { useState, useCallback, useMemo } from 'react';

import DateTime, { hasDateChanged } from '../utils/dateHelper';

import { ParseableDate } from '../utils/dateHelper';

export type DateInput = ParseableDate | null;
export type DateState = DateTime.Dayjs | null;

export const useDate = (
  value: DateInput = null,
  utc = true,
): [DateState, (next: DateInput) => void] => {
  const [date, _setDate] = useState<DateState>(null);
  const setDate = useCallback(
    (next: DateInput): void => {
      if (hasDateChanged(next, date)) {
        _setDate(next ? DateTime(next) : null);
      }
    },
    [date],
  );
  useMemo(() => setDate(value ? DateTime(value, { utc }) : null), [value, utc]);
  return [date, setDate];
};

export default useDate;

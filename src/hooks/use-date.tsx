import { useMemo, useState } from 'react';

import DateTime from '../utils/dateHelper';

import { hasDateChanged, ParseableDate } from '../utils/dateHelper';

export type DateInput = ParseableDate | null;
export type DateState = DateTime.Dayjs | null;

export const useDate = (
  value: DateInput = null,
  utc = true,
): [DateState, (next: DateInput) => void] => {
  const [date, _setDate] = useState<DateState>(null);
  const setDate = (next: DateInput): void => {
    if (hasDateChanged(next, date)) {
      _setDate(next ? DateTime(next) : null);
    }
  };
  useMemo(() => setDate(value ? DateTime(value, { utc }) : null), [value]);
  return [date, setDate];
};

export default useDate;

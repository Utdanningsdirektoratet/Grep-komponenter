import { useState, useCallback, useMemo } from 'react';

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

  const [date, setDate] = useState<DateState>(null);

  const getDate = useCallback(
    (value: DateInput) => {
      if (value) {
        const date = DateTime(value);
        return preserveTime ? date : date.startOf('day');
      }
      return null;
    },
    [preserveTime],
  );

  const _setDate = (next: DateInput): void => {
    const nextDate = getDate(next);
    hasDateChanged(date, nextDate) && setDate(nextDate);
  };

  // eslint-disable-next-line @eslint-react/use-memo
  useMemo(
    () => _setDate(value ? parseDate(value, { utc }) : null),
    [value, utc],
  );
  return [date, _setDate];
};

export default useDate;

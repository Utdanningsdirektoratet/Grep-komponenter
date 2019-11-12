import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import {hasDateChanged, ParseableDate} from '../utils/dateHelper';

export type DateInput = ParseableDate | null;
export type DateState = Dayjs | null;

export const useDate = (
    value: DateInput = null
): [DateState, (next: DateInput) => void] => {
    const [date, _setDate] = useState<DateState>(null);
    const setDate = (next: DateInput) => {
        if (hasDateChanged(next, date)) {
            _setDate(next ? dayjs(next) : null);
        }
    };
    useMemo(() => setDate(value!), [value]);
    return [date, setDate];
};

export default useDate;

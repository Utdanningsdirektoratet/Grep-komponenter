import React, { useRef, useState } from 'react';
import type { Dayjs } from 'dayjs';
import type { FieldRef } from '@mui/x-date-pickers/models';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePickerProps,
  DateValidationError,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextFieldProps } from '@mui/material';

import {
  DEFAULT_MIN_DATE,
  DEFAULT_MAX_DATE,
  ParseableDate,
} from '../../utils/dateHelper';
import { useDate } from '../../hooks';

type InputProps = Pick<
  TextFieldProps,
  | 'id'
  | 'variant'
  | 'label'
  | 'fullWidth'
  | 'helperText'
  | 'required'
  | 'margin'
  | 'sx'
>;

export interface GrepDatePickerProps
  extends Omit<DatePickerProps, 'value' | 'renderInput'>, InputProps {
  value?: ParseableDate | null;
  errorMessage?: string;
  clearable?: boolean;
}

export const GrepDatePicker: React.FunctionComponent<GrepDatePickerProps> = ({
  id,
  label,
  value,
  variant,
  errorMessage,
  fullWidth,
  required,
  margin,
  sx,
  clearable,
  minDate = DEFAULT_MIN_DATE,
  maxDate = DEFAULT_MAX_DATE,
  onError,
  ...props
}) => {
  const [date, setDate] = useDate(value);
  const [error, setError] = useState<DateValidationError>(null);
  const fieldRef = useRef<FieldRef<Dayjs | null> | null>(null);
  const wasSectionEmptyRef = useRef(false);

  const handleDeleteKeyDownCapture = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.repeat) {
      return;
    }

    const field = fieldRef.current;
    const sectionIndex = field?.getActiveSectionIndex();

    wasSectionEmptyRef.current =
      field !== null &&
      sectionIndex != null &&
      field.getSections()[sectionIndex]?.value === '';
  };

  const handleDeleteKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!wasSectionEmptyRef.current) {
      return;
    }
    if (
      (event.key !== 'Backspace' && event.key !== 'Delete') ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      event.nativeEvent.isComposing ||
      props.disabled ||
      props.readOnly
    ) {
      return;
    }

    const field = fieldRef.current;
    const sectionIndex = field?.getActiveSectionIndex();

    if (!field || sectionIndex == null) {
      return;
    }

    const sections = field.getSections();
    const section = sections[sectionIndex];

    if (!section || section.value !== '') {
      return;
    }

    if (sections.every((item) => item.value === '')) {
      field.setSelectedSections(0);
      return;
    }

    const nextIndex = sectionIndex + (event.key === 'Backspace' ? -1 : 1);

    if (nextIndex >= 0 && nextIndex < sections.length) {
      field.setSelectedSections(nextIndex);
    }
  };

  const validationMessage =
    error === 'maxDate'
      ? `Dato må være før ${maxDate.add(1, 'day').format('DD/MM/YYYY')}`
      : error === 'minDate'
        ? `Dato må være etter ${minDate.subtract(1, 'day').format('DD/MM/YYYY')}`
        : error
          ? 'Ugyldig dato'
          : undefined;

  const helperText = errorMessage || validationMessage || props.helperText;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'nb'}>
      <DatePicker
        format="DD/MM/YYYY"
        minDate={minDate}
        maxDate={maxDate}
        onError={(reason, invalidValue) => {
          setError(reason);
          onError?.(reason, invalidValue);
        }}
        value={date}
        onChange={setDate}
        slotProps={{
          field: {
            fieldRef,
            clearable: !!clearable,
            onClear: () => setDate(null),
          },
          textField: {
            onKeyDownCapture: handleDeleteKeyDownCapture,
            onKeyUp: handleDeleteKeyUp,
            id: id,
            label: label,
            variant: variant,
            required: required,
            fullWidth: fullWidth,
            sx: sx,
            margin: margin,
            error: !!error || !!errorMessage,
            ...(helperText && { helperText }),
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default GrepDatePicker;

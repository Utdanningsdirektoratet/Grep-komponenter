import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { ParseableDate } from '../../../utils';
import DatePicker from '..';

type Props = {
  error?: boolean;
};

const Component: React.FC<Props> = ({ error }) => {
  const [value, setValue] = React.useState<ParseableDate | null>();

  return (
    <DatePicker
      id="DatePickerTest"
      label="DatePickerTest"
      helperText="HelperTextTest"
      errorMessage={error ? 'ErrorMessageTest' : undefined}
      value={value}
      onChange={(date) => {
        setValue(date);
      }}
    />
  );
};

describe('GrepDatePicker', () => {
  it('should render correctly (closed with helper text)', () => {
    const { getByText, getByLabelText } = render(<Component />);
    expect(getByText('HelperTextTest')).toBeInTheDocument();
    expect(getByLabelText('DatePickerTest')).toBeInTheDocument();
  });

  it('should render correctly (closed with error message)', () => {
    const { getByText, getByLabelText } = render(<Component error />);
    expect(getByText('ErrorMessageTest')).toBeInTheDocument();
    expect(getByLabelText('DatePickerTest')).toBeInTheDocument();
  });

  it('should handle open/close', async () => {
    const { getByRole } = render(<Component />);

    expect(screen.queryByRole('dialog')).toBeFalsy();

    // Open datepicker
    userEvent.click(getByRole('button', { name: 'Choose date' }));

    const dialog = getByRole('dialog');
    expect(dialog).toBeVisible();

    // Close dialog
    userEvent.keyboard('{esc}');

    await waitForElementToBeRemoved(dialog);
  });

  it('should open with todays date selected', () => {
    const { getByText, getByRole } = render(<Component />);

    const today = dayjs().format('D. MMM YYYY');
    const month = dayjs().format('MMMM');
    const year = dayjs().format('YYYY');

    // Open datepicker
    userEvent.click(getByRole('button', { name: 'Choose date' }));

    expect(getByText(month)).toBeInTheDocument();
    expect(getByText(year)).toBeInTheDocument();

    expect(getByRole('button', { name: today })).toHaveClass(
      'MuiPickersDay-today',
    );
  });

  it('should handle picking a date', async () => {
    const { getByRole, getByText } = render(<Component />);

    const date = dayjs().set('date', 13);
    const dateToSelect = date.format('DD/MM/YYYY');

    // Open datepicker
    userEvent.click(getByRole('button', { name: 'Choose date' }));

    // Select date by day (13th)
    userEvent.click(getByText(date.format('D')));

    await waitForElementToBeRemoved(() => screen.queryAllByRole('dialog'));

    expect(getByRole('textbox')).toHaveValue(dateToSelect);
  });

  it('should handle keyboard input', () => {
    const { getByRole } = render(<Component />);

    userEvent.tab();
    userEvent.keyboard('qwerty');
    userEvent.keyboard('13121993');

    expect(getByRole('textbox')).toHaveValue('13/12/1993');
  });
});

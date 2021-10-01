import * as React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { ParseableDate } from '../../utils';
import DatePicker from './DatePicker';

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
    const { findByText, getByRole } = render(<Component />);

    expect(screen.queryByRole('dialog')).toBeFalsy();

    userEvent.click(getByRole('button'));

    expect(await findByText('Clear')).toBeInTheDocument();
    expect(await findByText('Cancel')).toBeInTheDocument();
    expect(await findByText('OK')).toBeInTheDocument();

    userEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitForElementToBeRemoved(() => screen.queryAllByRole('dialog'));
  });

  it('should open with todays date selected', () => {
    const { getByText, getByRole } = render(<Component />);

    const date = dayjs().format('D');
    const monthAndYear = dayjs().format('MMMM YYYY');

    userEvent.click(getByRole('button'));

    expect(getByText(monthAndYear)).toBeInTheDocument();
    expect(getByRole('button', { name: date })).toHaveClass(
      'MuiPickersDay-daySelected',
    );
  });

  it('should handle picking a date', async () => {
    const { getByRole } = render(<Component />);
    const date = dayjs().set('date', 13);
    const dateToSelect = date.format('DD/MM/YYYY');

    userEvent.click(getByRole('button'));
    userEvent.click(getByRole('button', { name: date.format('D') }));
    userEvent.click(getByRole('button', { name: 'OK' }));

    await waitForElementToBeRemoved(() => screen.queryAllByRole('dialog'));

    expect(screen.getByDisplayValue(dateToSelect)).toBeInTheDocument();
  });

  it('should handle keyboard input', () => {
    render(<Component />);

    userEvent.tab();
    userEvent.keyboard('qwerty');
    userEvent.keyboard('13121993');

    expect(screen.getByDisplayValue('13/12/1993')).toBeInTheDocument();
  });
});

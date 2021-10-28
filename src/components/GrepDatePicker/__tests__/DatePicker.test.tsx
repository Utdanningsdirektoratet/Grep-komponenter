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

    userEvent.click(getByRole('button'));

    const clearBtn = getByRole('button', { name: 'Clear' });
    const cancelBtn = getByRole('button', { name: 'Cancel' });
    const okBtn = getByRole('button', { name: 'OK' });

    expect(clearBtn).toBeVisible();
    expect(cancelBtn).toBeVisible();
    expect(okBtn).toBeVisible();

    userEvent.click(cancelBtn);

    await waitForElementToBeRemoved(() => screen.queryAllByRole('dialog'));
  }, 15000);

  it('should open with todays date selected', () => {
    const { getByText, getByRole, getAllByRole } = render(<Component />);

    const date = dayjs().format('D');
    const monthAndYear = dayjs().format('MMMM YYYY');

    userEvent.click(getByRole('button'));

    expect(getByText(monthAndYear)).toBeInTheDocument();

    const buttons = getAllByRole('button', { name: date }).filter(
      (b) => !b.className.includes('MuiPickersDay-hidden'),
    );

    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveClass('MuiPickersDay-daySelected');
  });

  it('should handle picking a date', async () => {
    const { getByRole, getByText } = render(<Component />);

    const date = dayjs().set('date', 13);
    const dateToSelect = date.format('DD/MM/YYYY');

    userEvent.click(getByRole('button'));

    userEvent.click(getByText(date.format('D')));
    userEvent.click(getByText('OK'));

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

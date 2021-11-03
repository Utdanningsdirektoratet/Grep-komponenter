import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GrepDateRange from '..';
import { DatePickerProps } from '../../GrepDatePicker';

const fromDateProps: Omit<DatePickerProps, 'onChange'> = {
  label: 'from',
};

const toDateProps: Omit<DatePickerProps, 'onChange'> = {
  label: 'to',
};

const Component: React.FC = () => {
  return (
    <GrepDateRange
      from={fromDateProps}
      to={toDateProps}
      onChange={() => undefined}
    />
  );
};

describe('GrepDateRange', () => {
  it('should render correctly', () => {
    const { getByLabelText } = render(<Component />);
    expect(getByLabelText(String(fromDateProps.label))).toBeInTheDocument();
    expect(getByLabelText(String(toDateProps.label))).toBeInTheDocument();
  });

  it('should warn about overlapping dates', () => {
    const { getByText, getByLabelText } = render(<Component />);

    userEvent.click(getByLabelText(String(fromDateProps.label)));
    userEvent.keyboard('13121993');

    userEvent.click(getByLabelText(String(toDateProps.label)));
    userEvent.keyboard('12121993');

    expect(getByText(/dato må være før/i)).toBeInTheDocument();
    expect(getByText(/dato må være etter/i)).toBeInTheDocument();

    expect(getByText(String(fromDateProps.label))).toHaveClass('Mui-error');
    expect(getByText(String(toDateProps.label))).toHaveClass('Mui-error');
  });

  it('should not allow selecting date before from-date', () => {
    const { getByRole, getByLabelText, getAllByRole } = render(<Component />);

    const btns = getAllByRole('button');

    userEvent.click(getByLabelText(String(fromDateProps.label)));
    userEvent.keyboard('13121993');

    userEvent.click(getByLabelText(String(toDateProps.label)));
    userEvent.keyboard('14121993');

    userEvent.click(btns[1]);

    expect(getByRole('button', { name: /12/i }).className).toContain(
      'dayDisabled',
    );

    expect(getByRole('button', { name: /15/i }).className).not.toContain(
      'dayDisabled',
    );
  });

  it('should not allow selecting date after to-date', () => {
    const { getByRole, getByLabelText, getAllByRole } = render(<Component />);

    const btns = getAllByRole('button');

    userEvent.click(getByLabelText(String(fromDateProps.label)));
    userEvent.keyboard('13121993');

    userEvent.click(getByLabelText(String(toDateProps.label)));
    userEvent.keyboard('14121993');

    userEvent.click(btns[0]);

    expect(getByRole('button', { name: /15/i }).className).toContain(
      'dayDisabled',
    );

    expect(getByRole('button', { name: /12/i }).className).not.toContain(
      'dayDisabled',
    );
  });
});

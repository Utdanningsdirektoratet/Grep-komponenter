import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GrepDateRange from '..';
import { GrepDatePickerProps } from '../../GrepDatePicker';

const fromDateProps: Omit<GrepDatePickerProps, 'onChange'> = {
  label: 'from',
};

const toDateProps: Omit<GrepDatePickerProps, 'onChange'> = {
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
  const user = userEvent.setup();
  it('should render correctly', () => {
    const { getByLabelText } = render(<Component />);
    expect(
      getByLabelText(String(fromDateProps.label), { selector: 'div' }),
    ).toBeInTheDocument();
    expect(
      getByLabelText(String(toDateProps.label), { selector: 'div' }),
    ).toBeInTheDocument();
  });

  it('should warn about overlapping dates', async () => {
    const { getByText, getByLabelText } = render(<Component />);

    await user.click(
      getByLabelText(String(fromDateProps.label), { selector: 'div' }),
    );
    await user.keyboard('13121993');

    await user.click(
      getByLabelText(String(toDateProps.label), { selector: 'div' }),
    );
    await user.keyboard('12121993');

    expect(getByText(/dato må være før/i)).toBeInTheDocument();
    expect(getByText(/dato må være etter/i)).toBeInTheDocument();

    expect(
      getByText(String(fromDateProps.label), { ignore: 'span' }),
    ).toHaveClass('Mui-error');

    expect(
      getByText(String(toDateProps.label), { ignore: 'span' }),
    ).toHaveClass('Mui-error');
  });

  it('should not allow selecting date before from-date', async () => {
    const { getByLabelText, getAllByRole, getByText } = render(<Component />);

    const btns = getAllByRole('button');

    await user.click(
      getByLabelText(String(fromDateProps.label), { selector: 'div' }),
    );
    await user.keyboard('13121993');

    await user.click(
      getByLabelText(String(toDateProps.label), { selector: 'div' }),
    );
    await user.keyboard('14121993');

    await user.click(btns[1]);

    expect(getByText('12', { selector: 'button' }).className).toContain(
      'disabled',
    );

    expect(getByText('15', { selector: 'button' }).className).not.toContain(
      'disabled',
    );
  });

  it('should not allow selecting date after to-date', async () => {
    const { getByLabelText, getAllByRole, getByText } = render(<Component />);

    const btns = getAllByRole('button');

    await user.click(
      getByLabelText(String(fromDateProps.label), { selector: 'div' }),
    );
    await user.keyboard('13121993');

    await user.click(
      getByLabelText(String(toDateProps.label), { selector: 'div' }),
    );
    await user.keyboard('14121993');

    await user.click(btns[0]);

    expect(getByText('15', { selector: 'button' }).className).toContain(
      'disabled',
    );
    expect(getByText('12', { selector: 'button' }).className).not.toContain(
      'disabled',
    );
  });
});

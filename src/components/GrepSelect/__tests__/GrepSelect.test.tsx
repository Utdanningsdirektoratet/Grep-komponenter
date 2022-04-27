import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GrepSelect, { SelectItem, GrepSelectProps } from '..';

const selectItems: SelectItem[] = [
  {
    value: 'Testitem #1',
  },
  {
    value: 'Testitem #2',
    label: 'Custom label',
  },
];

const Component: React.FC<Partial<GrepSelectProps>> = ({ error, ...props }) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <GrepSelect
      {...props}
      id="Test"
      label="Test"
      selectItems={selectItems}
      value={selected}
      onChange={(e) => setSelected(e.target.value as string)}
      helperText="HelpTextTest"
      errorMessage={error ? 'ErrorMessageTest' : undefined}
    />
  );
};

describe('GrepSelect', () => {
  it('should render correctly (closed)', () => {
    const { getByText, getByLabelText } = render(<Component />);
    expect(getByLabelText('Test')).toBeInTheDocument();
    expect(getByText('HelpTextTest')).toBeInTheDocument();
    expect(screen.queryAllByRole('option').length).toBe(0);
  });

  it('should render correctly with error', () => {
    const { getByText } = render(<Component error />);
    expect(getByText('ErrorMessageTest')).toBeInTheDocument();
    expect(getByText('ErrorMessageTest')).toHaveClass('Mui-error');
  });

  it('should handle open/close', async () => {
    const { getAllByRole } = render(<Component />);
    const user = userEvent.setup();

    await user.tab();
    await user.keyboard('{Enter}');

    const options = getAllByRole('option');
    expect(options[0].textContent).toBe('Fjern valgt');
    expect(options[1].textContent).toBe('Testitem #1');
    expect(options[2].textContent).toBe('Custom label');
  });

  /*it('should handle selecting', async () => {
    const { getByText } = render(<Component />);
    const user = userEvent.setup();

    await user.tab();
    await user.keyboard('{Enter}');
    await user.click(getByText('Testitem #1'));

    await waitForElementToBeRemoved(getByText('Fjern valgt'));

    expect(screen.queryAllByRole('option').length).toBe(0);
    expect(getByText('Testitem #1')).toBeInTheDocument();
  });*/

  it('should render correctly with outline', () => {
    const { getByRole } = render(<Component outlined />);
    expect(getByRole('button').className.toLowerCase()).toContain('outlined');
  });

  it('should render correctly with small size', () => {
    const { getByRole } = render(<Component size="small" />);
    expect(getByRole('button').className.toLowerCase()).toContain('small');
  });
});

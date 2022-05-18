import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GrepInput from '../';

describe('GrepInput', () => {
  const user = userEvent.setup();
  it('should render correctly with label', () => {
    const { getByLabelText } = render(<GrepInput id="Test" label="Test" />);
    expect(getByLabelText('Test')).toBeInTheDocument();
  });

  it('should render correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<GrepInput placeholder="Test" />);
    expect(getByPlaceholderText('Test')).toBeInTheDocument();
  });

  it('should render correctly with helptext', () => {
    const { getByText } = render(<GrepInput helperText="Test" />);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should render correctly with error message', () => {
    const { getByText } = render(<GrepInput errorMessage="Test" />);
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByText('Test')).toHaveClass('Mui-error');
  });

  it('should handle input (single line)', async () => {
    const { getByDisplayValue } = render(<GrepInput />);

    await user.tab();
    await user.keyboard('{enter}');
    await user.keyboard('some test input');

    expect(getByDisplayValue('some test input')).toBeInTheDocument();
  });

  it('should handle input (multi line)', async () => {
    const { container } = render(<GrepInput multiline />);

    await user.tab();
    await user.keyboard('{enter}');
    await user.keyboard('some test input');

    expect(container.querySelector('textarea')).toHaveValue(
      '\nsome test input',
    );
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GrepInput from '../';

describe('GrepInput', () => {
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

  it('should handle input (single line)', () => {
    const { getByDisplayValue } = render(<GrepInput />);

    userEvent.tab();
    userEvent.keyboard('{enter}');
    userEvent.keyboard('some test input');

    expect(getByDisplayValue('some test input')).toBeInTheDocument();
  });

  it('should handle input (multi line)', () => {
    const { container } = render(<GrepInput multiline />);

    userEvent.tab();
    userEvent.keyboard('{enter}');
    userEvent.keyboard('some test input');

    expect(container.querySelector('textarea')).toHaveValue(
      '\nsome test input',
    );
  });
});

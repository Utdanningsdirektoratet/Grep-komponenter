import React from 'react';
import { render } from '@testing-library/react';

import LoadingOverlay, { LoadingOverlayProps } from '..';
import Button from '@mui/material/Button';

import userEvent from '@testing-library/user-event';

const Component: React.FC<Partial<LoadingOverlayProps>> = (props) => {
  const [show, setShow] = React.useState(
    props.show === undefined ? true : props.show,
  );

  return (
    <div>
      <LoadingOverlay data-testid="overlay" show={show} {...props}>
        <p>Content</p>
      </LoadingOverlay>
      <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
    </div>
  );
};

describe('LoadingOverlay', () => {
  const user = userEvent.setup();
  it('should render correctly', () => {
    const { getByTestId } = render(<Component />);
    expect(getByTestId('overlay')).toBeVisible();
  });

  it('should render correctly when hidden', () => {
    const { getByTestId } = render(<Component show={false} />);
    expect(getByTestId('overlay')).not.toBeVisible();
  });

  it('should render correctly with custom overlay', () => {
    const { getByTestId } = render(<Component overlay="rgb(255, 0, 0)" />);
    expect(getByTestId('overlay')).toHaveStyle(
      'background-color: rgb(255, 0, 0)',
    );
  });

  it('should render correctly with minHeight', () => {
    const { getByTestId } = render(<Component minHeight={400} />);
    expect(getByTestId('overlay')).toHaveStyle('min-height: 400px');
  });

  it('should render correctly with minTime', async () => {
    const { getByTestId, getByRole } = render(<Component minTime={500} />);

    expect(getByTestId('overlay')).toHaveStyle({
      transition: 'opacity 0ms ease',
      opacity: 1,
    });

    await user.click(getByRole('button', { name: /hide/i }));

    expect(getByTestId('overlay')).toHaveStyle({
      transition: 'opacity 500ms ease',
      opacity: 0,
    });
  });
});

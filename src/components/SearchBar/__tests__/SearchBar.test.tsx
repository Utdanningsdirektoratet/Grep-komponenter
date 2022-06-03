import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

import SearchBar, { SearchBarProps } from '..';

const mockFn = jest.fn();

const Component: React.FC<Partial<SearchBarProps>> = (props) => {
  return (
    <SearchBar
      onInputChange={mockFn}
      helpText={'HelptextTest'}
      placeholder={'PlaceholderTest'}
      onClear={() => mockFn('cleared')}
      {...props}
    />
  );
};

describe('SearchBar', () => {
  const user = userEvent.setup();
  it('should render correctly', () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Component />,
    );

    expect(getByRole('textbox')).toBeVisible();
    expect(getByText('HelptextTest')).toBeVisible();
    expect(getByPlaceholderText('PlaceholderTest')).toBeVisible();
  });

  it('should render correctly with outline', () => {
    const { getByTestId } = render(<Component outlined />);

    expect(getByTestId('searchBarContainer')).toHaveStyle(
      'border: 1px solid #e0e0e0',
    );
  });

  it('should handle text input and clearing', async () => {
    const { getByTestId, getByRole, queryByTestId } = render(<Component />);

    const input = getByRole('textbox');

    expect(queryByTestId('searchBarClearBtn')).toBeFalsy();

    await user.click(input);
    await user.keyboard('test 123');

    expect(mockFn).toHaveBeenCalledWith('test 123');

    const clearBtn = getByTestId('searchBarClearBtn');
    expect(clearBtn).toBeVisible();
    await user.click(clearBtn);

    expect(mockFn).toHaveBeenCalledWith('cleared');
    expect(input).toHaveValue('');
  });

  it("should handle 'onSearchAll'", async () => {
    const { getByRole } = render(
      <Component
        searchAllText="Search all text"
        onSearchAll={() => mockFn('search all')}
      />,
    );

    const searchAllBtn = getByRole('button', { name: /search all text/i });

    expect(searchAllBtn).toBeVisible();

    await user.click(searchAllBtn);

    expect(mockFn).toHaveBeenCalledWith('search all');
  });

  it("should handle 'autoFocus'", () => {
    const { getByRole } = render(<Component autoFocus />);
    expect(getByRole('textbox')).toHaveFocus();
  });
});

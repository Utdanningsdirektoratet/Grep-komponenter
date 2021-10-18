import * as React from 'react';
import { render } from '@testing-library/react';

import GrepTableCard from '..';
import { TableColumn } from '../../GrepTable';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();

const columns: TableColumn<string>[] = [
  {
    label: 'Column #1',
    getCell: (row) => row,
  },
];

const Component: React.FC = () => {
  return (
    <GrepTableCard
      title="Test title"
      data={['Row #1']}
      columns={columns}
      onRowClick={mockFn}
    />
  );
};

describe('GrepTableCard', () => {
  it('should render correctly', () => {
    const { getByRole, getByText } = render(<Component />);

    expect(getByText('Test title')).toBeVisible();
    expect(getByRole('table')).toBeInTheDocument();
  });

  it('should handle row click', () => {
    const { getByRole } = render(<Component />);

    userEvent.click(getByRole('row', { name: /row #1/i }));
    expect(mockFn).toHaveBeenCalledWith('Row #1');
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SortableTable from './table';

interface TestData {
  id: number;
  name: string;
}

const mockFn = jest.fn();

const Component = () => {
  const createData = (id: number, name: string): TestData => ({
    id,
    name,
  });

  let index = 0;

  const rows = [
    createData(index++, 'row1'),
    createData(index++, 'row2'),
    createData(index++, 'row3'),
  ];

  return (
    <SortableTable
      items={rows}
      onChange={mockFn}
      columns={['name']}
      identify={(item: TestData) => String(item.id)}
    />
  );
};

describe('SortableTable', () => {
  it('should render correctly', () => {
    const { getByRole, getAllByRole } = render(<Component />);
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(4); // includes header-row
    expect(getByRole('columnheader', { name: /name/i })).toBeVisible();
  });

  it('should handle drag and drop', () => {
    const { getAllByRole } = render(<Component />);
    const rows = getAllByRole('row');

    expect(rows[1].textContent).toBe('row1');
    expect(rows[2].textContent).toBe('row2');
    expect(rows[3].textContent).toBe('row3');

    userEvent.tab();
    userEvent.keyboard('{space}');
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{space}');

    expect(rows[2].textContent).toBe('row2');
    expect(rows[3].textContent).toBe('row3');
    expect(rows[1].textContent).toBe('row1');

    userEvent.tab({ shift: true });
    userEvent.keyboard('{space}');
    userEvent.keyboard('{arrowup}');
    userEvent.keyboard('{space}');

    expect(rows[3].textContent).toBe('row3');
    expect(rows[2].textContent).toBe('row2');
    expect(rows[1].textContent).toBe('row1');

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

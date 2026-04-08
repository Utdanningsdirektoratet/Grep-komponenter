import React from 'react';
import { render } from '@testing-library/react';

import GrepTable, { GrepTableProps, TableColumn } from '..';
import { DropdownMenuItem } from '../../DropdownMenu';
import userEvent from '@testing-library/user-event';

const columns: TableColumn<string>[] = [
  {
    label: 'Column #1',
    colDef: 'col1',
    sortable: true,
    getCell: (row) => row,
  },
];

const numberOfRows = 20;
const rowsPerPage = 5;

const mockFn = jest.fn();

const data = (): string[] =>
  new Array(numberOfRows).fill(null).map((_, id) => `row${id + 1}`);

const dropdownItems: DropdownMenuItem<string>[] = [
  {
    label: 'Dropdownitem #1',
    handleClick: mockFn,
  },
];

const Component: React.FC<Partial<GrepTableProps<string>>> = (props) => {
  return (
    <GrepTable
      header
      columns={columns}
      data={data()}
      onRowClick={mockFn}
      onSelectedRowChange={(row) => mockFn(`navigated to ${row}`)}
      {...props}
    />
  );
};

describe('GrepTable', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<Component />);

    expect(getByRole('table')).toBeVisible();

    expect(getByRole('columnheader', { name: /column #1/i })).toBeVisible();

    expect(getByRole('cell', { name: 'row1' })).toBeVisible();
  });

  it('should render with pagination', async () => {
    const { getByRole, getAllByRole, queryByRole } = render(
      <Component
        pagination
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />,
    );
    const user = userEvent.setup();

    expect(getAllByRole('row').length).toBe(rowsPerPage + 2);
    expect(getByRole('button', { name: /previous/i })).toBeVisible();
    expect(getByRole('button', { name: /next/i })).toBeVisible();
    expect(queryByRole('cell', { name: 'row1' })).toBeVisible();

    // Go to next page
    await user.click(getByRole('button', { name: /next/i }));

    expect(queryByRole('cell', { name: 'row1' })).not.toBeInTheDocument();

    // Change rows per page to "10"
    // PaginationElement
    expect(getByRole('combobox', { name: '' })).toBeVisible();
    await user.click(getByRole('combobox', { name: '' }));
    await user.click(getByRole('option', { name: '10' }));

    expect(getAllByRole('row').length).toBe(12);
    expect(queryByRole('cell', { name: 'row1' })).toBeVisible();
  });

  it('should render with dropdown-menus', async () => {
    const { getByRole, getAllByRole } = render(
      <Component dropdownItems={dropdownItems} />,
    );
    const user = userEvent.setup();

    const dropdownMenus = getAllByRole('button');
    expect(dropdownMenus.length).toBe(numberOfRows);

    await user.click(dropdownMenus[0]);

    expect(getByRole('menu')).toBeVisible();

    await user.click(getByRole('menuitem', { name: dropdownItems[0].label }));

    expect(mockFn.mock.lastCall[0]).toEqual('row1');
  });

  it('should render empty table with placeholder text', () => {
    const { getByRole } = render(
      <Component data={[]} placeholderText="placeholder" />,
    );
    expect(getByRole('cell', { name: /placeholder/i })).toBeVisible();
  });

  it('should render with caption', () => {
    const { getByText } = render(<Component caption="some caption" />);
    expect(getByText(/some caption/i)).toBeVisible();
  });

  it('should render without header', () => {
    const { queryByRole } = render(<Component header={undefined} />);

    expect(
      queryByRole('columnheader', { name: /column #1/i }),
    ).not.toBeVisible();
  });

  it('should handle row click', async () => {
    const { getByRole } = render(<Component />);
    const user = userEvent.setup();

    await user.click(getByRole('row', { name: /row3/i }));
    expect(mockFn.mock.lastCall[0]).toEqual('row3');
  });

  it('should handle custom row disabling', async () => {
    const { getByRole } = render(
      <Component isRowDisabled={(row) => row === 'row2'} />,
    );
    const user = userEvent.setup();

    const row1 = getByRole('row', { name: 'row1' });
    const row2 = getByRole('row', { name: 'row2' });

    expect(row1).toHaveStyle('cursor: pointer');
    expect(row2).not.toHaveStyle('cursor: pointer');

    await user.click(row1);
    expect(mockFn.mock.lastCall[0]).toEqual('row1');

    await user.click(row2);
    expect(mockFn.mock.lastCall[0]).not.toEqual('row2');
  });

  it('should handle menu disabling', () => {
    const { getAllByRole } = render(
      <Component
        dropdownItems={dropdownItems}
        menuDisabled={(row) => row === 'row2'}
      />,
    );

    const menuButtons = getAllByRole('button');
    expect(menuButtons[1]).toHaveClass('Mui-disabled');
    expect(menuButtons[0]).not.toHaveClass('Mui-disabled');
  });

  it('should handle menu tooltip', async () => {
    const { findByRole, getAllByRole } = render(
      <Component
        dropdownItems={dropdownItems}
        menuTooltip={(row) => `${row} tooltip`}
      />,
    );
    const user = userEvent.setup();

    await user.hover(getAllByRole('button')[1]);
    expect(await findByRole('tooltip', { name: 'row2 tooltip' })).toBeVisible();
  });
});

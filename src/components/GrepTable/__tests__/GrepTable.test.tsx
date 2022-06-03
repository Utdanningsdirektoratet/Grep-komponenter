import * as React from 'react';
import { render } from '@testing-library/react';

import GrepTable, { GrepTableProps, TableColumn } from '..';
import { DropdownMenuItem } from '../..';
import userEvent from '@testing-library/user-event';
import { delay } from 'lodash';

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

const Sortable: React.FC<Partial<GrepTableProps<string>>> = (props) => {
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(
    'asc',
  );

  const sortedData = data().sort((a, b) => {
    const aNum = Number(a.substr(3));
    const bNum = Number(b.substr(3));
    return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
  });

  return (
    <GrepTable
      header
      sortBy="col1"
      onSortBy={() =>
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      }
      columns={columns}
      data={sortedData}
      sortDirection={sortDirection}
      {...props}
    />
  );
};

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('GrepTable', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<Component />);

    expect(getByRole('table')).toBeVisible();

    expect(getByRole('columnheader', { name: /column #1/i })).toBeVisible();

    expect(getByRole('cell', { name: 'row1' })).toBeVisible();
  });

  it('should render with pagination', async () => {
    const { getByRole, getAllByRole, queryByRole } = render(
      <Component pagination rowsPerPage={rowsPerPage} />,
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
    await user.click(getByRole('button', { name: String(rowsPerPage) }));
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

    expect(mockFn).toHaveBeenCalledWith('row1');
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
    expect(mockFn).toHaveBeenCalledWith('row3');
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
    expect(mockFn).toHaveBeenCalledWith('row1');

    await user.click(row2);
    expect(mockFn).not.toHaveBeenCalledWith('row2');
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

  /*it('should not open menu with enter-key', async () => {
    const { queryByRole, getAllByRole } = render(
      <Component dropdownItems={dropdownItems} />,
    );
    const user = userEvent.setup();

    getAllByRole('button')[2].focus();

    await user.keyboard('[Enter]');
    expect(queryByRole('menu')).not.toBeInTheDocument();

    await user.keyboard('[Space');
    expect(queryByRole('menu')).toBeInTheDocument();
  });*/

  /*it('should handle keyboard navigation', async () => {
    //const user = userEvent.setup();
    const { user, getByRole } = setup(
      <Component pagination rowsPerPage={rowsPerPage} />,
    );
    /*const { getByRole } = render(
      <Component pagination rowsPerPage={rowsPerPage} />,
    );

    await user.tab();
    expect(getByRole('row', { name: /row1/i })).toHaveClass('Mui-selected');

    await user.keyboard('{ArrowDown}');
    //expect(mockFn).toHaveBeenCalledWith('navigated to row2');

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');
    expect(getByRole('row', { name: /row2/i })).toHaveClass('Mui-selected');

    await user.keyboard('[ArrowRight]');
    expect(getByRole('row', { name: /row7/i })).toHaveClass('Mui-selected');

    await user.keyboard('[ArrowLeft]');
    expect(getByRole('row', { name: /row2/i })).toHaveClass('Mui-selected');

    await user.keyboard('[End]');
    expect(getByRole('row', { name: /row20/i })).toHaveClass('Mui-selected');

    await user.keyboard('[Home]');
    expect(getByRole('row', { name: /row1/i })).toHaveClass('Mui-selected');

    await user.keyboard('[Enter]');
    expect(mockFn).toHaveBeenCalledWith('row1');
  });*/

  /*it('should handle sorting', async () => {
    const { getByRole, getAllByRole } = render(<Sortable />);
    const user = userEvent.setup();

    const rows = getAllByRole('row');

    expect(rows[1].textContent).toBe('row1');
    expect(rows[2].textContent).toBe('row2');
    expect(rows[3].textContent).toBe('row3');

    const btn = getByRole('button', { name: /column #1/i });
    await user.click(btn);

    expect(rows[1].textContent).toBe(`row${numberOfRows}`);
    expect(rows[2].textContent).toBe(`row${numberOfRows - 1}`);
    expect(rows[3].textContent).toBe(`row${numberOfRows - 2}`);

    btn.focus();
    await user.keyboard('[Enter]');

    //expect(rows[1].textContent).toBe('row1');
    expect(rows[2].textContent).toBe('row2');
    expect(rows[3].textContent).toBe('row3');
  });*/
});

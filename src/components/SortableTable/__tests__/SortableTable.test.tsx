import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SortableTable from '..';
import { TableColumn } from '../../GrepTable';

interface TestData {
  [key: string]: number | string;
  id: number;
  name: string;
}

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

  const columns: Array<TableColumn<TestData>> = Object.keys(rows[0]).map(
    (prop) => ({ label: prop, getCell: (row) => row[prop] }),
  );

  return (
    <SortableTable header data={rows} columns={columns} modifiers="restrict" />
  );
};

describe('SortableTable', () => {
  it('should render correctly', () => {
    const { getByRole, getAllByRole } = render(<Component />);
    const rowButtons = getAllByRole('button');
    expect(rowButtons).toHaveLength(3);
    expect(getByRole('columnheader', { name: /name/i })).toBeVisible();
  });

  it('should handle drag and drop', async () => {
    const { getAllByRole } = render(<Component />);
    const user = userEvent.setup();
    const rows = getAllByRole('button');

    expect(rows[0].textContent).toBe('0row1');
    expect(rows[1].textContent).toBe('1row2');
    expect(rows[2].textContent).toBe('2row3');

    // dnd-kit has issues concerning movements in unit-tests:
    // therefore the test simply tests that an element can be picked up and dropped.
    // It cannot be directed to where it is to be moved as of now.
    // https://github.com/clauderic/dnd-kit/issues/261

    user.pointer([
      { keys: '[MouseLeft>]', target: rows[2] },
      { keys: '[/MouseLeft]' },
    ]);
    await screen.findByText(
      'Draggable item 2 was dropped over droppable area 0',
    );
  });
});

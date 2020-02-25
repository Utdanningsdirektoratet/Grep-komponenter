import * as React from 'react';
import { storiesOf } from '@storybook/react';
import GrepTable, { TableColumn } from './GrepTable';
import { DropdownMenuItem } from '../DropdownMenu';
import { Button, Box } from '@material-ui/core';

interface ICurriculum {
  id: number;
  code: string;
  title: string;
  statusText: string;
  lastModified: string;
}

export const tableColumns: TableColumn<ICurriculum>[] = [
  {
    label: 'Kode',
    width: '20px',
    getCell: row => row.code,
  },
  {
    label: 'Navn',
    getCell: row => row.title,
  },
  {
    label: 'Status',
    width: '100px',
    getTooltip: row => row.statusText,
    getCell: row => row.statusText,
  },
  {
    label: 'Publisert',
    width: '200px',
    forceTooltip: true,
    getCell: row => row.lastModified,
  },
] as TableColumn<ICurriculum>[];

const CURRICULUM_COLUMNS: Array<TableColumn<any>> = [
  {
    label: 'Kode',
    width: 8,
    getCell: () => 'Kode',
  },
  {
    label: 'Tittel',
    getCell: () => 'Tittel TittelTittelTittel TittelTittelTittelTittel TittelTittel',
  },
  {
    label: 'Status',
    getCell: () => 'Status',
  },
  {
    label: 'Sist endret',
    width: 9,
    getCell: () => '10. desember',
  },
  {
    label: 'Ansvarlig',
    width: 9,
    getCell: row => row.grepAdminResponsibleUsername,
  },
  {
    label: 'Importert',
    width: 8,
    getCell: () => <div style={{ textAlign: 'center' }}>{'\u2714'}</div>,
  },
  {
    label: 'Klar',
    width: 7,
    getCell: () => <div style={{ textAlign: 'center' }}>{'\u2714'}</div>,
  },
  {
    label: 'Tanket',
    width: 8,
    getCell: () => null,
  },
  {
    label: 'Låst',
    width: 7,
    getCell: () => null,
  },
];

export const tableData = (
  samples: number = 5,
): ICurriculum[] =>
  new Array(samples).fill(null).map((_, id) => ({
    id,
    code: '1001',
    title: `Testplanen ${id}`,
    statusText: 'Under arbeid',
    lastModified: '10. desember',
  }));

const menuItems: DropdownMenuItem<ICurriculum>[] = [
  {
    label: 'Test 1',
    handleClick: obj => console.log('clicked on', obj),
    children: [
      {
        label: 'Test child',
        handleClick: obj => console.log('clicked on', obj),
      },
      {
        label: 'Test child',
        disabled: true,
        handleClick: obj => console.log('clicked on', obj),
      },
    ],
  },
  {
    label: 'Test 2',
    handleClick: obj => console.log('clicked on', obj),
    children: [
      {
        label: 'Test child',
        handleClick: obj => console.log('clicked on', obj),
      },
      {
        label: 'Test child',
        disabled: true,
        handleClick: obj => console.log('clicked on', obj),
      },
    ],
  },
];

storiesOf('Grep table', module)
  .addDecorator(storyFn => <div style={{ margin: 10 }}>{storyFn()}</div>)
  .add('standard', () => (
    <GrepTable header columns={tableColumns} data={tableData()} />
  ))
  .add('outlined', () => (
    <GrepTable header columns={tableColumns} data={tableData()} outlined />
  ))
  .add('clickable', () => (
    <GrepTable
      columns={tableColumns}
      data={tableData().map(c => {
        if (c.id % 2 === 0) {
          return {
            ...c,
            rowDisabled: true,
          };
        }
        return c;
      })}
      clickableRows
      header
    />
  ))
  .add('without data', () => (
    <GrepTable header columns={tableColumns} data={[]} />
  ))
  .add('with dropdown-menu', () => (
    <Box>
      <Button>Test</Button>
      <GrepTable
        header
        data={tableData()}
        dropdownItems={menuItems}
        columns={CURRICULUM_COLUMNS}
        menuTooltip={() => 'Tooltip'}
        menuDisabled={row => row.id === 3}
      />
      <Button>Test</Button>
    </Box>
  ))
  .add('with pagination', () => {
    function Parent({ children }: { children: any }) {
      const [state, setState] = React.useState(tableData(50));
      return <div>{children(state, setState)}</div>;
    }

    return (
      <Parent>
        {(state: ICurriculum[]) => (
          <div>
            <GrepTable
              header
              columns={tableColumns}
              data={state}
              pagination
              rowsPerPage={4}
            />
          </div>
        )}
      </Parent>
    );
  })
  .add('without header', () => (
    <GrepTable columns={tableColumns} data={tableData()} />
  ));

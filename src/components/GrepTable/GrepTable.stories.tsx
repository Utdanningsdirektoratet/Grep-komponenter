import * as React from 'react';
import { storiesOf } from '@storybook/react';
import GrepTable, { TableColumn } from './GrepTable';
import { MenuItem } from '../DropdownMenu';
import { Button } from '@material-ui/core';

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
    width: 7,
    getCell: row => row.code,
  },
  {
    label: 'Navn',
    width: 13,
    getCell: row => row.title,
  },
  {
    label: 'Status',
    width: 8,
    getTooltip: row => row.statusText,
    getCell: row => row.statusText,
  },
  {
    label: 'Publisert',
    width: 10,
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
    getCell: () => 'Tittel',
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

export const tableData: ICurriculum[] = [
  {
    id: 1,
    code: '1001',
    title: 'Testplanen',
    statusText: 'Under arbeid',
    lastModified: '10. desember',
  },
  {
    id: 2,
    code: '1001',
    title: 'Testplanen',
    statusText: 'Under arbeid',
    lastModified: '10. desember',
  },
  {
    id: 3,
    code: '1001',
    title: 'Testplanen',
    statusText: 'Under arbeid',
    lastModified: '10. desember',
  },
  {
    id: 4,
    code: '1001',
    title: 'Testplanen',
    statusText: 'Under arbeid',
    lastModified: '10. desember',
  },
  {
    id: 5,
    code: '1001',
    title: 'Testplanen',
    statusText: 'Under arbeid',
    lastModified: '10. desember',
  },
  {
    id: 6,
    code: '1001',
    title: 'Testplanen',
    statusText:
      'Kjempelang status bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
    lastModified: '10. desember',
  },
];

const menuItems: MenuItem<ICurriculum>[] = [
  {
    label: 'Test',
    handleClick: obj => console.log('clicked on', obj),
  },
];

storiesOf('Grep table', module)
  .addDecorator(storyFn => <div style={{ margin: 10 }}>{storyFn()}</div>)
  .add('standard', () => (
    <GrepTable header columns={tableColumns} data={tableData} />
  ))
  .add('outlined', () => (
    <GrepTable header columns={tableColumns} data={tableData} outlined />
  ))
  .add('clickable', () => (
    <GrepTable
      columns={tableColumns}
      data={tableData.map(c => {
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
    <GrepTable
      header
      data={tableData}
      dropdownItems={menuItems}
      columns={CURRICULUM_COLUMNS}
      menuTooltip={() => 'Tooltip'}
      menuDisabled={row => row.id === 3}
    />
  ))
  .add('with pagination', () => {
    function Parent({ children }: { children: any }) {
      const [state, setState] = React.useState(tableData);
      return <div>{children(state, setState)}</div>;
    }

    return (
      <Parent>
        {(state: ICurriculum[], setState: (s: ICurriculum[]) => void) => (
          <div>
            <GrepTable
              header
              columns={tableColumns}
              data={state}
              pagination
              rowsPerPage={5}
            />
            <Button
              onClick={() => setState(tableData.slice(0, state.length - 1))}
            >
              Remove one row
            </Button>
          </div>
        )}
      </Parent>
    );
  })
  .add('without header', () => (
    <GrepTable columns={tableColumns} data={tableData} />
  ));

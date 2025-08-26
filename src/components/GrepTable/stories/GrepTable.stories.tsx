import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import GrepTable, { TableColumn } from '..';
import { DropdownMenuItem } from '../../DropdownMenu';

export interface ICurriculum {
  id: number;
  code: string;
  title: string;
  statusText: string;
  lastModified: string;
}

export const tableColumns: TableColumn<ICurriculum>[] = [
  {
    label: 'Kode',
    width: 10,
    getCell: (row) => row.code,
  },
  {
    label: 'Navn',
    width: 20,
    getCell: (row) => row.title,
  },
  {
    label: 'Status',
    width: 20,
    getTooltip: (row) => row.statusText,
    getCell: (row) => row.statusText,
  },
  {
    label: 'Publisert',
    width: 20,
    forceTooltip: true,
    lang: 'en',
    getCell: (row) => row.lastModified,
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
    width: '100px',
    getCell: (row) =>
      `Tittel ${row.id} dsadassdasdsas dsadassdasdsasdsadassdasdsas dsadassdasdsasdsadassdasdsas dsadassdasdsasdsadassdasdsas dsadassdasdsas`,
  },
  {
    label: 'Status',
    getCell: () => <FormControlLabel control={<Checkbox />} label="status" />,
  },
  {
    label: 'Sist endret',
    width: 9,
    getCell: () => '10. desember',
  },
  {
    label: 'Ansvarlig',
    width: 9,
    getCell: (row) => row.grepAdminResponsibleUsername,
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
    getCell: () => <div style={{ textAlign: 'center' }}>{'\u2714'}</div>,
  },
  {
    label: 'Låst',
    width: 7,
    getCell: () => <div style={{ textAlign: 'center' }}>{'\u2714'}</div>,
  },
];

export const tableData = (samples: number = 5): ICurriculum[] =>
  new Array(samples).fill(null).map((_, id) => ({
    id,
    code: '1001',
    title: `Testplanen ${id}`,
    statusText: 'Under arbeid',
    lastModified: '10. desember',
  }));

const menuItems = [
  {
    label: 'Test 1',
    handleClick: (obj) => console.log('clicked on', obj),
    children: [
      {
        label: 'Test child',
        handleClick: (obj) => console.log('clicked on', obj),
      },
      {
        label: 'Test child',
        disabled: true,
        handleClick: (obj) => console.log('clicked on', obj),
      },
    ],
  },
  {
    label: 'Test 2',
    handleClick: (obj) => console.log('clicked on', obj),
    children: [
      {
        label: 'Test child',
        handleClick: (obj) => console.log('clicked on', obj),
      },
      {
        label: 'Test child',
        disabled: true,
        handleClick: (obj) => console.log('clicked on', obj),
      },
    ],
  },
  {
    label: 'Test 3',
    handleClick: (obj) => console.log('clicked on', obj),
    tooltipText: 'This is a tooltip',
    disabled: true,
  },
  {
    label: 'Test 4',
    tooltipText: 'This is a tooltip',
    disabled: true,
    handleClick: (obj) => console.log('clicked on', obj),
    children: [
      {
        label: 'Test 4-1 child',
        handleClick: (obj) => console.log('clicked on', obj),
      },
      {
        label: 'Test 4-2 child',
        disabled: true,
        handleClick: (obj) => console.log('clicked on', obj),
      },
    ],
  },
] as DropdownMenuItem<ICurriculum>[];

export default {
  title: 'Grep table',
  decorators: [(storyFn: any) => <div style={{ margin: 10 }}>{storyFn()}</div>],
  excludeStories: ['ICurriculum', 'tableColumns', 'tableData'],
};

export const Standard = {
  render: () => (
    <GrepTable
      caption="Some caption text"
      header
      columns={tableColumns}
      data={tableData()}
    />
  ),

  name: 'standard',
};

export const Outlined = {
  render: () => (
    <GrepTable header columns={tableColumns} data={tableData()} outlined />
  ),

  name: 'outlined',
};

export const Clickable = {
  render: () => (
    <GrepTable
      columns={tableColumns}
      data={tableData().map((c) => {
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
  ),

  name: 'clickable',
};

export const WithoutData = {
  render: () => <GrepTable header columns={tableColumns} data={[]} />,

  name: 'without data',
};

export const WithDropdownMenu = {
  render: () => (
    <GrepTable
      header
      data={tableData(100)}
      dropdownItems={menuItems}
      columns={CURRICULUM_COLUMNS}
      menuTooltip={() => 'Tooltip'}
      menuDisabled={(row) => row.id === 3}
      isRowDisabled={(row) => !!(row.id % 2)}
      pagination
      rowsPerPage={10}
      underlineOnFocus
    />
  ),

  name: 'with dropdown-menu',
};

export const WithPagination = {
  render: () => {
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
  },

  name: 'with pagination',
};

export const WithoutHeader = {
  render: () => <GrepTable columns={tableColumns} data={tableData()} />,

  name: 'without header',
};

export const WithoutPadding = {
  render: () => (
    <div>
      <GrepTable
        header
        style={{ border: '1px solid black' }}
        columns={tableColumns}
        data={tableData()}
        padding="none"
      />
      <br />
      <GrepTable
        header
        style={{ border: '1px solid black' }}
        columns={tableColumns}
        data={[]}
        padding="none"
      />
    </div>
  ),

  name: 'without padding',
};

export const WithRowStyle = {
  render: () => (
    <GrepTable
      caption="Some caption text"
      header
      columns={tableColumns}
      data={tableData()}
      rowStyle={{ backgroundColor: 'lightgrey' }}
    />
  ),

  name: 'with rowStyle',
};

export const WithRowStyleFunction = {
  render: () => (
    <GrepTable
      caption="Some caption text"
      header
      columns={tableColumns}
      data={tableData()}
      rowStyle={(rowData) => {
        if (rowData.id === 4) {
          return { backgroundColor: 'lightgray' };
        } else if (rowData.title === 'Testplanen 2') {
          return { backgroundColor: 'lightblue' };
        }
        return {};
      }}
    />
  ),

  name: 'with rowStyle function',
};

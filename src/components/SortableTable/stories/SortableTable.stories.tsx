import React, { useState } from 'react';
import { Checkbox, Box, FormControlLabel } from '@mui/material';

import SortableTable from '../index';
import { UniqueIdentifier } from '@dnd-kit/core';
import { TableColumn } from '../../GrepTable';

interface TestData {
  [key: string]: string | number | UniqueIdentifier;
  id: UniqueIdentifier;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export default {
  title: 'SortableTable',
};

export const SortableTableStory = {
  decorators: [
    () => {
      const [disabled, setDisabled] = useState<boolean>(false);
      const createData = (
        id: number,
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
      ): TestData => ({ id, name, calories, fat, carbs, protein });

      let index = 0;

      const rowsDefault = [
        createData(index++, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData(index++, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData(index++, 'Eclair', 262, 16.0, 24, 6.0),
        createData(index++, 'Cupcake', 305, 3.7, 67, 4.3),
        createData(index++, 'Gingerbread', 356, 16.0, 49, 3.9),
      ];
      const [rows, setRows] = useState<TestData[]>(rowsDefault);

      const onChange = (newOrder: { id: string | number; index: number }[]) => {
        const sortedRows = [...rows].sort(
          (a, b) =>
            newOrder.find((row) => row.id === a.id)!.index -
            newOrder.find((row) => row.id === b.id)!.index,
        );
        setRows(sortedRows);
      };

      const columns: Array<TableColumn<TestData>> = Object.keys(rows[0]).map(
        (prop) => ({ label: prop, getCell: (row) => row[prop] }),
      );
      return (
        <Box sx={{ flex: 'auto' }}>
          <FormControlLabel
            control={
              <Checkbox
                value={disabled}
                onClick={() => setDisabled(!disabled)}
              />
            }
            label="Disable drag"
          />
          <SortableTable
            header
            size="small"
            columns={columns}
            data={rows}
            modifiers="restrict"
            disabled={disabled}
            onChange={(order) => onChange(order)}
          />
        </Box>
      );
    },
  ],
  name: 'standard',
};

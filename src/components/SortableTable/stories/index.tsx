import React from 'react';
import { storiesOf } from '@storybook/react';
import { useState } from '@storybook/addons';
import { Checkbox, Box, FormControlLabel } from '@mui/material';

import SortableTable from '..';

interface TestData {
  id: number;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

storiesOf('SortableList', module).add('standard', () => {
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

  const rows = [
    createData(index++, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(index++, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(index++, 'Eclair', 262, 16.0, 24, 6.0),
    createData(index++, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(index++, 'Gingerbread', 356, 16.0, 49, 3.9),
  ];
  return (
    <Box flex="auto">
      <FormControlLabel
        control={
          <Checkbox value={disabled} onClick={() => setDisabled(!disabled)} />
        }
        label="Disable drag"
      />
      <SortableTable
        columns={['name', 'calories', 'fat', 'carbs']}
        items={rows}
        identify={(item: TestData) => String(item.id)}
        disabled={disabled}
      ></SortableTable>
    </Box>
  );
});

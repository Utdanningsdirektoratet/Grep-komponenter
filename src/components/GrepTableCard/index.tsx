import * as React from 'react';
import { Box, Typography } from '@mui/material';

import GrepTable, { GrepTableProps } from '../GrepTable';
import Colors from '../../styling/Colors';

interface GrepTableCardProps<T> extends GrepTableProps<T> {
  title: string;
}

const GrepTableCard = <T,>(props: GrepTableCardProps<T>) => {
  return (
    <Box
      sx={{
        border: `1px solid ${Colors.lightGrey}`,
        height: 'fit-content',
        flex: 'auto',
      }}
      style={props.style}
    >
      <Typography sx={{ fontSize: 24, padding: '20px', color: Colors.black }}>
        {props.title}
      </Typography>
      <GrepTable<T> {...props} header />
    </Box>
  );
};

export default GrepTableCard;

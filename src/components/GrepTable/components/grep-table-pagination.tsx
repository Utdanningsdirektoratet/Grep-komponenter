import React from 'react';
import { TablePagination, TablePaginationProps } from '@mui/material';

import {
  PaginationActions,
  PaginationActionsProps,
} from './GrepPaginationActions';
import { usePaginationStyles } from '../styles';

export const GrepTablePagination: React.FunctionComponent<
  TablePaginationProps
> = (props) => {
  const { classes } = usePaginationStyles();

  return (
    <TablePagination
      classes={classes}
      rowsPerPageOptions={props.rowsPerPageOptions || [5, 10, 25, 50]}
      SelectProps={{
        inputProps: {
          title: 'Velg antall elementer',
        },
        style: {
          gridArea: 'left',
          justifySelf: 'start',
        },
      }}
      ActionsComponent={(actions) => (
        <PaginationActions {...(actions as PaginationActionsProps)} />
      )}
      {...props}
    />
  );
};

export default GrepTablePagination;

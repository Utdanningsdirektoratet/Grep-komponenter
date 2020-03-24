import React from 'react';

import TablePagination, {
  TablePaginationProps,
} from '@material-ui/core/TablePagination';

import {
  PaginationActionsWrapped,
  PaginationActionsProps,
} from './GrepPaginationActions';

import { makeStyles, createStyles } from '@material-ui/core/styles';

type Properties = TablePaginationProps;

type Component = React.FunctionComponent<Properties>;

export const useStyles = makeStyles(
  createStyles({
    toolbar: {
      padding: 0,
      width: '100%',
      display: 'grid',
      gridTemplateAreas: "'left right'",
    },
    input: {
      gridArea: 'left',
      justifySelf: 'start',
    },
    caption: {
      gridArea: 'left',
      paddingLeft: '60px',
    },
    spacer: {
      display: 'none',
    },
  }),
);

export const GrepTablePagination: Component = (props: Properties) => {
  const classes = useStyles({});
  return (
    <TablePagination
      classes={classes}
      ActionsComponent={actions => (
        <PaginationActionsWrapped {...(actions as PaginationActionsProps)} />
      )}
      {...props}
    />
  );
};

export default GrepTablePagination;

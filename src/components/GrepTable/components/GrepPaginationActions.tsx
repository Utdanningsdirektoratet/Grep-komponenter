import * as React from 'react';
import { Button, WithStyles, withStyles, Theme } from '@material-ui/core';

import { useStyles } from '../styles';
import { Colors } from '../../../styling';

const actionsStyles = () => ({
  root: {
    display: 'flex',
  },
});
type WithStylesProps = WithStyles<typeof actionsStyles>;

export type PaginationActionsProps = {
  count: number;
  onChangePage: (
    event: React.MouseEvent<HTMLElement> | null,
    page: number,
  ) => void;
  page: number;
  rowsPerPage: number;
  theme?: Theme;
};

type Props = WithStylesProps & PaginationActionsProps;

const PaginationActions: React.FunctionComponent<Props> = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
}) => {
  const { classes } = useStyles();

  const getPageNumbers = (
    count: number,
    currentPage: number,
    rowsPerPage: number,
  ) => {
    const pageNumbers = [];
    const pageCount = Math.ceil(count / rowsPerPage);

    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <Button
          key={i}
          className={classes.button}
          style={
            currentPage === i
              ? {
                  color: 'white',
                }
              : {
                  backgroundColor: Colors.white,
                }
          }
          onClick={(e) => onChangePage(e, i)}
          disabled={currentPage === i}
        >
          {i + 1}
        </Button>,
      );
    }

    if (currentPage >= 2 && currentPage < pageCount - 2) {
      return pageNumbers.slice(currentPage - 2, currentPage + 3);
    }

    return currentPage < 3
      ? pageNumbers.slice(0, 5)
      : pageNumbers.slice(pageCount - 5, pageCount);
  };

  return (
    <div style={{ gridArea: 'right', justifySelf: 'end' }}>
      <Button
        className={classes.textButton}
        onClick={(e) => onChangePage(e, page - 1)}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        Forrige
      </Button>
      {getPageNumbers(count, page, rowsPerPage)}
      <Button
        className={classes.textButton}
        onClick={(e) => onChangePage(e, page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        Neste
      </Button>
    </div>
  );
};

export const PaginationActionsWrapped =
  withStyles(actionsStyles)(PaginationActions);

import * as React from 'react';
import { Button, Theme } from '@mui/material';

import { usePaginationActionStyles } from '../styles';
import { Colors } from '../../../styling';

export type PaginationActionsProps = {
  count: number;
  onPageChange: (
    event: React.MouseEvent<HTMLElement> | null,
    page: number,
  ) => void;
  page: number;
  rowsPerPage: number;
  theme?: Theme;
};

export const PaginationActions: React.FunctionComponent<PaginationActionsProps> =
  ({ count, page, rowsPerPage, onPageChange }) => {
    const { classes } = usePaginationActionStyles();

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
            onClick={(e) => onPageChange(e, i)}
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
      <div style={{ display: 'flex', gridArea: 'right', justifySelf: 'end' }}>
        <Button
          className={classes.textButton}
          onClick={(e) => onPageChange(e, page - 1)}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          Forrige
        </Button>
        {getPageNumbers(count, page, rowsPerPage)}
        <Button
          className={classes.textButton}
          onClick={(e) => onPageChange(e, page + 1)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          Neste
        </Button>
      </div>
    );
  };

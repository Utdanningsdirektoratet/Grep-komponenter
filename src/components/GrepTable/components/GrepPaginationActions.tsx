import * as React from 'react';
import { WithStyles, Theme, withStyles } from '@material-ui/core';

import { PaginationButton, PaginationTextButton } from '../styles';
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
  theme: Theme;
};

type Props = WithStylesProps & PaginationActionsProps;

class PaginationActions extends React.Component<Props> {
  public render() {
    const { count, page, rowsPerPage } = this.props;

    return (
      <div style={{ gridArea: 'right', justifySelf: 'end' }}>
        <PaginationTextButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          Forrige
        </PaginationTextButton>
        {this.getPageNumbers(count, page, rowsPerPage)}
        <PaginationTextButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          Neste
        </PaginationTextButton>
      </div>
    );
  }

  private handleBackButtonClick = (
    event: React.MouseEvent<HTMLElement> | null,
  ) => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  private handleNextButtonClick = (
    event: React.MouseEvent<HTMLElement> | null,
  ) => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  private handlePageButtonClick = (
    event: React.MouseEvent<HTMLElement> | null,
    page: number,
  ) => {
    this.props.onChangePage(event, page);
  };

  private getPageNumbers = (
    count: number,
    currentPage: number,
    rowsPerPage: number,
  ) => {
    const pageNumbers = [];
    const pageCount = Math.ceil(count / rowsPerPage);

    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <PaginationButton
          key={i}
          style={
            currentPage === i
              ? {
                  color: 'white',
                }
              : {
                  backgroundColor: Colors.white,
                }
          }
          onClick={(e) => this.handlePageButtonClick(e, i)}
          disabled={currentPage === i}
        >
          {i + 1}
        </PaginationButton>,
      );
    }

    if (currentPage >= 2 && currentPage < pageCount - 2) {
      return pageNumbers.slice(currentPage - 2, currentPage + 3);
    }

    return currentPage < 3
      ? pageNumbers.slice(0, 5)
      : pageNumbers.slice(pageCount - 5, pageCount);
  };
}

export const PaginationActionsWrapped =
  withStyles(actionsStyles)(PaginationActions);

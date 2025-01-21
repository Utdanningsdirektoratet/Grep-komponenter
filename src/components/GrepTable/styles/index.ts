import { TableColumn } from '..';
import { tss } from '../../../styling';

export const usePaginationActionStyles = tss.create(({ theme }) => ({
  button: {
    minWidth: '18px',
    minHeight: '20px',
    padding: '0 6px',
    margin: '0 8px',
    borderRadius: '2px',
    fontSize: 12,
    backgroundColor: theme.palette.primary.main,
  },
  textButton: {
    textTransform: 'capitalize',
    fontWeight: 'initial',
    fontSize: 12,
  },
}));

export const usePaginationStyles = tss.create({
  toolbar: {
    padding: 0,
    width: '100%',
    display: 'grid',
    gridTemplateAreas: "'left right'",
  },
  selectLabel: {
    gridArea: 'left',
    paddingLeft: '60px',
  },
  displayedRows: {
    gridArea: 'left',
    paddingLeft: '60px',
  },
  spacer: {
    display: 'none',
  },
});

export const useTableHeaderStyles = tss
  .withParams<{
    column: TableColumn<unknown>;
  }>()
  .create(({ column }) => {
    let width = column.width ? column.width : undefined;
    if (typeof width === 'number') {
      width = `${column.width}%`;
    }
    return {
      th: {
        width,
        fontSize: 14,
      },
    };
  });

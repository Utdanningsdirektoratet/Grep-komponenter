import { TableColumn } from '..';
import { makeStyles } from '../../../styling';

export const usePaginationActionStyles = makeStyles()(({ palette }) => ({
  button: {
    minWidth: '18px',
    minHeight: '20px',
    padding: '0 6px',
    margin: '0 8px',
    borderRadius: '2px',
    fontSize: 12,
    backgroundColor: palette.primary.main,
  },
  textButton: {
    textTransform: 'capitalize',
    fontWeight: 'initial',
    fontSize: 12,
  },
}));

export const usePaginationStyles = makeStyles()({
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
});

export const useTableHeaderStyles = makeStyles<{ column: TableColumn<any> }>()(
  (_theme, { column }) => {
    const width = column.width
      ? typeof column.width === 'number'
        ? `${column.width}%`
        : column.width
      : undefined;

    return {
      th: {
        width,
        fontSize: 14,
      },
    };
  },
);

import { hex2rgba, makeStyles } from '../../../styling';

export const useSortableTableStyles = makeStyles()(({ palette }) => ({
  dragOverlayRow: {
    backgroundColor: hex2rgba(palette.primary.contrastText, 1),
    scale: 1.05,
    boxShadow: `0px 0px 2px 2px ${hex2rgba(palette.primary.main, 0.25)}`,
  },
  sortableRow: {
    ':focus-visible': {
      boxShadow: `0px 0px 3px 3px ${hex2rgba(palette.primary.main, 0.25)}`,
    },
  },
}));

export default useSortableTableStyles;

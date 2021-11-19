import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()(({ palette }) => ({
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

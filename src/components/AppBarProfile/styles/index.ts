import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()(({ palette }) => ({
  user: {
    color: palette.text.primary,
    margin: '0 10px',
    marginLeft: 20,
    height: 'fit-content',
    textAlign: 'left',
    textTransform: 'none',
  },
}));

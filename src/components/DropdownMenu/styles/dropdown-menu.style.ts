import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()(({ palette }) => ({
  selected: {
    color: `${palette.common.black} !important`,
    backgroundColor: 'rgba(0,0,0,.05) !important',
  },
}));

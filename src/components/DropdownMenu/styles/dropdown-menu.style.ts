import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    selected: {
      color: `${palette.common.black} !important`,
      backgroundColor: 'rgba(0,0,0,.05) !important',
    },
  }),
);

export default useStyles;

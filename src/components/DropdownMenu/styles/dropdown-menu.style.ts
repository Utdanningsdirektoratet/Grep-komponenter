import { tss } from '../../../styling';

export const useStyles = tss.create(({ theme }) => ({
  selected: {
    color: `${theme.palette.common.black} !important`,
    backgroundColor: 'rgba(0,0,0,.05) !important',
  },
}));

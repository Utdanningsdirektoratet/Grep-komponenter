import { tss } from '../../../styling';

export const useStyles = tss.create(({ theme }) => ({
  user: {
    color: theme.palette.text.primary,
    margin: '0 10px',
    marginLeft: 20,
    height: 'fit-content',
    textAlign: 'left',
    textTransform: 'none',
  },
}));

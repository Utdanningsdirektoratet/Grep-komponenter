import { Colors, tss } from '../../../styling';

export const useStyles = tss.create(() => ({
  container: {
    border: `1px solid ${Colors.lightGrey}`,
    height: 'fit-content',
    width: 'fit-content',
  },
  title: {
    fontSize: 24,
    padding: 20,
    color: Colors.black,
    whiteSpace: 'nowrap',
  },
}));

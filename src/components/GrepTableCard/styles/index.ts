import { Colors, tss } from '../../../styling';

export const useStyles = tss.create({
  container: {
    border: `1px solid ${Colors.lightGrey}`,
    height: 'fit-content',
    flex: 'auto',
  },
  title: { fontSize: 24, padding: 20, color: Colors.black },
});

import { Colors, makeStyles } from '../../../styling';

export const useStyles = makeStyles()({
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
});

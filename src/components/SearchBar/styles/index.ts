import { Colors, makeStyles } from '../../../styling';

export const useStyles = makeStyles()({
  outer: {
    alignItems: 'center',
    background: Colors.white,
    display: 'flex',
    height: 48,
    position: 'relative',
    marginRight: 'auto',
    boxSizing: 'unset',
  },
  icon: {
    alignItems: 'center',
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    width: 56,
  },
  input: { border: 0, display: 'block', flex: 1, fontSize: 16, outline: 0 },
  helptext: { margin: '0 10px 0 10px', color: '#6e6e6e', fontSize: 12 },
});

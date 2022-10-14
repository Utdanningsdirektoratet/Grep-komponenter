import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()({
  container: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    fontSize: 16,
  },
  current: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    lineHeight: '16px',
  },
  link: {
    fontSize: 16,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

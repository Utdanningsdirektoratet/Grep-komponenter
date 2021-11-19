import { makeStyles } from '../../../styling';

export const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: 'rgb(241, 243, 244)',
    height: 'fit-content',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      maxWidth: 'unset',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 500,
    },
  },
  content: {
    backgroundColor: 'unset',
    marginRight: 20,
  },
  title: {
    backgroundColor: 'unset',
    fontSize: 16,
    margin: '20px 0',
  },
  body: {
    backgroundColor: 'unset',

    h4: {
      marginRight: 20,
    },
  },
  icon: {
    margin: '20px 10px',
    color: 'rgb(255, 158, 157)',
  },
}));

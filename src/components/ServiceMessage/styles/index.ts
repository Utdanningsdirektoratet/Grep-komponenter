import { makeStyles, createStyles } from '@material-ui/core';

export default makeStyles(() =>
  createStyles({
    message: {
      overflowWrap: 'break-word',
      backgroundColor: '#f8e9d6',
      margin: '10px 0',
      padding: '4px 10px',
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 48,
    },
    messageText: {
      overflow: 'auto',
      alignSelf: 'center',
      width: '100%',
      marginLeft: 20,
      padding: '6px 0',
    },
    messageType: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    warning: {
      color: '#E69136',
      margin: '0 10px',
    },
    close: {
      fontSize: 16,
    },
    button: {
      display: 'flex',
      color: '#E6933A',
      height: 'fit-content',
      width: 'fit-content',
      alignSelf: 'center',
      marginLeft: 5,
    },
  }),
);

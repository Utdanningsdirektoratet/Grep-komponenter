import { makeStyles } from '@material-ui/core';

export default makeStyles({
  root: ({ isVisible }: { isVisible: boolean }) => ({
    position: 'absolute',
    zIndex: 9,
    transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
    visibility: isVisible ? 'visible' : 'hidden',
    transform: isVisible
      ? 'translate(-50%) scale(1)'
      : 'translate(-50%) scale(0)',
  }),
});

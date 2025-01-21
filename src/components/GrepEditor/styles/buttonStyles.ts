import { tss } from '../../../styling';

export const useButtonStyles = tss.create({
  btn: {
    backgroundColor: 'white',

    '&:hover': {
      backgroundColor: '#F2F2F2',
    },
  },
  btnSelected: {
    backgroundColor: '#E0E0E0 !important',

    '&:hover': {
      backgroundColor: '#D9D9D9 !important',
    },
  },
});

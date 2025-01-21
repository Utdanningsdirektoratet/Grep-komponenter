import { useTheme } from '@mui/material/styles';
import { createTss } from 'tss-react';

export const { tss } = createTss({
  useContext: function useContext() {
    const theme = useTheme();
    return { theme };
  },
});

import { createMakeAndWithStyles } from 'tss-react';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

type MakeAndWithStyles = ReturnType<typeof createMakeAndWithStyles<Theme>>;

const tssStyles = createMakeAndWithStyles({
  useTheme: useTheme as () => Theme,
});

export const makeStyles: MakeAndWithStyles['makeStyles'] = tssStyles.makeStyles;
export const withStyles: MakeAndWithStyles['withStyles'] = tssStyles.withStyles;

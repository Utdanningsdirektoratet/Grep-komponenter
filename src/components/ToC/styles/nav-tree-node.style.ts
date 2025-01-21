import { convertToRgba, tss } from '../../../styling';

export const useStyles = tss
  .withParams<{ lvl: number }>()
  .create(({ theme, lvl }) => {
    const defaultColor = convertToRgba(theme.palette.primary.main, 0.75);
    const linkcolor = `var(--grep-toc-link-color, ${defaultColor})`;
    const selectedColor = `var(--grep-toc-selected-color, ${theme.palette.primary.main})`;
    const focusBackground = `var(--grep-toc-focused-background, ${convertToRgba(
      theme.palette.primary.main,
      0.1,
    )})`;

    return {
      root: {
        color: linkcolor,
      },
      link: {
        display: 'block',
        textDecoration: 'none',
        padding: '2px 0 2px 5px',
        minHeight: '1rem',
        borderLeft: '5px solid transparent',
        paddingLeft: lvl * 5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&--selected': {
          color: selectedColor,
          borderLeft: `5px solid ${selectedColor}`,
        },
        '&:focus': {
          outline: 'none',
          background: focusBackground,
        },
      },
    };
  });

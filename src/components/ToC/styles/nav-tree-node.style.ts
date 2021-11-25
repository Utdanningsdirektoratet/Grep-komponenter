import { convertToRgba, makeStyles } from '../../../styling';

export const useStyles = makeStyles<{ lvl: number }>()(
  ({ palette }, { lvl }) => {
    const defaultColor = convertToRgba(palette.primary.main, 0.75);
    const linkcolor = `var(--grep-toc-link-color, ${defaultColor})`;
    const selectedColor = `var(--grep-toc-selected-color, ${palette.primary.main})`;
    const focusBackground = `var(--grep-toc-focused-background, ${convertToRgba(
      palette.primary.main,
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
  },
);

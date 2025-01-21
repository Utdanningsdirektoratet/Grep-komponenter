import { hex2rgba, tss } from '../../../styling';

interface Properties {
  [key: string]: boolean | undefined;
  hasFocus: boolean;
  hasContent: boolean;
  readOnly?: boolean;
  hasCustomToolbar?: boolean;
}

export const useEditorStyles = tss
  .withParams<Properties>()
  .create(({ theme, hasFocus, hasContent, readOnly, hasCustomToolbar }) => ({
    root: {
      position: 'relative',
      display: 'inline-flex',
      flexDirection: hasCustomToolbar ? 'column-reverse' : 'column',
      minWidth: '100%', // TODO
    },
    legend: {
      position: 'absolute' as const,
      top: -5,
      left: 0,
      right: 0,
      bottom: 0,
      lineHeight: '11px',
      zIndex: hasFocus ? 0 : 1,
      paddingLeft: 10,
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      borderWidth: hasFocus ? 2 : 1,
      borderColor: hasFocus
        ? theme.palette.primary.main
        : hex2rgba('#000', 0.23),
      '&:hover': {
        borderColor: hasFocus
          ? theme.palette.primary.main
          : theme.palette.text.primary,
      },
      transition: theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    editor: {
      padding: '.8rem 1rem',
      position: 'relative' as const,
      zIndex: hasFocus || readOnly ? 1 : 0,
      '& .unstyled': {
        margin: '.5rem 0',
      },
    },
    label: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      zIndex: 1,
      transform:
        hasFocus || hasContent
          ? 'translate(6px, -14px) scale(0.75)'
          : 'translate(6px, 12px) scale(1)',
      transformOrigin: 'top left',
      transition: theme.transitions.create(['color', 'transform'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
      color: hasFocus
        ? theme.palette.primary[
            theme.palette.mode === 'light' ? 'dark' : 'light'
          ]
        : theme.palette.text.secondary,
      fontSize: '1.1428571428571428rem',
      // hack @todo when time
      backgroundColor: 'white',
      padding: '2px 10px',
    },
    helpertext: {
      margin: 0,
      opacity: hasFocus ? 1 : 0,
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
      fontSize: 'small',
      // hack @todo when time
      backgroundColor: 'white',
      padding: '2px 10px',
    },
    charcount: {
      margin: 0,
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
      fontSize: 'small',
      // hack @todo when time
      backgroundColor: 'white',
      padding: '2px 10px',
    },
  }));

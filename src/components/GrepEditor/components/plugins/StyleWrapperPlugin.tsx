import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR, FOCUS_COMMAND } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import styles from '../../styles/editorStyles.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { hex2rgba } from '../../../../styling/hex2rgb';

export interface CharcounteHelpertextPPayload {
  showCharcount?: boolean;
  maxChars?: number;
  helperText?: string;
  readOnly?: boolean;
  classes?: Partial<Record<'root' | 'editor' | 'legend' | 'label', string>>;
  label?: string;
  children?: React.ReactNode;
  autoFocus?: boolean;
  toolbarAnchor: (_floatingAnchorElem: HTMLDivElement) => void;
  hasCustomToolbar?: boolean;
}

export function StyleWrapperPlugin({
  showCharcount,
  maxChars,
  helperText,
  readOnly,
  classes,
  label,
  children,
  autoFocus,
  toolbarAnchor,
  hasCustomToolbar,
}: CharcounteHelpertextPPayload): React.JSX.Element | '' | undefined {
  const [editor] = useLexicalComposerContext();
  const [hasFocus, setHasFocus] = useState(() => {
    return editor.getRootElement() === document.activeElement;
  });
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          setHasFocus(editor.getRootElement() === document.activeElement);
          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setHasFocus(editor.getRootElement() === document.activeElement);
          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, []);

  // Autofocus, makes sure the editor is focused as soon as it it rendered.
  useEffect(() => {
    autoFocus &&
      editor.focus(() => {
        const activeElement = document.activeElement;
        const rootElement = editor.getRootElement() as HTMLDivElement;
        if (
          rootElement !== null &&
          (activeElement === null || !rootElement.contains(activeElement))
        ) {
          // Note: preventScroll won't work in Webkit.
          rootElement.focus({ preventScroll: true });
        }
      });
  }, [autoFocus]);

  useEffect(() => {
    editor.registerTextContentListener((content) => {
      // For some reason a newline "Enter" inserts two \n characters.
      const newCount = content.replaceAll('\n\n', '\n').length;
      setCharCount((prevCount) => {
        return prevCount !== newCount ? newCount : prevCount;
      });
    });
  }, []);

  return (
    <Box
      className={`${styles.root} ${hasCustomToolbar ? styles.customToolbar : ''} ${classes?.root}`}
      sx={{ marginTop: '2em' }}
      onClick={() => editor.focus()}
      ref={toolbarAnchor}
    >
      {/* This box controls the border around the editor */}
      <Box
        sx={(theme) => ({
          borderColor: hasFocus
            ? theme.palette.primary.main
            : hex2rgba('#000', 0.23),
          '&:hover': {
            borderColor: hasFocus
              ? theme.palette.primary.main
              : theme.palette.text.primary,
          },
        })}
        className={`${styles.legend} ${hasFocus ? styles.hasFocus : ''} ${classes?.legend}`}
      />
      {label && (
        <InputLabel
          sx={(theme) => ({
            color: hasFocus
              ? theme.palette.primary[
                  theme.palette.mode === 'light' ? 'dark' : 'light'
                ]
              : theme.palette.text.secondary,
          })}
          className={`${styles.label} ${hasFocus ? styles.hasFocus : ''} ${charCount > 0 ? styles.hasContent : ''} ${classes?.label}`}
        >
          {label}
        </InputLabel>
      )}
      {/* Editor wrapper */}
      <Box
        className={`${styles.editor} ${hasFocus ? styles.hasFocus : ''} ${readOnly ? styles.readOnly : ''} ${classes?.editor}`}
      >
        {children}
      </Box>

      {/* Wrapper for displaying charcount and helpertext */}
      {(showCharcount || helperText) && (
        <Box sx={{ margin: '.5rem' }}>
          {showCharcount && (
            <FormHelperText className={styles.charcount}>
              {maxChars
                ? `Antall tegn: ${charCount} / ${maxChars}`
                : `Antall tegn: ${charCount}`}
            </FormHelperText>
          )}

          {helperText && (
            <FormHelperText
              className={`${styles.helpertext} ${hasFocus ? styles.hasFocus : ''} `}
            >
              {helperText}
            </FormHelperText>
          )}
        </Box>
      )}
    </Box>
  );
}

export default StyleWrapperPlugin;

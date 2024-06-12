import { Box, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR, FOCUS_COMMAND } from 'lexical';
import { useEditorStyles } from '../../styles/editorStyles';
import clsx from 'clsx';
import { mergeRegister } from '@lexical/utils';

export interface CharcounteHelpertextPPayload {
  showCharcount?: boolean;
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
  const [hasFocus, setFocused] = useState(() => {
    return editor.getRootElement() === document.activeElement;
  });
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          setFocused(editor.getRootElement() === document.activeElement);
          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setFocused(editor.getRootElement() === document.activeElement);
          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, []);

  const { classes: styles } = useEditorStyles({
    hasFocus,
    hasContent: charCount > 0,
    readOnly,
    hasCustomToolbar: hasCustomToolbar,
  });

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
      className={clsx(styles.root, classes?.root)}
      sx={{ marginTop: '2em' }}
      onClick={() => editor.focus()}
      ref={toolbarAnchor}
    >
      {/* This legend controls the border around the editor */}
      <legend className={clsx(styles.legend, classes?.legend)} />
      {label && (
        <label className={clsx(styles.label, classes?.label)}>{label}</label>
      )}
      {/* Editor wrapper */}
      <Box className={clsx(styles.editor, classes?.editor)}>{children}</Box>

      {/* Wrapper for displaying charcount and helpertext */}
      {(showCharcount || helperText) && (
        <Box margin=".5rem">
          {showCharcount && (
            <FormHelperText className={styles.charcount}>
              {`Antall tegn: ${charCount}`}
            </FormHelperText>
          )}

          {helperText && (
            <FormHelperText className={styles.helpertext}>
              {helperText}
            </FormHelperText>
          )}
        </Box>
      )}
    </Box>
  );
}

export default StyleWrapperPlugin;

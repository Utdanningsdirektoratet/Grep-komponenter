import React, { useState, useContext, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
  Editor,
  ContentState,
  EditorState,
  ContentBlock,
  DraftBlockRenderMap,
  getDefaultKeyBinding,
  Modifier,
  DraftHandleValue,
} from 'draft-js';
import { Box, FormHelperText } from '@mui/material';

import { FloatingToolbar, ToolbarPropperties } from './toolbars';
import { createButton, Button, Style } from './buttons';
import keyHandler, {
  CustomDraftCommand,
  customKeyHandler,
} from '../misc/handlers/key';
import EditorContext from '../context';
import { useEditorStyles } from '../styles';
import { useDebounce } from '../../../hooks';
import { convert2html } from '../misc/utils';

export type ContentChanged = (content: ContentState) => void;

export interface GrepEditor extends Editor {
  editor: HTMLElement;
  editorContainer: HTMLElement;
}

export interface Properties {
  label?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  showCharCount?: boolean;
  helperText?: string;
  buttons?: Array<Button>;
  disableNewlines?: boolean;
  stripPastedStyles?: boolean;
  /**
   * Undefined: allow all styles.
   * Empty array: disable all styles.
   * Not empty array: allow only specified styles.
   */
  allowedStyles?: Array<Style>;
  blockRenderMap?: DraftBlockRenderMap;
  Toolbar?: React.FunctionComponent<ToolbarPropperties>;
  classes?: Partial<Record<'root' | 'editor' | 'legend' | 'label', string>>;
  onContentChange?: ContentChanged;
  /**
   * @deprecated No longer in use. Instead, pass allowedStyles as an empty array to disable styling
   */
  canInlineStyle?: boolean;
}

type Component = React.FunctionComponent<Properties>;

const blockStyleFn = (block: ContentBlock): string => block.getType();

const createDefaultButtons = (): Array<Button> => [
  createButton('bold'),
  createButton('italic'),
];

const getCharCount = (editorState: EditorState) =>
  editorState.getCurrentContent().getPlainText('').length;

export const EditorComponent: Component = ({
  label,
  classes,
  autoFocus,
  helperText,
  showCharCount,
  allowedStyles,
  disableNewlines,
  onContentChange,
  Toolbar = FloatingToolbar,
  ...props
}: Properties) => {
  const { state, setState, setSelection } = useContext(EditorContext);

  const ref = useRef<Editor>();

  const canStyle = allowedStyles === undefined || allowedStyles.length > 0;

  const buttons = !allowedStyles
    ? createDefaultButtons()
    : allowedStyles.map(createButton);

  // TODO: make prop
  const handleKeyCommand = canStyle
    ? keyHandler(setState, allowedStyles)
    : customKeyHandler(setState);

  const [hasFocus, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // defer focus until next tick
  const requestFocus = (): void => {
    window.requestAnimationFrame(() => ref.current?.focus());
  };

  // multiple components might request focus and deligate back focus
  const onBlur = useDebounce(() => ref.current && setFocused(false), {
    wait: 150,
  });

  const onFocus = (): void => {
    // when editor focused cancel pending defocus
    onBlur.cancel();
    setFocused(true);
  };

  const onChange = (nextState: EditorState): void => {
    setState(nextState);
    setSelection(nextState.getSelection());
    setCharCount(getCharCount(nextState));
  };

  useEffect(() => {
    autoFocus && ref.current && ref.current.focus();
  }, [autoFocus]);

  // hacky workaround?
  const oldContent = useRef(state.getCurrentContent());
  const currentContent = state.getCurrentContent();

  useEffect(() => {
    if (oldContent.current !== currentContent) {
      onContentChange && onContentChange(currentContent);
    }
  }, [convert2html(currentContent)]);

  const hasContent = state.getCurrentContent().hasText();

  const { classes: styles } = useEditorStyles({
    hasFocus,
    hasContent,
    readOnly: props.readOnly,
  });

  const keyBindingFn = (e: React.KeyboardEvent): CustomDraftCommand | null => {
    if (disableNewlines && e.key === 'Enter') return null;
    if (e.key === 'Enter' && e.shiftKey) {
      return 'shift-split-block';
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  const handlePastedText = (
    text: string,
    _html: string | undefined,
    editorState: EditorState,
  ): DraftHandleValue => {
    if (disableNewlines) {
      onChange(
        EditorState.push(
          editorState,
          Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            text.replace(/\n/g, ' '),
          ),
          'remove-range',
        ),
      );
    }

    return 'handled';
  };

  return (
    <Box className={clsx(styles.root, classes?.root)} onClick={requestFocus}>
      <legend className={clsx(styles.legend, classes?.legend)}>
        <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
      </legend>
      {label && (
        <label className={clsx(styles.label, classes?.label)}>{label}</label>
      )}
      {canStyle && (
        <Toolbar
          editor={ref as React.MutableRefObject<Editor>}
          buttons={buttons}
        ></Toolbar>
      )}
      <Box className={clsx(styles.editor, classes?.editor)}>
        <Editor
          ref={ref as React.MutableRefObject<Editor>}
          {...{
            editorState: state,
            onChange,
            onFocus,
            onBlur,
            blockStyleFn,
            handleKeyCommand,
            keyBindingFn,
            handlePastedText,
            ...props,
          }}
        />
      </Box>

      {(showCharCount || helperText) && (
        <Box margin=".5rem">
          {showCharCount && (
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
};

export default EditorComponent;

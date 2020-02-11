import React, { useState, useContext, useRef, useEffect } from 'react';

import clsx from 'clsx';
import { Box } from '@material-ui/core';
import {
  Editor,
  ContentState,
  EditorState,
  ContentBlock,
  DraftBlockRenderMap,
} from 'draft-js';

import { createButton, ButtonType, Button } from './buttons';
import FloatingToolbar from './toolbars/floating-toolbar';
import { ToolbarPropperties } from './toolbars';
import keyHandler from './handlers/key';
import EditorContext from './context';
import useStyles from './style';

import { useDebounce } from '../../hooks';

export type ContentChanged = (content: ContentState) => void;

export interface GrepEditor extends Editor {
  editor: HTMLElement;
  editorContainer: HTMLElement;
}

export interface Properties {
  label?: string;
  onContentChange?: ContentChanged;
  readOnly?: boolean;
  autoFocus?: boolean;
  canInlineStyle?: boolean;
  Toolbar?: React.FunctionComponent<ToolbarPropperties>;
  buttons?: Array<Button>;
  classes?: Partial<Record<'root' | 'editor' | 'legend' | 'label', string>>;
  blockRenderMap?: DraftBlockRenderMap;
  stripPastedStyles?: boolean;
}

type Component = React.FunctionComponent<Properties>;

const blockStyleFn = (block: ContentBlock): string => block.getType();

const createDefaultButtons = (): Array<Button> => [
  createButton(ButtonType.bold),
  createButton(ButtonType.italic),
];

export const EditorComponent: Component = ({
  label,
  classes,
  autoFocus,
  onContentChange,
  canInlineStyle = true,
  Toolbar = FloatingToolbar,
  buttons = createDefaultButtons(),
  ...props
}: Properties) => {
  const { state, setState, setSelection } = useContext(EditorContext);

  const ref = useRef<Editor>();

  // TODO: make prop
  const handleKeyCommand = canInlineStyle ? keyHandler(setState) : undefined;

  const [hasFocus, setFocused] = useState(false);

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
    onContentChange &&
      // defer change event
      new Promise(resolve =>
        resolve(onContentChange(nextState.getCurrentContent())),
      );
    setState(nextState);
    setSelection(nextState.getSelection());
  };

  useEffect(() => {
    autoFocus && ref.current && ref.current.focus();
  }, [autoFocus]);

  const hasContent = state.getCurrentContent().hasText();

  const styles = useStyles({ hasFocus, hasContent, readOnly: props.readOnly });

  return (
    <Box className={clsx(styles.root, classes?.root)} onClick={requestFocus}>
      <legend className={clsx(styles.legend, classes?.legend)}>
        <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
      </legend>
      {label && (
        <label className={clsx(styles.label, classes?.label)}>{label}</label>
      )}
      {canInlineStyle && (
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
            ...props,
          }}
        />
      </Box>
    </Box>
  );
};

export default EditorComponent;

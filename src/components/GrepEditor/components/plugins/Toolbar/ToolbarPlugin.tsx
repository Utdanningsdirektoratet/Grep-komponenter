/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { FC, JSX, useCallback, useEffect, useRef } from 'react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { setFloatingElemPosition } from '../../utils/setFloatingElemPosition';
import { getDOMRangeRect } from '../../utils/getDOMRangeRect';
import { getSelectedNode } from '../../utils/getSelectedNode';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AllowedStyles, Button } from '../../buttons';
import { useButtonStyles } from '../../../styles';
import { ToolbarProperties } from '../../../entities';
import {
  ToolbarActionKind,
  ToolbarInitialState,
  ToolbarReducer,
} from './toolbarReducer';

function TextFormatFloatingToolbar({
  editor,
  anchorElem,
  formats,
  buttons,
}: {
  editor: LexicalEditor;
  anchorElem: HTMLElement;
  formats: Set<AllowedStyles>;
  buttons?: Button[];
}): JSX.Element {
  console.log(formats);
  const { classes } = useButtonStyles();
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);

  function mouseMoveListener(e: MouseEvent) {
    if (
      popupCharStylesEditorRef?.current &&
      (e.buttons === 1 || e.buttons === 3)
    ) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== 'none') {
        const x = e.clientX;
        const y = e.clientY;
        const elementUnderMouse = document.elementFromPoint(x, y);

        if (!popupCharStylesEditorRef.current.contains(elementUnderMouse)) {
          // Mouse is not over the target element => not a normal click, but probably a drag
          popupCharStylesEditorRef.current.style.pointerEvents = 'none';
        }
      }
    }
  }
  function mouseUpListener() {
    if (popupCharStylesEditorRef?.current) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== 'auto') {
        popupCharStylesEditorRef.current.style.pointerEvents = 'auto';
      }
    }
  }

  useEffect(() => {
    if (popupCharStylesEditorRef?.current) {
      document.addEventListener('mousemove', mouseMoveListener);
      document.addEventListener('mouseup', mouseUpListener);

      return () => {
        document.removeEventListener('mousemove', mouseMoveListener);
        document.removeEventListener('mouseup', mouseUpListener);
      };
    }
    return;
  }, [popupCharStylesEditorRef]);

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem);
    }
  }, [editor, anchorElem]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener('resize', update);
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [editor, updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateTextFormatFloatingToolbar]);
  console.log('Formats', formats);

  return (
    <>
      {editor.isEditable() && (
        <ToggleButtonGroup
          ref={popupCharStylesEditorRef}
          sx={{
            width: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          {buttons?.map(({ type, children }) => (
            <ToggleButton
              classes={{ root: classes.btn, selected: classes.btnSelected }}
              value={type}
              selected={formats.has(type)}
              size="small"
              key={type}
              onClick={() => {
                console.group('in onclikc');
                console.log('formats?.has(type)', formats?.has(type));
                console.log('type', type);
                console.log('Formats', formats);

                console.groupEnd();
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
              }}
              aria-label={`format text as ${type.toLowerCase}`}
            >
              {children}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </>
  );
}

function useFloatingTextFormatToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  buttons?: Button[],
  CustomToolbar?: FC<ToolbarProperties>,
): JSX.Element | null {
  const [state, dispatch] = React.useReducer(
    ToolbarReducer,
    ToolbarInitialState,
  );
  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return;
      }
      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        dispatch({
          type: ToolbarActionKind.updateBoolean,
          field: 'isText',
          payload: false,
        });
        return;
      }

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);

      // Update text format
      dispatch({
        type: ToolbarActionKind.updateFormat,
        field: 'bold',
        payload: selection.hasFormat('bold'),
      });
      dispatch({
        type: ToolbarActionKind.updateFormat,
        field: 'italic',
        payload: selection.hasFormat('italic'),
      });
      dispatch({
        type: ToolbarActionKind.updateFormat,
        field: 'superscript',
        payload: selection.hasFormat('superscript'),
      });

      if (selection.getTextContent() !== '') {
        dispatch({
          type: ToolbarActionKind.updateBoolean,
          field: 'isText',
          payload: $isTextNode(node) || $isParagraphNode(node),
        });
      } else {
        dispatch({
          type: ToolbarActionKind.updateBoolean,
          field: 'isText',
          payload: false,
        });
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, '');
      if (!selection.isCollapsed() && rawTextContent === '') {
        dispatch({
          type: ToolbarActionKind.updateBoolean,
          field: 'isText',
          payload: false,
        });

        return;
      }
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener('selectionchange', updatePopup);
    return () => {
      document.removeEventListener('selectionchange', updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          dispatch({
            type: ToolbarActionKind.updateBoolean,
            field: 'isText',
            payload: false,
          });
        }
      }),
    );
  }, [editor, updatePopup]);

  if (CustomToolbar) {
    return createPortal(
      <Box
        sx={{
          position: 'relative',
          top: '0.5em',
          left: '1em',
          zIndex: 1,
        }}
      >
        <CustomToolbar
          buttons={buttons as Button[]}
          editor={editor}
          formats={state.format}
        />
      </Box>,
      anchorElem as HTMLElement,
    );
  }

  if (!state.isText) {
    return null;
  }

  return createPortal(
    <TextFormatFloatingToolbar
      editor={editor}
      anchorElem={anchorElem}
      formats={state.format}
      buttons={buttons}
    />,
    anchorElem,
  );
}

export default function FloatingTextFormatToolbarPlugin({
  anchorElem,
  buttons,
  CustomToolbar,
}: {
  anchorElem: HTMLElement;
  buttons?: Button[];
  CustomToolbar?: FC<ToolbarProperties>;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return useFloatingTextFormatToolbar(
    editor,
    anchorElem,
    buttons,
    CustomToolbar,
  );
}

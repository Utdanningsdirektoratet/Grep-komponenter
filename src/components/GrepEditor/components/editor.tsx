import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { HeadingNode } from '@lexical/rich-text';
import React, { useRef, useState } from 'react';
import StyleWrapperPlugin from './plugins/StyleWrapperPlugin';
import { htmlExportMap } from './plugins/CustomHtmlExport';
import ModifyPastePlugin from './plugins/DisablePastePlugin';
import PreventNewlinesPlugin from './plugins/PreventNewlinesPlugin';
import { Button, createButton } from './buttons';
import FloatingTextFormatToolbarPlugin from './plugins/ToolbarPlugin';
import InsertDataPlugin from './plugins/InitialDataPlugin';
import { LexicalOnChange, Properties } from '../entities';
import HeadingPlugin from './plugins/HeadingPlugin';
import { LexicalEditor } from 'lexical';
import TextNodeStylingPlugin from './plugins/TextNodeStylingPlugin';

// Classes here are added to the relevant tags i.e.(<strong>)
const theme = {
  text: {
    bold: 'GrepEditor-bold',
    italic: 'GrepEditor-italic',
  },
};

function onError(error: Error): void {
  console.error('GrepEditor: ', error);
}

const createDefaultButtons = (): Array<Button> => [
  createButton('bold'),
  createButton('italic'),
];

/* This allows interaction with the editor outside of the LexicalComposer */
// export const editorRef = useRef<LexicalEditor>(null);

export default function Editor({
  html,
  label,
  classes,
  autoFocus,
  helperText,
  showCharCount,
  allowedStyles,
  blockPasting,
  disableNewlines,
  onContentChange,
  editorRef,
  stripPastedStyles,
  readOnly,
  Toolbar,
}: Properties) {
  const initialConfig: InitialConfigType = {
    namespace: 'GrepEditor',
    theme,
    editable: !readOnly,
    onError,
    nodes: [HeadingNode],
    html: {
      export: htmlExportMap,
    },
  };
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  if (editorRef === undefined) {
    editorRef = useRef<LexicalEditor>(null);
  }

  const canStyle = allowedStyles === undefined || allowedStyles.length > 0;

  const buttons = !allowedStyles
    ? createDefaultButtons()
    : allowedStyles.map(createButton);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorRefPlugin editorRef={editorRef} />
      <StyleWrapperPlugin
        helperText={helperText}
        showCharcount={showCharCount}
        readOnly={readOnly}
        classes={classes}
        label={label}
        autoFocus={autoFocus}
        toolbarAnchor={onRef}
        hasCustomToolbar={Toolbar !== undefined}
      >
        {canStyle && floatingAnchorElem && (
          <FloatingTextFormatToolbarPlugin
            anchorElem={floatingAnchorElem}
            buttons={buttons}
            CustomToolbar={Toolbar}
          />
        )}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              spellCheck={false}
              className="GrepEditor"
              style={{ outline: 'none' }}
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onContentChange as LexicalOnChange} />
        <InsertDataPlugin html={html} />
        <HeadingPlugin html={html} />
        <ModifyPastePlugin
          blockPasting={blockPasting}
          stripPastedStyles={stripPastedStyles}
        />
        <PreventNewlinesPlugin disableNewlines={disableNewlines} />
        <TextNodeStylingPlugin allowedStyles={allowedStyles} />
      </StyleWrapperPlugin>
    </LexicalComposer>
  );
}

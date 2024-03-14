import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode } from '@lexical/rich-text';
import React, { useState } from 'react';
import StyleWrapperPlugin from './plugins/StyleWrapperPlugin';
import { htmlExportMap } from './plugins/CustomHtmlExport';
import ModifyPastePlugin from './plugins/DisablePastePlugin';
import PreventNewlinesPlugin from './plugins/PreventNewlinesPlugin';
import { Button, createButton } from './buttons';
import FloatingTextFormatToolbarPlugin from './plugins/ToolbarPlugin';
import InsertDataPlugin from './plugins/InitialDataPlugin';
import { LexicalOnChange, Properties } from '../entities';

// Classes here are added to the relevant tags i.e.(<strong>)
const theme = {
  text: {
    bold: 'lexicalEditor-bold',
    italic: 'lexicalEditor-italic',
  },
};

function onError(error: Error): void {
  console.error('LexicalGrepEditor: ', error);
}

const createDefaultButtons = (): Array<Button> => [
  createButton('bold'),
  createButton('italic'),
];

export default function LexicalGrepEditor({
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
  stripPastedStyles,
  readOnly,
  Toolbar,
}: Properties) {
  const initialConfig: InitialConfigType = {
    namespace: 'lexicalEditor',
    theme,
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

  const canStyle = allowedStyles === undefined || allowedStyles.length > 0;

  const buttons = !allowedStyles
    ? createDefaultButtons()
    : allowedStyles.map(createButton);

  return (
    <LexicalComposer initialConfig={initialConfig}>
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
            <div className="editor">
              <ContentEditable spellCheck={false} className="lexicalEditor" />
            </div>
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onContentChange as LexicalOnChange} />
        <InsertDataPlugin html={html} />
        <ModifyPastePlugin
          blockPasting={blockPasting}
          stripPastedStyles={stripPastedStyles}
        />
        <PreventNewlinesPlugin disableNewlines={disableNewlines} />
      </StyleWrapperPlugin>
    </LexicalComposer>
  );
}

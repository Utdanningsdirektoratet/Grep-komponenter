import React from 'react';
import { ContentState } from 'draft-js';

import EditorProvider from './context/provider';
import EditorComponent, { Properties as GrepEditorProps } from './components/editor';

export { EditorContext } from './context';

interface Properties extends GrepEditorProps {
  html?: string;
}

export * from './misc/utils';
export { ContentState };

type Component = React.FunctionComponent<Properties>;

const GrepEditor: Component = ({ html, ...props }: Properties) => {
  return (
    <EditorProvider {...{ html }}>
      <EditorComponent {...props}></EditorComponent>
    </EditorProvider>
  );
};

export default GrepEditor;

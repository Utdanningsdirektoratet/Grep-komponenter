import React from 'react';
import { ContentState } from 'draft-js';

import EditorProvider from './provider';
import EditorComponent, { Properties as GrepEditorProps } from './editor';

export { EditorContext } from './context';

interface Properties extends GrepEditorProps {
  html?: string;
}

export {
  convert2html,
  convert2txt,
  parseContent,
  parseContentState,
} from './utils';
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

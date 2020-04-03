import React, { useState, useMemo, ReactNode } from 'react';
import { DraftDecorator, EditorState, SelectionState } from 'draft-js';

import EditorContext from './context';
import { createState } from './utils';

interface Properties {
  html?: string;
  decorators?: DraftDecorator[];
  children: ReactNode;
}

const Provider: React.FC<Properties> = ({
  html,
  decorators,
  children,
}: Properties) => {
  const [state, setState] = useState<EditorState>(createState('', decorators));
  const [selection, setSelection] = useState<SelectionState | undefined>();
  useMemo(() => {
    console.debug('creating new state for editor', html);
    setState(createState(html, decorators));
  }, [html, decorators]);

  return (
    <EditorContext.Provider
      value={{
        state,
        setState,
        selection,
        setSelection,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default Provider;

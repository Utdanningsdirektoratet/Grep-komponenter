import { createContext } from 'react';

import { EditorState, SelectionState } from 'draft-js';

export interface Context {
  state: EditorState;
  setState: React.Dispatch<React.SetStateAction<EditorState>>;
  selection?: SelectionState;
  setSelection: React.Dispatch<
    React.SetStateAction<SelectionState | undefined>
  >;
}

export const EditorContext = createContext<Context>({} as Context);

export default EditorContext;

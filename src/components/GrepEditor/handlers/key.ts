import {
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftHandleValue,
} from 'draft-js';

export const keyHandler = (setEditorState: (state: EditorState) => void) => (
  command: DraftEditorCommand,
  editorState: EditorState,
): DraftHandleValue => {
  const newState = RichUtils.handleKeyCommand(editorState, command);
  if (newState) {
    setEditorState(newState);
    return 'handled';
  }
  return 'not-handled';
};

export default keyHandler;

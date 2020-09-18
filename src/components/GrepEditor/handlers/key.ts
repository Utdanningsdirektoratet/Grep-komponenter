import {
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftHandleValue,
} from 'draft-js';
import { Style } from '../buttons';

export const keyHandler = (
  setEditorState: (state: EditorState) => void,
  allowedStyles?: Array<Style>,
) => (
  command: DraftEditorCommand,
  editorState: EditorState,
): DraftHandleValue => {
  if (!allowedStyles || allowedStyles.some((s) => s === command)) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
  }
  return 'not-handled';
};

export default keyHandler;

import {
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftHandleValue,
} from 'draft-js';
import { Style } from '../../components/buttons';

export type CustomDraftCommand = DraftEditorCommand | 'shift-split-block';

export const customKeyHandler = (
  setEditorState: (state: EditorState) => void,
) => (
  command: CustomDraftCommand,
  editorState: EditorState,
): DraftHandleValue => {
  if (command === 'shift-split-block') {
    const newState = RichUtils.insertSoftNewline(editorState);
    setEditorState(newState);
    return 'handled';
  }
  return 'not-handled';
};

export const keyHandler = (
  setEditorState: (state: EditorState) => void,
  allowedStyles?: Array<Style>,
) => (
  command: CustomDraftCommand,
  editorState: EditorState,
): DraftHandleValue => {
  if (!allowedStyles || allowedStyles.some((s) => s === command)) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
  }
  return customKeyHandler(setEditorState)(command, editorState);
};

export default keyHandler;

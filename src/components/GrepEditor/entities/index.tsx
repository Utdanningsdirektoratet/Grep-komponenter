import { RefObject } from 'react';
import { Button, Style } from '../components/buttons';
import { EditorState, LexicalEditor } from 'lexical';

export interface ToolbarProperties {
  editor: LexicalEditor;
  buttons: Button[];
  /* Needs to be in the same order as buttontypes in buttons */
  isSelected: boolean[];
}

export type LexicalOnChange = (
  editorState: EditorState,
  editor: LexicalEditor,
  tags: Set<string>,
) => void;

export interface Properties {
  html?: string;
  label?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  showCharCount?: boolean;
  helperText?: string;
  buttons?: Array<Button>;
  disableNewlines?: boolean;
  stripPastedStyles?: boolean;
  blockPasting?: boolean;
  editorRef?: RefObject<LexicalEditor>;
  /**
   * Undefined: allow all styles.
   * Empty array: disable all styles.
   * Not empty array: allow only specified styles.
   */
  allowedStyles?: Array<Style>;
  Toolbar?: React.FunctionComponent<ToolbarProperties>;
  classes?: Partial<Record<'root' | 'editor' | 'legend' | 'label', string>>;
  onContentChange?: LexicalOnChange;
}

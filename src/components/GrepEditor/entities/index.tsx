import { RefObject } from 'react';
import { Button, AllowedStyles } from '../components/buttons';
import { EditorState, LexicalEditor } from 'lexical';

export interface ToolbarProperties {
  editor: LexicalEditor;
  buttons: Button[];
  /* Needs to be in the same order as buttontypes in buttons */
  formats: Set<AllowedStyles>;
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
  editorRef?: RefObject<LexicalEditor | null | undefined>;
  /**
   * Undefined: allow all styles.
   * Empty array: disable all styles.
   * Not empty array: allow only specified styles.
   */
  allowedStyles?: Array<AllowedStyles>;
  Toolbar?: React.FunctionComponent<ToolbarProperties>;
  classes?: Partial<Record<'root' | 'editor' | 'legend' | 'label', string>>;
  onContentChange?: LexicalOnChange;
}

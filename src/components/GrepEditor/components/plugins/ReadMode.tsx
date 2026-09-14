import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export function ReadModePlugin({ readOnly }: { readOnly?: boolean }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.setEditable(readOnly ?? true);
  }, [editor, readOnly]);
  return null;
}

export default ReadModePlugin;

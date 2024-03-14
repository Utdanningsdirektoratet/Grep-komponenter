import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes } from 'lexical';
import { useEffect } from 'react';

export default function InsertDataPlugin({ html }: { html?: string }): null {
  const [editor] = useLexicalComposerContext();
  const parser = new DOMParser();
  if (!html) {
    return null;
  }
  const dom = parser.parseFromString(html, 'text/html');

  // Initial data insertion
  useEffect(() => {
    editor.update(() => {
      const nodes = $generateNodesFromDOM(editor, dom);
      $insertNodes(nodes);
    });
  }, []);
  return null;
}

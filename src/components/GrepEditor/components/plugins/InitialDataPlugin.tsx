import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes } from 'lexical';
import { useEffect } from 'react';

export default function InsertDataPlugin({ html }: { html?: string }): null {
  const [editor] = useLexicalComposerContext();
  const parser = new DOMParser();

  // Initial data insertion
  useEffect(() => {
    if (!html) {
      return;
    }
    const dom = parser.parseFromString(html, 'text/html');

    editor.update(() => {
      const nodes = $generateNodesFromDOM(editor, dom);
      $insertNodes(nodes);
    });
  }, []);
  return null;
}

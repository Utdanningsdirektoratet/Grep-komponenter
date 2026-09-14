import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { OverflowNode } from '@lexical/overflow';
import { mergeRegister } from 'lexical';

//** This works together with the characterLimitPlugin from lexical.
// Lexical's plugin marks the overflowing characters as overflowNodes, and this plugin removes them. */
export function RemoveOverflowPlugin({ maxChars }: { maxChars?: number }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerTextContentListener((content) => {
      // For some reason a newline "Enter" inserts two \n characters.
      if (maxChars) {
        const count = content.replaceAll('\n\n', '\n').length;
        if (count > maxChars) {
          mergeRegister(
            editor.registerNodeTransform(OverflowNode, (node) => {
              node.remove();
            }),
          );
        }
      }
    });
  }, [editor, maxChars]);

  return null;
}

export default RemoveOverflowPlugin;

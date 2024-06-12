import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createTextNode,
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  PASTE_COMMAND,
} from 'lexical';

export function ModifyPastePlugin({
  blockPasting,
  stripPastedStyles,
}: {
  blockPasting?: boolean;
  stripPastedStyles?: boolean;
}) {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    PASTE_COMMAND,
    (e: ClipboardEvent) => {
      if (blockPasting) {
        return true;
      } else if (stripPastedStyles) {
        const pastedText = e.clipboardData
          ?.getData('Text')
          .replaceAll('\n', ' ');
        editor.update(() => {
          const textNode = $createTextNode(pastedText);
          $insertNodes([textNode]);
        });
        return true;
      }
      return false;
    },
    COMMAND_PRIORITY_EDITOR,
  );

  return null;
}

export default ModifyPastePlugin;

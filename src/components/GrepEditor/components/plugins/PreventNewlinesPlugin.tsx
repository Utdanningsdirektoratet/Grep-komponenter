import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { RootNode, LineBreakNode } from 'lexical';

export function PreventNewlinesPlugin({
  disableNewlines,
}: {
  disableNewlines?: boolean;
}) {
  const [editor] = useLexicalComposerContext();
  if (disableNewlines) {
    mergeRegister(
      editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
        if (rootNode.getChildrenSize() <= 1) return;
        rootNode.getLastChild()?.remove();
        rootNode.selectEnd();
      }),
      editor.registerNodeTransform(LineBreakNode, (node) => {
        node.remove();
      }),
    );
  }
  return null;
}

export default PreventNewlinesPlugin;

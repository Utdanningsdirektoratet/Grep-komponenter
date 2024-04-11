import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  HeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';
import { $createParagraphNode, ParagraphNode } from 'lexical';
import { useEffect } from 'react';

const getTagType = (html?: string): HeadingTagType | null => {
  if (!html) {
    return null;
  }
  const tag = html.match(/^<h[0-6]>/); // Matches h tag at start of line
  const tagType =
    tag && (tag[0].replace('<', '').replace('>', '') as HeadingTagType);
  return tagType;
};

/* Changes behavior of editor, based on the input html: (Only heading, No heading) */
export default function HeadingPlugin({ html }: { html?: string }): null {
  const [editor] = useLexicalComposerContext();
  const tag = getTagType(html);
  useEffect(() => {
    // Only replace if tag is heading.
    if (tag) {
      editor.registerNodeTransform(ParagraphNode, (node) => {
        node.replace($createHeadingNode(`${tag}`));
      });
    } else {
      // Replace a heading with paragraph
      editor.registerNodeTransform(HeadingNode, (node) => {
        node.replace($createParagraphNode(), true);
      });
    }
  }, [editor, html]);
  return null;
}

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TextNode } from 'lexical';
import { useEffect } from 'react';
import { ButtonType, Style } from '../buttons';

const allowBoldItalic = (node: TextNode) => {
  if (
    node.hasFormat('italic') &&
    node.hasFormat('bold') &&
    (node.hasFormat('code') ||
      node.hasFormat('highlight') ||
      node.hasFormat('strikethrough') ||
      node.hasFormat('subscript') ||
      node.hasFormat('superscript') ||
      node.hasFormat('underline'))
  ) {
    node.setFormat(0); // setFormat only sets one specific format. Therefore toggle is used to have both applied.
    node.toggleFormat('bold');
    node.toggleFormat('italic');
  } else if (node.hasFormat('italic') && node.hasFormat('bold')) {
    return; // Need to set as italic to ensure format is only italic.
  } else if (
    node.hasFormat('bold') &&
    (node.hasFormat('code') ||
      node.hasFormat('highlight') ||
      node.hasFormat('strikethrough') ||
      node.hasFormat('subscript') ||
      node.hasFormat('superscript') ||
      node.hasFormat('underline'))
  ) {
    node.setFormat('bold');
  } else if (
    node.hasFormat('italic') &&
    (node.hasFormat('code') ||
      node.hasFormat('highlight') ||
      node.hasFormat('strikethrough') ||
      node.hasFormat('subscript') ||
      node.hasFormat('superscript') ||
      node.hasFormat('underline'))
  ) {
    node.setFormat('italic');
  } else if (
    node.hasFormat('bold') ||
    node.hasFormat('code') ||
    node.hasFormat('highlight') ||
    node.hasFormat('strikethrough') ||
    node.hasFormat('subscript') ||
    node.hasFormat('superscript') ||
    node.hasFormat('underline')
  ) {
    node.setFormat(0); // Sets format to none.
  }
};

const allowBold = (node: TextNode) => {
  if (
    node.hasFormat('bold') &&
    (node.hasFormat('code') ||
      node.hasFormat('highlight') ||
      node.hasFormat('strikethrough') ||
      node.hasFormat('subscript') ||
      node.hasFormat('superscript') ||
      node.hasFormat('underline'))
  ) {
    node.setFormat('bold');
  } else if (
    node.hasFormat('italic') ||
    node.hasFormat('code') ||
    node.hasFormat('highlight') ||
    node.hasFormat('strikethrough') ||
    node.hasFormat('subscript') ||
    node.hasFormat('superscript') ||
    node.hasFormat('underline')
  ) {
    node.setFormat(0); // Sets format to none.
  }
};

const allowItalic = (node: TextNode) => {
  if (
    node.hasFormat('italic') &&
    (node.hasFormat('code') ||
      node.hasFormat('highlight') ||
      node.hasFormat('strikethrough') ||
      node.hasFormat('subscript') ||
      node.hasFormat('superscript') ||
      node.hasFormat('underline'))
  ) {
    node.setFormat('italic');
  } else if (
    node.hasFormat('bold') ||
    node.hasFormat('code') ||
    node.hasFormat('highlight') ||
    node.hasFormat('strikethrough') ||
    node.hasFormat('subscript') ||
    node.hasFormat('superscript') ||
    node.hasFormat('underline')
  ) {
    node.setFormat(0); // Sets format to none.
  }
};

const disallowAll = (node: TextNode) => {
  if (
    node.hasFormat('bold') ||
    node.hasFormat('italic') ||
    node.hasFormat('code') ||
    node.hasFormat('highlight') ||
    node.hasFormat('strikethrough') ||
    node.hasFormat('subscript') ||
    node.hasFormat('superscript') ||
    node.hasFormat('underline')
  ) {
    node.setFormat(0); // Sets format to none.
  }
};

export default function TextNodeStylingPlugin({
  allowedStyles,
}: {
  allowedStyles?: Style[];
}): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerNodeTransform(TextNode, (node) => {
      if (allowedStyles === undefined) {
        allowBoldItalic(node);
      } else if (
        allowedStyles.includes(ButtonType.bold) &&
        allowedStyles.includes(ButtonType.italic)
      ) {
        allowBoldItalic(node);
      } else if (allowedStyles.includes(ButtonType.bold)) {
        allowBold(node);
      } else if (allowedStyles.includes(ButtonType.italic)) {
        allowItalic(node);
      } else {
        disallowAll(node);
      }
    });
  }, [editor]);
  return null;
}

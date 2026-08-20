import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TextFormatType, TextNode } from 'lexical';
import { useEffect } from 'react';
import { AllowedStyles } from '../buttons';

const RESTRICTED_FORMATS = [
  'code',
  'highlight',
  'strikethrough',
  'underline',
] as const;

const hasAnyFormat = (
  node: TextNode,
  formats: readonly TextFormatType[],
): boolean => {
  return formats.some((format) => node.hasFormat(format));
};

const applyAllowedFormats = (
  node: TextNode,
  allowedFormats: readonly AllowedStyles[],
): void => {
  const hasBold = node.hasFormat('bold');
  const hasItalic = node.hasFormat('italic');
  const hasSuperscript = node.hasFormat('superscript');
  const hasSubscript = node.hasFormat('subscript');

  const keepBold = allowedFormats.includes('bold') && hasBold;
  const keepItalic = allowedFormats.includes('italic') && hasItalic;
  const keepSuperscript =
    allowedFormats.includes('superscript') && hasSuperscript;
  const keepSubscript = allowedFormats.includes('subscript') && hasSubscript;

  if (!keepBold && !keepItalic && !keepSuperscript && !keepSubscript) {
    return;
  }

  const hasDisallowedFormatting = hasAnyFormat(node, RESTRICTED_FORMATS);

  if (!hasDisallowedFormatting) {
    if (keepBold || keepItalic || keepSuperscript || keepSubscript) {
      return;
    }
  }

  if (keepBold) {
    node.toggleFormat('bold');
  }
  if (keepItalic) {
    node.toggleFormat('italic');
  }
  if (keepSuperscript) {
    node.toggleFormat('superscript');
  }
  if (keepSubscript) {
    node.toggleFormat('subscript');
  }
};

export default function TextNodeStylingPlugin({
  allowedStyles,
}: {
  allowedStyles?: AllowedStyles[];
}): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerNodeTransform(TextNode, (node) => {
      const allowedFormats: AllowedStyles[] = allowedStyles ?? [];

      if (allowedStyles === undefined) {
        allowedFormats.push('bold', 'italic', 'superscript', 'subscript');
      }

      applyAllowedFormats(node, allowedFormats);
    });
  }, [editor, allowedStyles]);

  return null;
}

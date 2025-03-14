import {
  DOMExportOutput,
  LexicalEditor,
  LexicalNode,
  ParagraphNode,
  TextNode,
  DOMExportOutputMap,
  Klass,
} from 'lexical';
import { HeadingNode } from '@lexical/rich-text';

export const htmlExportMap: DOMExportOutputMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [
    // Declare allowed node types in the map
    TextNode,
    (editor: LexicalEditor, node: LexicalNode) => {
      const textNode = node as TextNode;

      let element = textNode.createDOM(editor._config, editor);
      const formatting = {
        italic: textNode.hasFormat('italic'),
        bold: textNode.hasFormat('bold'),
      };

      element = ApplyFormatting(element, formatting);

      return {
        element: element,
        after: (element) => {
          //remove empty <span>tags created by lexical
          if (
            (element as HTMLElement).tagName === 'SPAN' &&
            (element as HTMLElement).attributes.length === 0
          ) {
            return element?.textContent as unknown as Text;
          }

          return element as HTMLElement | Text | null | undefined;
        },
      };
    },
  ],
  [
    ParagraphNode,
    (editor: LexicalEditor, node: LexicalNode) => {
      const paragraphNode = node as ParagraphNode;
      const element = paragraphNode.createDOM(editor._config);
      element.removeAttribute('dir');
      return {
        element: element,
      };
    },
  ],
  [
    HeadingNode,
    (editor: LexicalEditor, node: LexicalNode) => {
      const headingNode = node as HeadingNode;
      const element = headingNode.createDOM(editor._config);
      element.removeAttribute('dir');
      return {
        element: element,
      };
    },
  ],
]);

const MAPPING: Record<string, string> = {
  bold: 'strong',
  italic: 'em',
  // strikethrough: "s",
  // underline: "u"
};

export function ApplyFormatting(
  element: HTMLElement,
  formatting: Record<string, boolean>,
) {
  //no formatting needed;
  if (Object.keys(formatting).every((key) => formatting[key] === false)) {
    return element;
  }

  //formatting is needed
  const text = element.innerText;
  const el = document.createElement('span'); //create temp span element
  el.innerText = text;

  const tagNames = Object.keys(formatting)
    .filter((key) => formatting[key])
    .map((key) => MAPPING[key]);

  const wrappedElement = tagNames.reduceRight((wrapped, tagName) => {
    const el = document.createElement(tagName);
    el.appendChild(wrapped);
    return el;
  }, el);

  el.childNodes.length > 0 && el.childNodes.length < 2
    ? el.replaceWith(el.childNodes.item(0)) //removes the temp span element
    : console.error('Error with Lexical custom textNode.');

  return wrappedElement;
}

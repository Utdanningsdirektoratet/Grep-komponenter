import {
  DraftDecorator,
  CompositeDecorator,
  ContentState,
  EditorState,
  RichUtils,
} from 'draft-js';

import {
  stateToHTML,
  Options as Convert2htmlOptions,
} from 'draft-js-export-html';

import { stateFromHTML } from 'draft-js-import-html';
import { InlineStyle } from '../components/buttons';

export const createState = (
  content?: string,
  decorators?: DraftDecorator[],
): EditorState => {
  const decorator = decorators ? new CompositeDecorator(decorators) : undefined;
  if (content) {
    const state = stateFromHTML(content);
    return EditorState.createWithContent(state, decorator);
  }
  return EditorState.createEmpty(decorator);
};

export type ParsedContent = { txt: string; html: string };

export const convert2html = (
  content: ContentState,
  options: Convert2htmlOptions = {
    inlineStyles: {
      BOLD: { element: 'strong' },
      ITALIC: { element: 'i' },
      UNSTYLED: { element: 'p' },
    },
  },
): string => {
  const html = content.getPlainText().trim().length
    ? stateToHTML(content, options)
    : '';
  return html; //.replace(/&nbsp;/, ' ');
};

export const convert2txt = (content: ContentState): string =>
  content.getPlainText();

export const parseContentState = (state: ContentState) => ({
  txt: convert2txt(state).trim(),
  html: convert2html(state),
});

export const parseContent = (
  content?: string,
  decorators?: DraftDecorator[],
): ParsedContent =>
  parseContentState(createState(content, decorators).getCurrentContent());

export const UpdateStyle = (
  state: EditorState,
  style: InlineStyle,
): EditorState => RichUtils.toggleInlineStyle(state, style);

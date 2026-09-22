import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  PointType,
  RangeSelection,
} from 'lexical';
import DOMPurify from 'dompurify';

const PLACEHOLDER_CLASS_NAME = 'lexicalEditor-placeholder';

export const getAllLexicalChildren = (editor: LexicalEditor) => {
  const childrenKeys = editor
    .getEditorState()
    .read(() => $getRoot().getChildrenKeys());

  return childrenKeys.map((key) => ({
    key: key,
    node: $getNodeByKey(key),
    htmlElement: editor.getElementByKey(key),
  }));
};

export const setPlaceholderOnSelection = ({
  selection,
  editor,
  placeholder,
}: {
  selection: RangeSelection;
  editor: LexicalEditor;
  placeholder: string;
}): void => {
  /**
   * 1. Get all lexical nodes as HTML elements
   */
  const children = getAllLexicalChildren(editor);

  /**
   * 2. Remove "placeholder" class if it was added before
   */
  children.forEach(({ htmlElement }) => {
    if (!htmlElement) {
      return;
    }
    const classList = htmlElement.classList;
    if (classList.length && classList.contains(PLACEHOLDER_CLASS_NAME)) {
      classList.remove(PLACEHOLDER_CLASS_NAME);
    }
  });

  /**
   * 3. Do nothing if there is more than one lexical child,
   * since we only apply one placeholder in total.
   */
  if (children.length > 1) {
    return;
  }

  /**
   * 4. Get "PointType" object, that contain Nodes data
   */
  const anchor: PointType = selection.anchor;

  placeholder = DOMPurify.sanitize(placeholder?.replace(/<[^>]+>/g, ''));
  if (placeholder) {
    const selectedHtmlElement = editor.getElementByKey(anchor.key);

    selectedHtmlElement?.classList.add(PLACEHOLDER_CLASS_NAME);
    selectedHtmlElement?.setAttribute('data-placeholder', placeholder);
  }
};

export const setNodePlaceholderFromSelection = (
  editor: LexicalEditor,
  placeholder: string,
): void => {
  editor.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      // Do nothing if user selected node's content
      return;
    }
    setPlaceholderOnSelection({ selection, editor, placeholder });
  });
};

export const AddPlaceholderPlugin = ({
  placeholder,
}: {
  placeholder?: string;
}): null => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (placeholder) {
      return editor.registerUpdateListener(() => {
        setNodePlaceholderFromSelection(editor, placeholder ?? '');
      });
    } else {
      return;
    }
  }, [editor, placeholder]);

  return null;
};

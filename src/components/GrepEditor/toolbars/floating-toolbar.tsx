import React, { useContext, useRef, useEffect, useState } from 'react';

import { getVisibleSelectionRect } from 'draft-js';

import { ToggleButtonGroup } from '@material-ui/lab';

import EditorContext from '../context';

import { InlineButton } from '../buttons';

import useStyles from './floating-toolbar.style';

import { ToolbarPropperties } from '.';
import { GrepEditor } from '../editor';

type Component = React.FunctionComponent<ToolbarPropperties>;

export const FloatingToolbar: Component = ({
  editor,
  buttons,
}: ToolbarPropperties) => {
  const { selection } = useContext(EditorContext);
  const [isVisible, setVisibility] = useState(false);
  const toolbar = useRef<HTMLDivElement>();

  // @eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const selectionRect = getVisibleSelectionRect(window);
    if (!selectionRect || !toolbar.current || !editor.current) return;

    const editorRoot = (editor.current as GrepEditor).editorContainer;
    const editorRootRect = editorRoot.getBoundingClientRect();
    const position = {
      top:
        editorRoot.offsetTop -
        toolbar?.current?.offsetHeight +
        (selectionRect.top - editorRootRect.top) -
        5,
      left:
        editorRoot.offsetLeft +
        (selectionRect.left - editorRootRect.left) +
        selectionRect.width / 2,
    };
    toolbar.current.style.top = `${position.top}px`;
    toolbar.current.style.left = `${position.left}px`;

    setVisibility(
      !!selection && !selection.isCollapsed() && selection.getHasFocus(),
    );
  });
  const styles = useStyles({ isVisible });
  return (
    <div
      ref={toolbar as React.MutableRefObject<HTMLDivElement>}
      className={styles.root}
    >
      <ToggleButtonGroup>
        {buttons.map(({ type, children }, key) => (
          <InlineButton key={key} type={type} editor={editor}>
            {children}
          </InlineButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default FloatingToolbar;

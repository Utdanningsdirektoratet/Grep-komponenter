import React, { useContext } from 'react';
import { Editor } from 'draft-js';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';

import { UpdateStyle } from '../../misc/utils';
import { useButtonStyles } from '../../styles';
import EditorContext from '../../context';
import { InlineStyle } from '.';

interface Properties extends Omit<ToggleButtonProps, 'value' | 'type'> {
  editor: React.MutableRefObject<Editor>;
  type: InlineStyle;
}

type Component = React.FunctionComponent<React.PropsWithChildren<Properties>>;

const InlineButton: Component = ({
  type,
  editor: _editor,
  children,
  ...props
}: React.PropsWithChildren<Properties>) => {
  const { classes } = useButtonStyles();
  const { state, setState } = useContext(EditorContext);

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    event.preventDefault();
    const e = event as React.MouseEvent<HTMLButtonElement, MouseEvent>;
    setState(UpdateStyle(state, e.currentTarget.value));
  };

  const selected = state.getCurrentInlineStyle().has(type);

  return (
    <ToggleButton
      {...props}
      classes={{ root: classes.btn, selected: classes.btnSelected }}
      selected={selected}
      onClick={onClick}
      value={type}
      size="small"
    >
      {children}
    </ToggleButton>
  );
};

export default InlineButton;

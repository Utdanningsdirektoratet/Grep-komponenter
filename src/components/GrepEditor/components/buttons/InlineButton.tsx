import React, { useContext } from 'react';
import { Editor } from 'draft-js';

import ToggleButton, { ToggleButtonProps } from '@material-ui/lab/ToggleButton';

import EditorContext from '../../context';
import { UpdateStyle } from '../../misc/utils';
import { InlineStyle } from '.';
import { useStyles } from './styles';

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
  const classes = useStyles({});
  const { state, setState } = useContext(EditorContext);

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
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

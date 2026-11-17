import React from 'react';
import ToggleButton, {
  type ToggleButtonProps,
} from '@mui/material/ToggleButton';

import { useButtonStyles } from '../../styles';
import type{ ButtonType } from '.';
import { FORMAT_TEXT_COMMAND, type LexicalEditor } from 'lexical';

interface Properties extends Omit<ToggleButtonProps, 'value' | 'type'> {
  editor: LexicalEditor;
  type: ButtonType;
  selected: boolean;
}

type Component = React.FunctionComponent<React.PropsWithChildren<Properties>>;

const LexicalButton: Component = ({
  type,
  editor,
  children,
  selected,
  ...props
}: React.PropsWithChildren<Properties>) => {
  const { classes } = useButtonStyles();

  return (
    <ToggleButton
      classes={{ root: classes.btn, selected: classes.btnSelected }}
      value={type}
      selected={selected}
      size="small"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
      }}
      aria-label={`format text as ${type.toLowerCase}`}
      {...props}
    >
      {children}
    </ToggleButton>
  );
};

export default LexicalButton;

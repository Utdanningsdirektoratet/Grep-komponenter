import * as React from 'react';
import { Container } from '@mui/material';
import { storiesOf } from '@storybook/react';

import GrepEditor from '..';
import { makeStyles } from '../../../styling';
import { InlineButton } from '../components/buttons';
import { ToolbarPropperties } from '../components/toolbars';
import { convert2html, convert2txt } from '../misc/utils';

const useStyles = makeStyles()({
  root: {
    background: 'red',
  },
});

const myToolbar: React.FunctionComponent<ToolbarPropperties> = ({
  editor,
  buttons,
}: ToolbarPropperties) => {
  return (
    <div>
      {buttons.map(({ type, children }, key) => (
        <InlineButton key={key} type={type} editor={editor}>
          {children}
        </InlineButton>
      ))}
    </div>
  );
};

storiesOf('GrepEditor', module)
  .addDecorator((storyFn) => (
    <Container
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {storyFn()}
    </Container>
  ))
  .add('Standard', () => <GrepEditor />)
  .add('Custom styles', () => {
    const { classes } = useStyles();

    return <GrepEditor classes={classes} />;
  })
  .add('Custom toolbar', () => <GrepEditor Toolbar={myToolbar} />)
  .add('Custom buttons', () => (
    <GrepEditor
      allowedStyles={['bold']}
      helperText="Some help text"
      onContentChange={(c) => {
        console.log(convert2txt(c));
        console.log(convert2html(c));
      }}
    />
  ))
  .add('Paste stripping and blocked inline styles', () => (
    <GrepEditor stripPastedStyles allowedStyles={[]} />
  ))
  .add('With character count', () => (
    <GrepEditor showCharCount helperText="Marker tekst for formatering" />
  ))
  .add('Disable and strip newlines', () => (
    <GrepEditor
      disableNewlines
      onContentChange={(c) => {
        console.log(convert2txt(c));
        console.log(convert2html(c));
      }}
    />
  ));

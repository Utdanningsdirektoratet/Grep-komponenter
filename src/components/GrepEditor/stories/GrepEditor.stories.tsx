import * as React from 'react';
import { Container } from '@mui/material';

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

export default {
  title: 'GrepEditor',

  decorators: [
    (storyFn: any) => (
      <Container
        style={{
          marginTop: 40,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {storyFn()}
      </Container>
    ),
  ],
};

export const Standard = () => <GrepEditor />;

export const CustomStyles = () => {
  const { classes } = useStyles();

  return <GrepEditor classes={classes} />;
};

CustomStyles.story = {
  name: 'Custom styles',
};

export const CustomToolbar = () => <GrepEditor Toolbar={myToolbar} />;

CustomToolbar.story = {
  name: 'Custom toolbar',
};

export const CustomButtons = () => (
  <GrepEditor
    allowedStyles={['bold']}
    helperText="Some help text"
    onContentChange={(c) => {
      console.log(convert2txt(c));
      console.log(convert2html(c));
    }}
  />
);

CustomButtons.story = {
  name: 'Custom buttons',
};

export const PasteStrippingAndBlockedInlineStyles = () => (
  <GrepEditor stripPastedStyles allowedStyles={[]} />
);

PasteStrippingAndBlockedInlineStyles.story = {
  name: 'Paste stripping and blocked inline styles',
};

export const WithCharacterCount = () => (
  <GrepEditor showCharCount helperText="Marker tekst for formatering" />
);

WithCharacterCount.story = {
  name: 'With character count',
};

export const DisableAndStripNewlines = () => (
  <GrepEditor
    disableNewlines
    onContentChange={(c) => {
      console.log(convert2txt(c));
      console.log(convert2html(c));
    }}
  />
);

DisableAndStripNewlines.story = {
  name: 'Disable and strip newlines',
};

export const DisablePasting = () => (
  <GrepEditor
    blockPasting
    onContentChange={(c) => {
      console.log(convert2txt(c));
      console.log(convert2html(c));
    }}
  />
);

DisablePasting.story = {
  name: 'Disable pasting',
};

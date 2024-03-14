import * as React from 'react';
import { Container } from '@mui/material';

import GrepEditor from '..';
import { makeStyles } from '../../../styling';
import { ToolbarProperties } from '../entities';
import { $getTextContent } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import LexicalButton from '../components/buttons/InlineButton';

const useStyles = makeStyles()({
  root: {
    background: 'red',
  },
});

const myToolbar: React.FunctionComponent<ToolbarProperties> = ({
  buttons,
  editor,
  isSelected,
}: ToolbarProperties) => {
  return (
    <div>
      {buttons.map(({ type, children }, key) => (
        <LexicalButton
          key={key}
          type={type}
          editor={editor}
          selected={isSelected[key]}
        >
          {children}
        </LexicalButton>
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
          flexDirection: 'column',
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
    onContentChange={(editorState, editor) => {
      editorState.read(() => {
        console.log('Lexical-text', $getTextContent());
        console.log('Lexical-html', $generateHtmlFromNodes(editor));
      });
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
  <GrepEditor
    showCharCount
    helperText="Marker tekst for formatering"
    onContentChange={(editorState, editor) => {
      editorState.read(() => {
        console.log('Lexical-text', $getTextContent());
        console.log('Lexical-html', $generateHtmlFromNodes(editor));
      });
    }}
  />
);

WithCharacterCount.story = {
  name: 'With character count',
};

export const DisableAndStripNewlines = () => (
  <GrepEditor
    disableNewlines
    onContentChange={(editorState, editor) => {
      editorState.read(() => {
        console.log('Lexical-text', $getTextContent());
        console.log('Lexical-html', $generateHtmlFromNodes(editor));
      });
    }}
  />
);

DisableAndStripNewlines.story = {
  name: 'Disable and strip newlines',
};

export const DisablePasting = () => (
  <GrepEditor
    blockPasting
    onContentChange={(editorState, editor) => {
      editorState.read(() => {
        console.log('Lexical-text', $getTextContent());
        console.log('Lexical-html', $generateHtmlFromNodes(editor));
      });
    }}
  />
);

DisablePasting.story = {
  name: 'Disable pasting',
};

export const WithLabel = () => <GrepEditor label="This is a label" />;

WithLabel.story = {
  name: 'With label',
};

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

export const CustomStyles = {
  render: () => {
    const { classes } = useStyles();

    return <GrepEditor classes={classes} />;
  },

  name: 'Custom styles',
};

export const CustomToolbar = {
  render: () => <GrepEditor Toolbar={myToolbar} />,
  name: 'Custom toolbar',
};

export const CustomButtons = {
  render: () => (
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
  ),

  name: 'Custom buttons',
};

export const PasteStrippingAndBlockedInlineStyles = {
  render: () => <GrepEditor stripPastedStyles allowedStyles={[]} />,

  name: 'Paste stripping and blocked inline styles',
};

export const WithCharacterCount = {
  render: () => (
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
  ),

  name: 'With character count',
};

export const DisableAndStripNewlines = {
  render: () => (
    <GrepEditor
      disableNewlines
      onContentChange={(editorState, editor) => {
        editorState.read(() => {
          console.log('Lexical-text', $getTextContent());
          console.log('Lexical-html', $generateHtmlFromNodes(editor));
        });
      }}
    />
  ),

  name: 'Disable and strip newlines',
};

export const DisablePasting = {
  render: () => (
    <GrepEditor
      blockPasting
      onContentChange={(editorState, editor) => {
        editorState.read(() => {
          console.log('Lexical-text', $getTextContent());
          console.log('Lexical-html', $generateHtmlFromNodes(editor));
        });
      }}
    />
  ),

  name: 'Disable pasting',
};

export const WithLabel = {
  render: () => <GrepEditor label="This is a label" />,
  name: 'With label',
};

export const OnlyHeading = {
  render: () => (
    <GrepEditor html="<h3>This is an h3 tag, but it could be any heading tag between h1 and h6 based on html input.</h3>" />
  ),

  name: 'OnlyHeading',
};

export const ReadOnly = {
  render: () => (
    <GrepEditor readOnly html="This is some text you cannot edit" />
  ),

  name: 'ReadOnly',
};

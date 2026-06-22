import * as React from 'react';
import { Container } from '@mui/material';

import GrepEditor from '..';
import { makeStyles } from '../../../styling';
import { ToolbarProperties } from '../entities';
import { $getTextContent } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import LexicalButton from '../components/buttons/InlineButton';
import { Meta, StoryObj } from '@storybook/react-vite';

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
          key={Math.random()}
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
const EditorWithStyles = () => {
  const { classes } = useStyles();
  return <GrepEditor classes={classes} />;
};

const meta = {
  title: 'GrepEditor',
  component: GrepEditor,
  args: {
    onContentChange: (editorState, editor) => {
      editorState.read(() => {
        console.log('Lexical-text', $getTextContent());
        console.log('Lexical-html', $generateHtmlFromNodes(editor));
      });
    },
  },
  decorators: [
    (storyFn: () => React.ReactNode) => (
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
} satisfies Meta<typeof GrepEditor>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const CustomStyles: Story = {
  render: () => <EditorWithStyles />,
  name: 'Custom styles',
};

export const CustomToolbar: Story = {
  args: { Toolbar: myToolbar },
  name: 'Custom toolbar',
};

export const CustomButtons: Story = {
  args: {
    allowedStyles: ['bold'],
    helperText: 'Some help text',
  },

  name: 'Custom buttons',
};

export const PasteStrippingAndBlockedInlineStyles: Story = {
  args: { stripPastedStyles: true, allowedStyles: [] },
  name: 'Paste stripping and blocked inline styles',
};

export const WithCharacterCount: Story = {
  args: {
    showCharCount: true,
    helperText: 'Marker tekst for formatering',
  },
  name: 'With character count',
};

export const DisableAndStripNewlines: Story = {
  args: {
    disableNewlines: true,
  },
  name: 'Disable and strip newlines',
};

export const DisablePasting: Story = {
  args: {
    blockPasting: true,
  },
  name: 'Disable pasting',
};

export const WithLabel: Story = {
  args: {
    label: 'This is a label',
  },
  name: 'With label',
};

export const OnlyHeading: Story = {
  args: {
    html: '<h3>This is an h3 tag, but it could be any heading tag between h1 and h6 based on html input.</h3>',
  },
  name: 'OnlyHeading',
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    html: 'This is some text you cannot edit',
  },
  name: 'ReadOnly',
};

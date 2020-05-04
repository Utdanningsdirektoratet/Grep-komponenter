import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CenterLayout from '../CenterLayout/CenterLayout';
import GrepEditor from '.';

import { ToolbarPropperties } from './toolbars';
import { InlineButton } from './buttons';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(
  createStyles({
    root: {
      background: 'red',
    },
  }),
);

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
  .addDecorator(storyFn => (
    <CenterLayout
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {storyFn()}
    </CenterLayout>
  ))
  .add('Standard', () => <GrepEditor />)
  .add('Custom styles', () => {
    const classes = useStyles({});

    return <GrepEditor classes={classes} />;
  })
  .add('Custom toolbar', () => <GrepEditor Toolbar={myToolbar} />)
  .add('Paste stripping and blocked inline styles', () => (
    <GrepEditor stripPastedStyles canInlineStyle={false} />
  ));

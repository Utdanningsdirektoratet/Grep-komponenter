import React from 'react';

import Editor from './components/editor';
import { Properties } from './entities';

type Component = React.FunctionComponent<Properties>;

/* To have both italic and bold styles apply, css rules need to be added as per: https://lexical.dev/docs/getting-started/theming */
const GrepEditor: Component = ({ ...props }: Properties) => {
  return <Editor {...props} />;
};

export default GrepEditor;

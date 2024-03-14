import React from 'react';
import './styles/styles.css';

import LexicalGrepEditor from './components/editor';
import { Properties } from './entities';

type Component = React.FunctionComponent<Properties>;

const GrepEditor: Component = ({ ...props }: Properties) => {
  return <LexicalGrepEditor {...props} />;
};

export default GrepEditor;

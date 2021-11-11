import React from 'react';

import ContextProvider, {
  GrepTableOfContentProviderProps as ContextProviderProps,
} from './context/provider';

import Nav from './components/nav';

export interface GrepTableOfContentProps extends ContextProviderProps {
  style?: React.CSSProperties;
  className?: string;
}

export const GrepTableOfContent: React.FC<GrepTableOfContentProps> = ({
  style,
  className,
  ...props
}) => {
  return (
    <ContextProvider {...props}>
      <Nav className={className} style={style} />
    </ContextProvider>
  );
};

GrepTableOfContent.displayName = 'Grep.ToC';

export default GrepTableOfContent;

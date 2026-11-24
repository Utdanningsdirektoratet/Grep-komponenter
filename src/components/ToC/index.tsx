import React from 'react';

import ContextProvider, {
  type GrepTableOfContentProviderProps as ContextProviderProps,
} from './context/provider';

import Nav from './components/nav';

export interface GrepTableOfContentProps extends ContextProviderProps {
  style?: React.CSSProperties;
  className?: string;
  setSelectedValue: (selected: unknown) => void;
  percentageRendered: number;
}

export const GrepTableOfContent: React.FC<GrepTableOfContentProps> = ({
  style,
  className,
  setSelectedValue,
  percentageRendered,
  ...props
}: GrepTableOfContentProps) => {
  return (
    <ContextProvider {...props}>
      <Nav
        className={className}
        style={style}
        setSelectedValue={setSelectedValue}
        percentageRendered={percentageRendered}
      />
    </ContextProvider>
  );
};

GrepTableOfContent.displayName = 'Grep.ToC';

export default GrepTableOfContent;

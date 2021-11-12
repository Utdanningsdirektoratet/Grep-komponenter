import React from 'react';

import ContextProvider, {
  GrepTableOfContentProviderProps as ContextProviderProps,
} from './context/provider';

import Nav from './components/nav';

export interface GrepTableOfContentProps extends ContextProviderProps {
  style?: React.CSSProperties;
  className?: string;
  isSelectedHandler?: (
    isSelected: boolean,
    linkRef: React.RefObject<HTMLLIElement>,
  ) => void;
  onFocusSelected?: (ref: React.RefObject<HTMLElement>) => void;
}

export const GrepTableOfContent: React.FC<GrepTableOfContentProps> = ({
  style,
  className,
  isSelectedHandler,
  onFocusSelected,
  ...props
}: GrepTableOfContentProps) => {
  return (
    <ContextProvider {...props}>
      <Nav
        className={className}
        style={style}
        isSelectedHandler={isSelectedHandler}
        onFocusSelected={onFocusSelected}
      />
    </ContextProvider>
  );
};

GrepTableOfContent.displayName = 'Grep.ToC';

export default GrepTableOfContent;

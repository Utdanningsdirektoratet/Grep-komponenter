import React from 'react';

interface Context {
  elements: Record<number, HTMLElement>;
  setSelected: (el: HTMLElement, scroll?: boolean) => void;
  selected?: HTMLElement;
  classes?: Record<'nav' | 'tree' | 'node' | 'link', string>;
  offsetTop?: number;
}

const initial = {
  elements: {},
  setSelected: () => {
    throw Error('not implemented');
  },
};

const context = React.createContext<Context>(initial);
context.displayName = 'Grep.ToC.Context';

export { context as GrepTableOfContentContex };
export default context;

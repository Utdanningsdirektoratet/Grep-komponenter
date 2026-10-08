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

const Context = React.createContext<Context>(initial);
Context.displayName = 'Grep.ToC.Context';

export { Context as GrepTableOfContentContex };
export default Context;

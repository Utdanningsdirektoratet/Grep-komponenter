import { useState, useEffect, useCallback } from 'react';

const filterElements = (match?: RegExp) => (elements: Array<HTMLElement>) => {
  return match ? elements.filter((el) => el.nodeName.match(match)) : elements;
};

interface Options {
  filter?: (element: HTMLElement) => boolean;
  config?: MutationObserverInit;
  identify?: (element: HTMLElement) => string;
}

const defaultOptions: Options = {
  identify: (el: HTMLElement) => el.id,
  config: {
    attributes: false,
    childList: true,
    subtree: true,
  },
};

export const useContentElements = (
  container: Element | null,
  selector: string,
  options?: Options,
) => {
  const { filter, config, identify } = {
    ...defaultOptions,
    ...options,
  };

  const [elements, setElements] = useState<Record<string, HTMLElement>>({});

  const getElements = useCallback(() => {
    const all = Array.from(container!.querySelectorAll<HTMLElement>(selector));
    const elements = filter ? all.filter(filter) : all;
    return elements.reduce(
      (curr: Record<string, HTMLElement>, el: HTMLElement) => {
        const id = identify!(el);
        if (curr[id]) throw Error('duplicate identifiers!');
        curr[id] = el;
        return curr;
      },
      {},
    );
  }, [container, selector, identify, filter]);

  useEffect(() => {
    // early exit, nothing to observe
    if (!container) return;

    // set current elements
    setElements(getElements());

    // Observe changes in DOM
    const observer = new MutationObserver(() => {
      setElements(getElements());
    });

    // start observing
    observer.observe(container, config);

    console.debug('observing container', container);

    // stop observing when unmounted
    return () => {
      observer.disconnect();
      console.debug('observing disconnected', container);
    };
  }, [container, config, getElements]);

  return elements;
};

export { filterElements as filterContentElements };

export default useContentElements;

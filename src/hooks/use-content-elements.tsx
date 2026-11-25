import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // early exit, nothing to observe
    if (!container) return;

    const updateElements = () => {
      const all = Array.from(container.querySelectorAll<HTMLElement>(selector));
      const matches = filter ? all.filter(filter) : all;
      const next = matches.reduce(
        (curr: Record<string, HTMLElement>, el: HTMLElement) => {
          const id = identify!(el);
          if (curr[id]) throw Error('duplicate identifiers!');
          curr[id] = el;
          return curr;
        },
        {},
      );

      setElements((previous) => {
        const previousIds = Object.keys(previous);
        const nextIds = Object.keys(next);
        const unchanged =
          previousIds.length === nextIds.length &&
          previousIds.every(
            (id, index) => id === nextIds[index] && previous[id] === next[id],
          );

        return unchanged ? previous : next;
      });
    };

    updateElements();

    // Observe changes in DOM
    const observer = new MutationObserver(updateElements);

    // start observing
    observer.observe(container, config);

    // stop observing when unmounted
    return () => {
      observer.disconnect();
    };
  }, [container, selector, filter, identify, config]);

  return elements;
};

export { filterElements as filterContentElements };

export default useContentElements;

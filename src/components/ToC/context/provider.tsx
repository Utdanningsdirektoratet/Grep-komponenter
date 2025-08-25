import React, { useState, useCallback, useEffect, useMemo } from 'react';
import throttle from 'lodash.throttle';

import { useContentElements } from '../../../hooks/use-content-elements';

import {
  generateElementId,
  identifyElement,
  IdentifyElement,
} from '../utils/identity-element';

import Context from '.';
import { useLocation } from 'react-router';

const defaultSelector = [...new Array(9)]
  .map((_, i) => `h${i + 1}:not([role="presentation"])`)
  .join(',');

export type GrepTableOfContentProviderProps = React.PropsWithChildren<{
  container: HTMLElement | null;
  scrollTarget?: HTMLElement;
  className?: string;
  style?: React.CSSProperties;
  identifier?: IdentifyElement;
  identifyElementFn?: (
    identifier: IdentifyElement,
  ) => (el: HTMLElement) => string;
  onSelected?: (el: HTMLElement) => void;
  classes?: Record<'nav' | 'tree' | 'node' | 'link', string>;
  selector?: string;
  filter?: (element: HTMLElement) => boolean;
  offsetTop?: number;
}>;

export const GrepTableOfContentProvider: React.FC<
  GrepTableOfContentProviderProps
> = ({ ...props }) => {
  const {
    container,
    identifier,
    onSelected,
    classes,
    scrollTarget,
    children,
    offsetTop = -10,
    identifyElementFn = identifyElement,
  } = props;

  const [selected, _setSelected] = useState<HTMLElement>();
  const [initialized, setInitialized] = useState<boolean>();

  const hash = useLocation().hash;

  const scrollToElement = useCallback(
    (element: HTMLElement) => {
      const target = scrollTarget || window;
      const elementBounds = element.getBoundingClientRect();
      const elementTop = elementBounds.top - element.clientHeight;
      const top = elementTop - offsetTop;
      target.scrollBy({ top });
    },
    [scrollTarget, offsetTop],
  );

  const identify = useMemo(() => {
    return identifyElementFn(identifier || generateElementId);
  }, [identifier, identifyElementFn]);

  const elements = useContentElements(
    container,
    props.selector || defaultSelector,
    { identify },
  );

  const setSelected = useCallback(
    throttle(
      (element: HTMLElement, scroll?: boolean) => {
        element && scroll && scrollToElement(element);
        _setSelected(element);
      },
      50,
      { trailing: false },
    ),
    [_setSelected, scrollToElement],
  );

  const getViewportElement = useCallback(() => {
    const records = Object.values(elements);
    if (!records.length) return;
    const index = records.findIndex(
      (e) => e.getBoundingClientRect().bottom > offsetTop,
    );
    if (index > 0) {
      const rect = records[index].getBoundingClientRect();
      const offset = Math.floor(rect.top - offsetTop);
      const within = offset < rect.height + 20;
      return records[within ? index : index - 1];
    }
    return records[index];
  }, [elements, offsetTop]);

  // attach observer to elements
  useEffect(() => {
    const target = scrollTarget || window;
    if (!target) return;

    const onScroll = throttle(() => {
      const element = getViewportElement();
      setSelected(element as HTMLElement);
    }, 50);
    target.addEventListener('scroll', onScroll, false);

    return () => {
      return target.removeEventListener('scroll', onScroll);
    };
  }, [scrollTarget, setSelected, offsetTop, getViewportElement]);

  // notify observer when selected change
  useEffect(() => {
    selected && onSelected && onSelected(selected);
  }, [selected, onSelected]);

  // observe changes in hash
  useEffect(() => {
    if (hash && elements[hash]) {
      setSelected(elements[hash], true);
    }
  }, [hash, setSelected]);

  // set selected element on initial load
  if (!initialized && elements && elements[hash]) {
    setSelected(elements[hash], true);
    setInitialized(true);
  }

  return (
    <Context.Provider value={{ elements, selected, classes, setSelected }}>
      {children}
    </Context.Provider>
  );
};

GrepTableOfContentProvider.displayName = 'Grep.ToC.Provider';

export default GrepTableOfContentProvider;

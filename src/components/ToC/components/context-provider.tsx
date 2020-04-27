import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { getHash } from 'connected-react-router';

import _ from 'lodash';

import { useContentElements } from '../../../hooks/use-content-elements';

import { identifyElement, IdentifyElement } from '../utils/identity-element';

import Context from '../context';
import { useSelector } from 'react-redux';

const defaultSelector = [...new Array(9)]
  .map((_, i) => `h${i + 1}:not([role="presentation"])`)
  .join(',');

export type GrepTableOfContentProviderProps = React.PropsWithChildren<{
  container: HTMLElement | null;
  scrollTarget?: HTMLElement;
  className?: string;
  style?: React.CSSProperties;
  identifier?: IdentifyElement;
  onSelected?: (el: HTMLElement) => void;
  classes?: Record<'nav' | 'tree' | 'node' | 'link', string>;
  selector?: string;
  filter?: (element: HTMLElement) => boolean;
  offsetTop?: number;
}>;

export const GrepTableOfContentProvider: React.FC<GrepTableOfContentProviderProps> = ({
  ...props
}) => {
  const {
    container,
    identifier,
    onSelected,
    classes,
    scrollTarget,
    children,
    offsetTop = -10,
  } = props;

  const [selected, _setSelected] = useState<HTMLElement>();
  const [initialized, setInitialized] = useState<boolean>();

  const hash = useSelector((s) => decodeURI(getHash(s as any))).substring(1);

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
    return identifyElement(identifier);
  }, [identifier]);

  const elements = useContentElements(
    container,
    props.selector || defaultSelector,
    { identify },
  );

  const setSelected = useCallback(
    _.throttle(
      (element: HTMLElement, scroll?: boolean) => {
        if (element && !Object.values(elements).includes(element)) {
          throw Error('Invalid element');
        }
        element && scroll && scrollToElement(element);
        _setSelected(element);
      },
      50,
      { trailing: false },
    ),
    [_setSelected, elements, scrollToElement],
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
      console.log(offset);
      const within = offset < rect.height + 20;
      return records[within ? index : index - 1];
    }
    return records[index];
  }, [elements, offsetTop]);

  const getBrowserElement = useCallback(() => {
    return elements[hash] || getViewportElement();
  }, [elements, hash, getViewportElement]);

  // attach observer to elements
  useEffect(() => {
    const target = scrollTarget || window;
    if (!target) return;

    const onScroll = _.throttle(() => {
      const element = getViewportElement();
      setSelected(element as HTMLElement);
    }, 50);
    target.addEventListener('scroll', onScroll, false);

    console.debug('scroll observer attached');

    return () => {
      console.debug('scroll observer detached');
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
  if (!initialized) {
    console.log(hash);
    const element = getBrowserElement();
    if (element) {
      setSelected(element, true);
      setInitialized(true);
    }
  }

  return (
    <Context.Provider value={{ elements, selected, classes, setSelected }}>
      {children}
    </Context.Provider>
  );
};

GrepTableOfContentProvider.displayName = 'Grep.ToC.Provider';

export default GrepTableOfContentProvider;

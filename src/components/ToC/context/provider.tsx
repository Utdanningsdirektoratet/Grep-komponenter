import React, { useState, useEffect, useMemo } from 'react';
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

  const [selected, setSelected] = useState<HTMLElement>();
  const hash = useLocation().hash;

  const identify = useMemo(() => identifyElementFn(identifier || generateElementId),
    [identifier, generateElementId, identifyElementFn]
  );

  const elements = useContentElements(
    container,
    props.selector || defaultSelector,
    { identify },
  );

  // Preserve throttle state across selection updates.
  const _setSelected = useMemo(
    () =>
      throttle(
        (element: HTMLElement, scroll?: boolean) => {
          if (element && scroll) {
            const target = scrollTarget || window;
            const elementBounds = element.getBoundingClientRect();
            const elementTop = elementBounds.top - element.clientHeight;
            const top = elementTop - offsetTop;
            target.scrollBy({ top });
          }
          setSelected(element);
        },
        50,
        { trailing: false },
      ),
    [scrollTarget, offsetTop],
  );

  useEffect(() => () => _setSelected.cancel(), [_setSelected]);

  useEffect(() => {
    const target = scrollTarget || window;

    const getViewportElement = () => {
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
    };

    const onScroll = throttle(() => {
      const element = getViewportElement();
      if (element) _setSelected(element);
    }, 50);
    target.addEventListener('scroll', onScroll, false);

    return () => {
      target.removeEventListener('scroll', onScroll);
      onScroll.cancel();
    };
  }, [scrollTarget, _setSelected, offsetTop, elements]);

  // notify observer when selected change
  useEffect(() => {
    selected && onSelected && onSelected(selected);
  }, [selected, onSelected]);

  // observe changes in hash
  useEffect(() => {
    if (hash && elements[hash]) {
      _setSelected(elements[hash], true);
    }
  }, [hash, elements, _setSelected]);

  return (
    <Context value={{ elements, selected, classes, setSelected: _setSelected }}>
      {children}
    </Context>
  );
};

GrepTableOfContentProvider.displayName = 'Grep.ToC.Provider';

export default GrepTableOfContentProvider;

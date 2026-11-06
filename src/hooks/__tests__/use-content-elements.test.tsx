import { act, renderHook } from '@testing-library/react';

import { useContentElements } from '../use-content-elements';

describe('useContentElements', () => {
  const createContainer = () => {
    const container = document.createElement('div');
    container.innerHTML =
      '<h2 id="first">First</h2><h2 id="second">Second</h2>';
    return container;
  };

  it('preserves state when callback and observer config identities change', () => {
    const container = createContainer();
    const { result, rerender } = renderHook(() =>
      useContentElements(container, 'h2', {
        identify: (element) => element.id,
        filter: () => true,
        config: { childList: true, subtree: true },
      }),
    );
    const previous = result.current;

    expect(Object.keys(previous)).toEqual(['first', 'second']);

    rerender();

    expect(result.current).toBe(previous);
  });

  it('preserves state after unrelated DOM mutations', async () => {
    const container = createContainer();
    const { result } = renderHook(() => useContentElements(container, 'h2'));
    const previous = result.current;

    await act(async () => {
      container.appendChild(document.createElement('p'));
    });

    expect(result.current).toBe(previous);
  });

  it('keeps the observer attached across rerenders with unchanged inputs', () => {
    const observe = jest.spyOn(MutationObserver.prototype, 'observe');
    const disconnect = jest.spyOn(MutationObserver.prototype, 'disconnect');
    try {
      const container = createContainer();
      const { rerender, unmount } = renderHook(() =>
        useContentElements(container, 'h2'),
      );

      expect(observe).toHaveBeenCalledTimes(1);
      rerender();
      expect(observe).toHaveBeenCalledTimes(1);
      expect(disconnect).not.toHaveBeenCalled();

      unmount();
      expect(disconnect).toHaveBeenCalledTimes(1);
    } finally {
      observe.mockRestore();
      disconnect.mockRestore();
    }
  });

  it('reconfigures the observer when the container or selector changes', () => {
    const container = createContainer();
    const replacement = document.createElement('div');
    replacement.innerHTML = '<h3 id="third">Third</h3>';
    const { result, rerender } = renderHook(
      ({ container, selector }) => useContentElements(container, selector),
      { initialProps: { container, selector: 'h2' } },
    );

    rerender({ container: replacement, selector: 'h3' });
    expect(Object.keys(result.current)).toEqual(['third']);

    rerender({ container: replacement, selector: 'h2' });
    expect(result.current).toEqual({});
  });

  it('updates when matching elements are added, reordered, replaced or removed', async () => {
    const container = createContainer();
    const { result } = renderHook(() => useContentElements(container, 'h2'));
    const third = document.createElement('h2');
    third.id = 'third';

    await act(async () => {
      container.appendChild(third);
    });

    expect(Object.keys(result.current)).toEqual(['first', 'second', 'third']);
    expect(result.current.third).toBe(third);

    await act(async () => {
      container.prepend(third);
    });

    expect(Object.keys(result.current)).toEqual(['third', 'first', 'second']);

    const replacement = document.createElement('h2');
    replacement.id = 'third';

    await act(async () => {
      third.replaceWith(replacement);
    });

    expect(result.current.third).toBe(replacement);

    await act(async () => {
      container.replaceChildren();
    });

    expect(result.current).toEqual({});
  });

  it('updates when the identifying callback changes the keys', () => {
    const container = createContainer();
    const { result, rerender } = renderHook(
      ({ prefix }) =>
        useContentElements(container, 'h2', {
          identify: (element) => `${prefix}${element.id}`,
        }),
      { initialProps: { prefix: '' } },
    );

    rerender({ prefix: 'heading-' });

    expect(Object.keys(result.current)).toEqual([
      'heading-first',
      'heading-second',
    ]);
  });
});

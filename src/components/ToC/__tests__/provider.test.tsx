import { act, renderHook } from '@testing-library/react';
import util from 'node:util';
globalThis.TextEncoder = util.TextEncoder;
import React, { useContext } from 'react';
import { MemoryRouter } from 'react-router';

import Context from '../context';
import Provider, { GrepTableOfContentProviderProps } from '../context/provider';

describe('Table of Contents provider lifecycle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  const setup = (
    initialProps: Partial<GrepTableOfContentProviderProps> = {},
    location = '/',
  ) => {
    const container = document.createElement('div');
    container.innerHTML =
      '<h2 id="first">First</h2><h2 id="second">Second</h2>';
    const first = container.querySelector<HTMLElement>('#first')!;
    const second = container.querySelector<HTMLElement>('#second')!;
    const scrollTarget = document.createElement('div');
    scrollTarget.scrollBy = jest.fn();
    let props: GrepTableOfContentProviderProps = {
      container,
      scrollTarget,
      ...initialProps,
    };
    const hook = renderHook(() => useContext(Context), {
      wrapper: ({ children }: React.PropsWithChildren) => (
        <MemoryRouter initialEntries={[location]}>
          <Provider {...props}>{children}</Provider>
        </MemoryRouter>
      ),
    });
    return {
      ...hook,
      first,
      second,
      scrollTarget,
      updateProps: (next: Partial<GrepTableOfContentProviderProps>) => {
        props = { ...props, ...next };
        hook.rerender();
      },
    };
  };

  it('selects and scrolls to the initial hash after headings are discovered', () => {
    const { result, first, scrollTarget } = setup(
      { identifyElementFn: () => (element) => `#${element.id}` },
      '/#first',
    );

    expect(result.current.selected).toBe(first);
    expect(scrollTarget.scrollBy).toHaveBeenCalledTimes(1);
  });

  it('preserves the throttle, observer and listener across selection updates', () => {
    const observe = jest.spyOn(MutationObserver.prototype, 'observe');
    const disconnect = jest.spyOn(MutationObserver.prototype, 'disconnect');
    const { result, first, second, scrollTarget, rerender } = setup();
    const addListener = jest.spyOn(scrollTarget, 'addEventListener');
    const removeListener = jest.spyOn(scrollTarget, 'removeEventListener');
    const select = result.current.setSelected;

    expect(observe).toHaveBeenCalledTimes(1);
    act(() => select(first));
    rerender();
    expect(result.current.setSelected).toBe(select);
    act(() => result.current.setSelected(second));
    expect(result.current.selected).toBe(first);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(disconnect).not.toHaveBeenCalled();
    expect(addListener).not.toHaveBeenCalled();
    expect(removeListener).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(50);
      result.current.setSelected(second);
    });
    expect(result.current.selected).toBe(second);
  });

  it('uses updated scroll settings when the target or offset changes', () => {
    const { result, first, scrollTarget, updateProps } = setup();
    jest
      .spyOn(first, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(0, 100, 100, 20));
    const removeListener = jest.spyOn(scrollTarget, 'removeEventListener');
    const replacement = document.createElement('div');
    replacement.scrollBy = jest.fn();

    updateProps({ scrollTarget: replacement, offsetTop: 25 });
    act(() => result.current.setSelected(first, true));

    expect(removeListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(scrollTarget.scrollBy).not.toHaveBeenCalled();
    expect(replacement.scrollBy).toHaveBeenCalledWith({ top: 75 });
  });

  it('cancels pending scroll work when unmounted', () => {
    const { first, scrollTarget, unmount } = setup();
    const bounds = jest
      .spyOn(first, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(0, 100, 100, 20));
    act(() => {
      scrollTarget.dispatchEvent(new Event('scroll'));
      scrollTarget.dispatchEvent(new Event('scroll'));
    });
    const calls = bounds.mock.calls.length;
    unmount();
    act(() => jest.advanceTimersByTime(100));

    expect(calls).toBeGreaterThan(0);
    expect(bounds).toHaveBeenCalledTimes(calls);
    expect(jest.getTimerCount()).toBe(0);
  });
});

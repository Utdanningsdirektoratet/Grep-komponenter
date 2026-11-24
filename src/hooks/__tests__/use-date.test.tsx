import { useLayoutEffect } from 'react';
import { act, renderHook } from '@testing-library/react';

import { DateInput, useDate } from '../use-date';

describe('useDate', () => {
  it('initializes and synchronizes props without committing stale dates', () => {
    const commits: Array<string | null> = [];
    const { result, rerender } = renderHook(
      ({ value }: { value: DateInput }) => {
        const state = useDate(value);
        useLayoutEffect(() => {
          commits.push(state[0]?.format('YYYY-MM-DD') ?? null);
        });
        return state;
      },
      { initialProps: { value: '1993-12-13' as DateInput } },
    );

    expect(commits).toEqual(['1993-12-13']);

    rerender({ value: '1993-12-14' });

    expect(commits).toEqual(['1993-12-13', '1993-12-14']);
    expect(result.current[0]?.format('YYYY-MM-DD')).toBe('1993-12-14');

    rerender({ value: null });

    expect(commits).toEqual(['1993-12-13', '1993-12-14', null]);
    expect(result.current[0]).toBeNull();
  });

  it('preserves local edits until the incoming value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDate(value), {
      initialProps: { value: '1993-12-13' },
    });

    act(() => result.current[1]('1993-12-14'));
    const edited = result.current[0];

    rerender({ value: '1993-12-13' });

    expect(result.current[0]).toBe(edited);

    rerender({ value: '1993-12-15' });

    expect(result.current[0]?.format('YYYY-MM-DD')).toBe('1993-12-15');
  });

  it('supports local edits and clearing without an incoming value', () => {
    const { result, rerender } = renderHook(() => useDate());

    expect(result.current[0]).toBeNull();

    act(() => result.current[1]('1993-12-13'));
    const edited = result.current[0];

    rerender();

    expect(result.current[0]).toBe(edited);
    expect(result.current[0]?.format('YYYY-MM-DD')).toBe('1993-12-13');

    act(() => result.current[1](null));

    expect(result.current[0]).toBeNull();
  });

  it('preserves date identity for equivalent values and no-op updates', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: DateInput }) => useDate(value),
      { initialProps: { value: '1993-12-13' as DateInput } },
    );
    const previous = result.current[0];

    act(() => result.current[1]('1993-12-13'));

    expect(result.current[0]).toBe(previous);

    rerender({ value: new Date(1993, 11, 13) });

    expect(result.current[0]).toBe(previous);
  });
});

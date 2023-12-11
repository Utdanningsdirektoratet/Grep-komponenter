import { useEffect, useMemo } from 'react';
import _debounce from 'lodash.debounce';
import _ from 'lodash';

interface Options extends _.DebounceSettings {
  wait: number;
}

// type Debounce<T> = T & _.Cancelable;
type Debounce<T extends (...args: unknown[]) => unknown> = _.DebouncedFunc<T>;

/**
 * Custom hook for debouncing functions inside components
 * @see https://lodash.com/docs/#debounce
 * @example
 * export default () => {
 *  const ref = useRef();
 *  const [txt, setTxt] = useState("");
 *  const onChange = useDebounce((value: string)=> {
 *      // component might unmount before callback of debounce
 *      ref.current && setText(value);
 *  }, {wait: 250, maxWait: 1000, leading: true});
 *  return (<><input {...{ref,onChange}}/><p>{txt}</p></>)
 * }
 */
export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  opt: Options,
  deps?: unknown[],
): Debounce<T> => {
  const debounce = useMemo(() => {
    const { wait, ...settings } = opt;
    return _debounce(func, wait, settings);
  }, deps || []);
  useEffect(() => debounce.cancel, [debounce]);
  return debounce;
};

export default useDebounce;

import { useEffect, useMemo } from 'react';
import _, { DebounceSettings } from 'lodash';

interface Options extends DebounceSettings {
  wait: number;
}

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
export const useDebounce = <T extends (...args: any) => any>(
  func: T,
  opt: Options,
  deps?: any[],
): T & _.Cancelable => {
  const debounce = useMemo(() => {
    const { wait, ...settings } = opt;
    return _.debounce(func, wait, settings);
    // @eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
  useEffect(() => debounce.cancel(), [debounce]);
  return debounce;
};

export default useDebounce;

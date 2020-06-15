import { getElementLevel } from './element-level';

export interface ContextElement {
  id?: string;
  index: number;
  el: HTMLElement;
  lvl: number;
  parent?: number;
}

export interface Normalizer {
  (elements: Array<HTMLElement>): Array<ContextElement>;
}

export const normalize: Normalizer = (elements: Array<HTMLElement>) => {
  return elements.reduce((curr: Array<ContextElement>, el, index) => {
    const { id } = el;
    const lvl = getElementLevel(el, elements[index - 1]);
    const parent = [...curr].reverse().find((obj) => obj.lvl < lvl)?.index;
    curr.push({ id, el, lvl, parent, index });
    return curr;
  }, []);
};

export default normalize;

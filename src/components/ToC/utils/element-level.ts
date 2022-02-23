export interface ElementLevel {
  (el: Element, prev: Element): number;
}

export const getElementLevel: ElementLevel = (el) => {
  const res = el.nodeName.match(/H([1-9])/);
  if (res) {
    const [_, lvl] = res;
    return Number(lvl);
  }
  return 0;
};

export default getElementLevel;

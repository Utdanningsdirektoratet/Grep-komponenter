export interface ElementLevel {
  (el: Element, prev: Element): number;
}

export const getElementLevel: ElementLevel = (el) => {
  const [_, lvl] = el.nodeName.match(/H([1-9])/);
  return Number(lvl);
};

export default getElementLevel;

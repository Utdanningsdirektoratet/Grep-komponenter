import { normalize, Normalizer, ContextElement } from './normalize';

export interface ContextTreeElement extends ContextElement {
  children: ContextTree;
}

export type ContextTree = Record<number, ContextTreeElement>;

const nest = (items: Array<ContextElement>, id?: number): ContextTree =>
  items
    .filter((item) => item.parent === id)
    .reduce(
      (curr, item) =>
        Object.assign(curr, {
          [item.index]: { ...item, children: nest(items, item.index) },
        }),
      {},
    );

export const buildTree = (
  elements: Array<HTMLElement>,
  normalizer: Normalizer = normalize,
) => {
  const items = normalizer(elements);
  return nest(items);
};

export default buildTree;

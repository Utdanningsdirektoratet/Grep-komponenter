export interface IdentifyElement {
  (element: HTMLElement): string;
}

export const generateElementId: IdentifyElement = (element: HTMLElement) => {
  const tmpId = element.innerText.replace(/\s/g, '-').toLowerCase();
  let id = tmpId,
    index = 1;
  while (document.getElementById(id)) {
    id = `${tmpId}-${++index}`;
  }
  return id;
};

export const identifyElement = (identify?: IdentifyElement) => {
  identify = identify || generateElementId;
  return (element: HTMLElement) => {
    !element.id && (element.id = identify!(element));
    return element.id;
  };
};

export const identifyElements = (
  elements: Array<HTMLElement>,
  identify: IdentifyElement = generateElementId,
) => {
  const indetifier = identifyElement(identify);
  elements.forEach(indetifier);
};

export const useIdentifiedElements = (
  elements: Array<HTMLElement>,
  identify: IdentifyElement = generateElementId,
): Record<string, HTMLElement> => {
  identifyElements(elements, identify);
  return elements.reduce(
    (curr, el) => Object.assign(curr, { [el.id]: el }),
    {},
  );
};

export default useIdentifiedElements;
